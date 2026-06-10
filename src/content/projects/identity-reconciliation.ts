import type { Project } from "../../types/project";

export const identityReconciliation: Project = {
  id: "identity-reconciliation-service",
  title: "Identity Reconciliation Service",
  description:
    "Backend service for customer identity reconciliation, contact linking, and profile unification built with Node.js, Express, and MySQL.",
  techStack: ["Node.js", "Express.js", "MySQL", "REST API", "System Design"],
  githubUrl: "https://github.com/thvvamshi/identity-reconciliation-service",
  liveUrl: "https://bitespeed-identity-reconciliation-sy46.onrender.com/identify",
  image:
    "https://opengraph.githubassets.com/06acc95721d473ad37c28056917884b9c3b1b35b4825cf6f57e6fbef0d4a4211/thvvamshi/identity-reconciliation-service",
  featured: true,
  category: "Backend",
  highlights: [
    "Contact linking and profile unification",
    "Deterministic identity reconciliation rules",
    "Production-hosted REST API",
  ],
};
