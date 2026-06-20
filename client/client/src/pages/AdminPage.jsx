import React, { useState } from "react";
import Avatar from "../components/Avatar";
import { timeAgo } from "../utils/helper";
import { INITIAL_POSTS } from "../data/mockData";
import { HeartIcon, CommentIcon } from "../components/Icons";

const AdminPage = () => {
    const [users, setUsers] = useState(MOCK_ADMIN_USERS);
    const ban = (id) => setUsers(users.map(u => u._id === id ? { ...u, isBanned: true } : u));
    const unban = (id) => setUsers(users.map(u => u._id === id ? { ...u, isBanned: false } : u));
    const del = (id) => setUsers(users.filter(u => u._id !== id));
    
    return (
        <div>
        <div style={{ background: "#fbbf2410", border: "1px solid #fbbf2430", borderRadius: 14, padding: "14px 18px", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
            <ShieldIcon />
            <p style={{ color: "#fbbf24", fontSize: 14, fontWeight: 600 }}>Admin Panel — User Management</p>
        </div>
    
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {users.map(u => (
            <div key={u._id} style={{ background: "#111827", border: `1px solid ${u.isBanned ? "#7f1d1d40" : "#1f2937"}`, borderRadius: 14, padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Avatar user={u} size={40} />
                <div>
                    <p style={{ color: "#f9fafb", fontWeight: 500 }}>{u.fullname}</p>
                    <p style={{ color: "#4b5563", fontSize: 13 }}>{u.email}</p>
                </div>
                {u.isBanned && <span style={{ padding: "3px 10px", background: "#7f1d1d40", border: "1px solid #ef444440", borderRadius: 20, color: "#ef4444", fontSize: 12 }}>Banned</span>}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                {u.isBanned ? (
                    <button onClick={() => unban(u._id)} style={{ padding: "7px 14px", background: "#10b98110", border: "1px solid #10b98140", borderRadius: 8, color: "#10b981", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>Unban</button>
                ) : (
                    <button onClick={() => ban(u._id)} style={{ padding: "7px 14px", background: "#fbbf2410", border: "1px solid #fbbf2440", borderRadius: 8, color: "#fbbf24", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>Ban</button>
                )}
                <button onClick={() => del(u._id)} style={{ padding: "7px 14px", background: "#7f1d1d20", border: "1px solid #7f1d1d40", borderRadius: 8, color: "#ef4444", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>Delete</button>
                </div>
            </div>
            ))}
        </div>
        </div>
    );
};

export default AdminPage;