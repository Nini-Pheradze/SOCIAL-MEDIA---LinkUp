import React, { useState } from "react";
import Avatar from "../components/Avatar";
import { timeAgo } from "../utils/helper";
import PostCard  from "../components/PostCard";
import CreatePost from "../components/CreatePost";
import { INITIAL_POSTS } from "../data/mockData";
import { HeartIcon, CommentIcon } from "../components/Icons";

const FeedPage = ({ currentUser }) => {
    const [posts, setPosts] = useState(INITIAL_POSTS);
    
    const handlePost = (form) => {
        const newPost = {
        _id: `p${Date.now()}`, title: form.title || null, content: form.content,
        postImage: null, likes: [], userId: { _id: currentUser._id, fullname: currentUser.fullname },
        comments: [], createdAt: new Date()
        };
        setPosts([newPost, ...posts]);
    };
    
    const handleLike = (postId) => {
        setPosts(posts.map(p => {
        if (p._id !== postId) return p;
        const liked = p.likes.includes(currentUser._id);
        return { ...p, likes: liked ? p.likes.filter(id => id !== currentUser._id) : [...p.likes, currentUser._id] };
        }));
    };
    
    const handleComment = (postId, text) => {
        setPosts(posts.map(p => {
        if (p._id !== postId) return p;
        const newComment = { _id: `c${Date.now()}`, text, user: { _id: currentUser._id, fullname: currentUser.fullname }, createdAt: new Date() };
        return { ...p, comments: [...p.comments, newComment] };
        }));
    };
    
    const handleDelete = (postId) => setPosts(posts.filter(p => p._id !== postId));
    
    const handleEdit = (postId, data) => {
        setPosts(posts.map(p => p._id === postId ? { ...p, ...data } : p));
    };
    
    return (
        <div>
        <CreatePost currentUser={currentUser} onPost={handlePost} />
        {posts.map(p => (
            <div key={p._id} style={{ marginBottom: 14 }}>
            <PostCard post={p} currentUser={currentUser} onLike={handleLike} onComment={handleComment} onDelete={handleDelete} onEdit={handleEdit} />
            </div>
        ))}
        </div>
    );
};

export default FeedPage;