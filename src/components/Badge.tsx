import type { PropsWithChildren } from "react";

export function Badge({ children }: PropsWithChildren) {
  return (
    <span className="rounded-md border border-white/[0.08] bg-white/[0.035] px-2.5 py-1 font-mono text-[0.68rem] font-medium text-zinc-400">
      {children}
    </span>
  );
}
