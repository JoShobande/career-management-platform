// components/layout/TopBar.tsx
'use client';

import { useAuth } from '@/providers/AuthProvider';

export function TopBar() {
  const { user, userStatus, logout } = useAuth();

  return (
    <header className="h-14 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto h-full  px-4 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-gray-900 text-white flex items-center justify-center text-sm font-semibold shadow-sm">
            CM
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-gray-900">
              Career Management
            </div>

          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {userStatus === 'authenticated' && user ? (
            <>
              <div className="hidden sm:flex items-center gap-2 rounded-lg border bg-white px-3 py-1.5">
                <div className="h-7 w-7 rounded-full bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-700">
                  {(user.name?.[0] ?? user.email?.[0] ?? 'U').toUpperCase()}
                </div>
                <div className="leading-tight">
                  <div className="text-xs font-medium text-gray-900">
                    {user.name || 'User'}
                  </div>
                  <div className="text-[11px] text-gray-500">
                    {user.email}
                  </div>
                </div>

                {user.roles?.includes('admin') ? (
                  <span className="ml-2 rounded-full bg-gray-900 px-2 py-0.5 text-[10px] font-medium text-white">
                    Admin
                  </span>
                ) : (
                  <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-700">
                    User
                  </span>
                )}
              </div>

              <button
                onClick={logout}
                className="rounded-lg border bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="text-sm text-gray-500">
              {userStatus === 'loading' ? 'Checking session…' : 'Signed out'}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
