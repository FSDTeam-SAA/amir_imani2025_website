"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Particle = {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  driftX: number;
  alpha: number;
  tail: number;
  color: string;
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

function createParticle(width: number, height: number, startAbove = false): Particle {
  const depth = Math.random();
  const radius = 0.35 + depth * 1.1;
  const speedY = 20 + depth * 36;
  const tail = 7 + depth * 18;

  return {
    x: Math.random() * width,
    y: startAbove ? -Math.random() * height : Math.random() * height,
    radius,
    speedY,
    driftX: (Math.random() - 0.5) * (2 + depth * 4),
    alpha: 0.22 + depth * 0.62,
    tail,
    color: randomFrom(STAR_COLORS),
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
    let dpr = 1;
    let lastTime = performance.now();
    let startTime = performance.now();
    let hasSettled = false;

    const drawBackground = () => {
      if (!showBackdrop) {
        return;
      }

      const topGradient = context.createLinearGradient(0, 0, 0, height);
      topGradient.addColorStop(0, "#152c2e");
      topGradient.addColorStop(0.42, "#0b191d");
      topGradient.addColorStop(1, "#081114");
      context.fillStyle = topGradient;
      context.fillRect(0, 0, width, height);

      const glowA = context.createRadialGradient(
        width * 0.22,
        height * 0.12,
        0,
        width * 0.22,
        height * 0.12,
        width * 0.28,
      );
      glowA.addColorStop(0, "rgba(226,148,72,0.12)");
      glowA.addColorStop(1, "rgba(226,148,72,0)");
      context.fillStyle = glowA;
      context.fillRect(0, 0, width, height);

      const glowB = context.createRadialGradient(
        width * 0.76,
        height * 0.18,
        0,
        width * 0.76,
        height * 0.18,
        width * 0.24,
      );
      glowB.addColorStop(0, "rgba(210,132,66,0.09)");
      glowB.addColorStop(1, "rgba(210,132,66,0)");
      context.fillStyle = glowB;
      context.fillRect(0, 0, width, height);
    };

    const drawStaticStars = () => {
      for (const particle of particles) {
        context.beginPath();
        context.fillStyle = `${particle.color}${Math.round(Math.min(particle.alpha * 0.65, 0.6) * 255)
          .toString(16)
          .padStart(2, "0")}`;
        context.shadowColor = particle.color;
        context.shadowBlur = particle.radius * 5;
        context.arc(particle.x, particle.y, Math.max(particle.radius * 0.8, 0.3), 0, Math.PI * 2);
        context.fill();
      }
      context.shadowBlur = 0;
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = Math.max(Math.floor(rect.width), 1);
      height = Math.max(Math.floor(rect.height), 1);
      dpr = Math.min(window.devicePixelRatio || 1, 1.25);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = Math.max(
        520,
        Math.min(2200, Math.floor((width * height) / 1400) * densityScale),
      );
      particles = Array.from({ length: density }, () => createParticle(width, height));
      hasSettled = false;
    };

    const render = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.033);
      lastTime = time;
      const elapsed = time - startTime;
      const fadeStart = Math.max(durationMs - FADE_OUT_WINDOW_MS, 0);
      const fadeProgress =
        elapsed <= fadeStart
          ? 0
          : Math.min((elapsed - fadeStart) / FADE_OUT_WINDOW_MS, 1);
      const fadeMultiplier = 1 - fadeProgress;

      context.clearRect(0, 0, width, height);
      drawBackground();

      if (elapsed >= durationMs) {
        if (!hasSettled) {
          drawStaticStars();
          hasSettled = true;
        }
        return;
      }

      for (const particle of particles) {
        particle.y += particle.speedY * delta;
        particle.x += particle.driftX * delta;

        if (particle.y - particle.tail > height || particle.x < -40 || particle.x > width + 40) {
          Object.assign(particle, createParticle(width, height, true));
          continue;
        }

        context.beginPath();
        context.strokeStyle = `${particle.color}${Math.round(
          particle.alpha * 0.72 * fadeMultiplier * 255,
        )
          .toString(16)
          .padStart(2, "0")}`;
        context.lineWidth = Math.max(0.45, particle.radius * 0.9);
        context.moveTo(particle.x, particle.y - particle.tail);
        context.lineTo(particle.x, particle.y + particle.radius * 1.5);
        context.stroke();

        context.beginPath();
        context.fillStyle = `${particle.color}${Math.round(
          particle.alpha * fadeMultiplier * 255,
        )
          .toString(16)
          .padStart(2, "0")}`;
        context.shadowColor = particle.color;
        context.shadowBlur = particle.radius * (3 + fadeMultiplier * 5);
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      }

      context.shadowBlur = 0;
      animationFrame = window.requestAnimationFrame(render);
    };

    resize();
    startTime = performance.now();
    lastTime = startTime;
    animationFrame = window.requestAnimationFrame(render);
    const observer = new ResizeObserver(resize);
    observer.observe(container);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      observer.disconnect();
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
