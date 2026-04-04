'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Files, Search, GitBranch, Package, Blocks, Settings } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const ActivityBar = () => {
  const pathname = usePathname();

  const icons = [
    { icon: Files, path: '/', label: 'Explorer' },
    { icon: Search, path: '/search', label: 'Search' },
    { icon: GitBranch, path: '/git', label: 'Source Control' },
    { icon: Package, path: '/projects', label: 'Projects' },
    { icon: Blocks, path: '/extensions', label: 'Extensions' },
  ];

  return (
    <div className="w-[48px] h-full bg-bg-sidebar border-r border-border-color flex flex-col items-center select-none py-2">
      {icons.map(({ icon: Icon, path, label }) => {
        const isActive = pathname === path;
        return (
          <Link
            key={label}
            href={path}
            className={cn(
              "w-full h-12 flex items-center justify-center relative hover:text-white transition-colors",
              isActive ? "text-white" : "text-muted"
            )}
          >
            {isActive && <div className="absolute left-0 w-[2px] h-10 bg-white" />}
            <Icon size={24} strokeWidth={1.5} />
          </Link>
        );
      })}
      <div className="flex-1" />
      <div className="w-full h-12 flex items-center justify-center text-muted hover:text-white cursor-pointer">
        <Settings size={24} strokeWidth={1.5} />
      </div>
    </div>
  );
};

export default ActivityBar;
