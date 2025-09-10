import React, { useState, useEffect } from "react";
import {
    Search as SearchIcon,
    Sparkles,
    X,
    Calendar,
    Eye,
    Zap,
    Image as ImageIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { api } from "../services/api";
import ImageCard from "../components/imagecards/imagecards";
// import RecentSearches from "../components/search/RecentSearches";

export default function SearchPage() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [recentSearches, setRecentSearches] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const { userId } = useContext(AuthContext)

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

        } catch (error) {
            console.error("Search error:", error);
            setResults(null);
        } finally {
            setIsSearching(false);
        }
    };

    const clearSearch = () => {
        setQuery("");
        setResults(null);
        setHasSearched(false);
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <div className="text-center max-w-2xl mx-auto mb-8">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl">
                            <SearchIcon className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">AI Image Search</h1>
                    <p className="text-slate-600 text-lg">
                        Find your images using natural language. Search for objects, scenes, colors, or even emotions.
                    </p>
                </div>

                <div className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm max-w-3xl mx-auto">
                    <div className="p-6">
                        <div className="flex gap-4">
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    placeholder="Search for photos... (e.g., 'dogs playing', 'sunset landscape', 'food on table')"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                    className="pr-10 h-14 text-lg border-2 border-slate-200 focus:border-purple-400 rounded-xl w-full p-3"
                                />
                                {query && (
                                    <button
                                        variant="ghost"
                                        size="icon"
                                        onClick={clearSearch}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                            <button
                                onClick={() => handleSearch()}
                                disabled={!query.trim() || isSearching}
                                size="lg"
                                className="px-8 h-14 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-xl"
                            >
                                {isSearching ? (
                                    <>
                                        <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                                        Searching...
                                    </>
                                ) : (
                                    <>
                                        <SearchIcon className="w-5 h-5 mr-2" />
                                        Search
                                    </>
                                )}
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
                                    variant="outline"
                                    className="cursor-pointer hover:bg-purple-50 hover:border-purple-300 transition-colors border border-gray-300 rounded-full px-2 "
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
            </motion.div>


            {/* SEARCHED RESULT COMPONENT START */}
            {!results &&

                <div className="grid lg:grid-cols-3 gap-8 rounded-lg text-card-foreground border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                    <div className="lg:col-span-3">
                        <div className="flex flex-col items-center text-center py-16 px-6 bg-white">
                            {/* Search Icon */}
                            <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-gray-100">
                                <SearchIcon className="w-8 h-8 text-gray-400" />
                            </div>

                            {/* Heading */}
                            <h2 className="text-2xl font-bold mt-6">Search Your Images</h2>
                            <p className="text-gray-500 max-w-xl mt-2">
                                Use AI-powered search to find exactly what you're looking for in your
                                image collection.
                            </p>

                            {/* Cards */}

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full max-w-5xl">
                                {/* Card 1 */}
                                <div className="bg-blue-50 rounded-xl p-6 text-left shadow-sm hover:shadow-md transition">
                                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-500 text-white mb-4">
                                        <Eye className="w-5 h-5" />
                                    </div>
                                    <h3 className="font-semibold text-lg">Objects & Scenes</h3>
                                    <p className="text-gray-600 text-sm mt-1">
                                        "cats sleeping" or "mountain landscape"
                                    </p>
                                </div>

                                {/* Card 2 */}
                                <div className="bg-purple-50 rounded-xl p-6 text-left shadow-sm hover:shadow-md transition">
                                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-purple-500 text-white mb-4">
                                        <SearchIcon className="w-5 h-5" />
                                    </div>
                                    <h3 className="font-semibold text-lg">Activities</h3>
                                    <p className="text-gray-600 text-sm mt-1">
                                        "people dancing" or "cooking food"
                                    </p>
                                </div>

                                {/* Card 3 */}
                                <div className="bg-green-50 rounded-xl p-6 text-left shadow-sm hover:shadow-md transition">
                                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-500 text-white mb-4">
                                        <Sparkles className="w-5 h-5" />
                                    </div>
                                    <h3 className="font-semibold text-lg">Colors & Moods</h3>
                                    <p className="text-gray-600 text-sm mt-1">
                                        "bright colors" or "peaceful scenes"
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className="lg:col-span-1">
                    <RecentSearches
                        searches={recentSearches}
                        onSearchSelect={(search) => {
                            setQuery(search);
                            handleSearch(search);
                        }}
                        onClearAll={() => {
                            setRecentSearches([]);
                            localStorage.removeItem('recentSearches');
                        }}
                    />
                </div> */}
                </div>
            }



            {results &&
                <div>
                    {/* {results[0].payload.image_name} */}

                    {results.map((val, ind) => {
                        return (
                            <ImageCard src={val.payload.image} title={val.payload.text} date={20} count={3} />
                        )
                    })}

                </div>
            }

            {/* SEARCHED RESULT COMPONENT END */}

            {/* <ImageModal
                image={selectedImage}
                isOpen={!!selectedImage}
                onClose={() => setSelectedImage(null)}
            /> */}
        </div>
    );
}