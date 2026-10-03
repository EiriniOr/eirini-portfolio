import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { STORIES } from "../data";
import { play, setSound } from "../sound";
import { ease } from "./ui";

const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

const LINES = [
  `portfolio · ${today}`,
  `loading ${STORIES.length} projects`,
  "wiring neural field",
  "eirini ornithopoulou · data scientist",
];

export default function Intro({ onDone }) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const timers = LINES.map((_, i) => setTimeout(() => setShown(i + 1), 220 + i * 300));
    timers.push(setTimeout(onDone, 2900));
    const skip = (e) => {
      if (e.target.closest?.("[data-sound-enter]")) return;
      if (e.type === "keydown") e.preventDefault();
      onDone();
    };
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050508]"
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      initial={{ clipPath: "inset(0 0 0% 0)" }}
      transition={{ duration: 0.9, ease }}
    >
      <div className="w-[min(88vw,26rem)] font-mono text-sm">
        {LINES.slice(0, shown).map((l, i) => (
          <motion.div key={l} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="flex justify-between py-0.5 text-slate-400">
            <span>
              <span className="text-cyan-300">›</span> {l}
            </span>
            <span className={i === LINES.length - 1 ? "text-rose-300" : "text-lime-300"}>{i === LINES.length - 1 ? "ready" : "ok"}</span>
          </motion.div>
        ))}
        <div className="mt-4 h-px overflow-hidden bg-white/10">
          <motion.div className="h-px bg-gradient-to-r from-cyan-300 to-violet-400" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2.6, ease: "linear" }} />
        </div>
      </div>
      <motion.button
        data-sound-enter
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        onClick={async () => {
          await setSound(true);
          play("boot");
          onDone();
        }}
        className="mt-10 rounded-full border border-white/20 px-5 py-2 font-mono text-xs uppercase tracking-widest text-slate-300 transition hover:border-cyan-300/60 hover:text-white"
      >
        🔊 Enter with sound
      </motion.button>
      <span className="mt-3 font-mono text-[10px] uppercase tracking-widest text-slate-600">or press any key to skip</span>
    </motion.div>
  );
}
