import {react, useState, useContext, useEffect} from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

import { 
    Search, 
    Upload, 
    Images, 
    LayoutDashboard,
    LogOut,
    Camera,
    Sparkles
} from "lucide-react";
// import { User } from "@/entities/User";

const navigationItems = [
    {
        title: "Dashboard",
        url: "/Dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Upload Images",
        url: "/Upload",
        icon: Upload,
    },
    {
        title: "Search Images",
        url: "/Search",
        icon: Search,
    },
    {
        title: "My Gallery",
        url: "/Gallery",
        icon: Images,
    },
];

export default function Layout({ children, currentPageName }) {
    const location = useLocation();
    const {logout,user} =useContext(AuthContext)
    const [userName,setUserName]=useState('')
    const [userEmail,setUserEmail]=useState('')

    useEffect(()=>{
        setUserName(user[0])
        setUserEmail(user[1])
    },[])
    console.log('---sdd',userName)

    // React.useEffect(() => {
    //     const loadUser = async () => {
    //         try {
    //             const currentUser = await User.me();
    //             setUser(currentUser);
    //         } catch (error) {
    //             setUser(null);
    //         }
    //     };
    //     loadUser();
    // }, []);

    const handleLogout = async () => {
        logout()
    };

    return (
        <div>
            <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-white to-blue-50">
                <div className="border-none shadow-xl bg-white/80 backdrop-blur-xl">
                    <div className="border-b border-slate-200/60 p-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                <Camera className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h2 className="font-bold text-slate-900 text-lg">ImageVault</h2>
                                <p className="text-xs text-slate-500 font-medium">AI-Powered Search</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4">
                        <div>
                            <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider px-2 py-3">
                                Navigation
                            </div>
                            <div>
                                <div className="space-y-1">
                                    {navigationItems.map((item) => (
                                        <div key={item.title}>
                                            <div 
                                                asChild 
                                                className={`hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 rounded-xl mb-1 font-medium ${
                                                    location.pathname === item.url 
                                                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:text-white' 
                                                        : ''
                                                }`}
                                            >
                                                <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                                                    <item.icon className="w-5 h-5" />
                                                    <span>{item.title}</span>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-slate-200/60 p-4">
                        {user ? (
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center">
                                        <span className="text-white font-semibold text-sm">
                                            {userName || userEmail || 'U'}
                                        </span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-slate-900 text-sm truncate">
                                            {userName || 'User'}
                                        </p>
                                        <p className="text-xs text-slate-500 truncate">{userEmail}</p>
                                    </div>
                                </div>
                                <button
                                    variant="outline"
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-2 border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <button
                                // onClick={() => console.log("here bro---")}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                            >
                                <Sparkles className="w-4 h-4 mr-2" />
                                Sign In
                            </button>
                        )}
                    </div>
                </div>

                <main className="flex-1 flex flex-col">
                    <header className="bg-white/70 backdrop-blur-xl border-b border-slate-200/60 px-6 py-4 md:hidden shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="hover:bg-slate-100 p-2 rounded-lg transition-colors duration-200" />
                            <div className="flex items-center gap-2">
                                <Camera className="w-5 h-5 text-blue-600" />
                                <h1 className="text-lg font-bold text-slate-900">ImageVault</h1>
                            </div>
                        </div>
                    </header>

                    <div className="flex-1 overflow-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}