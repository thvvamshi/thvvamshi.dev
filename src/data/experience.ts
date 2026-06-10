import type { TimelineItem } from "../types/content";

export const experience: TimelineItem[] = [
  {
    period: "Current Focus",
    title: "Software Engineer",
    organization: "Backend, cloud, and AI application engineering",
    description:
      "Building scalable backend systems, event-driven platforms, real-time workflows, and cloud-native applications with a strong focus on maintainability and production readiness.",
    tags: ["Node.js", "PostgreSQL", "Kafka", "AWS", "System Design"],
  },
  {
    period: "Project Work",
    title: "Production Systems Builder",
    organization: "GitHub portfolio projects",
    description:
      "Developing full-stack platforms with authentication, RBAC, analytics dashboards, Dockerized services, CI/CD workflows, async workers, and realtime collaboration.",
    tags: ["React", "Prisma", "Redis", "Socket.IO", "Docker"],
  },
  {
    period: "Engineering Direction",
    title: "Distributed Systems Learner",
    organization: "Cloud deployment and AI systems",
    description:
      "Exploring how large-scale systems work internally through deployment orchestration, streaming infrastructure, observability, LLM integrations, and resilient APIs.",
    tags: ["ECS", "S3", "ClickHouse", "BullMQ", "Groq"],
  },
];
