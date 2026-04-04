'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useActiveFile, FILE_MAP } from '@/context/ActiveFileContext';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const TabBar = () => {
  const pathname = usePathname();
  const { openTabs, closeTab, openTab } = useActiveFile();

  return (
    <div className="h-[35px] bg-bg-tab-bar border-b border-border-color flex items-center select-none overflow-x-auto no-scrollbar">
      {openTabs.map((path) => {
        const tab = FILE_MAP[path];
        if (!tab) return null;
        
        const isActive = pathname === path;
        
        return (
          <div
            key={path}
            className={cn(
              "group flex items-center gap-2 px-3 h-full border-r border-border-color transition-colors relative min-w-fit flex-shrink-0 cursor-pointer",
              isActive ? "bg-bg-tab-active text-white" : "bg-bg-tab-inactive text-muted hover:bg-bg-hover"
            )}
            onClick={() => openTab(path)}
          >
            {isActive && <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#007acc]" />}
            
            {/* File Icon */}
            <div
              className="w-3.5 h-3.5 flex items-center justify-center rounded-sm text-[9px] font-bold text-bg-sidebar flex-shrink-0"
              style={{ backgroundColor: tab.color }}
            >
              {tab.letter}
            </div>

            {/* Filename */}
            <span className="text-[13px] whitespace-nowrap">{tab.name}</span>

            {/* Close Button */}
            <div 
              className={cn(
                "p-0.5 rounded-md hover:bg-[#ffffff15] transition-colors ml-1",
                isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              )}
              onClick={(e) => {
                e.stopPropagation();
                closeTab(path);
              }}
            >
              <X size={12} className="text-muted hover:text-white" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TabBar;
