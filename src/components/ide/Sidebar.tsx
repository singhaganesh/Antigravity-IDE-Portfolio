'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, FileCode, FileType, FileJson, FileCss, FileSearch, FileText, X } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useActiveFile } from '@/context/ActiveFileContext';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface FileEntry {
  name: string;
  path: string;
  icon: React.ElementType;
  color: string;
  letter: string;
  isActive?: boolean;
}

const Sidebar = () => {
  const pathname = usePathname();
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useActiveFile();

  const files: FileEntry[] = [
    { name: 'home.tsx', path: '/', icon: FileCode, color: '#61dafb', letter: 'R' },
    { name: 'about.html', path: '/about', icon: FileType, color: '#e34c26', letter: 'H' },
    { name: 'projects.js', path: '/projects', icon: FileType, color: '#f7df1e', letter: 'J' },
    { name: 'skills.json', path: '/skills', icon: FileJson, color: '#cbcb41', letter: 'J' },
    { name: 'contact.css', path: '/contact', icon: FileCss, color: '#563d7c', letter: 'C' },
  ];

  const decorativeFiles = [
    { name: 'experience.ts', path: '#', icon: FileCode, color: '#3178c6', letter: 'T' },
    { name: 'README.md', path: '#', icon: FileSearch, color: '#519aba', letter: 'M' },
    { name: 'Ganesh_Resume.pdf', path: '#', icon: FileText, color: '#ff0000', letter: 'P' },
  ];

  const sidebarContent = (
    <>
      <div className="px-4 py-2 flex items-center justify-between text-muted">
        <span className="text-[11px] font-bold tracking-widest uppercase">PORTFOLIO</span>
        {isMobileMenuOpen && (
          <X 
            size={16} 
            className="md:hidden cursor-pointer" 
            onClick={() => setIsMobileMenuOpen(false)} 
          />
        )}
      </div>

      <div className="flex items-center px-1 py-1 text-white font-bold text-[11px] cursor-pointer">
        <ChevronDown size={14} className="mr-1" />
        <span>GANESH-SINGHA</span>
      </div>

      <div className="flex flex-col">
        {files.map((file) => {
          const isActive = pathname === file.path;
          return (
            <Link
              key={file.name}
              href={file.path}
              className={cn(
                "flex items-center gap-2 px-6 h-[28px] text-[13px] hover:bg-bg-hover transition-colors",
                isActive ? "bg-bg-selected text-white" : "text-primary"
              )}
            >
              <div
                className="w-4 h-4 flex items-center justify-center rounded-sm text-[10px] font-bold text-bg-sidebar"
                style={{ backgroundColor: file.color }}
              >
                {file.letter}
              </div>
              <span>{file.name}</span>
            </Link>
          );
        })}
        
        <div className="border-t border-border-color my-1 mx-4" />

        {decorativeFiles.map((file) => (
          <div
            key={file.name}
            className="flex items-center gap-2 px-6 h-[28px] text-[13px] text-muted hover:bg-bg-hover transition-colors cursor-pointer opacity-70"
          >
            <div
              className="w-4 h-4 flex items-center justify-center rounded-sm text-[10px] font-bold text-bg-sidebar"
              style={{ backgroundColor: file.color }}
            >
              {file.letter}
            </div>
            <span>{file.name}</span>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="w-[240px] h-full bg-bg-sidebar border-r border-border-color hidden md:flex flex-col select-none overflow-y-auto overflow-x-hidden">
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
