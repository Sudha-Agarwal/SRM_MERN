import { createContext, useContext, useState } from "react";

//Create a context
const AuthContext = createContext();

//Provider
export const AuthProvider = ({children})=>{
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = (userData)=>{
        setUser(userData);
        setIsLoggedIn(true);
    }

    const logout = ()=>{
        setUser(null);
        setIsLoggedIn(false)
    }

    return(
        <AuthContext.Provider value={{user, isLoggedIn, login,logout}}>{children}</AuthContext.Provider>
    )
}

//export the context
export const useAuth = ()=>useContext(AuthContext)