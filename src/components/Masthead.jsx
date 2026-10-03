import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROFILE, STORIES } from "../data";
import { setAmbient, setSound, useSound, play } from "../sound";
import { ease } from "./ui";

export const NAV = [
  ["now", "Now"],
  ["featured", "Featured"],
  ["archive", "Projects"],
  ["stack", "Stack"],
  ["education", "Education"],
  ["contact", "Contact"],
];

const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);

function SoundToggle() {
  const { enabled, ambient } = useSound();
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => setSound(!enabled)}
        aria-pressed={enabled}
        aria-label={enabled ? "Turn sound off" : "Turn sound on"}
        className={`group flex items-center gap-2 rounded-full border px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider transition-colors ${
          enabled ? "border-cyan-300/50 bg-cyan-300/10 text-cyan-200" : "border-white/15 text-slate-400 hover:text-white hover:border-white/40"
        }`}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
          <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor" />
          {!enabled && <path d="M22 9l-6 6M16 9l6 6" />}
        </svg>
        <span className={`h-3 items-end gap-[2px] ${enabled ? "flex" : "hidden"}`} aria-hidden>
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className={`w-[2px] rounded-full bg-current ${enabled ? "eq-bar" : ""}`} style={{ height: enabled ? undefined : 3, animationDelay: `${i * 0.13}s` }} />
          ))}
        </span>
        <span className="hidden sm:inline">{enabled ? "Sound on" : "Sound off"}</span>
      </button>
      <AnimatePresence>
        {enabled && (
          <motion.button
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            onClick={() => { setAmbient(!ambient); play("click"); }}
            aria-pressed={ambient}
            title={ambient ? "Mute ambient music" : "Play ambient music"}
            className={`overflow-hidden whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider ${
              ambient ? "border-violet-300/50 bg-violet-300/10 text-violet-200" : "border-white/15 text-slate-500"
            }`}
          >
            ♪ {ambient ? "Ambient" : "Muted"}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export function TopBar({ onSearch }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 260);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#07070c]/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 md:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <AnimatePresence initial={false}>
            {scrolled && (
              <motion.a
                href="#top"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease }}
                className="font-serif text-xl italic leading-none text-white"
              >
                Eirini O.
              </motion.a>
            )}
          </AnimatePresence>
        </div>

        <nav className={`hidden items-center gap-5 text-sm lg:flex transition-opacity duration-300 ${scrolled ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
          {NAV.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="nav-link text-slate-300 hover:text-white">
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={onSearch}
            className="flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-xs text-slate-400 transition-colors hover:border-white/40 hover:text-white"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
            <span className="hidden sm:inline">Search</span>
            <kbd className="rounded bg-white/10 px-1.5 font-mono text-[10px]">{isMac ? "⌘K" : "Ctrl K"}</kbd>
          </button>
          <SoundToggle />
        </div>
      </div>
    </header>
  );
}

const NAME = "Eirini Ornithopoulou";

export function Wordmark({ ready }) {
  const liveCount = STORIES.filter((s) => s.media.includes("live")).length;
  return (
    <section id="top" className="mx-auto max-w-7xl px-4 pt-6 md:px-8 md:pt-8">
      <div className="flex flex-wrap items-end justify-end gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">
        <span>
          {STORIES.length} projects · {liveCount} live demos
        </span>
      </div>
      <h1 aria-label={`${NAME}, my portfolio`} className="mt-2 font-serif text-[12vw] leading-[0.9] tracking-[-0.02em] text-white md:text-[6.6vw] xl:text-[92px]">
        {NAME.split("").map((ch, i) => (
          <motion.span
            key={i}
            aria-hidden
            className="inline-block"
            initial={{ y: "0.6em", opacity: 0, filter: "blur(10px)" }}
            animate={ready ? { y: 0, opacity: 1, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.9, ease, delay: 0.1 + i * 0.03 }}
          >
            {ch === " " ? " " : ch}
          </motion.span>
        ))}
        <motion.span
          className="ml-3 align-top font-mono text-[11px] tracking-[0.2em] text-cyan-300 md:text-sm"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 }}
        >
          PH.D.
        </motion.span>
        <motion.span
          aria-hidden
          className="relative z-20 ml-4 inline-block -translate-y-[0.2em] -rotate-6 whitespace-nowrap px-2 py-1 align-top font-script text-[0.55em] leading-none md:text-[0.5em] text-cyan-200 md:ml-6"
          initial={{ clipPath: "inset(-40% 100% -40% -10%)", opacity: 0 }}
          animate={ready ? { clipPath: "inset(-40% -10% -40% -10%)", opacity: 1 } : {}}
          transition={{ duration: 1.1, ease: "easeInOut", delay: 1 }}
        >
          My portfolio
        </motion.span>
      </h1>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={ready ? { scaleX: 1 } : {}}
        transition={{ duration: 1.1, ease, delay: 0.4 }}
        className="mt-3 h-[2px] origin-left bg-white"
      />
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-2 flex flex-wrap items-center justify-between gap-3 border-b border-white/15 pb-2"
      >
        <p className="text-sm text-slate-300 md:text-base">{PROFILE.title}</p>
        <nav className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
          {NAV.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="nav-link text-slate-400 hover:text-white">
              {label}
            </a>
          ))}
        </nav>
      </motion.div>
    </section>
  );
}
