import React, { useState, useEffect, useContext } from "react";
// import { Image } from "@/entities/Image";
// import { User } from "@/entities/User";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { 
    Camera, 
    Search, 
    Images, 
    Upload,
    TrendingUp,
    Calendar,
    Eye,
    Sparkles
} from "lucide-react";
// import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

import StatsCard from "../components/dashboard/stats";
import RecentUploads from "../components/dashboard/RecentUploads";
import Welcome from "../components/dashboard/welcome";

export default function Dashboard() {
    const [images, setImages] = useState([]);

    const {user} =useContext(AuthContext)
    const [userName,setUserName]=useState('')
    const [userEmail,setUserEmail]=useState('')

    useEffect(()=>{
        setUserName(user[0])
        setUserEmail(user[1])
    },[])
    const [isLoading, setIsLoading] = useState(true);
    const totalImages =4

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
                <Welcome userName={userName} totalImages={totalImages} />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatsCard
                        title="Total Images"
                        value={5}
                        // value={totalImages.toString()}
                        icon={Images}
                        gradient="from-blue-500 to-blue-600"
                        description="Images in your vault"
                    />
                    <StatsCard
                        title="This Week"
                        value={3}
                        // value={thisWeekImages.toString()}
                        icon={TrendingUp}
                        gradient="from-emerald-500 to-emerald-600"
                        description="New uploads"
                    />
                    <StatsCard
                        title="Storage Used"
                        value={`30MB`}
                        // value={`${(images.reduce((sum, img) => sum + (img.file_size || 0), 0) / (1024 * 1024)).toFixed(1)}MB`}
                        icon={Calendar}
                        gradient="from-purple-500 to-purple-600"
                        description="Total file size"
                    />
                    <StatsCard
                        title="AI Analyzed"
                        value={3}
                        // value={images.filter(img => img.ai_description).length.toString()}
                        icon={Eye}
                        gradient="from-orange-500 to-orange-600"
                        description="Images with descriptions"
                    />
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        {/* <RecentUploads images={recentUploads} isLoading={isLoading} /> */}
                    </div>

                    <div className="space-y-6">
                        <div className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                            <div className="pb-4">
                                <div className="text-lg font-bold text-slate-900">Quick Actions</div>
                            </div>
                            <div className="space-y-3">
                                <Link to={'/url'} className="block">
                                    <button className="w-full justify-start bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg">
                                        <Upload className="w-4 h-4 mr-3" />
                                        Upload New Images
                                    </button>
                                </Link>
                                <Link to={'/url'} className="block">
                                    <button variant="outline" className="w-full justify-start border-2 hover:bg-slate-50">
                                        <Search className="w-4 h-4 mr-3" />
                                        Search Images
                                    </button>
                                </Link>
                                <Link to={'/url'} className="block">
                                    <button variant="outline" className="w-full justify-start border-2 hover:bg-slate-50">
                                        <Images className="w-4 h-4 mr-3" />
                                        View Gallery
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {totalImages > 0 && (
                            <div className="border-0 shadow-xl bg-gradient-to-br from-slate-50 to-blue-50">
                                <div className="pb-4">
                                    <div className="text-lg font-bold text-slate-900">Pro Tip</div>
                                </div>
                                <div>
                                    <div className="flex items-start gap-3">
                                        <Sparkles className="w-5 h-5 text-blue-500 mt-0.5" />
                                        <div>
                                            <p className="text-sm text-slate-700 font-medium mb-2">
                                                AI-Powered Search
                                            </p>
                                            <p className="text-xs text-slate-600">
                                                Search using natural language like "photos of dogs" or "sunset pictures" to find exactly what you're looking for.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}