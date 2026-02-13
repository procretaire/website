"use client";

import { useEffect, useRef } from "react";
import styles from "./AnimatedBackground.module.css";

interface NoisePoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<NoisePoint[]>([]);
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const canvasEl = canvas as HTMLCanvasElement;
    const context = ctx as CanvasRenderingContext2D;

    const getThemeColors = () => {
      const rootStyles = getComputedStyle(document.documentElement);
      const read = (name: string, fallback: string) => {
        const value = rootStyles.getPropertyValue(name).trim();
        return value.length > 0 ? value : fallback;
      };

      return {
        primary: `hsl(${read("--primary", "274 42% 31%")})`,
        secondary: `hsl(${read("--secondary", "203 32% 64%")})`,
        tertiary: `hsl(${read("--accent", "244 25% 52%")})`,
        accent: `hsl(${read("--muted-foreground", "52 35% 79%")})`,
        background: `hsl(${read("--background", "0 0% 100%")})`,
      };
    };

    const withAlpha = (color: string, alpha: number) => {
      if (!color) return `rgba(0, 0, 0, ${alpha})`;

      const hslMatch = color.match(/^hsla?\((.+)\)$/);
      if (hslMatch) {
        const body = hslMatch[1].split("/")[0].trim();
        return `hsl(${body} / ${alpha})`;
      }

      return color;
    };

    let colors = getThemeColors();

    // Set canvas size
    const resizeCanvas = () => {
      canvasEl.width = window.innerWidth;
      canvasEl.height = window.innerHeight;
      initPoints();
    };
    resizeCanvas();

    // Initialize flow points
    function initPoints() {
      pointsRef.current = [];
      const pointCount = 20;

      for (let i = 0; i < pointCount; i++) {
        pointsRef.current.push({
          x: Math.random() * canvasEl.width,
          y: Math.random() * canvasEl.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
        });
      }
    }

    // Perlin-like noise
    function noise(x: number, y: number, time: number): number {
      const n =
        Math.sin(x * 0.01 + time * 0.001) *
        Math.cos(y * 0.01 + time * 0.0001);
      return (n + 1) * 0.5;
    }

    // Draw animated background
    function animate() {
      timeRef.current += 1;

      // Update and move points
      for (let point of pointsRef.current) {
        const n = noise(point.x, point.y, timeRef.current);
        const angle = n * Math.PI * 2;

        point.vx = Math.cos(angle) * 0.3;
        point.vy = Math.sin(angle) * 0.3;

        // Mouse attraction
        const dx = mouseRef.current.x - point.x;
        const dy = mouseRef.current.y - point.y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        const attractionRadius = 300;

        if (mouseRef.current.active && distToMouse > 0 && distToMouse < attractionRadius) {
          const attraction = 1 * (1 - distToMouse / attractionRadius);
          const dirX = dx / distToMouse;
          const dirY = dy / distToMouse;

          point.vx += dirX * attraction;
          point.vy += dirY * attraction;
        }

        point.x += point.vx;
        point.y += point.vy;

        // Wrap around
        if (point.x < -50) point.x = canvasEl.width + 50;
        if (point.x > canvasEl.width + 50) point.x = -50;
        if (point.y < -50) point.y = canvasEl.height + 50;
        if (point.y > canvasEl.height + 50) point.y = -50;
      }

      // Clear with subtle fade
      context.fillStyle = withAlpha(colors.background, 0.08);
      context.fillRect(0, 0, canvasEl.width, canvasEl.height);

      // Draw flowing orbs
      for (let i = 0; i < pointsRef.current.length; i++) {
        const point = pointsRef.current[i];
        const colorList = [
          colors.primary,
          colors.secondary,
          colors.tertiary,
          colors.accent,
        ];
        const color = colorList[i % colorList.length];

        // Draw gradient blob
        const gradient = context.createRadialGradient(point.x, point.y, 0, point.x, point.y, 80);
        gradient.addColorStop(0, withAlpha(color, 0.38));
        gradient.addColorStop(0.5, withAlpha(color, 0.14));
        gradient.addColorStop(1, withAlpha(color, 0));

        context.fillStyle = gradient;
        context.fillRect(
          point.x - 80,
          point.y - 80,
          160,
          160
        );
      }

      // Draw connecting lines
      context.strokeStyle = withAlpha(colors.secondary, 0.28);
      context.lineWidth = 0.5;
      for (let i = 0; i < pointsRef.current.length; i++) {
        for (let j = i + 1; j < pointsRef.current.length; j++) {
          const p1 = pointsRef.current[i];
          const p2 = pointsRef.current[j];
          const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);

          if (dist < 200) {
            context.globalAlpha = 1 - dist / 200;
            context.beginPath();
            context.moveTo(p1.x, p1.y);
            context.lineTo(p2.x, p2.y);
            context.stroke();
            context.globalAlpha = 1;
          }
        }
      }

      requestAnimationFrame(animate);
    }
    animate();

    // Handle theme changes
    const observer = new MutationObserver(() => {
      colors = getThemeColors();
      resizeCanvas();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Mouse event listeners
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
        mouseRef.current.active = true;
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("resize", resizeCanvas);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}
