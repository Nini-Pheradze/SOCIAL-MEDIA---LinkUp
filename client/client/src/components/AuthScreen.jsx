import React, { useState } from 'react';
import { MOCK_USER } from "../data/mockData";
import Avatar from './Avatar';

const AuthScreen = ({ onLogin }) => {
    const [mode, setMode] = useState("login");
    const [form, setForm] = useState({ fullname: "", email: "", password: "" });
    const [error, setError] = useState("");

    const handle = (e) => {
        e.preventDefault();
        if (!form.email || !form.password) return setError("Please fill in all required fields.");
        if (mode === "signup" && !form.fullname) return setError("Full name is required.");
        setError("");
        onLogin({ ...MOCK_USER, fullname: form.fullname || MOCK_USER.fullname, email: form.email });
    };

    return (
        <div style={{ minHeight: "100vh", background: "#0a0a0f", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif", padding: "20px" }}>
        <style>{`
            @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Syne:wght@700;800&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { background: #0a0a0f; }
            ::selection { background: #3b82f633; }
            ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #111; } ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
            input:focus { outline: none; }
            button { cursor: pointer; font-family: inherit; }
            .auth-input { width: 100%; padding: 13px 16px; background: #111827; border: 1px solid #1f2937; border-radius: 10px; color: #f9fafb; font-size: 14px; font-family: 'DM Sans', sans-serif; transition: border-color 0.2s; }
            .auth-input:focus { border-color: #3b82f6; }
            .auth-input::placeholder { color: #4b5563; }
            .btn-primary { width: 100%; padding: 13px; background: #3b82f6; border: none; border-radius: 10px; color: #fff; font-size: 14px; font-weight: 600; letter-spacing: 0.02em; transition: all 0.2s; }
            .btn-primary:hover { background: #2563eb; transform: translateY(-1px); }
            .fade-in { animation: fadeIn 0.4s ease; }
            @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
            .pulse-dot { width: 6px; height: 6px; background: #10b981; border-radius: 50%; animation: pulse 2s infinite; }
            @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
        `}</style>

        <div className="fade-in" style={{ width: "100%", maxWidth: 420 }}>
            {/* Logo */}
            <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 40, height: 40, background: "#3b82f6", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="#fff" strokeWidth="2" strokeLinecap="round"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
                </div>
                <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: "#f9fafb", letterSpacing: "-0.02em" }}>LinkUp</span>
            </div>
            <p style={{ marginTop: 10, color: "#6b7280", fontSize: 14 }}>Connect with people who matter</p>
            </div>
    
            {/* Card */}
            <div style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: 18, padding: "36px 32px" }}>
            <div style={{ display: "flex", gap: 4, background: "#0d1117", borderRadius: 10, padding: 4, marginBottom: 28 }}>
                {["login","signup"].map(m => (
                <button key={m} onClick={() => setMode(m)} style={{ flex: 1, padding: "9px", borderRadius: 8, border: "none", background: mode === m ? "#1f2937" : "transparent", color: mode === m ? "#f9fafb" : "#6b7280", fontSize: 13, fontWeight: 500, transition: "all 0.2s", fontFamily: "'DM Sans', sans-serif" }}>
                    {m === "login" ? "Sign In" : "Create Account"}
                </button>
                ))}
            </div>

            <form onSubmit={handle} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {mode === "signup" && (
                <input className="auth-input" placeholder="Full name" value={form.fullname} onChange={e => setForm({...form, fullname: e.target.value})} />
                )}
                <input className="auth-input" type="email" placeholder="Email address" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                <input className="auth-input" type="password" placeholder="Password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
                {error && <p style={{ color: "#ef4444", fontSize: 13 }}>{error}</p>}
                <button type="submit" className="btn-primary" style={{ marginTop: 6 }}>
                {mode === "login" ? "Sign In" : "Create Account"}
                </button>
            </form>

            <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0" }}>
                <div style={{ flex: 1, height: 1, background: "#1f2937" }} />
                <span style={{ color: "#4b5563", fontSize: 13 }}>or</span>
                <div style={{ flex: 1, height: 1, background: "#1f2937" }} />
            </div>
    
            <button onClick={() => onLogin(MOCK_USER)} style={{ width: "100%", padding: "12px", background: "transparent", border: "1px solid #1f2937", borderRadius: 10, color: "#d1d5db", fontSize: 14, fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, transition: "all 0.2s", fontFamily: "'DM Sans', sans-serif" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#374151"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#1f2937"}>
                <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Continue with Google
            </button>
            </div>
        </div>
        </div>
    );
};

export default AuthScreen;