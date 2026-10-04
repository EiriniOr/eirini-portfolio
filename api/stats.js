// Private stats endpoint: reads the GA4 property and returns a compact summary.
// Env (Vercel project settings): GA_PROPERTY_ID, GA_CREDENTIALS_B64 (service-account JSON, base64), STATS_PASSWORD.
import { timingSafeEqual } from "node:crypto";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

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

  res.status(200).json({
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
  });
}
