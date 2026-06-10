import type { Project } from "../../types/project";

export const deploymentPlatform: Project = {
  id: "deployment-platform",
  title: "Event-Driven Cloud Deployment Platform",
  description:
    "A Vercel-inspired cloud deployment platform featuring AWS ECS, Kafka, ClickHouse, Docker, PostgreSQL, Prisma, and real-time deployment monitoring.",
  techStack: [
    "React",
    "Node.js",
    "PostgreSQL",
    "Prisma",
    "Kafka",
    "ClickHouse",
    "AWS ECS",
    "AWS S3",
    "Docker",
    "Socket.IO",
  ],
  githubUrl:
    "https://github.com/thvvamshi/event-driven-cloud-deployment-platform",
  image:
    "https://raw.githubusercontent.com/thvvamshi/event-driven-cloud-deployment-platform/main/systemDesign.png",
  featured: true,
  category: "Distributed Systems",
  highlights: [
    "Event-driven deployment orchestration",
    "Realtime deployment status updates",
    "Cloud infrastructure inspired by production PaaS systems",
  ],
};
