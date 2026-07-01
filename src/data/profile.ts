import { Mail, MapPin, Phone } from "lucide-react";
import type { ContactItem, NavItem } from "../types/content";

export const profile = {
  name: "Vamshi Kumar",
  legalName: "Boda Vamshi Kumar",
  brand: "thv",
  title: "Software Engineer",
  subtitle:
    "Backend Engineering \u2022 Distributed Systems \u2022 Cloud Infrastructure",
  heroImage:
    "https://res.cloudinary.com/dedsrw0qv/image/upload/v1751550015/image-2_yoijeb.jpg",
  resumeUrl:
    "https://drive.google.com/file/d/1iHb3a1ZUuDPKAl9viWr7BlOwhBdFFt-Z/view",
  about:
    "I build scalable backend systems, event-driven platforms, cloud-native applications, and full-stack products.",
  interests:
    "My primary interests include distributed systems, platform engineering, cloud infrastructure, real-time systems, and AI-powered applications.",
  philosophy:
    "I enjoy understanding how large-scale systems work internally and building production-grade software that is reliable, scalable, and maintainable.",
  legacyIntro:
    "Hi! I'm a creative and passionate professional who loves turning ideas into impactful results. Let's connect and create something amazing together!",
  details: [
    { label: "Name", value: "BODA VAMSHI KUMAR" },
    { label: "D.O.B", value: "Nov 02, 2002" },
    { label: "Address", value: "Warangal, TS" },
    { label: "Pincode", value: "506015" },
    { label: "Email", value: "bodavamshikumar@gmail.com" },
  ],
};

export const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "GitHub", href: "#github" },
  { label: "Contact", href: "#contact" },
];

export const contactItems: ContactItem[] = [
  {
    label: "Address",
    value: "Warangal, India",
    href: "https://maps.app.goo.gl/f9QwV4eiRtRwQyEg6",
    icon: MapPin,
  },
  {
    label: "Contact Number",
    value: "+91 6302625159",
    href: "tel:+916303625159",
    icon: Phone,
  },
  {
    label: "Email Address",
    value: "bodavamshikumar@gmail.com",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=bodavamshikumar@gmail.com",
    icon: Mail,
  },
];
