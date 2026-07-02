import React from "react";
import { motion } from "motion/react";

export function AtmosphericOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Orb 1: Golden-white glass sphere */}
      <motion.div
        className="absolute w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full"
        style={{
          top: "10%",
          left: "-5%",
          background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.02) 40%, rgba(0, 0, 0, 0) 80%)",
          boxShadow: "inset 10px 10px 30px rgba(255, 255, 255, 0.15), inset -10px -10px 30px rgba(0, 0, 0, 0.6), 0 20px 50px rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          willChange: "transform",
        }}
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -50, 30, 0],
          rotate: [0, 120, 240, 360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Orb 2: Silver/ice-blue giant deep sphere */}
      <motion.div
        className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full"
        style={{
          bottom: "15%",
          right: "-10%",
          background: "radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.01) 50%, rgba(0, 0, 0, 0) 90%)",
          boxShadow: "inset 15px 15px 40px rgba(255, 255, 255, 0.1), inset -15px -15px 40px rgba(0, 0, 0, 0.5), 0 30px 60px rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          willChange: "transform",
        }}
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 40, -60, 0],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Orb 3: Micro highlight glass bubble */}
      <motion.div
        className="absolute w-[180px] h-[180px] md:w-[250px] md:h-[250px] rounded-full"
        style={{
          top: "55%",
          left: "25%",
          background: "radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.03) 30%, rgba(0, 0, 0, 0) 70%)",
          boxShadow: "inset 8px 8px 20px rgba(255, 255, 255, 0.2), inset -8px -8px 20px rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          willChange: "transform",
        }}
        animate={{
          x: [0, 80, -40, 0],
          y: [0, 60, 50, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
