'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, Github, ExternalLink, Star, GitFork, FolderOpen, ChevronLeft, ChevronRight, FileCode, Cpu } from 'lucide-react';
import projectsData from '@/data/projects.json';
import { PROJECT_ORDER } from '@/data/projects-config';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Mermaid from '@/components/ui/Mermaid';

interface Project {
  id: number;
  name: string;
  originalName: string;
  tag: string;
  desc: string;
  architecture: string | null;
  stack: string[];
  tagColor: string;
  demo: string;
  github: string;
  stars: number;
  forks: number;
  updatedAt: string;
}

const ProjectsPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const projects = useMemo(() => {
    const data = [...projectsData] as Project[];
    return data.sort((a, b) => {
      const indexA = PROJECT_ORDER.indexOf(a.originalName);
      const indexB = PROJECT_ORDER.indexOf(b.originalName);
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }, []);

  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    projects.length > 0 ? projects[0].id : null
  );

  const selectedProject = useMemo(() => 
    projects.find(p => p.id === selectedProjectId) || (projects.length > 0 ? projects[0] : null)
  , [projects, selectedProjectId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft } = scrollContainerRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - 200 : scrollLeft + 200;
      scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const getMermaidData = (text: string | null) => {
    if (!text) return { isMermaid: false, content: '' };
    let cleaned = text.trim();
    const match = cleaned.match(/```mermaid\s*([\s\S]*?)\s*```/i) || 
                  cleaned.match(/```\s*mermaid\s*([\s\S]*?)\s*```/i);
    if (match) cleaned = match[1].trim();
    const isChart = cleaned.startsWith('graph ') || 
                    cleaned.startsWith('flowchart ') || 
                    cleaned.startsWith('sequenceDiagram') ||
                    cleaned.startsWith('classDiagram') ||
                    cleaned.startsWith('stateDiagram');
    return { isMermaid: isChart, content: cleaned };
  };

  return (
    <div className="flex flex-col min-h-full bg-bg-editor animate-fadeUp">
      {/* Top Section: Fixed Project Selector */}
      <div className="sticky top-0 z-20 border-b border-border-color bg-bg-editor px-4 py-4 shrink-0">
        <div className="relative group max-w-6xl mx-auto">
          <button onClick={() => scroll('left')} className="absolute -left-8 top-0 bottom-0 z-10 px-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronLeft size={20} className="text-white" />
          </button>
          
          <div ref={scrollContainerRef} className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 px-2">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => setSelectedProjectId(project.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md border transition-all whitespace-nowrap shrink-0 ${selectedProject?.id === project.id ? "bg-[#37373d] border-[#00e5cc] text-white shadow-[0_0_10px_rgba(0,229,204,0.1)]" : "bg-bg-sidebar/50 border-border-color text-text-muted hover:border-text-muted"}`}
              >
                <div className="w-3 h-3 rounded-sm flex items-center justify-center text-[8px] font-bold text-bg-sidebar" style={{ backgroundColor: project.tagColor }}>
                  {project.name.charAt(0)}
                </div>
                <span className="text-[13px] font-mono">{project.name}</span>
              </button>
            ))}
          </div>

          <button onClick={() => scroll('right')} className="absolute -right-8 top-0 bottom-0 z-10 px-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronRight size={20} className="text-white" />
          </button>
        </div>
      </div>

      {/* Main Content Detail Area */}
      <div className="px-6 py-10 flex-1">
        <AnimatePresence mode="wait">
          {selectedProject ? (
            <motion.div key={selectedProject.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              {/* Header Info */}
              <div className="max-w-6xl mx-auto mb-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[12px] font-mono px-2 py-0.5 rounded border border-border-color bg-bg-sidebar" style={{ color: selectedProject.tagColor }}>{selectedProject.tag}</span>
                      <span className="text-text-muted text-[12px] font-mono">{"// last_updated: "}{isMounted ? formatDate(selectedProject.updatedAt) : ""}</span>
                    </div>
                    <h1 className="text-[56px] font-black text-white leading-tight font-display tracking-tight">{selectedProject.name}</h1>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center bg-bg-sidebar border border-border-color rounded-lg px-4 py-2 min-w-[80px]">
                      <span className="text-[20px] font-bold text-[#f7df1e] flex items-center gap-1"><Star size={18} fill="#f7df1e" /> {selectedProject.stars}</span>
                      <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">Stars</span>
                    </div>
                    <div className="flex flex-col items-center bg-bg-sidebar border border-border-color rounded-lg px-4 py-2 min-w-[80px]">
                      <span className="text-[20px] font-bold text-white flex items-center gap-1"><GitFork size={18} /> {selectedProject.forks}</span>
                      <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">Forks</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description and Stack Grid */}
              <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 mb-16">
                <div className="space-y-10">
                  <section>
                    <h3 className="text-text-cyan text-[14px] font-mono font-bold mb-4 flex items-center gap-2"><span className="opacity-50">#</span> DESCRIPTION</h3>
                    <p className="text-[16px] text-text-primary leading-relaxed font-mono bg-bg-sidebar/20 p-6 rounded-lg border border-border-color/50">{selectedProject.desc}</p>
                  </section>

                  <section>
                    <h3 className="text-text-cyan text-[14px] font-mono font-bold mb-4 flex items-center gap-2"><span className="opacity-50">#</span> TECH_STACK</h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.stack.map((tech) => (
                        <span key={tech} className="bg-bg-sidebar text-text-primary text-[13px] font-mono px-4 py-2 border border-border-color rounded-md hover:border-[#00e5cc] transition-colors cursor-default">{tech}</span>
                      ))}
                    </div>
                  </section>

                  <div className="flex flex-wrap gap-4 pt-6">
                    {selectedProject.demo && selectedProject.demo !== '#' && (
                      <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer" className="bg-[#00e5cc] text-[#1e1e1e] font-bold px-8 py-3 rounded-md text-[14px] hover:bg-[#00b8a9] transition-all flex items-center gap-2 shadow-[0_4px_20px_rgba(0,229,204,0.2)]">
                        <ExternalLink size={18} /> Live Demo
                      </a>
                    )}
                    <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="bg-transparent border border-white text-white font-bold px-8 py-3 rounded-md text-[14px] hover:bg-white/10 transition-all flex items-center gap-2">
                      <Github size={18} /> Source Code
                    </a>
                  </div>
                </div>

                <aside className="space-y-6 hidden lg:block">
                  <div className="bg-bg-sidebar border border-border-color rounded-xl p-6">
                    <h4 className="text-text-muted text-[11px] font-bold uppercase tracking-[0.2em] mb-4">Project File</h4>
                    <div className="flex items-center gap-3 text-text-primary bg-bg-editor p-3 rounded border border-border-color/50">
                      <FileCode size={20} className="text-[#00e5cc]" />
                      <div className="flex flex-col">
                        <span className="text-[13px] font-mono font-bold truncate max-w-[150px]">{selectedProject.originalName}</span>
                        <span className="text-[10px] text-text-muted">Synced from GitHub</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#007acc]/10 border border-[#007acc]/20 rounded-xl p-6">
                    <p className="text-[12px] text-[#9cdcfe] font-mono leading-relaxed">
                      {"// tip: click the 'System Architecture' canvas below to zoom and explore the logic."}
                    </p>
                  </div>
                </aside>
              </div>

              {/* Full Width Architecture Section */}
              {selectedProject.architecture && (
                <div className="w-full mt-10 border-t border-border-color/50 pt-12">
                  <div className="max-w-6xl mx-auto px-4 mb-6">
                    <h3 className="text-[#ce9178] text-[14px] font-mono font-bold flex items-center gap-2">
                      <Cpu size={16} className="opacity-70" /> SYSTEM_ARCHITECTURE
                    </h3>
                  </div>
                  <div className="w-full">
                    {(() => {
                      const { isMermaid, content } = getMermaidData(selectedProject.architecture);
                      return isMermaid ? (
                        <Mermaid chart={content} />
                      ) : (
                        <div className="max-w-6xl mx-auto bg-[#1e1e1e] border-2 border-dashed border-border-color rounded-xl p-8 prose prose-invert max-w-none font-mono text-[14px] leading-relaxed">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>{selectedProject.architecture}</ReactMarkdown>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              )}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Fixed Footer */}
      <div className="px-10 py-6 border-t border-border-color bg-bg-sidebar/10 flex justify-between items-center shrink-0 mt-auto">
        <a href="https://github.com/singhaganesh" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-[#00e5cc] font-mono text-[13px] transition-colors flex items-center gap-2">
          <Github size={14} /> {"// view_all_repositories_on_github"}
        </a>
        <div className="text-[11px] text-text-muted font-mono uppercase tracking-widest">
          {projects.length} projects found
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
