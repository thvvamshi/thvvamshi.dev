import {
  SiApachekafka,
  SiDocker,
  SiExpress,
  SiGithub,
  SiGit,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiPrisma,
  SiPostgresql,
  SiReact,
  SiRedis,
  SiSocketdotio,
  SiSwagger,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from "react-icons/si";
import type { IconType } from "react-icons";
import type { LucideIcon } from "lucide-react";
import { Bot, Cloud } from "lucide-react";

export interface SkillMark {
  label: string;
  category: "Frontend" | "Backend" | "Database" | "Cloud" | "Distributed" | "AI" | "Tools";
  icon: IconType | LucideIcon;
  color?: string;
}

export const skillMarks: SkillMark[] = [
  { label: "JavaScript", category: "Frontend", icon: SiJavascript, color: "#F7DF1E" },
  { label: "TypeScript", category: "Frontend", icon: SiTypescript, color: "#3178C6" },
  { label: "React", category: "Frontend", icon: SiReact, color: "#61DAFB" },
  { label: "Tailwind CSS", category: "Frontend", icon: SiTailwindcss, color: "#06B6D4" },
  { label: "Vite", category: "Frontend", icon: SiVite, color: "#646CFF" },
  { label: "Node.js", category: "Backend", icon: SiNodedotjs, color: "#339933" },
  { label: "Express.js", category: "Backend", icon: SiExpress, color: "#E5E7EB" },
  { label: "Socket.IO", category: "Backend", icon: SiSocketdotio, color: "#F5F5F5" },
  { label: "Prisma", category: "Backend", icon: SiPrisma, color: "#0C344B" },
  { label: "SQL", category: "Database", icon: SiMysql, color: "#4479A1" },
  { label: "MongoDB", category: "Database", icon: SiMongodb, color: "#47A248" },
  { label: "PostgreSQL", category: "Database", icon: SiPostgresql, color: "#336791" },
  { label: "Redis", category: "Distributed", icon: SiRedis, color: "#DC382D" },
  { label: "Kafka", category: "Distributed", icon: SiApachekafka, color: "#FFB347" },
  { label: "AWS", category: "Cloud", icon: Cloud, color: "#FF9900" },
  { label: "Docker", category: "Distributed", icon: SiDocker, color: "#2496ED" },
  { label: "Git", category: "Tools", icon: SiGit, color: "#F05032" },
  { label: "GitHub", category: "Tools", icon: SiGithub, color: "#F5F5F5" },
  { label: "Swagger", category: "Tools", icon: SiSwagger, color: "#85EA2D" },
  { label: "LLM", category: "AI", icon: Bot, color: "#A78BFA" },
];
