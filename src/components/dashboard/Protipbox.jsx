import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function MemoryFinderCard({ enabled, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      className="bg-white rounded-xl shadow-md p-5 flex flex-col gap-3"
    >
      {/* Header Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-500" />
          <h3 className="text-base font-semibold text-slate-800">
            Memory Finder
          </h3>
        </div>

        {/* Toggle Switch */}
        <button
          onClick={onToggle}
          className={`w-10 h-5 flex items-center rounded-full transition-colors ${
            enabled ? "bg-blue-600" : "bg-gray-300"
          }`}
        >
          <span
            className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
              enabled ? "translate-x-5" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-500">
        Describe the moment, not just the photo — like{" "}
        <span className="italic text-slate-600">"Trip to Goa 2023"</span>.
      </p>
    </motion.div>
  );
}
