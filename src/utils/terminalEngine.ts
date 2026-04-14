import { FileMetadata } from '@/context/ActiveFileContext';
import React from 'react';

export interface TerminalLineResult {
  type: 'output' | 'system' | 'error';
  content: string | React.ReactNode;
}

export const downloadResume = () => {
  const link = document.createElement('a');
  link.href = '/assets/credentials/Ganesh_resume.pdf';
  link.download = 'Ganesh_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const evaluateCommand = (
  input: string,
  openTab: (path: string) => void,
  files: Record<string, FileMetadata>,
  currentDir: string = '~'
): TerminalLineResult[] => {
  const args = input.trim().split(/\s+/);
  const cmd = args[0].toLowerCase();
  
  if (!cmd) return [];

  const getFileEntry = (name: string) => {
    const cleanName = name.replace(/^src\//, '');
    return Object.values(files).find(f => f.name === cleanName) || 
           (name === 'Ganesh_Resume.pdf' ? { name: 'Ganesh_Resume.pdf', lang: '', tabBorder: '', dot: '', path: '#' } as unknown as FileMetadata : undefined);
  };

  switch (cmd) {
    case 'help':
      return [{
        type: 'output',
        content: `Available commands:
  help    - Show this help message
  ls      - List available files
  pwd     - Print working directory
  whoami  - Show current user
  date    - Show current date and time
  echo    - Print a message
  cat     - View contents of a file
  code    - Open a file in the editor
  open    - Alias for code
  clear   - Clear the terminal screen`
      }];
    
    case 'ls': {
      const targetDir = args[1] || currentDir;
      
      if (targetDir === '~/src' || targetDir === 'src' || targetDir === 'src/') {
        return [{ type: 'output', content: 'home.tsx  README.md  experience.ts  projects.js  skills.java  contact.json' }];
      } else if (targetDir === '~') {
        return [{ type: 'output', content: 'src/  adventures.bike  Ganesh_Resume.pdf' }];
      } else {
        return [{ type: 'error', content: `ls: cannot access '${targetDir}': No such file or directory` }];
      }
    }
    
    case 'pwd':
      return [{ type: 'output', content: currentDir === '~' ? '/home/ganesh' : '/home/ganesh/src' }];
      
    case 'whoami':
      return [{ type: 'output', content: 'ganesh' }];
      
    case 'date':
      return [{ type: 'output', content: new Date().toString() }];
      
    case 'echo':
      return [{ type: 'output', content: args.slice(1).join(' ') }];
      
    case 'cat': {
      if (args.length < 2) return [{ type: 'error', content: 'cat: missing operand' }];
      const fileName = args[1];
      const fileEntry = getFileEntry(fileName);
      if (!fileEntry) return [{ type: 'error', content: `cat: ${fileName}: No such file or directory` }];
      
      const contents = `[Content of ${fileEntry.name}] -> To view fully, use 'code ${fileName}'`;
      return [{ type: 'output', content: contents }];
    }
    
    case 'code':
    case 'open': {
      if (args.length < 2) return [{ type: 'error', content: `${cmd}: missing operand` }];
      const fileName = args[1];
      const fileEntry = getFileEntry(fileName);
      
      if (!fileEntry) return [{ type: 'error', content: `${cmd}: ${fileName}: No such file or directory` }];
      
      if (fileEntry.name === 'Ganesh_Resume.pdf') {
        downloadResume();
        return [{ type: 'system', content: `Downloading Ganesh_Resume.pdf...` }];
      }
      
      openTab(fileEntry.path);
      return [{ type: 'system', content: `Opening ${fileEntry.name} in editor...` }];
    }
    
    case 'clear':
      return []; // special case, handled by the component
      
    case 'sudo':
      return [{ type: 'error', content: 'ganesh is not in the sudoers file. This incident will be reported.' }];
      
    default:
      return [{ type: 'error', content: `${cmd}: command not found` }];
  }
};
