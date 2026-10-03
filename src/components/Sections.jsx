import { useState } from "react";
import { motion } from "framer-motion";
import { CERTS, EDUCATION, PROFILE, SKILL_GROUPS } from "../data";
import { play } from "../sound";
import { Kicker, SectionHead, ease } from "./ui";

export function Stack() {
  return (
    <section className="mx-auto mt-12 max-w-7xl px-4 md:px-8">
      <SectionHead id="stack" eyebrow="Tools of the trade" title="The Stack" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease }}
        className="overflow-hidden rounded-2xl border border-white/10 bg-black/60 font-mono backdrop-blur"
      >
        <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-lime-300/80" />
          <span className="ml-3 text-[11px] text-slate-500">~/eirini — stack.json</span>
        </div>
        <div className="grid gap-px bg-white/10 md:grid-cols-2">
          {SKILL_GROUPS.map((g, gi) => (
            <div key={g.label} className="bg-[#08090f] p-4">
              <div className="text-xs text-slate-500">
                <span className="text-violet-300">"{g.label}"</span>: [
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5 pl-3">
                {g.items.map((s, i) => (
                  <motion.span
                    key={s}
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: gi * 0.1 + i * 0.035 }}
                    className="cursor-default rounded border border-cyan-300/15 bg-cyan-300/5 px-2 py-1 text-xs text-cyan-100 transition-colors hover:border-cyan-300/60 hover:bg-cyan-300/15"
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
              <div className="mt-2 text-xs text-slate-500">]</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

const yearsOf = (s) => {
  const ys = (s.match(/\d{4}/g) || []).map(Number);
  return [ys[0], ys[ys.length - 1]];
};

export function Education() {
  const rows = EDUCATION.map((e) => ({ ...e, span: yearsOf(e.years), ongoing: /ongoing/i.test(e.years) }));
  const min = Math.min(...rows.map((r) => r.span[0]));
  const max = Math.max(...rows.map((r) => r.span[1]));
  const pos = (y) => ((y - min) / (max - min)) * 100;
  const ticks = [];
  for (let y = min; y <= max; y += 3) ticks.push(y);

  return (
    <section className="mx-auto mt-12 max-w-7xl px-4 md:px-8">
      <SectionHead id="education" eyebrow="Timeline" title="Education" />
      <div className="rounded-2xl border border-white/10 bg-black/30 p-4 backdrop-blur md:p-6">
        <div className="relative ml-0 hidden h-5 md:ml-[38%] md:block">
          {ticks.map((y) => (
            <span key={y} className="absolute -translate-x-1/2 font-mono text-[10px] text-slate-600" style={{ left: `${pos(y)}%` }}>
              {y}
            </span>
          ))}
        </div>
        <ol className="space-y-3">
          {rows.map((e, i) => (
            <li key={e.degree} className="grid items-center gap-3 md:grid-cols-[38%_1fr]">
              <div className="flex items-center gap-3">
                <img src={e.logo} alt="" className="h-10 w-10 shrink-0 rounded-lg bg-white/90 object-contain p-1" loading="lazy" />
                <div className="min-w-0">
                  <div className="font-display font-bold leading-snug text-white">{e.degree}</div>
                  <div className="text-xs text-slate-400">{e.org} · <span className="font-mono">{e.years}</span></div>
                </div>
              </div>
              <div className="relative h-2.5 rounded-full bg-white/5">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease, delay: 0.15 * i }}
                  className={`absolute inset-y-0 origin-left rounded-full ${e.ongoing ? "bar-ongoing" : "bg-gradient-to-r from-cyan-400 to-violet-400"}`}
                  style={{ left: `${pos(e.span[0])}%`, width: `${Math.max(pos(e.span[1]) - pos(e.span[0]), 2)}%` }}
                />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Briefs() {
  return (
    <section className="mx-auto mt-12 max-w-7xl px-4 md:px-8">
      <SectionHead eyebrow="In brief" title="Credentials" />
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-black/30 p-5 backdrop-blur md:col-span-2">
          <Kicker color="text-slate-500">Certifications</Kicker>
          <ul className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {CERTS.map((c) => {
              const m = c.match(/^(.*)\((.*)\)$/);
              return (
                <li key={c} className="border-l-2 border-cyan-300/40 pl-3">
                  <div className="text-sm text-white">{m ? m[1].trim() : c}</div>
                  {m && <div className="font-mono text-[11px] text-slate-500">{m[2]}</div>}
                </li>
              );
            })}
          </ul>
        </div>
        <a
          href={PROFILE.links.publications}
          target="_blank"
          rel="noreferrer"
          onClick={() => play("click")}
          className="story group flex flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/15 to-transparent p-5"
        >
          <div>
            <Kicker color="text-violet-300">Publications & writing</Kicker>
            <p className="mt-3 font-serif text-2xl leading-tight text-white">Peer-reviewed research from six years of PhD work at KTH.</p>
          </div>
          <span className="arrow-link mt-6 text-sm font-semibold text-white">Read on ResearchGate ↗</span>
        </a>
      </div>
    </section>
  );
}

export function Contact() {
  const [copied, setCopied] = useState(false);
  return (
    <section className="mx-auto mt-14 max-w-7xl px-4 md:px-8">
      <div id="contact" className="scroll-mt-24 relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-400/10 via-[#0b0c14] to-violet-500/15 p-6 md:p-10">
        <Kicker color="text-cyan-300">Get in touch</Kicker>
        <h2 className="mt-3 max-w-3xl font-serif text-4xl leading-[0.95] text-white md:text-5xl">
          Hiring for data science or product? <em className="text-cyan-200">Let's talk.</em>
        </h2>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={`mailto:${PROFILE.email}`} onClick={() => play("click")} className="btn-solid bg-white text-black hover:bg-slate-200">
            ✉ {PROFILE.email}
          </a>
          <button
            onClick={() => {
              navigator.clipboard?.writeText(PROFILE.email);
              setCopied(true);
              play("toggle");
              setTimeout(() => setCopied(false), 1600);
            }}
            className="btn-ghost"
          >
            {copied ? "Copied ✓" : "Copy"}
          </button>
          <a href={PROFILE.links.linkedin} target="_blank" rel="noreferrer" onClick={() => play("click")} className="btn-ghost">
            LinkedIn ↗
          </a>
          <a href={PROFILE.links.github} target="_blank" rel="noreferrer" onClick={() => play("click")} className="btn-ghost">
            GitHub ↗
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="mx-auto mt-10 max-w-7xl px-4 pb-8 md:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 font-mono text-[11px] uppercase tracking-wider text-slate-600">
        <span>© {new Date().getFullYear()} {PROFILE.name}</span>
        <span>React · Framer Motion · Sound by ElevenLabs · Press ⌘K</span>
      </div>
    </footer>
  );
}
