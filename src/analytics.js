// Visitor actions sent to Google Analytics 4 as events (gtag is loaded in index.html).
export function track(name, params = {}) {
  try {
    window.gtag?.("event", name, params);
  } catch {}
}

// Every external link or mailto click, tagged with the project it belongs to (data-project
// on an ancestor) and a coarse kind, so reports can answer "which demos get opened".
function linkKind(href) {
  if (href.startsWith("mailto:")) return "email";
  if (href.includes("linkedin.com")) return "linkedin";
  if (/github\.com\/[^/]+\/?$/.test(href)) return "github_profile";
  if (href.includes("github.com")) return "code";
  if (/\.(pdf|pptx)$/i.test(href)) return "document";
  return "live";
}

if (typeof window !== "undefined") {
  document.addEventListener(
    "click",
    (e) => {
      const a = e.target.closest?.("a[href]");
      if (!a) return;
      const href = a.getAttribute("href");
      const external = /^(https?:|mailto:)/.test(href) && !href.startsWith(window.location.origin);
      const file = /\.(pdf|pptx)$/i.test(href);
      if (!external && !file) return;
      track("outbound_click", {
        link_kind: linkKind(href),
        link_url: href.slice(0, 100),
        link_text: (a.textContent || "").trim().slice(0, 60),
        project: a.closest("[data-project]")?.dataset.project || "(none)",
      });
    },
    true
  );
}
