import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EmbedModal from "./EmbedModal";

// ── Profile ────────────────────────────────────────────────────────────────
const PROFILE = {
  name: "Eirini Ornithopoulou, Ph.D.",
  title: "Data Scientist · Product Owner · ML/Agentic AI Enthusiast",
  location: "Stockholm, Sweden",
  email: "renaorn@gmail.com",
  phone: "+46730802820",
  links: {
    dashboards_pdf: "/reports/Churn practice.pdf",
    github: "https://github.com/EiriniOr/",
    linkedin: "https://www.linkedin.com/in/eiriniornithopoulou/",
    thesis: "https://hh.diva-portal.org/smash/record.jsf?pid=diva2%3A1987943&dswid=5697",
    dashboards1:
      "https://www.dropbox.com/scl/fo/qu55944hq5mzbkltqsh9b/AK77rpDuKRHoeyOj4iDZ9qA?rlkey=4gp5ag7gp5uz9dfd6deehcj28&st=b3mxryey&dl=0",
    dashboards2:
      "https://app.powerbi.com/reportEmbed?reportId=c7d74911-13be-44aa-b11e-76a0312d3702&autoAuth=true&ctid=1ccb8299-3a8e-4aa1-b044-87491366f150",
    publications: "https://www.researchgate.net/profile/Eirini-Ornithopoulou/research",
    heart_api_demo: "https://heart-risk-api-602311160874.europe-north1.run.app/",
    heart_api_repo: "https://github.com/EiriniOr/heart-risk-api",
  },
  skills: [
    "Python (PyTorch, scikit-learn, pandas, matplotlib, etc.)",
    "SQL", "R", "Git", "React", "HTML/CSS", "LaTeX",
    "Machine Learning",
    "Deep Learning (Vision, LLMs, GAT/GCN, Transformers)",
    "Fairness & Explainability (Fairlearn, SHAP)",
    "NLP / RAG",
    "Predictive Modeling (Churn, Fraud Detection, Healthcare)",
    "Smart Healthcare AI",
    "Causal Inference / Causal Discovery",
    "FastAPI", "Docker & Containerization",
    "MLOps (Experiment Tracking, Reproducibility)",
    "Weights & Biases", "Documentation", "AgentOps",
    "Azure",
    "Google Cloud Platform (Cloud Run, Vertex AI)",
    "Microsoft Fabric",
    "Data Analytics",
    "Visualization (Power BI · Looker)",
    "UX/UI", "Service Design", "Academic Research",
  ],
  languages: ["English (C2)", "Swedish (SVA 2)", "Greek (Native)"],
};

// ── Projects ───────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    kind: "AI Research Project",
    title: "Fairness‑Aware, Domain‑Adaptive GAT for ICU Mortality Prediction",
    year: "2025",
    badge: "pinned",
    impact:
      "Developed end-to-end ML pipeline: SQL querying on GCP, designed computational graph construction, hyperparameter search and experiment tracking (using MLOps tools), implemented dynamic fairness constraints to reduce bias, domain adaptation before embedding creation, explainable graph visualizations and risk prediction, and post-processing tests.",
    stack: [
      "PyTorch Geometric", "Graph Attention Networks",
      "Dynamic fairness constraints", "MLOps - Experiment Tracking",
      "SQL on GCP", "Domain Adaptation",
    ],
    links: [{ label: "Thesis (DiVA)", href: PROFILE.links.thesis }],
    highlights: [
      "End‑to‑end pipeline: data extraction → graph construction → training → explainability",
      "Attention‑based explanations and risk visualization",
      "Domain adaptation before embedding creation",
    ],
  },
  {
    kind: "Winner of the AI Health Hackathon",
    title: "NutrioFast",
    year: "2025",
    badge: "pinned",
    impact:
      "My team won the 2025 AI Health Hackathon, organized by STING, Square One and KI Innovations, by developing an app that targets the problem of tracking patient food intake, and makes it easier to organize and visualize data, as well as relieves nurses' and assistant nurses' administrative burden by producing a summary text that they can then copy into the patient's health record. The tracking itself uses voice notes and image recognition through an OpenAI API.",
    stack: ["Service Design", "LLM", "OpenAI API", "Streamlit", "Typescript", "Prototyping"],
    links: [{ label: "Live Demo", href: "https://nutri-patient-watch.lovable.app" }],
    highlights: [],
  },
  {
    kind: "Full-Stack AI App / Job Search",
    title: "JobbaJobba",
    year: "2025",
    badge: "new",
    impact:
      "End-to-end job search and application platform built to make the job hunt faster and smarter. Searches Arbetsförmedlingen and LinkedIn/Indeed, generates tailored cover letters and ATS-optimised CVs with Claude AI, and tracks every application in a Kanban board. Designed specifically for the Swedish job market with bilingual (EN/SV) support throughout. Access is invite-only as it runs on personal API infrastructure.",
    stack: [
      "Next.js 14", "Supabase (Auth + PostgreSQL + Storage)",
      "Claude API", "JSearch API", "Tailwind CSS", "TypeScript", "Vercel",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/EiriniOr/job-application-assistant" },
      { label: "Live Demo", href: "https://job-application-assistant-five.vercel.app" },
    ],
    highlights: [
      "ATS match scoring with bilingual keyword detection (EN/SV) — flags missing keywords and soft skills",
      "One-click AI CV rewrite: tailors resume to a specific job in EN or SV, downloads as styled Word or PDF",
      "Gmail OAuth integration — auto-syncs inbox and moves kanban cards on rejections, interview invites, or offers",
      "AI cover letter generation with custom tone/style and ATS-aware mode",
      "Kanban board (Saved → Applied → Assessment → Interview → Offer → Rejected) with drag-and-drop",
      "Manual job add via URL — Claude extracts title, company, and description automatically",
      "Profile photo preserved with correct aspect ratio; all hyperlinks clickable in generated CV",
    ],
  },
  {
    kind: "Multi-agent App / Automation / Audio Narration",
    title: "Automated Weekly Digest Systems",
    year: "2025",
    impact:
      "Two fully automated content creation systems that curate weekly news and publish them as curated webpages with AI-narrated audio summaries. (1) AI Weekly Digest: curates agentic AI news from arXiv, Hacker News, Reddit every Sunday at 6 PM with futuristic UI. (2) International Politics Digest: collects news via RSS feeds from BBC, Deutsche Welle, NYT, Financial Times, Foreign Policy, and South China Morning Post every Monday at 6 AM. Both use Claude AI for curation, OpenAI TTS for narration, and deploy automatically to GitHub Pages via GitHub Actions.",
    stack: [
      "Python", "Claude API (Sonnet 4.5)", "OpenAI TTS (audio narration)",
      "RSS feeds (feedparser)", "HTML/CSS", "GitHub Pages", "GitHub Actions",
    ],
    links: [
      { label: "AI Digest", href: "https://EiriniOr.github.io/ai-weekly-digest/" },
      { label: "Politics Digest", href: "https://EiriniOr.github.io/news-aggregation/" },
      { label: "AI Digest GitHub", href: "https://github.com/EiriniOr/ai-weekly-digest" },
      { label: "Politics Digest GitHub", href: "https://github.com/EiriniOr/news-aggregation" },
    ],
    highlights: [
      "Claude generates scripts, OpenAI TTS creates 2-3 minute voice narration for each digest",
      "Claude filters 50+ items to ~15 top stories with insights and categorization",
      "Futuristic animated UI for AI digest, multi-column news layout for politics digest",
      "Both maintain previous weeks' digests with navigation",
      "Both run in GitHub Actions cloud with email notifications on completion",
    ],
  },
  {
    kind: "Agentic AI / LLM / Web Scraping",
    title: "Research Assistant",
    year: "2025",
    badge: "new",
    impact:
      "Autonomous research agent that takes a question and produces a structured report with citations. Uses Claude AI to decompose questions into sub-queries, searches the web via Google search, extracts facts from sources, and synthesizes findings into reports. Identifies facts that are shared among sources and lists knowledge gaps, which is something we often look for in academia. Built to demonstrate agentic workflow design.",
    stack: [
      "Python", "Claude API (Sonnet 4.5)", "Agentic AI",
      "Web Scraping", "Google Search", "Trafilatura", "Streamlit", "Poetry",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/EiriniOr/research-assistant" },
      { label: "Screenshot 1", href: "/screenshots/research-assistant/screenshot1.png" },
      { label: "Screenshot 2", href: "/screenshots/research-assistant/screenshot2.png" },
      { label: "Screenshot 3", href: "/screenshots/research-assistant/screenshot3.png" },
    ],
    highlights: [
      "Breaks complex questions into 3-5 sub-queries automatically",
      "Compares sources, identifies agreements, contradictions, and knowledge gaps",
      "Smart fact extraction with confidence scoring and citation tracking",
      "Note: Live demo not provided as it consumes API tokens; demo link available upon request",
    ],
  },
  {
    kind: "MCP Server / AI Tooling",
    title: "PowerPoint MCP Server",
    year: "2025",
    impact:
      "A comprehensive Model Context Protocol server that enables AI assistants (Claude, ChatGPT) to programmatically create PowerPoint presentations. Features 36 tools for creating charts, shapes, flowcharts, tables, QR codes, and analyzing data from CSV/Excel/JSON files. Designed to work seamlessly with Claude and other AI assistants.",
    stack: [
      "Python", "Model Context Protocol (MCP)", "python-pptx",
      "Data visualization", "Chart generation", "Shape manipulation",
    ],
    links: [
      { label: "Example Presentation", href: "/life_in_sweden_demo.pdf" },
      { label: "GitHub", href: "https://github.com/EiriniOr/mcp-powerpoint-server" },
    ],
    highlights: [
      "36 PowerPoint automation tools for comprehensive presentation creation",
      "Charts: bar, column, line, pie, scatter, bubble with customization",
      "Shapes and connectors: rectangles, circles, arrows, flowcharts",
      "Data analysis: automatic chart generation from CSV/Excel/JSON files",
      "Advanced features: QR codes, image grids, timelines, comparison slides",
    ],
  },
  {
    kind: "NLP/LLM",
    title: "ATS-style Job Match Scorer",
    year: "2025",
    impact:
      "Tired of sending applications into a black hole? This tool estimates how well your CV would score on a specific job ad, shows you suggestions, and can even generate an ATS-friendly rewritten CV with an LLM (completely free) — so you can maximize your chances with each application.",
    stack: [
      "Python", "NLP", "TF-IDF", "LLM", "Groq API",
      "OpenAI-style chat completions", "scikit-learn", "Streamlit", "Prompt engineering",
    ],
    links: [
      { label: "Live Demo", href: "https://resume-analyzer-vzenm7bxsehqjeqecla8hy.streamlit.app/" },
      { label: "GitHub", href: "https://github.com/EiriniOr/resume-analyzer" },
    ],
    highlights: [
      "Implements an ATS-inspired scoring model combining TF-IDF similarity, keyword coverage, soft-skill detection, and impact signals",
      "Supports English and Swedish CVs/job ads with custom stopword lists and section-aware weighting",
      "LLM-assisted rewrite flow using Groq API (Llama 3.1 8B) — preserves truthfulness and ATS-friendly structure",
    ],
  },
  {
    kind: "Cloud Deployment · Smart Healthcare",
    title: "Heart Disease Risk Prediction API",
    year: "2025",
    impact:
      "End-to-end ML service that estimates heart disease risk from basic clinical features, with an interactive browser demo and documented REST API.",
    stack: ["Python", "scikit-learn", "FastAPI", "Docker", "Google Cloud Run"],
    links: [
      { label: "Live Demo", href: PROFILE.links.heart_api_demo },
      { label: "GitHub", href: PROFILE.links.heart_api_repo },
    ],
    highlights: [
      "Trained a RandomForest classifier on the UCI Heart Disease dataset",
      "Deployed a containerized FastAPI service to Google Cloud Run (serverless)",
      "Simple web UI for non-technical users",
    ],
  },
  {
    kind: "Data Analysis/Data Engineering",
    title: "Customer Churn Dashboard",
    year: "2024",
    impact:
      "Improved stakeholder visibility into churn drivers and sales KPIs with interactive reports.",
    stack: ["Power BI", "DAX", "Star schema"],
    links: [
      { label: "Dashboards (login required)", href: PROFILE.links.dashboards2 },
      { label: "View PDF online", href: PROFILE.links.dashboards_pdf },
    ],
    highlights: [
      "Dimensional modeling & DAX measures",
      "Scenario filtering & drill‑through",
    ],
  },
  {
    kind: "LLM / RAG",
    title: "Document Q&A (RAG Bot)",
    year: "2025",
    impact: "Answers grounded in uploaded PDFs using retrieval + generation.",
    stack: ["FAISS", "Sentence-Transformers", "Flan-T5", "Streamlit"],
    links: [
      { label: "Live Demo", href: "https://rag-bot-jf9dca7h9sntosgie8waw4.streamlit.app/" },
      { label: "GitHub", href: "https://github.com/EiriniOr/rag-bot" },
    ],
    highlights: [
      "Local, free models — no paid APIs",
      "Top-k passage citations for transparency",
    ],
  },
  {
    kind: "Data Visualization",
    title: "Carbon Emissions Explorer",
    year: "2025",
    impact: "Interactive map and trends for CO₂ metrics (public data).",
    stack: ["Pandas", "Plotly", "Streamlit"],
    links: [
      { label: "Live Demo", href: "https://co2explorer.streamlit.app/" },
      { label: "GitHub", href: "https://github.com/EiriniOr/co2-explorer" },
    ],
    highlights: [
      "Choropleth + multi-country time series",
      "Compare per-capita vs absolute emissions",
    ],
  },
  {
    kind: "Causal Inference / A/B Testing",
    title: "Cookie Cats A/B Test Analysis",
    year: "2025",
    impact:
      "Comprehensive analysis of the Cookie Cats mobile game A/B test using causal inference methods. Goes beyond simple t-tests to implement propensity score weighting, CUPED variance reduction, doubly robust estimation, and heterogeneous treatment effect analysis with causal forests.",
    stack: [
      "Python", "Causal Inference", "A/B Testing", "Propensity Scores",
      "CUPED", "EconML", "Streamlit", "Statistical Modeling",
    ],
    links: [
      { label: "Live Demo", href: "https://cookie-cats-causal-inference.streamlit.app/" },
      { label: "GitHub", href: "https://github.com/EiriniOr/cookie-cats-causal-inference" },
    ],
    highlights: [
      "Classical A/B: difference-in-means, z-tests, power analysis, SRM detection",
      "Causal methods: regression adjustment, IPW, CUPED, doubly robust estimation",
      "HTE analysis: subgroup effects by engagement, causal forests, meta-learners",
      "Sensitivity: peeking simulation, multiple testing correction, robustness bounds",
    ],
  },
  {
    kind: "University Projects",
    title: "AI Implementation & Strategy",
    year: "2025",
    impact:
      "Investigated practical adoption of AI across UX, innovation, ethics, and data management dimensions.",
    stack: ["Innovation", "Implementation", "UX Design", "Data Management", "AI Ethics"],
    links: [{ label: "Showcase (New page)", href: "/ai-projects" }],
    highlights: [
      "Explored adoption of AI from organizational and UX perspectives",
      "Evaluated data management and governance requirements for AI projects",
      "Studied ethical implications and alignment with EU AI Act",
      "Developed recommendations for AI innovation strategies",
    ],
  },
];

const EDUCATION = [
  {
    degree: "MSc, Computer Science — Data Science & ML",
    org: "Halmstad University, Sweden",
    years: "2024–2025",
    logo: "/edu/halmstad.png",
  },
  {
    degree: "PhD, Bionanotechnology",
    org: "KTH Royal Institute of Technology, Sweden",
    years: "2017–2023",
    logo: "/edu/kth.png",
  },
  {
    degree: "BSc/MSc, Materials Science & Technology",
    org: "University of Crete, Greece",
    years: "2009–2016",
    logo: "/edu/uoc.png",
  },
];

const CERTS = [
  "Product Owner Certifications (IBM/Skillsbild, 2025)",
  "Power BI Track (Datacamp, 2024)",
  "Data Engineering Associate in SQL (Datacamp, 2024)",
  "MS Fabric — The Complete Guide (Udemy, 2024)",
  "Data Scientist in Python (Datacamp, 2024)",
  "Azure Fundamentals (Udemy, 2024)",
  "Agile Project Management (Agilcoachen, 2024)",
];

// ── Design tokens ──────────────────────────────────────────────────────────
const card =
  "glow-card rounded-xl border border-cyan-900/40 bg-slate-900/80 backdrop-blur-sm shadow-lg transition-all duration-300";

const tag =
  "inline-block text-xs px-2.5 py-1 rounded-full border border-cyan-800/50 mr-2 mt-2 text-cyan-300/85 bg-cyan-950/50 font-mono";

const btnSm =
  "px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 text-white text-sm shadow-sm transition-all duration-150";

const gradientText =
  "bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent";

// ── Chevron icon ───────────────────────────────────────────────────────────
function ChevronDown() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

// ── Section wrapper ────────────────────────────────────────────────────────
function Section({ id, title, children }) {
  return (
    <section id={id} className="max-w-5xl mx-auto px-5 md:px-8 py-10">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`text-2xl md:text-3xl font-semibold tracking-tight mb-6 ${gradientText}`}
      >
        {title}
      </motion.h2>
      {children}
    </section>
  );
}

// ── Project card (accordion) ───────────────────────────────────────────────
function ProjectCard({ p, isOpen, onToggle, openEmbed }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={card}
    >
      {/* Header — always visible */}
      <button
        onClick={onToggle}
        className="w-full text-left px-5 pt-5 pb-4 flex items-start gap-3 group"
      >
        <div className="flex-1 min-w-0">
          <div className="text-xs uppercase tracking-widest text-cyan-500/80 font-mono">
            {p.kind} · {p.year}
          </div>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <h3 className="text-base md:text-lg font-semibold text-white leading-snug">
              {p.title}
            </h3>
            {p.badge === "pinned" && (
              <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-amber-950/80 text-amber-400 border border-amber-700/50">
                📌 Pinned
              </span>
            )}
            {p.badge === "new" && (
              <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-700/50">
                ✦ New
              </span>
            )}
          </div>
          {!isOpen && (
            <p className="mt-1.5 text-sm text-slate-500 line-clamp-2">
              {p.impact.slice(0, 120)}{p.impact.length > 120 ? "…" : ""}
            </p>
          )}
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="mt-1 text-cyan-500 flex-shrink-0"
        >
          <ChevronDown />
        </motion.div>
      </button>

      {/* Expandable body */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-cyan-900/30 pt-4">
              <p className="text-sm text-slate-300 leading-relaxed">{p.impact}</p>

              {/* Stack tags */}
              <div className="mt-3">
                {p.stack.map((s, j) => (
                  <span key={j} className={tag}>{s}</span>
                ))}
              </div>

              {/* Highlights */}
              {p.highlights.length > 0 && (
                <ul className="mt-4 space-y-1.5">
                  {p.highlights.map((h, k) => (
                    <li key={k} className="flex gap-2 text-sm text-slate-400">
                      <span className="text-cyan-500 flex-shrink-0 mt-0.5">▸</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Links */}
              <div className="mt-4 flex flex-wrap gap-2">
                {p.links.map((l, m) => {
                  const isEmbed = l.href === PROFILE.links.dashboards2;
                  const isInternal = l.href?.startsWith("/");
                  if (isEmbed) {
                    return (
                      <button key={m} className={btnSm} onClick={() => openEmbed(l.href)}>
                        {l.label}
                      </button>
                    );
                  }
                  return (
                    <a
                      key={m}
                      className={btnSm}
                      href={l.href}
                      target={isInternal ? "_self" : "_blank"}
                      rel={isInternal ? undefined : "noreferrer"}
                    >
                      {l.label}
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function Portfolio() {
  const [openProject, setOpenProject] = useState(null);
  const [embedOpen, setEmbedOpen] = useState(false);
  const [embedSrc, setEmbedSrc] = useState("");

  function openEmbed(url) {
    setEmbedSrc(url);
    setEmbedOpen(true);
  }

  function toggleProject(i) {
    setOpenProject((prev) => (prev === i ? null : i));
  }

  return (
    <div className="data-bg min-h-screen text-slate-100 relative overflow-hidden">
      {/* Blobs */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="blob blob-a" />
        <div className="blob blob-b" />
        <div className="blob blob-c" />
      </div>

      {/* NAV */}
      <header className="sticky top-0 z-20 bg-slate-950/80 backdrop-blur border-b border-cyan-900/30">
        <nav className="max-w-5xl mx-auto px-5 md:px-8 py-3 flex items-center justify-between">
          <a href="#top" className={`font-semibold text-sm ${gradientText}`}>
            Eirini's Portfolio
          </a>
          <div className="hidden md:flex gap-6 text-sm text-slate-400">
            {["projects", "skills", "education", "publications", "contact"].map((s) => (
              <a key={s} href={`#${s}`} className="hover:text-cyan-400 transition-colors capitalize">
                {s}
              </a>
            ))}
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section id="top" className="max-w-5xl mx-auto px-5 md:px-8 pt-12 pb-6">
        <div className={`${card} grid md:grid-cols-3 gap-6 items-center p-6`}>
          <div className="md:col-span-2 flex flex-col gap-4">
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-3xl md:text-5xl font-bold tracking-tight ${gradientText}`}
            >
              {PROFILE.name}
            </motion.h1>
            <p className="text-base md:text-lg text-slate-300 font-mono">{PROFILE.title}</p>
            <p className="leading-relaxed text-slate-400 text-sm">
              Driven by curiosity and a desire to make meaningful change through technology.
              I love understanding how systems work, uncovering insights in data, and building
              solutions that help people and organizations. I naturally take on a product mindset:
              aligning stakeholders, prioritising and translating ideas so that solutions are
              both usable and valuable in the real world.
            </p>
            <div className="mt-2 flex flex-wrap gap-3">
              {[
                { label: "GitHub", href: PROFILE.links.github },
                { label: "LinkedIn", href: PROFILE.links.linkedin },
              ].map((l) => (
                <motion.a
                  key={l.label}
                  whileHover={{ y: -1, scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 text-white text-sm shadow-sm transition-all"
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {l.label}
                </motion.a>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <img
              src="/photo/rena.jpg"
              alt="Eirini Ornithopoulou portrait"
              className="w-36 h-36 rounded-full object-cover border-2 border-cyan-700/60 shadow-lg shadow-cyan-900/30"
              loading="lazy"
            />
            <div className="rounded-xl bg-slate-950/80 border border-cyan-900/30 text-sm p-4 w-full">
              <div className="text-slate-500 text-xs font-mono uppercase tracking-wider">Based in</div>
              <div className="font-medium text-slate-200 mt-0.5">{PROFILE.location}</div>
              <div className="text-slate-500 text-xs font-mono uppercase tracking-wider mt-3">Contact</div>
              <a className="text-cyan-400 hover:text-cyan-300 underline mt-0.5 block text-xs" href={`mailto:${PROFILE.email}`}>
                {PROFILE.email}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <Section id="projects" title="Selected Projects">
        <div className="grid md:grid-cols-2 gap-3 items-start">
          {PROJECTS.map((p, i) => (
            <ProjectCard
              key={i}
              p={p}
              isOpen={openProject === i}
              onToggle={() => toggleProject(i)}
              openEmbed={openEmbed}
            />
          ))}
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" title="Skills">
        <div className={`${card} p-6`}>
          <div className="flex flex-wrap gap-2">
            {PROFILE.skills.map((s, i) => (
              <span key={i} className={tag}>{s}</span>
            ))}
          </div>
        </div>
      </Section>

      {/* EDUCATION */}
      <Section id="education" title="Education">
        <div className="grid md:grid-cols-3 gap-4">
          {EDUCATION.map((e, i) => (
            <div key={i} className={`${card} p-5`}>
              <div className="flex items-center gap-4">
                {e.logo ? (
                  <img
                    src={e.logo}
                    alt={`${e.org} emblem`}
                    className="h-12 w-12 rounded-lg object-contain bg-slate-800 p-1"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-lg bg-cyan-950 flex items-center justify-center text-cyan-400 font-bold text-sm">
                    {e.org.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()}
                  </div>
                )}
                <div>
                  <div className="font-semibold text-slate-200 text-sm leading-snug">{e.degree}</div>
                  <div className="text-slate-400 text-xs mt-0.5">{e.org}</div>
                  <div className="text-slate-500 text-xs mt-0.5 font-mono">{e.years}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CERTIFICATIONS */}
      <Section id="certs" title="Certifications">
        <div className="grid md:grid-cols-2 gap-3">
          {CERTS.map((c, i) => (
            <div key={i} className={`${card} px-5 py-3`}>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <span className="text-cyan-500 text-xs">◆</span>
                {c}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* PUBLICATIONS */}
      <Section id="publications" title="Publications & Writing">
        <div className={`${card} p-6`}>
          <p className="text-slate-400 text-sm">
            See peer‑reviewed publications and research activity on{" "}
            <a
              className="text-cyan-400 hover:text-cyan-300 underline"
              href={PROFILE.links.publications}
              target="_blank"
              rel="noreferrer"
            >
              ResearchGate
            </a>.
          </p>
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" title="Contact">
        <div className={`${card} p-6`}>
          <p className="text-slate-400 text-sm">
            Open to roles in Data Science / Product Ownership.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-cyan-900/40 text-white text-sm transition-colors"
              href={PROFILE.links.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              Connect on LinkedIn
            </a>
            <a
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-cyan-900/40 text-white text-sm transition-colors"
              href={`mailto:${PROFILE.email}`}
            >
              Email
            </a>
          </div>
        </div>
      </Section>

      <EmbedModal open={embedOpen} onClose={() => setEmbedOpen(false)} src={embedSrc} />

      <footer className="py-10 text-center text-slate-600 text-xs font-mono">
        © {new Date().getFullYear()} {PROFILE.name} · Built with React & Tailwind
      </footer>
    </div>
  );
}
