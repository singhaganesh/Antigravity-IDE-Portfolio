'use client';

import React from 'react';
import { X } from 'lucide-react';
import { useActiveFile } from '@/context/ActiveFileContext';

interface FileEntry {
  name: string;
  path: string;
  color: string;
  letter: string;
  isDecorative?: boolean;
}

const Sidebar = () => {
  const { isMobileMenuOpen, setIsMobileMenuOpen, openTab } = useActiveFile();

  const files: FileEntry[] = [
    { name: 'home.tsx', path: '/', color: '#61dafb', letter: 'R' },
    { name: 'about.html', path: '/about', color: '#e34c26', letter: 'H' },
    { name: 'projects.js', path: '/projects', color: '#f7df1e', letter: 'J' },
    { name: 'skills.json', path: '/skills', color: '#cbcb41', letter: 'J' },
    { name: 'experience.ts', path: '#', color: '#3178c6', letter: 'T', isDecorative: true },
    { name: 'contact.css', path: '/contact', color: '#563d7c', letter: 'C' },
    { name: 'README.md', path: '#', color: '#519aba', letter: 'M', isDecorative: true },
    { name: 'Ganesh_Resume.pdf', path: '#', color: '#ff0000', letter: 'P', isDecorative: true },
  ];

  const sidebarContent = (
    <>
      <div className="px-4 py-3 flex items-center justify-between text-muted shrink-0">
        <span className="text-[11px] font-bold tracking-[0.2em] uppercase">PORTFOLIO</span>
        {isMobileMenuOpen && (
          <X 
            size={16} 
            className="md:hidden cursor-pointer" 
            onClick={() => setIsMobileMenuOpen(false)} 
          />
        )}
      </div>

      <div className="flex flex-col py-1 overflow-y-auto no-scrollbar">
        {files.map((file) => (
          <div 
            key={file.name}
            className="flex items-center gap-6 px-4 h-[32px] hover:bg-bg-hover transition-colors select-none cursor-pointer"
            onClick={() => !file.isDecorative && openTab(file.path)}
          >
            <div
              className="w-4 h-4 flex items-center justify-center rounded-sm text-[10px] font-bold text-bg-sidebar shrink-0 ml-1"
              style={{ backgroundColor: file.color }}
            >
              {file.letter}
            </div>
            <span className="text-[13px] font-mono text-[#858585]">
              {file.name}
            </span>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <>
      <div className="w-[240px] h-full bg-bg-sidebar border-r border-border-color hidden md:flex flex-col select-none overflow-hidden">
        {sidebarContent}
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="relative w-64 h-full bg-bg-sidebar shadow-xl animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
