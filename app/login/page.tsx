'use client';

import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {

    const router = useRouter()

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const {login, userStatus} = useAuth()

   const handleLogin = async(e:React.FormEvent) => {
        e.preventDefault()
        try{
          await login({email, password})
        }catch(error){
          console.error(error)
        }
        
   }

   useEffect(()=>{
    if(userStatus === 'authenticated'){
        router.replace('/dashboard')
    }
   },[userStatus])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="w-full max-w-sm rounded-lg border bg-white p-6 space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <div className="text-sm text-gray-500">
            Career Management Platform
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Sign in
          </h1>
          <p className="text-sm text-gray-500">
            Use any email. Include <span className="font-medium">admin</span> to simulate admin access.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleLogin}>
          {/* Email */}
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-800"
            disabled={userStatus === 'loading' || !email || !password}
          >
            {userStatus === 'loading' ? 'Signing in...' : 'Login'}
          </button>
        </form>

        {/* Footer helper text */}
        <div className="text-xs text-gray-500 text-center">
          This is a demo. Authentication is simulated on the client.
        </div>
      </div>
    </div>
  );
}
