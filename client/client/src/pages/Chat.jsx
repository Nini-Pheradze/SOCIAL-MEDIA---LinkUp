import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { SocketContext } from '../context/SocketContext';
import { AuthContext } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import ChatBubble from '../components/ChatBubble';
import { FiSend } from 'react-icons/fi';

export default function Chat() {
    const [friends, setFriends] = useState([]);
    const [activeChat, setActiveChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    
    const { socket } = useContext(SocketContext);
    const { user } = useContext(AuthContext);
    const chatEndRef = useRef(null);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/friend/my-friends', { withCredentials: true });
                setFriends(res.data.friends || []);
            } catch (err) { console.error(err); }
        };
        fetchFriends();
    }, []);

    useEffect(() => {
        if (!activeChat) return;
        const fetchMessages = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/message/chat/${activeChat._id}`, { withCredentials: true });
                setMessages(res.data.messages || []);
            } catch (err) { console.error(err); }
        };
        fetchMessages();
    }, [activeChat]);

    useEffect(() => {
        if (!socket) return;
        socket.on('receive_message', (msg) => {
            if (activeChat && (msg.sender === activeChat._id || msg.sender === user._id)) {
                setMessages((prev) => [...prev, msg]);
            }
        });
        return () => socket.off('receive_message');
    }, [socket, activeChat, user]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!text.trim() || !activeChat) return;

        try {
            const res = await axios.post(`http://localhost:3000/api/message/send/${activeChat._id}`, { message: text }, { withCredentials: true });
            if (res.data.status === 'success') {
                setText('');
            }
        } catch (err) { console.error(err); }
    };

    return (
        <div className="flex min-h-screen bg-[#0b0f19]">
            <Sidebar />
            <div className="flex-1 flex flex-col h-screen">
                <Navbar />
                <div className="flex-1 flex overflow-hidden">
                    {/* ჩატების სია (მარცხნივ) */}
                    <div className="w-80 border-r border-white/5 overflow-y-auto p-4 space-y-2 hidden sm:block bg-white/[0.01]">
                        <h3 className="text-xs uppercase tracking-wider text-gray-400 font-bold px-2 mb-4">Direct Messages</h3>
                        {friends.map(f => (
                            <button key={f._id} onClick={() => setActiveChat(f)}
                                className={`w-full flex items-center gap-3 p-3 rounded-2xl border transition-all text-left ${activeChat?._id === f._id ? 'bg-purple-600/10 border-purple-500/30' : 'bg-transparent border-transparent hover:bg-white/[0.02]'}`}>
                                <img src={f.avatar || 'https://via.placeholder.com/150'} className="w-10 h-10 rounded-full object-cover" alt="" />
                                <div>
                                    <h4 className="text-sm font-semibold text-white">{f.fullname}</h4>
                                    <p className="text-xs text-gray-500 truncate w-44">Click to open room</p>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* უშუალოდ ჩატი (მარჯვნივ) */}
                    <div className="flex-1 flex flex-col bg-white/[0.005]">
                        {activeChat ? (
                            <>
                                <div className="p-4 border-b border-white/5 flex items-center gap-3 bg-white/[0.02]">
                                    <img src={activeChat.avatar || 'https://via.placeholder.com/150'} className="w-8 h-8 rounded-full object-cover" alt="" />
                                    <h3 className="font-bold text-sm text-white">{activeChat.fullname}</h3>
                                </div>
                                <div className="flex-1 overflow-y-auto p-4">
                                    {messages.map(m => <ChatBubble key={m._id} msg={m} isOwn={m.sender === user._id} />)}
                                    <div ref={chatEndRef} />
                                </div>
                                <form onSubmit={handleSendMessage} className="p-4 bg-white/[0.02] border-t border-white/5 flex gap-2">
                                    <input type="text" placeholder="Type a message..." value={text} onChange={e => setText(e.target.value)}
                                        className="flex-1 bg-white/[0.04] border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500" />
                                    <button type="submit" className="btn-neon p-3 rounded-xl"><FiSend size={16} /></button>
                                </form>
                            </>
                        ) : (
                            <div className="flex-1 flex items-center justify-center text-gray-500 text-xs uppercase tracking-wider">Select a conversation to start messaging</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}