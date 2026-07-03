import confetti from "canvas-confetti";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { MemoryGallery } from "./components/MemoryGallery";
import { MusicControl } from "./components/MusicControl";
import { Particles } from "./components/Particles";
import { TypewriterText } from "./components/TypewriterText";
import { storyConfig } from "./config/storyConfig";

const sceneVariants = {
  center: {
    opacity: 1,
    scale: 1,
    x: 0,
  },
  enter: (direction: number) => ({
    opacity: 0,
    scale: 1.03,
    x: direction > 0 ? 70 : -70,
  }),
  exit: (direction: number) => ({
    opacity: 0,
    scale: 1.03,
    x: direction > 0 ? -70 : 70,
  }),
};

const sceneDurations = [
  6200, 7200, 6200, 7000, 7600, 7000, 9500, 7600, 7800, 12000,
];

function buildJulyDays(year: number) {
  const firstDay = new Date(year, 6, 1).getDay();
  const blanks = Array.from({ length: firstDay }, () => null);
  const days = Array.from({ length: 31 }, (_, index) => index + 1);
  return [...blanks, ...days];
}

function CalendarGate({ onOpen }: { onOpen: () => void }) {
  const { birthday } = storyConfig;
  const julyDays = useMemo(() => buildJulyDays(birthday.year), [birthday.year]);

  return (
    <section className="calendar-stage" aria-labelledby="calendar-title">
      <div className="calendar-intro">
        <p className="eyebrow">A birthday story unlocks on</p>
        <h1 id="calendar-title">
          July <span>04</span>
        </h1>
        <p>
          Find the glowing date and tap it. The birthday wish opens from there.
        </p>
        <div className="birthday-badge" aria-hidden="true">
          <strong>04</strong>
          <span>July</span>
        </div>
      </div>

      <div className="calendar-shell">
        <div className="calendar-top">
          <span>{birthday.month}</span>
          <strong>{birthday.year}</strong>
        </div>

        <div className="week-row" aria-hidden="true">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>

        <div className="date-grid">
          {julyDays.map((day, index) =>
            day ? (
              <button
                aria-label={
                  day === birthday.day
                    ? `Open birthday wish for July ${day}`
                    : `July ${day}`
                }
                className={day === birthday.day ? "date is-birthday" : "date"}
                key={day}
                onClick={() => day === birthday.day && onOpen()}
                type="button"
              >
                <span>{day}</span>
                {day === birthday.day && <small>Open</small>}
              </button>
            ) : (
              <span className="date is-empty" key={`blank-${index}`} />
            ),
          )}
        </div>
      </div>
    </section>
  );
}

function ImageScene({
  eyebrow,
  image,
  title,
  children,
  align = "left",
}: {
  eyebrow?: string;
  image: string;
  title: string;
  children: React.ReactNode;
  align?: "left" | "right" | "center";
}) {
  return (
    <section className={`story-section image-scene align-${align}`}>
      <div className="parallax-media">
        <img alt="" className="scene-backdrop" src={image} />
        <img alt="" className="scene-portrait" src={image} />
      </div>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="scene-copy glass-panel"
        initial={{ opacity: 0, y: 54 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
        <div className="scene-text">{children}</div>
      </motion.div>
    </section>
  );
}

function TextReveal({
  lines,
  title,
}: {
  title?: string;
  lines: string[];
}) {
  return (
    <section className="story-section text-reveal">
      <div>
        {title && <p className="eyebrow">{title}</p>}
        {lines.map((line, index) => (
          <motion.h2
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            key={line}
            transition={{ duration: 0.75, delay: index * 0.18 }}
          >
            {line}
          </motion.h2>
        ))}
      </div>
    </section>
  );
}

function OneConversation() {
  return (
    <section className="story-section conversation-section">
      <div className="conversation-copy">
        <p className="eyebrow">One Conversation</p>
        <TypewriterText
          className="conversation-type"
          lines={["Funny how", "one conversation", "can change everything."]}
          speed={36}
        />
      </div>
      <div className="chat-stack" aria-hidden="true">
        {["Hey.", "You coming?", "Of course.", "That changed everything."].map(
          (message, index) => (
            <motion.span
              animate={{ opacity: 1, x: 0, y: 0 }}
              className={index % 2 ? "reply" : ""}
              initial={{ opacity: 0, x: index % 2 ? 40 : -40, y: 24 }}
              key={message}
              transition={{ duration: 0.65, delay: index * 0.24 }}
            >
              {message}
            </motion.span>
          ),
        )}
      </div>
    </section>
  );
}

function FinalReveal({ isActive }: { isActive: boolean }) {
  const firedRef = useRef(false);

  useEffect(() => {
    if (!isActive || firedRef.current) return;
    firedRef.current = true;

    const audioContext = new window.AudioContext();
    const beat = (time: number) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.frequency.setValueAtTime(72, time);
      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.exponentialRampToValueAtTime(0.42, time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.18);
      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.start(time);
      osc.stop(time + 0.2);
    };

    const now = audioContext.currentTime + 0.08;
    beat(now);
    beat(now + 0.34);
    beat(now + 1.1);
    beat(now + 1.44);

    const bursts = [0, 450, 950, 1450].map((delay) =>
      window.setTimeout(() => {
        confetti({
          colors: ["#f8d776", "#ffffff", "#9de0d2", "#ff7a90"],
          gravity: 0.78,
          origin: { y: 0.62 },
          particleCount: 90,
          spread: 78,
          startVelocity: 38,
        });
      }, delay),
    );

    return () => {
      bursts.forEach(window.clearTimeout);
      audioContext.close().catch(() => undefined);
    };
  }, [isActive]);

  return (
    <section className="final-reveal">
      <motion.div
        animate={{ opacity: 0, pointerEvents: "none" }}
        className="final-blackout"
        initial={{ opacity: 1 }}
        transition={{ duration: 1.8, delay: 5.4 }}
      >
        <TypewriterText
          className="final-typing"
          delay={760}
          lines={[
            "This story...",
            "...was never just about you.",
            "It was always about us.",
          ]}
          speed={46}
        />
      </motion.div>

      <div className="final-image-wrap">
        <img alt="Final memory together" src={storyConfig.images.finalTogether} />
      </div>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="final-message"
        initial={{ opacity: 0, y: 60 }}
        transition={{ duration: 1.2, delay: 6.2 }}
      >
        <p className="eyebrow">Happy Birthday</p>
        <h2>My Brother ❤️</h2>
        <p>
          From strangers...
          <br />
          to someone I knew...
          <br />
          to one conversation...
          <br />
          to someone I trusted...
          <br />
          to countless memories...
          <br />
          to my brother from another mother.
        </p>
        <small>Thank you for choosing to stay in my life.</small>
      </motion.div>
    </section>
  );
}

function StoryExperience({ onBack }: { onBack: () => void }) {
  const [activeScene, setActiveScene] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [sceneProgress, setSceneProgress] = useState(0);
  const wheelLockRef = useRef(false);
  const touchStartRef = useRef<number | null>(null);

  const scenes = useMemo(
    () => [
      {
        label: "Intro",
        content: (
          <section className="intro-film">
            <TypewriterText className="intro-type" lines={storyConfig.intro} />
          </section>
        ),
      },
      {
        label: "College",
        content: (
          <ImageScene
            align="left"
            image={storyConfig.images.college}
            title="It all started here."
          >
            <p>
              Among hundreds of faces...
              <br />
              there was one I never imagined
              <br />
              would become one of the most important people in my life.
            </p>
          </ImageScene>
        ),
      },
      {
        label: "Stranger",
        content: (
          <ImageScene
            align="right"
            eyebrow="A Stranger"
            image={storyConfig.images.stranger}
            title="A Stranger"
          >
            <p>
              Just another person
              <br />
              walking through the same campus.
              <br />
              <br />
              Nothing more.
            </p>
          </ImageScene>
        ),
      },
      {
        label: "Known",
        content: (
          <ImageScene
            align="left"
            image={storyConfig.images.familiar}
            title="Someone I Knew"
          >
            <p>
              You slowly became
              <br />
              a familiar face.
              <br />
              <br />
              A familiar smile.
              <br />
              <br />
              Someone I started noticing.
            </p>
          </ImageScene>
        ),
      },
      {
        label: "Conversation",
        content: <OneConversation />,
      },
      {
        label: "Trust",
        content: (
          <ImageScene
            align="right"
            image={storyConfig.images.trusted}
            title="Someone I Trusted"
          >
            <p>
              You became
              <br />
              someone I could rely on.
              <br />
              <br />
              Someone I could always count on.
            </p>
          </ImageScene>
        ),
      },
      {
        label: "Memories",
        content: (
          <section className="story-section gallery-section">
            <div className="section-kicker">
              <p className="eyebrow">Many Memories</p>
              <h2>Little frames. Big proof.</h2>
            </div>
            <MemoryGallery memories={storyConfig.memories} />
          </section>
        ),
      },
      {
        label: "Losing",
        content: (
          <ImageScene
            align="center"
            image={storyConfig.images.losing}
            title="Someone I Couldn't Imagine Losing"
          >
            <p>
              Without realizing it...
              <br />
              <br />
              you became
              <br />
              someone I couldn't imagine
              <br />
              my life without.
            </p>
          </ImageScene>
        ),
      },
      {
        label: "Brother",
        content: (
          <TextReveal
            lines={[
              "People say...",
              "Family is by blood.",
              "Life proved otherwise.",
              "You became...",
              "My Brother.",
            ]}
            title="Unbreakable Bond"
          />
        ),
      },
      {
        label: "Final",
        content: <FinalReveal isActive={activeScene === 9} />,
      },
    ],
    [activeScene],
  );

  const goToScene = (index: number) => {
    const nextScene = Math.max(0, Math.min(index, scenes.length - 1));
    if (nextScene === activeScene) return;
    setDirection(nextScene > activeScene ? 1 : -1);
    setActiveScene(nextScene);
    setSceneProgress(0);
  };

  const goNext = () => goToScene(activeScene + 1);
  const goPrevious = () => goToScene(activeScene - 1);

  useEffect(() => {
    setSceneProgress(0);
    if (!isAutoPlaying) return;

    if (activeScene === scenes.length - 1) {
      setIsAutoPlaying(false);
      return;
    }

    const duration = sceneDurations[activeScene] ?? 7000;
    const startedAt = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      setSceneProgress(progress);

      if (progress >= 1) {
        goToScene(activeScene + 1);
        return;
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [activeScene, isAutoPlaying, scenes.length]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (["ArrowRight", "ArrowDown", " "].includes(event.key)) {
        event.preventDefault();
        setIsAutoPlaying(false);
        goNext();
      }

      if (["ArrowLeft", "ArrowUp"].includes(event.key)) {
        event.preventDefault();
        setIsAutoPlaying(false);
        goPrevious();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  const onWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (Math.abs(event.deltaY) < 18 || wheelLockRef.current) return;
    setIsAutoPlaying(false);
    wheelLockRef.current = true;
    if (event.deltaY > 0) {
      goNext();
    } else {
      goPrevious();
    }
    window.setTimeout(() => {
      wheelLockRef.current = false;
    }, 850);
  };

  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartRef.current = event.touches[0].clientY;
  };

  const onTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartRef.current === null) return;
    const delta = touchStartRef.current - event.changedTouches[0].clientY;
    touchStartRef.current = null;
    if (Math.abs(delta) < 42) return;
    setIsAutoPlaying(false);
    if (delta > 0) {
      goNext();
    } else {
      goPrevious();
    }
  };

  return (
    <div className="story-app story-deck" onTouchEnd={onTouchEnd} onTouchStart={onTouchStart} onWheel={onWheel}>
      <Particles />
      <MusicControl src={storyConfig.audio.backgroundSrc} />
      <button className="floating-control back-control" onClick={onBack} type="button">
        July
      </button>

      <div className="scene-progress" aria-label="Story progress">
        <span>{String(activeScene + 1).padStart(2, "0")}</span>
        <i
          style={
            {
              "--progress": `${((activeScene + 1) / scenes.length) * 100}%`,
              "--scene-progress": `${sceneProgress * 100}%`,
            } as React.CSSProperties
          }
        >
          <b />
        </i>
        <span>{String(scenes.length).padStart(2, "0")}</span>
      </div>

      <div className="scene-dots" aria-label="Choose scene">
        {scenes.map((scene, index) => (
          <button
            aria-current={activeScene === index ? "step" : undefined}
            aria-label={`Go to ${scene.label}`}
            className={activeScene === index ? "active" : ""}
            key={scene.label}
            onClick={() => {
              setIsAutoPlaying(false);
              goToScene(index);
            }}
            title={scene.label}
            type="button"
          >
            <span>{scene.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          animate="center"
          className="scene-frame"
          custom={direction}
          exit="exit"
          initial="enter"
          key={activeScene}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          variants={sceneVariants}
        >
          {scenes[activeScene].content}
        </motion.div>
      </AnimatePresence>

      <div className="scene-controls">
        <button
          aria-label="Previous scene"
          disabled={activeScene === 0}
          onClick={() => {
            setIsAutoPlaying(false);
            goPrevious();
          }}
          type="button"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          aria-label={isAutoPlaying ? "Pause cinematic autoplay" : "Play cinematic autoplay"}
          className="auto-toggle"
          onClick={() => setIsAutoPlaying((value) => !value)}
          type="button"
        >
          {isAutoPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <span>{scenes[activeScene].label}</span>
        <button
          aria-label="Next scene"
          disabled={activeScene === scenes.length - 1}
          onClick={() => {
            setIsAutoPlaying(false);
            goNext();
          }}
          type="button"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className={isOpen ? "birthday-app is-open" : "birthday-app"}>
      <div className="ambient-grid" />
      {!isOpen ? (
        <CalendarGate onOpen={() => setIsOpen(true)} />
      ) : (
        <StoryExperience onBack={() => setIsOpen(false)} />
      )}
    </main>
  );
}

export default App;
