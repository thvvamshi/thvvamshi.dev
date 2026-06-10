import type { SkillGroup, SkillSignal } from "../types/content";

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    items: ["JavaScript", "TypeScript", "Python", "Java"],
  },
  {
    title: "Frontend",
    items: ["React", "Redux", "Vite", "Tailwind CSS"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express.js", "Socket.IO", "Prisma", "JWT"],
  },
  {
    title: "Databases",
    items: ["MongoDB", "PostgreSQL", "Redis", "ClickHouse"],
  },
  {
    title: "Cloud & DevOps",
    items: ["AWS", "Docker", "Kafka", "GitHub Actions"],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "Postman", "Swagger", "Cloudinary"],
  },
];

export const skillSignals: SkillSignal[] = [
  { label: "Backend Systems", value: 92 },
  { label: "Distributed Platforms", value: 88 },
  { label: "Cloud Infrastructure", value: 84 },
  { label: "AI Applications", value: 80 },
];
