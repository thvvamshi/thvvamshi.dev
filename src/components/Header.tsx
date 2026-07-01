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
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/45 shadow-[0_1px_0_rgba(255,255,255,0.04),0_16px_40px_rgba(0,0,0,0.38)] backdrop-blur-xl">
      <Container width="wide" className="flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
        <button
          className="group flex items-center gap-3 text-left"
          type="button"
          onClick={() => handleNavClick("#home")}
          aria-label="Go to home"
        >
          <span className="flex h-10 min-w-12 items-center justify-center rounded-md border border-zinc-800 bg-zinc-900/40 px-2 text-lg font-black lowercase tracking-tight text-zinc-50">
            {profile.brand}
          </span>
          <span className="hidden h-8 w-px bg-white/[0.12] sm:block" />
          <span className="hidden md:block">
            <span className="block text-sm font-semibold text-zinc-50">{profile.name}</span>
            <span className="mt-0.5 block text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-zinc-500">
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
                className={`focus-ring rounded-md px-3 py-2 text-xs font-medium transition ${
                  isActive
                    ? "bg-white/[0.06] text-zinc-50"
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
          className="focus-ring hidden items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900/40 px-3 py-2 text-xs font-medium text-zinc-200 transition hover:scale-[1.02] hover:border-zinc-700 hover:text-zinc-50 xl:inline-flex"
          href={profile.resumeUrl}
          target="_blank"
          rel="noreferrer"
        >
          Resume
          <ArrowUpRight size={14} />
        </a>

        <button
          className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-md border border-zinc-800 bg-zinc-900/40 text-zinc-50 transition hover:scale-[1.02] hover:border-zinc-700 lg:hidden"
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </Container>

      <div
        className={`grid border-t border-zinc-800 bg-black/80 transition-[grid-template-rows] duration-300 lg:hidden ${
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
                    className={`focus-ring flex items-center justify-between rounded-md px-4 py-3 text-left text-sm font-medium transition ${
                      isActive
                        ? "bg-white/[0.06] text-zinc-50"
                        : "bg-zinc-900/40 text-zinc-300 hover:bg-zinc-900/70 hover:text-zinc-50"
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
