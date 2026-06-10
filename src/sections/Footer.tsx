import { Container } from "../components/Container";
import { profile } from "../data/profile";
import { socials } from "../data/socials";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <Container className="flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
        <div>
          <p className="text-lg font-black text-white">{profile.name}</p>
          <p className="mt-1 text-sm text-zinc-500">
            Copyright &copy; 2026 All rights reserved | Built by Vamshi
          </p>
        </div>
        <div className="flex items-center gap-3">
          {socials.map((social) => {
            const Icon = social.icon;

            return (
              <a
                key={social.href}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zinc-300 transition hover:border-accent-300/60 hover:text-accent-300"
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
              >
                <Icon size={18} />
              </a>
            );
          })}
        </div>
      </Container>
    </footer>
  );
}
