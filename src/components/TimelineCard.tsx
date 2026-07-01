import { motion } from "framer-motion";
import type { TimelineItem } from "../types/content";
import { Badge } from "./Badge";

interface TimelineCardProps {
  item: TimelineItem;
  index: number;
}

export function TimelineCard({ item, index }: TimelineCardProps) {
  return (
    <motion.article
      className="surface-interactive group relative overflow-hidden rounded-2xl border border-zinc-800/90 bg-zinc-950/55 p-4 transition duration-300 hover:border-zinc-700 hover:bg-white/[0.04]"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-[0.64rem] font-medium uppercase tracking-[0.16em] text-accent-300">
          {item.period}
        </p>
        <span className="rounded-full border border-zinc-800 bg-black/20 px-2 py-1 text-[0.6rem] font-medium text-zinc-500">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="text-sm font-semibold leading-snug text-zinc-50 sm:text-[0.98rem]">{item.title}</h3>
      <p className="mt-1 text-[0.64rem] font-medium uppercase tracking-[0.14em] text-zinc-500">
        {item.organization}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-zinc-400">{item.description}</p>
      {item.tags?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      ) : null}
    </motion.article>
  );
}
