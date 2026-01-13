'use client';

import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, userStatus } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ email, password });
  };

  useEffect(() => {
    if (userStatus === 'authenticated') {
      router.replace('/dashboard');
    }
  }, [userStatus, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-6">
      <div className="w-full max-w-sm rounded-xl border bg-white shadow-sm p-6 space-y-6">
        {/* Header */}
        <div className="space-y-2 text-center">
          <div className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Career Management Platform
          </div>

          <h1 className="text-2xl font-semibold text-gray-900">
            Welcome back
          </h1>

          <p className="text-sm text-gray-500">
            Sign in to access your dashboard. Use any email — include{' '}
            <span className="font-medium text-gray-700">admin</span> to simulate admin access.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleLogin}>
          {/* Email */}
          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border px-3 py-2.5 text-sm bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-gray-200"
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border px-3 py-2.5 text-sm bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-gray-200"
              autoComplete="current-password"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-lg bg-gray-900 py-2.5 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:opacity-60"
            disabled={userStatus === 'loading'}
          >
            {userStatus === 'loading' ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        {/* Footer */}
        <p className="text-xs text-gray-400 text-center">
          Demo mode. Authentication is simulated on the client.
        </p>
      </div>
    </div>
  );
}
