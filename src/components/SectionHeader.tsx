interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  const isCentered = align === "center";

  return (
    <div
      className={`mb-10 grid gap-5 sm:mb-14 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.72fr)] lg:items-end ${
        isCentered ? "mx-auto max-w-4xl text-center lg:block" : "text-left"
      }`}
    >
      <div>
        {eyebrow ? (
          <div className={`mb-4 flex items-center gap-3 ${isCentered ? "justify-center" : ""}`}>
            <span className="h-px w-8 bg-accent-300" />
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.26em] text-accent-300">
              {eyebrow}
            </p>
          </div>
        ) : null}
        <h2 className="max-w-4xl text-balance text-3xl font-black tracking-normal text-white sm:text-4xl lg:text-5xl">
          {title}
        </h2>
      </div>
      {description ? (
        <p className={`${isCentered ? "mt-5" : ""} text-pretty text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
