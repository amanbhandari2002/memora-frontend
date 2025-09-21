import React, { useState, useEffect } from "react";
import {
    Search,
    Sparkles,
    X,
    Calendar,
    Eye,
    Zap,
    Image,
    Download,
    Share,
    Heart
} from "lucide-react";
import { api } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

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
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10 bg-white/10 backdrop-blur-sm rounded-full p-2"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Modal content */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <div className="relative">
                        <img
                            src={image.payload.image}
                            alt={image.payload.text}
                            className="w-full h-auto max-h-[70vh] object-contain bg-gray-50"
                        />
                        
                        {/* Action buttons overlay */}
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

                    {/* Image details */}
                    <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">{image.payload.text}</h3>
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                20 days ago
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

const ImageCard = ({ src, title, date, count, onClick }) => (
    <div 
        className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 mb-6 cursor-pointer"
        onClick={onClick}
    >
        <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 relative overflow-hidden">
            <img 
                src={src} 
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* View overlay on hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
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
                <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                    +{count}
                </span>
            </div>
        </div>
    </div>
);

export default function SearchPage() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [recentSearches, setRecentSearches] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const { userId } = useContext(AuthContext) // Keeping your context usage

    useEffect(() => {
        const saved = localStorage.getItem('recentSearches');
        if (saved) {
            setRecentSearches(JSON.parse(saved));
        }
    }, []);

    const saveSearch = (searchQuery) => {
        const updated = [
            searchQuery,
            ...recentSearches.filter(s => s !== searchQuery)
        ].slice(0, 5);
        setRecentSearches(updated);
        localStorage.setItem('recentSearches', JSON.stringify(updated));
    };

    const handleSearch = async (searchQuery = query) => {
        if (!searchQuery.trim()) return;

        setIsSearching(true);
        setHasSearched(true);
        try {
            const response = await api.post('/memories/searchUserQuery', { user_id: userId, query: query })
            setResults(response.data.results)
            setIsSearching(false)

        } catch (error) {
            console.error("Search error:", error);
            setResults(null);
            setIsSearching(false);
        }
    };

    const clearSearch = () => {
        setQuery("");
        setResults(null);
        setHasSearched(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-32 w-80 h-80 bg-purple-200 rounded-full opacity-10 blur-3xl" />
                <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-blue-200 rounded-full opacity-10 blur-3xl" />
            </div>

            <div className="relative z-10 p-6 max-w-7xl mx-auto">
                <div className="mb-8">
                    <div className="text-center max-w-2xl mx-auto mb-8">
                        <div className="flex justify-center mb-6">
                            <div className="relative">
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl">
                                    <Search className="w-8 h-8 text-white" />
                                </div>
                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                                    <Sparkles className="w-2 h-2 text-white" />
                                </div>
                            </div>
                        </div>
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-gray-900 bg-clip-text text-transparent mb-4">
                            AI Image Search
                        </h1>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Find your images using natural language. Search for objects, scenes, colors, or even emotions.
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity"></div>
                            
                            <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-6">
                                <div className="flex gap-4">
                                    <div className="flex-1 relative">
                                        <input
                                            type="text"
                                            placeholder="Search for photos... (e.g., 'dogs playing', 'sunset landscape', 'food on table')"
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                            className="pr-10 h-14 text-lg border-2 border-slate-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 rounded-xl w-full p-3 bg-gray-50/50 transition-all duration-300"
                                        />
                                        {query && (
                                            <button
                                                onClick={clearSearch}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 
                                                         rounded-full p-1.5 bg-gradient-to-r from-purple-400/60 to-pink-400/70 border-none"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => handleSearch()}
                                        disabled={!query.trim() || isSearching}
                                        className={`group relative px-8 h-14 rounded-xl font-semibold 
                                                  text-white shadow-lg shadow-purple-500/30 
                                                  transition-all duration-300 ease-out overflow-hidden
                                                  ${!query.trim() || isSearching 
                                                    ? "opacity-50 cursor-not-allowed bg-gray-400" 
                                                    : "hover:scale-[1.02] active:scale-[0.98]"}`}
                                    >
                                        <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 group-hover:from-purple-700 group-hover:to-pink-700 transition-all"></span>
                                        <span className="absolute -inset-[2px] rounded-xl bg-gradient-to-r from-purple-400/30 to-pink-400/30 blur-lg opacity-0 group-hover:opacity-100 transition-all"></span>
                                        <span className="relative flex items-center justify-center gap-2">
                                            {isSearching ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    Searching...
                                                </>
                                            ) : (
                                                <>
                                                    <Search className="w-5 h-5" />
                                                    Search
                                                </>
                                            )}
                                        </span>
                                    </button>
                                </div>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                        <Zap className="w-4 h-4 text-amber-500" />
                                        <span className="font-medium">Try:</span>
                                    </div>
                                    {['dogs or cats', 'people smiling', 'food photos', 'nature scenes', 'city buildings'].map((suggestion) => (
                                        <div
                                            key={suggestion}
                                            className="cursor-pointer hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 border border-gray-300 rounded-full px-3 py-1 text-sm bg-white"
                                            onClick={() => {
                                                setQuery(suggestion);
                                                handleSearch(suggestion);
                                            }}
                                        >
                                            {suggestion}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Your existing results logic - just enhanced styling */}
                {!results && (
                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
                        <div className="p-12">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-20 h-20 flex items-center justify-center rounded-3xl bg-gradient-to-br from-purple-100 to-pink-100 mb-8">
                                    <Search className="w-10 h-10 text-purple-600" />
                                </div>

                                <h2 className="text-3xl font-bold mb-4 text-gray-900">Search Your Images</h2>
                                <p className="text-gray-600 max-w-2xl mb-12 text-lg leading-relaxed">
                                    Use AI-powered search to find exactly what you're looking for in your
                                    image collection.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
                                    <div className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                                        <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-blue-500 text-white mb-6 group-hover:scale-110 transition-transform">
                                            <Eye className="w-6 h-6" />
                                        </div>
                                        <h3 className="font-bold text-xl text-gray-900 mb-3">Objects & Scenes</h3>
                                        <p className="text-gray-600 text-sm">
                                            "cats sleeping" or "mountain landscape"
                                        </p>
                                    </div>

                                    <div className="group bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                                        <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-purple-500 text-white mb-6 group-hover:scale-110 transition-transform">
                                            <Search className="w-6 h-6" />
                                        </div>
                                        <h3 className="font-bold text-xl text-gray-900 mb-3">Activities</h3>
                                        <p className="text-gray-600 text-sm">
                                            "people dancing" or "cooking food"
                                        </p>
                                    </div>

                                    <div className="group bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                                        <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-green-500 text-white mb-6 group-hover:scale-110 transition-transform">
                                            <Sparkles className="w-6 h-6" />
                                        </div>
                                        <h3 className="font-bold text-xl text-gray-900 mb-3">Colors & Moods</h3>
                                        <p className="text-gray-600 text-sm">
                                            "bright colors" or "peaceful scenes"
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Your existing results display - keeping exact same logic */}
                {results && (
                    <div className="space-y-6">
                        {/* Results header */}
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                                        <Search className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">Search Results</h2>
                                        <p className="text-gray-600">Found {results.length} matching images</p>
                                    </div>
                                </div>
                                <button
                                    onClick={clearSearch}
                                    className="px-4 py-2 hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 rounded-xl font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:text-white"
                                >
                                    New Search
                                </button>
                            </div>
                        </div>

                        {/* Results grid with modal functionality */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {results.map((val, ind) => (
                                <ImageCard 
                                    key={ind}
                                    src={val.payload.image} 
                                    title={val.payload.text} 
                                    date={20} 
                                    count={3}
                                    onClick={() => setSelectedImage(val)}
                                />
                            ))}
                        </div>
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