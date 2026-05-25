import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, collection, getDocs, query, where, updateDoc, addDoc } from 'firebase/firestore';
import { db } from '../../firebase_config';
import { useMediaQuery } from '@mui/material';
import { getTenancies } from '../api/tenancys/get';
export const AuthContext = createContext();
const provider = new GoogleAuthProvider();
export const AuthProvider = ({ children }) => {
    const matches = useMediaQuery('(max-width:600px)');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [select, setSelect] = useState('')
    const [search, setSearch] = useState('')
    const [user, setUser] = useState(null);
    const [tenant, setTenant] = useState(null)
    const auth = getAuth();
    const [newItem, setNewItem] = useState(false)
    const [saveExcel, setSaveExcel] = useState(false)
    const [selectedItems, setSelectedItems] = useState([]);
    const [notifications, setNotifications] = useState(false)
    const [messages, setMessage] = useState(false)
    const [enablingDeleteButtom, setEnablingDeleteButtom] = useState(false)
    const [downloads, setDownloads] = useState({
        estoque: [],
        entradas: [],
        saidas: []
    })

    const checkUserAuthentication = async () => {
        const loggedInStatus = localStorage.getItem('isLoggedIn');
        setIsLoggedIn(loggedInStatus === 'true');
        if (loggedInStatus === 'true') {
            const userDataFromLocalStorage = JSON.parse(localStorage.getItem('user'));
            if (userDataFromLocalStorage) {
                setUser(userDataFromLocalStorage);
            }
        }
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userData = await queryUser(user.email);
                setUser(userData);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    };
    const checkTenant = async (id) => {
        try {
            const res = await getTenancies.tenancy(id);
            setTenant(res)
            console.log(res, 'aquii')
        } catch (error) {
            console.error("Erro ao checar inquilino:", error);
            return false;
        }
    }

    useEffect(() => {
        checkUserAuthentication();
    }, []);
    useEffect(() => {
        if (user && user.tenant && !tenant) {
            checkTenant(user.tenant);
        }
    }, [user, tenant]);
    const login = (userData) => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
    };
    const loginWithGoogle = async () => {
        signInWithPopup(auth, provider)
            .then(async (result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const { user } = result;
                const firestore = getFirestore();
                const usersRef = collection(firestore, 'users');
                const querySnapshot = await getDocs(query(usersRef, where('email', '==', user.email)));
                const existingUser = querySnapshot.docs[0];
                const newUser = {
                    id: user.uid,
                    name: user.displayName,
                    email: user.email,
                    photoURL: user?.photoURL || null,
                };
                if (existingUser) {
                    const userData = {
                        name: user.displayName,
                        idGoogle: user.uid,
                        photoURL: user?.photoURL || null,
                    };
                    await updateDoc(doc(usersRef, existingUser.id), userData);
                    setUser(existingUser.data());
                } else {
                    await setDoc(doc(usersRef, user.uid), newUser);
                    setUser(newUser);
                }

                login(newUser);
            })
            .catch((error) => {

                const errorMessage = error.message || 'Ocorreu um erro ao fazer login.';
                setMessage(errorMessage);
            });
    };

    const queryUser = async (id, newUser) => {
        let userData;
        const usersRef = collection(db, 'users');
        const querySnapshot = await getDocs(query(usersRef, where('email', '==', id)));
        if (!querySnapshot.empty) {
            querySnapshot.forEach(doc => {
                userData = doc.data();
            });
        } else {
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
            }
            console.log(newUser)
            await addDoc(usersRef, creatingUser);
        }
        return userData;
    };
    const loginWithEmailAndPassword = async (email, password) => {
        if (!email || !password) return;
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const userData = await queryUser(userCredential.user.email, userCredential.user);
            setUser(userData);
            login(userData);
            checkTenant(user?.tenant)
        } catch (error) {
            const errorMessage = error.message || 'Ocorreu um erro ao fazer login.';
            alert(errorMessage);
        }
    };
    return (
        <AuthContext.Provider
            value={{
                isLoggedIn, login, logout, tenant,
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
