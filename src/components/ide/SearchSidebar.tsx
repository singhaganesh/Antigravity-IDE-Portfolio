'use client';

import React, { useState } from 'react';
import { Search, X, ChevronRight } from 'lucide-react';
import { useActiveFile } from '@/context/ActiveFileContext';
import { FileIcon } from './FileIcon';

const SearchSidebar = () => {
  const { setSidebarView, openTab } = useActiveFile();
  const [query, setQuery] = useState('');

  const searchIndex = [
    { title: 'Skills', content: 'Java, Spring Boot, React, Next.js, Android, Kotlin, Docker, PostgreSQL', path: '/skills', filename: 'skills.java' },
    { title: 'Projects', content: 'EV Charging Platform, ThingsBoard Bot, Ecommerce Web, OrbitCart, Mermaid Diagrams', path: '/projects', filename: 'projects.js' },
    { title: 'Experience', content: 'SEPLE NovaEdge, Junior Engineer, Kolkata, IoT, AI Automation, RAG systems', path: '/readme', filename: 'experience.ts' },
    { title: 'Contact', content: 'LinkedIn, Email, Instagram, YouTube, ganeshsingha741@gmail.com, biker_ganesh', path: '/contact', filename: 'contact.json' },
    { title: 'About', content: 'Ganesh Singha, Full Stack Engineer, Kolkata, Backend specialist', path: '/readme', filename: 'README.md' },
  ];

  const results = query.length > 1 ? searchIndex.filter(item => 
    item.content.toLowerCase().includes(query.toLowerCase()) || 
    item.title.toLowerCase().includes(query.toLowerCase())
  ) : [];

  return (
    <div className="w-[260px] h-full bg-bg-sidebar border-r border-border-color flex flex-col select-none overflow-hidden animate-in slide-in-from-left duration-200">
      <div className="h-[35px] flex items-center justify-between px-4 text-muted shrink-0">
        <span className="text-[11px] font-bold uppercase tracking-wider">Search</span>
        <X 
          size={16} 
          className="cursor-pointer hover:text-white transition-colors" 
          onClick={() => setSidebarView('explorer')}
        />
      </div>

      <div className="px-4 py-2">
        <div className="relative group">
          <input
            autoFocus
            type="text"
            placeholder="Search across portfolio..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-bg-editor border border-border-color rounded px-3 py-1.5 text-[12px] font-mono text-text-primary focus:outline-none focus:border-[#00e5cc] transition-colors placeholder:opacity-30"
          />
        </div>
        <div className="text-[10px] text-text-muted mt-2 font-mono uppercase tracking-widest opacity-50">
          {results.length > 0 ? `${results.length} files matched` : "Enter keyword to search"}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar py-4 px-2">
        <div className="space-y-4">
          {results.map((res, i) => (
            <div 
              key={i}
              onClick={() => openTab(res.path)}
              className="group cursor-pointer hover:bg-bg-hover p-2 rounded-md border border-transparent hover:border-border-color transition-all"
            >
              <div className="flex items-center gap-2 mb-1">
                <ChevronRight size={12} className="text-muted group-hover:text-text-cyan transition-colors" />
                <FileIcon filename={res.filename} size={14} />
                <span className="text-[13px] font-mono text-text-primary">{res.title}</span>
              </div>
              <p className="text-[11px] font-mono text-text-muted leading-relaxed line-clamp-2 pl-6">
                {res.content}
              </p>
            </div>
          ))}
          
          {query.length > 1 && results.length === 0 && (
            <div className="text-center py-10 opacity-40">
              <Search size={32} className="mx-auto mb-2 text-text-muted" />
              <p className="text-[12px] font-mono text-[11px]">No results found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchSidebar;
