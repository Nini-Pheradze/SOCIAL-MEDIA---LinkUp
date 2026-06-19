import React from 'react';
import { FiHeart, FiMessageCircle } from 'react-icons/fi';

export default function PostCard({ post }) {
    return (
        <div className="glass-panel rounded-2xl p-5 shadow-xl transition-all hover:border-white/10">
            <div className="flex items-center gap-3 mb-4">
                <img src={post.user?.avatar || 'https://via.placeholder.com/150'} alt="" className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-500/20" />
                <div>
                    <h4 className="font-semibold text-white text-sm">{post.user?.fullname}</h4>
                    <span className="text-[10px] uppercase tracking-wider text-gray-500">Socialy Feed</span>
                </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">{post.content}</p>
            {post.image && (
                <img src={post.image} alt="" className="rounded-xl w-full max-h-80 object-cover border border-white/5 mb-4" />
            )}
            <div className="flex gap-6 border-t border-white/5 pt-3 text-gray-400 text-xs uppercase tracking-wider">
                <button className="flex items-center gap-2 hover:text-red-400 transition-colors">
                    <FiHeart /> <span>{post.likes?.length || 0} Likes</span>
                </button>
                <button className="flex items-center gap-2 hover:text-purple-400 transition-colors">
                    <FiMessageCircle /> <span>Comments</span>
                </button>
            </div>
        </div>
    );
}