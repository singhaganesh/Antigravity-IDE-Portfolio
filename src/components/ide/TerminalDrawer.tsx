'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useActiveFile, FILE_MAP } from '@/context/ActiveFileContext';
import { X, MoreHorizontal, LayoutGrid, Monitor, ChevronDown } from 'lucide-react';
import { evaluateCommand } from '@/utils/terminalEngine';

type TerminalLine = {
  id: string;
  type: 'input' | 'output' | 'system' | 'error';
  content: string | React.ReactNode;
  color?: string;
};

const TerminalPrompt = ({ dir = '~' }: { dir?: string }) => (
  <span className="shrink-0 mr-2">
    <span className="text-emerald-400">ganesh@ganesh</span>
    <span className="text-white">:</span>
    <span className="text-blue-400">{dir}</span>
    <span className="text-white">$</span>
  </span>
);

const INITIAL_HISTORY: TerminalLine[] = [
  { id: 'h1', type: 'system', content: "Welcome! Type 'help' to see available commands.", color: "text-[#00BFFF]" },
];

const TerminalDrawer = () => {
  const { isTerminalOpen, setIsTerminalOpen, openTab } = useActiveFile();
  const [history, setHistory] = useState<TerminalLine[]>(INITIAL_HISTORY);
  const [input, setInput] = useState('');
  const [pastCommands, setPastCommands] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentDir, setCurrentDir] = useState('~');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [terminalHeight, setTerminalHeight] = useState(250);
  const [isResizing, setIsResizing] = useState(false);

  const startResizing = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback((e: MouseEvent) => {
    if (isResizing) {
      const newHeight = window.innerHeight - e.clientY - 22;
      if (newHeight >= 100 && newHeight <= window.innerHeight * 0.8) {
        setTerminalHeight(newHeight);
      }
    }
  }, [isResizing]);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", resize);
      window.addEventListener("mouseup", stopResizing);
    }
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [isResizing, resize, stopResizing]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (isTerminalOpen && inputRef.current) {
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [isTerminalOpen]);

  if (!isTerminalOpen) return null;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmd = input.trim();
      
      const newLines: TerminalLine[] = [
        {
          id: `in-${Date.now()}`,
          type: 'input',
          content: <><TerminalPrompt dir={currentDir} /><span>{input}</span></>
        }
      ];
      
      if (cmd) {
        if (cmd.toLowerCase() === 'clear') {
          setHistory([]);
          setInput('');
          setHistoryIndex(-1);
          return;
        }

        if (cmd.toLowerCase().startsWith('cd')) {
          const args = cmd.trim().split(/\s+/);
          const target = args[1] || '~';
          if (target === 'src' || target === 'src/') {
            setCurrentDir(prev => prev === '~' ? '~/src' : prev);
          } else if (target === '..' || target === '~' || target === '../') {
            setCurrentDir('~');
          } else if (target !== '.') {
            newLines.push({ id: `out-${Date.now()}`, type: 'error', content: `cd: ${target}: No such file or directory`, color: 'text-red-400' });
          }
          setHistory(prev => [...prev, ...newLines]);
          setPastCommands(prev => [cmd, ...prev]);
          setInput('');
          setHistoryIndex(-1);
          return;
        }
        
        const results = evaluateCommand(cmd, openTab, FILE_MAP, currentDir);
        newLines.push(...results.map((r, i) => ({ 
          id: `out-${Date.now()}-${i}`,
          type: r.type,
          content: r.content,
          color: r.type === 'error' ? 'text-red-400' : 'text-emerald-400'
        })));
        
        setPastCommands(prev => [cmd, ...prev]);
      }
      
      setHistory(prev => [...prev, ...newLines]);
      setInput('');
      setHistoryIndex(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < pastCommands.length - 1) {
        const nextIndex = historyIndex + 1;
        setHistoryIndex(nextIndex);
        setInput(pastCommands[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(pastCommands[nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div 
      className={`relative bg-bg-editor border-t border-border-color flex flex-col font-mono animate-in slide-in-from-bottom duration-200 ${isResizing ? 'select-none' : ''}`}
      style={{ height: `${terminalHeight}px` }}
    >
      <div 
        onMouseDown={startResizing}
        className="absolute top-0 left-0 right-0 h-1.5 -translate-y-1/2 cursor-row-resize z-50 hover:bg-[#007acc] active:bg-[#007acc] transition-colors"
      />
      
      {/* Terminal Toolbar */}
      <div className="flex items-center justify-between px-2 md:px-4 py-1.5 bg-[#1e1e1e] border-b border-border-color shrink-0 pointer-events-none">
        <div className="flex gap-2 md:gap-4 text-[10px] md:text-[11px] font-bold text-muted uppercase tracking-wider pointer-events-auto items-center">
          <span className="hidden sm:inline hover:text-white cursor-pointer transition-colors">Problems</span>
          <span className="hidden sm:inline hover:text-white cursor-pointer transition-colors">Output</span>
          <span className="text-white bg-[#37373d] px-2 py-1 rounded-md">Terminal</span>
          <MoreHorizontal size={14} className="hover:text-white cursor-pointer hidden sm:block" />
        </div>
        <div className="flex items-center gap-2 md:gap-3 pointer-events-auto">
          <div className="hidden sm:flex items-center gap-2 text-muted text-[11px] hover:text-white cursor-pointer bg-[#ffffff08] px-2 py-0.5 rounded">
            <span className="text-[10px] scale-90">npm</span>
            <PlusIcon />
            <ChevronDown size={12} />
          </div>
          <div className="hidden sm:block w-[1px] h-4 bg-border-color mx-1" />
          <LayoutGrid size={14} className="hidden sm:block text-muted hover:text-white cursor-pointer" />
          <Monitor size={14} className="hidden sm:block text-muted hover:text-white cursor-pointer" />
          <X 
            size={14} 
            className="text-muted hover:text-white cursor-pointer" 
            onClick={() => setIsTerminalOpen(false)}
          />
        </div>
      </div>

      {/* Terminal Content Area */}
      <div 
        ref={scrollRef}
        className="flex-1 p-4 pb-8 overflow-y-auto text-[13px] leading-relaxed scrollbar-thin whitespace-pre-wrap"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((line) => (
          <div key={line.id} className={`${line.color || 'text-white'} break-all`}>
            {line.content}
          </div>
        ))}
        
        <div className="flex items-start mt-1">
          <TerminalPrompt dir={currentDir} />
          <input 
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0 p-0 m-0 leading-relaxed font-mono"
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
};

const PlusIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

export default TerminalDrawer;
