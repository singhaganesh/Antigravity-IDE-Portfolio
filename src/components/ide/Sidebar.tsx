'use client';

import React from 'react';
import { X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useActiveFile } from '@/context/ActiveFileContext';
import { FileIcon } from './FileIcon';

interface FileEntry {
  name: string;
  path: string;
  isDecorative?: boolean;
}

const Sidebar = () => {
  const { isMobileMenuOpen, setIsMobileMenuOpen, openTab } = useActiveFile();
  const pathname = usePathname();

  const files: FileEntry[] = [
    { name: 'home.tsx', path: '/' },
    { name: 'README.md', path: '/readme' },
    { name: 'projects.js', path: '/projects' },
    { name: 'skills.json', path: '/skills' },
    { name: 'experience.ts', path: '/experience' },
    { name: 'adventures.bike', path: '/adventures' },
    { name: 'contact.css', path: '/contact' },
    { name: 'Ganesh_Resume.pdf', path: '#', isDecorative: true },
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
        {files.map((file) => {
          const isActive = !file.isDecorative && pathname === file.path;

          return (
            <div
              key={file.name}
              className={[
                "flex items-center gap-2 px-4 h-[28px] transition-colors select-none",
                file.isDecorative ? "cursor-default" : "cursor-pointer",
                isActive ? "bg-[#37373d]" : "",
                !file.isDecorative && !isActive ? "hover:bg-[#2a2d2e]" : ""
              ].join(" ")}
              onClick={() => !file.isDecorative && openTab(file.path)}
            >
              <div className="w-4 flex items-center justify-center shrink-0">
                <FileIcon filename={file.name} size={14} />
              </div>
              <span
                className={[
                  "text-[13px] font-mono",
                  file.isDecorative ? "text-text-muted" : "",
                  !file.isDecorative && isActive ? "text-text-blue font-medium" : "text-text-primary",
                ].join(" ")}
              >
                {file.name}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );

  return (
    <>
      <div className="w-[260px] h-full bg-bg-sidebar border-r border-border-color hidden md:flex flex-col select-none overflow-hidden">
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
