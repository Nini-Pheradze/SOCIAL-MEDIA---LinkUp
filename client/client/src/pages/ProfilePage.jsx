import React, { useState } from "react";
import Avatar from "../components/Avatar";
import { CameraIcon } from "../components/Icons";
import { MOCK_FRIENDS } from "../data/mockData";
import { MOCK_GROUPS } from "../data/mockData";
import { timeAgo } from "../utils/helper";
import { INITIAL_POSTS } from "../data/mockData";
import { HeartIcon, CommentIcon } from "../components/Icons";

const ProfilePage = ({ currentUser, onUpdate }) => {
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({ fullname: currentUser.fullname, email: currentUser.email });
    
    const save = () => { onUpdate(form); setEditing(false); };
    
    return (
        <div>
        {/* Cover */}
        <div style={{ height: 160, background: "linear-gradient(135deg, #1e3a5f, #1e1b4b, #0f172a)", borderRadius: 16, position: "relative", marginBottom: 60 }}>
            <button style={{ position: "absolute", top: 12, right: 12, padding: "6px 10px", background: "#00000040", border: "1px solid #ffffff20", borderRadius: 8, color: "#fff", fontSize: 12, display: "flex", alignItems: "center", gap: 5, fontFamily: "'DM Sans', sans-serif" }}><CameraIcon /> Change Cover</button>
            <div style={{ position: "absolute", bottom: -40, left: 24 }}>
            <div style={{ position: "relative" }}>
                <Avatar user={currentUser} size={78} />
                <button style={{ position: "absolute", bottom: 0, right: 0, width: 24, height: 24, background: "#3b82f6", border: "2px solid #0a0a0f", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}><CameraIcon /></button>
            </div>
            </div>
        </div>
    
        <div style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: 16, padding: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
            <div>
                <h2 style={{ color: "#f9fafb", fontSize: 20, fontWeight: 700 }}>{currentUser.fullname}</h2>
                <p style={{ color: "#4b5563", fontSize: 14 }}>{currentUser.email}</p>
                {currentUser.role === "admin" && (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 5, marginTop: 6, padding: "3px 10px", background: "#fbbf2420", border: "1px solid #fbbf2440", borderRadius: 20, color: "#fbbf24", fontSize: 12, fontWeight: 600 }}>
                    <ShieldIcon /> Admin
                </span>
                )}
            </div>
            <button onClick={() => setEditing(!editing)} style={{ padding: "8px 16px", background: "#1f2937", border: "1px solid #374151", borderRadius: 10, color: "#d1d5db", fontSize: 13, fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>
                {editing ? "Cancel" : "Edit Profile"}
            </button>
            </div>
    
            {editing && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div>
                <label style={{ color: "#6b7280", fontSize: 12, marginBottom: 6, display: "block" }}>Full Name</label>
                <input value={form.fullname} onChange={e => setForm({...form, fullname: e.target.value})} style={{ width: "100%", padding: "11px 14px", background: "#0d1117", border: "1px solid #374151", borderRadius: 10, color: "#f9fafb", fontSize: 14, fontFamily: "'DM Sans', sans-serif" }} />
                </div>
                <div>
                <label style={{ color: "#6b7280", fontSize: 12, marginBottom: 6, display: "block" }}>Email</label>
                <input value={form.email} onChange={e => setForm({...form, email: e.target.value})} style={{ width: "100%", padding: "11px 14px", background: "#0d1117", border: "1px solid #374151", borderRadius: 10, color: "#f9fafb", fontSize: 14, fontFamily: "'DM Sans', sans-serif" }} />
                </div>
                <button onClick={save} style={{ padding: "11px", background: "#3b82f6", border: "none", borderRadius: 10, color: "#fff", fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>Save Changes</button>
            </div>
            )}
    
            {!editing && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                {[{ label: "Friends", value: MOCK_FRIENDS.length }, { label: "Posts", value: INITIAL_POSTS.filter(p => p.userId._id === "u1").length }, { label: "Groups", value: MOCK_GROUPS.length }].map(s => (
                <div key={s.label} style={{ background: "#0d1117", borderRadius: 12, padding: "16px", textAlign: "center" }}>
                    <p style={{ color: "#f9fafb", fontSize: 22, fontWeight: 700 }}>{s.value}</p>
                    <p style={{ color: "#4b5563", fontSize: 13 }}>{s.label}</p>
                </div>
                ))}
            </div>
            )}
        </div>
        </div>
    );
};

export default ProfilePage;