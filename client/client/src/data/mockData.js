export const MOCK_USER = {
    _id: "u1", fullname: "Alex Rivera", email: "alex@linkup.com",
    avatar: null, coverPhoto: null, role: "user", isBanned: false
};

export const INITIAL_POSTS = [
    { _id: "p1", title: "Golden Hour", content: "Sometimes the best moments are the ones you don't plan.", postImage: null, likes: ["u2", "u3"], userId: { _id: "u2", fullname: "Sam Chen" }, comments: [{ _id: "c1", text: "So true!", user: { _id: "u3", fullname: "Mia Torres" }, createdAt: new Date() }], createdAt: new Date(Date.now() - 3600000) },
    { _id: "p2", title: "New project dropped", content: "Been working on something exciting — can't wait to share it with everyone here. Stay tuned! 🚀", postImage: null, likes: ["u1"], userId: { _id: "u3", fullname: "Mia Torres" }, comments: [], createdAt: new Date(Date.now() - 7200000) },
    { _id: "p3", title: null, content: "Coffee, code, repeat. That's the whole vibe today.", postImage: null, likes: [], userId: { _id: "u1", fullname: "Alex Rivera" }, comments: [], createdAt: new Date(Date.now() - 86400000) },
];

export const MOCK_FRIENDS = [
    { _id: "u2", fullname: "Sam Chen", avatar: null },
    { _id: "u3", fullname: "Mia Torres", avatar: null },
    { _id: "u4", fullname: "Jordan Lee", avatar: null },
];

export const MOCK_REQUESTS = [
    { _id: "r1", sender: { _id: "u5", fullname: "Casey Park", avatar: null } },
];

export const MOCK_MESSAGES = {
    u2: [
        { _id: "m1", sender: "u2", text: "Hey! How's the project going?", createdAt: new Date(Date.now() - 3600000) },
        { _id: "m2", sender: "u1", text: "Pretty well! Making good progress. How about you?", createdAt: new Date(Date.now() - 3500000) },
    ],
    u3: [
        { _id: "m3", sender: "u3", text: "Did you see my latest post?", createdAt: new Date(Date.now() - 7200000) },
    ],
};

export const MOCK_GROUPS = [
    { _id: "g1", name: "React Developers", description: "All things React", members: ["u1", "u2"], admin: "u2" },
    { _id: "g2", name: "Design Folks", description: "UI/UX discussions", members: ["u1", "u3"], admin: "u3" },
];

export const MOCK_ADMIN_USERS = [
    { _id: "u2", fullname: "Sam Chen", email: "sam@linkup.com", isBanned: false, role: "user" },
    { _id: "u3", fullname: "Mia Torres", email: "mia@linkup.com", isBanned: false, role: "user" },
    { _id: "u5", fullname: "Casey Park", email: "casey@linkup.com", isBanned: true, role: "user" },
];
