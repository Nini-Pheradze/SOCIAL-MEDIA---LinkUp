import React from 'react';

export default function ChatBubble({ msg, isOwn }) {
    return (
        <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-3`}>
            <div className={`max-w-xs px-4 py-2.5 rounded-2xl text-sm shadow-md ${
                isOwn 
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-tr-none' 
                    : 'bg-white/[0.05] border border-white/5 text-gray-200 rounded-tl-none'
            }`}>
                <p className="break-words leading-relaxed">{msg.message}</p>
                <span className="block text-[9px] text-white/40 text-right mt-1">Just now</span>
            </div>
        </div>
    );
}