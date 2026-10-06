import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { PROFILE, STORIES } from "../data";
import { play, setAmbient, setSound, useSound } from "../sound";
import { MediaTags, ease } from "./ui";
import { track } from "../analytics";

const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

export default function CommandPalette({ onClose, onOpen, setFilter, replayIntro }) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const input = useRef(null);
  const list = useRef(null);
  const { enabled, ambient } = useSound();

  const items = useMemo(() => {
    const actions = [
      { group: "Jump to", label: "Now — building with Jev", run: () => go("now") },
      { group: "Jump to", label: "Coming up — Karolinska", run: () => go("coming-up") },
      { group: "Jump to", label: "▶ Watch my story (90 s)", run: () => go("watch") },
      { group: "Jump to", label: "Featured projects", run: () => go("featured") },
      { group: "Jump to", label: "All projects", run: () => go("archive") },
      { group: "Jump to", label: "Stack & skills", run: () => go("stack") },
      { group: "Jump to", label: "Education", run: () => go("education") },
      { group: "Jump to", label: "Contact", run: () => go("contact") },
      { group: "Filter", label: "Show only live demos", hint: "▶", run: () => { setFilter({ media: "live", category: "All" }); go("archive"); } },
      { group: "Filter", label: "Show only projects with video", hint: "●", run: () => { setFilter({ media: "video", category: "All" }); go("archive"); } },
      { group: "Filter", label: "Show only open-source code", hint: "</>", run: () => { setFilter({ media: "code", category: "All" }); go("archive"); } },
      { group: "Actions", label: enabled ? "Turn sound off" : "Turn sound on", hint: "🔊", run: () => setSound(!enabled) },
      ...(enabled ? [{ group: "Actions", label: ambient ? "Mute ambient music" : "Play ambient music", hint: "♪", run: () => setAmbient(!ambient) }] : []),
      { group: "Actions", label: "Copy email address", hint: PROFILE.email, run: () => navigator.clipboard?.writeText(PROFILE.email) },
      { group: "Actions", label: "Send an email", run: () => (window.location.href = `mailto:${PROFILE.email}`) },
      { group: "Actions", label: "Open GitHub", hint: "↗", run: () => window.open(PROFILE.links.github, "_blank") },
      { group: "Actions", label: "Open LinkedIn", hint: "↗", run: () => window.open(PROFILE.links.linkedin, "_blank") },
      { group: "Actions", label: "Replay the intro", run: replayIntro },
    ];
    const stories = STORIES.map((s) => ({
      group: "Projects",
      label: s.title,
      sub: s.kind,
      media: s.media,
      haystack: [s.title, s.kind, s.category, s.year, ...s.stack].join(" "),
      run: () => onOpen(s.slug, "palette"),
    }));
    const all = [...stories, ...actions];
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return [...actions.slice(0, 8), ...stories.slice(0, 6), ...actions.slice(8)];
    return all.filter((it) => {
      const hay = (it.haystack || `${it.label} ${it.group}`).toLowerCase();
      return terms.every((t) => hay.includes(t));
    });
  }, [q, enabled, ambient, onOpen, setFilter, replayIntro]);

  useEffect(() => {
    input.current?.focus();
    play("palette");
  }, []);
  useEffect(() => setActive(0), [q]);
  useEffect(() => {
    list.current?.querySelector(`[data-i="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  function run(it) {
    if (!it) return;
    track("search_select", { item: it.label.slice(0, 60), query: q.slice(0, 40) });
    onClose();
    setTimeout(it.run, 60);
  }

  function onKey(e) {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, items.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); run(items[active]); }
    else if (e.key === "Escape") onClose();
  }

  let lastGroup = null;
  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center px-3 pt-[12vh]" role="dialog" aria-modal="true" aria-label="Command bar">
      <motion.div className="absolute inset-0 bg-black/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: -6 }}
        transition={{ duration: 0.22, ease }}
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/15 bg-[#0d0e17]/95 shadow-2xl shadow-black/60 backdrop-blur-xl"
      >
        <div className="flex items-center gap-3 border-b border-white/10 px-4">
          <span className="font-mono text-cyan-300">›</span>
          <input
            ref={input}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKey}
            placeholder="Search projects, tech (e.g. “rag”, “pytorch”), or type a command…"
            className="w-full bg-transparent py-4 text-[15px] text-white outline-none focus-visible:outline-none placeholder:text-slate-500"
            aria-label="Search"
          />
          <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[10px] text-slate-400">ESC</kbd>
        </div>
        <ul ref={list} className="max-h-[55vh] overflow-y-auto p-2">
          {items.length === 0 && <li className="px-3 py-8 text-center text-sm text-slate-500">Nothing found for “{q}”.</li>}
          {items.map((it, i) => {
            const header = it.group !== lastGroup ? (lastGroup = it.group) : null;
            return (
              <li key={`${it.group}-${it.label}`}>
                {header && <div className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-widest text-slate-500">{header}</div>}
                <button
                  data-i={i}
                  onMouseMove={() => setActive(i)}
                  onClick={() => run(it)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${i === active ? "bg-white/10" : ""}`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm text-white">{it.label}</div>
                    {it.sub && <div className="truncate text-xs text-slate-500">{it.sub}</div>}
                  </div>
                  {it.media && <MediaTags media={it.media} size="xs" className="hidden shrink-0 sm:flex" />}
                  {it.hint && <span className="shrink-0 font-mono text-xs text-slate-500">{it.hint}</span>}
                  {i === active && <span className="shrink-0 font-mono text-xs text-slate-400">↵</span>}
                </button>
              </li>
            );
          })}
        </ul>
        <div className="flex gap-4 border-t border-white/10 px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-slate-500">
          <span>↑↓ navigate</span>
          <span>↵ open</span>
          <span>esc close</span>
        </div>
      </motion.div>
    </div>
  );
}
