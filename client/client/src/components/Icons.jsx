import React, { useState } from 'react';
import Avatar from './Avatar';

export const Icon = ({ path, size = 20, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d={path} />
    </svg>
);

export const HomeIcon = () => <Icon path="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10" />;
export const UsersIcon = () => <Icon path="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8z M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75" />;
export const MessageIcon = () => <Icon path="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />;
export const GroupIcon = () => <Icon path="M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5" />;
export const SearchIcon = () => <Icon path="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />;
export const HeartIcon = ({ filled }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
);
export const CommentIcon = () => <Icon path="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" size={18} />;
export const EditIcon = () => <Icon path="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" size={16} />;
export const TrashIcon = () => <Icon path="M3 6h18 M8 6V4h8v2 M19 6l-1 14H6L5 6" size={16} />;
export const SendIcon = () => <Icon path="M22 2L11 13 M22 2L15 22 9 13 2 9z" size={18} />;
export const LogOutIcon = () => <Icon path="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4 M16 17l5-5-5-5 M21 12H9" size={18} />;
export const ImageIcon = () => <Icon path="M21 19a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h4l2-3h4l2 3h4a2 2 0 012 2z M12 13a3 3 0 100-6 3 3 0 000 6z" size={18} />;
export const PlusIcon = () => <Icon path="M12 5v14 M5 12h14" size={18} />;
export const UserCheckIcon = () => <Icon path="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8z M17 11l2 2 4-4" size={16} />;
export const UserPlusIcon = () => <Icon path="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8z M20 8v6 M23 11h-6" size={16} />;
export const ShieldIcon = () => <Icon path="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" size={18} />;
export const XIcon = () => <Icon path="M18 6L6 18 M6 6l12 12" size={16} />;
export const CameraIcon = () => <Icon path="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z M12 17a4 4 0 100-8 4 4 0 000 8z" size={16} />;