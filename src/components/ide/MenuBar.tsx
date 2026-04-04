'use client';

import React from 'react';
import { useActiveFile } from '@/context/ActiveFileContext';

const MenuBar = () => {
  const { setIsTerminalOpen } = useActiveFile();
  const menus = ['File', 'Edit', 'View', 'Go', 'Run', 'Terminal', 'Help', 'Copilot'];

  return (
    <div className="h-[28px] bg-bg-sidebar border-b border-border-color hidden md:flex items-center select-none overflow-hidden">
      {menus.map((menu) => (
        <div
          key={menu}
          onClick={() => menu === 'Terminal' && setIsTerminalOpen(true)}
          className="text-[13px] text-muted px-3 py-1 hover:bg-bg-hover cursor-pointer transition-colors"
        >
          {menu}
        </div>
      ))}
    </div>
  );
};

export default MenuBar;
