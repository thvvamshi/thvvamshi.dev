import type { Project } from "../../types/project";

export const financeApi: Project = {
  id: "finance-management-api",
  title: "Finance Management API",
  description:
    "Backend system for financial record management, analytics, RBAC, and API documentation.",
  techStack: ["Node.js", "Express.js", "PostgreSQL", "Prisma", "JWT", "Swagger"],
  githubUrl: "https://github.com/thvvamshi/finance-management-api",
  liveUrl: "https://finance-backend-apis-8l3w.onrender.com/",
  image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3ZumM1p3fAjN6TE5QH7s6DY6hv_TSA33Jcg&s",
  featured: false,
  category: "Backend",
  highlights: [
    "RBAC-protected finance operations",
    "Analytics-ready API design",
    "Documented backend surface with Swagger",
  ],
};
