import type { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface SkillSignal {
  label: string;
  description: string;
}

export interface TimelineItem {
  period: string;
  title: string;
  organization: string;
  description: string;
  tags?: string[];
}

export interface ContactItem {
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
}
