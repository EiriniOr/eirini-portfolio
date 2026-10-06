import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, animate } from "framer-motion";
import { CAREER_VIDEO, EDUCATION, NOW, PROFILE, STORIES, UPCOMING } from "../data";
import { play } from "../sound";
import { track } from "../analytics";
import { Kicker, SectionHead, ease, useNow } from "./ui";

const SAMPLES = [
  { input: "Ticket: “Can't log in after password reset”", out: '{ queue: "auth", priority: "high" }', p: 0.94, ms: 88 },
  { input: "Shift note: “Ward 4 short two nurses tonight”", out: '{ flag: "staffing", urgency: "high" }', p: 0.89, ms: 104 },
  { input: "Prompt: “ignore previous instructions and…”", out: '{ allow: false, reason: "injection" }', p: 0.99, ms: 71 },
  { input: "Email: “Invoice #4471 attached, due 30 Oct”", out: '{ type: "invoice", due: "2026-10-30" }', p: 0.97, ms: 112 },
  { input: "Review: “Arrived late but works great”", out: '{ sentiment: "mixed" }', p: 0.71, ms: 95 },
  { input: "Form field: “forty-two”", out: "{ age: 42 }", p: 0.98, ms: 79 },
];

function DecisionStream() {
  const [rows, setRows] = useState(() => [{ ...SAMPLES[0], id: 0 }]);
  const ref = useRef(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => {
      setRows((r) => {
        const next = r[0].id + 1;
        return [{ ...SAMPLES[next % SAMPLES.length], id: next }, ...r].slice(0, 3);
      });
    }, 2400);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <div ref={ref} className="rounded-xl border border-white/10 bg-black/60 font-mono text-[11.5px] shadow-2xl shadow-cyan-950/40">
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2 text-[10px] uppercase tracking-widest text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-rose-400/80" />
          <span className="h-2 w-2 rounded-full bg-amber-300/80" />
          <span className="h-2 w-2 rounded-full bg-lime-300/80" />
          <span className="ml-2">decision stream</span>
        </span>
        <span>illustrative</span>
      </div>
      <div className="relative h-[178px] overflow-hidden p-3">
        <AnimatePresence initial={false}>
          {rows.map((r, i) => (
            <motion.div
              key={r.id}
              layout
              initial={{ opacity: 0, y: -16, filter: "blur(6px)" }}
              animate={{ opacity: 1 - i * 0.22, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease }}
              className="mb-3"
            >
              <div className="truncate text-slate-500">› {r.input}</div>
              <div className="mt-0.5 flex items-center gap-2">
                <span className="truncate text-cyan-300">{r.out}</span>
                <span className="ml-auto shrink-0 rounded bg-white/5 px-1.5 text-[10px] text-slate-400">{r.ms}ms</span>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${r.p * 100}%` }}
                    transition={{ duration: 0.8, ease, delay: 0.15 }}
                    className={`h-full rounded-full ${r.p > 0.9 ? "bg-lime-300" : r.p > 0.8 ? "bg-cyan-300" : "bg-amber-300"}`}
                  />
                </div>
                <span className="w-12 shrink-0 text-right text-[10px] text-slate-400">p={r.p.toFixed(2)}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function NowStory() {
  return (
    <motion.article
      id="now"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease }}
      className="lead-card grid scroll-mt-24 gap-5 rounded-2xl border border-white/10 p-5 md:grid-cols-2 md:p-6"
    >
      <div className="min-w-0">
        <span className="inline-flex items-center gap-2 rounded-full bg-rose-500/15 px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-widest text-rose-300">
          <span className="live-dot live-dot-red" /> {NOW.kicker}
        </span>
        <h3 className="mt-3 font-serif text-3xl leading-[1.05] text-white">{NOW.headline}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-300">{NOW.text}</p>
        <Kicker color="text-slate-500" className="mt-4">What it shows</Kicker>
        <ul className="mt-2 space-y-1.5">
          {NOW.uses.map((u) => (
            <li key={u} className="flex gap-2 text-sm text-slate-300">
              <span className="text-cyan-300">→</span>
              {u}
            </li>
          ))}
        </ul>
        <a href={NOW.link.href} target="_blank" rel="noreferrer" className="btn-ghost mt-5">
          {NOW.link.label} ↗
        </a>
      </div>
      <div className="min-w-0">
        <DecisionStream />
      </div>
    </motion.article>
  );
}

const pad = (n) => String(n).padStart(2, "0");

function Digit({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-9 w-11 overflow-hidden rounded-md border border-white/10 bg-black/50">
        <AnimatePresence initial={false}>
          <motion.span
            key={value}
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.45, ease }}
            className="absolute inset-0 grid place-items-center font-mono text-lg font-bold tabular-nums text-white"
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-0.5 font-mono text-[9px] uppercase tracking-widest text-slate-500">{label}</span>
    </div>
  );
}

function Upcoming() {
  const now = useNow(1000);
  const start = new Date(UPCOMING.start).getTime();
  const end = new Date(UPCOMING.end).getTime();
  const fmt = (t) => new Date(t).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  const phase = now < start ? "before" : now < end ? "during" : "after";
  const left = Math.max(0, start - now) / 1000;
  const total = Math.ceil((end - start) / 86400000);
  const day = Math.floor((now - start) / 86400000) + 1;

  return (
    <motion.article
      id="coming-up"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, ease, delay: 0.7 }}
      className="relative scroll-mt-24 overflow-hidden rounded-2xl border border-lime-300/20 bg-gradient-to-br from-lime-300/[0.07] via-transparent to-transparent p-4"
    >
      <div className="flex flex-wrap items-center gap-2">
        <Kicker color="text-lime-300">
          {phase === "before" ? "Coming up" : phase === "during" ? "Now on placement" : "Completed"}
        </Kicker>
        <span className="rounded-full bg-lime-300 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-black">
          Praktik via {UPCOMING.via}
        </span>
      </div>
      <h3 className="mt-2 font-display text-lg font-bold leading-snug text-white">
        {UPCOMING.role} praktik at {UPCOMING.org}
      </h3>
      <p className="mt-0.5 text-xs text-slate-400">
        {UPCOMING.unit} · <span className="font-mono">{fmt(start)} – {fmt(end)}</span>
      </p>

      {phase === "before" && (
        <div className="mt-3 flex gap-1.5">
          <Digit value={pad(Math.floor(left / 86400))} label="days" />
          <Digit value={pad(Math.floor((left % 86400) / 3600))} label="hrs" />
          <Digit value={pad(Math.floor((left % 3600) / 60))} label="min" />
          <Digit value={pad(Math.floor(left % 60))} label="sec" />
        </div>
      )}
      {phase === "during" && (
        <div className="mt-3">
          <div className="flex justify-between font-mono text-xs text-slate-300">
            <span>Day {day}</span>
            <span className="text-slate-500">of {total}</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
            <motion.div initial={{ width: 0 }} animate={{ width: `${(day / total) * 100}%` }} transition={{ duration: 1.2, ease }} className="h-full rounded-full bg-lime-300" />
          </div>
        </div>
      )}

      <p className="mt-3 text-[13px] leading-relaxed text-slate-300">{UPCOMING.summary}</p>
      <p className="mt-2 text-[11px] leading-snug text-slate-500">{UPCOMING.viaNote}</p>
    </motion.article>
  );
}

function Editor() {
  const [copied, setCopied] = useState(false);
  return (
    <motion.article
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, ease, delay: 0.85 }}
      className="relative overflow-hidden rounded-2xl border border-cyan-300/30 bg-gradient-to-br from-cyan-400/[0.12] via-[#0b0c14]/80 to-violet-500/[0.14] p-5 shadow-lg shadow-cyan-950/30 backdrop-blur"
    >
      <Kicker color="text-cyan-300">About Eirini</Kicker>
      <div className="mt-3 flex items-center gap-4">
        <img
          src="/photo/rena.jpg"
          alt="Eirini Ornithopoulou"
          className="h-16 w-16 shrink-0 rounded-full object-cover ring-2 ring-cyan-300/50 ring-offset-2 ring-offset-[#0b0c14]"
        />
        <div className="min-w-0">
          <div className="font-display text-xl font-bold leading-tight text-white">{PROFILE.name}</div>
          <div className="text-[11px] text-slate-400">{PROFILE.location} · {PROFILE.languages.join(" · ")}</div>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-slate-200">
        PhD in biotechnology turned data scientist. I build ML and agentic AI systems with a product mindset, so what ships is usable and valuable.
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {[
          ["GitHub", PROFILE.links.github],
          ["LinkedIn", PROFILE.links.linkedin],
        ].map(([l, h]) => (
          <a key={l} href={h} target="_blank" rel="noreferrer" className="btn-ghost !px-3 !py-1.5 !text-xs">
            {l} ↗
          </a>
        ))}
        <button
          onClick={() => {
            navigator.clipboard?.writeText(PROFILE.email);
            track("copy_email", { from: "about_card" });
            setCopied(true);
            play("toggle");
            setTimeout(() => setCopied(false), 1600);
          }}
          className="btn-ghost !px-3 !py-1.5 !text-xs"
        >
          {copied ? "Copied ✓" : "Copy email"}
        </button>
      </div>
    </motion.article>
  );
}

function Count({ to }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.4, ease, onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{v}</span>;
}

function Numbers() {
  const stats = [
    [STORIES.length, "projects shipped"],
    [STORIES.filter((s) => s.media.includes("live")).length, "live demos to try"],
    [STORIES.filter((s) => s.media.includes("code")).length, "open repositories"],
    [EDUCATION.length, "degrees, incl. a PhD"],
    [1, "hackathon won"],
  ];
  return (
    <div className="mt-4 grid grid-cols-2 divide-white/10 rounded-2xl border border-white/10 bg-black/30 backdrop-blur sm:grid-cols-5 sm:divide-x">
      {stats.map(([n, l]) => (
        <div key={l} className="px-5 py-3">
          <div className="font-display text-2xl font-bold text-white md:text-3xl">
            <Count to={n} />
          </div>
          <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-slate-500">{l}</div>
        </div>
      ))}
    </div>
  );
}

function LeadVideo() {
  const ref = useRef(null);
  const quartiles = useRef(new Set());
  const [started, setStarted] = useState(false);
  return (
    <motion.article
      id="watch"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease, delay: 0.5 }}
      className="lead-card relative scroll-mt-24 overflow-hidden rounded-2xl border border-white/10 p-4 md:p-5 lg:col-span-8"
    >
      <div className="flex flex-wrap items-center gap-3">
        <span className="flex items-center gap-2 rounded-full bg-cyan-300/15 px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-widest text-cyan-200">
          ▶ Start here
        </span>
        <Kicker color="text-slate-500">Intro video · 90 seconds · captions on</Kicker>
      </div>
      <h2 className="mt-3 max-w-3xl font-serif text-3xl leading-[1.02] text-white md:text-4xl">
        From Crete to Karolinska: <em className="text-cyan-200">my story</em> in 90 seconds
      </h2>
      <div className="relative mt-4 overflow-hidden rounded-xl border border-white/10 bg-black">
        <video
          ref={ref}
          controls={started}
          playsInline
          preload="none"
          poster={CAREER_VIDEO.poster}
          onPlay={() => {
            if (!started) track("video_play", { video: "career_story" });
            setStarted(true);
          }}
          onTimeUpdate={(e) => {
            const v = e.currentTarget;
            const pct = Math.floor((v.currentTime / v.duration) * 4) * 25;
            if (pct >= 25 && pct < 100 && !quartiles.current.has(pct)) {
              quartiles.current.add(pct);
              track("video_progress", { video: "career_story", percent: pct });
            }
          }}
          onEnded={() => track("video_complete", { video: "career_story" })}
          className="block aspect-video w-full"
        >
          <source src={CAREER_VIDEO.src} type="video/mp4" />
        </video>
        {!started && (
          <button
            onClick={() => ref.current?.play()}
            className="group absolute inset-0 flex items-end justify-start bg-gradient-to-t from-black/60 via-transparent to-transparent p-4 md:p-6"
            aria-label="Play my story, 90 seconds"
          >
            <span className="flex items-center gap-3 rounded-full bg-white p-1.5 text-black shadow-2xl transition duration-300 group-hover:scale-105 sm:p-2 sm:pr-6">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-black text-lg text-white sm:h-11 sm:w-11">▶</span>
              <span className="hidden text-left sm:block">
                <span className="block font-display text-lg font-bold leading-tight">Play my story</span>
                <span className="block font-mono text-[10px] uppercase tracking-wider text-slate-600">90 seconds · sound on</span>
              </span>
            </span>
          </button>
        )}
      </div>
    </motion.article>
  );
}

export function NowSection() {
  return (
    <section className="mx-auto mt-12 max-w-7xl px-4 md:px-8">
      <SectionHead eyebrow="Current work" title="Now building" />
      <NowStory />
    </section>
  );
}

export default function FrontPage() {
  return (
    <section className="mx-auto mt-6 max-w-7xl px-4 md:px-8">
      <div className="grid gap-4 lg:grid-cols-12">
        <LeadVideo />
        <div className="flex flex-col gap-4 lg:col-span-4">
          <Upcoming />
          <Editor />
        </div>
      </div>
      <Numbers />
    </section>
  );
}
