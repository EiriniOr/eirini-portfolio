import { motion } from "framer-motion";
function extFromHref(href = "") {
  const idx = href.lastIndexOf(".");
  return idx > -1 ? href.slice(idx + 1).toUpperCase() : "FILE";
}

function Card({ item }) {
  const ext = extFromHref(item.href);
  const colors = {
    PDF: "bg-red-500",
    PPTX: "bg-orange-500",
    DOCX: "bg-blue-500",
    XLSX: "bg-green-500",
  };
  const color = colors[ext] || "bg-violet-500";
  const hasThumb = !!item.thumb;

  return (
    <motion.a
      href={item.href}
      target="_blank"
      rel="noreferrer"
      className="group rounded-2xl overflow-hidden border border-violet-100 bg-white/80 backdrop-blur shadow-lg hover:shadow-xl transition-shadow"
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ type: "tween", duration: 0.18, ease: "easeOut" }}
    >
      {/* Thumbnail area */}
      <div className="relative aspect-[16/10] w-full bg-violet-50 flex items-center justify-center">
        {hasThumb ? (
          <img
            src={item.thumb}
            alt={item.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div
            className={`rounded-xl px-4 py-2 text-white text-lg font-bold ${color}`}
          >
            {ext}
          </div>
        )}
      </div>

      {/* Title */}
      <div className="p-4">
        <div className="line-clamp-2 font-medium text-slate-900">
          {item.title}
        </div>
        <div className="mt-1 text-xs text-slate-500">{item.subtitle}</div>
      </div>
    </motion.a>
  );
}


export default function AiProjects() {

  const items = [
    {
      title: "UX Design, discussion on Trust",
      subtitle: "PDF · 3 pages",
      href: "/ai/files/AI UX design.pdf",
      thumb: "/ai/thumbs/aiuxdesign.png", 
    },
    {
      title: "Bayesian Model and Risk Assessment",
      subtitle: "PDF · 13 pages",
      href: "/ai/files/Assignment Bayesian project.pdf",
      thumb: "/ai/thumbs/bayesian.png",
    },
    {
      title: "Income predictors analysis using R",
      subtitle: "PDF · 5 pages",
      href: "/ai/files/Data Analysis with R.pdf",
      thumb: "/ai/thumbs/dataanalysiswithR.png",
    },
     {
      title: "Service Design for Smart Education",
      subtitle: "PDF · 8 pages",
      href: "/ai/files/Eirini-Project Service Design.pdf",
      thumb: "/ai/thumbs/servicedesign.png", 
    },

         {
      title: "Anomaly Detection in Healthcare",
      subtitle: "PDF · 5 pages",
      href: "/ai/files/pdm.pdf",
      thumb: "/ai/thumbs/pdm.png", 
    },

         {
      title: "Circular Business Model for OpenAI's ChatGPT",
      subtitle: "PDF · 16 pages",
      href: "/ai/files/OpenAI circular business model.pdf",
      thumb: "/ai/thumbs/circular.png", 
    },
    
         {
      title: "The Morality of AI Agents in Autonomous Vehicle Decision Making",
      subtitle: "PDF · 13 pages",
      href: "/ai/files/The Morality of AI Agents in Autonomous Vehicle Decision.pdf",
      thumb: "/ai/thumbs/vehicle.png", 
    },

             {
      title: "UX design of a AI-powered Education App",
      subtitle: "PDF · 3 pages",
      href: "/ai/files/UX design 2.pdf",
      thumb: "/ai/thumbs/intellearn.png", 
    },

    
             {
      title: "Short project in Pytorch",
      subtitle: "PDF · 9 pages",
      href: "/ai/files/Pytorch course project.pdf",
      thumb: "/ai/thumbs/pytorch.png", 
    },
  ];

  return (
    <div className="min-h-screen text-slate-900 relative overflow-hidden bg-gradient-to-br from-violet-50 via-emerald-50 to-purple-50">
      {/* if you have your blob-layer in App.jsx only, it's fine; this page looks good without */}
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-10">
        <div className="flex items-baseline justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            AI Implementation Projects — Files
          </h1>
          <a
            href="/#projects"
            className="text-sm underline text-violet-700 hover:text-violet-800"
          >
            ← Back to Projects
          </a>
        </div>

        <p className="mt-2 text-slate-600">
          Thumbnails + titles for each file. Click to open in a new tab.
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <Card key={i} item={it} />
          ))}
        </div>
      </div>
    </div>
  );
}
