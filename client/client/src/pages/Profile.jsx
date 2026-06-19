import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function Profile() {
    const { user } = useContext(AuthContext);

    return (
        <div className="flex min-h-screen bg-[#0b0f19]">
            <Sidebar />
            <div className="flex-1 flex flex-col h-screen overflow-y-auto">
                <Navbar />
                <main className="max-w-4xl w-full mx-auto px-4 py-8">
                    <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl">
                        {/* ქავერი */}
                        <div className="h-44 bg-gradient-to-r from-indigo-600 to-purple-600 relative"></div>
                        
                        {/* პროფილის დეტალები */}
                        <div className="px-6 pb-6 relative flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-16 mb-6">
                            <img src={user?.avatar || 'https://via.placeholder.com/150'} alt="" 
                                className="w-32 h-32 rounded-3xl object-cover ring-4 ring-[#0b0f19] shadow-xl z-10" />
                            <div className="text-center sm:text-left mb-2">
                                <h2 className="text-2xl font-bold text-white">{user?.fullname}</h2>
                                <p className="text-xs text-gray-400">{user?.email}</p>
                            </div>
                        </div>

                        {/* სააგენტოს სტატისტიკა */}
                        <div className="grid grid-cols-3 border-t border-white/5 divide-x divide-white/5 text-center bg-white/[0.01]">
                            <div className="py-4">
                                <span className="block text-xl font-bold text-white">24</span>
                                <span className="text-[10px] uppercase tracking-wider text-gray-500">Agency Posts</span>
                            </div>
                            <div className="py-4">
                                <span className="block text-xl font-bold text-white">142</span>
                                <span className="text-[10px] uppercase tracking-wider text-gray-500">Connections</span>
                            </div>
                            <div className="py-4">
                                <span className="block text-xl font-bold text-white">Active</span>
                                <span className="text-[10px] uppercase tracking-wider text-gray-500">Status</span>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}