"use client";

import { useRef, useEffect, useSyncExternalStore } from "react";

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (callback) => {
      const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}

const HEX_RADIUS = 50;
const HEX_WIDTH = Math.sqrt(3) * HEX_RADIUS;
const LINE_BASE_OPACITY = 0.04;
const MOUSE_INFLUENCE_RADIUS = 180;
const MOUSE_GLOW_INTENSITY = 0.12;

interface Blob {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  phase: number;
  speed: number;
}

function createBlobs(w: number, h: number): Blob[] {
  return [
    { x: w * 0.3, y: h * 0.3, vx: 0.15, vy: 0.1, radius: 350, color: "rgba(245,158,11,", phase: 0, speed: 0.0003 },
    { x: w * 0.7, y: h * 0.6, vx: -0.1, vy: 0.12, radius: 300, color: "rgba(244,63,94,", phase: 2, speed: 0.0004 },
    { x: w * 0.5, y: h * 0.8, vx: 0.08, vy: -0.08, radius: 400, color: "rgba(255,255,255,", phase: 4, speed: 0.0002 },
    { x: w * 0.2, y: h * 0.7, vx: -0.12, vy: -0.06, radius: 280, color: "rgba(245,158,11,", phase: 1, speed: 0.00035 },
  ];
}

function drawHexagon(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
}

export default function AuroraHexGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const blobsRef = useRef<Blob[]>([]);
  const rafRef = useRef<number>(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 1.5);
    let w = window.innerWidth;
    let h = window.innerHeight;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      blobsRef.current = createBlobs(w, h);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });

    let time = 0;

    const draw = () => {
      time++;
      ctx.clearRect(0, 0, w, h);

      const blobs = blobsRef.current;
      for (const blob of blobs) {
        blob.x += Math.sin(time * blob.speed + blob.phase) * blob.vx;
        blob.y += Math.cos(time * blob.speed * 0.7 + blob.phase) * blob.vy;

        if (blob.x < -blob.radius) blob.x = w + blob.radius;
        if (blob.x > w + blob.radius) blob.x = -blob.radius;
        if (blob.y < -blob.radius) blob.y = h + blob.radius;
        if (blob.y > h + blob.radius) blob.y = -blob.radius;

        const grad = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.radius);
        grad.addColorStop(0, `${blob.color}0.04)`);
        grad.addColorStop(0.5, `${blob.color}0.02)`);
        grad.addColorStop(1, `${blob.color}0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      const mx = mouse.current.x;
      const my = mouse.current.y;

      const offsetY = HEX_RADIUS * 0.75;
      const cols = Math.ceil(w / HEX_WIDTH) + 2;
      const rows = Math.ceil(h / offsetY) + 2;

      ctx.lineWidth = 1;

      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          const cx = col * HEX_WIDTH + (row % 2 !== 0 ? HEX_WIDTH / 2 : 0);
          const cy = row * offsetY;

          const dx = mx - cx;
          const dy = my - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const glow = dist < MOUSE_INFLUENCE_RADIUS
            ? MOUSE_GLOW_INTENSITY * (1 - dist / MOUSE_INFLUENCE_RADIUS)
            : 0;

          const pulse = Math.sin(time * 0.02 + row * 0.3 + col * 0.2) * 0.01;
          const opacity = LINE_BASE_OPACITY + pulse + glow;

          if (glow > 0.02) {
            ctx.strokeStyle = `rgba(245, 158, 11, ${Math.min(opacity * 2, 0.2)})`;
          } else {
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
          }

          drawHexagon(ctx, cx, cy, HEX_RADIUS);
          ctx.stroke();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <canvas ref={canvasRef} className="block" aria-hidden="true" />
    </div>
  );
}
