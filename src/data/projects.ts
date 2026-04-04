export interface Project {
  name: string;
  tag: string;
  desc: string;
  stack: string[];
  tagColor: string;
  demo: string;
  github: string;
}

export const projects: Project[] = [
  {
    name: "OrbitCart",
    tag: "Full Stack",
    desc: "A full-stack e-commerce platform with authentication, cart management, and payment integration.",
    stack: ["React", "Node.js", "MongoDB", "Stripe"],
    tagColor: "#4ec9b0",
    demo: "#",
    github: "#"
  },
  {
    name: "NebulaChat",
    tag: "Real-time",
    desc: "A real-time messaging app with rooms, typing indicators, and WebSocket connections.",
    stack: ["Next.js", "Socket.io", "PostgreSQL", "Tailwind"],
    tagColor: "#9cdcfe",
    demo: "#",
    github: "#"
  },
  {
    name: "GravityDash",
    tag: "Analytics",
    desc: "An analytics dashboard with interactive charts, live data simulation, and CSV export.",
    stack: ["React", "TypeScript", "Chart.js", "REST API"],
    tagColor: "#dcdcaa",
    demo: "#",
    github: "#"
  }
];
