import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { MEDIA, STORIES } from "../data";
import { play } from "../sound";
import { Cover, Kicker, MediaTags, SectionHead, ease } from "./ui";

const BADGE = {
  new: ["New", "bg-cyan-300 text-black"],
  updated: ["Updated", "bg-violet-300 text-black"],
  inprogress: ["In progress", "bg-amber-300 text-black"],
  pinned: ["Featured", "bg-white text-black"],
};

const shortKind = (k) => k.split(/[/·]/)[0].trim();

function Badge({ b }) {
  if (!BADGE[b]) return null;
  const [label, cls] = BADGE[b];
  return <span className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${cls}`}>{label}</span>;
}

function reveal(i = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.7, ease, delay: (i % 4) * 0.08 },
  };
}

function Latest({ onOpen }) {
  const items = STORIES.filter((s) => ["new", "updated", "inprogress"].includes(s.badge));
  return (
    <section className="mx-auto mt-12 max-w-7xl px-4 md:px-8">
      <SectionHead eyebrow="Recently shipped" title="Latest projects" />
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {items.map((s, i) => (
          <motion.button key={s.slug} {...reveal(i)} onClick={() => onOpen(s.slug, "latest")} className="story group text-left">
            <motion.div layoutId={`cover-latest-${s.slug}`} className="overflow-hidden rounded-xl">
              <Cover p={s} className="aspect-[16/8] rounded-xl" />
            </motion.div>
            <div className="mt-2 flex items-center gap-2">
              <Badge b={s.badge} />
              <Kicker color="text-slate-500" className="truncate">{shortKind(s.kind)}</Kicker>
            </div>
            <h3 className="story-title mt-1.5 font-display text-base font-bold leading-tight text-white">{s.title}</h3>
            <MediaTags media={s.media} size="xs" className="mt-2" />
          </motion.button>
        ))}
      </div>
    </section>
  );
}

function TopStories({ onOpen }) {
  const items = STORIES.filter((s) => s.badge === "pinned");
  return (
    <section className="mx-auto mt-12 max-w-7xl px-4 md:px-8">
      <SectionHead id="featured" eyebrow="Highlights" title="Featured projects" />
      <div className="grid gap-4 lg:grid-cols-2">
        {items.map((s, i) => (
          <motion.button
            key={s.slug}
            {...reveal(i)}
            onClick={() => onOpen(s.slug, "top")}
            className="story feature group relative overflow-hidden rounded-2xl border border-white/10 text-left"
          >
            <motion.div layoutId={`cover-top-${s.slug}`} className="overflow-hidden">
              <Cover p={s} className="aspect-[16/5]" />
            </motion.div>
            <div className="relative p-5"> 
              <div className="flex flex-wrap items-center gap-2">
                <Badge b="pinned" />
                <Kicker color="text-cyan-300">{s.kind} · {s.year}</Kicker>
              </div>
              <h3 className="story-title mt-2 font-display text-xl font-bold leading-[1.1] tracking-tight text-white md:text-2xl">{s.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-slate-400">{s.impact}</p>
              <div className="mt-3 flex items-center justify-between gap-3">
                <MediaTags media={s.media} />
                <span className="arrow-link shrink-0 text-sm font-semibold text-white">View project →</span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}

const FILTERS = [
  ["all", "Everything"],
  ["live", "▶ Try it live"],
  ["video", "● Watch"],
  ["code", "</> Read the code"],
  ["read", "¶ Read the paper"],
  ["shots", "▣ Screenshots"],
];
const CATEGORIES = ["All", "Agentic AI & LLM Tools", "Data Science & ML", "Full-Stack Web Apps"];

function Archive({ onOpen, filter, setFilter }) {
  const { media, category } = filter;
  const count = (m) => STORIES.filter((s) => m === "all" || s.media.includes(m)).length;
  const items = STORIES.filter(
    (s) => (media === "all" || s.media.includes(media)) && (category === "All" || s.category === category)
  );

  const chip = (active) =>
    `relative rounded-full px-3.5 py-1.5 text-sm transition-colors ${active ? "text-black" : "text-slate-300 hover:text-white"}`;

  return (
    <section className="mx-auto mt-12 max-w-7xl px-4 md:px-8">
      <SectionHead
        id="archive"
        eyebrow="Filter by what you can open"
        title="All projects"
        right={<span className="hidden font-mono text-xs text-slate-500 md:block">{items.length} / {STORIES.length} projects</span>}
      />

      <LayoutGroup id="filters">
        <div className="flex flex-wrap gap-1.5 rounded-2xl border border-white/10 bg-black/40 p-1.5 backdrop-blur" role="tablist" aria-label="Filter by media">
          {FILTERS.map(([k, label]) => (
            <button
              key={k}
              role="tab"
              aria-selected={media === k}
              onClick={() => { setFilter({ ...filter, media: k }); play("click"); }}
              className={chip(media === k)}
            >
              {media === k && <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-white" transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />}
              <span className="relative">
                {label} <span className="opacity-50">{count(k)}</span>
              </span>
            </button>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 px-1">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => { setFilter({ ...filter, category: c }); play("click"); }}
              className={`relative pb-1 font-mono text-[11px] uppercase tracking-wider transition-colors ${category === c ? "text-white" : "text-slate-500 hover:text-slate-300"}`}
            >
              {c}
              {category === c && <motion.span layoutId="cat-line" className="absolute inset-x-0 -bottom-px h-[2px] bg-cyan-300" />}
            </button>
          ))}
        </div>
      </LayoutGroup>

      <motion.ol layout className="mt-4 grid border-t border-white/10 lg:grid-cols-2 lg:gap-x-8">
        <AnimatePresence mode="popLayout" initial={false}>
          {items.map((s, i) => (
            <motion.li
              key={s.slug}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease }}
              className="border-b border-white/10"
            >
              <button onClick={() => onOpen(s.slug, "archive")} className="story group grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 py-2.5 text-left md:grid-cols-[1.75rem_5rem_1fr_auto] md:gap-4">
                <span className="hidden font-mono text-xs text-slate-600 md:block">{String(i + 1).padStart(2, "0")}</span>
                <motion.div layoutId={`cover-archive-${s.slug}`} className="w-16 overflow-hidden rounded-md md:w-20">
                  <Cover p={s} className="aspect-[16/10] rounded-md" hoverPlay={false} />
                </motion.div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    {s.badge && s.badge !== "pinned" && <Badge b={s.badge} />}
                    <Kicker color="text-slate-500" className="truncate">{shortKind(s.kind)} · {s.year}</Kicker>
                  </div>
                  <h3 className="story-title mt-0.5 font-display text-[15px] font-bold leading-snug text-white">{s.title}</h3>
                  <MediaTags media={s.media} size="xs" className="mt-1.5" />
                </div>
                <span className="text-lg text-slate-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white">→</span>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ol>
      {items.length === 0 && <p className="py-10 text-center text-slate-500">No projects match that filter.</p>}

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 px-1 font-mono text-[10px] uppercase tracking-wider text-slate-600">
        {Object.entries(MEDIA).map(([k, m]) => (
          <span key={k}>{m.icon} {m.short} = {m.label}</span>
        ))}
      </div>
    </section>
  );
}

export default function Stories({ onOpen, filter, setFilter }) {
  return (
    <>
      <TopStories onOpen={onOpen} />
      <Latest onOpen={onOpen} />
      <Archive onOpen={onOpen} filter={filter} setFilter={setFilter} />
    </>
  );
}
