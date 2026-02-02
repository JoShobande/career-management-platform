"use client";

import { mockApplication } from "@/lib/application/mockdata";
import { readApplications, saveApplications } from "@/lib/application/storage";
import {
  ApplicationsContextValue,
  JobApplication,
  NewJobApplication,
} from "@/lib/application/types";
import { createContext, useContext, useEffect, useState } from "react";

const ApplicationsContext = createContext<ApplicationsContextValue | null>(
  null,
);

export function ApplicationsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  useEffect(() => {
    const storedApplications = readApplications();
    if (storedApplications === null) {
      setApplications(mockApplication);
      saveApplications(mockApplication);
    } else {
      setApplications(storedApplications);
    }
    setStatus("ready");
  }, []);

  const addApplication = (input: NewJobApplication) => {
    const newApp: JobApplication = {
      ...input,
      id: crypto.randomUUID(),
    };
    setApplications((prev) => {
      const next = [newApp, ...prev];
      saveApplications(next);
      return next;
    });
  };

  const deleteApplication = (id: string) => {
    setApplications((prev) => {
      const next = prev.filter((app) => app.id !== id);
      saveApplications(next);
      return next;
    });
  };

  const updateApplication = (id: string, input: NewJobApplication) => {
    setApplications((prev) => {
      const next = prev.map((app) =>
        app.id === id ? { ...app, ...input } : app,
      );
      saveApplications(next);
      return next;
    });
  };

  return (
    <ApplicationsContext.Provider
      value={{
        applications,
        status,
        addApplication,
        deleteApplication,
        updateApplication,
      }}
    >
      {children}
    </ApplicationsContext.Provider>
  );
}

export function useApplications() {
  const context = useContext(ApplicationsContext);
  if (!context) {
    throw new Error(
      "useApplications must be used within an ApplicationsProvider",
    );
  }
  return context;
}
