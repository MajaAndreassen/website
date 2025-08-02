'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navigationItems = [
  { name: 'About', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Drawings', href: '/drawings' },
  { name: 'Micro', href: '/micro' },
  { name: 'Tried & Tested', href: '/tried-tested' },
  { name: 'Travel', href: '/travel' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="mb-12">
      <div className="flex flex-wrap gap-6 text-sm">
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'hover:text-gray-900 transition-colors duration-200',
              pathname === item.href 
                ? 'text-gray-900 font-medium' 
                : 'text-gray-600'
            )}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}