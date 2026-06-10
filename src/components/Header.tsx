import { ArrowUpRight, Menu, X } from "lucide-react";
import { useMemo, useState } from "react";
import { navItems, profile } from "../data/profile";
import { useActiveSection } from "../hooks/useActiveSection";
import { Container } from "./Container";

function getSectionId(href: string) {
  return href.replace("#", "");
}

function scrollToSection(href: string) {
  const target = document.querySelector(href);
  target?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const sectionIds = useMemo(() => navItems.map((item) => getSectionId(item.href)), []);
  const activeSection = useActiveSection(sectionIds);

  const handleNavClick = (href: string) => {
    scrollToSection(href);
    setIsOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.08] bg-[#060708]/80 backdrop-blur-2xl">
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
        <button
          className="group flex items-center gap-3 text-left"
          type="button"
          onClick={() => handleNavClick("#home")}
          aria-label="Go to home"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-md border border-accent-300/30 bg-accent-300/10 font-mono text-sm font-black uppercase text-accent-300">
            {profile.brand.slice(0, 2)}
          </span>
          <span className="hidden h-8 w-px bg-white/[0.12] sm:block" />
          <span className="hidden md:block">
            <span className="block text-sm font-bold text-white">{profile.name}</span>
            <span className="mt-0.5 block font-mono text-[0.62rem] uppercase tracking-[0.18em] text-zinc-500">
              Software Engineer
            </span>
          </span>
        </button>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => {
            const id = getSectionId(item.href);
            const isActive = activeSection === id;

            return (
              <button
                key={item.href}
                className={`focus-ring rounded-md px-3 py-2 text-xs font-semibold transition ${
                  isActive
                    ? "bg-white/[0.08] text-white"
                    : "text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-200"
                }`}
                type="button"
                aria-current={isActive ? "page" : undefined}
                onClick={() => handleNavClick(item.href)}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <a
          className="focus-ring hidden items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-bold text-zinc-200 transition hover:border-accent-300/40 hover:text-accent-300 xl:inline-flex"
          href={profile.resumeUrl}
          target="_blank"
          rel="noreferrer"
        >
          Resume
          <ArrowUpRight size={14} />
        </a>

        <button
          className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-white transition hover:border-accent-300/60 hover:bg-accent-300/10 lg:hidden"
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </Container>

      <div
        className={`grid border-t border-white/10 bg-ink-950/[0.96] transition-[grid-template-rows] duration-300 lg:hidden ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <Container className="py-4">
            <nav className="grid gap-2" aria-label="Mobile navigation">
              {navItems.map((item) => {
                const id = getSectionId(item.href);
                const isActive = activeSection === id;

                return (
                  <button
                    key={item.href}
                    className={`focus-ring flex items-center justify-between rounded-md px-4 py-3 text-left text-sm font-semibold transition ${
                      isActive
                        ? "bg-accent-400/[0.14] text-accent-300"
                        : "bg-white/[0.03] text-zinc-300 hover:bg-white/[0.06] hover:text-white"
                    }`}
                    type="button"
                    onClick={() => handleNavClick(item.href)}
                  >
                    {item.label}
                    {isActive ? <span className="h-2 w-2 rounded-full bg-accent-300" /> : null}
                  </button>
                );
              })}
            </nav>
          </Container>
        </div>
      </div>
    </header>
  );
}
