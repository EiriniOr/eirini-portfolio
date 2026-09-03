import { motion } from "framer-motion";

// Fixed layout, not physics-simulated — a hand-placed node graph rather than
// a random hairball, evoking the force-directed graphs from the MrGraph
// project. Nodes pulse gently; a handful of edges carry a traveling "data
// pulse" dot to suggest an active agentic pipeline rather than static decor.
const NODES = [
  [60, 60], [140, 140], [90, 220], [200, 80], [260, 200], [180, 300],
  [340, 60], [400, 160], [370, 280], [500, 100], [560, 220], [620, 60],
  [680, 180], [750, 100], [820, 200], [700, 300], [450, 320], [120, 40],
];

const EDGES = [
  [0, 1], [1, 2], [0, 3], [3, 4], [1, 4], [4, 5], [3, 6], [6, 7], [7, 8],
  [4, 8], [6, 9], [9, 10], [9, 11], [11, 12], [10, 13], [12, 14], [13, 14],
  [14, 15], [12, 15], [8, 16], [15, 16], [2, 5],
];

const PULSE_EDGES = [0, 4, 8, 12, 16, 20];

export default function NetworkGraph({ className = "" }) {
  return (
    <svg
      viewBox="0 0 900 380"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
    >
      {EDGES.map(([a, b], i) => {
        const [x1, y1] = NODES[a];
        const [x2, y2] = NODES[b];
        return (
          <line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#22d3ee"
            strokeWidth="1"
            strokeOpacity="0.16"
          />
        );
      })}

      {PULSE_EDGES.map((edgeIdx, i) => {
        const [a, b] = EDGES[edgeIdx];
        const [x1, y1] = NODES[a];
        const [x2, y2] = NODES[b];
        return (
          <motion.circle
            key={`pulse-${i}`}
            r="2.5"
            fill="#a78bfa"
            initial={{ cx: x1, cy: y1, opacity: 0 }}
            animate={{ cx: [x1, x2, x1], cy: [y1, y2, y1], opacity: [0, 0.9, 0] }}
            transition={{
              duration: 5 + (i % 3),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.4,
            }}
          />
        );
      })}

      {NODES.map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x} cy={y} r="3.2"
          fill="#22d3ee"
          initial={{ opacity: 0.35 }}
          animate={{ opacity: [0.35, 0.85, 0.35] }}
          transition={{
            duration: 3.5 + (i % 4),
            repeat: Infinity,
            ease: "easeInOut",
            delay: (i * 0.37) % 4,
          }}
        />
      ))}
    </svg>
  );
}
