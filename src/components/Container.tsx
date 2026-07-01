import type { PropsWithChildren } from "react";

interface ContainerProps extends PropsWithChildren {
  className?: string;
  width?: "content" | "wide" | "full";
}

const widthClasses = {
  content: "max-w-4xl px-6 sm:px-8",
  wide: "max-w-6xl px-4 sm:px-6",
  full: "w-full px-4 sm:px-6",
} as const;

export function Container({ className = "", children, width = "content" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full ${widthClasses[width]} ${className}`}>
      {children}
    </div>
  );
}
