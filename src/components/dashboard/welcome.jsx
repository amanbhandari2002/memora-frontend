import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Sparkles } from 'lucide-react';

export default function Welcome({ userName, totalImages }) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mb-8"
    >
      <motion.div
        className="relative rounded-3xl p-8 text-white shadow-2xl overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(37,99,235,1) 0%, rgba(147,51,234,1) 50%, rgba(29,78,216,1) 100%)",
        }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      >
        {/* Floating glow circles */}
        <motion.div
          className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full"
          animate={{ y: [0, -20, 0], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full"
          animate={{ y: [0, 20, 0], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center"
            >
              <Camera className="w-6 h-6" />
            </motion.div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                {getGreeting()}, {userName || "there"}!
              </h1>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2 text-white/80 text-sm"
              >
                <Sparkles className="w-4 h-4 animate-pulse text-yellow-300" />
                <span>Your personal AI-powered image vault</span>
              </motion.div>
            </div>
          </div>

          {/* Stats Card */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 max-w-md transition-transform"
          >
            <div className="text-3xl font-bold mb-1">{totalImages}</div>
            <div className="text-white/80 text-sm">
              {totalImages === 0
                ? "Ready to upload your first image?"
                : `Total images in your collection`}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
