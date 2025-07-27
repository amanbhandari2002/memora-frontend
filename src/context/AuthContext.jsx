// THIS FILE WILL CHECK FOR THE AUTHENTICATION AND CHECK IS USER IS LOGED IN OR NOT

import {React, createContext, use, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';


export const AuthContext = createContext();

export const AuthProvider =({children})=>{
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user,setUser] = useState(null);
    // const navigate = useNavigate();

    const login = (token, userData) => {
        setIsAuthenticated(true);
        setUser(userData);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        // navigate('dashboard');
    }

    const logout= () =>{
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // navigate('/');
    }

    useEffect(() => {
        const checkUser = async () => {
            try {
                const isUserValid = await api.get('/verifyuser')
                if (isUserValid.data.success) {
                    setIsAuthenticated(true);
                    setUser(isUserValid.data.user);
                } else {
                    setIsAuthenticated(false);
                    setUser(null);
                }
            } catch (err) {
                console.error('Error verifying user:', err);
                setIsAuthenticated(false);
                setUser(null);
            }
        }
        checkUser();

    }, []);


    return(
        <AuthContext.Provider value={{isAuthenticated, user, login, logout,setIsAuthenticated,setUser}}>
            {children}
        </AuthContext.Provider>
    )

}