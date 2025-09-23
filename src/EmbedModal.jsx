import { motion } from "framer-motion";

export default function EmbedModal({ open, onClose, src }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}}
        className="w-full max-w-5xl bg-white rounded-2xl overflow-hidden shadow-xl">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="font-semibold">Interactive dashboard</div>
          <button className="text-sm underline" onClick={onClose}>Close</button>
        </div>
        <div className="aspect-video">
          <iframe title="Embedded"
            src={src}
            width="100%" height="100%" style={{border:0}}
            allowFullScreen />
        </div>
      </motion.div>
    </div>
  );
}
