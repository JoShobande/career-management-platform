'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { useAuth } from '@/providers/AuthProvider';

export default function DashboardPage() {
  const { user, userStatus } = useAuth();

  return (
    <ProtectedRoute>
      <AuthLayout>
        <div className="space-y-6">
          {/* Page header */}
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Dashboard
            </h1>
            <p className="text-sm text-gray-500">
              Welcome back{user?.name ? `, ${user.name}` : ''}
            </p>
          </div>

          {/* Account info */}
          <div className="rounded-md border bg-white p-4 space-y-2">
            <h2 className="text-sm font-medium text-gray-700">
              Account
            </h2>

            <div className="text-sm text-gray-600">
              <p>
                <span className="font-medium">Email:</span>{' '}
                {user?.email}
              </p>
              <p>
                <span className="font-medium">Roles:</span>{' '}
                {user?.roles.join(', ')}
              </p>
              <p>
                <span className="font-medium">Status:</span>{' '}
                {userStatus}
              </p>
            </div>
          </div>

          {/* Placeholder / coming soon */}
          <div className="rounded-md border border-dashed bg-gray-50 p-4 text-sm text-gray-500">
            Applications and analytics will appear here.
          </div>
        </div>
      </AuthLayout>
    </ProtectedRoute>
  );
}
