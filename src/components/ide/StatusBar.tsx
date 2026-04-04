'use client';

import React from 'react';
import { useActiveFile } from '@/context/ActiveFileContext';
import { GitBranch, AlertCircle, AlertTriangle, Sparkles, Heart } from 'lucide-react';

const StatusBar = () => {
  const { activeFile } = useActiveFile();

  return (
    <div className="h-[22px] bg-statusbar-bg fixed bottom-0 left-0 right-0 flex items-center justify-between select-none px-3 text-white z-50">
      <div className="flex items-center gap-4 text-[12px]">
        <div className="flex items-center gap-1 hover:bg-[#ffffff20] px-1 cursor-pointer">
          <GitBranch size={12} />
          <span>main*</span>
        </div>
        <div className="flex items-center gap-1 hover:bg-[#ffffff20] px-1 cursor-pointer">
          <AlertCircle size={12} />
          <span>0</span>
          <AlertTriangle size={12} />
          <span>0</span>
        </div>
      </div>

      <div className="flex items-center gap-4 text-[12px] ml-auto">
        <div className="hidden sm:flex items-center gap-1 hover:bg-[#ffffff20] px-1 cursor-pointer">
          <Sparkles size={12} />
          <span>Copilot</span>
        </div>
        <div className="flex items-center gap-1 hover:bg-[#ffffff20] px-1 cursor-pointer">
          <span>{activeFile.lang}</span>
        </div>
        <div className="hidden sm:flex items-center gap-1 hover:bg-[#ffffff20] px-1 cursor-pointer">
          <span>UTF-8</span>
        </div>
        <div className="hidden sm:flex items-center gap-1 hover:bg-[#ffffff20] px-1 cursor-pointer">
          <span>Prettier</span>
        </div>
        <div className="flex items-center gap-1 hover:bg-[#ffffff20] px-1 cursor-pointer">
          <Heart size={12} />
          <span className="hidden xs:inline">Antigravity Dark</span>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
