import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate, HTMLMotionProps } from "motion/react";

interface TiltCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
}

export function TiltCard({ children, className, style, ...props }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Initialize Motion Values for interactive tilt axes
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Configure high-fidelity spring values to absorb movement organically
  const springConfig = { damping: 25, stiffness: 180, mass: 0.6 };
  const rotateXSpring = useSpring(y, springConfig);
  const rotateYSpring = useSpring(x, springConfig);

  // Translate mouse coordinate directly to tilt angles (-10 to 10 degrees range)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate normalized value from -0.5 to 0.5
    const rX = (mouseY / height - 0.5) * -16; // Up to 16 deg tilt
    const rY = (mouseX / width - 0.5) * 16;  // Up to 16 deg tilt

    x.set(rY);
    y.set(rX);

    // Update dynamic glare position
    const glareX = (mouseX / width) * 100;
    const glareY = (mouseY / height) * 100;
    card.style.setProperty("--glare-x", `${glareX}%`);
    card.style.setProperty("--glare-y", `${glareY}%`);
    card.style.setProperty("--glare-opacity", "0.18");

    // Push shadow opposite to the tilting direction for premium depth illusion
    const shadowX = -rY * 1.5;
    const shadowY = rX * 1.5;
    card.style.setProperty("--shadow-offset-x", `${shadowX}px`);
    card.style.setProperty("--shadow-offset-y", `${20 + shadowY}px`);
    card.style.setProperty("--shadow-blur", "45px");
    card.style.setProperty("--shadow-opacity", "0.5");
  };

  const handleMouseLeave = () => {
    // Reset to absolute center
    x.set(0);
    y.set(0);

    const card = cardRef.current;
    if (card) {
      card.style.setProperty("--glare-opacity", "0");
      card.style.setProperty("--shadow-offset-x", "0px");
      card.style.setProperty("--shadow-offset-y", "4px");
      card.style.setProperty("--shadow-blur", "20px");
      card.style.setProperty("--shadow-opacity", "0.2");
    }
  };

  // Compile motion values into responsive hardware-accelerated CSS templates
  const transform = useMotionTemplate`perspective(1000px) rotateX(${rotateXSpring}deg) rotateY(${rotateYSpring}deg) scale3d(1.02, 1.02, 1.02)`;

  return (
    <motion.div
      ref={cardRef}
      className={`${className} relative overflow-hidden group`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        transform,
        transformStyle: "preserve-3d",
        boxShadow: `var(--shadow-offset-x, 0px) var(--shadow-offset-y, 4px) var(--shadow-blur, 20px) rgba(0, 0, 0, var(--shadow-opacity, 0.2)), inset 0 1px 1px rgba(255, 255, 255, 0.15)`,
      }}
      {...props}
    >
      {/* Glossy Reflective Glare Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
        style={{
          opacity: "var(--glare-opacity, 0)" as any,
          background: `radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 50%), rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0) 65%)`,
        }}
      />
      <div
        style={{ transform: "translateZ(25px)", transformStyle: "preserve-3d" }}
        className="w-full h-full flex flex-col justify-between relative z-10"
      >
        {children}
      </div>
    </motion.div>
  );
}
