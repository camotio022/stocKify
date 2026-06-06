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
import { getFirestore, doc, setDoc, collection, getDocs, query, where, updateDoc, addDoc, collectionGroup } from 'firebase/firestore';
import { db } from '../../firebase_config';
import { useMediaQuery } from '@mui/material';
import { getTenancies } from '../api/tenancys/get';

export const AuthContext = createContext();
const provider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const matches = useMediaQuery('(max-width:600px)');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
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
    const [downloads, setDownloads] = useState({
        estoque: [],
        entradas: [],
        saidas: []
    });
    // 🟢 Substitua o seu useState(null) por esta inicialização inteligente:
    const [tenant, setTenant] = useState(() => {
        const salvoRaw = sessionStorage.getItem('activeTenantId') || sessionStorage.getItem('tenant');
        if (salvoRaw) {
            try {
                const deSerialized = JSON.parse(salvoRaw);
                if (deSerialized === "none" || (deSerialized && !deSerialized.id)) {
                    return { id: "none", name: "none", status: "none" };
                }
                return deSerialized;
            } catch (e) {
                if (salvoRaw !== "none") {
                    return { id: salvoRaw, name: "Carregando...", status: "active" };
                }
            }
        }
        return { id: "none", name: "none", status: "none" };
    });
    // 1. Sincronização Inicial e Escuta em Tempo Real do Firebase
    useEffect(() => {
        const loggedInStatus = sessionStorage.getItem('isLoggedIn');
        setIsLoggedIn(loggedInStatus === 'true');

        if (loggedInStatus === 'true') {
            const userDataFromSession = JSON.parse(sessionStorage.getItem('user'));
            const tenantDataFromSession = JSON.parse(sessionStorage.getItem('tenant'));

            // 🟢 ADICIONADO: Recupera a lista de múltiplas empresas se ela existir na sessão
            const empresasSalvas = sessionStorage.getItem('empresasDisponiveis');
            if (empresasSalvas) {
                // Supondo que o seu estado no contexto se chame setMult_tenants
                setMult_tenants(JSON.parse(empresasSalvas));
            }

            if (userDataFromSession) setUser(userDataFromSession);
            if (tenantDataFromSession) setTenant(tenantDataFromSession);
        }

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            try {
                if (firebaseUser) {
                    const userData = await queryUser(firebaseUser.email);
                    setUser(userData);

                    const activeTenantId = sessionStorage.getItem('activeTenantId');

                    if (activeTenantId) {
                        const res = await getTenancies.tenancy(activeTenantId);
                        if (res) {
                            setTenant(res);
                            sessionStorage.setItem('tenant', JSON.stringify(res));
                        }
                    } else {
                        // 🟢 CASO MULTI-COMPANY (Ex: Timo no F5 na tela de seleção):
                        // Se não há tenant ativo, mas há uma lista guardada, garante que o estado do contexto permaneça cheio!
                        const empresasSalvas = sessionStorage.getItem('empresasDisponiveis');
                        if (empresasSalvas) {
                            setMult_tenants(JSON.parse(empresasSalvas));
                        }
                    }
                } else {
                    setUser(null);
                    setTenant(null);
                    setIsLoggedIn(false);
                    // Se o seu contexto usar o setMult_tenants, limpa ele no logout:
                    setMult_tenants([]);
                    sessionStorage.clear();
                }
            } catch (error) {
                console.error("Erro no monitoramento de autenticação:", error);
            } finally {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    // 2. Funções Auxiliares de Login e Logout
    const login = (userData) => {
        setIsLoggedIn(true);
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        setTenant(null);
        sessionStorage.clear();
        navigate("/login"); // Garante que joga o cara pra fora
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
            querySnapshot.forEach(doc => {
                userData = doc.data();
            });
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

    // 🔥 ATUALIZADO: Login com Google agora suporta Multi-Tenant perfeitamente
    const loginWithGoogle = async () => {
        try {
            await setPersistence(auth, browserSessionPersistence);

            const result = await signInWithPopup(auth, provider);
            const { user: googleUser } = result;
            const firestore = getFirestore();
            const usersRef = collection(firestore, 'users');
            const querySnapshot = await getDocs(query(usersRef, where('email', '==', googleUser.email)));
            const existingUser = querySnapshot.docs[0];

            let userData;

            const userDataStructure = {
                id: googleUser.uid,
                name: googleUser.displayName,
                email: googleUser.email,
                photoURL: googleUser?.photoURL || null,
                role: 'admin',
                permissions: ['read', 'write', 'delete'],
                createdAt: new Date(),
                updatedAt: new Date(),
                isActive: true,
            };

            if (existingUser) {
                const updatedData = {
                    name: googleUser.displayName,
                    idGoogle: googleUser.uid,
                    photoURL: googleUser?.photoURL || null,
                };
                await updateDoc(doc(usersRef, existingUser.id), updatedData);
                userData = { ...existingUser.data(), ...updatedData };
            } else {
                await setDoc(doc(usersRef, googleUser.uid), userDataStructure);
                userData = userDataStructure;
            }

            setUser(userData);
            login(userData);

            // 🔍 Busca empresas associadas para o fluxo do Google
            const q = query(collectionGroup(db, 'associated_users'), where('__name__', '==', googleUser.uid));
            const tenantSnapshot = await getDocs(q);

            const empresasAssociadas = [];
            tenantSnapshot.forEach((doc) => {
                const tenantId = doc.ref.parent.parent.id;
                empresasAssociadas.push(tenantId);
            });

            if (empresasAssociadas.length === 0) {
                alert("Este usuário não está vinculado a nenhuma empresa ativa.");
                return;
            }

            if (empresasAssociadas.length === 1) {
                const únicoTenant = empresasAssociadas[0];
                sessionStorage.setItem("activeTenantId", únicoTenant);
                await checkTenant(únicoTenant);
                navigate("/dashboard");
            } else {
                sessionStorage.setItem("empresasDisponiveis", JSON.stringify(empresasAssociadas));
                setMult_tenants(empresasAssociadas);
                navigate("/mult_companies");
            }

        } catch (error) {
            console.error("Erro no login com Google:", error);
            const errorMessage = error.message || 'Ocorreu um erro ao fazer login.';
            setMessage(errorMessage);
        }
    };
    const loginWithEmailAndPassword = async (email, password) => {
        if (!email || !password) return;

        try {
            await setPersistence(auth, browserSessionPersistence);

            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const userData = await queryUser(userCredential.user.email, userCredential.user);

            if (!userData) {
                alert("Usuário autenticado, mas perfil não encontrado no sistema.");
                return;
            }

            // 🔍 MUDANÇA AQUI: Capturamos o e-mail autenticado em minúsculo
            const emailAutenticado = userCredential.user.email.toLowerCase();


            // 🔍 MUDANÇA AQUI: Filtramos pelo campo 'userEmail' em vez de 'userId'
            const q = query(
                collectionGroup(db, 'associated_users'),
                where('userEmail', '==', emailAutenticado)
            );
            const querySnapshot = await getDocs(q);

            const empresasAssociadas = [];
            querySnapshot.forEach((doc) => {
                const tenantId = doc.ref.parent.parent.id;
                empresasAssociadas.push(tenantId);
                console.log(`📌 Empresa encontrada para o e-mail! ID da Tenant: ${tenantId}`);
            });

            console.log("📊 Total de empresas mapeadas pelo e-mail:", empresasAssociadas.length);

            if (empresasAssociadas.length === 0) {
                alert("Este e-mail não está vinculado a nenhuma empresa ativa no banco de dados.");
                return;
            }

            // 🔀 O restante do fluxo permanece idêntico e seguro
            if (empresasAssociadas.length === 1) {
                const únicoTenant = empresasAssociadas[0];
                sessionStorage.setItem("activeTenantId", únicoTenant);
                await checkTenant(únicoTenant);
                console.log("📊 Total de empresas mapeadas pelo e-mail:", empresasAssociadas.length);
                console.log("unico tenant id:", únicoTenant);
                setUser(userData);
                login(userData);

                navigate("/");
            } else {
                sessionStorage.setItem("empresasDisponiveis", JSON.stringify(empresasAssociadas));
                setMult_tenants(empresasAssociadas);

                setUser(userData);
                login(userData);

                navigate("/mult_companies");
            }

        } catch (error) {
            console.error("Erro no fluxo de login:", error);
            let errorMessage = 'Ocorreu um erro ao fazer login.';
            if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
                errorMessage = 'E-mail ou senha incorretos.';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'O formato do e-mail digitado é inválido.';
            }
            alert(errorMessage);
        }
    };
    return (
        <AuthContext.Provider
            value={{
                isLoggedIn, login, logout, tenant, setTenant, loading,
                loginWithGoogle, loginWithEmailAndPassword,
                user, newItem, setNewItem, saveExcel, setSaveExcel,
                selectedItems, setSelectedItems, downloads, setDownloads, setMult_tenants, mult_tanants,
                matches, notifications, setNotifications, messages, setMessage,
                select, setSelect, search, setSearch, enablingDeleteButtom, setEnablingDeleteButtom
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};