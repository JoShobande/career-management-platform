'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { useAuth } from '@/providers/AuthProvider';

export default function SettingsPage() {
  const { user, userStatus } = useAuth();

  return (
    <ProtectedRoute>
      <AuthLayout>
        <div>
            <h1 className='text-gray-900'>Coming Soon...</h1>
        </div>
      </AuthLayout>
    </ProtectedRoute>
  );
}
