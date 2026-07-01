import { useEffect, useRef } from "react";

type ShootingStar = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  length: number;
  opacity: number;
};

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function createShootingStar(width: number) {
  const fromLeft = Math.random() > 0.28;
  const startX = fromLeft
    ? randomBetween(-width * 0.12, width * 0.3)
    : randomBetween(width * 0.7, width * 1.1);
  const startY = randomBetween(-40, Math.min(window.innerHeight * 0.4, 420));
  const speed = randomBetween(14, 24);
  const angle = fromLeft ? randomBetween(0.62, 0.74) : randomBetween(2.38, 2.55);
  const vx = Math.cos(angle) * speed;
  const vy = Math.sin(angle) * speed;

  return {
    x: startX,
    y: startY,
    vx,
    vy,
    life: 0,
    maxLife: randomBetween(24, 42),
    length: randomBetween(120, 220),
    opacity: randomBetween(0.55, 0.9),
  } satisfies ShootingStar;
}

export function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    let animationFrame = 0;
    let shootingStars: ShootingStar[] = [];
    let width = 0;
    let height = 0;
    let spawnTimer = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = () => {
      context.fillStyle = "#000000";
      context.fillRect(0, 0, width, height);

      const skyGlow = context.createRadialGradient(width * 0.5, height * 0.2, 0, width * 0.5, height * 0.2, width * 0.7);
      skyGlow.addColorStop(0, "rgba(255,255,255,0.012)");
      skyGlow.addColorStop(1, "rgba(255,255,255,0)");
      context.fillStyle = skyGlow;
      context.fillRect(0, 0, width, height);

      spawnTimer += 1;
      if (spawnTimer > 3 + Math.random() * 7) {
        const burstCount = 1 + Math.floor(Math.random() * 3);
        for (let index = 0; index < burstCount; index += 1) {
          shootingStars.push(createShootingStar(width));
        }
        spawnTimer = 0;
      }

      shootingStars = shootingStars.filter((shootingStar) => shootingStar.life < shootingStar.maxLife);
      for (const shootingStar of shootingStars) {
        shootingStar.life += 1;
        shootingStar.x += shootingStar.vx;
        shootingStar.y += shootingStar.vy;

        const progress = shootingStar.life / shootingStar.maxLife;
        const alpha = shootingStar.opacity * (1 - progress);
        const tailX = shootingStar.x - shootingStar.vx * (shootingStar.length / 14);
        const tailY = shootingStar.y - shootingStar.vy * (shootingStar.length / 14);

        const trail = context.createLinearGradient(shootingStar.x, shootingStar.y, tailX, tailY);
        trail.addColorStop(0, `rgba(255,255,255,${alpha})`);
        trail.addColorStop(1, "rgba(255,255,255,0)");

        context.beginPath();
        context.strokeStyle = trail;
        context.lineWidth = 1.2;
        context.lineCap = "round";
        context.moveTo(shootingStar.x, shootingStar.y);
        context.lineTo(tailX, tailY);
        context.stroke();

        context.beginPath();
        context.fillStyle = `rgba(255,255,255,${alpha})`;
        context.arc(shootingStar.x, shootingStar.y, 1.4, 0, Math.PI * 2);
        context.fill();
      }

      animationFrame = window.requestAnimationFrame(draw);
    };

    resize();
    animationFrame = window.requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[-1] h-full w-full bg-black"
    />
  );
}
