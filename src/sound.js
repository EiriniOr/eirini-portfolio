import { useSyncExternalStore } from "react";
import { track } from "./analytics";

// Per-file gains balance the ElevenLabs output loudness (measured with ffmpeg volumedetect).
const SFX = {
  click: 0.35,
  toggle: 0.35,
  open: 0.18,
  close: 0.18,
  boot: 0.3,
  hover: 0.12,
  palette: 0.28,
};
const AMBIENT_GAIN = 0.09;
const STORE_KEY = "eo-sound";

let ctx = null;
let master = null;
let sfxBus = null;
let ambientGain = null;
let ambientSrc = null;
const buffers = {};
let loading = null;

const state = { enabled: readStored("on"), ambient: readStored("ambient", true) };
const listeners = new Set();

function readStored(field, fallback = false) {
  try {
    const v = JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
    return field in v ? !!v[field] : fallback;
  } catch {
    return fallback;
  }
}

function persist() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify({ on: state.enabled, ambient: state.ambient }));
  } catch {}
}

function emit() {
  snapshot = { ...state };
  listeners.forEach((l) => l());
}
let snapshot = { ...state };

function ensureContext() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = playingMedia.size ? 0 : 1;
    master.connect(ctx.destination);
    const lowpass = (hz) => {
      const f = ctx.createBiquadFilter();
      f.type = "lowpass";
      f.frequency.value = hz;
      f.Q.value = 0.5;
      return f;
    };
    sfxBus = lowpass(3200);
    sfxBus.connect(master);
    ambientGain = ctx.createGain();
    ambientGain.gain.value = 0;
    const ambientFilter = lowpass(1400);
    ambientGain.connect(ambientFilter);
    ambientFilter.connect(master);
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

function load() {
  if (loading) return loading;
  const names = [...Object.keys(SFX), "ambient"];
  loading = Promise.all(
    names.map(async (n) => {
      try {
        const res = await fetch(`/sfx/${n}.mp3`);
        buffers[n] = await ctx.decodeAudioData(await res.arrayBuffer());
      } catch {}
    })
  );
  return loading;
}

function startAmbient() {
  if (!ctx || !buffers.ambient || ambientSrc) return;
  ambientSrc = ctx.createBufferSource();
  ambientSrc.buffer = buffers.ambient;
  ambientSrc.loop = true;
  ambientSrc.connect(ambientGain);
  ambientSrc.start();
  ambientGain.gain.cancelScheduledValues(ctx.currentTime);
  ambientGain.gain.setTargetAtTime(AMBIENT_GAIN, ctx.currentTime, 1.2);
}

function stopAmbient() {
  if (!ctx || !ambientSrc) return;
  const src = ambientSrc;
  ambientSrc = null;
  ambientGain.gain.cancelScheduledValues(ctx.currentTime);
  ambientGain.gain.setTargetAtTime(0, ctx.currentTime, 0.4);
  src.stop(ctx.currentTime + 2);
}

async function activate() {
  if (!ensureContext()) return;
  await load();
  if (state.enabled && state.ambient) startAmbient();
}

export function play(name, { rate = 1, gain = 1, pan = 0 } = {}) {
  if (!state.enabled || !ctx || !buffers[name] || playingMedia.size) return;
  const src = ctx.createBufferSource();
  src.buffer = buffers[name];
  src.playbackRate.value = rate;
  const g = ctx.createGain();
  const t = ctx.currentTime;
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime((SFX[name] ?? 0.3) * gain, t + 0.02);
  let node = src.connect(g);
  if (pan && ctx.createStereoPanner) {
    const p = ctx.createStereoPanner();
    p.pan.value = Math.max(-1, Math.min(1, pan));
    node = node.connect(p);
  }
  node.connect(sfxBus);
  src.start();
}

// Any audible <video>/<audio> on the page silences site sound until it pauses or ends.
const playingMedia = new Set();

function applyDuck() {
  if (!ctx || !master) return;
  master.gain.cancelScheduledValues(ctx.currentTime);
  master.gain.setTargetAtTime(playingMedia.size ? 0 : 1, ctx.currentTime, 0.12);
}

export async function setSound(on) {
  track("sound_toggle", { on });
  state.enabled = on;
  persist();
  emit();
  if (on) {
    await activate();
    play("toggle");
  } else {
    stopAmbient();
  }
}

export function setAmbient(on) {
  state.ambient = on;
  persist();
  emit();
  if (on && state.enabled) startAmbient();
  else stopAmbient();
}

// Browsers block audio until a user gesture; a returning visitor who left
// sound on gets it resumed on their first interaction.
if (typeof window !== "undefined") {
  const resume = () => {
    if (state.enabled) activate();
    window.removeEventListener("pointerdown", resume);
    window.removeEventListener("keydown", resume);
  };
  window.addEventListener("pointerdown", resume);
  window.addEventListener("keydown", resume);

  const track = (e) => {
    const el = e.target;
    if (!(el instanceof HTMLMediaElement)) return;
    if (!el.paused && !el.ended && !el.muted && el.volume > 0) playingMedia.add(el);
    else playingMedia.delete(el);
    applyDuck();
  };
  for (const type of ["play", "playing", "pause", "ended", "emptied", "volumechange"]) {
    document.addEventListener(type, track, true);
  }

  // Every option (link, button, tab) sounds on hover and click. Mouse only for hover,
  // so touch taps don't double up; elements with data-nosfx opt out.
  const OPTION = "a[href], button, [role=tab], [role=button]";
  let hovered = null;
  let lastHover = 0;
  document.addEventListener("pointerover", (e) => {
    if (e.pointerType !== "mouse") return;
    const el = e.target.closest?.(OPTION);
    if (!el || el === hovered || el.closest("[data-nosfx]")) {
      if (!el) hovered = null;
      return;
    }
    hovered = el;
    const now = performance.now();
    if (now - lastHover < 70) return;
    lastHover = now;
    play("hover");
  });
  document.addEventListener("click", (e) => {
    const el = e.target.closest?.(OPTION);
    if (el && !el.closest("[data-nosfx]")) play("click");
  }, true);
  document.addEventListener("visibilitychange", () => {
    if (!ctx) return;
    if (document.hidden) ctx.suspend();
    else if (state.enabled) ctx.resume();
  });
}

export function useSound() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => snapshot
  );
}
