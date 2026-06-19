import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, MessageSquare, Search } from 'lucide-react';
import axios from 'axios'; // ბექენდთან რექვესტებისთვის

export default function Navbar() {
    // 1. useState ჰუკი - ინახავს შესული მომხმარებლის მონაცემებს და ძებნის ტექსტს
    const [user, setUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    
    const navigate = useNavigate(); // ხაზგარეშე ნავიგაციის ჰუკი

    // 2. useEffect ჰუკი - საიტის ჩართვისთანავე ამოწმებს ბექენდზე, იუზერი ავტორიზებულია თუ არა
    useEffect(() => {
        const checkAuthStatus = async () => {
        try {
            // შენი Express სერვერის ენდპოინთი, რომელიც ამოწმებს JWT ქუქიებს
            const response = await axios.get('http://localhost:3000/api/auth/me', { withCredentials: true });
            if (response.data) {
            setUser(response.data); // თუ იუზერი ნაპოვნია, ვსვამთ სტეიტში
            }
        } catch (error) {
            console.log("მომხმარებელი არ არის შესული");
            setUser(null);
        }
        };

        checkAuthStatus();
    }, []); // ცარიელი მასივი ნიშნავს, რომ ეს კოდი მხოლოდ ერთხელ გაეშვება გვერდის ჩატვირთვისას

    // ლოგაუტის ფუნქცია
    const handleLogout = async () => {
        try {
        // ბექენდზე ქუქიების და სესიის გასუფთავება
        await axios.post('http://localhost:3000/api/auth/logout', {}, { withCredentials: true });
        setUser(null); // ვასუფთავებთ რეაქტის სტეიტს
        navigate('/auth'); // გადაგვაქვს იუზერი ლოგინის გვერდზე
        } catch (error) {
        console.error("Logout error:", error);
        }
    };

    // ძებნის ფუნქცია
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
        navigate(`/search?query=${searchQuery}`); // გადაგვიყვანს ძებნის გვერდზე
        }
    };

    return (
        <nav className="w-full bg-white border-b-3 border-symetrisDark sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        
        {/* ლოგო */}
        <div onClick={() => navigate('/')} className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-symetrisPrimary border-2 border-symetrisDark text-white font-black px-3 py-1 text-lg tracking-tighter shadow-[2px_2px_0px_0px_#111827] group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-hover:shadow-[1px_1px_0px_0px_#111827] transition-all">
            LU
            </div>
            <span className="text-xl font-black uppercase text-symetrisDark tracking-widest hidden sm:inline">
            // LinkUp
            </span>
        </div>

        {/* ძებნის ზოლი - კონტროლირებადი ინპუტი useState-ით */}
        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md mx-8 hidden md:block">
            <div className="relative flex items-center">
            <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // ყოველ კლავიშზე დაჭერას ინახავს სტეიტში
                placeholder="SEARCH PROFILES OR POSTS..." 
                className="w-full bg-symetrisBg border-2 border-symetrisDark px-4 py-2 pl-10 text-xs font-bold uppercase placeholder-slate-400 focus:outline-none focus:bg-white transition-colors"
            />
            <Search className="w-4 h-4 text-symetrisDark absolute left-3.5" />
            </div>
        </form>

        {/* ავტორიზაციის მიხედვით გადაწყობადი მენიუ */}
        <div className="flex items-center gap-4">
            {user ? (
            <>
                <button onClick={() => navigate('/chat')} className="p-2 border-2 border-transparent hover:border-symetrisDark hover:bg-symetrisMint transition-all hidden sm:block">
                <MessageSquare className="w-5 h-5 text-symetrisDark" />
                </button>

                <div className="flex items-center gap-3 border-l-2 border-dashed border-slate-300 pl-4">
                <div onClick={() => navigate('/profile')} className="w-9 h-9 bg-symetrisMint border-2 border-symetrisDark text-symetrisDark font-bold flex items-center justify-center text-xs shadow-[2px_2px_0px_0px_#111827] cursor-pointer">
                    {user.fullname ? user.fullname.substring(0, 2).toUpperCase() : 'LU'}
                </div>
                <span className="text-xs font-black uppercase text-symetrisDark tracking-tight hidden lg:block">
                    {user.fullname}
                </span>
                
                <button 
                    onClick={handleLogout}
                    className="ml-2 p-2 border-2 border-symetrisDark bg-white hover:bg-symetrisPrimary hover:text-white transition-colors shadow-[2px_2px_0px_0px_#111827] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_#111827]"
                >
                    <LogOut className="w-4 h-4" />
                </button>
                </div>
            </>
            ) : (
            <button onClick={() => navigate('/auth')} className="px-5 py-2 border-2 border-symetrisDark bg-symetrisPrimary text-white font-bold text-xs uppercase tracking-wider shadow-[3px_3px_0px_0px_#111827] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#111827] transition-all">
                Sign In //
            </button>
            )}
        </div>

        </nav>
    );
};