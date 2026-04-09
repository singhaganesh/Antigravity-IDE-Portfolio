'use client';

import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { TransformWrapper, TransformComponent, useControls } from 'react-zoom-pan-pinch';
import { ZoomIn, ZoomOut, RotateCcw, Maximize2, Minimize2, Move } from 'lucide-react';

interface MermaidProps {
  chart: string;
}

// Configure mermaid
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

const Controls = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();
  return (
    <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
      <div className="flex flex-col bg-[#1e1e1e] border border-border-color rounded-md overflow-hidden shadow-xl">
        <button 
          onClick={() => zoomIn()}
          className="p-2 hover:bg-[#37373d] text-muted hover:text-white transition-colors border-b border-border-color"
          title="Zoom In"
        >
          <ZoomIn size={16} />
        </button>
        <button 
          onClick={() => zoomOut()}
          className="p-2 hover:bg-[#37373d] text-muted hover:text-white transition-colors border-b border-border-color"
          title="Zoom Out"
        >
          <ZoomOut size={16} />
        </button>
        <button 
          onClick={() => resetTransform()}
          className="p-2 hover:bg-[#37373d] text-muted hover:text-white transition-colors"
          title="Reset View"
        >
          <RotateCcw size={16} />
        </button>
      </div>
      <div className="bg-[#1e1e1e]/50 border border-border-color/50 rounded-md p-2 text-[10px] text-muted font-mono flex items-center gap-2 pointer-events-none">
        <Move size={10} />
        Drag to Pan
      </div>
    </div>
  );
};

const Mermaid = ({ chart }: MermaidProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (ref.current) {
      mermaid.contentLoaded();
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
    <div className={`relative bg-[#0d0d0d] border border-border-color rounded-xl overflow-hidden group transition-all duration-300 ${isExpanded ? 'h-[700px]' : 'h-[450px]'}`}>
      {/* Header / Expand Toggle */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-3">
        <div className="bg-[#1e1e1e] border border-border-color rounded-md p-1.5 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#00e5cc] animate-pulse" />
          <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">Interactive Canvas</span>
        </div>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-[#1e1e1e] border border-border-color rounded-md p-1.5 text-muted hover:text-white hover:bg-[#37373d] transition-all"
          title={isExpanded ? "Minimize" : "Expand Workspace"}
        >
          {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
        </button>
      </div>

      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={3}
        centerOnInit={true}
      >
        <Controls />
        <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full flex items-center justify-center cursor-grab active:cursor-grabbing">
          <div 
            ref={ref} 
            className="mermaid p-10 w-full flex justify-center scale-110" 
          />
        </TransformComponent>
      </TransformWrapper>

      {/* Decorative Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
        style={{ backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`, backgroundSize: '20px 20px' }} 
      />
    </div>
  );
};

export default Mermaid;
