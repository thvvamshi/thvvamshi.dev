import { motion, useScroll } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed left-0 top-0 z-[70] h-1 w-full origin-left bg-gradient-to-r from-accent-400 via-emerald-300 to-sky-400"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
