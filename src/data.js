// ─────────────────────────────────────────────────────────────────────────────
// Portfolio content — edit everything here to make this site your own.
// Placeholder text is used where real details aren't available yet.
// ─────────────────────────────────────────────────────────────────────────────

export const profile = {
  name: "Mohamed Lotfi",
  role: "Full-Stack Developer",
  tagline:
    "I build fast, accessible, and delightful web applications from front to back.",
  location: "Remote · Worldwide",
  email: "mohamed.lotfi.dev@gmail.com",
  resumeUrl: "#", // drop a link to your PDF resume here
  socials: {
    github: "https://github.com/lotfi029",
    linkedin: "https://www.linkedin.com/",
    twitter: "https://twitter.com/",
  },
}

export const about = {
  paragraphs: [
    "I'm a full-stack developer who loves turning ideas into polished products. My focus is on clean architecture, performance, and user experience — shipping software that's a pleasure to use and to maintain.",
    "I work comfortably across the stack: building responsive interfaces with React, designing robust APIs, and deploying to the cloud. I care deeply about code quality, testing, and clear communication.",
    "When I'm not coding, I'm exploring new tech, contributing to open source, and continuously sharpening my craft.",
  ],
  highlights: [
    { value: "5+", label: "Years of experience" },
    { value: "30+", label: "Projects shipped" },
    { value: "15+", label: "Happy clients" },
  ],
}

export const skills = [
  {
    category: "Frontend",
    items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Vite", "Redux"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "NestJS", "REST APIs", "GraphQL", "WebSockets"],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "MySQL"],
  },
  {
    category: "DevOps & Tools",
    items: ["Docker", "Git", "CI/CD", "AWS", "Vercel", "Linux"],
  },
]

export const experience = [
  {
    role: "Senior Full-Stack Developer",
    company: "Tech Company",
    period: "2023 — Present",
    description:
      "Lead development of scalable web applications, mentor junior engineers, and drive architecture decisions across frontend and backend services.",
    achievements: [
      "Reduced page load time by 45% through code-splitting and caching strategies.",
      "Designed and shipped a microservices-based API serving millions of requests.",
      "Established testing and CI/CD pipelines that cut deployment time in half.",
    ],
  },
  {
    role: "Full-Stack Developer",
    company: "Startup Inc.",
    period: "2021 — 2023",
    description:
      "Built customer-facing features end to end, from database schema to pixel-perfect UI, in a fast-moving product team.",
    achievements: [
      "Delivered the core dashboard used daily by thousands of users.",
      "Integrated third-party payment and authentication providers.",
      "Improved test coverage from 20% to 80% across the codebase.",
    ],
  },
  {
    role: "Frontend Developer",
    company: "Digital Agency",
    period: "2019 — 2021",
    description:
      "Crafted responsive, accessible websites and web apps for a range of clients across industries.",
    achievements: [
      "Built 20+ client websites with a focus on performance and SEO.",
      "Created a reusable component library adopted across projects.",
    ],
  },
]

export const projects = [
  {
    title: "Project One",
    description:
      "A full-featured SaaS dashboard with real-time analytics, role-based access control, and a polished, responsive UI.",
    tags: ["React", "Node.js", "PostgreSQL", "Tailwind"],
    demo: "#",
    repo: "#",
    featured: true,
  },
  {
    title: "Project Two",
    description:
      "An e-commerce platform with cart, checkout, payment integration, and an admin panel for inventory management.",
    tags: ["Next.js", "Stripe", "Prisma", "MongoDB"],
    demo: "#",
    repo: "#",
    featured: true,
  },
  {
    title: "Project Three",
    description:
      "A real-time collaboration tool with live editing, presence, and websocket-powered updates.",
    tags: ["React", "WebSockets", "Express", "Redis"],
    demo: "#",
    repo: "#",
    featured: false,
  },
  {
    title: "Project Four",
    description:
      "A mobile-first progressive web app for task management with offline support and push notifications.",
    tags: ["TypeScript", "PWA", "IndexedDB"],
    demo: "#",
    repo: "#",
    featured: false,
  },
]

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
]
