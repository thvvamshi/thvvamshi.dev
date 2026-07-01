import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const x = useMotionValue(-20);
  const y = useMotionValue(-20);
  const springX = useSpring(x, { damping: 20, stiffness: 100, mass: 0.12 });
  const springY = useSpring(y, { damping: 20, stiffness: 100, mass: 0.12 });
  const [isVisible, setIsVisible] = useState(false);
  const [canUseCursor, setCanUseCursor] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const update = () => setCanUseCursor(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!canUseCursor) {
      return;
    }

    const handleMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setIsVisible(true);
    };

    const handleLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerleave", handleLeave);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerleave", handleLeave);
    };
  }, [canUseCursor, x, y]);

  if (!canUseCursor) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[80] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        opacity: isVisible ? 1 : 0,
      }}
    />
  );
}
