import React, { createContext, useEffect, useState} from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import app from '../firebase/firebase.config';

export const AuthContext = createContext(null);
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
        logOut
    }
    return (
        
            <AuthContext.Provider value={authInfo} >
               {children}
            </AuthContext.Provider>
        
    );
};

export default AuthProver;