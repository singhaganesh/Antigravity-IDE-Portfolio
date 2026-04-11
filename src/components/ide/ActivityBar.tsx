'use client';

import React from 'react';
import { Files, Settings } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const CustomSearchIcon = ({ size = 24, className }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M 19 3 C 13.488281 3 9 7.488281 9 13 C 9 15.394531 9.839844 17.589844 11.25 19.3125 L 3.28125 27.28125 L 4.71875 28.71875 L 12.6875 20.75 C 14.410156 22.160156 16.605469 23 19 23 C 24.511719 23 29 18.511719 29 13 C 29 7.488281 24.511719 3 19 3 Z M 19 5 C 23.429688 5 27 8.570313 27 13 C 27 17.429688 23.429688 21 19 21 C 14.570313 21 11 17.429688 11 13 C 11 8.570313 14.570313 5 19 5 Z"></path>
  </svg>
);

interface ActivityIcon {
  icon: any;
  label: string;
  isActive?: boolean;
}

const ActivityBar = () => {
  const icons: ActivityIcon[] = [
    { icon: Files, label: 'Explorer', isActive: true },
    { icon: CustomSearchIcon, label: 'Search', isActive: false },
  ];

  return (
    <div className="w-[48px] h-full bg-bg-sidebar border-r border-border-color hidden md:flex flex-col items-center select-none py-2 shrink-0">
      {icons.map(({ icon: Icon, label, isActive }) => {
        return (
          <button
            key={label}
            className={cn(
              "w-full h-12 flex items-center justify-center relative hover:text-white transition-colors",
              isActive ? "text-white" : "text-muted"
            )}
            title={label}
          >
            {isActive && <div className="absolute left-0 w-[2px] h-10 bg-white" />}
            <Icon size={24} strokeWidth={1.5} />
          </button>
        );
      })}
      <div className="flex-1" />
      <button
        className="w-full h-12 flex items-center justify-center text-muted hover:text-white cursor-pointer transition-colors"
        title="Settings"
      >
        <Settings size={24} strokeWidth={1.5} />
      </button>
    </div>
  );
};

export default ActivityBar;