import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MEDIA, PROFILE, STORIES, linkMedia } from "../data";
import { Cover, Kicker, MediaTags, ease } from "./ui";

const linkKind = (l) => {
  const k = linkMedia(l) || "live";
  return [k, MEDIA[k].icon];
};

const LINK_STYLE = {
  live: "bg-lime-300 text-black hover:bg-lime-200",
  code: "bg-white text-black hover:bg-slate-200",
  read: "bg-amber-300 text-black hover:bg-amber-200",
  app: "bg-violet-300 text-black hover:bg-violet-200",
};

export default function Article({ slug, origin, onClose, onOpen, openEmbed }) {
  const idx = STORIES.findIndex((s) => s.slug === slug);
  const s = STORIES[idx];
  const next = STORIES[(idx + 1) % STORIES.length];
  const prev = STORIES[(idx - 1 + STORIES.length) % STORIES.length];
  const scroller = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onOpen(next.slug, "nav");
      if (e.key === "ArrowLeft") onOpen(prev.slug, "nav");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, onClose, onOpen]);

  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 });
  }, [slug]);

  if (!s) return null;
  const shared = ["latest", "top", "archive"].includes(origin);
  const sorted = [...s.links].sort((a, b) => ["live", "app", "code", "read"].indexOf(linkKind(a)[0]) - ["live", "app", "code", "read"].indexOf(linkKind(b)[0]));

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={s.title}
      className="fixed inset-0 z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 1 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        onClick={onClose}
      />
      <div ref={scroller} className="absolute inset-0 overflow-y-auto overscroll-contain" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="mx-auto max-w-4xl px-3 py-6 md:py-12" onClick={(e) => e.target === e.currentTarget && onClose()}>
          <motion.article
            key={s.slug}
            initial={{ opacity: shared ? 1 : 0, y: shared ? 0 : 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5, ease }}
            data-project={s.slug}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b0c14] shadow-2xl"
          >
            <motion.div layoutId={shared ? `cover-${origin}-${s.slug}` : undefined} className="overflow-hidden">
              <Cover p={s} className="aspect-[16/7]" />
            </motion.div>

            <button
              onClick={onClose}
              aria-label="Close project"
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-black/60 text-white backdrop-blur transition hover:rotate-90 hover:bg-black/80"
            >
              ✕
            </button>

            <div className="px-5 pb-10 pt-6 md:px-12">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5, ease }}>
                <Kicker color="text-cyan-300">{s.kind} · {s.year}</Kicker>
                <h2 className="mt-3 font-display text-3xl font-bold leading-[1.05] tracking-tight text-white md:text-5xl">{s.title}</h2>
                <MediaTags media={s.media} className="mt-4" />
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25, duration: 0.5 }}>
                {sorted.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {sorted.map((l) => {
                      const [k, icon] = linkKind(l);
                      if (l.href === PROFILE.links.dashboards2) {
                        return (
                          <button key={l.label} onClick={() => openEmbed(l.href)} className={`btn-solid ${LINK_STYLE.live}`}>
                            ▶ {l.label}
                          </button>
                        );
                      }
                      const internal = l.href.startsWith("/");
                      return (
                        <a
                          key={l.label}
                          href={l.href}
                          target={internal && !/\.(pdf|pptx)$/i.test(l.href) ? "_self" : "_blank"}
                          rel="noreferrer"
                          className={`btn-solid ${LINK_STYLE[k]}`}
                        >
                          <span className="font-mono text-xs">{icon}</span> {l.label}
                        </a>
                      );
                    })}
                  </div>
                )}

                <p className="dropcap mt-8 text-lg leading-relaxed text-slate-300">{s.impact}</p>

                {s.video && (
                  <figure className="mt-8">
                    <video controls preload="none" playsInline poster={s.poster} className="w-full rounded-xl border border-white/10 bg-black">
                      <source src={s.video} type="video/mp4" />
                    </video>
                    <figcaption className="mt-2 font-mono text-[11px] uppercase tracking-wider text-slate-500">Video walkthrough</figcaption>
                  </figure>
                )}

                {s.images?.length > 0 && (
                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {s.images.map((src, i) => (
                      <a key={src} href={src} target="_blank" rel="noreferrer" className="group overflow-hidden rounded-xl border border-white/10">
                        <img src={src} alt={`${s.title} screenshot ${i + 1}`} loading="lazy" className="w-full transition duration-500 group-hover:scale-[1.03]" />
                      </a>
                    ))}
                  </div>
                )}

                {s.highlights.length > 0 && (
                  <>
                    <h3 className="mt-10 border-t-2 border-white/80 pt-3 font-display text-xl font-bold text-white">Key points</h3>
                    <ul className="mt-4 space-y-3">
                      {s.highlights.map((h) => (
                        <li key={h} className="flex gap-3 text-slate-300">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <h3 className="mt-10 font-mono text-[11px] uppercase tracking-widest text-slate-500">Built with</h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {s.stack.map((t) => (
                    <span key={t} className="rounded-md border border-white/10 bg-white/5 px-2 py-1 font-mono text-xs text-slate-300">{t}</span>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-2 border-t border-white/10">
              <button onClick={() => onOpen(prev.slug, "nav")} className="group border-r border-white/10 p-5 text-left transition hover:bg-white/[0.03]">
                <Kicker color="text-slate-500">← Previous</Kicker>
                <div className="mt-1 line-clamp-1 font-display font-bold text-slate-300 group-hover:text-white">{prev.title}</div>
              </button>
              <button onClick={() => onOpen(next.slug, "nav")} className="group p-5 text-right transition hover:bg-white/[0.03]">
                <Kicker color="text-slate-500">Next →</Kicker>
                <div className="mt-1 line-clamp-1 font-display font-bold text-slate-300 group-hover:text-white">{next.title}</div>
              </button>
            </div>
          </motion.article>
        </div>
      </div>
    </motion.div>
  );
}
