'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useActiveFile } from '@/context/ActiveFileContext';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface FileEntry {
  name: string;
  path: string;
  color: string;
  letter: string;
  isDecorative?: boolean;
}

const Sidebar = () => {
  const pathname = usePathname();
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
      {/* Header */}
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

      {/* File List */}
      <div className="flex flex-col py-1 overflow-y-auto no-scrollbar">
        {files.map((file) => {
          const isActive = pathname === file.path;
          
          const Content = (
            <div 
              className={cn(
                "flex items-center gap-6 px-4 h-[32px] hover:bg-bg-hover transition-colors select-none cursor-pointer",
                isActive ? "bg-[#37373d] text-white" : "text-primary/70"
              )}
              onClick={() => !file.isDecorative && openTab(file.path)}
            >
              <div
                className="w-4 h-4 flex items-center justify-center rounded-sm text-[10px] font-bold text-bg-sidebar shrink-0 ml-1"
                style={{ backgroundColor: file.color }}
              >
                {file.letter}
              </div>
              <span className={cn(
                "text-[13px] font-mono",
                isActive ? "text-white font-medium" : "text-[#858585]"
              )}>
                {file.name}
              </span>
            </div>
          );

          return <div key={file.name}>{Content}</div>;
        })}
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="w-[240px] h-full bg-bg-sidebar border-r border-border-color hidden md:flex flex-col select-none overflow-hidden">
        {sidebarContent}
      </div>

      {/* Mobile Sidebar Overlay */}
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
