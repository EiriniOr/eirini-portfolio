import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import EmbedModal from "./EmbedModal";
import NeuralField from "./components/NeuralField";
import { TopBar, Wordmark } from "./components/Masthead";
import FrontPage from "./components/FrontPage";
import Stories from "./components/Stories";
import Article from "./components/Article";
import CommandPalette from "./components/CommandPalette";
import Intro from "./components/Intro";
import { Briefs, Contact, Education, Footer, Stack } from "./components/Sections";
import { STORIES } from "./data";
import { play } from "./sound";

function storyFromHash() {
  const m = window.location.hash.match(/^#story\/(.+)$/);
  return m && STORIES.some((s) => s.slug === m[1]) ? { slug: m[1], origin: "link" } : null;
}

function introSeen() {
  try {
    return !!sessionStorage.getItem("eo-intro");
  } catch {
    return false;
  }
}

export default function Portfolio() {
  const [story, setStory] = useState(storyFromHash);
  const [intro, setIntro] = useState(() => !introSeen() && !storyFromHash());
  const [palette, setPalette] = useState(false);
  const [filter, setFilter] = useState({ media: "all", category: "All" });
  const [embed, setEmbed] = useState(null);

  const finishIntro = useCallback(() => {
    setIntro(false);
    try {
      sessionStorage.setItem("eo-intro", "1");
    } catch {}
  }, []);

  const openStory = useCallback((slug, origin) => {
    play("open");
    const url = `#story/${slug}`;
    if (window.history.state?.story) window.history.replaceState({ story: slug }, "", url);
    else window.history.pushState({ story: slug }, "", url);
    setStory({ slug, origin });
  }, []);

  const closeStory = useCallback(() => {
    play("close");
    setStory(null);
    if (window.history.state?.story) window.history.back();
    else window.history.replaceState(null, "", window.location.pathname);
  }, []);

  useEffect(() => {
    const onPop = () => setStory(storyFromHash());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      const typing = /input|textarea/i.test(e.target.tagName);
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette((p) => !p);
      } else if (e.key === "/" && !typing && !palette) {
        e.preventDefault();
        setPalette(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [palette]);

  useEffect(() => {
    document.documentElement.style.overflow = story || palette || intro ? "hidden" : "";
  }, [story, palette, intro]);

  const replayIntro = useCallback(() => {
    window.scrollTo({ top: 0 });
    setIntro(true);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen overflow-x-clip bg-[#07070c] text-slate-100">
        <NeuralField />
        <div className="grain pointer-events-none fixed inset-0 z-[1]" aria-hidden />

        <div className="relative z-10">
          <TopBar onSearch={() => setPalette(true)} />
          <Wordmark ready={!intro} />
          <FrontPage />
          <Stories onOpen={openStory} filter={filter} setFilter={setFilter} />
          <Stack />
          <Education />
          <Briefs />
          <Contact />
          <Footer />
        </div>

        <AnimatePresence>
          {story && (
            <Article
              key="article"
              slug={story.slug}
              origin={story.origin}
              onClose={closeStory}
              onOpen={openStory}
              openEmbed={setEmbed}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {palette && (
            <CommandPalette
              onClose={() => setPalette(false)}
              onOpen={openStory}
              setFilter={setFilter}
              replayIntro={replayIntro}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>{intro && <Intro onDone={finishIntro} />}</AnimatePresence>
        <EmbedModal open={!!embed} onClose={() => setEmbed(null)} src={embed} />
      </div>
    </MotionConfig>
  );
}
