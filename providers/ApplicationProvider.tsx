'use client'

import { mockApplication } from "@/lib/application/mockdata";
import { ApplicationsContextValue, JobApplication } from "@/lib/application/types";
// const AuthContext = createContext<AuthContextValue | null>(null)

import { createContext, useContext, useEffect, useState } from "react";


const ApplicationsContext = createContext<ApplicationsContextValue|null>(null)

export  function ApplicationsProvider({children}: {children:React.ReactNode}){

    const [applications, setApplications] = useState<JobApplication[]>([]);
    const [status, setStatus] = useState<'loading'|'ready'| 'error'>('loading')

   
    const fetchApplications = ()=> {
        setStatus('loading')
        setApplications(mockApplication)
        setStatus('ready')
    }

    useEffect(()=>{
        fetchApplications()
    },[])


    return <ApplicationsContext.Provider value={{applications, status, fetchApplications}}>
        {children}
    </ApplicationsContext.Provider>
}

export function useApplications(){
    const context = useContext(ApplicationsContext);
    if(!context){
        throw new Error("useApplications must be used within an ApplicationsProvider");
    }
    return context
}

