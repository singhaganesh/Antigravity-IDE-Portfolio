export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  fork: boolean;
  visibility: string;
  updated_at: string;
  created_at: string;
  pushed_at: string;
}

export interface Project {
  id: number;
  name: string;
  tag: string;
  desc: string;
  stack: string[];
  tagColor: string;
  demo: string;
  github: string;
  stars: number;
  forks: number;
  featured?: boolean;
}

const GITHUB_USERNAME = 'singhaganesh';

// Map GitHub language to a tag color
const languageColors: { [key: string]: string } = {
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  Python: '#3572A5',
  React: '#61dafb',
  'Next.js': '#61dafb',
  Vue: '#41b883',
  HTML: '#e34c26',
  CSS: '#563d7c',
  SCSS: '#c6538c',
  Go: '#00ADD8',
  Rust: '#dea584',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Dart: '#00B4AB',
  Shell: '#89e051',
};

// Map language to tag color
function getTagColor(language: string | null): string {
  if (!language) return '#858585';
  return languageColors[language] || '#858585';
}

// Determine project type tag
function getProjectTag(language: string | null, topics: string[]): string {
  if (topics.includes('frontend')) return 'Frontend';
  if (topics.includes('backend')) return 'Backend';
  if (topics.includes('fullstack')) return 'Full Stack';
  if (topics.includes('api')) return 'API';
  if (topics.includes('cli')) return 'CLI';
  if (topics.includes('machine-learning')) return 'ML/AI';
  if (topics.includes('blockchain')) return 'Web3';
  
  switch (language) {
    case 'TypeScript':
    case 'JavaScript':
      return 'JavaScript';
    case 'Python':
      return 'Python';
    case 'Go':
      return 'Go';
    case 'Rust':
      return 'Rust';
    default:
      return language || 'Project';
  }
}

// Transform GitHub repo to Project format
function transformRepo(repo: GitHubRepo): Project {
  const stack: string[] = [];
  
  if (repo.language) {
    stack.push(repo.language);
  }
  
  // Add topics as stack items (limit to 4)
  if (repo.topics) {
    stack.push(...repo.topics.filter(t => 
      !['featured', 'portfolio', 'frontend', 'backend', 'fullstack', 'api', 'cli'].includes(t)
    ).slice(0, 4));
  }
  
  return {
    id: repo.id,
    name: repo.name.replace(/-/g, ' ').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    tag: getProjectTag(repo.language, repo.topics || []),
    desc: repo.description || 'No description available',
    stack: [...new Set(stack)].slice(0, 5),
    tagColor: getTagColor(repo.language),
    demo: repo.homepage || '#',
    github: repo.html_url,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    featured: repo.topics?.includes('featured') || repo.topics?.includes('portfolio'),
  };
}

// Fetch repos from GitHub API
export async function getGitHubRepos(): Promise<Project[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30&type=public`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
        next: {
          revalidate: 3600, // Revalidate every hour
        },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos: GitHubRepo[] = await response.json();
    
    // Filter out forks and sort by stars
    const filteredRepos = repos
      .filter(repo => !repo.fork && repo.visibility === 'public')
      .sort((a, b) => b.stargazers_count - a.stargazers_count);
    
    return filteredRepos.map(transformRepo);
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}

// Get featured repos only
export async function getFeaturedRepos(): Promise<Project[]> {
  const allRepos = await getGitHubRepos();
  return allRepos.filter(repo => repo.featured);
}
