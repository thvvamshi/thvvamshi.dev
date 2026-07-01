import type { PropsWithChildren } from "react";
import { Header } from "./Header";
import { CustomCursor } from "./CustomCursor";
import { ScrollProgress } from "./ScrollProgress";
import { StarBackground } from "./StarBackground";

export function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative isolate min-h-screen overflow-x-clip bg-black text-white">
      <StarBackground />
      <CustomCursor />
      <ScrollProgress />
      <Header />
      <main className="relative z-10">{children}</main>
    </div>
  );
}
