import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const USERNAME = 'singhaganesh';
const OUTPUT_FILE = path.join(__dirname, '../src/data/projects.json');

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
    
    const projects = repos
      .filter(repo => 
        !repo.fork && 
        repo.visibility === 'public' &&
        repo.topics?.includes('portfolio')
      )
      .map(repo => ({
        id: repo.id,
        name: formatRepoName(repo.name),
        originalName: repo.name, // Keep original for mapping/ordering
        tag: repo.language || 'Project',
        desc: repo.description || 'No description available',
        stack: getStack(repo),
        tagColor: getLanguageColor(repo.language),
        demo: repo.homepage || '#',
        github: repo.html_url,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updatedAt: repo.updated_at,
        order: 999 // Default order
      }));

    console.log(`Found ${projects.length} portfolio projects.`);
    
    // Write to JSON
    await fs.writeFile(OUTPUT_FILE, JSON.stringify(projects, null, 2));
    console.log(`Saved to ${OUTPUT_FILE}`);

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
