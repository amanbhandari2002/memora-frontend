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
    Eye,
    Download,
    Share,
    Heart,
    X
} from "lucide-react";
import { Link } from 'react-router-dom';
import { api } from "../services/api";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// Image Modal Component
const ImageModal = ({ image, isOpen, onClose }) => {
    if (!isOpen || !image) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div 
                className="relative max-w-4xl max-h-[90vh] w-full"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10 bg-white/10 backdrop-blur-sm rounded-full p-2"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <div className="relative">
                        <img
                            src={image.image}
                            alt={image.title || "Gallery image"}
                            className="w-full h-auto max-h-[70vh] object-contain bg-gray-50"
                        />
                        
                        <div className="absolute top-4 right-4 flex gap-2">
                            <button className="bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-105">
                                <Heart className="w-5 h-5" />
                            </button>
                            <button className="bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-105">
                                <Share className="w-5 h-5" />
                            </button>
                            <button className="bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-105">
                                <Download className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">{image.title || "Untitled"}</h3>
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {image.date || "Unknown date"}
                            </span>
                            <span>Resolution: 1920x1080</span>
                            <span>Size: 2.4 MB</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Enhanced Image Card Component
const Imagecard = ({ src, title, date, count, onClick }) => (
    <div 
        className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer transform hover:-translate-y-1"
        onClick={onClick}
    >
        <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 relative overflow-hidden">
            <img 
                src={src} 
                alt={title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/95 backdrop-blur-sm rounded-full p-3 shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <Eye className="w-6 h-6 text-gray-700" />
                </div>
            </div>
        </div>
        <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{title}</h3>
            <div className="flex items-center justify-between text-sm text-gray-500">
                <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {date}
                </span>
                <span className="bg-gradient-to-r from-emerald-100 to-blue-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-medium">
                    +{count}
                </span>
            </div>
        </div>
    </div>
);

const ImageListItem = ({ src, title, date, count, onClick }) => (
    <div 
        className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer hover:scale-[1.01]"
        onClick={onClick}
    >
        <div className="flex items-center p-4 gap-4">
            {/* Thumbnail */}
            <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 flex-shrink-0">
                <img 
                    src={src} 
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-lg mb-1 truncate">{title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {date}
                    </span>
                    <span>1920 x 1080</span>
                    <span>2.4 MB</span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
                <span className="bg-gradient-to-r from-emerald-100 to-blue-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                    +{count} more
                </span>
                
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            // Handle favorite
                        }}
                    >
                        <Heart className="w-4 h-4" />
                    </button>
                    <button 
                        className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            // Handle share
                        }}
                    >
                        <Share className="w-4 h-4" />
                    </button>
                    <button 
                        className="p-2 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded-lg transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            // Handle download
                        }}
                    >
                        <Download className="w-4 h-4" />
                    </button>
                </div>

                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                    <Eye className="w-4 h-4 text-emerald-600" />
                </div>
            </div>
        </div>
    </div>
);


export default function Gallery() {
    const [images, setImages] = useState([]);
    const [filteredImages, setFilteredImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("newest");
    const [viewMode, setViewMode] = useState("grid");
    const { userId } = useContext(AuthContext)
    const [allImages, setAllImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await api.get("/memories/getUserAllMemory", {
                    params: { user_id: userId }
                });
                setAllImages(response.data.userMemory)
                setIsLoading(false)
            } catch (err) {
                console.log("dafak--", err);
            }
        };
        fetchImages();
    }, [userId]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-blue-50">
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
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-blue-50">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-32 w-80 h-80 bg-emerald-200 rounded-full opacity-10 blur-3xl" />
                <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-blue-200 rounded-full opacity-10 blur-3xl" />
            </div>

            <div className="relative z-10 p-6 max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="relative">
                            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl">
                                <Images className="w-8 h-8 text-white" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-bold">{allImages.length}</span>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-emerald-800 to-blue-800 bg-clip-text text-transparent">
                                My Gallery
                            </h1>
                            <p className="text-gray-600 text-lg">Browse and organize your image collection</p>
                        </div>
                    </div>

                    {/* Enhanced Controls */}
                    <div className="relative group mb-6">
                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity"></div>
                        
                        <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6">
                            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
                                    <div className="relative w-full sm:w-80">
                                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            placeholder="Search by filename, description, or tags..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-12 pr-4 h-12 text-base border-2 border-gray-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 rounded-xl w-full bg-gray-50/50 transition-all duration-300"
                                        />
                                    </div>

                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="px-4 py-3 h-12 border-2 border-gray-200 rounded-xl bg-gray-50/50 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 focus:outline-none transition-all duration-300 min-w-[140px]"
                                    >
                                        <option value="newest">Newest First</option>
                                        <option value="oldest">Oldest First</option>
                                        <option value="filename">By Name</option>
                                        <option value="size">By Size</option>
                                    </select>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
                                        <button
                                            className={`p-2 rounded-lg transition-all duration-200 ${
                                                viewMode === "grid" 
                                                ? "bg-white shadow-sm text-emerald-600" 
                                                : "text-gray-500 hover:text-gray-700"
                                            }`}
                                            onClick={() => setViewMode("grid")}
                                        >
                                            <Grid className="w-4 h-4" />
                                        </button>
                                        <button
                                            className={`p-2 rounded-lg transition-all duration-200 ${
                                                viewMode === "list" 
                                                ? "bg-white shadow-sm text-emerald-600" 
                                                : "text-gray-500 hover:text-gray-700"
                                            }`}
                                            onClick={() => setViewMode("list")}
                                        >
                                            <List className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {allImages.length === 0 && (
                                        <button className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 hover:scale-105">
                                            <Upload className="w-4 h-4 mr-2 inline" />
                                            Upload Images
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Stats Row */}
                            <div className="mt-4 pt-4 border-t border-gray-100">
                                <div className="flex items-center justify-between text-sm">
                                    <div className="text-gray-600">
                                        Showing <span className="font-semibold text-emerald-600">{allImages.length}</span> of {allImages.length} images
                                        {searchTerm && (
                                            <span className="ml-1">
                                                matching "<span className="font-medium text-blue-600">{searchTerm}</span>"
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-4 text-gray-500">
                                        <span>Total size: 156.7 MB</span>
                                        <span>Last updated: Today</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Gallery Content */}
                {allImages.length === 0 ? (
                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
                        <div className="p-16 text-center">
                            <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-3xl flex items-center justify-center">
                                <Images className="w-12 h-12 text-emerald-600" />
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-4">No Images Yet</h3>
                            <p className="text-gray-600 max-w-md mx-auto mb-10 text-lg leading-relaxed">
                                Start building your gallery by uploading your first images. They'll be automatically analyzed with AI for better searchability.
                            </p>
                            <Link to={'/Upload'}>
                            <button className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 hover:scale-105">
                                <Upload className="w-5 h-5 mr-2 inline" />
                                Upload Your First Image
                            </button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className={viewMode === "grid" 
                        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        : "space-y-4"
                    }>
                        {allImages.map((image, ind) => (
                            viewMode === "grid" ? (
                                <Imagecard 
                                    key={ind}
                                    src={image.image} 
                                    title={image.title || "Untitled"} 
                                    date="23 days ago" 
                                    count="3"
                                    onClick={() => setSelectedImage(image)}
                                />
                            ) : (
                                <ImageListItem
                                    key={ind}
                                    src={image.image} 
                                    title={image.title || "Untitled"} 
                                    date="23 days ago" 
                                    count="3"
                                    onClick={() => setSelectedImage(image)}
                                />
                            )
                        ))}
                    </div>
                )}

                {/* Image Modal */}
                <ImageModal
                    image={selectedImage}
                    isOpen={!!selectedImage}
                    onClose={() => setSelectedImage(null)}
                />
            </div>
        </div>
    );
}