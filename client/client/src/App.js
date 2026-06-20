import React, { useState } from "react";
import AuthScreen from "./components/AuthScreen";
import FeedPage from "./pages/FeedPage";
import FriendsPage from "./pages/FriendsPage";
import MessagesPage from "./pages/MessagesPage";
import GroupsPage from "./pages/GroupsPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import { Avatar } from "./components/Avatar";
import { HomeIcon, UsersIcon, MessageIcon, GroupIcon, ShieldIcon, LogOutIcon } from "./components/Icons";

export default function App() {
    const [user, setUser] = useState(null);
    const [page, setPage] = useState("feed");

    if (!user) return <AuthScreen onLogin={setUser} />;

    return (
        <div style={{ minHeight: "100vh", background: "#0a0a0f" }}>
        {/* ნავიგაცია და Layout */}
        <main style={{ maxWidth: 700, margin: "0 auto", padding: "24px 16px" }}>
            {page === "feed" && <FeedPage currentUser={user} />}
            {page === "friends" && <FriendsPage currentUser={user} />}
            {page === "messages" && <MessagesPage currentUser={user} />}
            {page === "groups" && <GroupsPage currentUser={user} />}
            {page === "profile" && <ProfilePage currentUser={user} onUpdate={(d) => setUser({...user, ...d})} />}
            {page === "admin" && <AdminPage />}
        </main>
        </div>
    );
}