import React, { createContext, useEffect, useState} from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, signInWithPopup } from "firebase/auth";
import app from '../firebase/firebase.config';
import { GoogleAuthProvider } from "firebase/auth";

export const AuthContext = createContext(null);
const googleAuthProvider = new GoogleAuthProvider();
const auth = getAuth(app);

const AuthProver = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
// firebase er create user er code ta ekta function bania tar moddhe rakhbo:
// for create use:
const createUser =(email, password)=>{
    return createUserWithEmailAndPassword(auth, email, password);
}
// for sign in user:
const signIn = (email, password)=>{
    return signInWithEmailAndPassword(auth, email, password)
}

const logOut = ()=>{
   return signOut(auth);
}
// google sign in:
const googleSignin = ()=>{
    return signInWithPopup(auth, googleAuthProvider);
}
// observe auth state change


useEffect( () =>{
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
        console.log('auth state change', currentUser);
        setUser(currentUser);
        setLoading(false);
    });

    return () =>{
        unsubscribe();
    }

}, [])



    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        googleSignin
    }
    return (
        
            <AuthContext.Provider value={authInfo} >
               {children}
            </AuthContext.Provider>
        
    );
};

export default AuthProver;