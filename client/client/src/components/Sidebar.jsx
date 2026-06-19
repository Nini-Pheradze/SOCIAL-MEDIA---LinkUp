import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiMessageSquare, FiUser, FiLogOut } from 'react-icons/fi';
import axios from 'axios';

export default function Sidebar() {
    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:3000/api/auth/logout', {}, { withCredentials: true });
            window.location.href = '/auth';
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <aside className="w-64 h-screen sticky top-0 bg-[#0b0f19] border-r border-white/5 p-6 flex flex-col justify-between hidden md:flex">
            <div className="space-y-8">
                <h1 className="text-xl font-bold tracking-widest bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent uppercase">
                    LinkUp
                </h1>
                <nav className="space-y-1.5">
                    <NavLink to="/feed" className={({isActive}) => `flex items-center gap-4 px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all ${isActive ? 'bg-purple-600/10 text-purple-400 border-l-4 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.1)]' : 'text-gray-400 hover:bg-white/5'}`}>
                        <FiHome size={16} /> Feed
                    </NavLink>
                    <NavLink to="/chat" className={({isActive}) => `flex items-center gap-4 px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all ${isActive ? 'bg-purple-600/10 text-purple-400 border-l-4 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.1)]' : 'text-gray-400 hover:bg-white/5'}`}>
                        <FiMessageSquare size={16} /> Messenger
                    </NavLink>
                    <NavLink to="/profile" className={({isActive}) => `flex items-center gap-4 px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all ${isActive ? 'bg-purple-600/10 text-purple-400 border-l-4 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.1)]' : 'text-gray-400 hover:bg-white/5'}`}>
                        <FiUser size={16} /> Profile
                    </NavLink>
                </nav>
            </div>
            
            <button onClick={handleLogout} className="flex items-center gap-4 px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold text-red-400 hover:bg-red-500/10 transition-all w-full text-left">
                <FiLogOut size={16} /> Logout
            </button>
        </aside>
    );
}