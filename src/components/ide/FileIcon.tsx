'use client';

import React from 'react';
import { 
  FileCode2, 
  FileJson, 
  FileText, 
  FileType, 
  Bike, 
  FileSignature, 
  Hash,
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface FileIconProps {
  filename: string;
  size?: number;
  className?: string;
  color?: string;
}

const BracesIcon = ({ size, color }: { size: number, color: string }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M5 2C4.44772 2 4 2.44772 4 3V6C4 6.55228 3.55228 7 3 7C3.55228 7 4 7.44772 4 8V11C4 11.5523 4.44772 12 5 12H6M11 2C11.5523 2 12 2.44772 12 3V6C12 6.55228 12.4477 7 13 7C12.4477 7 12 7.44772 12 8V11C12 11.5523 11.5523 12 11 12H10" 
      stroke={color} 
      strokeWidth="1.2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const FileIcon: React.FC<FileIconProps> = ({ filename, size = 16, className, color }) => {
  const extension = filename.split('.').pop()?.toLowerCase();

  const getIcon = () => {
    switch (extension) {
      case 'tsx':
      case 'jsx':
        return {
          Component: (props: any) => (
            <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
              <g transform="translate(8, 8) scale(0.6)">
                <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
                <g fill="none" stroke="currentColor" strokeWidth="1">
                  <ellipse rx="11" ry="4.2"/>
                  <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
                  <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
                </g>
              </g>
            </svg>
          ),
          defaultColor: '#61dafb'
        };
      case 'ts':
        return {
          Component: (props: any) => (
            <div 
              className="flex items-center justify-center font-bold select-none" 
              style={{ 
                color: props.style.color, 
                width: size, 
                height: size, 
                fontSize: `${(size / 16) * 10}px`,
                lineHeight: 1,
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}
            >
              TS
            </div>
          ),
          defaultColor: '#3178c6'
        };
      case 'js':
        return {
          Component: (props: any) => (
            <div 
              className="flex items-center justify-center font-bold select-none" 
              style={{ 
                color: props.style.color, 
                width: size, 
                height: size, 
                fontSize: `${(size / 16) * 10}px`,
                lineHeight: 1,
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}
            >
              JS
            </div>
          ),
          defaultColor: '#f7df1e'
        };
      case 'java':
        return {
          Component: (props: any) => (
            <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
               <path d="M10.15 8.35C10.15 8.35 9.75 7.9 8.25 7.9C6.75 7.9 6.35 8.35 6.35 8.35C6.35 8.35 6.35 9 8.25 9C10.15 9 10.15 8.35 10.15 8.35ZM11 6.5C11 6.5 10 5.5 8 5.5C6 5.5 5 6.5 5 6.5C5 6.5 5 7.5 8 7.5C11 7.5 11 6.5 11 6.5ZM10.5 4.5C10.5 4.5 9.7 3.8 8.1 3.8C6.5 3.8 5.7 4.5 5.7 4.5V5C5.7 5 6.5 4.2 8.1 4.2C9.7 4.2 10.5 5 10.5 5V4.5Z" fill="currentColor"/>
               <path d="M11 6C11.552 6 12 5.552 12 5C12 4.448 11.552 4 11 4" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round"/>
               <path d="M6.5 1.5C6.5 1.5 7 2.5 6 3" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round"/>
               <path d="M8.5 1C8.5 1 9 2 8 2.5" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round"/>
               <path d="M10.5 1C10.5 1 11 2 10 2.5" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round"/>
            </svg>
          ),
          defaultColor: '#E76F00'
        };
      case 'json':
        return {
          Component: (props: any) => <BracesIcon size={size} color={props.style.color || '#F1E05A'} />,
          defaultColor: '#F1E05A' 
        };
      case 'md':
        return {
          Component: (props: any) => (
            <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
              <path d="M3 5.5V10.5M3 5.5L5 7.5L7 5.5M7 5.5V10.5M11 5.5V8.5M9.5 7L11 8.5L12.5 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ),
          defaultColor: '#519aba'
        };
      case 'css':
        return {
          Component: (props: any) => <BracesIcon size={size} color={props.style.color || '#42a5f5'} />,
          defaultColor: '#42a5f5' 
        };
      case 'bike':
        return { Component: Bike, defaultColor: '#ff0000' };
      case 'pdf':
        return {
          Component: (props: any) => (
            <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
              <path d="M4 2H10L13 5V14C13 14.5523 12.5523 15 12 15H4C3.44772 15 3 14.5523 3 14V3C3 2.44772 3.44772 2 4 2Z" fill="#F44336"/>
              <text x="4.5" y="12" fill="white" fontSize="5" fontWeight="bold" fontFamily="system-ui">PDF</text>
            </svg>
          ),
          defaultColor: '#f44336'
        };
      default:
        return { Component: FileCode2, defaultColor: '#858585' };
    }
  };

  const { Component, defaultColor } = getIcon();

  return (
    <div className={cn("inline-flex items-center justify-center shrink-0", className)}>
      <Component 
        size={size} 
        style={{ color: color || defaultColor }} 
        strokeWidth={1.5}
      />
    </div>
  );
};
