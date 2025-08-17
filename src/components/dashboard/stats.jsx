import React from 'react';
import { motion } from 'framer-motion';


export default function StatsCard({ title, value, icon: Icon, gradient, description }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
        >
            <div className="border-0 shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5`}></div>
                <div className="p-6 relative z-10">
                    <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}>
                            <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-slate-900">{value}</div>
                            <div className="text-sm font-semibold text-slate-700">{title}</div>
                        </div>
                    </div>
                    <div className="text-xs text-slate-500">{description}</div>
                </div>
            </div>
        </motion.div>
    );
}