'use client';

import { useAuth } from '@/providers/AuthProvider';

export function TopBar() {
  const { user, logout } = useAuth();

  return (
    <header className="h-14 border-b bg-white px-6 flex items-center justify-between">
      {/* App name */}
      <div className="font-semibold text-gray-900">
        Career Management Platform
      </div>

      {/* User actions */}
      <div className="flex items-center gap-4 text-sm text-gray-700">
        {user?.name && <span>{user.name}</span>}
        <button
          onClick={logout}
          className="text-gray-600 hover:text-gray-900"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
