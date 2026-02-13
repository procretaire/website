"use client";

import { useEffect, useRef } from "react";
import styles from "./ClothSimulation.module.css";

interface Point {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  pinned: boolean;
}

interface Constraint {
  p1: Point;
  p2: Point;
  restDistance: number;
}

export default function ClothSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const constraintsRef = useRef<Constraint[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, down: false });

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const ctx = canvasEl.getContext("2d");
    if (!ctx) return;

    const canvas = canvasEl as HTMLCanvasElement;
    const context = ctx as CanvasRenderingContext2D;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initCloth();
    };
    resizeCanvas();

    // Initialize cloth
    function initCloth() {
      const clothWidth = canvas.width;
      const clothHeight = canvas.height * 0.4;
      const clothResolution = 8;
      const spacingX = clothWidth / clothResolution;
      const spacingY = clothHeight / clothResolution;

      pointsRef.current = [];
      constraintsRef.current = [];

      // Create grid of points
      for (let y = 0; y <= clothResolution; y++) {
        for (let x = 0; x <= clothResolution; x++) {
          const px = (canvas.width - clothWidth) / 2 + x * spacingX;
          const py = 50 + y * spacingY;

          const point: Point = {
            x: px,
            y: py,
            prevX: px,
            prevY: py,
            pinned: y === 0 && (x === 0 || x === clothResolution),
          };

          pointsRef.current.push(point);
        }
      }

      // Create constraints
      for (let y = 0; y <= clothResolution; y++) {
        for (let x = 0; x <= clothResolution; x++) {
          const idx = y * (clothResolution + 1) + x;
          const current = pointsRef.current[idx];

          // Horizontal constraint
          if (x < clothResolution) {
            const right = pointsRef.current[y * (clothResolution + 1) + x + 1];
            constraintsRef.current.push({
              p1: current,
              p2: right,
              restDistance: spacingX,
            });
          }

          // Vertical constraint
          if (y < clothResolution) {
            const below = pointsRef.current[(y + 1) * (clothResolution + 1) + x];
            constraintsRef.current.push({
              p1: current,
              p2: below,
              restDistance: spacingY,
            });
          }
        }
      }
    }

    // Physics simulation
    function simulate() {
      const gravity = 0.2;
      const friction = 0.99;
      const constraintIterations = 5;

      // Apply forces
      for (let point of pointsRef.current) {
        if (point.pinned) continue;

        const vx = (point.x - point.prevX) * friction;
        const vy = (point.y - point.prevY) * friction;

        point.prevX = point.x;
        point.prevY = point.y;

        point.x += vx;
        point.y += vy + gravity;

        // Keep within bounds
        if (point.y > canvas.height) point.y = canvas.height;
        if (point.x < 0) point.x = 0;
        if (point.x > canvas.width) point.x = canvas.width;
      }

      // Solve constraints
      for (let iter = 0; iter < constraintIterations; iter++) {
        for (let constraint of constraintsRef.current) {
          const dx = constraint.p2.x - constraint.p1.x;
          const dy = constraint.p2.y - constraint.p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const diff = (dist - constraint.restDistance) / dist;

          const offsetX = dx * diff * 0.5;
          const offsetY = dy * diff * 0.5;

          if (!constraint.p1.pinned) {
            constraint.p1.x += offsetX;
            constraint.p1.y += offsetY;
          }
          if (!constraint.p2.pinned) {
            constraint.p2.x -= offsetX;
            constraint.p2.y -= offsetY;
          }
        }
      }

      // Mouse interaction
      if (mouseRef.current.down) {
        const mouse = mouseRef.current;
        const pullStrength = 0.2;

        for (let point of pointsRef.current) {
          const dx = mouse.x - point.x;
          const dy = mouse.y - point.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 80) {
            point.x += dx * pullStrength;
            point.y += dy * pullStrength;
          }
        }
      }
    }

    // Rendering
    function render() {
      context.fillStyle = "rgba(255, 255, 255, 0.02)";
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.strokeStyle = "rgba(100, 150, 255, 0.3)";
      context.lineWidth = 1;

      // Draw cloth
      for (let constraint of constraintsRef.current) {
        context.beginPath();
        context.moveTo(constraint.p1.x, constraint.p1.y);
        context.lineTo(constraint.p2.x, constraint.p2.y);
        context.stroke();
      }

      // Draw points
      context.fillStyle = "rgba(150, 180, 255, 0.5)";
      for (let point of pointsRef.current) {
        context.beginPath();
        context.arc(point.x, point.y, 2, 0, Math.PI * 2);
        context.fill();
      }
    }

    // Animation loop
    function animate() {
      simulate();
      render();
      requestAnimationFrame(animate);
    }
    animate();

    // Mouse events
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseDown = () => {
      mouseRef.current.down = true;
    };

    const handleMouseUp = () => {
      mouseRef.current.down = false;
    };

    // Touch events
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
      }
    };

    const handleTouchStart = () => {
      mouseRef.current.down = true;
    };

    const handleTouchEnd = () => {
      mouseRef.current.down = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}
