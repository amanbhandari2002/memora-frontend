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
            className="mb-8"
        >
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 rounded-3xl p-8 text-white shadow-2xl overflow-hidden relative">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full transform translate-x-32 -translate-y-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full transform -translate-x-24 translate-y-24"></div>
                
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                            <Camera className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold">
                                {getGreeting()}, {userName|| 'there'}!
                            </h1>
                            <div className="flex items-center gap-2 text-white/80 text-sm">
                                <Sparkles className="w-4 h-4" />
                                <span>Your personal AI-powered image vault</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 max-w-md">
                        <div className="text-3xl font-bold mb-1">{totalImages}</div>
                        <div className="text-white/80 text-sm">
                            {totalImages === 0 
                                ? "Ready to upload your first image?" 
                                : `Total images in your collection`
                            }
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}