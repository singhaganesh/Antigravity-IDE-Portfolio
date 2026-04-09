'use client';

import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { TransformWrapper, TransformComponent, useControls } from 'react-zoom-pan-pinch';
import { ZoomIn, ZoomOut, RotateCcw, Move } from 'lucide-react';

interface MermaidProps {
  chart: string;
}

// Configure mermaid
mermaid.initialize({
  startOnLoad: false,
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
        Drag to Explore
      </div>
    </div>
  );
};

const Mermaid = ({ chart }: MermaidProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [renderKey, setRenderKey] = useState(0);

  useEffect(() => {
    setRenderKey(prev => prev + 1);
  }, [chart]);

  useEffect(() => {
    const renderDiagram = async () => {
      if (ref.current) {
        try {
          ref.current.removeAttribute('data-processed');
          await mermaid.run({
            nodes: [ref.current],
          });
          const svg = ref.current.querySelector('svg');
          if (svg) {
            svg.style.maxWidth = 'none';
            svg.style.height = 'auto';
          }
        } catch (error) {
          console.error('Mermaid rendering failed:', error);
        }
      }
    };
    renderDiagram();
  }, [renderKey]);

  return (
    <div className="relative bg-[#0d0d0d] border border-border-color rounded-xl overflow-hidden group h-[700px]">
      {/* Header Indicator */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-[#1e1e1e] border border-border-color rounded-md p-1.5 flex items-center gap-2 shadow-lg">
          <div className="w-2 h-2 rounded-full bg-[#00e5cc] animate-pulse" />
          <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">Interactive Canvas</span>
        </div>
      </div>

      <TransformWrapper
        initialScale={0.8}
        minScale={0.1}
        maxScale={4}
        centerOnInit={true}
        limitToBounds={false}
        panning={{ velocityDisabled: true }}
      >
        <Controls />
        <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full flex items-center justify-center cursor-grab active:cursor-grabbing">
          <div className="p-40 min-w-[1200px] flex items-center justify-center">
            <div 
              key={renderKey}
              ref={ref} 
              className="mermaid opacity-100 transition-opacity duration-500"
            >
              {chart}
            </div>
          </div>
        </TransformComponent>
      </TransformWrapper>

      {/* Decorative Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]" 
        style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
      />
    </div>
  );
};

export default Mermaid;
