import { motion, type Variants } from "framer-motion";
import type { PropsWithChildren } from "react";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

interface AnimatedSectionProps extends PropsWithChildren {
  id: string;
  className?: string;
}

export function AnimatedSection({
  id,
  className = "",
  children,
}: AnimatedSectionProps) {
  return (
    <motion.section
      id={id}
      className={`scroll-mt-24 py-20 sm:py-24 lg:py-28 ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.16 }}
      variants={sectionVariants}
    >
      {children}
    </motion.section>
  );
}
