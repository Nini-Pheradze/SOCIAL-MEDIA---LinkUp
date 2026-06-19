import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import Auth from './pages/Auth';
import Feed from './pages/Feed';
import Chat from './pages/Chat';
import Profile from './pages/Profile';

function ProtectedRoutes({ children }) {
    const { user } = useContext(AuthContext);
    return user ? children : <Navigate to="/auth" />;
}

export default function App() {
    return (
        <AuthProvider>
            <Router>
                <SocketProvider>
                    <Routes>
                        <Route path="/auth" element={<Auth />} />
                        <Route path="/feed" element={<ProtectedRoutes><Feed /></ProtectedRoutes>} />
                        <Route path="/chat" element={<ProtectedRoutes><Chat /></ProtectedRoutes>} />
                        <Route path="/profile" element={<ProtectedRoutes><Profile /></ProtectedRoutes>} />
                        <Route path="*" element={<Navigate to="/feed" />} />
                    </Routes>
                </SocketProvider>
            </Router>
        </AuthProvider>
    );
}