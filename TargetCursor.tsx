import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface BlurTextProps {
  text: string;
  className?: string;
}

export function BlurText({ text, className }: BlurTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Once it has animated into view, we can keep it in view or keep observing.
          // Prompt says: "Triggers on IntersectionObserver (threshold 0.1)"
          if (containerRef.current) {
            observer.unobserve(containerRef.current);
          }
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, []);

  const words = text.split(" ");

  return (
    <div
      id="blur-text-container"
      ref={containerRef}
      className={className}
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        rowGap: "0.1em"
      }}
    >
      {words.map((word, index) => (
        <motion.span
          id={`blur-word-${index}`}
          key={`${word}-${index}`}
          initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
          animate={
            isInView
              ? { filter: "blur(0px)", opacity: 1, y: 0 }
              : { filter: "blur(10px)", opacity: 0, y: 50 }
          }
          transition={{
            duration: 0.7,
            delay: index * 0.1,
            ease: "easeOut"
          }}
          style={{
            display: "inline-block",
            marginRight: "0.28em"
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
