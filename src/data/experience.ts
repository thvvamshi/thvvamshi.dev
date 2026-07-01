import type { TimelineItem } from "../types/content";

export const experience: TimelineItem[] = [
  {
    period: "Distributed Systems",
    title: "Cloud Deployment Platform",
    organization: "Backend and infrastructure engineering",
    description:
      "Event-driven deployment workflow with Kafka orchestration, AWS services, and realtime status updates.",
    tags: ["Node.js", "Kafka", "AWS ECS", "ClickHouse", "Docker"],
  },
  {
    period: "Realtime and AI",
    title: "Asynchronous Product Systems",
    organization: "Voice, exam generation, and streaming applications",
    description:
      "Realtime communication, background processing, and AI-assisted workflows.",
    tags: ["TypeScript", "Redis", "BullMQ", "Socket.IO", "Groq"],
  },
  {
    period: "Backend Platforms",
    title: "Secure APIs and Data Workflows",
    organization: "Identity, finance, and team-management systems",
    description:
      "Authentication, RBAC, identity reconciliation, and production data workflows.",
    tags: ["Express.js", "PostgreSQL", "MySQL", "Prisma", "JWT"],
  },
];
