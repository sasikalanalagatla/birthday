import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type TypewriterTextProps = {
  lines: string[];
  className?: string;
  delay?: number;
  speed?: number;
};

export function TypewriterText({
  lines,
  className,
  delay = 450,
  speed = 42,
}: TypewriterTextProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const [visible, setVisible] = useState("");
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    setLineIndex(0);
    setVisible("");
    setComplete(false);
  }, [lines]);

  useEffect(() => {
    if (lineIndex >= lines.length) {
      setComplete(true);
      return;
    }

    const current = lines[lineIndex];
    if (visible.length < current.length) {
      const timer = window.setTimeout(() => {
        setVisible(current.slice(0, visible.length + 1));
      }, speed);
      return () => window.clearTimeout(timer);
    }

    const timer = window.setTimeout(() => {
      setLineIndex((index) => index + 1);
      setVisible("");
    }, delay + current.length * 14);

    return () => window.clearTimeout(timer);
  }, [delay, lineIndex, lines, speed, visible]);

  return (
    <div className={className}>
      {lines.slice(0, lineIndex).map((line) => (
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 12 }}
          key={line}
          transition={{ duration: 0.6 }}
        >
          {line}
        </motion.p>
      ))}
      {!complete && (
        <p>
          {visible}
          <span className="type-cursor" />
        </p>
      )}
    </div>
  );
}
