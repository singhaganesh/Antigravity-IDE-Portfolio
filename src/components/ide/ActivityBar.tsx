'use client';

import React from 'react';
import Link from 'next/navigation';
import { Files, Search, GitBranch, Package, Blocks, Settings } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useActiveFile } from '@/context/ActiveFileContext';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const ActivityBar = () => {
  const { sidebarView, setSidebarView, setIsSidebarOpen } = useActiveFile();

  const icons = [
    { id: 'explorer', icon: Files, label: 'Explorer' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'git', icon: GitBranch, label: 'Source Control' },
    { id: 'projects', icon: Package, label: 'Projects' },
    { id: 'extensions', icon: Blocks, label: 'Extensions' },
  ];

  const handleIconClick = (id: string) => {
    if (id === 'explorer' || id === 'search') {
      if (sidebarView === id) {
        setIsSidebarOpen(false);
        setSidebarView('explorer');
      } else {
        setSidebarView(id as any);
        setIsSidebarOpen(true);
      }
    }
  };

  return (
    <div className="w-[48px] h-full bg-bg-sidebar border-r border-border-color flex flex-col items-center select-none py-2 shrink-0">
      {icons.map(({ id, icon: Icon, label }) => {
        const isActive = sidebarView === id;
        return (
          <div
            key={id}
            onClick={() => handleIconClick(id)}
            className={cn(
              "w-full h-12 flex items-center justify-center relative hover:text-white transition-colors cursor-pointer",
              isActive ? "text-white" : "text-muted"
            )}
            title={label}
          >
            {isActive && <div className="absolute left-0 w-[2px] h-10 bg-white" />}
            <Icon size={24} strokeWidth={1.5} />
          </div>
        );
      })}
      <div className="flex-1" />
      <div className="w-full h-12 flex items-center justify-center text-muted hover:text-white cursor-pointer" title="Settings">
        <Settings size={24} strokeWidth={1.5} />
      </div>
    </div>
  );
};

export default ActivityBar;
