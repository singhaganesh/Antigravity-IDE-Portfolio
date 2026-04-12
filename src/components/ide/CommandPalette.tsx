'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileCode, Sparkles, X, ChevronRight, Hash } from 'lucide-react';
import { useActiveFile, FILE_MAP } from '@/context/ActiveFileContext';

const CommandPalette = () => {
  const { isCommandPaletteOpen, setIsCommandPaletteOpen, openTab, setIsAgentPanelOpen } = useActiveFile();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const files = [
    { name: 'home.tsx', path: '/', color: '#61dafb', letter: 'R', dir: 'src/' },
    { name: 'about.html', path: '/readme', color: '#e34c26', letter: 'H', dir: 'src/' },
    { name: 'projects.js', path: '/projects', color: '#f7df1e', letter: 'J', dir: 'src/' },
    { name: 'skills.json', path: '/skills', color: '#cbcb41', letter: 'J', dir: 'data/' },
    { name: 'contact.css', path: '/contact', color: '#563d7c', letter: 'C', dir: 'src/' },
    { name: 'README.md', path: '/readme', color: '#4ec9b0', letter: 'M', dir: './' },
  ];

  const commands = [
    { id: 'copilot', name: "Open Ganesh's Copilot", icon: Sparkles, action: () => setIsAgentPanelOpen(true), shortcut: 'Ctrl+Shift+C' },
  ];

  const filteredFiles = files.filter(f => f.name.toLowerCase().includes(query.toLowerCase()));
  const filteredCommands = commands.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));
  const totalItems = filteredCommands.length + filteredFiles.length;

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isCommandPaletteOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'p') {
        e.preventDefault();
        setIsCommandPaletteOpen(!isCommandPaletteOpen);
      }
      if (e.key === 'Escape') setIsCommandPaletteOpen(false);
      
      if (isCommandPaletteOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex(prev => (prev + 1) % totalItems);
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex(prev => (prev - 1 + totalItems) % totalItems);
        }
        if (e.key === 'Enter') {
          e.preventDefault();
          const allItems = [...filteredCommands, ...filteredFiles];
          const selected = allItems[selectedIndex];
          if (selected) {
            if ('action' in selected) {
              selected.action();
            } else {
              openTab(selected.path);
            }
            setIsCommandPaletteOpen(false);
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, setIsCommandPaletteOpen, totalItems, selectedIndex]);

  if (!isCommandPaletteOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px]" onClick={() => setIsCommandPaletteOpen(false)} />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        className="relative w-full max-w-[650px] bg-[#252526] border border-border-color rounded-lg shadow-2xl overflow-hidden font-mono"
      >
        {/* Search Input */}
        <div className="flex items-center px-4 py-3 gap-3 border-b border-border-color bg-[#1e1e1e]">
          <span className="text-muted text-[14px]">{">"}</span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Go to file or run command..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-[14px] text-text-primary placeholder:text-muted"
          />
          <div className="text-[10px] text-muted bg-[#37373d] px-1.5 py-0.5 rounded border border-border-color">
            Esc
          </div>
        </div>

        <div className="max-h-[400px] overflow-y-auto py-2 scrollbar-thin">
          {/* Commands Section */}
          {filteredCommands.length > 0 && (
            <div className="mb-2">
              <div className="px-4 py-1 text-[10px] font-bold text-muted uppercase tracking-widest opacity-50">Commands</div>
              {filteredCommands.map((cmd, idx) => (
                <div
                  key={cmd.id}
                  onClick={() => { cmd.action(); setIsCommandPaletteOpen(false); }}
                  className={`flex items-center justify-between px-4 py-2.5 cursor-pointer transition-colors ${selectedIndex === idx ? "bg-[#04395e] text-white" : "text-text-muted hover:bg-[#2a2d2e]"}`}
                >
                  <div className="flex items-center gap-3">
                    <cmd.icon size={16} className={selectedIndex === idx ? "text-[#00e5cc]" : "text-text-purple"} />
                    <span className="text-[13px]">{cmd.name}</span>
                  </div>
                  <span className="text-[10px] opacity-40">{cmd.shortcut}</span>
                </div>
              ))}
            </div>
          )}

          {/* Files Section */}
          {filteredFiles.length > 0 && (
            <div>
              <div className="px-4 py-1 text-[10px] font-bold text-muted uppercase tracking-widest opacity-50">Files</div>
              {filteredFiles.map((file, idx) => {
                const actualIndex = filteredCommands.length + idx;
                return (
                  <div
                    key={file.name}
                    onClick={() => { openTab(file.path); setIsCommandPaletteOpen(false); }}
                    className={`flex items-center justify-between px-4 py-2 cursor-pointer transition-colors ${selectedIndex === actualIndex ? "bg-[#04395e] text-white border-l-2 border-[#00e5cc]" : "text-text-muted hover:bg-[#2a2d2e] border-l-2 border-transparent"}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 flex items-center justify-center rounded-sm text-[9px] font-bold text-bg-sidebar" style={{ backgroundColor: file.color }}>
                        {file.letter}
                      </div>
                      <span className="text-[13px]">{file.name}</span>
                    </div>
                    <span className="text-[11px] opacity-30 italic">{file.dir}</span>
                  </div>
                );
              })}
            </div>
          )}

          {totalItems === 0 && (
            <div className="px-4 py-10 text-center text-text-muted text-[13px]">
              No results matching &quot;{query}&quot;
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#1e1e1e] border-t border-border-color px-4 py-2 flex items-center justify-between text-[10px] text-muted uppercase tracking-widest">
          <div className="flex gap-4">
            <span className="flex items-center gap-1.5"><span className="text-[12px]">↑↓</span> navigate</span>
            <span className="flex items-center gap-1.5"><span className="text-[12px]">↵</span> open</span>
            <span className="flex items-center gap-1.5">Esc close</span>
          </div>
          <div className="text-muted/50">
            Tip: type &quot;copilot&quot; to open AI chat
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CommandPalette;
