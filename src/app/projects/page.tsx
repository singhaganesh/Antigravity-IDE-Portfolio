'use client';

import React, { useState, useEffect } from 'react';
import { Star, GitFork, ExternalLink, Github, Search, FolderOpen } from 'lucide-react';
import { GitHubRepo, Project } from '@/lib/github';

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.github.com/users/singhaganesh/repos?sort=updated&per_page=100&type=public`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }

      const repos: GitHubRepo[] = await response.json();
      
      const portfolioProjects = repos
        .filter(repo => 
          !repo.fork && 
          repo.visibility === 'public' &&
          repo.topics?.includes('portfolio')
        )
        .map(repo => ({
          id: repo.id,
          name: formatRepoName(repo.name),
          tag: repo.language || 'Project',
          desc: repo.description || 'No description available',
          stack: getStack(repo),
          tagColor: getLanguageColor(repo.language),
          demo: repo.homepage || '#',
          github: repo.html_url,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          featured: true,
        }));

      setProjects(portfolioProjects);
      setError(null);
    } catch (err) {
      console.error('Error fetching repos:', err);
      setError('Failed to load projects from GitHub');
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = 
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.stack.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="px-10 py-12 animate-fadeUp">
        <div className="text-text-green text-[15px] font-mono mb-8">
          {"// projects.js — loading from GitHub..."}
        </div>
        <div className="mb-10">
          <h1 className="text-[64px] font-black text-white leading-none font-display">Projects</h1>
          <p className="text-text-muted text-[14px] font-mono mt-2">{"// things I've shipped"}</p>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center gap-3 text-text-muted font-mono">
            <div className="w-4 h-4 border-2 border-text-muted border-t-transparent rounded-full animate-spin" />
            Loading portfolio projects...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-10 py-12 animate-fadeUp">
      <div className="text-text-green text-[15px] font-mono mb-8">
        {"// projects.js — things I've shipped"}
      </div>

      <div className="mb-10">
        <h1 className="text-[64px] font-black text-white leading-none font-display">Projects</h1>
        <p className="text-text-muted text-[14px] font-mono mt-2">
          {"// featured work — sourced from GitHub"}
        </p>
      </div>

      <div className="mb-8">
        <div className="relative max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-bg-sidebar border border-border-color rounded pl-10 pr-4 py-2 text-[13px] font-mono text-text-primary focus:outline-none focus:border-[#00e5cc] transition-colors"
          />
        </div>
      </div>

      {error && (
        <div className="bg-[#3d1e1e] border border-[#f44747] text-[#f44747] text-[13px] font-mono p-3 rounded mb-6">
          {error}
        </div>
      )}

      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-bg-sidebar border border-border-color rounded-sm p-6 hover:border-[#00e5cc] transition-all duration-200 group flex flex-col"
            >
              <div className="flex justify-between items-start mb-2">
                <span
                  className="text-[11px] font-mono px-2 py-0.5 rounded border border-border-color bg-bg-editor"
                  style={{ color: project.tagColor }}
                >
                  {project.tag}
                </span>
              </div>

              <h3 className="text-[18px] font-bold text-white font-display group-hover:text-[#00e5cc] transition-colors">
                {project.name}
              </h3>

              <p className="text-[13px] text-text-muted mt-2 leading-relaxed font-mono flex-1">
                {project.desc}
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                {project.stack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="bg-bg-editor text-text-primary text-[11px] font-mono px-2 py-0.5 border border-border-color rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border-color">
                <div className="flex items-center gap-1 text-text-muted text-[12px] font-mono">
                  <Star size={14} className="text-[#f7df1e]" />
                  <span>{project.stars}</span>
                </div>
                <div className="flex items-center gap-1 text-text-muted text-[12px] font-mono">
                  <GitFork size={14} />
                  <span>{project.forks}</span>
                </div>
              </div>

              <div className="flex gap-4 mt-4">
                {project.demo && project.demo !== '#' && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00e5cc] text-[13px] font-mono hover:underline flex items-center gap-1"
                  >
                    <ExternalLink size={14} /> Live Demo
                  </a>
                )}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted text-[13px] font-mono hover:text-white flex items-center gap-1 transition-colors"
                >
                  <Github size={14} /> GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-text-muted">
          <FolderOpen size={48} className="mb-4 opacity-50" />
          <p className="font-mono text-[14px] mb-2">No portfolio projects found</p>
          <p className="font-mono text-[12px] opacity-70">
            Add the portfolio topic to your repos on GitHub
          </p>
        </div>
      )}

      <div className="mt-10">
        <a
          href="https://github.com/singhaganesh"
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-muted hover:text-[#00e5cc] font-mono text-[14px] transition-colors flex items-center gap-2"
        >
          <Github size={16} />
          {"// view all repositories on GitHub →"}
        </a>
      </div>
    </div>
  );
};

function formatRepoName(name: string): string {
  return name
    .replace(/-/g, ' ')
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function getStack(repo: GitHubRepo): string[] {
  const stack: string[] = [];
  
  if (repo.language) {
    stack.push(repo.language);
  }
  
  if (repo.topics) {
    const otherTopics = repo.topics
      .filter(t => t !== 'portfolio')
      .slice(0, 4);
    stack.push(...otherTopics);
  }
  
  return [...new Set(stack)].slice(0, 5);
}

function getLanguageColor(language: string | null): string {
  const colors: { [key: string]: string } = {
    TypeScript: '#3178c6',
    JavaScript: '#f7df1e',
    Python: '#3572A5',
    React: '#61dafb',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Go: '#00ADD8',
    Rust: '#dea584',
    Java: '#b07219',
    'C++': '#f34b7d',
    Swift: '#F05138',
    Kotlin: '#A97BFF',
    Ruby: '#701516',
    PHP: '#4F5D95',
    Dart: '#00B4AB',
  };
  return language ? (colors[language] || '#858585') : '#858585';
}

export default ProjectsPage;
