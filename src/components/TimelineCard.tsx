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
      className="surface-interactive group relative overflow-hidden rounded-lg p-6"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-300">
          {item.period}
        </p>
        <span className="font-mono text-xs text-zinc-700">0{index + 1}</span>
      </div>
      <h3 className="mt-4 text-xl font-bold text-white">{item.title}</h3>
      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
        {item.organization}
      </p>
      <p className="mt-5 text-sm leading-7 text-zinc-300">{item.description}</p>
      {item.tags?.length ? (
        <div className="mt-6 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      ) : null}
    </motion.article>
  );
}
