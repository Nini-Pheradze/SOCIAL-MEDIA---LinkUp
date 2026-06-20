import React, { useState } from 'react';
import Avatar from './Avatar';
import { ImageIcon } from './Icons';

const CreatePost = ({ currentUser, onPost }) => {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({ title: "", content: "" });
    
    const submit = () => {
        if (!form.content.trim()) return;
        onPost(form);
        setForm({ title: "", content: "" });
        setOpen(false);
    };
    
    return (
        <div style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: 16, padding: "16px 18px", marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <Avatar user={currentUser} size={38} />
            <button onClick={() => setOpen(true)} style={{ flex: 1, textAlign: "left", background: "#0d1117", border: "1px solid #1f2937", borderRadius: 20, padding: "10px 16px", color: "#4b5563", fontSize: 14, fontFamily: "'DM Sans', sans-serif", cursor: "text", transition: "border-color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "#374151"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "#1f2937"}>
            What's on your mind?
            </button>
            <button onClick={() => setOpen(true)} style={{ padding: "9px 14px", background: "#3b82f610", border: "1px solid #3b82f630", borderRadius: 10, color: "#3b82f6", display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>
            <ImageIcon /> Photo
            </button>
        </div>
    
        {open && (
            <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
            <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Add a title (optional)"
                style={{ background: "#0d1117", border: "1px solid #374151", borderRadius: 10, padding: "11px 14px", color: "#f9fafb", fontSize: 14, fontFamily: "'DM Sans', sans-serif" }} />
            <textarea value={form.content} onChange={e => setForm({...form, content: e.target.value})} placeholder="Share something..." rows={4}
                style={{ background: "#0d1117", border: "1px solid #374151", borderRadius: 10, padding: "11px 14px", color: "#f9fafb", fontSize: 14, resize: "none", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }} autoFocus />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                <button onClick={() => setOpen(false)} style={{ padding: "9px 18px", background: "#1f2937", border: "none", borderRadius: 10, color: "#9ca3af", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>Cancel</button>
                <button onClick={submit} style={{ padding: "9px 18px", background: "#3b82f6", border: "none", borderRadius: 10, color: "#fff", fontSize: 13, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>Post</button>
            </div>
            </div>
        )}
        </div>
    );
};

export default CreatePost;