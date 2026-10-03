import { useEffect, useRef } from "react";
import { play } from "../sound";

// Full-viewport canvas neural net. Every few seconds a cascade fires: spikes
// race along edges as jagged arcs, branch outward, and the first branch to
// terminate becomes the "decision" node (bigger shockwave + laser sound).
// Fired nodes are refractory for a moment, so cascades spread instead of looping.
const LINK = 150;
const CURSOR = 190;
const REFRACTORY = 650;
const LASERS = ["laser-1", "laser-2", "laser-3"];
const laser = () => LASERS[Math.floor(Math.random() * LASERS.length)];

function zigzag(g, ax, ay, bx, by, amp) {
  const dx = bx - ax, dy = by - ay;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len, ny = dx / len;
  const segs = Math.max(3, Math.round(len / 18));
  g.beginPath();
  g.moveTo(ax, ay);
  for (let i = 1; i < segs; i++) {
    const t = i / segs;
    const o = (Math.random() * 2 - 1) * amp;
    g.lineTo(ax + dx * t + nx * o, ay + dy * t + ny * o);
  }
  g.lineTo(bx, by);
  g.stroke();
}

export default function NeuralField() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const g = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, last = performance.now();
    let nodes = [];
    let spikes = [];
    let arcs = [];
    let rings = [];
    let nextCascade = performance.now() + 900;
    let nextChatter = 0;
    let lastSound = 0;
    let cascadeId = 0;
    const decided = new Set();
    const mouse = { x: -9999, y: -9999 };

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(95, Math.max(32, (w * h) / 15000)));
      nodes = Array.from({ length: count }, (_, i) => nodes[i] ?? {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.014,
        vy: (Math.random() - 0.5) * 0.014,
        flash: 0,
        last: -1e9,
      });
      spikes = spikes.filter((s) => s.from < count && s.to < count);
      arcs = arcs.filter((a) => a.a < count && a.b < count);
      if (reduced) draw(0, performance.now());
    }

    function sound(name, x, gain = 1, now = performance.now()) {
      if (now - lastSound < 400) return;
      lastSound = now;
      play(name, { rate: 0.9 + Math.random() * 0.2, gain, pan: (x / w) * 1.4 - 0.7 });
    }

    function neighbours(i) {
      const a = nodes[i];
      const out = [];
      nodes.forEach((b, j) => {
        if (j !== i && Math.hypot(a.x - b.x, a.y - b.y) < LINK) out.push(j);
      });
      return out.sort(() => Math.random() - 0.5);
    }

    function fire(i, depth, now, { branch = 2, id = null } = {}) {
      const n = nodes[i];
      if (now - n.last < REFRACTORY) return false;
      n.last = now;
      n.flash = 1;
      rings.push({ x: n.x, y: n.y, t0: now, big: false });
      if (depth <= 0) {
        if (id !== null && !decided.has(id)) {
          decided.add(id);
          rings.push({ x: n.x, y: n.y, t0: now, big: true });
          lastSound = 0;
          sound(laser(), n.x, 1, now);
        }
        return true;
      }
      neighbours(i)
        .filter((j) => now - nodes[j].last > REFRACTORY)
        .slice(0, branch)
        .forEach((j, k) => spikes.push({ from: i, to: j, t0: now + k * 25, dur: 90 + Math.random() * 90, depth: depth - 1, id }));
      return true;
    }

    function cascade(i, depth, now) {
      const id = ++cascadeId;
      if (decided.size > 50) decided.clear();
      lastSound = 0;
      sound(laser(), nodes[i].x, 1, now);
      fire(i, depth, now, { branch: 2, id });
    }

    function nearest(x, y) {
      let best = 0, bd = Infinity;
      nodes.forEach((n, i) => {
        const d = Math.hypot(n.x - x, n.y - y);
        if (d < bd) { bd = d; best = i; }
      });
      return best;
    }

    function draw(dt, now) {
      g.clearRect(0, 0, w, h);
      for (const n of nodes) {
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        if (n.x < -20) n.x = w + 20; else if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20; else if (n.y > h + 20) n.y = -20;
        n.flash = Math.max(0, n.flash - dt * 0.004);
      }

      g.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            const near = Math.max(0, 1 - Math.hypot((a.x + b.x) / 2 - mouse.x, (a.y + b.y) / 2 - mouse.y) / CURSOR);
            g.strokeStyle = `rgba(34,211,238,${(1 - d / LINK) * (0.12 + near * 0.4)})`;
            g.beginPath();
            g.moveTo(a.x, a.y);
            g.lineTo(b.x, b.y);
            g.stroke();
          }
        }
        const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (dm < CURSOR) {
          g.strokeStyle = `rgba(167,139,250,${(1 - dm / CURSOR) * 0.3})`;
          g.beginPath();
          g.moveTo(a.x, a.y);
          g.lineTo(mouse.x, mouse.y);
          g.stroke();
        }
      }

      // Fading lightning on edges a spike just crossed.
      g.shadowColor = "#a5f3fc";
      arcs = arcs.filter((a) => {
        const age = Math.max(0, (now - a.t0) / 380);
        if (age >= 1) return false;
        const A = nodes[a.a], B = nodes[a.b];
        g.shadowBlur = 14;
        g.lineWidth = 2.2 * (1 - age);
        g.strokeStyle = `rgba(207,250,254,${0.8 * (1 - age)})`;
        zigzag(g, A.x, A.y, B.x, B.y, 5 * (1 - age));
        return true;
      });

      spikes = spikes.filter((s) => {
        const p = (now - s.t0) / s.dur;
        if (p < 0) return true;
        const A = nodes[s.from], B = nodes[s.to];
        if (p >= 1) {
          arcs.push({ a: s.from, b: s.to, t0: now });
          if (s.depth === 0 && s.id !== null && !decided.has(s.id)) nodes[s.to].last = -1e9;
          fire(s.to, s.depth, now, { branch: s.depth > 2 ? 2 : 1, id: s.id });
          return false;
        }
        const hx = A.x + (B.x - A.x) * p, hy = A.y + (B.y - A.y) * p;
        const tp = Math.max(0, p - 0.45);
        const tx = A.x + (B.x - A.x) * tp, ty = A.y + (B.y - A.y) * tp;
        g.shadowBlur = 12;
        g.lineWidth = 2.2;
        g.strokeStyle = "rgba(236,254,255,1)";
        zigzag(g, tx, ty, hx, hy, 3.5);
        g.fillStyle = "#ffffff";
        g.beginPath();
        g.arc(hx, hy, 2.4, 0, Math.PI * 2);
        g.fill();
        return true;
      });
      g.shadowBlur = 0;

      rings = rings.filter((r) => {
        const life = r.big ? 650 : 380;
        const age = Math.max(0, (now - r.t0) / life);
        if (age >= 1) return false;
        const ease = 1 - Math.pow(1 - age, 3);
        g.lineWidth = r.big ? 2 : 1.2;
        g.strokeStyle = r.big ? `rgba(196,181,253,${1 - age})` : `rgba(165,243,252,${0.7 * (1 - age)})`;
        g.beginPath();
        g.arc(r.x, r.y, 3 + ease * (r.big ? 70 : 22), 0, Math.PI * 2);
        g.stroke();
        if (r.big) {
          g.strokeStyle = `rgba(103,232,249,${0.6 * (1 - age)})`;
          g.beginPath();
          g.arc(r.x, r.y, 3 + ease * 40, 0, Math.PI * 2);
          g.stroke();
        }
        return true;
      });

      for (const n of nodes) {
        const near = Math.max(0, 1 - Math.hypot(n.x - mouse.x, n.y - mouse.y) / CURSOR);
        const r = 1.5 + near * 1.3 + n.flash * 2.6;
        if (n.flash > 0.05) {
          g.fillStyle = `rgba(236,254,255,${n.flash * 0.35})`;
          g.beginPath();
          g.arc(n.x, n.y, r * 3.2, 0, Math.PI * 2);
          g.fill();
        }
        g.fillStyle = n.flash > 0.3 ? `rgba(255,255,255,${0.6 + n.flash * 0.4})` : `rgba(103,232,249,${0.4 + near * 0.5})`;
        g.beginPath();
        g.arc(n.x, n.y, r, 0, Math.PI * 2);
        g.fill();
      }
    }

    function frame(now) {
      const dt = Math.min(now - last, 50);
      last = now;
      if (now > nextCascade) {
        cascade(Math.floor(Math.random() * nodes.length), 3 + Math.floor(Math.random() * 3), now);
        nextCascade = now + 2600 + Math.random() * 2200;
      }
      if (now > nextChatter) {
        fire(Math.floor(Math.random() * nodes.length), 1, now, { branch: 1 });
        nextChatter = now + 500 + Math.random() * 900;
      }
      draw(dt, now);
      canvas.style.opacity = String(1 - Math.min(window.scrollY / 1100, 0.55));
      raf = requestAnimationFrame(frame);
    }

    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeave = () => { mouse.x = mouse.y = -9999; };
    const onDown = (e) => {
      if (e.target.closest("a,button,input,textarea,video,[role=dialog],[data-no-burst]")) return;
      const i = nearest(e.clientX, e.clientY);
      nodes[i].last = -1e9;
      cascade(i, 5, performance.now());
    };
    const onBurst = (e) => {
      const { x = w / 2, y = h / 3 } = e.detail || {};
      const i = nearest(x, y);
      fire(i, 2, performance.now(), { branch: 2 });
    };
    const onVis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduced) { last = performance.now(); raf = requestAnimationFrame(frame); }
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("neural-burst", onBurst);
    document.addEventListener("visibilitychange", onVis);
    if (!reduced) raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("neural-burst", onBurst);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-300" />;
}

export const burst = (x, y) => window.dispatchEvent(new CustomEvent("neural-burst", { detail: { x, y } }));
