import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ fullname: '', email: '', password: '' });
    const [error, setError] = useState('');
    const { checkAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isLogin ? '/auth/login' : '/auth/signup';
        try {
            const res = await axios.post(`http://localhost:3000/api${endpoint}`, formData, { withCredentials: true });
            if (res.data.status === 'success') {
                await checkAuth();
                navigate('/feed');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Authentication failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0b0f19] px-4 relative overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]"></div>

            <div className="glass-panel p-8 w-full max-w-md rounded-3xl shadow-2xl z-10">
                <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-1">
                    {isLogin ? 'Symetris Auth' : 'Create Account'}
                </h2>
                <p className="text-gray-500 text-center mb-6 text-[10px] uppercase tracking-widest">Social Media Agency Kit</p>

                {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl mb-4 text-xs">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">Full Name</label>
                            <input type="text" required onChange={e => setFormData({...formData, fullname: e.target.value})}
                                className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500" />
                        </div>
                    )}
                    <div>
                        <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">Email</label>
                        <input type="email" required onChange={e => setFormData({...formData, email: e.target.value})}
                            className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500" />
                    </div>
                    <div>
                        <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">Password</label>
                        <input type="password" required onChange={e => setFormData({...formData, password: e.target.value})}
                            className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500" />
                    </div>
                    <button type="submit" className="w-full py-3.5 btn-neon rounded-xl font-semibold text-xs uppercase tracking-wider mt-2 shadow-lg">
                        {isLogin ? 'Sign In' : 'Register Now'}
                    </button>
                </form>

                <p className="text-center text-xs text-gray-500 mt-5">
                    {isLogin ? "New to LinkUp? " : "Already have an account? "}
                    <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="text-purple-400 font-semibold hover:underline">
                        {isLogin ? 'Create One' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    );
}