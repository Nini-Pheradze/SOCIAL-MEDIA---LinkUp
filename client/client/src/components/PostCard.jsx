import React, { useState } from 'react';
import Avatar from './Avatar';
import { EditIcon, TrashIcon, HeartIcon, CommentIcon, SendIcon } from './Icons'; 
import { timeAgo } from '../utils/helper';

const PostCard = ({ post, currentUser, onLike, onComment, onDelete, onEdit }) => {
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [editing, setEditing] = useState(false);
    const [editData, setEditData] = useState({ title: post.title || "", content: post.content });
    const liked = post.likes.includes(currentUser._id);
    const isOwn = post.userId._id === currentUser._id;
    
    return (
        <div style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: 16, overflow: "hidden", transition: "border-color 0.2s" }}
        onMouseEnter={e => e.currentTarget.style.borderColor = "#374151"}
        onMouseLeave={e => e.currentTarget.style.borderColor = "#1f2937"}>
        
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 18px 12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Avatar user={post.userId} size={38} />
            <div>
                <p style={{ color: "#f9fafb", fontSize: 14, fontWeight: 600 }}>{post.userId.fullname}</p>
                <p style={{ color: "#4b5563", fontSize: 12 }}>{timeAgo(post.createdAt)}</p>
            </div>
            </div>
            {isOwn && !editing && (
            <div style={{ display: "flex", gap: 6 }}>
                <button onClick={() => setEditing(true)} style={{ padding: "6px", background: "transparent", border: "none", color: "#6b7280", borderRadius: 8, transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#1f2937"; e.currentTarget.style.color = "#f9fafb"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#6b7280"; }}><EditIcon /></button>
                <button onClick={() => onDelete(post._id)} style={{ padding: "6px", background: "transparent", border: "none", color: "#6b7280", borderRadius: 8, transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#7f1d1d20"; e.currentTarget.style.color = "#ef4444"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#6b7280"; }}><TrashIcon /></button>
            </div>
            )}
        </div>
    
        {/* Content */}
        <div style={{ padding: "0 18px 16px" }}>
            {editing ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <input value={editData.title} onChange={e => setEditData({...editData, title: e.target.value})} placeholder="Title (optional)" style={{ background: "#0d1117", border: "1px solid #374151", borderRadius: 8, padding: "10px 14px", color: "#f9fafb", fontSize: 14, fontFamily: "'DM Sans', sans-serif" }} />
                <textarea value={editData.content} onChange={e => setEditData({...editData, content: e.target.value})} rows={3} style={{ background: "#0d1117", border: "1px solid #374151", borderRadius: 8, padding: "10px 14px", color: "#f9fafb", fontSize: 14, resize: "none", fontFamily: "'DM Sans', sans-serif" }} />
                <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => { onEdit(post._id, editData); setEditing(false); }} style={{ padding: "8px 16px", background: "#3b82f6", border: "none", borderRadius: 8, color: "#fff", fontSize: 13, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>Save</button>
                <button onClick={() => setEditing(false)} style={{ padding: "8px 16px", background: "#1f2937", border: "none", borderRadius: 8, color: "#9ca3af", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>Cancel</button>
                </div>
            </div>
            ) : (
            <>
                {post.title && <p style={{ color: "#f9fafb", fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{post.title}</p>}
                <p style={{ color: "#9ca3af", fontSize: 14, lineHeight: 1.6 }}>{post.content}</p>
            </>
            )}
        </div>
    
        {/* Actions */}
        {!editing && (
            <div style={{ padding: "12px 18px", borderTop: "1px solid #1f2937", display: "flex", alignItems: "center", gap: 16 }}>
            <button onClick={() => onLike(post._id)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: liked ? "#ef4444" : "#6b7280", fontSize: 13, fontWeight: 500, transition: "color 0.2s", fontFamily: "'DM Sans', sans-serif" }}>
                <HeartIcon filled={liked} />
                <span>{post.likes.length}</span>
            </button>
            <button onClick={() => setShowComments(!showComments)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "#6b7280", fontSize: 13, fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>
                <CommentIcon />
                <span>{post.comments.length}</span>
            </button>
            </div>
        )}
    
        {/* Comments */}
        {showComments && !editing && (
            <div style={{ borderTop: "1px solid #1f2937", padding: "14px 18px" }}>
            {post.comments.map(c => (
                <div key={c._id} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                <Avatar user={c.user} size={28} />
                <div style={{ background: "#0d1117", borderRadius: 10, padding: "8px 12px", flex: 1 }}>
                    <p style={{ color: "#60a5fa", fontSize: 12, fontWeight: 600, marginBottom: 2 }}>{c.user.fullname}</p>
                    <p style={{ color: "#9ca3af", fontSize: 13 }}>{c.text}</p>
                </div>
                </div>
            ))}
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <Avatar user={currentUser} size={28} />
                <div style={{ flex: 1, display: "flex", gap: 8 }}>
                <input value={commentText} onChange={e => setCommentText(e.target.value)} placeholder="Write a comment..." onKeyDown={e => { if (e.key === "Enter" && commentText.trim()) { onComment(post._id, commentText); setCommentText(""); }}}
                    style={{ flex: 1, background: "#0d1117", border: "1px solid #1f2937", borderRadius: 20, padding: "8px 14px", color: "#f9fafb", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }} />
                <button onClick={() => { if (commentText.trim()) { onComment(post._id, commentText); setCommentText(""); }}}
                    style={{ padding: "8px 12px", background: "#3b82f6", border: "none", borderRadius: 20, color: "#fff", display: "flex", alignItems: "center" }}><SendIcon /></button>
                </div>
            </div>
            </div>
        )}
        </div>
    );
};

export default PostCard;