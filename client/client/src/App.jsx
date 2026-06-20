import React, { useState } from "react";

// კომპონენტები
import AuthScreen from "./components/AuthScreen";
import Avatar from "./components/Avatar";
import { HomeIcon, UsersIcon, MessageIcon, GroupIcon, ShieldIcon, LogOutIcon } from "./components/Icons";

// გვერდები
import FeedPage from "./pages/FeedPage";
import FriendsPage from "./pages/FriendsPage";
import MessagesPage from "./pages/MessagesPage";
import GroupsPage from "./pages/GroupsPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("feed");

  // თუ მომხმარებელი არ არის ავტორიზებული, ვაჩვენებთ Login-ს
  if (!user) return <AuthScreen onLogin={setUser} />;

  const NAV = [
    { id: "feed", label: "Feed", icon: <HomeIcon /> },
    { id: "friends", label: "Friends", icon: <UsersIcon /> },
    { id: "messages", label: "Messages", icon: <MessageIcon /> },
    { id: "groups", label: "Groups", icon: <GroupIcon /> },
    { id: "profile", label: "Profile", icon: <Avatar user={user} size={20} /> },
    ...(user.role === "admin" ? [{ id: "admin", label: "Admin", icon: <ShieldIcon /> }] : []),
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", fontFamily: "'DM Sans', sans-serif" }}>
      {/* გლობალური სტილები */}
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .nav-btn { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 10px; background: none; border: none; color: #4b5563; cursor: pointer; font-size: 11px; }
        .nav-btn.active { color: #3b82f6; }
        .fade-in { animation: fadeIn 0.3s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* Header / ნავიგაცია */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "#0a0a0f", borderBottom: "1px solid #111827" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 16px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 58 }}>
          <span style={{ fontWeight: 800, color: "#f9fafb" }}>LinkUp</span>
          <nav style={{ display: "flex", gap: 2 }}>
            {NAV.map(n => (
              <button key={n.id} onClick={() => setPage(n.id)} className={`nav-btn ${page === n.id ? "active" : ""}`}>
                {n.icon}
                <span>{n.label}</span>
              </button>
            ))}
          </nav>
          <button onClick={() => setUser(null)} style={{ background: "transparent", border: "none", color: "#6b7280" }}>
            <LogOutIcon />
          </button>
        </div>
      </header>

      {/* აქტიური გვერდის კონტენტი */}
      <main style={{ maxWidth: 700, margin: "0 auto", padding: "24px 16px 60px" }} className="fade-in" key={page}>
        {page === "feed" && <FeedPage currentUser={user} />}
        {page === "friends" && <FriendsPage currentUser={user} />}
        {page === "messages" && <MessagesPage currentUser={user} />}
        {page === "groups" && <GroupsPage currentUser={user} />}
        {page === "profile" && <ProfilePage currentUser={user} onUpdate={(data) => setUser({...user, ...data})} />}
        {page === "admin" && <AdminPage />}
      </main>
    </div>
  );
}
