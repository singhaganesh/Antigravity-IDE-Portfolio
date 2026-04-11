import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const USERNAME = 'singhaganesh';
const OUTPUT_FILE = path.join(__dirname, '../src/data/projects.json');

async function getArchitecture(repoName) {
  try {
    const branches = ['main', 'master'];
    let text = '';
    
    for (const branch of branches) {
      const response = await fetch(`https://raw.githubusercontent.com/${USERNAME}/${repoName}/${branch}/README.md`);
      if (response.ok) {
        text = await response.text();
        break;
      }
    }

    if (!text) return null;

    // Regex to find "## System Architecture" and grab content until the next "##" or end of file
    const regex = /## System Architecture([\s\S]*?)(?=\n## |$)/i;
    const match = text.match(regex);
    
    return match ? match[1].trim() : null;
  } catch (error) {
    console.error(`Failed to fetch README for ${repoName}:`, error.message);
    return null;
  }
}

async function getTechStack(repoName) {
  try {
    const branches = ['main', 'master'];
    let text = '';
    
    for (const branch of branches) {
      const response = await fetch(`https://raw.githubusercontent.com/${USERNAME}/${repoName}/${branch}/README.md`);
      if (response.ok) {
        text = await response.text();
        break;
      }
    }

    if (!text) return [];

    // Regex to find "Tech Stack" or "Built With" or "Technologies" 
    // Allowing for emojis or other text before/after the words
    const regex = /## .*?(?:Tech Stack|Built With|Technologies).*?([\s\S]*?)(?=\n## |$)/i;
    const match = text.match(regex);
    
    if (match) {
      const content = match[1].trim();
      const lines = content.split('\n');
      const stack = [];

      // Category words to skip if they are bolded (since they aren't real tech)
      const categoriesToSkip = [
        'backend', 'frontend', 'mobile', 'testing', 'code quality', 
        'containerization', 'orchestration', 'ci/cd', 'vcs', 'server', 
        'reverse proxy', 'ssl/tls', 'monitoring', 'logging', 'core', 
        'ui & animation', 'visuals', 'state management', 'data',
        'category', 'technology', 'purpose', 'version'
      ];

      for (let line of lines) {
        line = line.trim();
        if (!line) continue;

        // Find ALL bolded occurrences in the line (**item**)
        const boldMatches = line.matchAll(/\*\*([^*]+)\*\*/g);
        
        for (const boldMatch of boldMatches) {
          let tech = boldMatch[1].trim();
          
          // Cleanup links inside bold
          tech = tech.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
          
          const lowerTech = tech.toLowerCase();
          
          // Skip if the tech name is just a generic category or header label
          const isCategory = categoriesToSkip.some(cat => lowerTech.includes(cat));
          
          if (tech && tech.length < 50 && !isCategory) {
            stack.push(tech);
          }
        }

        // Fallback: If no bold matches found but it's a simple list item
        if (stack.length === 0 && (line.startsWith('-') || line.startsWith('*'))) {
          let fallbackTech = line.replace(/^[-*\d.]+\s*/, '').split(':')[0].trim();
          fallbackTech = fallbackTech.replace(/\*\*|\__/g, '');
          if (fallbackTech && fallbackTech.length < 50) {
            stack.push(fallbackTech);
          }
        }
      }
      
      return stack;
    }
    return [];
  } catch (error) {
    console.error(`Failed to fetch Tech Stack for ${repoName}:`, error.message);
    return [];
  }
}

async function fetchProjects() {
  console.log(`Fetching repositories for ${USERNAME}...`);
  try {
    const response = await fetch(
      `https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=100&type=public`
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const repos = await response.json();
    
    const projects = [];
    
    for (const repo of repos) {
      if (!repo.fork && repo.visibility === 'public' && repo.topics?.includes('portfolio')) {
        console.log(`Processing ${repo.name}...`);
        
        const architecture = await getArchitecture(repo.name);
        const readmeStack = await getTechStack(repo.name);
        
        // Merge primary language with README stack and topics
        const combinedStack = [
          repo.language,
          ...readmeStack,
          ...(repo.topics || []).filter(t => t !== 'portfolio')
        ].filter(Boolean);

        // Deduplicate and limit to top 10 items
        const finalStack = [...new Set(combinedStack)].slice(0, 10);
        
        projects.push({
          id: repo.id,
          name: formatRepoName(repo.name),
          originalName: repo.name,
          tag: repo.language || 'Project',
          desc: repo.description || 'No description available',
          architecture: architecture,
          stack: finalStack,
          tagColor: getLanguageColor(repo.language),
          demo: repo.homepage || '#',
          github: repo.html_url,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          updatedAt: repo.updated_at,
        });
      }
    }

    console.log(`Saved ${projects.length} projects with architecture snippets.`);
    await fs.writeFile(OUTPUT_FILE, JSON.stringify(projects, null, 2));

  } catch (error) {
    console.error('Failed to sync projects:', error.message);
    process.exit(1);
  }
}

function formatRepoName(name) {
  return name
    .replace(/-/g, ' ')
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function getStack(repo) {
  const stack = [];
  if (repo.language) stack.push(repo.language);
  if (repo.topics) {
    const otherTopics = repo.topics
      .filter(t => t !== 'portfolio')
      .slice(0, 4);
    stack.push(...otherTopics);
  }
  return [...new Set(stack)].slice(0, 5);
}

function getLanguageColor(language) {
  const colors = {
    TypeScript: '#3178c6',
    JavaScript: '#f7df1e',
    Python: '#3572A5',
    React: '#61dafb',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Go: '#00ADD8',
    Rust: '#dea584',
  };
  return language ? (colors[language] || '#858585') : '#858585';
}

fetchProjects();
