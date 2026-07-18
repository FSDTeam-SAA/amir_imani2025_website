"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Particle = {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  color: string;
  delay: number;
  bloom: number;
};

const STAR_COLORS = ["#c98546", "#d69758", "#e0aa6e", "#d28d4f", "#e3b67f"];
const ANIMATION_DURATION_MS = 3800;
const FADE_OUT_WINDOW_MS = 1100;

type StarfieldBackgroundProps = {
  className?: string;
  densityScale?: number;
  durationMs?: number;
  showBackdrop?: boolean;
  canvasOpacity?: number;
};

function randomFrom<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function alphaHex(value: number) {
  return Math.round(Math.max(0, Math.min(value, 1)) * 255)
    .toString(16)
    .padStart(2, "0");
}

function createParticle(
  width: number,
  height: number,
  durationMs: number,
): Particle {
  const depth = Math.random();

  return {
    x: Math.random() * width,
    y: Math.random() * height,
    radius: 0.35 + depth * 1,
    alpha: 0.22 + depth * 0.58,
    color: randomFrom(STAR_COLORS),
    delay: Math.random() * Math.min(durationMs * 0.58, 1800),
    bloom: 1.5 + depth * 1.2,
  };
}

export default function StarfieldBackground({
  className,
  densityScale = 1,
  durationMs = ANIMATION_DURATION_MS,
  showBackdrop = true,
  canvasOpacity = 0.9,
}: StarfieldBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let animationFrame = 0;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let startTime = performance.now();
    let hasSettled = false;
    let backgroundCanvas: HTMLCanvasElement | null = null;

    const buildBackgroundCache = () => {
      if (!showBackdrop) {
        backgroundCanvas = null;
        return;
      }

      const cache = document.createElement("canvas");
      cache.width = Math.max(width, 1);
      cache.height = Math.max(height, 1);
      const cacheContext = cache.getContext("2d");

      if (!cacheContext) {
        backgroundCanvas = null;
        return;
      }

      const topGradient = cacheContext.createLinearGradient(0, 0, 0, height);
      topGradient.addColorStop(0, "#152c2e");
      topGradient.addColorStop(0.42, "#0b191d");
      topGradient.addColorStop(1, "#081114");
      cacheContext.fillStyle = topGradient;
      cacheContext.fillRect(0, 0, width, height);

      const glowA = cacheContext.createRadialGradient(
        width * 0.22,
        height * 0.12,
        0,
        width * 0.22,
        height * 0.12,
        width * 0.28,
      );
      glowA.addColorStop(0, "rgba(226,148,72,0.12)");
      glowA.addColorStop(1, "rgba(226,148,72,0)");
      cacheContext.fillStyle = glowA;
      cacheContext.fillRect(0, 0, width, height);

      const glowB = cacheContext.createRadialGradient(
        width * 0.76,
        height * 0.18,
        0,
        width * 0.76,
        height * 0.18,
        width * 0.24,
      );
      glowB.addColorStop(0, "rgba(210,132,66,0.09)");
      glowB.addColorStop(1, "rgba(210,132,66,0)");
      cacheContext.fillStyle = glowB;
      cacheContext.fillRect(0, 0, width, height);

      backgroundCanvas = cache;
    };

    const drawBackground = () => {
      if (backgroundCanvas) {
        context.drawImage(backgroundCanvas, 0, 0, width, height);
        return;
      }

      context.clearRect(0, 0, width, height);
    };

    const drawDot = (
      x: number,
      y: number,
      radius: number,
      color: string,
      opacity: number,
      glow: number,
    ) => {
      context.beginPath();
      context.fillStyle = `${color}${alphaHex(opacity)}`;
      if (glow > 0.75) {
        context.shadowColor = color;
        context.shadowBlur = glow;
      } else {
        context.shadowBlur = 0;
      }
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
      context.shadowBlur = 0;
    };

    const drawCross = (
      x: number,
      y: number,
      radius: number,
      color: string,
      opacity: number,
    ) => {
      const length = radius * 2.25;
      const thickness = Math.max(0.45, radius * 0.28);

      context.fillStyle = `${color}${alphaHex(opacity)}`;
      context.fillRect(x - length, y - thickness / 2, length * 2, thickness);
      context.fillRect(x - thickness / 2, y - length, thickness, length * 2);
    };

    const drawStaticStars = () => {
      for (const particle of particles) {
        drawDot(
          particle.x,
          particle.y,
          Math.max(particle.radius * 0.82, 0.28),
          particle.color,
          Math.min(particle.alpha * 0.56, 0.48),
          0,
        );
      }
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = Math.max(Math.floor(rect.width), 1);
      height = Math.max(Math.floor(rect.height), 1);

      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(1, 0, 0, 1, 0, 0);

      buildBackgroundCache();

      const density = Math.max(
        280,
        Math.min(980, Math.floor((width * height) / 2600) * densityScale),
      );

      particles = Array.from({ length: density }, () =>
        createParticle(width, height, durationMs),
      ).sort((a, b) => a.delay - b.delay);

      hasSettled = false;
    };

    const render = (time: number) => {
      const elapsed = time - startTime;
      const fadeStart = Math.max(durationMs - FADE_OUT_WINDOW_MS, 0);
      const fadeProgress =
        elapsed <= fadeStart
          ? 0
          : Math.min((elapsed - fadeStart) / FADE_OUT_WINDOW_MS, 1);
      const fadeMultiplier = 1 - fadeProgress;

      drawBackground();

      if (elapsed >= durationMs) {
        if (!hasSettled) {
          drawStaticStars();
          hasSettled = true;
        }
        return;
      }

      for (const particle of particles) {
        if (elapsed < particle.delay) {
          break;
        }

        const igniteWindow = 520;
        const igniteProgress = Math.max(
          0,
          Math.min((elapsed - particle.delay) / igniteWindow, 1),
        );
        const easedIgnite = 1 - Math.pow(1 - igniteProgress, 3);
        const pulse = Math.sin(igniteProgress * Math.PI);
        const radius =
          particle.radius *
          (0.58 + easedIgnite * 0.42 + pulse * particle.bloom * 0.14);
        const alpha = particle.alpha * easedIgnite * fadeMultiplier;

        if (alpha <= 0.003) {
          continue;
        }

        if (radius > 0.85) {
          drawCross(
            particle.x,
            particle.y,
            radius * (1 + pulse * 0.18),
            particle.color,
            alpha * (0.14 + pulse * 0.22),
          );
        }

        drawDot(
          particle.x,
          particle.y,
          radius,
          particle.color,
          alpha,
          radius > 0.9 ? radius * (1.5 + pulse * 1.4) : 0,
        );
      }

      animationFrame = window.requestAnimationFrame(render);
    };

    resize();
    startTime = performance.now();
    animationFrame = window.requestAnimationFrame(render);

    const observer = new ResizeObserver(resize);
    observer.observe(container);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      observer.disconnect();
      backgroundCanvas = null;
    };
  }, [densityScale, durationMs, showBackdrop]);

  return (
    <div
      ref={containerRef}
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ opacity: canvasOpacity }}
      />
    </div>
  );
}
