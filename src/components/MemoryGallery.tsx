import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import type { MemoryItem } from "../config/storyConfig";

type MemoryGalleryProps = {
  memories: MemoryItem[];
};

export function MemoryGallery({ memories }: MemoryGalleryProps) {
  const [activeMemory, setActiveMemory] = useState<MemoryItem | null>(null);

  useEffect(() => {
    if (!activeMemory) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveMemory(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeMemory]);

  return (
    <>
      <div className="memory-grid">
        {memories.map((memory, index) => (
          <motion.button
            className="polaroid"
            initial={{ opacity: 0, y: 60, rotate: index % 2 ? 4 : -4 }}
            key={memory.src}
            onClick={() => setActiveMemory(memory)}
            transition={{ duration: 0.8, delay: index * 0.08 }}
            type="button"
            viewport={{ once: true, amount: 0.35 }}
            whileHover={{ y: -14, rotate: 0, scale: 1.03 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            {memory.type === "video" ? (
              <video muted playsInline poster={memory.poster} src={memory.src} />
            ) : (
              <img alt={memory.title} src={memory.src} />
            )}
            <span>{memory.title}</span>
            <small>{memory.caption}</small>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {activeMemory && (
          <motion.div
            animate={{ opacity: 1 }}
            aria-modal="true"
            className="memory-modal"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={() => setActiveMemory(null)}
            role="dialog"
          >
            <button
              aria-label="Close memory"
              className="modal-close"
              onClick={() => setActiveMemory(null)}
              type="button"
            >
              <X size={20} />
            </button>
            <motion.figure
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 20 }}
              initial={{ scale: 0.96, y: 20 }}
              onClick={(event) => event.stopPropagation()}
              transition={{ duration: 0.35 }}
            >
              {activeMemory.type === "video" ? (
                <video
                  autoPlay
                  controls
                  playsInline
                  poster={activeMemory.poster}
                  src={activeMemory.src}
                />
              ) : (
                <img alt={activeMemory.title} src={activeMemory.src} />
              )}
              <figcaption>
                <strong>{activeMemory.title}</strong>
                <span>{activeMemory.caption}</span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
