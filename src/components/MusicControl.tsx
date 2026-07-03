import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type MusicControlProps = {
  src: string;
};

export function MusicControl({ src }: MusicControlProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (!src) return;

    const start = () => {
      setEnabled(true);
      if (audioRef.current) {
        audioRef.current.volume = 0.42;
        audioRef.current.play().catch(() => undefined);
      }
    };

    window.addEventListener("pointerdown", start, { once: true });
    window.addEventListener("keydown", start, { once: true });

    return () => {
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
    };
  }, [src]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = muted;
    }
  }, [muted]);

  if (!src) {
    return null;
  }

  return (
    <>
      <audio loop preload="auto" ref={audioRef} src={src} />
      <button
        aria-label={muted ? "Unmute music" : "Mute music"}
        className="floating-control music-control"
        onClick={() => setMuted((value) => !value)}
        title={enabled ? "Music" : "Tap anywhere to enable music"}
        type="button"
      >
        {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
    </>
  );
}
