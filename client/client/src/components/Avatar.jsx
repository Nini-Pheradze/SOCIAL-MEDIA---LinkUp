import React from 'react';

const Avatar = ({ user, size = 36 }) => {
    const initials = user?.fullname?.split(" ").map(n => n[0]).join("").toUpperCase() || "?";
    const colors = ["#3b82f6","#8b5cf6","#ec4899","#f59e0b","#10b981","#06b6d4"];
    const color = colors[(user?.fullname?.charCodeAt(0) || 0) % colors.length];

    return (
        <div style={{ 
            width: size, height: size, 
            background: user?.avatar ? "none" : color, 
            borderRadius: "50%", 
            display: "flex", alignItems: "center", justifyContent: "center", 
            fontSize: size * 0.38, fontWeight: 600, color: "#fff", 
            flexShrink: 0, overflow: "hidden", fontFamily: "'DM Sans', sans-serif" 
        }}>
            {user?.avatar ? (
                <img src={user.avatar} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
                initials
            )}
        </div>
    );
};

export default Avatar;