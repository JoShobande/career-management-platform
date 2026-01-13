// components/layout/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Applications', href: '/applications' },
  { label: 'Settings', href: '/settings' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-white">
      <div className="h-full p-4">
        <div className="mb-3">
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  'group flex items-center justify-between rounded-lg px-3 py-2 text-sm transition',
                  active
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50',
                ].join(' ')}
              >
                <span className="font-medium">{item.label}</span>
                <span
                  className={[
                    'text-xs',
                    active ? 'text-white/80' : 'text-gray-400 group-hover:text-gray-500',
                  ].join(' ')}
                >
                  →
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
