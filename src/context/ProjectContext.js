import React, { createContext, useContext, useState, useEffect } from 'react';

const SEED_PROJECTS = [
  {
    id: '1',
    slug: 'incident-management-automations',
    title: 'Incident Management Automations',
    company: 'HCLTech',
    client: 'Verizon Communications',
    duration: 'March 2025 – Present',
    role: 'Full Stack Java Developer',
    color: '#00f5ff',
    icon: '⚡',
    category: 'AI Agent',
    isAIAgent: true,
    featured: true,
    description: "Enterprise-grade automation solution to streamline incident detection, ticket creation, routing, and resolution workflows for Verizon's global network operations.",
    longDescription: "This platform leverages AI-driven automation and event-driven architecture to eliminate manual toil in incident management. The system continuously monitors network telemetry, auto-classifies incidents using ML models, routes tickets intelligently, and resolves known issues without human intervention. Built with a microservices architecture on AWS, it processes thousands of events per second using Apache Kafka Streams.\n\nThe intelligent routing engine uses rule-based logic combined with ML classification to assign incidents to the right team instantly, dramatically improving SLA compliance. Integration with ServiceNow and Jira enables seamless ticket lifecycle management from creation to resolution.",
    keyFeatures: [
      'AI-powered incident detection with real-time monitoring',
      'Intelligent ticket routing and assignment engine',
      'ITSM platform integration (ServiceNow, Jira) for SLA compliance',
      'Event-driven architecture with Apache Kafka processing thousands of events/sec',
      'Reduced manual effort by 80% and improved response time significantly',
    ],
    tech: ['Spring Boot', 'Apache Kafka', 'Kafka Streams', 'Spring MVC', 'AWS', 'MS SQL Server', 'JDBC'],
    db: 'MS SQL SERVER',
    ide: 'Eclipse',
    github: '',
    liveUrl: '',
    sampleImages: ['/img/p1-1.jpg', '/img/p1-2.jpg', '/img/p1-3.jpg', '/img/p1-4.jpg', '/img/p1-5.jpg'],
  },
  {
    id: '2',
    slug: 'repeat-call-analyzer',
    title: 'Repeat Call Analyzer',
    company: 'HCLTech',
    client: 'Verizon Communications',
    duration: 'March 2025 – Present',
    role: 'Full Stack Java Developer',
    color: '#bf00ff',
    icon: '📊',
    category: 'AI Agent',
    isAIAgent: true,
    featured: true,
    description: "Data-driven analytics platform to analyze customer call logs, identify repeat callers, and detect recurring issues enabling proactive customer experience improvements.",
    longDescription: "An intelligent analytics system that processes millions of call records in real-time using Kafka Streams. AI models identify patterns, cluster repeat callers, and surface root causes enabling the CX team to proactively resolve issues before they escalate.\n\nThe platform integrates with Verizon's CRM and billing systems to correlate call data with customer profiles, providing a 360-degree view of customer pain points. Machine learning models trained on historical data can predict which customers are likely to call again, enabling proactive outreach before frustration sets in.",
    keyFeatures: [
      'Real-time call log analysis using Kafka Streams',
      'AI pattern recognition for repeat caller identification',
      'Root cause detection for recurring network and billing issues',
      'Interactive dashboards with actionable CX reports',
      'Measurably reduced repeat call volume across key segments',
    ],
    tech: ['Spring Boot', 'Core Java', 'Apache Kafka', 'Kafka Streams', 'AWS', 'MS SQL Server', 'JDBC'],
    db: 'MS SQL SERVER',
    ide: 'Eclipse',
    github: '',
    liveUrl: '',
    sampleImages: ['/img/p2-1.jpg', '/img/p2-2.jpg', '/img/p2-3.jpg', '/img/p2-4.jpg', '/img/p2-5.jpg'],
  },
  {
    id: '3',
    slug: 'pmis-project-management-system',
    title: 'PMIS — Project Management & Information System',
    company: 'Synergiz Global Services',
    client: 'Mumbai Metro Railway (MRVC)',
    duration: 'December 2022 – August 2023',
    role: 'Full Stack Java Developer',
    color: '#39ff14',
    icon: '🚇',
    category: 'Backend',
    isAIAgent: false,
    featured: true,
    description: "Comprehensive project management platform for Mumbai Metro Railway Systems featuring the SynTrack Engine — a multi-source data aggregation and visualization system.",
    longDescription: "PMIS is a full-stack enterprise application built for Mumbai Metro Railway to manage multi-crore infrastructure projects. The SynTrack Engine normalizes data from heterogeneous sources (MS Excel, Primavera P6, Tally) into a unified project health dashboard.\n\nBuilt with J2EE and Spring MVC on AWS, the platform handles real-time data ingestion from multiple project management tools, transforms and normalizes the data, and presents it through interactive dashboards. Apache Kafka powers the event-driven data pipeline ensuring data consistency and reliability across all sources.",
    keyFeatures: [
      'SynTrack Engine integrating MS Excel, Primavera P6, and Tally data sources',
      'Multi-source data normalization and unified storage pipeline',
      'Real-time project dashboards with visual KPI tracking',
      'Event-driven data processing with Apache Kafka',
      'Client-side interfaces built with JSP and JavaScript',
    ],
    tech: ['JSP', 'JavaScript', 'J2EE', 'Core Java', 'Spring MVC', 'Apache Kafka', 'JDBC', 'AWS', 'Kafka Streams'],
    db: 'MS SQL SERVER',
    ide: 'Eclipse',
    github: '',
    liveUrl: '',
  },
  {
    id: '6',
    slug: 'looly-ai-interview-assistant',
    title: 'Looly — Invisible AI Interview Assistant',
    company: 'Personal Project',
    client: '',
    duration: 'Apr 2026 – May 2026',
    role: 'Full Stack Developer / Desktop App Engineer',
    color: '#00ff88',
    icon: '👁️',
    category: 'AI / Desktop App / Full Stack',
    isAIAgent: true,
    featured: true,
    description: 'Looly is a stealth Windows desktop app that listens to job interviews in real time and streams instant AI-generated answers — completely invisible to Zoom, Teams, and Google Meet screen sharing.',
    longDescription: 'Looly solves a real problem faced by job seekers: the pressure of answering coding, behavioral, and system design questions live under time constraints. The app sits invisibly on screen during any interview, hidden from screen capture at the Windows driver level using SetWindowDisplayAffinity, and also excluded from the taskbar using WS_EX_TOOLWINDOW — so interviewers never see it.\n\nThe core experience works in two modes: a microphone listener that transcribes speech in real time using the Web Speech API and auto-submits after 4 seconds of silence, and a manual paste mode for typed questions. Answers stream token-by-token from Groq\'s LLaMA models, with smart parsing that renders code blocks separately from prose. A screenshot mode uses a native Rust command to capture the screen, compresses it client-side via Canvas, and sends it to a vision-capable LLaMA 4 model for analysis.\n\nThe business model has a 10-day free trial (users bring their own Groq API key), then a Pro subscription via Razorpay that routes all AI requests through a backend key pool — so paying users need no API key of their own. Licenses are generated with LOOLY-XXXX format keys, stored in Supabase, emailed via Gmail SMTP, and validated in the app using Tauri\'s native HTTP plugin (bypassing WebView2 network restrictions that blocked standard fetch calls in production builds).\n\nThe backend is a Node.js/Express server deployed on Railway, serving the marketing landing page, handling Razorpay payment verification and webhooks, streaming SSE responses from Groq, tracking downloads and analytics in Supabase, and exposing a password-protected admin dashboard. Google OAuth sign-in was added using Supabase Auth so users can log in to the website and retrieve their license keys at any time.\n\nKey engineering challenges overcome included: discovering that Tauri\'s HTTP plugin silently blocks all requests unless explicit URL scopes are declared in the capabilities manifest; switching SMTP from port 465 to 587 because Railway blocks IPv6/SSL outbound; making payment email fire-and-forget so the UI doesn\'t hang; and building a Groq key rotation pool so Pro users never hit rate limits.',
    keyFeatures: [
      'Invisible to screen sharing — hidden from Zoom, Teams, and Google Meet using Windows SetWindowDisplayAffinity and WS_EX_TOOLWINDOW at the driver level',
      'Real-time speech recognition via Web Speech API with 4-second silence detection and auto-ask, plus manual paste mode for typed questions',
      'Screenshot analysis — captures the full screen via a native Rust command, compresses it client-side, and sends to LLaMA 4 Scout vision model for instant AI analysis',
      'Pro subscription with Razorpay (UPI + cards), license key generation, Gmail email delivery, and Supabase license validation — all without requiring users to have their own API key',
      'Groq API key rotation pool on the backend — automatically cycles through multiple keys to avoid rate limits for Pro users',
      'Google OAuth sign-in on the landing page — users can log in to retrieve their license keys, with sign-in gated before download or purchase',
      'Admin dashboard with download tracking, revenue estimates, plan breakdown, daily signups chart, and analytics event log',
      'Tauri HTTP plugin with explicit URL capability scoping — solving the silent network block that prevented license activation in production builds',
    ],
    tech: [
      'Rust', 'Tauri v2', 'React', 'TypeScript', 'Vite',
      'Node.js', 'Express', 'Groq SDK', 'LLaMA 3.3 70B', 'LLaMA 4 Scout (Vision)',
      'Razorpay', 'Supabase Auth', 'Supabase JS', 'PostgreSQL',
      'Web Speech API', 'SSE (Server-Sent Events)', 'nodemailer', 'Gmail SMTP',
      'Windows Win32 API', 'NSIS Installer', 'GitHub Actions / GitHub Releases',
      'Railway', 'CORS', 'JWT', 'Google OAuth2', 'HTML/CSS', 'Chart.js',
    ],
    db: 'PostgreSQL (Supabase)',
    ide: 'VS Code',
    github: '',
    liveUrl: 'https://looly-maincode-production.up.railway.app',
    workflowUrl: '/looly-how-it-works.html',
  },
  {
    id: '5',
    slug: 'arshezai',
    title: 'ArshezAI',
    company: 'Personal Project',
    client: '',
    duration: '2026',
    role: 'Full Stack AI Engineer',
    color: '#ff6b35',
    icon: '🧠',
    category: 'AI / Full Stack',
    isAIAgent: true,
    featured: true,
    description: 'ArshezAI is an AI-powered HR recruiting platform that autonomously sources candidates from the web, grades their profiles, sends personalised outreach emails, and conducts voice-based interview scheduling — reducing manual recruiter effort from days to minutes.',
    longDescription: 'Modern recruiting teams spend the majority of their time on repetitive tasks: searching LinkedIn, writing personalised emails, chasing candidates for availability, and manually juggling calendars. ArshezAI was built to automate that entire pipeline end-to-end. A recruiter creates a job requisition, clicks one button, and the system handles everything else — from finding candidates to booking the interview slot on their Google Calendar.\n\nThe core of the platform is a multi-agent AI system built on top of the Groq API (llama-3.3-70b-versatile). The sourcing agent runs an agentic tool-use loop: it decides which web searches to run via the Tavily Search API, fetches and parses candidate profile pages, and then saves structured candidate records to the database — all without human guidance. A separate grading agent uses Anthropic Claude to evaluate each candidate against the job requirements and return a 0–100 score with structured strengths, concerns, and a recommendation. A third agent generates warm, personalised outreach emails and sends them via Gmail SMTP with a unique one-time scheduling token embedded in the link.\n\nThe most technically complex piece is the voice interview agent. When a candidate clicks their scheduling link, a browser-based voice interface activates using the Web Speech API for both speech recognition and synthesis. Each candidate utterance is transcribed and sent to the backend, where another Groq agentic loop — equipped with tools to query Google Calendar for real free slots and book events with auto-generated Google Meet links — drives the conversation. The full transcript is persisted turn-by-turn, and clickable time-slot buttons appear on screen so candidates can select without speaking exact datetimes. The backend returns the interview result, updates the candidate pipeline status, and sends a calendar invite to both parties.\n\nThe backend is built with Spring Boot 3.3.2 on Java 21, using Spring Security with stateless JWT authentication, Spring Data JPA with MySQL, and Flyway for versioned schema migrations. All long-running AI tasks (sourcing takes 30–90 seconds) run in a dedicated async thread pool via Spring @Async so HTTP responses stay fast. The frontend is a React 18 + TypeScript SPA using Vite, Tailwind CSS, and TanStack React Query for real-time polling of sourcing progress. A full audit log records every AI tool call and system event for compliance and debugging.',
    keyFeatures: [
      'Agentic AI sourcing loop — Groq LLM autonomously runs web searches via Tavily, reads candidate profile pages, and saves structured candidate records without any human input',
      'AI candidate grading — Anthropic Claude evaluates each candidate against job requirements and returns a 0–100 score with strengths, concerns, and a hiring recommendation',
      'AI-generated outreach emails — Groq writes a personalised, role-specific outreach email per candidate; sent via Gmail SMTP with a unique one-time scheduling token',
      'Voice interview scheduling agent — browser-based voice interface (Web Speech API) backed by a Groq agentic loop that queries Google Calendar for real free slots and books events with Google Meet links',
      'Clickable time-slot buttons — when the voice agent fetches available slots, interactive buttons appear on screen so candidates can select without speaking exact datetimes',
      'Full candidate pipeline (Kanban) — candidates move through SOURCED → APPROVED → CONTACTED → SCHEDULED → REJECTED / DECLINED with status updates reflected in real time',
      'Complete audit log — every AI tool call, sourcing event, grading result, and interview booking is recorded in an immutable audit_log table viewable in the dashboard',
      'Google Calendar OAuth2 integration — recruiter connects their calendar once; the voice agent reads real availability and creates events with Google Meet links automatically',
    ],
    tech: [
      'Java 21', 'Spring Boot 3.3.2', 'Spring Security', 'Spring Data JPA', 'Hibernate', 'Flyway',
      'JWT (JJWT)', 'Maven', 'Lombok', 'Jackson', 'JavaMailSender', 'Spring WebFlux (WebClient)',
      'BCrypt', 'SpringDoc OpenAPI', 'React 18', 'TypeScript', 'Vite', 'Tailwind CSS',
      'TanStack React Query', 'React Router v6', 'Lucide React', 'Web Speech API',
      'Groq API (llama-3.3-70b-versatile)', 'Anthropic Claude API', 'Tavily Search API',
      'Google Calendar API v3', 'Google OAuth2', 'Gmail SMTP',
    ],
    db: 'MySQL 8',
    ide: 'VS Code',
    github: 'https://github.com/shabazamin20/ArshezAI',
    liveUrl: '',
  },
  {
    id: '7',
    slug: 'job-search-engine',
    title: 'Job Search Engine',
    company: 'Personal Project',
    client: '',
    duration: 'May 2026',
    role: 'Full Stack Developer / AI Pipeline Engineer',
    color: '#6366f1',
    icon: '🔍',
    category: 'AI Agent',
    isAIAgent: true,
    featured: true,
    description: 'Autonomous daily job-hunting assistant that scrapes remote jobs from multiple sources, scores each against your resume using Groq AI, drafts personalized outreach emails for top matches, and presents everything in a React UI for one-click approval.',
    longDescription: 'The Job Search Engine eliminates the tedious daily ritual of manually sifting through job boards. You paste your resume once — every subsequent day the pipeline wakes up, pulls 100+ remote roles from Remotive, We Work Remotely, and RemoteOK, scores each posting 1–10 using Groq\'s LLaMA 70B model, and drafts a personalized outreach email for every job scoring above your threshold. Nothing sends automatically: the React UI lets you read the AI\'s reasoning, see key matches and gaps, edit the draft, and approve or skip each one at your own pace.\n\nThe system runs two completely isolated pipelines — each with its own SQLite table, threading lock, and set of API endpoints. The main pipeline targets software engineering roles from Remotive and We Work Remotely. The second pipeline (originally Upwork-targeted, pivoted to RemoteOK after Upwork permanently shut down public RSS access) covers the broader remote-tech market using a tag-based search API.\n\nSQLite with WAL mode handles storage — WAL is set on every new connection (not just at init) so the FastAPI server can serve live reads while the background thread is still writing scored results. The React frontend polls pipeline status every 3 seconds during a run and updates the table in real time. In production, FastAPI serves the built React app directly as static files — no separate web server or proxy needed.',
    keyFeatures: [
      'Dual isolated pipelines — main (Remotive + We Work Remotely) and RemoteOK, each with independent state, lock, and endpoints; neither can interfere with the other',
      'Groq LLaMA 70B scoring — every new job is scored 1–10 against your resume with plain-English reasoning, key matches, and gaps returned as structured JSON',
      'Auto email drafting — jobs above the score threshold get a personalized outreach draft at temperature 0.6; stored as pending until you review and approve in the UI',
      'Idempotent pipeline — INSERT OR IGNORE on job_id means daily re-runs never duplicate entries; only genuinely new jobs enter the scoring queue',
      'React review UI — left-icon sidebar navigation, color-coded score badges, editable email drafts, approve/skip/save/delete actions, and live pipeline progress polling',
      'SQLite WAL mode — set per-connection to allow concurrent API reads while the background pipeline writes, eliminating lock contention',
      'Configurable search terms — queries managed via a settings page in the UI; toggle on/off per-run without touching any config file',
    ],
    tech: ['Python 3.11', 'FastAPI', 'Uvicorn', 'React 19', 'Vite', 'Groq SDK', 'LLaMA 3.3 70B', 'SQLite', 'smtplib', 'Requests', 'Remotive API', 'We Work Remotely RSS', 'RemoteOK API', 'Gmail SMTP', 'threading'],
    db: 'SQLite (WAL mode)',
    ide: 'VS Code',
    github: 'https://github.com/shabazamin20/JobSearchEngine',
    liveUrl: '',
    workflowUrl: '/job-search-engine-how-it-works.html',
  },
  {
    id: '4',
    slug: 'ai-network-ops-agent',
    title: 'AI Network Ops Agent',
    company: 'HCLTech',
    client: 'Verizon Communications',
    duration: 'June 2025 – Present',
    role: 'AI Agent Developer',
    color: '#ff006e',
    icon: '🤖',
    category: 'AI Agent',
    isAIAgent: true,
    featured: true,
    description: "Autonomous AI agent that monitors network infrastructure, predicts failures using ML models, and auto-remediates issues — reducing MTTR by 70% across Verizon's global NOC.",
    longDescription: "An advanced autonomous AI agent built on LLM-orchestrated workflows that continuously analyzes telemetry data from thousands of network nodes. The agent uses RAG-based knowledge retrieval to diagnose anomalies, auto-generates runbooks, and executes remediation playbooks without human intervention.\n\nThe agent is built on a multi-agent architecture where specialized sub-agents handle different domains: network monitoring, root cause analysis, remediation execution, and stakeholder communication. Each sub-agent communicates via a shared message bus powered by Apache Kafka, enabling parallel processing and fault tolerance. The LLM backbone (Claude AI) provides natural language summaries for NOC teams.",
    keyFeatures: [
      'LLM-orchestrated autonomous decision making with Claude AI',
      'RAG-based runbook retrieval and auto-generation',
      'Predictive failure detection using ML anomaly models',
      'Auto-remediation playbook execution without human approval',
      'Natural language incident summaries pushed to NOC teams',
      '70% reduction in Mean Time To Resolve (MTTR)',
    ],
    tech: ['Python', 'LangChain', 'Claude AI', 'Spring Boot', 'Apache Kafka', 'AWS Lambda', 'MS SQL Server', 'Vector DB'],
    db: 'MS SQL SERVER + Vector DB',
    ide: 'VS Code',
    github: '',
    liveUrl: '',
  },
];

const SEED_VERSION = '6';

const ProjectContext = createContext();

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState(() => {
    const version = localStorage.getItem('portfolio_projects_version');
    if (version !== SEED_VERSION) {
      localStorage.removeItem('portfolio_projects');
      localStorage.setItem('portfolio_projects_version', SEED_VERSION);
      return SEED_PROJECTS;
    }
    const stored = localStorage.getItem('portfolio_projects');
    if (stored) {
      try { return JSON.parse(stored); } catch { return SEED_PROJECTS; }
    }
    return SEED_PROJECTS;
  });

  useEffect(() => {
    localStorage.setItem('portfolio_projects', JSON.stringify(projects));
  }, [projects]);

  const addProject = (project) => {
    const slug = project.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const newProject = { ...project, id: Date.now().toString(), slug };
    setProjects(prev => [...prev, newProject]);
    return newProject;
  };

  const updateProject = (id, updated) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
  };

  const deleteProject = (id) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const getProjectBySlug = (slug) => projects.find(p => p.slug === slug);

  return (
    <ProjectContext.Provider value={{ projects, addProject, updateProject, deleteProject, getProjectBySlug }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  return useContext(ProjectContext);
}
