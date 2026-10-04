import { useEffect, useMemo, useRef, useState } from "react";
import { STORIES } from "./data";

const ACCENT = "#0e9fb8"; // validated: dark-mode lightness band + 3:1 vs surface
const KEY = "eo-stats-key";
const titleOf = Object.fromEntries(STORIES.map((s) => [s.slug, s.title]));
const nice = (slug) => titleOf[slug] || slug;
const fmt = (n) => Intl.NumberFormat("en-GB").format(Math.round(n || 0));
const pct = (a, b) => (b ? `${Math.round((a / b) * 100)}%` : "–");
const mmss = (s) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, "0")}`;

function sample(days) {
  const daily = Array.from({ length: days }, (_, i) => {
    const d = new Date(Date.now() - (days - 1 - i) * 864e5);
    return { date: d.toISOString().slice(0, 10).replace(/-/g, ""), visitors: Math.round(6 + 5 * Math.sin(i / 3) + (i % 7 === 2 ? 9 : 0) + i * 0.15) };
  });
  return {
    days,
    totals: { visitors: daily.reduce((a, d) => a + d.visitors, 0), sessions: 410, avgSessionSec: 154, engagementRate: 0.63 },
    daily,
    countries: [["Sweden", 182], ["Greece", 41], ["United States", 33], ["Germany", 17], ["United Kingdom", 12]].map(([name, value]) => ({ name, value })),
    sources: [["linkedin.com", 168], ["(direct)", 121], ["google", 64], ["github.com", 31]].map(([name, value]) => ({ name, value })),
    events: { outbound_click: 96, copy_email: 7, filter_used: 58, search_open: 19, sound_toggle: 23 },
    projects: [["nutriofast", 44], ["fairgatdann-fairness-aware-graph-attention-domain-adversarial-network-for-icu-mortality", 39], ["cassandra", 27], ["guru-md", 21], ["jobbajobba", 15]].map(([name, value]) => ({ name, value })),
    linkKinds: [["live", 52], ["code", 23], ["linkedin", 11], ["document", 6], ["email", 4]].map(([name, value]) => ({ name, value })),
    projectClicks: [["nutriofast", 19], ["jobbajobba", 11], ["mrgraph-the-graph-based-tutor", 8], ["miss-datrix", 6]].map(([name, value]) => ({ name, value })),
    video: { play: 74, p25: 61, p50: 47, p75: 39, complete: 31 },
    warnings: [],
  };
}

function Tile({ label, value, sub }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
      <div className="font-mono text-[10px] uppercase tracking-wider text-slate-400">{label}</div>
      <div className="mt-1 font-display text-3xl font-bold text-white">{value}</div>
      {sub && <div className="text-xs text-slate-500">{sub}</div>}
    </div>
  );
}

function Panel({ title, children, note }) {
  return (
    <section className="min-w-0 rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <h2 className="font-display text-base font-bold text-white">{title}</h2>
      {note && <p className="text-xs text-slate-500">{note}</p>}
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Bars({ data, label = (n) => n, total }) {
  if (!data?.length) return <p className="text-sm text-slate-500">No data yet.</p>;
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <ul className="space-y-2">
      {data.map((d) => (
        <li key={d.name} className="group" title={`${label(d.name)}: ${fmt(d.value)}${total ? ` (${pct(d.value, total)})` : ""}`}>
          <div className="flex min-w-0 justify-between gap-3 text-sm">
            <span className="min-w-0 truncate text-slate-200">{label(d.name)}</span>
            <span className="shrink-0 tabular-nums text-slate-300">
              {fmt(d.value)}
              {total ? <span className="ml-1.5 text-slate-500">{pct(d.value, total)}</span> : null}
            </span>
          </div>
          <div className="mt-1 h-1.5 rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full transition-opacity group-hover:opacity-80"
              style={{ width: `${(d.value / max) * 100}%`, background: ACCENT }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

function VisitorsChart({ daily }) {
  const ref = useRef(null);
  const [hover, setHover] = useState(null);
  const [table, setTable] = useState(false);
  const W = 720, H = 180, P = { l: 32, r: 8, t: 10, b: 22 };
  const max = Math.max(...daily.map((d) => d.visitors), 1);
  const yMax = max > 10 ? Math.ceil(max / 10) * 10 : Math.ceil(max / 2) * 2;
  const x = (i) => P.l + (i / Math.max(daily.length - 1, 1)) * (W - P.l - P.r);
  const y = (v) => P.t + (1 - v / yMax) * (H - P.t - P.b);
  const path = daily.map((d, i) => `${i ? "L" : "M"}${x(i)},${y(d.visitors)}`).join("");
  const label = (s) => new Date(`${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6)}`).toLocaleDateString("en-GB", { day: "numeric", month: "short" });

  function onMove(e) {
    const r = ref.current.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * W;
    const i = Math.round(((px - P.l) / (W - P.l - P.r)) * (daily.length - 1));
    setHover(Math.max(0, Math.min(daily.length - 1, i)));
  }

  if (!daily.length) return <p className="text-sm text-slate-500">No data yet.</p>;
  return (
    <div>
      <div className="relative">
        <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" onMouseMove={onMove} onMouseLeave={() => setHover(null)} role="img" aria-label="Visitors per day">
          {[0, 0.5, 1].map((f) => (
            <g key={f}>
              <line x1={P.l} x2={W - P.r} y1={y(yMax * f)} y2={y(yMax * f)} stroke="rgba(255,255,255,0.07)" />
              <text x={P.l - 6} y={y(yMax * f) + 3} textAnchor="end" fontSize="10" fill="#94a3b8">{Math.round(yMax * f)}</text>
            </g>
          ))}
          {[0, Math.floor((daily.length - 1) / 2), daily.length - 1].map((i) => (
            <text key={i} x={x(i)} y={H - 6} textAnchor={i === 0 ? "start" : i === daily.length - 1 ? "end" : "middle"} fontSize="10" fill="#94a3b8">{label(daily[i].date)}</text>
          ))}
          <path d={path} fill="none" stroke={ACCENT} strokeWidth="2" strokeLinejoin="round" />
          {hover !== null && (
            <g>
              <line x1={x(hover)} x2={x(hover)} y1={P.t} y2={H - P.b} stroke="rgba(255,255,255,0.25)" />
              <circle cx={x(hover)} cy={y(daily[hover].visitors)} r="4.5" fill={ACCENT} stroke="#0b0c14" strokeWidth="2" />
            </g>
          )}
          <rect x={P.l} y={P.t} width={W - P.l - P.r} height={H - P.t - P.b} fill="transparent" />
        </svg>
        {hover !== null && (
          <div
            className="pointer-events-none absolute top-0 -translate-x-1/2 rounded-md border border-white/15 bg-[#11131d] px-2 py-1 text-xs text-slate-200 shadow-lg"
            style={{ left: `${(x(hover) / W) * 100}%` }}
          >
            {label(daily[hover].date)} · <span className="font-semibold text-white">{daily[hover].visitors}</span> visitors
          </div>
        )}
      </div>
      <button onClick={() => setTable((t) => !t)} className="mt-2 text-xs text-slate-400 underline hover:text-white">
        {table ? "Hide table" : "Show as table"}
      </button>
      {table && (
        <table className="mt-2 w-full text-left text-xs text-slate-300">
          <thead className="text-slate-500"><tr><th className="py-1">Date</th><th>Visitors</th></tr></thead>
          <tbody>{daily.map((d) => <tr key={d.date} className="border-t border-white/5"><td className="py-1">{label(d.date)}</td><td>{d.visitors}</td></tr>)}</tbody>
        </table>
      )}
    </div>
  );
}

const KIND = { live: "Live demos", code: "Code (GitHub repos)", document: "PDFs / papers", linkedin: "LinkedIn", github_profile: "GitHub profile", email: "Email links", app: "App downloads" };

export default function Stats() {
  const demo = typeof window !== "undefined" && new URLSearchParams(window.location.search).has("demo");
  const [key, setKey] = useState(() => {
    try { return sessionStorage.getItem(KEY) || ""; } catch { return ""; }
  });
  const [input, setInput] = useState("");
  const [days, setDays] = useState(30);
  const [data, setData] = useState(null);
  const [state, setState] = useState("idle");

  useEffect(() => {
    const m = document.createElement("meta");
    m.name = "robots";
    m.content = "noindex, nofollow";
    document.head.appendChild(m);
    document.title = "Stats · Eirini's portfolio";
    return () => m.remove();
  }, []);

  useEffect(() => {
    if (demo) { setData(sample(days)); setState("ok"); return; }
    if (!key) return;
    setState("loading");
    fetch(`/api/stats?days=${days}`, { headers: { "x-stats-key": key } })
      .then(async (r) => {
        if (r.status === 401) {
          try { sessionStorage.removeItem(KEY); } catch {}
          setKey("");
          setState("denied");
          return;
        }
        const j = await r.json();
        if (j.error === "not_configured") return setState("unconfigured");
        if (!r.ok) throw new Error(j.error || r.status);
        setData(j);
        setState("ok");
      })
      .catch(() => setState("error"));
  }, [key, days, demo]);

  const v = data?.video;
  const funnel = useMemo(() => v && [
    { name: "Started", value: v.play }, { name: "Reached 25%", value: v.p25 }, { name: "Reached 50%", value: v.p50 },
    { name: "Reached 75%", value: v.p75 }, { name: "Watched to the end", value: v.complete },
  ], [v]);

  if (!demo && !key) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#07070c] px-4 text-slate-100">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            try { sessionStorage.setItem(KEY, input); } catch {}
            setKey(input);
          }}
          className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.03] p-6"
        >
          <h1 className="font-display text-xl font-bold">Portfolio stats</h1>
          <p className="mt-1 text-sm text-slate-400">Private. Enter your stats password.</p>
          {state === "denied" && <p className="mt-3 text-sm text-rose-300">Wrong password.</p>}
          <input type="password" autoFocus value={input} onChange={(e) => setInput(e.target.value)} className="mt-4 w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-white outline-none focus:border-cyan-400" aria-label="Stats password" />
          <button className="mt-3 w-full rounded-lg bg-white py-2 text-sm font-semibold text-black">Open stats</button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#07070c] px-4 py-8 text-slate-100 md:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <a href="/" className="text-xs text-slate-400 hover:text-white">← Portfolio</a>
            <h1 className="font-display text-3xl font-bold">Portfolio stats</h1>
          </div>
          <div className="flex gap-1 rounded-full border border-white/10 p-1" role="tablist" aria-label="Date range">
            {[7, 30, 90].map((d) => (
              <button key={d} role="tab" aria-selected={days === d} onClick={() => setDays(d)} className={`rounded-full px-3 py-1 text-sm ${days === d ? "bg-white text-black" : "text-slate-300 hover:text-white"}`}>
                {d} days
              </button>
            ))}
          </div>
        </header>

        {demo && <p className="mt-4 rounded-lg border border-amber-300/30 bg-amber-300/10 px-3 py-2 text-sm text-amber-200">Sample data, for previewing the layout. Real numbers appear at /stats once Google Analytics is connected.</p>}
        {state === "loading" && !data && <p className="mt-8 text-slate-400">Loading…</p>}
        {state === "unconfigured" && <p className="mt-8 text-slate-300">The stats page isn't connected to Google Analytics yet (GA_PROPERTY_ID / GA_CREDENTIALS_B64 missing in Vercel).</p>}
        {state === "error" && <p className="mt-8 text-rose-300">Couldn't load stats. Try again in a minute.</p>}

        {data && (
          <>
            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
              <Tile label="Visitors" value={fmt(data.totals.visitors)} sub={`${fmt(data.totals.sessions)} visits`} />
              <Tile label="Avg. visit" value={mmss(data.totals.avgSessionSec)} sub={`${Math.round(data.totals.engagementRate * 100)}% engaged`} />
              <Tile label="Video plays" value={fmt(v.play)} sub={`${pct(v.complete, v.play)} watched to the end`} />
              <Tile label="Links opened" value={fmt(data.events.outbound_click)} sub={`${fmt(data.events.copy_email)} emails copied`} />
            </div>

            <div className="mt-4">
              <Panel title="Visitors per day">
                <VisitorsChart daily={data.daily} />
              </Panel>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Panel title="Projects opened" note="Which project stories visitors read">
                <Bars data={data.projects} label={nice} />
              </Panel>
              <Panel title="Demos & links clicked, by project" note="Live demo, code, paper or download links inside a project">
                <Bars data={data.projectClicks} label={nice} />
              </Panel>
              <Panel title="How far people watch the intro video" note="Share of everyone who pressed play">
                <Bars data={funnel} total={v.play} />
              </Panel>
              <Panel title="What kind of links get clicked">
                <Bars data={data.linkKinds} label={(k) => KIND[k] || k} />
              </Panel>
              <Panel title="Where visitors come from">
                <Bars data={data.sources} />
              </Panel>
              <Panel title="Countries">
                <Bars data={data.countries} />
              </Panel>
            </div>

            {data.warnings?.length > 0 && (
              <details className="mt-4 text-xs text-slate-500">
                <summary className="cursor-pointer">{data.warnings.length} report(s) unavailable</summary>
                <ul className="mt-2 list-disc pl-5">{data.warnings.map((w) => <li key={w}>{w}</li>)}</ul>
              </details>
            )}
          </>
        )}
      </div>
    </main>
  );
}
