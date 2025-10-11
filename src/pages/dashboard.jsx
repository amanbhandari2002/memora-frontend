import React, { useState, useEffect, useContext } from "react";
// import { Image } from "@/entities/Image";
// import { User } from "@/entities/User";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
    Camera,
    Images,
    TrendingUp,
    Calendar,
    Eye,
} from "lucide-react";
// import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import QuickActions from "../components/dashboard/Quickactions";

import StatsCard from "../components/dashboard/stats";
import RecentUploads from "../components/dashboard/RecentUploads";
import Welcome from "../components/dashboard/welcome";
import ProTipBox from "../components/dashboard/Protipbox";
import { api } from "../services/api";

export default function Dashboard() {
    const [images, setImages] = useState([]);

    const { user, userId } = useContext(AuthContext)
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [totalimages, setTotalImages] = useState(0)
    const [totalStorageUsed, setTotalStorageUsed] = useState(0)
    const [imageUploadThisweek, setImageUploadThisWeek] = useState(0)

    useEffect(() => {
        setUserName(user[0])
        setUserEmail(user[1])
    }, [])

    useEffect(() => {
        if (!userId) {
            return
        }
        const fetchAnalytics = async () => {
            const response = await api.get('/memories/analytics', {
                params: { user_id: userId }
            })
            const data = response.data;

            setTotalImages(data.totalImageCount || 0);
            setTotalStorageUsed(data.totalStorageUsed || 0);
            setImageUploadThisWeek(data.imageUploadThisweek || 0);
        }

        fetchAnalytics();

    }, [])
    const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //     loadData();
    // }, []);

    // const loadData = async () => {
    //     try {
    //         setIsLoading(true);
    //         const [fetchedImages, currentUser] = await Promise.all([
    //             Image.list('-created_date', 50),
    //             User.me().catch(() => null)
    //         ]);
    //         setImages(fetchedImages);
    //         setUser(currentUser);
    //     } catch (error) {
    //         console.error("Error loading dashboard data:", error);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    // const totalImages = images.length;
    // const thisWeekImages = images.filter(img => {
    //     const weekAgo = new Date();
    //     weekAgo.setDate(weekAgo.getDate() - 7);
    //     return new Date(img.created_date) > weekAgo;
    // }).length;

    // const recentUploads = images.slice(0, 6);

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6">
                <div className="text-center max-w-md">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                        <Camera className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-4">Welcome to ImageVault</h1>
                    <p className="text-slate-600 mb-8">
                        Upload your images and search through them using AI-powered descriptions.
                    </p>
                    {/* <Button
                        onClick={() => User.login()}
                        size="lg"
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg px-8"
                    >
                        <Sparkles className="w-5 h-5 mr-2" />
                        Get Started
                    </Button> */}
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-8">
            <div className="max-w-7xl mx-auto">
                <Welcome userName={userName} totalImages={totalimages} />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatsCard
                        title="Total Images"
                        value={totalimages}
                        // value={totalImages.toString()}
                        icon={Images}
                        gradient="from-blue-500 to-blue-600"
                        description="Images in your vault"
                    />
                    <StatsCard
                        title="This Week"
                        value={imageUploadThisweek}
                        // value={thisWeekImages.toString()}
                        icon={TrendingUp}
                        gradient="from-emerald-500 to-emerald-600"
                        description="New uploads"
                    />
                    <StatsCard
                        title="Storage Used"
                        value={totalStorageUsed}
                        // value={`${(images.reduce((sum, img) => sum + (img.file_size || 0), 0) / (1024 * 1024)).toFixed(1)}MB`}
                        icon={Calendar}
                        gradient="from-purple-500 to-purple-600"
                        description="Total file size"
                    />
                    <StatsCard
                        title="AI Analyzed"
                        value={totalimages}
                        // value={images.filter(img => img.ai_description).length.toString()}
                        icon={Eye}
                        gradient="from-orange-500 to-orange-600"
                        description="Images with descriptions"
                    />
                </div>

                <div className="">
                    <div className="">
                        <QuickActions />
                        {totalimages > 0 && (
                            <ProTipBox />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}