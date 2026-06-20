const BASE_URL = "http://localhost:3000/api";

export const api = {
    // --- აუტენტიფიკაცია ---
    login: async (credentials) => {
        try {
        const res = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        });
        if (!res.ok) throw new Error("Login failed");
        return await res.json();
        } catch (error) {
        console.error(error);
        return { error: error.message };
        }
    },

    // --- პოსტები ---
    getPosts: async () => {
        try {
        const res = await fetch(`${BASE_URL}/posts`);
        return await res.json();
        } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
        }
    },

    createPost: async (postData) => {
        try {
        const res = await fetch(`${BASE_URL}/posts`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(postData),
        });
        return await res.json();
        } catch (error) {
        console.error("Error creating post:", error);
        }
    },

    // --- ჯგუფები ---
    getGroups: async () => {
        try {
        const res = await fetch(`${BASE_URL}/groups`);
        return await res.json();
        } catch (error) {
        console.error("Error fetching groups:", error);
        return [];
        }
    },

    createGroup: async (groupData) => {
        try {
        const res = await fetch(`${BASE_URL}/groups`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(groupData),
        });
        return await res.json();
        } catch (error) {
        console.error("Error creating group:", error);
        }
    },

    // --- მომხმარებლის პროფილი ---
    updateProfile: async (id, userData) => {
        try {
        const res = await fetch(`${BASE_URL}/users/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });
        return await res.json();
        } catch (error) {
        console.error("Error updating profile:", error);
        }
    }
};