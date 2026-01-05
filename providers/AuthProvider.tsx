'use client';

import { readUser } from "@/lib/auth/storage";
import { AuthContextValue, AuthState } from "@/lib/auth/types";
import { createContext, useEffect, useState } from "react";


const AuthContext = createContext<AuthContextValue | null>(null)

function AuthProvider(){
    const [state, setState] = useState<AuthState>({
        user: null,
        status: 'loading'
    });

    useEffect(()=>{
        const user = readUser();
        if(user){
            setState({
                user,
                status: 'authenticated'
            });
        } else {
            setState({
                user: null,
                status: 'unauthenticated'
            });
        }
    },[])
}

