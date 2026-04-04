'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ChevronDown, 
  ChevronRight, 
  File, 
  Folder, 
  FolderOpen,
  MoreHorizontal,
  X
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useActiveFile } from '@/context/ActiveFileContext';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  path?: string;
  children?: FileNode[];
  status?: 'U' | 'M' | null;
}

const Sidebar = () => {
  const pathname = usePathname();
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useActiveFile();
  const [expandedFolders, setExpandedFolders] = useState<string[]>(['src', 'app', 'skills']);

  const toggleFolder = (folder: string) => {
    setExpandedFolders(prev => 
      prev.includes(folder) ? prev.filter(f => f !== folder) : [...prev, folder]
    );
  };

  const fileTree: FileNode[] = [
    { name: '.next', type: 'folder' },
    { name: 'node_modules', type: 'folder' },
    { name: 'prompts', type: 'folder' },
    { name: 'public', type: 'folder' },
    { 
      name: 'src', 
      type: 'folder',
      children: [
        { 
          name: 'app', 
          type: 'folder',
          children: [
            { name: 'about', type: 'folder' },
            { name: 'contact', type: 'folder' },
            { name: 'projects', type: 'folder' },
            { 
              name: 'skills', 
              type: 'folder',
              children: [
                { name: 'page.tsx', type: 'file', path: '/skills', status: 'U' }
              ]
            },
            { name: 'page.tsx', type: 'file', path: '/', status: 'M' }
          ]
        },
        { name: 'components', type: 'folder', status: 'M' },
        { name: 'context', type: 'folder', status: 'U' },
        { name: 'globals.css', type: 'file', status: 'M' },
        { name: 'layout.tsx', type: 'file', status: 'M' },
      ]
    },
    { name: '.eslintrc.json', type: 'file', status: 'U' },
    { name: '.gitignore', type: 'file' },
    { name: 'package.json', type: 'file', status: 'M' }
  ];

  const renderTree = (nodes: FileNode[], depth = 0) => {
    return nodes.map((node) => {
      const isFolder = node.type === 'folder';
      const isExpanded = expandedFolders.includes(node.name);
      const isActive = node.path === pathname;

      return (
        <div key={node.name} className="flex flex-col">
          <div 
            className={cn(
              "flex items-center gap-1.5 h-[22px] hover:bg-bg-hover cursor-pointer group select-none pr-4",
              isActive && "bg-bg-selected text-white"
            )}
            style={{ paddingLeft: `${depth * 12 + 12}px` }}
            onClick={() => isFolder && toggleFolder(node.name)}
          >
            {isFolder ? (
              isExpanded ? <ChevronDown size={14} className="text-muted flex-shrink-0" /> : <ChevronRight size={14} className="text-muted flex-shrink-0" />
            ) : (
              <div className="w-3.5 flex-shrink-0" />
            )}
            
            {isFolder ? (
              isExpanded ? <FolderOpen size={14} className="text-text-blue flex-shrink-0" /> : <Folder size={14} className="text-text-blue flex-shrink-0" />
            ) : (
              <File size={14} className="text-muted flex-shrink-0" />
            )}

            <span className={cn(
              "text-[13px] flex-1 truncate",
              node.status === 'U' ? "text-text-green" : node.status === 'M' ? "text-text-yellow" : "text-primary"
            )}>
              {node.path ? (
                <Link href={node.path}>{node.name}</Link>
              ) : (
                node.name
              )}
            </span>

            {node.status && (
              <span className={cn(
                "text-[10px] font-bold ml-1",
                node.status === 'U' ? "text-text-green" : "text-text-yellow"
              )}>
                {node.status}
              </span>
            )}
          </div>
          {isFolder && isExpanded && node.children && (
            <div className="flex flex-col">
              {renderTree(node.children, depth + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  const sidebarContent = (
    <>
      {/* Explorer Header */}
      <div className="h-[35px] flex items-center justify-between px-4 text-muted shrink-0">
        <span className="text-[11px] font-bold uppercase tracking-wider">Explorer</span>
        <div className="flex items-center gap-2">
          {isMobileMenuOpen && <X size={16} className="md:hidden cursor-pointer" onClick={() => setIsMobileMenuOpen(false)} />}
          <MoreHorizontal size={16} className="cursor-pointer hover:text-white" />
        </div>
      </div>

      {/* Project Root Folder */}
      <div className="flex items-center px-1 py-1 text-white font-bold text-[11px] cursor-pointer hover:bg-bg-hover shrink-0">
        <ChevronDown size={14} className="mr-1" />
        <span className="truncate uppercase tracking-tighter">ANTIGRAVITY-IDE-PORTFOLIO</span>
      </div>

      {/* File Tree */}
      <div className="flex-1 overflow-y-auto no-scrollbar py-1">
        {renderTree(fileTree)}
      </div>

      {/* Collapsible Gutter Sections */}
      <div className="border-t border-border-color shrink-0">
        <div className="flex items-center px-1 py-1 text-muted font-bold text-[11px] cursor-pointer hover:bg-bg-hover">
          <ChevronRight size={14} className="mr-1" />
          <span>OUTLINE</span>
        </div>
        <div className="flex items-center px-1 py-1 text-muted font-bold text-[11px] cursor-pointer hover:bg-bg-hover">
          <ChevronRight size={14} className="mr-1" />
          <span>TIMELINE</span>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="w-[260px] h-full bg-bg-sidebar border-r border-border-color hidden md:flex flex-col select-none overflow-hidden">
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
