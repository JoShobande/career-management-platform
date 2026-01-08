'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="w-60 border-r bg-white p-4">
      <nav className="space-y-1 text-sm">
        <Link
          href="/dashboard"
          className={`block rounded px-3 py-2 ${
            isActive('/dashboard')
              ? 'bg-gray-100 font-medium text-gray-900'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          Dashboard
        </Link>

        <div className="block rounded px-3 py-2 text-gray-400 cursor-not-allowed">
          Applications (soon)
        </div>

        <div className="block rounded px-3 py-2 text-gray-400 cursor-not-allowed">
          Settings (soon)
        </div>
      </nav>
    </aside>
  );
}
