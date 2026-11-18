export interface ExperienceItem {
  company: string;
  location: string;
  role: string;
  period: string;
  duration?: string;
  noticePeriod?: string;
  current?: boolean;
  client?: string;
  projects?: string[];
  topSkills?: string[];
  environment: string[];
  description: string;
  responsibilities: string[];
}

export interface ProjectItem {
  title: string;
  subtitle?: string;
  category: string;
  client: string;
  locationType: string;
  period: string;
  role: string;
  environment: string[];
  description: string;
  highlights: string[];
  featured?: boolean;
  screenshot?: string;
  tags?: string[];
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
    title: "Innovative Full Stack Developer & Cloud Engineer",
    tagline: "Architecting scalable web applications, event-driven streaming pipelines & air-gapped AI solutions.",
    summary:
      "Innovative Full Stack Developer with 6 years of experience architecting scalable, enterprise-grade web applications. Expert in leveraging Python (Django, FastAPI), React.js, and MySQL to build secure RESTful APIs and robust frontend interfaces. Proven track record of delivering complex, end-to-end solutions across diverse domains—including air-gapped AI video conferencing systems for defense clients, comprehensive ERP platforms, and multi-module e-commerce applications. Highly skilled in real-time event streaming with Apache Kafka, database optimization, and streamlining deployments using Docker and Kubernetes. Passionate about driving operational efficiency and intelligent automation through clean, maintainable code in fast-paced Agile environments.",
    email: "venkateshgaraga5g@gmail.com",
    phone: "+91-9490661434",
    location: "Bangalore, India",
    profileImage: "/profile.jpg",
    resumePdf: "/Venkatesh_Garaga_Resume.pdf",
    availability: "Available for Senior / Lead Full Stack Developer roles",
    noticePeriod: "1 Month Notice Period",
    naukriProfile: "Garaga Venkatesh",
    naukriStatus: "Verified Profile • 1 Month Notice Period",
    linkedinUrl: "https://www.linkedin.com/in/venkatesh-garaga-89a561199",
    linkedinNote: "Very easy to communicate with me with this social platform.",
    githubUrl: "https://github.com/venkeynaidu",
  },

  stats: [
    { label: "Years Experience", value: "6+", subtext: "Full Stack & Cloud Architecture" },
    { label: "Enterprise Projects", value: "7", subtext: "Defense, Industrial ERPs & Web Apps" },
    { label: "Notice Period", value: "1 Month", subtext: "Available for Immediate Joining" },
    { label: "Test Automation", value: "100%", subtext: "Automated E2E Playwright & Postman" },
  ],

  top5Skills: [
    "Python",
    "Django",
    "Flask",
    "React.js",
    "RESTful API",
    "MySQL",
    "Django REST Framework",
  ],

  skillCategories: [
    {
      title: "Backend & Microservices",
      description: "Robust RESTful APIs, high-throughput microservices & event streaming",
      iconName: "Server",
      skills: [
        { name: "Python 3.12", level: 96, tag: "Primary" },
        { name: "Django & DRF", level: 95, tag: "Core" },
        { name: "FastAPI", level: 92, tag: "High Speed" },
        { name: "Apache Kafka", level: 90, tag: "Event Streaming" },
        { name: "Flask", level: 88, tag: "Microservices" },
        { name: "RESTful API Design", level: 95 },
      ],
    },
    {
      title: "Frontend & UI Engineering",
      description: "Interactive real-time dashboards, component architecture & modern UX",
      iconName: "Layout",
      skills: [
        { name: "React.js", level: 94, tag: "Core" },
        { name: "JavaScript (ES6+)", level: 93 },
        { name: "HTML5 & CSS3", level: 95 },
        { name: "TypeScript", level: 86 },
        { name: "Tailwind CSS", level: 92 },
        { name: "Real-time Dashboards", level: 90 },
      ],
    },
    {
      title: "Cloud, DevOps & QA",
      description: "Containerization, cluster orchestration & 100% automated test coverage",
      iconName: "Cloud",
      skills: [
        { name: "Docker", level: 92, tag: "Containers" },
        { name: "Kubernetes", level: 86, tag: "Orchestration" },
        { name: "AWS (IAM & Cloud)", level: 84, tag: "Cloud Infrastructure" },
        { name: "Playwright (E2E)", level: 92, tag: "Automated QA" },
        { name: "Postman & API Testing", level: 94 },
        { name: "Git & Version Control", level: 94 },
      ],
    },
    {
      title: "Databases & System Optimization",
      description: "Complex relational schemas, TCL transactions & data replication",
      iconName: "Database",
      skills: [
        { name: "MySQL Schema Design", level: 94, tag: "Core DB" },
        { name: "TCL & DB Replication", level: 90, tag: "High Integrity" },
        { name: "Django ORM Optimization", level: 92 },
        { name: "Agile & Scrum Workflows", level: 94 },
        { name: "Jitsi Offline Integration", level: 88, tag: "Air-Gapped" },
        { name: "AI Speech-to-Text & MoM", level: 86, tag: "AI Feature" },
      ],
    },
  ],

  experience: [
    {
      company: "MicroGenesis Techsoft",
      location: "Bangalore: Offsite",
      role: "Software Engineer",
      period: "Nov 2024 to Present",
      duration: "2 years 1 month",
      noticePeriod: "1 Month Notice Period",
      current: true,
      client: "Aeronautical Development Agency (ADA)",
      projects: ["VCS (Video Conference System)", "PMS (Project Management System)"],
      topSkills: ["Python", "Django", "Flask", "React.js", "RESTful API", "MySQL", "Django REST API"],
      environment: [
        "Python",
        "Django",
        "Django REST Framework",
        "FastAPI",
        "React.js",
        "Apache Kafka",
        "MySQL",
        "Playwright",
        "Postman",
        "Docker",
        "Kubernetes",
        "Git",
      ],
      description:
        "As a Software Engineer at Micro Genesis Tech Soft Pvt. Ltd., I played a pivotal role in developing a comprehensive Project Management and Reporting System (PMS) for the Aeronautical Development Agency. Working within an Agile environment, I architected and developed a highly scalable, web-based application utilizing a robust technology stack encompassing Python, Django, Django REST Framework, FastAPI, and React.js. My core responsibilities involved engineering secure RESTful APIs and backend modules to facilitate seamless communication between the frontend and backend, alongside integrating Apache Kafka to power real-time, event-driven system notifications. On the frontend, I designed responsive and interactive interfaces utilizing React.js to manage complex workflows, including requirement management, task creation, ticket assignment, and comprehensive project tracking. I built dynamic, real-time analytics dashboards that empowered managers to effectively monitor ticket progress, overall team performance, and critical project statuses. Furthermore, I optimized the underlying MySQL database schemas and Django ORM models to ensure high-speed data queries, system reliability, and accurate project reporting. Beyond development, I spearheaded software quality assurance initiatives by automating end-to-end, functional, and API testing workflows using Playwright and Postman. To streamline the deployment lifecycle and ensure high availability, I managed containerized deployments using Docker, orchestrated microservices via Kubernetes, and maintained strict version control through Git, ensuring the delivery of a secure, high-performance project management solution.",
      responsibilities: [
        "Architected and engineered secure RESTful APIs and backend services using Python, Django, DRF, and FastAPI with real-time Apache Kafka messaging.",
        "Designed responsive React.js interfaces and interactive dashboards for requirement tracking, ticket management, and executive team performance auditing.",
        "Optimized MySQL database schemas and Django ORM models to guarantee rapid data queries and high system reliability under heavy concurrent loads.",
        "Automated comprehensive end-to-end, functional, and API regression suites using Playwright and Postman to ensure zero-defect releases.",
        "Managed containerized production deployments using Docker and orchestrated microservices across Kubernetes clusters with strict Git version control.",
      ],
    },
    {
      company: "Tulasi Technologies Pvt Lmt",
      location: "Bangalore, India",
      role: "Software Developer",
      period: "Dec 2021 to Oct 2024",
      duration: "2 years 11 months",
      current: false,
      client: "Sri Bhagya Lakshmi Enterprises & Poultry Industry Consortium",
      projects: ["SBL Food and Beverage", "Chicken ERP Poultry & ERP Poultry"],
      topSkills: ["Python", "Django", "FastAPI", "React.js", "MySQL", "Apache Kafka", "AWS (IAM)", "Docker"],
      environment: [
        "Python",
        "Django",
        "Django REST Framework",
        "FastAPI",
        "React.js",
        "Apache Kafka",
        "MySQL",
        "AWS (IAM)",
        "Docker",
        "Kubernetes",
        "Apache",
        "Playwright",
        "Postman",
      ],
      description:
        "As a Software Engineer at Tulasi Technologies Pvt. Ltd., I developed comprehensive, scalable enterprise applications, notably an ERP system for the poultry industry and a complete business automation platform for Sri Bhagya Lakshmi Enterprises. Working closely with cross-functional teams and clients in an Agile environment, I architected high-performance backend services using a technology stack centered around Python, Django, Django REST Framework, and FastAPI. I engineered secure RESTful APIs and integrated Apache Kafka for real-time event streaming to automate end-to-end workflows spanning production, hatchery management, vehicle logistics, sales, inventory, and accounting. On the frontend, I developed interactive and responsive React.js interfaces, including real-time reporting dashboards that provided actionable business insights. Additionally, I optimized complex MySQL databases to ensure accurate financial reporting and reliable data management across all enterprise modules. To maintain strict software quality and validate complex business logic, I automated end-to-end, functional, and API testing using Playwright and Postman. Furthermore, I managed the CI/CD pipelines and cloud infrastructure, deploying containerized microservices on AWS (IAM) utilizing Docker, Kubernetes, and Apache. This end-to-end involvement ensured system security, high availability, and a streamlined operational flow for the clients.",
      responsibilities: [
        "Architected scalable backend microservices with Python, Django, and FastAPI, integrating Apache Kafka for real-time event-driven enterprise workflows.",
        "Built interactive React.js dashboards and operational reporting tools for multi-location sales, hatchery operations, vehicle fleets, and financial ledgers.",
        "Enforced rigorous financial and inventory data integrity through advanced MySQL schema design, TCL transaction management, and replication.",
        "Built automated end-to-end regression pipelines using Playwright and Postman, preventing business logic regressions across critical modules.",
        "Deployed containerized services onto AWS infrastructure using Docker and Kubernetes, ensuring 99.9% uptime and hardened IAM role security.",
      ],
    },
    {
      company: "Arowana Software Solutions Pvt Lmt",
      location: "Visakhapatnam, India",
      role: "Junior Software Developer",
      period: "Sep 2020 to Sep 2021",
      duration: "1 year 1 month",
      current: false,
      client: "Cartel Software & Catholica",
      projects: ["Cartel", "Catholica kalyanavedhika"],
      topSkills: ["Python", "Django", "HTML5", "CSS3", "JavaScript", "MySQL", "RESTful APIs", "Git"],
      environment: ["Python", "Django", "HTML5", "CSS3", "JavaScript", "MySQL", "Git", "REST APIs", "Razorpay"],
      description:
        "As a junior software developer at Arowana Software Solutions Pvt. Ltd., I started my professional journey by assisting in the design, development, and maintenance of web-based applications. Working closely with senior developers, I contributed to writing clean, maintainable backend code using Python and Django, while supporting the creation of user-friendly frontend interfaces using HTML5, CSS3, and JavaScript. My responsibilities included developing foundational RESTful APIs, writing and optimizing basic MySQL database queries, and participating in debugging and resolving software defects to ensure smooth application performance. Additionally, I gained hands-on experience in Agile workflows, testing, and version control using Git, which laid a strong technical groundwork for my subsequent roles in full-stack development.",
      responsibilities: [
        "Developed foundational RESTful APIs with Python and Django, linking backend data services with interactive web interfaces.",
        "Constructed intuitive frontend components using HTML5, CSS3, and modern JavaScript for consumer e-commerce and subscription portals.",
        "Formulated and optimized MySQL database queries to guarantee rapid response times and secure user profile storage.",
        "Collaborated in daily Agile standups, bug triage, regression testing, and maintained disciplined branching workflows via Git.",
      ],
    },
  ],

  projects: [
    {
      title: "VCS (Video Conference System)",
      subtitle: "Air-Gapped AI Video Conferencing & Automated MoM",
      category: "Defense & Aerospace (Air-Gapped AI)",
      client: "Aeronautical Development Agency (ADA)",
      locationType: "Bangalore: Offsite",
      period: "Aug 2025 to Jun 2026 (Full Time)",
      role: "Software Engineer",
      featured: true,
      screenshot: "/projects/encryption.png",
      tags: ["Defense AI", "Air-Gapped", "Jitsi", "AI MoM", "WebRTC"],
      environment: ["Python", "Django", "DRF", "Jitsi", "React.js", "MySQL", "AI Speech-to-Text", "Offline Network"],
      description:
        "As a Software Engineer at Micro Genesis, I developed an AI-powered Video Conferencing System deployed in a highly secure, offline environment for the Aeronautical Development Agency (ADA). Using Python, Django, and DRF, I built a robust backend with RESTful APIs for meeting scheduling and participant management. I integrated Jitsi to enable real-time video conferencing within ADA's offline network and engineered an AI feature that automatically generates Minutes of Meeting (MoM) from live audio transcripts. On the frontend, I built a responsive React.js interface for seamless interaction, optimizing data storage with MySQL. This offline solution completely removed internet dependency, significantly reducing manual documentation while enhancing secure, internal team collaboration.",
      highlights: [
        "Engineered an offline AI pipeline that automatically synthesizes Minutes of Meeting (MoM) from live meeting audio transcripts",
        "Integrated Jitsi WebRTC media gateway inside an air-gapped, zero-internet defense network for strict confidentiality",
        "Built responsive React.js UI for meeting scheduling, real-time participant management, and encrypted session controls",
        "Optimized MySQL schema to archive encrypted meeting metadata and generated transcripts without external network exposure",
      ],
    },
    {
      title: "PMS (Project Management System)",
      subtitle: "Enterprise Defense Workflow & Ticket Analytics Platform",
      category: "Defense & Aerospace Enterprise",
      client: "Aeronautical Development Agency (ADA)",
      locationType: "Bangalore: Offsite",
      period: "Dec 2024 to Present (Full Time)",
      role: "Senior Software Developer",
      featured: true,
      screenshot: "/projects/progress-results.png",
      tags: ["Enterprise PMS", "Kafka Stream", "FastAPI", "Kubernetes", "Playwright"],
      environment: [
        "Python",
        "Django",
        "Django REST Framework",
        "FastAPI",
        "React.js",
        "Apache Kafka",
        "MySQL",
        "Docker",
        "Kubernetes",
        "Playwright",
      ],
      description:
        "As a Senior Software Developer, I built a scalable, web-based Project Management and Reporting System to streamline organizational workflows for the Aeronautical Development Agency. Using Python, Django, and Django REST Framework, I developed a robust backend with secure RESTful APIs for seamless frontend communication. I designed comprehensive modules for requirement management, task creation, ticket assignment, and project tracking. On the frontend, I integrated React.js to build intuitive, real-time dashboards that empower managers to monitor ticket progress, team performance, and overall project status. Furthermore, I optimized the MySQL database schema for efficient and reliable data management. Working closely with cross-functional teams in an Agile environment, this solution delivered a highly user-friendly and high-performance management platform.",
      highlights: [
        "Implemented real-time event-driven notifications using Apache Kafka for instant ticket routing and departmental handoffs",
        "Architected modular backend services using FastAPI and DRF, achieving sub-40ms response latency across high-concurrency requests",
        "Designed comprehensive React.js analytics dashboards visualizing milestone progress, defect burndown, and resource utilization",
        "Automated 100% of end-to-end regression and API test suites using Playwright and Postman inside continuous delivery pipelines",
      ],
    },
    {
      title: "SBL Food and Beverage",
      subtitle: "Multi-Enterprise Distribution & Recycling ERP",
      category: "Enterprise Industrial Automation",
      client: "Sri Bhagya Lakshmi enterprise (SBL)",
      locationType: "Bangalore: Offsite",
      period: "Apr 2023 to Sep 2024 (Full Time)",
      role: "Software Developer",
      featured: true,
      screenshot: "/projects/connection.png",
      tags: ["Industrial ERP", "TCL Integrity", "DB Replication", "Kafka", "Docker"],
      environment: [
        "Python",
        "Django",
        "FastAPI",
        "React.js",
        "MySQL (TCL)",
        "Database Replication",
        "Apache Kafka",
        "Docker",
      ],
      description:
        "At Tulasi Technologies, I developed an enterprise solution for Sri Bhagya Lakshmi Enterprises (SBL) to track distribution and manage recycling workflows. I engineered robust backend services and secure RESTful APIs using Python, Django, and FastAPI. For the frontend, I employed React.js to build a responsive UI covering sales, purchases, accounts, HR, and dynamic performance dashboards. To ensure strict data integrity and prevent table mismatches, I implemented MySQL TCL commands and configured database replication for seamless server-to-server communication. Integrated with Apache Kafka for real-time events and deployed via Docker, this approach significantly enhanced SBL's operational efficiency and ensured accurate data management.",
      highlights: [
        "Implemented strict MySQL TCL transaction management (COMMIT, ROLLBACK, SAVEPOINT) to eliminate inventory data mismatches",
        "Configured master-replica MySQL database replication ensuring reliable zero-latency data synchronization across remote facilities",
        "Integrated Apache Kafka for real-time event streaming across sales, procurement, accounting, and vehicle fleet distribution",
        "Constructed responsive React.js dashboards empowering executives to monitor distribution KPIs and material recycling metrics",
      ],
    },
    {
      title: "Chicken ERP Poultry & ERP Poultry",
      subtitle: "Complete Poultry Lifecycle & Supply Chain Platform",
      category: "Agri-Tech & Industrial ERP",
      client: "Godrej Foods & Central Poultry Malawi & Mallemala & Vaishnavi group....ect",
      locationType: "Bangalore: Onsite",
      period: "Dec 2021 to Apr 2023 (Full Time)",
      role: "Software Developer",
      featured: true,
      screenshot: "/projects/run-history.png",
      tags: ["Global ERP", "Poultry Supply Chain", "FastAPI", "React", "Kafka"],
      environment: ["Python", "Django", "FastAPI", "React.js", "MySQL", "Apache Kafka", "Docker", "AWS"],
      description:
        "At Tulasi Technologies, I developed a robust ERP software solution tailored for the poultry industry, managing the complete lifecycle from egg incubation to final sale. The platform encompasses comprehensive modules for sales, purchasing, invoicing, accounting, inventory control, and master data management. I architected the backend using Python, Django, and FastAPI to deliver secure RESTful APIs. On the frontend, I utilized React.js to build intuitive dashboards offering advanced tools for analyzing profits, losses, and strategic growth. By optimizing the MySQL database and integrating Apache Kafka for real-time workflows, this seamless approach helped poultry businesses optimize operations, manage resources, and significantly enhance profitability.",
      highlights: [
        "Managed end-to-end agricultural lifecycle data from egg incubation batches, feed formulations, flock mortality, to retail distribution",
        "Deployed platform across major commercial clients including Godrej Foods, Central Poultry Malawi, and Vaishnavi Group",
        "Engineered real-time Kafka event streams linking warehouse stock changes directly with accounting and sales invoice generation",
        "Built React.js analytics dashboards offering predictive profit/loss tools and operational cost forecasting",
      ],
    },
    {
      title: "Cartel",
      subtitle: "Multi-Module E-Commerce & Fleet Delivery Platform",
      category: "E-Commerce & Logistics",
      client: "Cartel Software",
      locationType: "Visakhapatnam: Onsite",
      period: "Mar 2021 to Sep 2021 (Full Time)",
      role: "Junior Software Developer",
      featured: false,
      screenshot: "/projects/run-now.png",
      tags: ["E-Commerce", "Razorpay Payment", "SMS Gateway", "Android API"],
      environment: ["Python", "Django", "HTML5", "CSS3", "JavaScript", "Razorpay", "SMS Alerts", "MySQL", "REST APIs"],
      description:
        "At Arowana Software Solutions, I contributed to the development of a comprehensive e-commerce platform designed to streamline the online shopping experience. I assisted in building robust modules tailored for groceries, clothing, and custom delivery services. I worked on developing secure backend services using Python and Django, while supporting the creation of responsive frontend interfaces utilizing HTML5, CSS3, and JavaScript. Key functionalities I helped implement include delivery tracking, cart management, and wishlist features. Furthermore, I collaborated on integrating third-party services such as Razorpay for secure payments and SMS alerts, alongside developing RESTful APIs to support seamless communication with the platform's companion Android applications.",
      highlights: [
        "Engineered backend RESTful APIs with Python and Django to power multi-vendor grocery and clothing catalogs",
        "Integrated Razorpay payment gateway with automated signature verification and transactional SMS order confirmations",
        "Designed live parcel delivery tracking interfaces and shopping cart synchronization for companion Android applications",
        "Optimized MySQL database queries for low-latency search and category filtering across thousands of product SKUs",
      ],
    },
    {
      title: "Catholica kalyanavedhika",
      subtitle: "Community Matrimony Portal & RBAC Subscription Platform",
      category: "Community & Subscription Portal",
      client: "Catholica",
      locationType: "Visakhapatnam: Offsite",
      period: "Oct 2020 to Mar 2021 (Full Time)",
      role: "Junior Software Developer",
      featured: false,
      screenshot: "/projects/decrypt.png",
      tags: ["Matrimony Web App", "RBAC Security", "Paid Subscriptions", "MySQL"],
      environment: ["Python", "Django", "HTML5", "CSS3", "JavaScript", "RBAC", "MySQL", "REST APIs"],
      description:
        "At Arowana Software Solutions, I developed a dedicated Christian matrimony platform, Catholica Kalyanavedhika, designed to connect individuals seeking ideal spouses. I engineered the backend architecture using Python and Django, creating secure RESTful APIs to handle user profiles, matchmaking criteria, and paid profile advertising workflows. I implemented comprehensive role-based access control (RBAC) to enforce strict user limitations and permissions as requested by the client. On the frontend, I utilized HTML5, CSS3, and JavaScript to build an intuitive, secure interface for profile browsing and seamless subscription management. Furthermore, I optimized the MySQL database to securely store sensitive user information and handle complex search queries efficiently, ensuring a reliable user experience.",
      highlights: [
        "Architected granular Role-Based Access Control (RBAC) ensuring verified profile privacy and tiered premium access tiers",
        "Constructed advanced multi-parameter search engine matching user criteria across denominations, geography, and education",
        "Built responsive interface for profile registration, photo verification, and digital subscription management",
        "Hardened MySQL storage with encrypted sensitive fields and parameterized queries to guarantee member confidentiality",
      ],
    },
    {
      title: "Direction Control Of DC Servo Motor",
      subtitle: "Embedded Hardware-Software Wireless Motor Control",
      category: "Embedded Systems & Hardware",
      client: "Sri Prakash College Of Engineering",
      locationType: "East Godavari: Onsite",
      period: "Oct 2017 to Feb 2018 (Full Time)",
      role: "Engineering Researcher & Lead Developer",
      featured: false,
      screenshot: "/projects/progress-results.png",
      tags: ["Embedded Systems", "Arduino", "Zigbee Wireless", "PWM Control"],
      environment: ["Arduino Microcontroller", "Zigbee Wireless Protocol", "Pulse Width Modulation (PWM)", "Embedded C", "Hardware Interfacing"],
      description:
        "During my B.Tech in Electrical and Electronics Engineering, I developed a hardware-software integration project focused on controlling a servo motor's speed and direction using both Zigbee wireless communication and a wired Arduino setup. I programmed the Arduino microcontrollers to process input signals and utilize Pulse Width Modulation (PWM) for precise speed adjustments. The wireless setup involved configuring a transmitter to send control signals to a Zigbee receiver interfaced with the Arduino, while the wired version used direct inputs for motor control. I conducted performance analysis to compare the efficiency, latency, and accuracy between the wireless and wired control mechanisms. This project demonstrated my foundational understanding of embedded systems, wireless protocols, and seamless component communication.",
      highlights: [
        "Engineered dual-mode motor control architecture using Zigbee wireless telemetry and wired Arduino interfaces",
        "Implemented high-precision Pulse Width Modulation (PWM) routines for linear speed scaling and reversible direction control",
        "Conducted empirical performance benchmarking analyzing signal latency, transmission reliability, and motor torque response",
        "Established foundational mastery in low-level signal timing, embedded protocols, and micro-controller hardware integration",
      ],
    },
  ],

  education: [
    {
      degree: "B.Tech in Electrical and Electronics Engineering (EEE)",
      institution: "Sri Prakash College of Engineering (JNTUK)",
      year: "2018",
      details: "Comprehensive engineering curriculum in systems engineering, digital logic, microprocessors, and computational problem solving.",
    },
    {
      degree: "Intermediate (MPC: Mathematics, Physics, Chemistry)",
      institution: "Government Junior College",
      year: "2014",
      details: "State board certification with distinction in mathematical sciences and quantitative analysis.",
    },
  ],

  achievements: [
    {
      title: "Defense & Aerospace Solution Delivery",
      organization: "Aeronautical Development Agency (ADA)",
      metric: "Air-Gapped AI & PMS",
      description:
        "Delivered AI-powered video conferencing with automated MoM and high-concurrency project management systems meeting stringent defense security standards.",
    },
    {
      title: "Industrial ERP at Commercial Scale",
      organization: "Godrej Foods, Central Poultry & SBL",
      metric: "Multi-Enterprise",
      description:
        "Architected scalable ERPs managing multi-million dollar supply chains, poultry hatcheries, vehicle logistics, and automated accounting.",
    },
    {
      title: "Real-Time Event Architecture with Kafka",
      organization: "Microservices & Distributed Systems",
      metric: "Sub-40ms Latency",
      description:
        "Engineered asynchronous event pipelines with Apache Kafka, powering decoupled microservices, live notifications, and instantaneous business dashboards.",
    },
    {
      title: "Automated QA & Zero Regressions",
      organization: "Continuous Integration Pipelines",
      metric: "100% Automated QA",
      description:
        "Automated comprehensive end-to-end Playwright and Postman test suites across enterprise workflows to guarantee zero-defect releases.",
    },
  ],
};
