// ─────────────────────────────────────────────────────────────────────────────
// Portfolio content for Mohamed Lotfi — sourced from CV.
// Edit anything here to update the site.
// ─────────────────────────────────────────────────────────────────────────────

export const profile = {
  name: "Mohamed Lotfi",
  role: "Software Development Engineer",
  tagline:
    "I design and build scalable backend systems, microservices, and distributed applications with .NET Core — practiced in Clean Architecture, CQRS, and cloud-native deployment on AWS.",
  location: "Cairo, Egypt",
  email: "mohamed.lotfi.dev@gmail.com",
  phone: "+20 103 028 6574",
  photo: "/profile.jpg",
  resumeUrl: "#", // drop a link to your PDF resume here
  socials: {
    github: "https://github.com/lotfi029",
    linkedin: "https://www.linkedin.com/in/mohamedlotf/",
  },
}

export const about = {
  paragraphs: [
    "I'm a Software Development Engineer with strong CS fundamentals in OOP, algorithms, and data structures — an ECPC Finalist with 600+ competitive-programming problems solved.",
    "I have hands-on experience in .NET Core, microservices, and distributed systems, and I'm practiced in TDD, CI/CD, Clean Architecture, and cloud-native deployment with Docker and Kubernetes on AWS.",
    "I'm passionate about building reliable payment and fintech solutions that scale to millions of users, with a proven track record of improving performance and maintainability on production systems.",
  ],
  highlights: [
    { value: "600+", label: "Problems solved" },
    { value: "ECPC '24", label: "Programming finalist" },
    { value: "1,000+", label: "Users served" },
    { value: "30%", label: "Faster APIs" },
  ],
}

export const skills = [
  {
    category: "Languages",
    items: ["C#", "SQL", "Python", "JavaScript", "TypeScript"],
  },
  {
    category: "Backend",
    items: [
      ".NET Core",
      "ASP.NET Core",
      "REST APIs",
      "Microservices",
      "CQRS",
      "DDD",
      "Clean Architecture",
      "SOA",
      "gRPC",
    ],
  },
  {
    category: "Frontend",
    items: ["React.js", "Angular"],
  },
  {
    category: "Data Access",
    items: [
      "EF Core",
      "Dapper",
      "PostgreSQL",
      "SQL Server",
      "MongoDB",
      "Redis",
      "Elasticsearch",
    ],
  },
  {
    category: "Cloud & DevOps",
    items: [
      "AWS (EKS, EC2, RDS, SQS/SNS, IAM)",
      "Docker",
      "Kubernetes",
      "GitHub Actions",
      "Jenkins",
    ],
  },
  {
    category: "Practices & Tools",
    items: [
      "TDD",
      "Code Reviews",
      "CI/CD",
      "Unit & Integration Testing",
      "Design Patterns",
      "Git",
      "Linux",
    ],
  },
]

export const experience = [
  {
    role: "Cloud Solution Architect Intern",
    company: "National Telecommunication Institute (NTI)",
    period: "Jan 2026 — May 2026",
    description:
      "Worked on production-grade, cloud-native deployments and infrastructure.",
    achievements: [
      "Deployed and managed containerized .NET Core and cloud-native applications on Kubernetes; applied AWS IAM, VPC security groups, and least-privilege access patterns.",
      "Practiced CI/CD pipelines with GitHub Actions and Jenkins; gained hands-on experience with service-oriented architecture across EC2, S3, RDS, and EKS.",
    ],
  },
  {
    role: "Software Engineer / Technical Lead",
    company: "Software Development Center — Kafr El-Sheikh University",
    period: "Nov 2024 — Jun 2025",
    description:
      "Led backend development and engineering practices for production systems.",
    achievements: [
      "Architected and maintained .NET Core backend systems supporting 1,000+ users; reduced average API response time by 30% through query optimization and caching.",
      "Led code reviews, enforced TDD practices, and refactored legacy components to Clean Architecture — improving testability, maintainability, and team velocity.",
      "Mentored students as Technical Lead for .NET and SQL; organized and ran ACM-style programming contests.",
    ],
  },
  {
    role: "Freelance Backend Developer",
    company: "Remote",
    period: "Jul 2025 — Oct 2025",
    description:
      "Delivered targeted fixes and performance work on legacy .NET and SQL systems.",
    achievements: [
      "Resolved 8+ critical bugs in .NET legacy systems and refactored 5K+ lines for improved stability and readability.",
      "Optimized 10+ SQL Server stored procedures using advanced indexing and execution-plan analysis, reducing query latency by up to 20%.",
    ],
  },
]

export const projects = [
  {
    title: "Cloud-Native E-Commerce Platform",
    description:
      "Distributed microservices (product, order, payment) deployed on EKS within a secured AWS VPC; event-driven with SQS/SNS, a hybrid data layer (RDS, DynamoDB, ElastiCache), Secrets Manager, ALB load balancing, and Auto Scaling.",
    tags: [".NET Microservices", "AWS EKS", "SQS/SNS", "DDD", "Kubernetes"],
    period: "Mar 2026 — May 2026",
    repo: "https://github.com/lotfi029/ecommerce-cloud-native",
    demo: "",
    featured: true,
  },
  {
    title: "Catalog Service",
    description:
      "Production-ready microservice applying CQRS with separate read/write models, optimized reads via Dapper, Redis caching, and full-text search via Elasticsearch — with structured logging and a full CI/CD pipeline.",
    tags: ["CQRS", "Dapper", "Redis", "PostgreSQL", "Elasticsearch", "CI/CD"],
    period: "Oct 2025 — Jan 2026",
    repo: "https://github.com/lotfi029/CatalogService",
    demo: "",
    featured: true,
  },
  {
    title: "Survey-Basket",
    description:
      "Survey management platform built with TDD, background jobs via Hangfire, and Serilog structured logging; Repository, Unit-of-Work, and Result patterns ensure consistency across concurrent operations.",
    tags: [".NET Core", "SQL Server", "Clean Architecture", "TDD", "Hangfire"],
    period: "Dec 2024 — Jan 2025",
    repo: "https://github.com/lotfi029/Survay-Basket",
    demo: "",
    featured: false,
  },
  {
    title: "Social-Bridge",
    description:
      "AI-integrated full-stack platform for real-time, structured user interactions; a Clean Architecture .NET backend paired with a React frontend, designed for scalability and testability.",
    tags: [".NET Core", "React", "AI Integration", "Clean Architecture"],
    period: "Nov 2024 — Jun 2025",
    repo: "https://github.com/lotfi029/Autine",
    demo: "",
    featured: false,
  },
]

export const education = [
  {
    school: "Kafr El-Sheikh University",
    degree: "B.Sc. in Computer Science",
    location: "Kafr El-Sheikh, Egypt",
    period: "Sep 2021 — Jun 2025",
  },
]

export const achievements = [
  {
    title: "ECPC Finalist 2024",
    detail:
      "Qualified to the finals of the Egyptian Collegiate Programming Contest (ICPC regional).",
  },
  {
    title: "600+ Problems Solved",
    detail:
      "Solved 600+ competitive-programming problems, sharpening algorithms and data-structures skills.",
  },
]

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
]
