'use client';

import React from 'react';
import { useActiveFile } from '@/context/ActiveFileContext';
import { GitBranch, AlertCircle, AlertTriangle, Sparkles, Heart, Bell } from 'lucide-react';

const StatusBar = () => {
  const { activeFile } = useActiveFile();

  return (
    <div className="h-[22px] bg-[#181818] border-t border-border-color fixed bottom-0 left-0 right-0 flex items-center justify-between select-none px-3 text-muted z-50">
      <div className="flex items-center gap-4 text-[12px]">
        <div className="flex items-center gap-1 hover:bg-[#ffffff10] px-1 cursor-pointer transition-colors">
          <GitBranch size={12} />
          <span>main*</span>
          <RotateIcon />
        </div>
        <div className="flex items-center gap-2 hover:bg-[#ffffff10] px-1 cursor-pointer transition-colors">
          <AlertCircle size={12} />
          <span>0</span>
          <AlertTriangle size={12} />
          <span>0</span>
        </div>
      </div>

      <div className="flex items-center gap-4 text-[12px] ml-auto">
        <div className="flex items-center gap-1 hover:bg-[#ffffff10] px-1 cursor-pointer transition-colors">
          <span>Ln 123, Col 1</span>
        </div>
        <div className="flex items-center gap-1 hover:bg-[#ffffff10] px-1 cursor-pointer transition-colors">
          <span>Spaces: 2</span>
        </div>
        <div className="flex items-center gap-1 hover:bg-[#ffffff10] px-1 cursor-pointer transition-colors">
          <span>UTF-8</span>
        </div>
        <div className="flex items-center gap-1 hover:bg-[#ffffff10] px-1 cursor-pointer transition-colors">
          <span>LF</span>
        </div>
        <div className="flex items-center gap-1 hover:bg-[#ffffff10] px-1 cursor-pointer transition-colors">
          <span>{`{ }`} TypeScript JSX</span>
        </div>
        <div className="flex items-center gap-1 hover:bg-[#ffffff10] px-1 cursor-pointer transition-colors text-white">
          <Sparkles size={12} className="text-[#00e5cc]" />
          <span>Autocomplete (0)</span>
        </div>
        <div className="flex items-center gap-1 hover:bg-[#ffffff10] px-1 cursor-pointer transition-colors">
          <Heart size={12} />
          <span className="hidden sm:inline">Antigravity - Settings</span>
        </div>
        <div className="flex items-center hover:bg-[#ffffff10] px-1 cursor-pointer transition-colors">
          <Bell size={12} />
        </div>
      </div>
    </div>
  );
};

const RotateIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin-slow">
    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"></path>
    <path d="M21 3v5h-5"></path>
  </svg>
);

export default StatusBar;
