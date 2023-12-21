/* eslint-disable react/prop-types */

import { createContext, useEffect, useState } from "react";
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../firebase/firebase.config";
import useAxios from "../hooks/useAxios";
export const AuthContext = createContext({});
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider()

const auth = getAuth(app);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axios = useAxios();
    
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }
    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider);
    }
    const githubLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, githubProvider);
    }
    const handleUpdateProfile = (name, photo ) => {
        return updateProfile(auth.currentUser, {
            displayName: name, 
            photoURL: photo,
            
        })
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            console.log(currentUser);
            const userEmail = currentUser?.email || user?.email;
            const loggedUser = { email: userEmail };
            setUser(currentUser);
            setLoading(false);
            if (currentUser) {
                axios.post('/auth/access-token', loggedUser)
                    .then(res => {
                        console.log('token response', res.data);
                        
                    })
            }
            else {
                axios.post('/auth/logout', loggedUser)
                    .then(() => {
                    })
            }
        });
        return () => {
            unSubscribe();
        }
    }, [axios, user?.email])

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        googleLogin,
        githubLogin,
        handleUpdateProfile,
        logOut
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;