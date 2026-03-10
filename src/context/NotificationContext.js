"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { collection, doc, query, orderBy, onSnapshot, addDoc, updateDoc, writeBatch, serverTimestamp, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "./AuthContext";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    // Listen to real-time notifications from Firestore
    useEffect(() => {
        if (!user?.uid) {
            setNotifications([]);
            setUnreadCount(0);
            return;
        }

        const notificationsRef = collection(db, "users", user.uid, "notifications");
        const q = query(notificationsRef, orderBy("createdAt", "desc"), limit(50));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const notifs = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate() || new Date()
            }));

            setNotifications(notifs);
            setUnreadCount(notifs.filter(n => !n.read).length);
        }, (error) => {
            console.warn("⚠️ Error fetching notifications:", error.message);
        });

        return () => unsubscribe();
    }, [user]);

    const addNotification = useCallback(async ({ type = "info", title, message, link = null }) => {
        if (!user?.uid) return;

        try {
            // Anti-spam check: prevent duplicate recent notifications
            if (notifications.some(n => n.title === title && !n.read && (new Date() - n.createdAt) < 1000 * 60 * 60 * 24)) {
                return; // Duplicate within 24 hours that is unread
            }

            const notificationsRef = collection(db, "users", user.uid, "notifications");
            await addDoc(notificationsRef, {
                type,
                title,
                message,
                link,
                read: false,
                createdAt: serverTimestamp()
            });
        } catch (error) {
            console.warn("⚠️ Failed to add notification:", error.message);
        }
    }, [user, notifications]);

    const markAsRead = useCallback(async (id) => {
        if (!user?.uid || !id) return;

        // Optimistic update
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));

        try {
            const notifRef = doc(db, "users", user.uid, "notifications", id);
            await updateDoc(notifRef, { read: true });
        } catch (error) {
            console.warn("⚠️ Failed to mark notification as read:", error.message);
        }
    }, [user]);

    const markAllAsRead = useCallback(async () => {
        if (!user?.uid || notifications.length === 0) return;

        const unread = notifications.filter(n => !n.read);
        if (unread.length === 0) return;

        // Optimistic update
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));

        try {
            const batch = writeBatch(db);
            unread.forEach(n => {
                const notifRef = doc(db, "users", user.uid, "notifications", n.id);
                batch.update(notifRef, { read: true });
            });
            await batch.commit();
        } catch (error) {
            console.warn("⚠️ Failed to mark all notifications as read:", error.message);
        }
    }, [user, notifications]);

    const removeNotification = useCallback(async (id) => {
        if (!user?.uid || !id) return;

        // Let's actually just hide it locally for now, real delete can be added if needed
        // For simplicity, we just mark as read if they "dismiss" it from a toast
        await markAsRead(id);
    }, [user, markAsRead]);

    return (
        <NotificationContext.Provider value={{
            notifications,
            unreadCount,
            addNotification,
            markAsRead,
            markAllAsRead,
            removeNotification
        }}>
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotifications() {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error("useNotifications must be used within a NotificationProvider");
    }
    return context;
}
