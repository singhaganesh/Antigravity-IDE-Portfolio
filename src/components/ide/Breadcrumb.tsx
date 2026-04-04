'use client';

import React from 'react';
import { useActiveFile } from '@/context/ActiveFileContext';
import { ChevronRight } from 'lucide-react';

const Breadcrumb = () => {
  const { activeFile } = useActiveFile();

  return (
    <div className="h-[22px] border-b border-border-color bg-bg-editor px-3 flex items-center gap-1 select-none flex-nowrap overflow-hidden">
      <span className="text-[12px] text-muted flex-shrink-0">ganesh-singha</span>
      <ChevronRight size={12} className="text-muted flex-shrink-0" />
      <span className="text-[12px] text-muted flex-shrink-0">src</span>
      <ChevronRight size={12} className="text-muted flex-shrink-0" />
      <span className="text-[12px] text-primary truncate">{activeFile.name}</span>
    </div>
  );
};

export default Breadcrumb;
