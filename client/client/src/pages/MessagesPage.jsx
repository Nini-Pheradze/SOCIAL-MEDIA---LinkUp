import React, { useState } from "react";
import Avatar from "../components/Avatar";
import { MOCK_MESSAGES } from "../data/mockData";
import { MOCK_FRIENDS } from "../data/mockData";
import { MessageIcon } from "../components/Icons";
import { SendIcon } from "../components/Icons";
import { useRef } from "react";
import { useEffect } from "react";
import { timeAgo } from "../utils/helper";
import { INITIAL_POSTS } from "../data/mockData";
import { HeartIcon, CommentIcon } from "../components/Icons";

const MessagesPage = ({ currentUser }) => {
    const [selected, setSelected] = useState(null);
    const [messages, setMessages] = useState(MOCK_MESSAGES);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);
    
    useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [selected, messages]);
    
    const send = () => {
        if (!input.trim() || !selected) return;
        const msg = { _id: `m${Date.now()}`, sender: currentUser._id, text: input, createdAt: new Date() };
        setMessages({ ...messages, [selected._id]: [...(messages[selected._id] || []), msg] });
        setInput("");
    };
    
    return (
        <div style={{ display: "flex", gap: 0, background: "#111827", border: "1px solid #1f2937", borderRadius: 16, overflow: "hidden", height: 520 }}>
        {/* Sidebar */}
        <div style={{ width: 260, borderRight: "1px solid #1f2937", flexShrink: 0 }}>
            <div style={{ padding: "16px 14px 12px", borderBottom: "1px solid #1f2937" }}>
            <p style={{ color: "#f9fafb", fontWeight: 600, fontSize: 15 }}>Messages</p>
            </div>
            <div style={{ overflow: "auto", height: "calc(100% - 53px)" }}>
            {MOCK_FRIENDS.map(f => {
                const msgs = messages[f._id] || [];
                const last = msgs[msgs.length - 1];
                return (
                <button key={f._id} onClick={() => setSelected(f)}
                    style={{ width: "100%", padding: "13px 14px", display: "flex", gap: 10, alignItems: "center", background: selected?._id === f._id ? "#1f2937" : "transparent", border: "none", textAlign: "left", cursor: "pointer", borderBottom: "1px solid #0d1117", transition: "background 0.2s" }}>
                    <div style={{ position: "relative" }}>
                    <Avatar user={f} size={38} />
                    <div className="pulse-dot" style={{ position: "absolute", bottom: 1, right: 1, border: "2px solid #111827" }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ color: "#f9fafb", fontSize: 13, fontWeight: 500 }}>{f.fullname}</p>
                    <p style={{ color: "#4b5563", fontSize: 12, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{last ? last.text : "Start a conversation"}</p>
                    </div>
                </button>
                );
            })}
            </div>
        </div>
    
        {/* Chat */}
        {selected ? (
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "14px 18px", borderBottom: "1px solid #1f2937", display: "flex", alignItems: "center", gap: 10 }}>
                <Avatar user={selected} size={34} />
                <div>
                <p style={{ color: "#f9fafb", fontWeight: 600, fontSize: 14 }}>{selected.fullname}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <div className="pulse-dot" />
                    <p style={{ color: "#10b981", fontSize: 11 }}>Online</p>
                </div>
                </div>
            </div>
            <div style={{ flex: 1, overflow: "auto", padding: "16px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
                {(messages[selected._id] || []).map(m => {
                const mine = m.sender === currentUser._id;
                return (
                    <div key={m._id} style={{ display: "flex", justifyContent: mine ? "flex-end" : "flex-start" }}>
                    <div style={{ maxWidth: "70%", padding: "9px 14px", borderRadius: mine ? "14px 14px 4px 14px" : "14px 14px 14px 4px", background: mine ? "#3b82f6" : "#1f2937", color: "#f9fafb", fontSize: 13, lineHeight: 1.5 }}>
                        {m.text}
                    </div>
                    </div>
                );
                })}
                <div ref={messagesEndRef} />
            </div>
            <div style={{ padding: "12px 14px", borderTop: "1px solid #1f2937", display: "flex", gap: 8 }}>
                <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Type a message..." style={{ flex: 1, padding: "10px 16px", background: "#0d1117", border: "1px solid #1f2937", borderRadius: 22, color: "#f9fafb", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }} />
                <button onClick={send} style={{ padding: "10px 16px", background: "#3b82f6", border: "none", borderRadius: 22, color: "#fff", display: "flex", alignItems: "center", gap: 6, fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}><SendIcon /></button>
            </div>
            </div>
        ) : (
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 10 }}>
            <div style={{ width: 56, height: 56, background: "#1f2937", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#4b5563" }}><MessageIcon /></div>
            <p style={{ color: "#4b5563", fontSize: 14 }}>Select a conversation</p>
            </div>
        )}
        </div>
    );
};

export default MessagesPage;