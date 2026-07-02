import React, { useEffect, useRef } from "react";

/**
 * High-performance, lightweight floating particle system using an HTML5 Canvas.
 * This runs on a single canvas element with a single requestAnimationFrame loop,
 * avoiding the heavy CPU and layout thrashing caused by animating multiple DOM elements.
 */
export function FloatingParticles({ count = 45 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      opacity: number;
      maxOpacity: number;
      driftSpeed: number;
      driftAngle: number;
    }

    let particles: Particle[] = [];

    const initParticles = (w: number, h: number) => {
      particles = Array.from({ length: count }).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h, // Distributed randomly over height on initial load
        size: Math.random() * 2.2 + 0.8, // 0.8px to 3.0px
        speedY: -(Math.random() * 0.35 + 0.15), // Upward speed
        opacity: 0, // Starts faded out
        maxOpacity: Math.random() * 0.22 + 0.12, // Subtle opacity (0.12 to 0.34)
        driftSpeed: Math.random() * 0.015 + 0.005,
        driftAngle: Math.random() * Math.PI * 2,
      }));
    };

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: entryWidth, height: entryHeight } = entry.contentRect;
        if (entryWidth !== width || entryHeight !== height) {
          width = entryWidth;
          height = entryHeight;
          canvas.width = width * (window.devicePixelRatio || 1);
          canvas.height = height * (window.devicePixelRatio || 1);
          ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
          
          if (particles.length === 0) {
            initParticles(width, height);
          } else {
            // Reposition existing particles proportionally
            particles.forEach((p) => {
              p.x = (p.x / (width || 1)) * entryWidth;
              p.y = (p.y / (height || 1)) * entryHeight;
            });
          }
        }
      }
    });

    const parent = canvas.parentElement;
    if (parent) {
      resizeObserver.observe(parent);
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Continuous upward movement
        p.y += p.speedY;
        
        // Gentle horizontal oscillation
        p.driftAngle += p.driftSpeed;
        p.x += Math.sin(p.driftAngle) * 0.12;

        // Soft margins: fade-out at the top/bottom edges of screen
        const padding = 120;
        if (p.y < padding) {
          p.opacity = Math.max(0, (p.y / padding) * p.maxOpacity);
        } else if (p.y > height - padding) {
          p.opacity = Math.max(0, ((height - p.y) / padding) * p.maxOpacity);
        } else {
          if (p.opacity < p.maxOpacity) {
            p.opacity += 0.01;
          }
        }

        // Loop back to the bottom when leaving the top of view
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
          p.opacity = 0;
        }

        // Draw individual particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        
        // Add subtle glows only for larger particles to keep canvas drawing fast
        if (p.size > 2.0) {
          ctx.shadowBlur = 6;
          ctx.shadowColor = "rgba(16, 185, 129, 0.35)"; // Emerald-matching glow
        } else {
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
      });

      // Clear shadows for performance
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[2]"
    />
  );
}
