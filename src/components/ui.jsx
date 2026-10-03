import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MEDIA } from "../data";

export const ease = [0.22, 1, 0.36, 1];

const MEDIA_STYLE = {
  live: "text-lime-300 border-lime-400/30 bg-lime-400/10",
  video: "text-rose-300 border-rose-400/30 bg-rose-400/10",
  code: "text-slate-200 border-white/20 bg-white/5",
  read: "text-amber-300 border-amber-400/30 bg-amber-400/10",
  shots: "text-sky-300 border-sky-400/30 bg-sky-400/10",
  app: "text-violet-300 border-violet-400/30 bg-violet-400/10",
  private: "text-zinc-400 border-zinc-500/30 bg-stripes",
};

export function MediaTags({ media, size = "sm", className = "" }) {
  if (!media?.length) return null;
  const pad = size === "xs" ? "px-1.5 py-[1px] text-[9.5px]" : "px-2 py-0.5 text-[10.5px]";
  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {media.map((m) => (
        <span
          key={m}
          title={MEDIA[m].label}
          className={`inline-flex items-center gap-1 rounded border font-mono font-semibold tracking-wider ${pad} ${MEDIA_STYLE[m]}`}
        >
          {m === "live" ? <span className="live-dot" /> : <span aria-hidden>{MEDIA[m].icon}</span>}
          {MEDIA[m].short}
        </span>
      ))}
    </div>
  );
}

export function Kicker({ children, color = "text-cyan-300", className = "" }) {
  return (
    <div className={`font-mono text-[11px] font-semibold uppercase tracking-[0.18em] ${color} ${className}`}>
      {children}
    </div>
  );
}

export function SectionHead({ id, eyebrow, title, right }) {
  return (
    <div id={id} className="scroll-mt-24 flex items-end justify-between gap-4 border-t-2 border-white/80 pt-2.5 mb-4">
      <div>
        {eyebrow && <Kicker color="text-slate-400">{eyebrow}</Kicker>}
        <motion.h2
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease }}
          className="font-display text-2xl md:text-3xl font-bold tracking-tight text-white mt-1"
        >
          {title}
        </motion.h2>
      </div>
      {right}
    </div>
  );
}

// ── Generative covers ───────────────────────────────────────────────────────
const PALETTES = [
  ["#22d3ee", "#7c3aed"],
  ["#a78bfa", "#ec4899"],
  ["#bef264", "#06b6d4"],
  ["#fbbf24", "#f43f5e"],
  ["#38bdf8", "#6366f1"],
  ["#34d399", "#0e7490"],
];

function hash(s) {
  let h = 2166136261;
  for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return h >>> 0;
}

function rng(seed) {
  let t = seed;
  return () => {
    t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function Motif({ category, r, c1, c2 }) {
  if (category === "Data Science & ML") {
    return Array.from({ length: 14 }, (_, i) => {
      const bh = 30 + r() * 150;
      return <rect key={i} x={20 + i * 27} y={230 - bh} width="16" height={bh} rx="3" fill={i % 3 ? c1 : c2} opacity={0.25 + r() * 0.6} />;
    });
  }
  if (category === "Full-Stack Web Apps") {
    return Array.from({ length: 9 }, (_, i) => (
      <rect
        key={i}
        x={30 + (i % 3) * 120 + r() * 10}
        y={20 + Math.floor(i / 3) * 72 + r() * 8}
        width={90 + r() * 20}
        height={50}
        rx="10"
        fill="none"
        stroke={i % 2 ? c1 : c2}
        strokeWidth="2"
        opacity={0.3 + r() * 0.6}
      />
    ));
  }
  if (category === "Agentic AI & LLM Tools") {
    const pts = Array.from({ length: 12 }, () => [30 + r() * 340, 20 + r() * 200]);
    return (
      <>
        {pts.map(([x, y], i) =>
          pts.slice(i + 1).filter(([x2, y2]) => Math.hypot(x - x2, y - y2) < 140).map(([x2, y2], j) => (
            <line key={`${i}-${j}`} x1={x} y1={y} x2={x2} y2={y2} stroke={c1} strokeWidth="1.5" opacity="0.5" />
          ))
        )}
        {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={3 + r() * 6} fill={i % 3 ? c1 : c2} />)}
      </>
    );
  }
  return Array.from({ length: 7 }, (_, i) => (
    <circle key={i} cx="300" cy="190" r={30 + i * 32} fill="none" stroke={i % 2 ? c1 : c2} strokeWidth="2" opacity={0.7 - i * 0.08} />
  ));
}

export function Cover({ p, className = "", hoverPlay = true }) {
  const vref = useRef(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const v = vref.current;
    if (!v) return;
    if (hover) v.play().catch(() => {});
    else v.pause();
  }, [hover]);

  const r = rng(hash(p.slug));
  const [c1, c2] = PALETTES[hash(p.slug) % PALETTES.length];
  const initials = p.title.replace(/[^A-Za-z ]/g, "").split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("");

  return (
    <div
      className={`cover relative overflow-hidden bg-[#0b0c14] ${className}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {p.confidential && !p.thumb ? (
        <div className="cover-media absolute inset-0 grid place-items-center bg-gradient-to-br from-slate-800/80 via-[#0d1018] to-cyan-950/60">
          <div className="flex flex-col items-center gap-1 text-slate-400">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <rect x="5" y="11" width="14" height="9" rx="2" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" />
            </svg>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em]">Confidential project</span>
          </div>
        </div>
      ) : p.thumb || p.poster || p.images?.length ? (
        <>
          <img
            src={p.thumb || p.poster || p.images[0]}
            alt=""
            loading="lazy"
            className="cover-media absolute inset-0 h-full w-full object-cover object-top"
          />
          {p.preview && hoverPlay && (
            <video
              ref={vref}
              src={p.preview}
              muted
              loop
              playsInline
              preload="none"
              className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500 ${hover ? "opacity-100" : "opacity-0"}`}
            />
          )}
        </>
      ) : (
        <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" className="cover-media absolute inset-0 h-full w-full">
          <defs>
            <radialGradient id={`g-${p.slug}`} cx="20%" cy="10%" r="100%">
              <stop offset="0%" stopColor={c2} stopOpacity="0.55" />
              <stop offset="60%" stopColor="#0b0c14" stopOpacity="1" />
            </radialGradient>
          </defs>
          <rect width="400" height="240" fill={`url(#g-${p.slug})`} />
          <Motif category={p.category} r={r} c1={c1} c2={c2} />
          <text x="388" y="232" textAnchor="end" fontSize="120" fontFamily="Instrument Serif, serif" fill="white" opacity="0.12">
            {initials}
          </text>
        </svg>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

export function useNow(ms = 1000) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), ms);
    return () => clearInterval(id);
  }, [ms]);
  return now;
}
