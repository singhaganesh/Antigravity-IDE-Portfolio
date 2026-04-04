'use client';

import React from 'react';
import { Search, Minus, Square, X, Menu } from 'lucide-react';
import { useActiveFile } from '@/context/ActiveFileContext';

const TitleBar = () => {
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useActiveFile();

  return (
    <div className="h-[28px] bg-bg-sidebar border-b border-border-color flex items-center justify-between select-none">
      {/* Left: macOS-style traffic lights / Hamburger */}
      <div className="flex items-center gap-2 ml-3">
        <div className="md:hidden">
          <Menu 
            size={16} 
            className="text-muted hover:text-white cursor-pointer" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </div>
        <div className="hidden md:flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
      </div>

      {/* Center: Search / Command Bar */}
      <div className="bg-[#3c3c3c] rounded-md px-4 py-0.5 text-xs text-muted w-48 md:w-72 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden truncate">
          <Search size={12} className="text-muted flex-shrink-0" />
          <span className="truncate">ganesh-singha : portfolio</span>
        </div>
        <div className="hidden md:block bg-[#4e4e4e] text-muted text-[10px] px-1 rounded flex-shrink-0 ml-2">
          Ctrl P
        </div>
      </div>

      {/* Right: Window Controls */}
      <div className="flex items-center gap-3 md:gap-4 mr-3 text-muted">
        <Minus size={14} className="hover:text-white cursor-pointer" />
        <Square size={12} className="hover:text-white cursor-pointer" />
        <X size={14} className="hover:text-white cursor-pointer" />
      </div>
    </div>
  );
};

export default TitleBar;
