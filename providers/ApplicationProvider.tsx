'use client'

import { mockApplication } from "@/lib/application/mockdata";
import { ApplicationsContextValue, JobApplication, NewJobApplication } from "@/lib/application/types";
import { createContext, useContext, useEffect, useState } from "react";


const ApplicationsContext = createContext<ApplicationsContextValue|null>(null)

export  function ApplicationsProvider({children}: {children:React.ReactNode}){

    const [applications, setApplications] = useState<JobApplication[]>([]);
    const [status, setStatus] = useState<'loading'|'ready'| 'error'>('ready')

   
    const fetchApplications = ()=> {
        setStatus('loading')
        setApplications(mockApplication)
        setStatus('ready')
    }

    useEffect(()=>{
        fetchApplications()
    },[])

    const addApplication = (input: NewJobApplication) => {
        const newApp = {
            ...input,
            id: crypto.randomUUID()
        }
        setApplications(prev=>([newApp, ...prev]))
    }


    return <ApplicationsContext.Provider value={{applications, status, fetchApplications, addApplication}}>
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

