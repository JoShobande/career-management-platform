
import type { ReactNode } from 'react';
import { TopBar } from './TopBar';
import { Sidebar } from './Sidebar';
import { ApplicationsProvider } from '@/providers/ApplicationProvider';


type AuthLayoutProps = {
  children: ReactNode;
};

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <ApplicationsProvider>
      <div className="min-h-screen bg-gray-50">
        <TopBar />
        <div className="flex h-[calc(100vh-3.5rem)]">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </ApplicationsProvider>
    
  );
}