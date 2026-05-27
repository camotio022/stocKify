import React, { createContext, useEffect, useState } from 'react';
import { 
    GoogleAuthProvider, 
    getAuth, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    onAuthStateChanged,
    setPersistence,
    browserSessionPersistence 
} from 'firebase/auth';
import { getFirestore, doc, setDoc, collection, getDocs, query, where, updateDoc, addDoc } from 'firebase/firestore';
import { db } from '../../firebase_config';
import { useMediaQuery } from '@mui/material';
import { getTenancies } from '../api/tenancys/get';

export const AuthContext = createContext();
const provider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
    const matches = useMediaQuery('(max-width:600px)');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true); // 🚀 ATIVADO: Controla a "piscada" da tela
    const [select, setSelect] = useState('');
    const [search, setSearch] = useState('');
    const [user, setUser] = useState(null);
    const [tenant, setTenant] = useState(null);
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

    // 1. Sincronização Inicial e Escuta em Tempo Real do Firebase
    useEffect(() => {
        const checkUserAuthentication = async () => {
            try {
                // ⚡ Lê estritamente o sessionStorage da aba atual
                const loggedInStatus = sessionStorage.getItem('isLoggedIn');
                setIsLoggedIn(loggedInStatus === 'true');

                if (loggedInStatus === 'true') {
                    const userDataFromSessionStorage = JSON.parse(sessionStorage.getItem('user'));
                    if (userDataFromSessionStorage) {
                        setUser(userDataFromSessionStorage);
                    }
                    const tenantDataFromSessionStorage = JSON.parse(sessionStorage.getItem('tenant'));
                    if (tenantDataFromSessionStorage) {
                        setTenant(tenantDataFromSessionStorage);
                    }
                } else {
                    setUser(null);
                    setTenant(null);
                    sessionStorage.removeItem('isLoggedIn');
                    sessionStorage.removeItem('user');
                    sessionStorage.removeItem('tenant');
                }

                // ⚡ Escuta o Firebase vinculando o estado à sessão da aba
                const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
                    if (firebaseUser) {
                        const userData = await queryUser(firebaseUser.email);
                        setUser(userData);

                        if (userData && userData.tenant) {
                            const res = await getTenancies.tenancy(userData.tenant);
                            if (res) {
                                setTenant(res);
                                sessionStorage.setItem('tenant', JSON.stringify(res));
                            }
                        }
                    } else {
                        setUser(null);
                        setTenant(null);
                        sessionStorage.removeItem('isLoggedIn');
                        sessionStorage.removeItem('user');
                        sessionStorage.removeItem('tenant');
                    }

                    // Finaliza o loading para destravar a renderização do layout sem flash visual
                    setLoading(false);
                });

                return unsubscribe;
            } catch (error) {
                console.error("Erro na autenticação:", error);
                setLoading(false);
            }
        };

        let unsubscribeFromAuth;
        checkUserAuthentication().then(unsub => {
            unsubscribeFromAuth = unsub;
        });

        return () => {
            if (unsubscribeFromAuth) unsubscribeFromAuth();
        };
    }, []);

    // 2. Funções Auxiliares de Login e Logout atualizadas para sessionStorage
    const login = (userData) => {
        setIsLoggedIn(true);
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        setTenant(null);
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('tenant');
    };

    const checkTenant = async (id) => {
        if (!id) return;
        try {
            const res = await getTenancies.tenancy(id);
            if (res) {
                setTenant(res);
                sessionStorage.setItem('tenant', JSON.stringify(res));
            }
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

    // 3. Login com o Google (Isolando a Sessão por Aba)
    const loginWithGoogle = async () => {
        try {
            // Garante isolamento da aba no Firebase Auth antes do popup
            await setPersistence(auth, browserSessionPersistence);
            
            const result = await signInWithPopup(auth, provider);
            const { user: googleUser } = result;
            const firestore = getFirestore();
            const usersRef = collection(firestore, 'users');
            const querySnapshot = await getDocs(query(usersRef, where('email', '==', googleUser.email)));
            const existingUser = querySnapshot.docs[0];
            
            const userDataStructure = {
                id: googleUser.uid,
                name: googleUser.displayName,
                email: googleUser.email,
                photoURL: googleUser?.photoURL || null,
            };

            if (existingUser) {
                const updatedData = {
                    name: googleUser.displayName,
                    idGoogle: googleUser.uid,
                    photoURL: googleUser?.photoURL || null,
                };
                await updateDoc(doc(usersRef, existingUser.id), updatedData);
                const completeData = { ...existingUser.data(), ...updatedData };
                setUser(completeData);
                login(completeData);
                if (completeData.tenant) await checkTenant(completeData.tenant);
            } else {
                await setDoc(doc(usersRef, googleUser.uid), userDataStructure);
                setUser(userDataStructure);
                login(userDataStructure);
            }
        } catch (error) {
            console.error("Erro no login com Google:", error);
            const errorMessage = error.message || 'Ocorreu um erro ao fazer login.';
            setMessage(errorMessage);
        }
    };

    // 4. Login com E-mail e Senha (Isolando a Sessão por Aba)
    const loginWithEmailAndPassword = async (email, password) => {
        if (!email || !password) return;

        try {
            // 🔥 CRUCIAL: Trava o Firebase Auth estritamente nesta guia do navegador
            await setPersistence(auth, browserSessionPersistence);

            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const userData = await queryUser(userCredential.user.email, userCredential.user);

            if (userData) {
                setUser(userData);
                login(userData); // Dispara gravação no sessionStorage

                if (userData.tenant) {
                    await checkTenant(userData.tenant);
                }
            } else {
                alert("Usuário autenticado, mas perfil não encontrado no sistema.");
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
                isLoggedIn, login, logout, tenant, loading, // 🚀 Exportado para travar layouts externos
                loginWithGoogle, loginWithEmailAndPassword,
                user, newItem, setNewItem, saveExcel, setSaveExcel,
                selectedItems, setSelectedItems, downloads, setDownloads,
                matches, notifications, setNotifications, messages, setMessage,
                select, setSelect, search, setSearch, enablingDeleteButtom, setEnablingDeleteButtom
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};