import React from "react";
import { Link } from "react-router-dom";
import { Upload, Search, Images } from "lucide-react";
import { motion } from "framer-motion";

const actions = [
  {
    title: "Upload New Images",
    description: "Add photos from your device",
    icon: Upload,
    link: "/upload",
    gradient: "from-blue-500 to-purple-600",
  },
  {
    title: "Search Images",
    description: "Find photos with AI-powered search",
    icon: Search,
    link: "/search",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    title: "View Gallery",
    description: "Browse all your uploaded images",
    icon: Images,
    link: "/gallery",
    gradient: "from-orange-500 to-pink-600",
  },
];

export default function QuickActions() {
  return (
    <div className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl p-6">
      <div className="pb-4">
        <div className="text-lg font-bold text-slate-900">Quick Actions</div>
      </div>
      <div className="grid gap-4">
        {actions.map((action, idx) => (
          <Link to={action.link} key={idx}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden rounded-xl"
            >
              {/* gradient background glow on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 hover:opacity-10 transition-opacity duration-300`}
              ></div>

              <div className="relative flex items-center gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer border">
                <div
                  className={`p-3 rounded-lg bg-gradient-to-br ${action.gradient} shadow-md`}
                >
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-medium text-slate-800">{action.title}</div>
                  <div className="text-xs text-slate-500">{action.description}</div>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
