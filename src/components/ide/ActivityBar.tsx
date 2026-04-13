'use client';

import React from 'react';
import { Files, Search, GitBranch, Package, Blocks, Settings } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useActiveFile } from '@/context/ActiveFileContext';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const ActivityBar = () => {
  const { sidebarView, setSidebarView, isSidebarOpen, setIsSidebarOpen } = useActiveFile();

  const icons = [
    { id: 'explorer', icon: Files, label: 'Explorer' },
    {
      id: 'search',
      icon: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 50 50" className="transform -scale-x-100">
          <path fill="currentColor" d="M 21 3 C 11.6 3 4 10.6 4 20 C 4 29.4 11.6 37 21 37 C 24.354553 37 27.47104 36.01984 30.103516 34.347656 L 42.378906 46.621094 L 46.621094 42.378906 L 34.523438 30.279297 C 36.695733 27.423994 38 23.870646 38 20 C 38 10.6 30.4 3 21 3 z M 21 7 C 28.2 7 34 12.8 34 20 C 34 27.2 28.2 33 21 33 C 13.8 33 8 27.2 8 20 C 8 12.8 13.8 7 21 7 z"></path>
        </svg>
      ),
      label: 'Search'
    },
    { id: 'git', icon: GitBranch, label: 'Source Control' },
    { id: 'projects', icon: Package, label: 'Projects' },
    { id: 'extensions', icon: Blocks, label: 'Extensions' },
  ];

  const handleIconClick = (id: string) => {
    if (id === 'explorer' || id === 'search') {
      if (isSidebarOpen && sidebarView === id) {
        setIsSidebarOpen(false);
      } else {
        setSidebarView(id as any);
        setIsSidebarOpen(true);
      }
    }
  };

  return (
    <div className="w-[48px] h-full bg-bg-sidebar border-r border-border-color flex flex-col items-center select-none py-2 shrink-0">
      {icons.map(({ id, icon: Icon, label }) => {
        const isActive = isSidebarOpen && sidebarView === id;
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
