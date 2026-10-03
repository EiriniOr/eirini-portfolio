// ── Profile ────────────────────────────────────────────────────────────────
export const PROFILE = {
  name: "Eirini Ornithopoulou, Ph.D.",
  title: "Data Scientist · AI Enthusiast · IT Project Manager (in the making)",
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
  languages: ["English (C2)", "Swedish (SVA 2)", "Greek (Native)"],
};

// ── Projects ───────────────────────────────────────────────────────────────
export const PROJECTS = [
  {
    kind: "AI Research Project",
    category: "Data Science & ML",
    title: "FairGATDANN: Fairness-Aware Graph Attention & Domain-Adversarial Network for ICU Mortality",
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
    category: "Full-Stack Web Apps",
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
    kind: "AI Research Assistant / Full-Stack Web App",
    category: "Agentic AI & LLM Tools",
    title: "Cassandra",
    year: "2026",
    badge: "new",
    impact:
      "An open-domain research assistant that grounds every answer in real scientific literature. Ask a question and it searches OpenAlex + arXiv live, then renders the answer as an interactive hub-and-spoke canvas: the synthesized answer sits at the center, and its actual grounding sources fan out on demand — connected by animated, measured lines rather than a flat list — with each source itself expandable from a one-sentence fact to a full paragraph to the real open-access PDF, embedded inline only when genuinely verified. Password-gated and deployed on Vercel, built directly on the Anthropic API (no agent framework in the loop).",
    stack: [
      "Next.js (App Router)", "TypeScript", "Anthropic Claude API (Sonnet 5)",
      "OpenAlex + arXiv APIs", "Upstash Redis", "Framer Motion", "Vercel Cron",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/EiriniOr/Cassandra" },
    ],
    highlights: [
      "Hub-and-spoke answer canvas: sources fan out around the answer on expand, connected by SVG lines measured live off the DOM — not hardcoded positions — and wrap above and below the hub once there are too many for one row",
      "Progressive disclosure per source: sentence → grounded paragraph → real embedded PDF — the PDF step is skipped entirely rather than shown fake; it verifies actual file bytes and rejects access-gated interstitials some publishers serve in place of the article",
      "LLM relevance filter drops keyword-matched but off-topic search results before they ever reach the UI",
      "Branch a follow-up question off any answer into a connected child node, with breadcrumb navigation back up the thread",
      "Track a topic and a Vercel Cron job re-searches it every 2 days, surfacing new results into a saved library backed by Upstash Redis",
      "Full conversation history stays out of the way behind the input bar — collapsed by default, reveals as a scrollable panel on hover",
    ],
  },
  {
    kind: "Agentic AI · Geospatial",
    category: "Agentic AI & LLM Tools",
    title: "Agentic Assistant for Climate & Urban Planning",
    confidential: true,
    year: "2026",
    badge: "new",
    impact:
      "An applied R&D project: an end-to-end agentic assistant for climate and urban-planning decision support, pairing a chat agent with an interactive map. You ask in natural language and a guarded, tool-using agent reasons over public geospatial and statistical data, answers with inline citations, and renders the result on the map — small-area demographics, land cover (green space, water, built-up), a modelled air-quality layer, a planning-document knowledge store, and live scientific literature, all behind one conversation. Project specifics are confidential, so this is a capability summary — no live demo, source, or screenshots.",
    stack: [
      "Next.js", "React", "MapLibre GL", "CopilotKit",
      "Python", "LangGraph", "FastAPI", "Claude API",
      "Azure AI", "RAG · ChromaDB", "MCP",
    ],
    links: [],
    highlights: [
      "Guarded agent: input/output guardrails + deterministic citation & quote verification — it may only present sources the tools actually returned (no hallucinated references)",
      "Model-agnostic: runs on a small fast model or a large reasoning model, with auto-routing by question complexity and a live cost estimate",
      "Map intelligence: metric-appropriate choropleths, weighted multi-criteria (MCDA) priority colouring, and side-by-side / spyglass comparison of two indicators",
      "Click or draw an area → instant current-state analysis (demographics, air quality vs limit values, land cover, heat) from public data",
      "Portable by design: framework-free tools exposed as an MCP server + per-answer evaluation logging, so the analysis drops into a production agent without a rewrite",
    ],
  },
  {
    kind: "AI Data Science Suite / ML Pipeline",
    category: "Data Science & ML",
    title: "Miss Datrix",
    year: "2026",
    badge: "inprogress",
    impact:
      "End-to-end AI-guided data science platform built on Streamlit. Upload any tabular dataset and an AI analyst (Claude) proposes a workflow, then walks through cleaning, EDA, feature engineering, model benchmarking, hyperparameter optimisation, SHAP explainability, and a downloadable HTML report. Also supports A/B testing and causal inference (propensity score matching, IPW). Access is invite-only as it runs on personal API infrastructure.",
    stack: [
      "Python", "Streamlit", "Claude API", "scikit-learn", "XGBoost", "LightGBM",
      "Optuna", "SHAP", "Plotly", "statsmodels", "A/B Testing", "Causal Inference",
    ],
    links: [
      { label: "Live Demo", href: "https://msdatrix.streamlit.app/" },
      { label: "GitHub", href: "https://github.com/EiriniOr/data-suite" },
    ],
    highlights: [
      "AI analyst proposes a minimal workflow based on uploaded data and stated goal — not a fixed template",
      "Trains real models (RF, XGBoost, LightGBM, SVM, Logistic/Ridge) with cross-validated leaderboard",
      "Optuna Bayesian hyperparameter search with trial progress and before/after comparison",
      "SHAP feature importance + confusion matrix / ROC / residual plots + downloadable HTML report",
      "A/B testing: auto-detects continuous vs binary outcome, Welch/Mann-Whitney/chi-square, Cohen's d, power analysis",
      "Causal inference: propensity score matching or IPW, ATE with bootstrap SE, covariate balance (SMD)",
    ],
  },
  {
    kind: "EdTech Web App / AI Medical Tutor · School Project",
    category: "Full-Stack Web Apps",
    title: "Guru, MD",
    year: "2026",
    badge: "new",
    video: "/videos/guru-md-demo.mp4",
    poster: "/videos/guru-md-poster.jpg",
    preview: "/videos/guru-md-preview.mp4",
    impact:
      "An AI medical-education platform for medical students, built as a school project and tuned for Swedish and EU clinical practice. At its core is \"Guru, MD\" — a Claude-powered tutor that answers questions with live, citation-backed evidence, runs structured learning paths with auto-generated quizzes, recommends what to study next, and even produces a spoken news podcast. Note: the hosted demo is retired (the Supabase database backend is no longer maintained), so the project is shared as source plus the video walkthrough below.",
    stack: [
      "Next.js (App Router)", "TypeScript", "Anthropic Claude (Sonnet 4.6)",
      "Tavily Search (RAG)", "Supabase (Auth + PostgreSQL + RLS)",
      "Web Speech API", "Tailwind CSS", "shadcn/ui", "Vercel",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/EiriniOr/guru-md" },
    ],
    highlights: [
      "RAG-grounded tutor: streams Claude answers fused with live Tavily web search over EU/Swedish medical sources (ESC, ESICM, EULAR, FASS, Janusinfo, SBU), with inline numbered citations [1][2] back to each source",
      "Prompt-engineered guardrails: a domain system prompt enforces SI units, European nomenclature, Socratic follow-ups, and an \"educational only — consult a clinician\" disclaimer when a question drifts toward personal medical advice",
      "Auto-generated assessments: Claude turns any module's markdown into a strict-JSON 5-question MCQ quiz (2 easy / 2 medium / 1 hard) with per-answer explanations, then parses and scores it",
      "AI study advisor: reads the student's activity log + module progress and returns JSON recommendations for the next path or module to tackle",
      "Zero-cost audio: Claude writes a 2–3 minute spoken-word podcast script from fresh medical news, narrated in-browser via the Web Speech API — no paid TTS",
      "Multi-tenant security by design: Supabase Postgres with Row-Level Security policies isolating every user's sessions, messages, quiz attempts, and progress, while learning paths stay publicly readable",
    ],
  },
  {
    kind: "Multi-agent App / Automation / Audio Narration",
    category: "Full-Stack Web Apps",
    title: "Automated Weekly Digest Systems",
    year: "2025",
    badge: "updated",
    impact:
      "Two fully automated content creation systems that curate weekly news and publish them as curated webpages with AI-narrated audio summaries. (1) AI Weekly Digest: curates agentic AI news from arXiv, Hacker News, Reddit every Sunday at 6 PM with a galaxy-themed UI. (2) International Politics Digest: collects news via RSS feeds from BBC, Deutsche Welle, NYT, Financial Times, Foreign Policy, and South China Morning Post every Monday at 6 AM with a newsroom-aurora UI. Both use Claude AI for curation, OpenAI TTS for narration, and deploy automatically to GitHub Pages via GitHub Actions.",
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
      "Distinct interactive UIs: galaxy palette for AI digest, newsroom-aurora for politics",
      "Both run in GitHub Actions cloud with email notifications on completion",
    ],
  },
  {
    kind: "Full-Stack AI App / Job Search",
    category: "Full-Stack Web Apps",
    title: "JobbaJobba",
    year: "2026",
    images: [
      "/screenshots/jobbajobba/1-homepage.png",
      "/screenshots/jobbajobba/2-search.png",
      "/screenshots/jobbajobba/3-kanban.png",
      "/screenshots/jobbajobba/4-cover-letter.png",
    ],
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
    kind: "macOS App / Electron / Developer Tool",
    category: "Full-Stack Web Apps",
    title: "Petal",
    year: "2026",
    impact:
      "A local markdown notes app for macOS, built with Electron, React, and TypeScript. Notes are stored as plain .md files on disk and can be easily shared with others. Features a CodeMirror 6 editor with split/preview/edit modes, ⌘K full-text search, folders and #hashtag support, and desktop sticky notes that float on the desktop and render markdown.",
    stack: [
      "Electron", "React 18", "TypeScript", "Tailwind CSS",
      "Framer Motion", "CodeMirror 6", "Zustand", "react-markdown",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/EiriniOr/petal" },
      { label: "Download v1.0", href: "https://github.com/EiriniOr/petal/releases/tag/v1.0.0" },
    ],
    highlights: [
      "Markdown editor with split / edit / preview modes, syntax highlighting, and live preview",
      "Desktop sticky notes — pin any note as a floating widget, click to edit, renders markdown with themed colors",
      "⌘K command for full-text search across all notes",
      "Import .md files from anywhere via the sidebar file picker (supports multi-select)",
      "Install: download the DMG from the release page, drag Petal to Applications, right-click → Open on first launch to bypass the unsigned-app warning",
    ],
  },
  {
    kind: "ML / Recommender Systems",
    category: "Data Science & ML",
    title: "Sequence-Based Movie Recommender",
    year: "2026",
    impact:
      "Transformer-based sequential recommendation system trained on MovieLens 25M (25 million ratings). Models the order of a user's watch history to predict the next movie — capturing dynamic taste shifts that static collaborative filtering misses. Benchmarked against a Matrix Factorization baseline using Hit@10 and NDCG@10. Includes a live Streamlit demo where anyone can pick movies from a curated list and get personalised top-10 recommendations.",
    stack: [
      "PyTorch", "Transformer Encoder", "Matrix Factorization",
      "MovieLens 25M", "Streamlit", "Plotly", "Python",
    ],
    links: [
      { label: "Live Demo", href: "https://movie-rec-transformer.streamlit.app/" },
      { label: "GitHub", href: "https://github.com/EiriniOr/movie-rec-transformer" },
    ],
    highlights: [
      "Causal self-attention over ordered watch history — position t attends only to movies watched before it",
      "Sliding-window next-item prediction trained with cross-entropy loss on 4.5M sequence windows",
      "Hit@10 and NDCG@10 evaluation on held-out last-3-movies per user across ~162k users",
      "Live demo: pick from 20 curated movie pills, get top-10 predictions instantly",
      "\"How It Works\" explainer page covering embeddings, attention, and why order matters — aimed at non-technical viewers",
    ],
  },
  {
    kind: "Interactive Learning Tool / Web App",
    category: "Full-Stack Web Apps",
    title: "MrGraph — The Graph-Based Tutor",
    year: "2026",
    impact:
      "Interactive force-directed knowledge graph for navigating 105 AI/ML engineering concepts across 10 learning paths. Click any node to open a rich detail panel with definitions, multi-paragraph explanations, and code examples. Built as a fully static frontend — no build step, no server dependency. Includes fuzzy search with match highlighting, learning path filters with colour-coded node dimming, Prev/Next navigation within each path, and clickable prerequisite/related concept chips.",
    stack: [
      "D3.js v7", "Vanilla JS (ES Modules)", "Python", "FastAPI (dev server)",
      "Force-directed graph", "Vercel",
    ],
    links: [
      { label: "Live Demo", href: "https://ai-learning-graph-ruddy.vercel.app/" },
      { label: "GitHub", href: "https://github.com/EiriniOr/ai-learning-graph" },
    ],
    highlights: [
      "105 fully-written concepts with 3+ paragraph explanations and working code examples — no stubs",
      "10 colour-coded learning paths: ML Foundations, Deep Learning, LLMs & Generative AI, RL, MLOps, and more",
      "Fuzzy search ranks by id/title/tag/path/short match and highlights matched text in results",
      "Force simulation: forceLink + forceManyBody + forceCollide — drag nodes, zoom, and fit-to-screen",
      "Smooth pan/zoom transition when selecting a concept via search or chip navigation",
    ],
  },
  {
    kind: "Curated Resource Platform / Web",
    category: "Full-Stack Web Apps",
    title: "ForgeMee",
    year: "2026",
    impact:
      "Curated roadmap of free resources for aspiring AI Engineers, Data Scientists, and ML Engineers. Resources span 6 phases from Python foundations to production AI, with track filtering, per-track progress bars, Firebase Auth accounts, jsPDF certificates on path completion, a community suggestion form (EmailJS, server-free), and a Wall of Fame for accepted contributors.",
    stack: [
      "HTML", "Tailwind CSS CDN", "Vanilla JS",
      "Firebase Auth", "Firestore", "jsPDF", "EmailJS", "Vercel",
    ],
    links: [
      { label: "Live", href: "https://forgemee.vercel.app" },
      { label: "GitHub", href: "https://github.com/EiriniOr/forgemee" },
    ],
    highlights: [
      "Curated free resources across 6 learning phases — foundations to production AI",
      "Track filter (DS / ML / AI) with per-track progress bars and Firestore persistence",
      "Confetti celebration + downloadable dark-themed PDF certificate on completing a full track",
      "Overlapping resources grouped as alternative paths — pick your learning style",
      "Community suggestion form with profanity filter, spam heuristics, rate limiting, and honeypot",
      "Wall of Fame section — accepted contributors credited by name and resource",
    ],
  },
  {
    kind: "Agentic AI / LLM / Web Scraping",
    category: "Agentic AI & LLM Tools",
    title: "Research Assistant",
    images: [
      "/screenshots/research-assistant/screenshot1.png",
      "/screenshots/research-assistant/screenshot2.png",
      "/screenshots/research-assistant/screenshot3.png",
    ],
    year: "2025",
    impact:
      "Autonomous research agent that takes a question and produces a structured report with citations. Uses Claude AI to decompose questions into sub-queries, searches the web via Google search, extracts facts from sources, and synthesizes findings into reports. Identifies facts that are shared among sources and lists knowledge gaps, which is something we often look for in academia. Built to demonstrate agentic workflow design.",
    stack: [
      "Python", "Claude API (Sonnet 4.5)", "Agentic AI",
      "Web Scraping", "Google Search", "Trafilatura", "Streamlit", "Poetry",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/EiriniOr/research-assistant" },
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
    category: "Agentic AI & LLM Tools",
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
    category: "Agentic AI & LLM Tools",
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
    category: "Data Science & ML",
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
    category: "Data Science & ML",
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
    category: "Agentic AI & LLM Tools",
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
    category: "Data Science & ML",
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
    category: "Data Science & ML",
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
    category: "Data Science & ML",
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

export const EDUCATION = [
  {
    degree: "MSc, IT Project Management",
    org: "Stockholm University, Sweden",
    years: "2026–2028 (Ongoing, part-time)",
    logo: "/edu/stockholm.png",
  },
  {
    degree: "MSc, Computer Science — Data Science & ML",
    org: "Halmstad University, Sweden",
    years: "2024–2026 (Completed!)",
    logo: "/edu/halmstad.png",
  },
  {
    degree: "PhD, Biotechnology",
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

export const SKILL_GROUPS = [
  {
    label: "Languages & Core",
    items: ["Python (PyTorch, scikit-learn, pandas, matplotlib, etc.)", "SQL", "R", "Git", "React", "HTML/CSS", "LaTeX"],
  },
  {
    label: "Machine Learning & AI",
    items: [
      "Machine Learning",
      "Deep Learning (Vision, LLMs, GAT/GCN, Transformers)",
      "Fairness & Explainability (Fairlearn, SHAP)",
      "NLP / RAG",
      "Predictive Modeling (Churn, Fraud Detection, Healthcare)",
      "Smart Healthcare AI",
      "Causal Inference / Causal Discovery",
      "Prompt Engineering",
    ],
  },
  {
    label: "MLOps, Agentic & Cloud",
    items: [
      "FastAPI", "Docker & Containerization",
      "MLOps (Experiment Tracking, Reproducibility)",
      "ML Model Training & Fine-tuning",
      "Agentic Engineering", "AgentOps", "Weights & Biases",
      "Azure", "Google Cloud Platform (Cloud Run, Vertex AI)", "Microsoft Fabric",
    ],
  },
  {
    label: "Data, Product & Research",
    items: [
      "Documentation", "Data Analytics", "Visualization (Power BI · Looker)",
      "UX/UI", "Service Design", "Customer-Facing Product Design & Conception",
      "Academic Research",
    ],
  },
];

export const CERTS = [
  "Product Owner Certifications (IBM/Skillsbild, 2025)",
  "Power BI Track (Datacamp, 2024)",
  "Data Engineering Associate in SQL (Datacamp, 2024)",
  "MS Fabric — The Complete Guide (Udemy, 2024)",
  "Data Scientist in Python (Datacamp, 2024)",
  "Azure Fundamentals (Udemy, 2024)",
  "Agile Project Management (Agilcoachen, 2024)",
];

// ── Front-page stories ─────────────────────────────────────────────────────
export const NOW = {
  kicker: "Now exploring",
  headline: "Jev — a model that decides instead of chats",
  text: "These days I'm looking into Jev, TypeSafe AI's System One model: messy input in, a typed decision with a confidence score out, in milliseconds.",
  uses: [
    "Routing support tickets to the right team",
    "Flagging staffing or safety issues in shift notes",
    "Blocking prompt-injection attempts before they reach an LLM",
  ],
  link: { label: "Read about Jev", href: "https://typesafe.ai/blog/introducing-system-one-models-and-jev" },
};

export const UPCOMING = {
  role: "Analytiker",
  org: "Karolinska University Hospital",
  via: "Korta vägen",
  viaNote: "Korta vägen is a programme for internationally educated academics that leads into a work placement (praktik) in Sweden.",
  unit: "Tema Akut och Reparativ Medicin",
  start: "2026-10-12T08:00:00+02:00",
  end: "2027-03-05T17:00:00+01:00",
  summary:
    "From analyses to determining what personnel the units need — and every action that streamlines the processes that end up saving lives.",
  context: "Tema ARM's ~1,700 staff sit at the heart of the hospital's acute patient flows.",
};

// Leave src empty to hide the section.
export const CAREER_VIDEO = { src: "/videos/career.mp4", poster: "/videos/career-poster.jpg" };

// ── Derived helpers ────────────────────────────────────────────────────────
export const slugify = (s) =>
  s.toLowerCase().normalize("NFKD").replace(/[\u2010-\u2015]/g, " ").replace(/[^\w\s-]/g, "").trim().replace(/[\s_-]+/g, "-");

export const MEDIA = {
  live: { label: "Live demo", short: "LIVE", icon: "▶" },
  video: { label: "Video", short: "VIDEO", icon: "●" },
  code: { label: "Code", short: "CODE", icon: "</>" },
  read: { label: "Paper / PDF", short: "READ", icon: "¶" },
  shots: { label: "Screenshots", short: "SHOTS", icon: "▣" },
  app: { label: "Download", short: "APP", icon: "↓" },
  private: { label: "Confidential", short: "PRIVATE", icon: "◐" },
};

export function linkMedia(l) {
  const h = l.href || "";
  const lab = l.label.toLowerCase();
  if (h.includes("github.com") && !h.includes("/releases")) return "code";
  if (h.includes("/releases") || lab.includes("download")) return "app";
  if (/\.(pdf|pptx)$/i.test(h) || h.startsWith("/") || lab.includes("thesis") || lab.includes("pdf")) return "read";
  if (h.startsWith("http") && !h.includes("powerbi") && !h.includes("dropbox")) return "live";
  return null;
}

export function mediaOf(p) {
  const out = new Set(p.links.map(linkMedia).filter(Boolean));
  if (p.video) out.add("video");
  if (p.images?.length) out.add("shots");
  if (p.confidential) out.add("private");
  const order = Object.keys(MEDIA);
  return [...out].sort((a, b) => order.indexOf(a) - order.indexOf(b));
}

// Screenshots of each project's own page (live demo, thesis cover, report or repo card).
const THUMBS = new Set([
  "fairgatdann-fairness-aware-graph-attention-domain-adversarial-network-for-icu-mortality",
  "nutriofast", "cassandra", "miss-datrix", "automated-weekly-digest-systems", "jobbajobba", "petal",
  "sequence-based-movie-recommender", "mrgraph-the-graph-based-tutor", "forgemee", "powerpoint-mcp-server",
  "ats-style-job-match-scorer", "heart-disease-risk-prediction-api", "customer-churn-dashboard",
  "document-qa-rag-bot", "carbon-emissions-explorer", "cookie-cats-ab-test-analysis", "ai-implementation-strategy",
]);

export const STORIES = PROJECTS.map((p, i) => {
  const slug = slugify(p.title);
  return { ...p, slug, media: mediaOf(p), index: i, thumb: THUMBS.has(slug) ? `/thumbs/${slug}.jpg` : null };
});
