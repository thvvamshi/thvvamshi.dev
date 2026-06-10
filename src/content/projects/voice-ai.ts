import type { Project } from "../../types/project";

export const voiceAi: Project = {
  id: "voice-ai-healthcare-assistant",
  title: "Voice AI Healthcare Assistant",
  description:
    "Realtime multilingual healthcare assistant enabling conversational appointment booking through AI-powered voice interactions.",
  techStack: [
    "React",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Prisma",
    "Redis",
    "Socket.IO",
    "Groq LLM",
  ],
  githubUrl: "https://github.com/thvvamshi/voice-ai-healthcare-assistant",
  image:
    "https://raw.githubusercontent.com/thvvamshi/voice-ai-healthcare-assistant/main/docs/system-design.png",
  featured: true,
  category: "AI",
  highlights: [
    "Conversational appointment booking flow",
    "Realtime voice interaction architecture",
    "Redis-backed low-latency state handling",
  ],
};
