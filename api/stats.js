// Private stats endpoint: reads the GA4 property and returns a compact summary.
// Env (Vercel project settings): GA_PROPERTY_ID, GA_CREDENTIALS_B64 (service-account JSON, base64), STATS_PASSWORD.
import { timingSafeEqual } from "node:crypto";
import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { PROJECTS, slugify } from "../src/data.js";

const EVENTS = [
  "video_play", "video_complete", "project_open", "outbound_click",
  "filter_used", "search_open", "copy_email", "sound_toggle",
];

function authorized(req) {
  const given = Buffer.from(String(req.headers["x-stats-key"] || ""));
  const expected = Buffer.from(process.env.STATS_PASSWORD || "");
  return expected.length > 0 && given.length === expected.length && timingSafeEqual(given, expected);
}

const eventIs = (name) => ({ filter: { fieldName: "eventName", stringFilter: { value: name } } });
const rows = (r, toValue = Number) =>
  (r?.rows || []).map((row) => ({ name: row.dimensionValues[0].value, value: toValue(row.metricValues[0].value) }));

// Jev (TypeSafe AI) turns the summary into typed, confidence-scored judgements; the page
// renders them as sentences. Skipped when TYPESAFE_API_KEY is not set.
const PROJECT_INFO = Object.fromEntries(PROJECTS.map((p) => [slugify(p.title), `${p.title} (${p.category}; ${p.kind})`]));

const QUESTIONS = {
  enough_data: {
    type: "noul",
    instructions: "There is enough visitor activity in this period to draw conclusions",
    criteria: { true: "At least roughly 20 visitors and some project activity", false: "Too few visitors or events to say anything meaningful" },
  },
  main_interest: {
    type: "choice",
    instructions: "Which theme do visitors engage with most, judging by projects opened and links clicked",
    criteria: {
      healthcare_ai: "Healthcare / clinical AI projects",
      agentic_ai: "Agentic AI and LLM tools",
      data_science: "Data science, ML models and analysis",
      web_apps: "Full-stack web apps and tools",
      mixed: "No clear favourite",
    },
  },
  audience: {
    type: "choice",
    instructions: "Where most visitors come from",
    criteria: {
      linkedin: "LinkedIn or other professional networks",
      technical: "GitHub or other developer sites",
      search: "Search engines",
      direct: "Direct visits, bookmarks or shared links",
      unclear: "No dominant source",
    },
  },
  video_engagement: {
    type: "score",
    instructions: "How engaged people are with the intro video once they press play",
    criteria: ["Most stop early", "About half keep watching", "Most watch to the end"],
  },
  hands_on: {
    type: "score",
    instructions: "How much visitors try live demos and read code, relative to how many visit",
    criteria: ["Rarely open demos or code", "Some open demos or code", "Many open demos or code"],
  },
  trend: {
    type: "choice",
    instructions: "How visitor numbers change between the first and second half of the period",
    criteria: { growing: "Clearly more visitors recently", steady: "Roughly the same", declining: "Clearly fewer visitors recently" },
  },
  suggestion: {
    type: "choice",
    instructions: "The single most useful next step for the portfolio owner, given this behaviour",
    criteria: {
      feature_top: "Feature the most-opened project more prominently",
      promote_video: "Make the intro video more visible, few people play it",
      shorten_video: "Shorten the intro video, viewers drop off",
      more_demos: "Add live demos, visitors click demos but few exist in their favourite theme",
      share_more: "Share the portfolio more widely, traffic is low",
      keep: "Keep things as they are, engagement looks healthy",
    },
  },
};

async function jevInsight(summary) {
  if (!process.env.TYPESAFE_API_KEY) return null;
  const half = Math.floor(summary.daily.length / 2);
  const sum = (a) => a.reduce((t, d) => t + d.visitors, 0);
  const state = {
    period_days: summary.days,
    visitors: summary.totals.visitors,
    visits: summary.totals.sessions,
    average_visit_seconds: summary.totals.avgSessionSec,
    visitors_first_half: sum(summary.daily.slice(0, half)),
    visitors_second_half: sum(summary.daily.slice(half)),
    traffic_sources: summary.sources,
    projects_opened: summary.projects.map((p) => ({ project: PROJECT_INFO[p.name] || p.name, opens: p.value })),
    demo_and_code_clicks_by_project: summary.projectClicks.map((p) => ({ project: PROJECT_INFO[p.name] || p.name, clicks: p.value })),
    link_clicks_by_kind: summary.linkKinds,
    intro_video: summary.video,
  };
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 8000);
  try {
    const r = await fetch("https://api.typesafe.ai/v1/systemone", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.TYPESAFE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: "jev-latest", state, questions: QUESTIONS }),
      signal: ctrl.signal,
    });
    if (!r.ok) return { error: `Jev ${r.status}` };
    const j = await r.json();
    return { model: j.model, answers: j.answers };
  } catch (e) {
    return { error: `Jev unavailable (${e.name === "AbortError" ? "timeout" : e.message})` };
  } finally {
    clearTimeout(timer);
  }
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (!authorized(req)) return res.status(401).json({ error: "unauthorized" });
  if (!process.env.GA_PROPERTY_ID || !process.env.GA_CREDENTIALS_B64) {
    return res.status(503).json({ error: "not_configured" });
  }

  const days = [7, 30, 90].includes(Number(req.query.days)) ? Number(req.query.days) : 30;
  const creds = JSON.parse(Buffer.from(process.env.GA_CREDENTIALS_B64, "base64").toString("utf8"));
  const client = new BetaAnalyticsDataClient({
    credentials: { client_email: creds.client_email, private_key: creds.private_key },
  });
  const property = `properties/${process.env.GA_PROPERTY_ID}`;
  const dateRanges = [{ startDate: `${days}daysAgo`, endDate: "today" }];
  const warnings = [];

  const report = async (label, body) => {
    try {
      const [r] = await client.runReport({ property, dateRanges, ...body });
      return r;
    } catch (e) {
      warnings.push(`${label}: ${e.message.split("\n")[0]}`);
      return null;
    }
  };
  const top = (dim, metric, extra = {}) => ({
    dimensions: [{ name: dim }],
    metrics: [{ name: metric }],
    orderBys: [{ metric: { metricName: metric }, desc: true }],
    limit: 10,
    ...extra,
  });

  const [totals, daily, countries, sources, events, projects, kinds, projectClicks, progress] = await Promise.all([
    report("totals", { metrics: ["activeUsers", "sessions", "averageSessionDuration", "engagementRate"].map((name) => ({ name })) }),
    report("daily", { dimensions: [{ name: "date" }], metrics: [{ name: "activeUsers" }], orderBys: [{ dimension: { dimensionName: "date" } }] }),
    report("countries", top("country", "activeUsers")),
    report("sources", top("sessionSource", "sessions")),
    report("events", {
      dimensions: [{ name: "eventName" }],
      metrics: [{ name: "eventCount" }],
      dimensionFilter: { filter: { fieldName: "eventName", inListFilter: { values: EVENTS } } },
    }),
    report("projects (needs custom dimension 'project')", top("customEvent:project", "eventCount", { dimensionFilter: eventIs("project_open") })),
    report("link kinds (needs custom dimension 'link_kind')", top("customEvent:link_kind", "eventCount", { dimensionFilter: eventIs("outbound_click") })),
    report("clicks per project (needs custom dimension 'project')", top("customEvent:project", "eventCount", { dimensionFilter: eventIs("outbound_click") })),
    report("video progress (needs custom dimension 'percent')", top("customEvent:percent", "eventCount", { dimensionFilter: eventIs("video_progress") })),
  ]);

  const t = totals?.rows?.[0]?.metricValues?.map((m) => Number(m.value)) || [0, 0, 0, 0];
  const ev = Object.fromEntries(rows(events).map((r) => [r.name, r.value]));
  const pct = Object.fromEntries(rows(progress).map((r) => [r.name, r.value]));

  const summary = {
    days,
    totals: { visitors: t[0], sessions: t[1], avgSessionSec: Math.round(t[2]), engagementRate: t[3] },
    daily: rows(daily).map((r) => ({ date: r.name, visitors: r.value })),
    countries: rows(countries),
    sources: rows(sources),
    events: ev,
    projects: rows(projects).filter((r) => r.name !== "(not set)"),
    linkKinds: rows(kinds).filter((r) => r.name !== "(not set)"),
    projectClicks: rows(projectClicks).filter((r) => !["(not set)", "(none)"].includes(r.name)),
    video: {
      play: ev.video_play || 0,
      p25: pct["25"] || 0,
      p50: pct["50"] || 0,
      p75: pct["75"] || 0,
      complete: ev.video_complete || 0,
    },
    warnings,
  };
  summary.insight = await jevInsight(summary);
  if (summary.insight?.error) warnings.push(summary.insight.error);
  res.status(200).json(summary);
}
