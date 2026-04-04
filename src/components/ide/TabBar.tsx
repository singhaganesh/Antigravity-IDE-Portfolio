'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const TabBar = () => {
  const pathname = usePathname();

  const tabs = [
    { name: 'home.tsx', path: '/', color: '#61dafb', letter: 'R' },
    { name: 'about.html', path: '/about', color: '#e34c26', letter: 'H' },
    { name: 'projects.js', path: '/projects', color: '#f7df1e', letter: 'J' },
    { name: 'skills.json', path: '/skills', color: '#cbcb41', letter: 'J' },
    { name: 'contact.css', path: '/contact', color: '#563d7c', letter: 'C' },
  ];

  return (
    <div className="h-[35px] bg-bg-tab-bar border-b border-border-color flex items-center select-none overflow-x-auto no-scrollbar">
      {tabs.map((tab) => {
        const isActive = pathname === tab.path;
        return (
          <Link
            key={tab.name}
            href={tab.path}
            className={cn(
              "flex items-center gap-2 px-4 h-full border-r border-border-color transition-colors relative min-w-fit flex-shrink-0",
              isActive ? "bg-bg-tab-active text-white" : "bg-bg-tab-inactive text-muted hover:bg-bg-hover"
            )}
          >
            {isActive && <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#007acc]" />}
            <div
              className="w-3.5 h-3.5 flex items-center justify-center rounded-sm text-[9px] font-bold text-bg-sidebar"
              style={{ backgroundColor: tab.color }}
            >
              {tab.letter}
            </div>
            <span className="text-[13px] whitespace-nowrap">{tab.name}</span>
            <X size={12} className="ml-1 opacity-0 group-hover:opacity-100 md:hover:opacity-100 transition-opacity" />
          </Link>
        );
      })}
    </div>
  );
};

export default TabBar;
