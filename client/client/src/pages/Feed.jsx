import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import PostCard from '../components/PostCard';
import { FiImage, FiSend } from 'react-icons/fi';

export default function Feed() {
    const [posts, setPosts] = useState([]);
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    const loadPosts = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/posts', { withCredentials: true });
            setPosts(res.data.posts || []);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => { loadPosts(); }, []);

    const handlePublish = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('content', content);
        if (image) data.append('image', image);

        try {
            await axios.post('http://localhost:3000/api/posts', data, {
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setContent('');
            setImage(null);
            loadPosts();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex min-h-screen bg-[#0b0f19]">
            <Sidebar />
            <div className="flex-1 flex flex-col h-screen overflow-y-auto">
                <Navbar />
                <main className="max-w-2xl w-full mx-auto px-4 py-8 space-y-6">
                    {/* პოსტის შექმნა */}
                    <div className="glass-panel rounded-2xl p-4">
                        <form onSubmit={handlePublish} className="space-y-3">
                            <textarea value={content} onChange={e => setContent(e.target.value)} required
                                placeholder="Create an agency standard post..."
                                className="w-full bg-transparent text-white text-sm resize-none focus:outline-none h-16" />
                            <div className="flex justify-between items-center border-t border-white/5 pt-3">
                                <label className="flex items-center gap-2 text-xs text-gray-400 hover:text-purple-400 cursor-pointer">
                                    <FiImage size={16} /> <span>Media File</span>
                                    <input type="file" className="hidden" onChange={e => setImage(e.target.files[0])} />
                                </label>
                                <button type="submit" className="btn-neon px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-md">
                                    <FiSend /> Publish
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* ფიდი */}
                    <div className="space-y-5">
                        {posts.map(p => <PostCard key={p._id} post={p} />)}
                    </div>
                </main>
            </div>
        </div>
    );
}