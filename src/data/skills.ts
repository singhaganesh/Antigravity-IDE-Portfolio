export interface SkillCluster {
  label: string;
  color: string;
  icon: string;
  skills: string[];
}

export interface Experience {
  role: string;
  company: string;
  dates: string;
  description: string;
}

export const skillClusters: SkillCluster[] = [
  { 
    label: "Frontend",      
    color: "#9cdcfe", 
    icon: "◈",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML / CSS", "Framer Motion"] 
  },
  { 
    label: "Backend",       
    color: "#4ec9b0", 
    icon: "◉",
    skills: ["Node.js", "Express.js", "Python", "REST APIs", "GraphQL", "PostgreSQL"] 
  },
  { 
    label: "Tools & Infra", 
    color: "#dcdcaa", 
    icon: "◇",
    skills: ["Git", "Docker", "AWS", "MongoDB", "Vercel", "Linux"] 
  }
];

export const learning: string[] = ["Rust", "Web3", "Go"];

export const experience: Experience[] = [
  {
    role: "Full Stack Developer",
    company: "Freelance / Open Source",
    dates: "2023 - Present",
    description: "Building scalable web applications using React, Next.js, and Node.js. Contributing to various open-source projects."
  },
  {
    role: "Junior Web Developer",
    company: "Tech Solutions Inc.",
    dates: "2021 - 2023",
    description: "Developed and maintained client websites, improved performance by 30%, and collaborated with the design team for pixel-perfect UIs."
  }
];
