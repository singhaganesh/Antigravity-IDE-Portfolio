'use client';

import React from 'react';
import { Search, Minus, Square, X, Menu, Settings, Users, ChevronDown, Monitor, LayoutGrid, Sparkles } from 'lucide-react';
import { useActiveFile } from '@/context/ActiveFileContext';

const TitleBar = () => {
  const { activeFile, isMobileMenuOpen, setIsMobileMenuOpen } = useActiveFile();

  return (
    <div className="h-[35px] bg-bg-sidebar border-b border-border-color flex items-center justify-between select-none px-3">
      {/* Left: macOS Traffic Lights / Hamburger */}
      <div className="flex items-center gap-2">
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
        
        {/* Menu Bar (Desktop only, shifted here in some themes) */}
        <div className="hidden xl:flex items-center gap-1 ml-4 text-[13px] text-muted">
          {['File', 'Edit', 'Selection', 'View', 'Go', 'Run', 'Terminal', 'Help'].map(m => (
            <span key={m} className="px-2 py-0.5 hover:bg-bg-hover rounded transition-colors cursor-pointer">{m}</span>
          ))}
        </div>
      </div>

      {/* Center: Project and File Name */}
      <div className="flex-1 flex justify-center items-center px-8">
        <div className="text-[12px] text-muted flex items-center gap-1 max-w-[500px] truncate">
          <span>Antigravity-IDE-Portfolio</span>
          <span>-</span>
          <span>Antigravity</span>
          <span>-</span>
          <span className="text-white font-medium">{activeFile.name}</span>
        </div>
      </div>

      {/* Right: Window Controls & Search Icons */}
      <div className="flex items-center gap-3">
        <div className="hidden lg:flex items-center gap-3 mr-4 text-muted">
          <Search size={14} className="hover:text-white cursor-pointer" />
          <div className="flex items-center gap-1 hover:text-white cursor-pointer">
            <span className="text-[12px]">Open Agent Manager</span>
            <LayoutGrid size={14} />
          </div>
          <Monitor size={14} className="hover:text-white cursor-pointer" />
          <div className="w-[1px] h-4 bg-border-color mx-1" />
          <Settings size={14} className="hover:text-white cursor-pointer" />
          <Sparkles size={14} className="text-[#00e5cc] cursor-pointer" />
          <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-[10px] text-white font-bold cursor-pointer">
            G
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-muted">
          <Minus size={14} className="hover:text-white cursor-pointer" />
          <Square size={12} className="hover:text-white cursor-pointer" />
          <X size={14} className="hover:text-[#ff5f57] cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default TitleBar;
