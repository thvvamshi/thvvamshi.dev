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
      className={`mb-8 grid gap-4 sm:mb-10 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.72fr)] lg:items-end ${
        isCentered ? "mx-auto max-w-4xl text-center lg:block" : "text-left"
      }`}
    >
      <div>
        {eyebrow ? (
          <div className={`mb-4 flex items-center gap-3 ${isCentered ? "justify-center" : ""}`}>
            <span className="h-px w-8 bg-accent-300/80" />
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-accent-300">
              {eyebrow}
            </p>
          </div>
        ) : null}
        <h2 className="max-w-3xl text-balance text-lg font-semibold leading-tight tracking-normal text-zinc-50 sm:text-xl lg:text-2xl">
          {title}
        </h2>
      </div>
      {description ? (
        <p className={`${isCentered ? "mx-auto mt-3 max-w-2xl" : "max-w-xl"} text-pretty text-xs leading-relaxed text-zinc-400 sm:text-sm`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
