import React, { useState, useEffect } from "react";
import { 
    Images, 
    Search, 
    Filter, 
    Grid, 
    List,
    Calendar,
    SortAsc,
    Upload,
    Eye
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Link } from 'react-router-dom';
import Imagecard from "../components/imagecards/imagecards";
import { div } from "framer-motion/client";

// import GalleryGrid from "../components/gallery/GalleryGrid";

export default function Gallery() {
    const [images, setImages] = useState([]);
    const [filteredImages, setFilteredImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("newest");
    const [viewMode, setViewMode] = useState("grid");

    useEffect(() => {
        loadImages();
    }, []);

    useEffect(() => {
        filterAndSortImages();
    }, [images, searchTerm, sortBy]);

    const loadImages = async () => {
        try {
            setIsLoading(true);
            const fetchedImages = await Image.list('-created_date', 1000);
            setImages(fetchedImages);
        } catch (error) {
            console.error("Error loading images:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const filterAndSortImages = () => {
        let filtered = [...images];

        // Filter by search term
        if (searchTerm.trim()) {
            filtered = filtered.filter(image => 
                image.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (image.ai_description && image.ai_description.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (image.tags && image.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
            );
        }

        // Sort images
        filtered.sort((a, b) => {
            switch (sortBy) {
                case "newest":
                    return new Date(b.created_date) - new Date(a.created_date);
                case "oldest":
                    return new Date(a.created_date) - new Date(b.created_date);
                case "filename":
                    return a.filename.localeCompare(b.filename);
                case "size":
                    return (b.file_size || 0) - (a.file_size || 0);
                default:
                    return 0;
            }
        });

        setFilteredImages(filtered);
    };

    if (isLoading) {
        return (
            <div className="p-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {Array(12).fill(0).map((_, i) => (
                        <div key={i} className="animate-pulse">
                            <div className="bg-slate-200 aspect-square rounded-2xl mb-4"></div>
                            <div className="h-4 bg-slate-200 rounded mb-2"></div>
                            <div className="h-3 bg-slate-200 rounded w-2/3"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <Images className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">My Gallery</h1>
                        <p className="text-slate-600">Browse and organize your image collection</p>
                    </div>
                </div>


                {/* Controls */}
                <div className="shadow-xl bg-white/90 backdrop-blur-sm mb-3 rounded-b-[10px] border-0 p-[10px]">
                    <div>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div className="flex items-center gap-4">
                                <div className="relative flex-1 md:w-80">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                                    <input
                                        placeholder="Search by filename, description, or tags..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 border-2 border-slate-200 focus:border-emerald-400 w-full"
                                    />
                                </div>
                                
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="px-4 py-2 border-2 border-slate-200 rounded-lg bg-white focus:border-emerald-400 focus:outline-none"
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="oldest">Oldest First</option>
                                    <option value="filename">By Name</option>
                                    <option value="size">By Size</option>
                                </select>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    variant={viewMode === "grid" ? "default" : "outline"}
                                    size="icon"
                                    onClick={() => setViewMode("grid")}
                                >
                                    <Grid className="w-4 h-4" />
                                </button>
                                <button
                                    variant={viewMode === "list" ? "default" : "outline"}
                                    size="icon"
                                    onClick={() => setViewMode("list")}
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-slate-600">
                                Showing {filteredImages.length} of {images.length} images
                                {searchTerm && ` matching "${searchTerm}"`}
                            </div>
                            {images.length === 0 && (
                                <Link to={"/Upload"}>
                                    <button className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white">
                                        <Upload className="w-4 h-4 mr-2" />
                                        Upload Images
                                    </button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>

            {true? (
                <div className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                    <div className="p-12 text-center">
                        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center">
                            <Images className="w-10 h-10 text-slate-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-3">No Images Yet</h3>
                        <p className="text-slate-600 max-w-md mx-auto mb-8">
                            Start building your gallery by uploading your first images. They'll be automatically analyzed with AI for better searchability.
                        </p>
                        <Link to={"/Upload"}>
                            <button size="lg" className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white shadow-lg">
                                <Upload className="w-5 h-5 mr-2" />
                                Upload Your First Image
                            </button>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="flex justify-between gap-y-[10px] flex-wrap">
                <Imagecard src="https://images.unsplash.com/photo-1530631673369-bc20fdb32288?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" title="temp" date='23' count='3'/>
                <Imagecard src="https://images.unsplash.com/photo-1530631673369-bc20fdb32288?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" title="temp" date='23' count='3'/>
                <Imagecard src="https://images.unsplash.com/photo-1530631673369-bc20fdb32288?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" title="temp" date='23' count='3'/>
                <Imagecard src="https://images.unsplash.com/photo-1530631673369-bc20fdb32288?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" title="temp" date='23' count='3'/>
                <Imagecard src="https://images.unsplash.com/photo-1530631673369-bc20fdb32288?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" title="temp" date='23' count='3'/>

                </div>
                // <GalleryGrid 
                //     images={filteredImages}
                //     viewMode={viewMode}
                //     onImageClick={setSelectedImage}
                // />
            )}
{/* 
            <ImageModal
                image={selectedImage}
                isOpen={!!selectedImage}
                onClose={() => setSelectedImage(null)}
            /> */}
        </div>
    );
}