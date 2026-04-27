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

const ProjectContext = createContext();

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState(() => {
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
