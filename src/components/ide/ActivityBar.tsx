'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Files, Settings } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ActivityIcon {
  icon: typeof Files;
  path: string;
  label: string;
}

const ActivityBar = () => {
  const pathname = usePathname();

  const icons: ActivityIcon[] = [
    { icon: Files, path: '/', label: 'Explorer' },
  ];

  return (
    <div className="w-[48px] h-full bg-bg-sidebar border-r border-border-color flex flex-col items-center select-none py-2">
      {icons.map(({ icon: Icon, path, label }) => {
        const isActive = pathname === path;
        return (
          <button
            key={label}
            onClick={() => window.location.href = path}
            className={cn(
              "w-full h-12 flex items-center justify-center relative hover:text-white transition-colors",
              isActive ? "text-white" : "text-muted"
            )}
            title={label}
          >
            {isActive && <div className="absolute left-0 w-[2px] h-10 bg-white" />}
            <Icon size={24} strokeWidth={1.5} />
          </button>
        );
      })}
      <div className="flex-1" />
      <button
        className="w-full h-12 flex items-center justify-center text-muted hover:text-white cursor-pointer transition-colors"
        title="Settings"
      >
        <Settings size={24} strokeWidth={1.5} />
      </button>
    </div>
  );
};

export default ActivityBar;
