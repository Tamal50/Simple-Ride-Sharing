import React, { useContext, createContext, useState, useEffect } from 'react'
import { onAuthStateChanged } from '../firebase';
import userObject from '../utils/userObject';
import Loading from '../pages/Loading';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
    let [currentUser, setCurrentUser] = useState({});
    let [error, setError] = useState("");
    let [loading, setLoading] = useState(false);

    let [goal, setGoal] = useState({});

    const handleAfterSignInOutResponse = (user) => {
        if (user) {
            // IF Found User Data means Authenticated 
            console.info(`userId ${user.uid}, ${user.displayName} is signed in`);
            setCurrentUser(userObject(user));
        } else {
            // User is signed out
            setCurrentUser({});
        }
    }
    useEffect(() => {
        // onAuthStateChanged will executed in login and logout
        const unsubscribe = onAuthStateChanged(handleAfterSignInOutResponse);
        // unsubscribe when unmounting the component
        return unsubscribe;
    }, []);

    let value = {
        currentUser,
        setCurrentUser,
        error, setError,
        loading, setLoading,
        goal, setGoal
    }

    return (
        <AuthContext.Provider value={value}>
            {loading ? <Loading /> : children}
        </AuthContext.Provider>
    )
}

