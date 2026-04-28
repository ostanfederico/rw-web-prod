"use client";

import { useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/cn";

type Shape = "circle" | "rect" | "triangle";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  shape: Shape;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
}

export type ConfettiProps = {
  label?: string;
  className?: string;
};

const COLOR_VARS = [
  "--confetti-red",
  "--confetti-orange",
  "--confetti-yellow",
  "--confetti-green",
  "--confetti-teal",
  "--confetti-blue",
  "--confetti-purple",
  "--confetti-pink",
] as const;

const SHAPES: Shape[] = ["circle", "rect", "triangle"];
const COUNT = 150;
const SIZE = 8;
const GRAVITY = 0.28;
const DRAG = 0.987;
const DURATION = 3400;

export function Confetti({ label = "Celebrate 🎉", className }: ConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const launch = useCallback(() => {
    const canvas = canvasRef.current;
    const button = buttonRef.current;
    if (!canvas || !button) return;

    cancelAnimationFrame(rafRef.current);

    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    // getContext("2d") is always non-null in any real browser
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    const computed = getComputedStyle(document.documentElement);
    const colors = COLOR_VARS.map((v) => computed.getPropertyValue(v).trim());

    const { left, top, width, height } = button.getBoundingClientRect();
    const ox = left + width / 2;
    const oy = top + height / 2;

    const particles: Particle[] = Array.from({ length: COUNT }, () => {
      // Fan upward with wide spread to sides
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.5;
      const speed = 5 + Math.random() * 10;
      return {
        x: ox + (Math.random() - 0.5) * width,
        y: oy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.28,
        opacity: 1,
      };
    });

    const start = performance.now();

    function frame(now: number) {
      const t = Math.min((now - start) / DURATION, 1);
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.vy += GRAVITY;
        p.vx *= DRAG;
        p.vy *= DRAG;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        // Hold full opacity for first 60%, then fade out
        p.opacity = t < 0.6 ? 1 : 1 - (t - 0.6) / 0.4;

        if (p.opacity <= 0) continue;

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, SIZE / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === "rect") {
          ctx.fillRect(-SIZE / 2, -SIZE * 0.3, SIZE, SIZE * 0.6);
        } else {
          ctx.beginPath();
          ctx.moveTo(0, -SIZE / 2);
          ctx.lineTo(SIZE / 2, SIZE / 2);
          ctx.lineTo(-SIZE / 2, SIZE / 2);
          ctx.closePath();
          ctx.fill();
        }

        ctx.restore();
      }

      if (t < 1) {
        rafRef.current = requestAnimationFrame(frame);
      } else {
        ctx.clearRect(0, 0, w, h);
      }
    }

    rafRef.current = requestAnimationFrame(frame);
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-50"
        aria-hidden="true"
      />
      <button
        ref={buttonRef}
        type="button"
        onClick={launch}
        className={cn(
          "inline-flex items-center justify-center",
          "font-medium text-[15px] leading-5 tracking-[0.1px] font-[var(--font-prometheus)]",
          "px-4 py-3 rounded-2xl",
          "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-label)]",
          "border-[1.5px] border-[var(--btn-primary-border)]",
          "hover:bg-[var(--btn-primary-bg-hover)]",
          "active:bg-[var(--btn-primary-bg-pressed)] active:shadow-[var(--btn-pressed-inset)]",
          "transition-colors select-none",
          className
        )}
      >
        {label}
      </button>
    </>
  );
}
