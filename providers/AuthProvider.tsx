'use client';

import { readUser, saveUser, clearUser } from "@/lib/auth/storage";
import type { AuthContextValue, AuthState, LoginInput, Role } from "@/lib/auth/types";
import { createContext, useContext, useEffect, useState } from "react";
import { mockLogin } from "@/lib/auth/mockAuth";


const AuthContext = createContext<AuthContextValue | null>(null)

function AuthProvider({children}: {children:React.ReactNode}) {
    const [state, setState] = useState<AuthState>({
        user: null,
        userStatus: 'loading'
    });

    useEffect(()=>{
        const user = readUser();
        if(user){
            setState({
                user,
                userStatus: 'authenticated'
            });
        } else {
            setState({
                user: null,
                userStatus: 'unauthenticated'
            });
        }
    },[])

    const login =  async(input:LoginInput): Promise<void> => {
        setState(prev =>({...prev, userStatus:'loading'}))
        let loginUserData = await mockLogin(input)
        saveUser(loginUserData)
        setState({user: loginUserData, userStatus:'authenticated'})
    }

    const logout = () => {
        clearUser()
        setState({user: null, userStatus:'unauthenticated'})
    }

    const hasRole = (role:Role) => {
        return !!state.user?.roles.includes(role);
    }
    
    const value:AuthContextValue = {...state, login, logout, hasRole }

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  
}
export function useAuth(){
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context
}

export {AuthProvider}

