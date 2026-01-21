import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { ApplicationsProvider } from "@/providers/ApplicationProvider";


export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <ApplicationsProvider>
        <AuthLayout>
          {children}
        </AuthLayout>
      </ApplicationsProvider>
    </ProtectedRoute>
  );
}
