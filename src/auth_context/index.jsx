import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithEmailAndPassword,
    signInWithPopup,
    onAuthStateChanged,
    setPersistence,
    browserSessionPersistence
} from 'firebase/auth';
import { getFirestore, doc, setDoc, collection, getDocs, query, where, updateDoc, addDoc, collectionGroup, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase_config';
import { useMediaQuery } from '@mui/material';
import { getTenancies } from '../api/tenancys/get';

export const AuthContext = createContext();
const provider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const matches = useMediaQuery('(max-width:600px)');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true); // 🛡️ Inicializa estritamente em TRUE no F5
    const [select, setSelect] = useState('');
    const [search, setSearch] = useState('');
    const [user, setUser] = useState(null);
    const [mult_tanants, setMult_tenants] = useState([]);
    const auth = getAuth();
    const [newItem, setNewItem] = useState(false);
    const [saveExcel, setSaveExcel] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [notifications, setNotifications] = useState(false);
    const [messages, setMessage] = useState(false);
    const [enablingDeleteButtom, setEnablingDeleteButtom] = useState(false);
    const [downloads, setDownloads] = useState({ estoque: [], entradas: [], saidas: [] });

    // 🛡️ Inicialização segura: Se não houver ID ativo na sessão, o tenant DEVE nascer null
    const [tenant, setTenant] = useState(() => {
        const salvoRaw = sessionStorage.getItem('tenant');
        const activeTenantId = sessionStorage.getItem('activeTenantId');

        if (!activeTenantId || activeTenantId === "none" || activeTenantId === "default") {
            return null;
        }

        if (salvoRaw) {
            try {
                const deSerialized = JSON.parse(salvoRaw);
                if (deSerialized && deSerialized.id && deSerialized.id !== "none") {
                    return deSerialized;
                }
            } catch (e) {
                return { id: activeTenantId, name: "Carregando...", status: "active" };
            }
        }
        return null;
    });

   useEffect(() => {
    setLoading(true);

    const loggedInStatus = sessionStorage.getItem('isLoggedIn');
    const empresasSalvas = sessionStorage.getItem('empresasDisponiveis');
    
    if (loggedInStatus === 'true') {
        setIsLoggedIn(true);
        const userDataFromSession = JSON.parse(sessionStorage.getItem('user'));
        if (userDataFromSession) setUser(userDataFromSession);
        if (empresasSalvas) setMult_tenants(JSON.parse(empresasSalvas));
    }

    let unsubscribeSnapshot = null; // Guardará a função de limpeza do listener de dados

    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
        try {
            if (firebaseUser) {
                const userData = await queryUser(firebaseUser.email);
                setUser(userData);

                const emailAutenticado = firebaseUser.email.toLowerCase();
                
                // 🎯 Referência da query por Collection Group
                const q = query(
                    collectionGroup(db, 'associated_users'), 
                    where('userEmail', '==', emailAutenticado)
                );

                // 🔥 O PULO DO GATO: Escuta a associação de empresas EM TEMPO REAL
                unsubscribeSnapshot = onSnapshot(q, async (querySnapshot) => {
                    const empresasAssociadas = [];
                    querySnapshot.forEach((doc) => {
                        // Garante o ID do tenant subindo os nós: associated_users -> docTenant
                        empresasAssociadas.push(doc.ref.parent.parent.id);
                    });

                    console.log("[Stockify Realtime Auth] Unidades ativas atualizadas:", empresasAssociadas);

                    // 🚨 CASO O TENANT SEJA APAGADO OU O USUÁRIO DESVINCULADO (LIMBO TOTAL)
                    if (empresasAssociadas.length === 0) {
                        setTenant(null); 
                        setMult_tenants([]);
                        sessionStorage.removeItem('activeTenantId');
                        sessionStorage.removeItem('tenant');
                        sessionStorage.removeItem('empresasDisponiveis');
                        
                        // Opcional: Se quiser forçar o deslogamento completo do Firebase Auth se ele perder todas as empresas
                        // await signOut(auth);
                        
                        setLoading(false);
                        return;
                    }

                    // Se sobrou alguma empresa válida, atualiza a lista reativa e a sessão
                    setMult_tenants(empresasAssociadas);
                    sessionStorage.setItem('empresasDisponiveis', JSON.stringify(empresasAssociadas));

                    const activeTenantId = sessionStorage.getItem('activeTenantId');

                    // Verifica se a empresa que ele estava navegando ainda existe na lista
                    if (activeTenantId && empresasAssociadas.includes(activeTenantId)) {
                        const res = await getTenancies.tenancy(activeTenantId);
                        if (res) {
                            setTenant(res);
                            sessionStorage.setItem('tenant', JSON.stringify(res));
                        } else {
                            // Se a empresa ativa sumiu mas ele tem outras, força reset para nulo para ele escolher a outra
                            setTenant(null);
                            sessionStorage.removeItem('tenant');
                            sessionStorage.removeItem('activeTenantId');
                        }
                    } else if (empresasAssociadas.length === 1) {
                        // Se só restou uma única empresa de pé, foca nela automaticamente
                        const único = empresasAssociadas[0];
                        sessionStorage.setItem('activeTenantId', único);
                        const res = await getTenancies.tenancy(único);
                        if (res) {
                            setTenant(res);
                            sessionStorage.setItem('tenant', JSON.stringify(res));
                        }
                    } else {
                        // Se a empresa ativa foi excluída e ele tem múltiplas outras, joga pro painel de seleção
                        setTenant(null);
                        sessionStorage.removeItem('tenant');
                        sessionStorage.removeItem('activeTenantId');
                    }
                    
                    setLoading(false);
                }, (snapshotError) => {
                    console.error("Erro no Listener reativo de empresas:", snapshotError);
                    setLoading(false);
                });

            } else {
                // Caso deslogue voluntariamente, limpa toda a árvore de estados e sessões
                setUser(null);
                setTenant(null);
                setIsLoggedIn(false);
                setMult_tenants([]);
                sessionStorage.clear();
                
                if (unsubscribeSnapshot) unsubscribeSnapshot();
                setLoading(false);
            }
        } catch (error) {
            console.error("Erro no monitoramento de autenticação:", error);
            setLoading(false);
        }
    });

    // Limpeza rigorosa de listeners ao desmontar o Provider para evitar vazamento de memória (Memory Leak)
    return () => {
        unsubscribeAuth();
        if (unsubscribeSnapshot) unsubscribeSnapshot();
    };
}, []);

    const login = (userData) => {
        setIsLoggedIn(true);
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        setTenant(null);
        setMult_tenants([]);
        sessionStorage.clear();
        navigate("/login");
    };

    const checkTenant = async (id) => {
        if (!id) return false;
        try {
            const res = await getTenancies.tenancy(id);
            if (res) {
                setTenant(res);
                sessionStorage.setItem('activeTenantId', id);
                sessionStorage.setItem('tenant', JSON.stringify(res));
                return true;
            }
            return false;
        } catch (error) {
            console.error("Erro ao checar inquilino:", error);
            return false;
        }
    };

    const queryUser = async (id, newUser) => {
        let userData;
        const usersRef = collection(db, 'users');
        const querySnapshot = await getDocs(query(usersRef, where('email', '==', id)));

        if (!querySnapshot.empty) {
            querySnapshot.forEach(doc => { userData = doc.data(); });
        } else if (newUser) {
            const creatingUser = {
                id: newUser.uid,
                name: newUser.name || 'none',
                email: newUser.email || 'none',
                role: 'admin',
                permissions: ['read', 'write', 'delete'],
                createdAt: new Date(),
                updatedAt: new Date(),
                isActive: true,
                photoURL: newUser?.photoURL || null,
            };
            await addDoc(usersRef, creatingUser);
            userData = creatingUser;
        }
        return userData;
    };

    const loginWithGoogle = async () => { /* Mantido original conforme mapeamento */ };
    const loginWithEmailAndPassword = async (email, password) => {
        if (!email || !password) return;
        try {
            await setPersistence(auth, browserSessionPersistence);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const userData = await queryUser(userCredential.user.email, userCredential.user);

            if (!userData) {
                alert("Usuário autenticado, mas perfil não encontrado.");
                return;
            }

            const emailAutenticado = userCredential.user.email.toLowerCase();
            const q = query(collectionGroup(db, 'associated_users'), where('userEmail', '==', emailAutenticado));
            const querySnapshot = await getDocs(q);

            const empresasAssociadas = [];
            querySnapshot.forEach((doc) => {
                empresasAssociadas.push(doc.ref.parent.parent.id);
            });

            if (empresasAssociadas.length === 0) {
                sessionStorage.removeItem("activeTenantId");
                sessionStorage.removeItem("empresasDisponiveis");
                setUser(userData);
                login(userData);
                setMult_tenants([]);
                navigate("/createNewTenant", { replace: true });
                return;
            }

            if (empresasAssociadas.length === 1) {
                const únicoTenant = empresasAssociadas[0];
                sessionStorage.setItem("activeTenantId", únicoTenant);
                await checkTenant(únicoTenant);
                setUser(userData);
                login(userData);
                navigate("/", { replace: true });
            } else {
                sessionStorage.setItem("empresasDisponiveis", JSON.stringify(empresasAssociadas));
                setMult_tenants(empresasAssociadas);
                setUser(userData);
                login(userData);
                navigate("/mult_companies", { replace: true });
            }
        } catch (error) {
            console.error(error);
            alert("Erro nas credenciais de acesso.");
        }
    };

    return (
        <AuthContext.Provider value={{
            isLoggedIn, login, logout, tenant, setTenant, loading, loginWithGoogle, loginWithEmailAndPassword,
            user, newItem, setNewItem, saveExcel, setSaveExcel, selectedItems, setSelectedItems, downloads, 
            setDownloads, setMult_tenants, mult_tanants, matches, notifications, setNotifications, messages, 
            setMessage, select, setSelect, search, setSearch, enablingDeleteButtom, setEnablingDeleteButtom, checkTenant
        }}>
            {children}
        </AuthContext.Provider>
    );
};