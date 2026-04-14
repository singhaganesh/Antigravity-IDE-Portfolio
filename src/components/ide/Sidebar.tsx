'use client';

import React, { useState } from 'react';
import { X, ChevronDown, ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useActiveFile } from '@/context/ActiveFileContext';
import { FileIcon } from './FileIcon';
import { downloadResume } from '@/utils/terminalEngine';

interface FileEntry {
  name: string;
  path: string;
  isDecorative?: boolean;
}

const Sidebar = () => {
  const { isMobileMenuOpen, setIsMobileMenuOpen, openTab } = useActiveFile();
  const pathname = usePathname();
  const [isSrcOpen, setIsSrcOpen] = useState(true);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(true);

  const srcFiles: FileEntry[] = [
    { name: 'home.tsx', path: '/' },
    { name: 'README.md', path: '/readme' },
    { name: 'projects.js', path: '/projects' },
    { name: 'skills.java', path: '/skills' },
    { name: 'experience.ts', path: '/experience' },
    { name: 'contact.json', path: '/contact' },
  ];

  const rootFiles: FileEntry[] = [
    { name: 'adventures.bike', path: '/adventures' },
    { name: 'Ganesh_Resume.pdf', path: '/assets/credentials/Ganesh_resume.pdf', isDecorative: true },
  ];

  const sidebarContent = (
    <>
      <div className="px-4 py-2 pt-3 text-[11px] text-muted tracking-widest select-none">
        EXPLORER
      </div>
      
      <div 
        className="px-1 py-1 flex items-center justify-between hover:bg-[#2a2d2e] cursor-pointer transition-colors group"
        onClick={() => setIsPortfolioOpen(!isPortfolioOpen)}
      >
        <div className="flex items-center gap-1 font-bold text-[11px] tracking-[0.2em] uppercase text-text-primary">
          <div className="text-muted group-hover:text-text-primary transition-colors">
            {isPortfolioOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </div>
          PORTFOLIO
        </div>
        {isMobileMenuOpen && (
          <X 
            size={16} 
            className="md:hidden cursor-pointer text-muted hover:text-text-primary mr-3" 
            onClick={(e) => { e.stopPropagation(); setIsMobileMenuOpen(false); }} 
          />
        )}
      </div>

      {isPortfolioOpen && (
        <div className="flex flex-col py-1 overflow-y-auto no-scrollbar">
          {/* Src Folder */}
          <div 
            className="flex items-center gap-1.5 px-4 h-[28px] cursor-pointer hover:bg-[#2a2d2e] transition-colors select-none text-muted"
            onClick={() => setIsSrcOpen(!isSrcOpen)}
          >
            {isSrcOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            <span className="text-[13px] font-mono text-text-primary">src</span>
          </div>

          {/* Src Files */}
        {isSrcOpen && srcFiles.map((file) => {
          const isActive = !file.isDecorative && pathname === file.path;
          return (
            <div
              key={file.name}
              className={[
                "flex items-center pl-9 pr-4 h-[28px] transition-colors select-none relative",
                file.isDecorative ? "cursor-default" : "cursor-pointer",
                isActive ? "bg-[#37373d]" : "",
                !file.isDecorative && !isActive ? "hover:bg-[#2a2d2e]" : ""
              ].join(" ")}
              onClick={() => !file.isDecorative && openTab(file.path)}
            >
              <div className="absolute left-[22px] top-0 bottom-0 w-[1px] bg-border-color/30" />
              <div className="w-[18px] flex items-center justify-center shrink-0 mr-2 z-10">
                <FileIcon filename={file.name} size={18} />
              </div>
              <span
                className={[
                  "text-[13px] font-mono z-10",
                  file.isDecorative ? "text-text-muted" : "",
                  !file.isDecorative && isActive ? "text-text-blue font-medium" : "text-text-primary",
                ].join(" ")}
              >
                {file.name}
              </span>
            </div>
          );
        })}

        {/* Root Files */}
        {rootFiles.map((file) => {
          const isActive = !file.isDecorative && pathname === file.path;
          return (
            <div
              key={file.name}
              className={[
                "flex items-center gap-1.5 px-4 h-[28px] transition-colors select-none",
                "cursor-pointer",
                isActive ? "bg-[#37373d]" : "",
                !isActive ? "hover:bg-[#2a2d2e]" : ""
              ].join(" ")}
              onClick={() => {
                if (file.name === 'Ganesh_Resume.pdf') {
                  downloadResume();
                } else if (!file.isDecorative) {
                  openTab(file.path);
                }
              }}
            >
              <div className="w-[18px] flex items-center justify-center shrink-0">
                <FileIcon filename={file.name} size={18} />
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
      )}
    </>
  );

  return (
    <>
      <div className="w-[260px] h-full bg-bg-sidebar border-r border-border-color flex flex-col select-none overflow-hidden">
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
