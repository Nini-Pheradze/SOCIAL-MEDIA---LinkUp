import React, { useState } from "react";
import Avatar from "../components/Avatar";
import { MOCK_FRIENDS } from "../data/mockData";
import { MOCK_REQUESTS } from "../data/mockData";
import { SearchIcon } from "../components/Icons";
import { UserPlusIcon } from "../components/Icons";
import { timeAgo } from "../utils/helper";
import { INITIAL_POSTS } from "../data/mockData";
import { HeartIcon, CommentIcon } from "../components/Icons";

const FriendsPage = ({ currentUser }) => {
    const [tab, setTab] = useState("friends");
    const [search, setSearch] = useState("");
    const [friends, setFriends] = useState(MOCK_FRIENDS);
    const [requests, setRequests] = useState(MOCK_REQUESTS);
    const [searchResults] = useState([
        { _id: "u6", fullname: "Riley Kim", avatar: null },
        { _id: "u7", fullname: "Drew Santos", avatar: null },
    ]);
    
    const accept = (req) => { setFriends([...friends, req.sender]); setRequests(requests.filter(r => r._id !== req._id)); };
    const reject = (reqId) => setRequests(requests.filter(r => r._id !== reqId));
    const unfriend = (userId) => setFriends(friends.filter(f => f._id !== userId));
    
    const TABS = [
        { id: "friends", label: "My Friends" },
        { id: "requests", label: `Requests${requests.length ? ` (${requests.length})` : ""}` },
        { id: "search", label: "Find People" },
    ];
    
    return (
        <div>
        <div style={{ display: "flex", gap: 4, background: "#111827", border: "1px solid #1f2937", borderRadius: 14, padding: 5, marginBottom: 20 }}>
            {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, padding: "9px 8px", borderRadius: 10, border: "none", background: tab === t.id ? "#1f2937" : "transparent", color: tab === t.id ? "#f9fafb" : "#6b7280", fontSize: 13, fontWeight: 500, fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s" }}>{t.label}</button>
            ))}
        </div>
    
        {tab === "friends" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {friends.map(f => (
                <div key={f._id} style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: 14, padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Avatar user={f} size={42} />
                    <p style={{ color: "#f9fafb", fontWeight: 500 }}>{f.fullname}</p>
                </div>
                <button onClick={() => unfriend(f._id)} style={{ padding: "7px 14px", background: "transparent", border: "1px solid #374151", borderRadius: 8, color: "#6b7280", fontSize: 13, fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "#ef4444"; e.currentTarget.style.color = "#ef4444"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "#374151"; e.currentTarget.style.color = "#6b7280"; }}>Remove</button>
                </div>
            ))}
            {friends.length === 0 && <p style={{ color: "#4b5563", textAlign: "center", padding: 40 }}>No friends yet. Start connecting!</p>}
            </div>
        )}
    
        {tab === "requests" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {requests.map(r => (
                <div key={r._id} style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: 14, padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Avatar user={r.sender} size={42} />
                    <div>
                    <p style={{ color: "#f9fafb", fontWeight: 500 }}>{r.sender.fullname}</p>
                    <p style={{ color: "#4b5563", fontSize: 12 }}>Sent you a friend request</p>
                    </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => accept(r)} style={{ padding: "7px 14px", background: "#3b82f610", border: "1px solid #3b82f640", borderRadius: 8, color: "#3b82f6", fontSize: 13, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>Accept</button>
                    <button onClick={() => reject(r._id)} style={{ padding: "7px 14px", background: "transparent", border: "1px solid #374151", borderRadius: 8, color: "#6b7280", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>Reject</button>
                </div>
                </div>
            ))}
            {requests.length === 0 && <p style={{ color: "#4b5563", textAlign: "center", padding: 40 }}>No pending requests</p>}
            </div>
        )}
    
        {tab === "search" && (
            <div>
            <div style={{ position: "relative", marginBottom: 16 }}>
                <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#4b5563" }}><SearchIcon /></div>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name..." style={{ width: "100%", padding: "12px 14px 12px 44px", background: "#111827", border: "1px solid #1f2937", borderRadius: 12, color: "#f9fafb", fontSize: 14, fontFamily: "'DM Sans', sans-serif" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {searchResults.filter(u => !search || u.fullname.toLowerCase().includes(search.toLowerCase())).map(u => (
                <div key={u._id} style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: 14, padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Avatar user={u} size={42} />
                    <p style={{ color: "#f9fafb", fontWeight: 500 }}>{u.fullname}</p>
                    </div>
                    <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", background: "#3b82f610", border: "1px solid #3b82f640", borderRadius: 8, color: "#3b82f6", fontSize: 13, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>
                    <UserPlusIcon /> Add Friend
                    </button>
                </div>
                ))}
            </div>
            </div>
        )}
        </div>
    );
};

export default FriendsPage;