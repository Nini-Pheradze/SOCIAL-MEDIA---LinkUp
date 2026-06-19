import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FiBell, FiSearch } from 'react-icons/fi';

export default function Navbar() {
    const { user } = useContext(AuthContext);

    return (
        <header className="glass-panel h-16 sticky top-0 z-40 w-full px-6 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center bg-white/[0.04] px-3 py-1.5 rounded-xl border border-white/5 w-64">
                <FiSearch className="text-gray-400 mr-2" size={16} />
                <input type="text" placeholder="Search LinkUp..." className="bg-transparent text-xs text-white focus:outline-none w-full" />
            </div>
            
            <div className="flex items-center gap-4">
                <button className="text-gray-400 hover:text-purple-400 transition-colors p-2 bg-white/[0.02] rounded-xl border border-white/5">
                    <FiBell size={16} />
                </button>
                <div className="flex items-center gap-2 border-l border-white/10 pl-4">
                    <img src={user?.avatar || 'https://via.placeholder.com/150'} alt="" className="w-8 h-8 rounded-full object-cover ring-2 ring-purple-500/20" />
                    <span className="text-xs font-medium text-white hidden sm:block">{user?.fullname}</span>
                </div>
            </div>
        </header>
    );
}