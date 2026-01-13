'use client';


import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoadingState } from "../ui/LoadingState";


type ProtectedRouteProps = {
  children: React.ReactNode;
}; 

export default function ProtectedRoute({children}:ProtectedRouteProps){

    const router = useRouter()
    const {userStatus} = useAuth()

    useEffect(()=>{
        if(userStatus === 'unauthenticated'){
         router.replace('/login')
        }
    },[userStatus, router])

    if(userStatus === 'loading'){
        return <LoadingState title="Loading..."/>
    }
    
    if (userStatus === 'unauthenticated') {
        return null;
    }
    
    return <>{children}</>

}