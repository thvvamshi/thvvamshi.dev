import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  CircleCheck,
  LoaderCircle,
  Send,
  TriangleAlert,
} from "lucide-react";
import { type FormEvent, useState } from "react";
import { AnimatedSection } from "../components/AnimatedSection";
import { Container } from "../components/Container";
import { SectionHeader } from "../components/SectionHeader";
import { contactForm } from "../data/contact";
import { contactItems } from "../data/profile";
import { socials } from "../data/socials";

type FormStatus = "idle" | "submitting" | "success" | "error";

const statusCopy = {
  success: "Message sent successfully. I'll get back to you soon.",
  error: "The message could not be sent. Please try again or email me directly.",
};

export function ContactSection() {
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("submitting");

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });
      const result = (await response.json()) as { success?: boolean };

      if (!response.ok || result.success === false) {
        throw new Error("Contact form submission failed");
      }

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatedSection id="contact" className="border-t border-white/[0.06] bg-white/[0.012]">
      <Container>
        <SectionHeader
          eyebrow="Contact"
          title="Let's connect."
          description="Reach out if you want to talk about production software, backend platforms, AI applications, or cloud infrastructure."
        />

        <div className="grid overflow-hidden rounded-lg border border-white/[0.08] bg-[#08090a] lg:grid-cols-3">
          {contactItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.a
                key={item.label}
                className="group border-b border-white/[0.08] p-5 transition hover:bg-white/[0.035] last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0 sm:p-6"
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                whileHover={{ y: -3 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md border border-accent-300/20 bg-accent-300/[0.07] text-accent-300">
                    <Icon size={18} />
                  </span>
                  <ArrowUpRight
                    size={15}
                    className="text-zinc-700 transition group-hover:text-accent-300"
                  />
                </div>
                <p className="technical-label mt-6">{item.label}</p>
                <span className="sr-only">{item.value}</span>
              </motion.a>
            );
          })}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            className="surface rounded-lg p-6 sm:p-8"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="technical-label text-accent-300">Find me on</p>
            <h3 className="mt-3 text-xl font-semibold text-zinc-50">Continue the conversation.</h3>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              The fastest way to understand my work is through the systems, repositories,
              and product thinking behind them.
            </p>
            <div className="mt-6 grid gap-3">
              {socials.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.href}
                    className="focus-ring flex items-center justify-between rounded-md border border-white/10 bg-black/20 px-4 py-3 text-sm font-semibold text-zinc-300 transition hover:border-accent-300/60 hover:text-accent-300"
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="flex items-center gap-3">
                      <Icon size={18} />
                      {social.label}
                    </span>
                    <span aria-hidden="true">-&gt;</span>
                  </a>
                );
              })}
            </div>
          </motion.div>

          <motion.form
            className="surface rounded-lg p-5 sm:p-8"
            action={contactForm.action}
            method="POST"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <input type="hidden" name="access_key" value={contactForm.accessKey} />
            <h3 className="text-xl font-semibold text-zinc-50">
              Get In <span className="text-accent-400">Touch</span>
            </h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold text-zinc-300">
                Your Name
                <input
                  className="focus-ring h-11 rounded-md border border-white/10 bg-black/30 px-4 text-sm text-white transition placeholder:text-zinc-600 focus:border-accent-300/60"
                  type="text"
                  name="name"
                  placeholder="Your name"
                  autoComplete="name"
                  disabled={status === "submitting"}
                  required
                />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-zinc-300">
                Your Email
                <input
                  className="focus-ring h-11 rounded-md border border-white/10 bg-black/30 px-4 text-sm text-white transition placeholder:text-zinc-600 focus:border-accent-300/60"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  disabled={status === "submitting"}
                  required
                />
              </label>
            </div>
            <label className="mt-4 grid gap-2 text-sm font-semibold text-zinc-300">
              Subject
              <input
                className="focus-ring h-11 rounded-md border border-white/10 bg-black/30 px-4 text-sm text-white transition placeholder:text-zinc-600 focus:border-accent-300/60"
                type="text"
                name="subject"
                placeholder="What would you like to discuss?"
                disabled={status === "submitting"}
                required
              />
            </label>
            <label className="mt-4 grid gap-2 text-sm font-semibold text-zinc-300">
              Message
              <textarea
                className="focus-ring min-h-36 resize-y rounded-md border border-white/10 bg-black/30 px-4 py-3 text-sm text-white transition placeholder:text-zinc-600 focus:border-accent-300/60"
                name="message"
                placeholder="Share the details..."
                disabled={status === "submitting"}
                required
              />
            </label>

            <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <button
                className="focus-ring inline-flex min-w-32 items-center justify-center gap-2 rounded-md bg-accent-400 px-6 py-3 text-sm font-black text-black transition hover:bg-accent-300 disabled:cursor-wait disabled:opacity-70"
                type="submit"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? (
                  <>
                    Sending
                    <LoaderCircle className="animate-spin" size={16} />
                  </>
                ) : (
                  <>
                    Submit
                    <Send size={16} />
                  </>
                )}
              </button>

              <AnimatePresence mode="wait">
                {status === "success" || status === "error" ? (
                  <motion.p
                    key={status}
                    className={`flex items-start gap-2 text-sm font-semibold ${
                      status === "success" ? "text-emerald-300" : "text-red-300"
                    }`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    role="status"
                  >
                    {status === "success" ? (
                      <CircleCheck className="mt-0.5 shrink-0" size={16} />
                    ) : (
                      <TriangleAlert className="mt-0.5 shrink-0" size={16} />
                    )}
                    {statusCopy[status]}
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </div>
          </motion.form>
        </div>
      </Container>
    </AnimatedSection>
  );
}
