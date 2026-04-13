'use client';

import React, { useState } from 'react';
import { Files, Search, GitBranch, Package, Blocks, Settings } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useActiveFile } from '@/context/ActiveFileContext';
import { AnimatePresence, motion } from 'framer-motion';
import { getSocialLinks } from '@/components/icons/SocialIcons';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const ActivityBar = () => {
  const { sidebarView, setSidebarView, isSidebarOpen, setIsSidebarOpen } = useActiveFile();

  const icons = [
    { id: 'explorer', icon: Files, label: 'Explorer' },
    {
      id: 'search',
      icon: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 50 50" className="transform -scale-x-100">
          <path fill="currentColor" d="M 21 3 C 11.6 3 4 10.6 4 20 C 4 29.4 11.6 37 21 37 C 24.354553 37 27.47104 36.01984 30.103516 34.347656 L 42.378906 46.621094 L 46.621094 42.378906 L 34.523438 30.279297 C 36.695733 27.423994 38 23.870646 38 20 C 38 10.6 30.4 3 21 3 z M 21 7 C 28.2 7 34 12.8 34 20 C 34 27.2 28.2 33 21 33 C 13.8 33 8 27.2 8 20 C 8 12.8 13.8 7 21 7 z"></path>
        </svg>
      ),
      label: 'Search'
    },
    { id: 'git', icon: GitBranch, label: 'Source Control' },
    { id: 'projects', icon: Package, label: 'Projects' },
    { id: 'extensions', icon: Blocks, label: 'Extensions' },
  ];

  const [isSocialMenuOpen, setIsSocialMenuOpen] = useState(false);

  const handleIconClick = (id: string) => {
    if (id === 'git') {
      setIsSocialMenuOpen(!isSocialMenuOpen);
      return;
    }
    
    // Close terminal/menu if clicking explorer/search
    setIsSocialMenuOpen(false);
    if (id === 'explorer' || id === 'search') {
      if (isSidebarOpen && sidebarView === id) {
        setIsSidebarOpen(false);
      } else {
        setSidebarView(id as any);
        setIsSidebarOpen(true);
      }
    }
  };

  const socialLinks = getSocialLinks();

  return (
    <div className="w-[48px] h-full bg-bg-sidebar border-r border-border-color flex flex-col items-center select-none py-2 shrink-0 z-50">
      {icons.map(({ id, icon: Icon, label }) => {
        const isActive = (isSidebarOpen && sidebarView === id) || (id === 'git' && isSocialMenuOpen);
        return (
          <div
            key={id}
            onClick={() => handleIconClick(id)}
            className={cn(
              "w-full h-12 flex items-center justify-center relative transition-all cursor-pointer group px-2",
            )}
            title={label}
          >
            <div className={cn(
              "w-9 h-9 flex items-center justify-center rounded-lg transition-all relative",
              isActive 
                ? "bg-bg-selected text-white" 
                : "text-muted group-hover:bg-bg-hover group-hover:text-white"
            )}>
              <Icon size={22} strokeWidth={1.5} />
            </div>

            {/* Radial Social Menu */}
            {id === 'git' && (
              <AnimatePresence>
                {isSocialMenuOpen && (
                  <>
                    <motion.div 
                      key="backdrop"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
                      onClick={(e) => { e.stopPropagation(); setIsSocialMenuOpen(false); }}
                    />
                    <div className="absolute top-1/2 left-full -ml-3 z-50 pointer-events-none">
                      {socialLinks.map((link, i) => {
                        const radius = 80;
                        const angle = -70 + (i * 35);
                        const radian = (angle * Math.PI) / 180;
                        const x = Math.cos(radian) * radius;
                        const y = Math.sin(radian) * radius;
                        
                        return (
                          <motion.a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                            animate={{ 
                              opacity: 1, 
                              x: x, 
                              y: y, 
                              scale: 1,
                              transition: { type: "spring", stiffness: 400, damping: 28 }
                            }}
                            exit={{ 
                              opacity: 0, 
                              x: 0, 
                              y: 0, 
                              scale: 0,
                              transition: { duration: 0.15 }
                            }}
                            whileHover={{ scale: 1.1 }}
                            className="absolute w-9 h-9 -mt-[18px] rounded-full bg-bg-editor border border-border-color flex items-center justify-center hover:border-white/50 transition-colors shadow-lg pointer-events-auto"
                            style={{ color: link.color }}
                            onClick={(e) => e.stopPropagation()}
                            title={link.label}
                          >
                            <link.icon className="w-[18px] h-[18px]" />
                          </motion.a>
                        )
                      })}
                    </div>
                  </>
                )}
              </AnimatePresence>
            )}
          </div>
        );
      })}
      <div className="flex-1" />
      <div className="w-full h-12 flex items-center justify-center relative transition-all cursor-pointer group px-2 mb-2" title="Settings">
        <div className="w-9 h-9 flex items-center justify-center rounded-lg text-muted group-hover:bg-bg-hover group-hover:text-white transition-all">
          <Settings size={22} strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
};

export default ActivityBar;
