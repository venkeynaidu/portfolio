export interface ExperienceItem {
  company: string;
  location: string;
  role: string;
  period: string;
  current?: boolean;
  client?: string;
  project?: string;
  environment: string[];
  description: string;
  responsibilities: string[];
}

export interface ProjectItem {
  title: string;
  category: string;
  client?: string;
  period: string;
  role: string;
  environment: string[];
  description: string;
  highlights: string[];
  featured?: boolean;
}

export interface SkillCategory {
  title: string;
  description: string;
  iconName: string;
  skills: { name: string; level: number; tag?: string }[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  year: string;
  details?: string;
}

export interface AchievementItem {
  title: string;
  organization: string;
  metric: string;
  description: string;
}

export const portfolioData = {
  personal: {
    name: "Garaga Venkatesh",
    title: "Full Stack Developer & Software Engineer",
    tagline: "Architecting scalable web applications, event-driven systems & resilient cloud solutions.",
    summary:
      "Full Stack Developer with 6 years of experience architecting scalable web applications using Python (Django, FastAPI), Laravel, React.js, MySQL, and Apache Kafka. Proficient in building event-driven RESTful APIs, optimizing database performance, and automating end-to-end testing with Playwright and Postman. Hands-on expertise in cloud-native deployment using AWS (IAM), Docker, and Kubernetes within Agile workflows to deliver secure, high-quality software solutions.",
    email: "venkateshgaraga5g@gmail.com",
    phone: "+91-9490661434",
    location: "Bangalore, India",
    profileImage: "/profile.jpg",
    resumePdf: "/Venkatesh_Garaga_Resume.pdf",
    availability: "Available for Senior / Lead Full-Stack Engineering roles",
  },

  stats: [
    { label: "Years Experience", value: "6+", subtext: "Full-Stack & Cloud Architecture" },
    { label: "Enterprise Platforms", value: "3", subtext: "Defense, Aerospace & Industrial ERPs" },
    { label: "Uptime & Reliability", value: "99.9%", subtext: "Containerized Cloud Deployments" },
    { label: "Test Automation", value: "100%", subtext: "End-to-End Playwright & Postman" },
  ],

  skillCategories: [
    {
      title: "Backend & Architecture",
      description: "Robust RESTful APIs, microservices & event-driven design",
      iconName: "Server",
      skills: [
        { name: "Python 3.12", level: 95, tag: "Primary" },
        { name: "Django & DRF", level: 95, tag: "Core" },
        { name: "FastAPI", level: 90, tag: "High Performance" },
        { name: "Apache Kafka", level: 88, tag: "Event Streaming" },
        { name: "PHP & Laravel", level: 82 },
        { name: "RESTful API Design", level: 95 },
      ],
    },
    {
      title: "Frontend & UI Engineering",
      description: "Interactive single-page apps, dashboards & modern design systems",
      iconName: "Layout",
      skills: [
        { name: "React.js", level: 92, tag: "Core" },
        { name: "JavaScript (ES6+)", level: 92 },
        { name: "TypeScript", level: 85 },
        { name: "Tailwind CSS", level: 90 },
        { name: "Framer Motion", level: 85 },
        { name: "HTML5 / CSS3", level: 95 },
      ],
    },
    {
      title: "Cloud, DevOps & Testing",
      description: "Containerization, orchestration & automated verification",
      iconName: "Cloud",
      skills: [
        { name: "Docker", level: 90, tag: "Containers" },
        { name: "Kubernetes", level: 85, tag: "Orchestration" },
        { name: "AWS (IAM & Cloud)", level: 82, tag: "Cloud Native" },
        { name: "Playwright (E2E)", level: 90, tag: "Automated QA" },
        { name: "Postman & API Testing", level: 92 },
        { name: "Git & Bitbucket", level: 92 },
      ],
    },
    {
      title: "Databases & AI Tools",
      description: "Relational persistence, optimization & intelligent workflows",
      iconName: "Database",
      skills: [
        { name: "MySQL Schema Design", level: 92, tag: "DB" },
        { name: "ORM Query Optimization", level: 90 },
        { name: "Antigravity & Claude Code", level: 88, tag: "AI Tooling" },
        { name: "VSCode & PyCharm", level: 95 },
        { name: "Jira & Agile Workflows", level: 92 },
        { name: "Pip & Package Mgmt", level: 90 },
      ],
    },
  ],

  experience: [
    {
      company: "Micro Genesis Tech Soft Pvt. Ltd",
      location: "Bangalore, India",
      role: "Software Engineer",
      period: "November 2024 – Present",
      current: true,
      client: "Aeronautical Development Agency (ADA)",
      project: "Project Management System (PMS)",
      environment: [
        "Python",
        "Django",
        "FastAPI",
        "Django REST Framework",
        "React.js",
        "MySQL",
        "Apache Kafka",
        "Docker",
        "Kubernetes",
        "Playwright",
      ],
      description:
        "Architecting and delivering a mission-critical web-based Project Management and Reporting System for the Aeronautical Development Agency, enabling high-performance tracking and seamless cross-functional communication.",
      responsibilities: [
        "Architected scalable backend modules and RESTful APIs using Python, Django, DRF, and FastAPI, alongside event-driven workflows via Apache Kafka.",
        "Designed and optimized MySQL database schemas and Django ORM models to power real-time reporting and complex analytical queries.",
        "Developed interactive ticket management, task assignment, and analytics dashboard modules integrated with React.js.",
        "Automated end-to-end and API testing with Playwright and Postman, while orchestrating containerized deployments using Docker, Kubernetes, and Git.",
      ],
    },
    {
      company: "Tulasi Technologies Pvt. Ltd",
      location: "Bangalore, India",
      role: "Software Engineer",
      period: "December 2021 – October 2024",
      current: false,
      client: "Sri Bhagya Lakshmi Enterprises & Poultry Industry",
      project: "Enterprise Workflow Automation & Poultry ERP System",
      environment: [
        "Python",
        "Django",
        "FastAPI",
        "DRF",
        "React.js",
        "MySQL",
        "Apache Kafka",
        "AWS (IAM)",
        "Docker",
        "Kubernetes",
        "Playwright",
        "Apache",
      ],
      description:
        "Engineered two comprehensive, scalable enterprise web applications automating end-to-end production, vehicle fleet management, sales, purchasing, inventory, and accounting workflows.",
      responsibilities: [
        "Collaborated with clients and cross-functional teams in an Agile environment to gather requirements and architect scalable backend services.",
        "Developed secure RESTful APIs, real-time event streaming with Apache Kafka, and interactive React.js frontends across hatchery, inventory, accounting, invoicing, and fleet logistics modules.",
        "Automated end-to-end, functional, and API testing using Playwright and Postman to validate business logic and maintain release quality.",
        "Managed cloud deployment, CI/CD workflows, and server maintenance on AWS (IAM) using Docker, Kubernetes, Apache, and Git to ensure high uptime and system security.",
      ],
    },
    {
      company: "Arowana Software Solutions Pvt. Ltd",
      location: "Visakhapatnam, India",
      role: "Jr Software Developer",
      period: "September 2020 – September 2021",
      current: false,
      environment: ["Python", "JavaScript", "HTML5", "CSS3", "MySQL", "Git"],
      description:
        "Developed web applications, optimized database interactions, and contributed to frontend and backend service components in an Agile software development lifecycle.",
      responsibilities: [
        "Built responsive web interfaces and integrated RESTful endpoints with backend services.",
        "Wrote clean, maintainable Python code and performed database query optimization on MySQL.",
        "Participated in sprint planning, code reviews, and bug resolution to deliver reliable features.",
      ],
    },
  ],

  projects: [
    {
      title: "Project Management System (PMS)",
      category: "Defense & Aerospace Enterprise",
      client: "Aeronautical Development Agency",
      period: "2024 – Present",
      role: "Software Engineer",
      featured: true,
      environment: ["Python", "Django", "FastAPI", "React.js", "MySQL", "Apache Kafka", "Docker", "Kubernetes", "Playwright"],
      description:
        "Enterprise-grade project management and analytical reporting portal engineered for the Aeronautical Development Agency. Enables real-time task creation, ticket assignment, and progress auditing across engineering divisions.",
      highlights: [
        "Event-driven notification pipeline using Apache Kafka for real-time task assignments and updates",
        "Interactive React.js analytics dashboard providing leadership visibility into project milestones",
        "Robust RESTful API suite built with FastAPI and Django REST Framework",
        "Containerized with Docker and orchestrated via Kubernetes for high availability",
        "Automated end-to-end regression testing with Playwright to maintain zero-defect standards",
      ],
    },
    {
      title: "Sri Bhagya Lakshmi Enterprises ERP",
      category: "Industrial Workflow Automation",
      client: "Sri Bhagya Lakshmi Enterprises",
      period: "2022 – 2024",
      role: "Software Engineer",
      featured: true,
      environment: ["Python", "Django", "FastAPI", "React.js", "MySQL", "Apache Kafka", "AWS (IAM)", "Docker", "Kubernetes"],
      description:
        "Scalable enterprise web application automating end-to-end manufacturing production, vehicle fleet management, sales, purchases, inventory, and multi-entry financial accounting.",
      highlights: [
        "Streamlined supply chain logistics with live vehicle tracking and dispatch workflows",
        "Architected high-throughput backend services and REST APIs with event streaming",
        "Optimized complex MySQL schemas for accurate and instantaneous financial reports",
        "Deployed secure containerized services on AWS with IAM security policies",
      ],
    },
    {
      title: "Comprehensive Poultry Industry ERP",
      category: "Agricultural Supply Chain",
      client: "Poultry Industry Consortium",
      period: "2021 – 2024",
      role: "Software Engineer",
      featured: true,
      environment: ["Python", "Django", "FastAPI", "React.js", "MySQL", "Apache Kafka", "Playwright", "Docker"],
      description:
        "End-to-end ERP platform tailored for poultry production lifecycle, managing hatcheries, feed formulation, veterinary inventory, invoicing, sales distribution, and fleet operations.",
      highlights: [
        "Hatchery and flock lifecycle tracking from incubation to distribution",
        "Integrated sales, inventory, and automated billing generation module",
        "Real-time event-driven messaging via Apache Kafka ensuring data consistency across modules",
        "Automated verification suite with Playwright and Postman preventing critical business logic flaws",
      ],
    },
    {
      title: "Event-Driven Microservices & Telemetry Pipeline",
      category: "Distributed Systems Architecture",
      period: "2023 – 2024",
      role: "Lead Backend Developer",
      featured: false,
      environment: ["Apache Kafka", "FastAPI", "Python 3.12", "Docker", "Postman"],
      description:
        "High-performance asynchronous event bus connecting decoupled microservices for logging, task queues, and instant client notifications.",
      highlights: [
        "Sub-50ms message delivery across distributed worker nodes",
        "Graceful consumer group rebalancing and failure recovery mechanisms",
        "Interactive OpenAPI documentation and automated API test suites",
      ],
    },
  ],

  education: [
    {
      degree: "B.Tech in Electrical and Electronics Engineering (EEE)",
      institution: "Sri Prakash College of Engineering (JNTUK)",
      year: "2018",
      details: "Comprehensive engineering foundation in systems, circuits, logic design, and computational problem solving.",
    },
    {
      degree: "Intermediate (MPC: Mathematics, Physics, Chemistry)",
      institution: "Government Junior College",
      year: "2014",
      details: "State board certification with distinction in mathematical analysis and sciences.",
    },
  ],

  achievements: [
    {
      title: "Defense & Aerospace Solution Delivery",
      organization: "Aeronautical Development Agency (ADA)",
      metric: "Mission Critical",
      description:
        "Architected and deployed secure, high-availability project management modules meeting stringent aerospace security requirements.",
    },
    {
      title: "Real-Time Event Architecture at Scale",
      organization: "Enterprise ERP Applications",
      metric: "Sub-50ms Latency",
      description:
        "Implemented Apache Kafka event streaming to power concurrent notifications, logistics updates, and live business dashboards.",
    },
    {
      title: "Automated QA & Zero Regression",
      organization: "Continuous Integration Pipeline",
      metric: "100% Automation",
      description:
        "Automated comprehensive end-to-end Playwright and Postman test suites, significantly reducing release cycle bugs.",
    },
    {
      title: "Cloud-Native Infrastructure on AWS",
      organization: "Docker & Kubernetes Orchestration",
      metric: "99.9% Uptime",
      description:
        "Containerized mission-critical services, hardened IAM policies, and maintained resilient cloud infrastructure.",
    },
  ],
};
