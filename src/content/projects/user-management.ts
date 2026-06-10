import type { Project } from "../../types/project";

export const userManagement: Project = {
  id: "user-management-platform",
  title: "User Management Platform",
  description:
    "Full-stack user management platform featuring authentication, RBAC, Dockerized deployment, automated testing, and CI/CD.",
  techStack: ["React", "Node.js", "Docker", "JWT", "RBAC", "GitHub Actions"],
  githubUrl: "https://github.com/thvvamshi/user-management-system",
  liveUrl: "https://purplemerit-backend-intern-assessment.netlify.app/",
  image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIhz9Nx-77H6cGoADSCxLORwOW7lHbt_Ejqg&s",
  featured: false,
  category: "Backend",
  highlights: [
    "Authentication and authorization flows",
    "Dockerized application delivery",
    "Automated tests and CI/CD pipeline",
  ],
};
