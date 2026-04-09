'use client';

import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidProps {
  chart: string;
}

// Configure mermaid once
mermaid.initialize({
  startOnLoad: true,
  theme: 'dark',
  securityLevel: 'loose',
  themeVariables: {
    primaryColor: '#1e1e1e',
    primaryTextColor: '#d4d4d4',
    primaryBorderColor: '#00e5cc',
    lineColor: '#00e5cc',
    secondaryColor: '#252526',
    tertiaryColor: '#1e1e1e',
    fontSize: '14px',
    fontFamily: 'JetBrains Mono',
  }
});

const Mermaid = ({ chart }: MermaidProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      mermaid.contentLoaded();
      // Use unique ID for each chart to prevent collisions during re-renders
      const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
      
      try {
        mermaid.render(id, chart).then(({ svg }) => {
          if (ref.current) {
            ref.current.innerHTML = svg;
          }
        });
      } catch (error) {
        console.error('Mermaid rendering failed:', error);
      }
    }
  }, [chart]);

  return (
    <div className="flex justify-center bg-bg-sidebar/30 p-6 rounded-lg border border-border-color/50 overflow-hidden">
      <div ref={ref} className="mermaid w-full flex justify-center" />
    </div>
  );
};

export default Mermaid;
