import React, { useState } from "react";
import Avatar from "../components/Avatar";
import { timeAgo } from "../utils/helper";
import { MOCK_GROUPS } from "../data/mockData";
import { SearchIcon } from "../components/Icons";
import { PlusIcon } from "../components/Icons";
import { GroupIcon } from "../components/Icons";
import { INITIAL_POSTS } from "../data/mockData";
import { HeartIcon, CommentIcon } from "../components/Icons";

const GroupsPage = ({ currentUser }) => {
    const [groups, setGroups] = useState(MOCK_GROUPS);
    const [creating, setCreating] = useState(false);
    const [form, setForm] = useState({ name: "", description: "" });
    const [search, setSearch] = useState("");
    
    const create = () => {
        if (!form.name.trim()) return;
        const g = { _id: `g${Date.now()}`, name: form.name, description: form.description, members: [currentUser._id], admin: currentUser._id };
        setGroups([g, ...groups]);
        setForm({ name: "", description: "" });
        setCreating(false);
    };
    
    const join = (id) => setGroups(groups.map(g => g._id === id ? { ...g, members: [...g.members, currentUser._id] } : g));
    const leave = (id) => setGroups(groups.map(g => g._id === id ? { ...g, members: g.members.filter(m => m !== currentUser._id) } : g));
    const del = (id) => setGroups(groups.filter(g => g._id !== id));
    
    const filtered = groups.filter(g => !search || g.name.toLowerCase().includes(search.toLowerCase()));
    
    return (
        <div>
        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
            <div style={{ position: "relative", flex: 1 }}>
            <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#4b5563" }}><SearchIcon /></div>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search groups..." style={{ width: "100%", padding: "11px 14px 11px 44px", background: "#111827", border: "1px solid #1f2937", borderRadius: 12, color: "#f9fafb", fontSize: 14, fontFamily: "'DM Sans', sans-serif" }} />
            </div>
            <button onClick={() => setCreating(!creating)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "11px 16px", background: "#3b82f6", border: "none", borderRadius: 12, color: "#fff", fontSize: 13, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap" }}>
            <PlusIcon /> New Group
            </button>
        </div>
    
        {creating && (
            <div style={{ background: "#111827", border: "1px solid #3b82f640", borderRadius: 16, padding: "18px", marginBottom: 16 }}>
            <p style={{ color: "#f9fafb", fontWeight: 600, marginBottom: 14 }}>Create Group</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Group name" style={{ padding: "11px 14px", background: "#0d1117", border: "1px solid #374151", borderRadius: 10, color: "#f9fafb", fontSize: 14, fontFamily: "'DM Sans', sans-serif" }} />
                <input value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Description (optional)" style={{ padding: "11px 14px", background: "#0d1117", border: "1px solid #374151", borderRadius: 10, color: "#f9fafb", fontSize: 14, fontFamily: "'DM Sans', sans-serif" }} />
                <div style={{ display: "flex", gap: 8 }}>
                <button onClick={create} style={{ padding: "9px 18px", background: "#3b82f6", border: "none", borderRadius: 8, color: "#fff", fontSize: 13, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>Create</button>
                <button onClick={() => setCreating(false)} style={{ padding: "9px 18px", background: "#1f2937", border: "none", borderRadius: 8, color: "#9ca3af", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>Cancel</button>
                </div>
            </div>
            </div>
        )}
    
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {filtered.map(g => {
            const isMember = g.members.includes(currentUser._id);
            const isAdmin = g.admin === currentUser._id;
            return (
                <div key={g._id} style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: 16, padding: "16px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <div style={{ width: 46, height: 46, background: "#1f2937", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", color: "#6b7280" }}><GroupIcon /></div>
                    <div>
                    <p style={{ color: "#f9fafb", fontWeight: 600 }}>{g.name}</p>
                    <p style={{ color: "#4b5563", fontSize: 13 }}>{g.description} · {g.members.length} members</p>
                    </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                    {isAdmin && (
                    <button onClick={() => del(g._id)} style={{ padding: "7px 12px", background: "transparent", border: "1px solid #374151", borderRadius: 8, color: "#6b7280", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>Delete</button>
                    )}
                    {isMember && !isAdmin && (
                    <button onClick={() => leave(g._id)} style={{ padding: "7px 14px", background: "transparent", border: "1px solid #374151", borderRadius: 8, color: "#6b7280", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>Leave</button>
                    )}
                    {!isMember && (
                    <button onClick={() => join(g._id)} style={{ padding: "7px 14px", background: "#3b82f610", border: "1px solid #3b82f640", borderRadius: 8, color: "#3b82f6", fontSize: 13, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>Join</button>
                    )}
                    {isMember && <span style={{ padding: "7px 12px", color: "#10b981", fontSize: 13, fontWeight: 500 }}>Joined ✓</span>}
                </div>
                </div>
            );
            })}
        </div>
        </div>
    );
};

export default GroupsPage;