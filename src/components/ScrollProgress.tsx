import { motion, useScroll } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed left-0 top-0 z-[70] h-px w-full origin-left bg-zinc-200/70"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
