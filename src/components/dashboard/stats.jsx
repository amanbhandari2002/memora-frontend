import React from "react";
import { motion } from "framer-motion";

export default function StatsCard({
  title,
  value,
  icon: Icon,
  gradient,
  description,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/80 backdrop-blur-lg shadow-lg hover:shadow-2xl transition">
        {/* Subtle gradient overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10`}
        ></div>

        <div className="relative z-10 p-6">
          <div className="flex items-start justify-between mb-4">
            {/* Icon with glowing pulse */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}
            >
              <Icon className="w-6 h-6 text-white" />
            </motion.div>

            {/* Value & Title */}
            <div className="text-right">
              <motion.div
                key={value} // re-animate when value changes
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-extrabold text-slate-900"
              >
                {value}
              </motion.div>
              <div className="text-sm font-semibold text-slate-700">
                {title}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="text-xs text-slate-500">{description}</div>
        </div>
      </div>
    </motion.div>
  );
}
