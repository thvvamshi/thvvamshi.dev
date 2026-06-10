import type { Project } from "../../types/project";

export const vedaAi: Project = {
  id: "veda-ai-exam-engine",
  title: "Veda AI Exam Engine",
  description:
    "AI-powered exam generation platform featuring realtime updates, async processing, Redis, BullMQ, Socket.IO, OpenRouter, and Groq integration.",
  techStack: [
    "React",
    "Node.js",
    "Redis",
    "BullMQ",
    "Socket.IO",
    "OpenRouter",
    "Groq",
  ],
  githubUrl: "https://github.com/thvvamshi/veda-ai-exam-engine",
  liveUrl: "https://veda-ai-exam-enginee.onrender.com/",
  image:
    "https://opengraph.githubassets.com/058f93f10451f82da054114b09befb111b600f310c81ad9795532581406fd4e8/thvvamshi/veda-ai-exam-engine",
  featured: true,
  category: "AI",
  highlights: [
    "Async generation pipeline",
    "Realtime exam status events",
    "Multi-provider LLM integration",
  ],
};
