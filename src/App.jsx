import { useState } from "react";
import { motion } from "framer-motion";
import EmbedModal from "./EmbedModal";


// ——— QUICK EDIT PANEL ———

const PROFILE = {
  name: "Eirini Ornithopoulou",
  title: "Data Scientist · ML/AI Enthusiast",
  blurb:
    "ML & Data Science MSc with a PhD in bionanotechnology (prior). I design and build AI solutions, with experience in fair, explainable models, graph and attention-focused deep learning.",
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
  },
  skills: [
    "Python (PyTorch, scikit-learn, pandas, matplotlib, and many more)",
    "Data Analytics and Visualization",
    "Actionable Insights",
    "Design Innovation",
    "Fairness & Explainability (Fairlearn, SHAP)",
    "SQL",
    "Data Modeling",
    "Power BI · Looker",
    "R",
    "Git",
    "Academic Research",
    "Cloud: Azure, GCP, MS Fabric",
    "Deep Learning: Computer Vision, LLMs, GAT/GCN, etc",
    "Predictive Maintenance/Fraud Detection",
    "Smart Healthcare",
    "Weights&Biases",
    "MLOps",
    "Service Design",
    "Causal Inference/Discovery", "React",
    "LaTeX",
  ],
  languages: ["English (C2)", "Swedish (Intermediate)", "Greek (Native)"],
};

const PROJECTS = [
  {
    kind: "AI Research Project",
    title: "Fairness‑Aware, Domain‑Adaptive GAT for ICU Mortality Prediction",
    year: "2025",
    impact:
      "Developed end-to-end ML pipeline: SQL querying on GCP, designed computational graph construction, hyperparameter search and experiment tracking (using MLOps tools), implemented dynamic fairness constraints to reduce bias, domain adaptation in before embedding creation, explainable graph visualizations and risk prediction, some post processing tests.",
    stack: [
      "PyTorch Geometric",
      "Graph Attention Networks",
      "Dynamic fairness constraints",
      "MLOps - Experiment Tracking",
      "SQL on GCP",
      "Domain Adaptation"
    ],
    links: [
      { label: "Thesis (DiVA)", href: PROFILE.links.thesis },

    ],
    highlights: [
      "End‑to‑end pipeline: data extraction → graph construction → training → explainability",
      "Attention‑based explanations and risk visualization",
      "Domain adaptation before embedding creation",
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
  kind: "NLP",
  title: "AI Resume ↔ Job description Analyzer",
  year: "2025",
  impact: "Scores fit and highlights missing keywords vs job descriptions.",
  stack: ["Python", "NLP", "TF-IDF", "Streamlit"],
  links: [
    { label: "Live Demo", href: "https://resume-analyzer-vzenm7bxsehqjeqecla8hy.streamlit.app/" },
    { label: "GitHub", href: "https://github.com/EiriniOr/resume-analyzer" }
  ],
  highlights: [
    "Cosine similarity with n-grams",
    "Keyword gap detection and actionable suggestions"
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
    { label: "GitHub", href: "https://github.com/EiriniOr/co2-explorer" }
  ],
  highlights: [
    "Choropleth + multi-country time series",
    "Compare per-capita vs absolute emissions"
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
    { label: "GitHub", href: "https://github.com/EiriniOr/rag-bot" }
  ],
  highlights: [
    "Local, free models — no paid APIs",
    "Top-k passage citations for transparency"
  ],
},


  {
  kind: "University Projects",
  title: "AI Implementation & Strategy",
  year: "2025",
  impact:
    "Investigated practical adoption of AI across UX, innovation, ethics, and data management dimensions.",
  stack: ["Innovation", "Implementation", "UX Design", "Data Management", "AI Ethics"],
  links: [
    { label: "Showcase (New page)", href: "/ai-projects" }
  ],
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
  "Power BI Track (Datacamp, 2024)",
  "Data Engineering Associate in SQL (Datacamp, 2024)",
  "MS Fabric — The Complete Guide (Udemy, 2024)",
  "Data Scientist in Python (Datacamp, 2024)",
  "Azure Fundamentals (Udemy, 2024)",
  "Agile Project Management (Agilcoachen, 2024)",
];

// ——— UI HELPERS ———
// Accents: violet/purple; secondary hints: pastel green
const card = "rounded-2xl shadow-lg p-6 bg-white/80 backdrop-blur border border-violet-100";
const tag  = "inline-block text-xs px-2.5 py-1 rounded-full border border-violet-200/70 mr-2 mt-2 text-violet-900/85 bg-violet-50/70";

// Buttons
const btn   = "px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm shadow-sm transition-transform";
const btnSm = "px-3 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm shadow-sm transition-transform";

// Optional secondary (green) button, a contrast option on some links
const btnAlt   = "px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm shadow-sm transition-transform";
const btnAltSm = "px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm shadow-sm transition-transform";


function Section({ id, title, children }) {
  return (
    <section id={id} className="max-w-6xl mx-auto px-5 md:px-8 py-10">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl md:text-3xl font-semibold tracking-tight mb-6"
      >
        {title}
      </motion.h2>
      {children}
    </section>
  );
}

export default function Portfolio() {
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
    const [embedOpen, setEmbedOpen] = useState(false);
  const [embedSrc, setEmbedSrc] = useState("");
  function openEmbed(url) {
    setEmbedSrc(url);
    setEmbedOpen(true);
  }
  return (
        <div className="min-h-screen text-slate-900 relative overflow-hidden bg-gradient-to-br from-violet-50 via-emerald-50 to-purple-50">
      {/* Decorative animated blobs */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="blob blob-a" />
        <div className="blob blob-b" />
        <div className="blob blob-c" />
      </div>

      {/* NAV */}
      <header className="sticky top-0 z-20 bg-white/60 backdrop-blur border-b border-violet-100">
        <nav className="max-w-6xl mx-auto px-5 md:px-8 py-3 flex items-center justify-between">
          <a href="#top" className="font-semibold">Eirini's Portfolio</a>
          <div className="hidden md:flex gap-6 text-sm">
            <a href="#projects" className="hover:underline">Projects</a>
            <a href="#skills" className="hover:underline">Skills</a>
            <a href="#education" className="hover:underline">Education</a>
            <a href="#publications" className="hover:underline">Publications</a>
            <a href="#contact" className="hover:underline">Contact</a>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section id="top" className="max-w-6xl mx-auto px-5 md:px-8 pt-12 pb-6">
        <div className={`${card} grid md:grid-cols-3 gap-6 items-center`}>
          <div className="md:col-span-2">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-bold tracking-tight"
            >
              {PROFILE.name}
            </motion.h1>
            <p className="mt-2 text-lg md:text-xl text-slate-700">{PROFILE.title}</p>
            <p className="mt-4 leading-relaxed text-slate-700">{PROFILE.blurb}</p>
            <div className="mt-4 flex flex-wrap gap-3">
                            <motion.a
                            whileHover={{ y: -1, scale: 1.015 }}
                          whileTap={{ scale: 0.985 }}
                          transition={{ type: "tween", duration: 0.12, ease: "easeOut" }}
                          className={btn}  // or btnSm
                          href={PROFILE.links.github}
                          target="_blank"
                          rel="noreferrer"
                                        >
                            GitHub
                          </motion.a>

                          <motion.a
                           whileHover={{ y: -1, scale: 1.015 }}
                          whileTap={{ scale: 0.985 }}
                          transition={{ type: "tween", duration: 0.12, ease: "easeOut" }}
                          className={btn}  // or btnSm
                          href={PROFILE.links.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          >
                            LinkedIn
                          </motion.a>


            </div>
          </div>
          <div>
            <div className="rounded-2xl bg-slate-900 text-white p-5">
              <div className="text-sm text-slate-300">Based in</div>
              <div className="font-semibold">{PROFILE.location}</div>
              <div className="mt-4 text-sm text-slate-300">Contact</div>
              <div className="mt-1">
                {showEmail ? (
                  <a className="underline" href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
                ) : (
                  <button className="underline" onClick={() => setShowEmail(true)}>Reveal email</button>
                )}
              </div>
              {PROFILE.phone && (
              <div className="mt-1">
                  {showPhone ? (
                    <a className="underline" href={`tel:${PROFILE.phone}`}>{PROFILE.phone}</a>
                  ) : (
                    <button className="underline" onClick={() => setShowPhone(true)}>Reveal phone</button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <Section id="projects" title="Selected Projects">
        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((p, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            viewport={{ once: true }}
            className={card}
              >

              <div className="text-xs uppercase tracking-wider text-slate-500">{p.kind} · {p.year}</div>
              <h3 className="text-xl font-semibold mt-1">{p.title}</h3>
              <p className="mt-2 text-slate-700">{p.impact}</p>
              <div className="mt-2">
                {p.stack.map((s, j) => (
                <motion.span key={j} className={tag} whileHover={{ scale: 1.06 }}>
                  {s}
                </motion.span>
              ))}

              </div>
              <ul className="mt-4 list-disc list-inside text-slate-700 space-y-1">
                {p.highlights.map((h, k) => (
                  <li key={k}>{h}</li>
                ))}
              </ul>
            <div className="mt-4 flex flex-wrap gap-3">
              {p.links.map((l, m) => {
                const isPowerBI = l.href === PROFILE.links.dashboards2; // secure embed URL
                const isInternal = l.href?.startsWith("/");

                if (isPowerBI) {
                  return (
                    <motion.button
                      key={m}
                      whileHover={{ y: -1, scale: 1.015 }}
                      whileTap={{ scale: 0.985 }}
                      transition={{ type: "tween", duration: 0.12, ease: "easeOut" }}
                      className={btnSm}
                      onClick={() => openEmbed(l.href)}
                    >
                      {l.label}
                    </motion.button>
                  );
                }

                return (
                  <motion.a
                    key={m}
                    whileHover={{ y: -1, scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    transition={{ type: "tween", duration: 0.12, ease: "easeOut" }}
                    className={btnSm} // or btn if you want larger buttons here
                    href={l.href}
                    target={isInternal ? "_self" : "_blank"}
                    rel={isInternal ? undefined : "noreferrer"}
                  >
                    {l.label}
                  </motion.a>
                );
              })}
            </div>



            </motion.article>
          ))}
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" title="Skills">
  <div className={card}>
    <div className="flex flex-wrap gap-3">
      {PROFILE.skills.map((s, i) => (
        <span
          key={i}
          className="inline-block text-sm md:text-base px-3 py-1.5 rounded-full border border-violet-200/70 bg-violet-50/70 text-violet-900/90 font-medium shadow-sm"
        >
          {s}
        </span>
      ))}
    </div>
  </div>
</Section>


      {/* EDUCATION */}
      <Section id="education" title="Education">
  <div className="grid md:grid-cols-3 gap-6">
    {EDUCATION.map((e, i) => (
      <div key={i} className={card}>
        <div className="flex items-center gap-4">
          {e.logo ? (
            <img
              src={e.logo}
              alt={`${e.org} emblem`}
              className="h-12 w-12 rounded-xl object-contain bg-white"
              loading="lazy"
            />
          ) : (
            <div className="h-15 w-15 rounded-xl bg-violet-100 flex items-center justify-center text-violet-700 font-semibold">
              {e.org.split(" ").slice(0,2).map(w => w[0]).join("").toUpperCase()}
            </div>
          )}
          <div>
            <div className="font-semibold">{e.degree}</div>
            <div className="text-slate-600">{e.org}</div>
            <div className="text-slate-500 text-sm">{e.years}</div>
          </div>
        </div>
      </div>
    ))}
  </div>
</Section>


<Section id="certs" title="Certifications">
  <div className="grid md:grid-cols-2 gap-6">
    {CERTS.map((c, i) => (
      <div key={i} className={card}>
        <div className="font-medium text-slate-800">{c}</div>
      </div>
    ))}
  </div>
</Section>


      {/* PUBLICATIONS */}
      <Section id="publications" title="Publications & Writing">
        <div className={card}>
          <p className="text-slate-700">
            See my peer‑reviewed publications and research activity on{" "}
            <a className="underline" href={PROFILE.links.publications} target="_blank">ResearchGate</a>.
          </p>
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" title="Contact">
        <div className={card}>
          <p className="text-slate-700">
            I’m open to roles in Data Science / ML Engineering and to collaborations on
            fairness, explainability, and healthcare applications.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a className="px-4 py-2 rounded-xl bg-slate-900 text-white text-sm" href={PROFILE.links.linkedin} target="_blank">Connect on LinkedIn</a>
            <a className="px-4 py-2 rounded-xl bg-slate-900 text-white text-sm" href={`mailto:${PROFILE.email}`}>Email me</a>
          </div>
        </div>
      </Section>
        
         <EmbedModal
          open={embedOpen}
          onClose={() => setEmbedOpen(false)}
          src={embedSrc}
        />

      <footer className="py-10 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} {PROFILE.name}. Built with React & Tailwind.
      </footer>
    </div>
  );
}
