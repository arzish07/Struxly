import { db } from "../firebase";
import {
    collection,
    doc,
    setDoc,
    getDoc,
    getDocs,
    query,
    where,
    orderBy,
    addDoc,
    updateDoc,
    serverTimestamp,
    deleteDoc
} from "firebase/firestore";

// --- PROJECTS ---

export async function createProject(userId, projectData) {
    if (!userId) throw new Error("A user ID is required to create a project.");

    try {
        const projectRef = doc(collection(db, "projects"));
        const newProject = {
            ...projectData,
            id: projectRef.id,
            userId,
            createdAt: serverTimestamp(),
            lastEdited: serverTimestamp()
        };

        await setDoc(projectRef, newProject);
        return newProject;
    } catch (e) {
        console.warn("⚠️ Bypass: createProject failed (Datastore offline)", e.message);
        return {
            ...projectData,
            id: `temp-${Date.now()}`,
            userId,
            createdAt: new Date(),
            lastEdited: new Date()
        };
    }
}

export async function getProjects(userId) {
    if (!userId) return [];

    try {
        const projectsQuery = query(
            collection(db, "projects"),
            where("userId", "==", userId),
            orderBy("lastEdited", "desc")
        );

        const snapshot = await getDocs(projectsQuery);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            // Convert timestamp to readable date or keep it as Date object depending on UI needs
            createdAt: doc.data().createdAt?.toDate() || new Date(),
            lastEdited: doc.data().lastEdited?.toDate() || new Date()
        }));
    } catch (e) {
        console.warn("⚠️ Bypass: getProjects failed (Datastore offline)", e.message);
        return [];
    }
}

export async function updateProject(projectId, updates) {
    if (!projectId) return null;

    try {
        const projectRef = doc(db, "projects", projectId);
        await updateDoc(projectRef, {
            ...updates,
            lastEdited: serverTimestamp()
        });
        return true;
    } catch (e) {
        console.warn("⚠️ Bypass: updateDoc failed (Datastore offline or missing)", e.message);
        return false;
    }
}

export async function deleteProject(projectId) {
    if (!projectId) return false;

    try {
        const projectRef = doc(db, "projects", projectId);
        await deleteDoc(projectRef);
        return true;
    } catch (e) {
        console.warn("⚠️ Bypass: deleteProject failed (Datastore offline or missing)", e.message);
        return false;
    }
}

// --- CANVAS MEMORY (Chat & Elements) ---

export async function saveChatMessage(projectId, message) {
    if (!projectId) throw new Error("A project ID is required to save a message.");

    try {
        const messagesRef = collection(db, "projects", projectId, "messages");

        // We can use addDoc since we might not have a reliable ID yet, or setDoc if we do
        const newMessage = {
            ...message,
            timestamp: serverTimestamp()
        };

        if (message.id) {
            await setDoc(doc(messagesRef, message.id), newMessage);
        } else {
            await addDoc(messagesRef, newMessage);
        }

        // Update the parent project's lastEdited time
        await updateProject(projectId, {});

        return newMessage;
    } catch (e) {
        console.warn("⚠️ Bypass: saveChatMessage failed (Datastore offline)", e.message);
        return message;
    }
}

export async function getChatHistory(projectId) {
    if (!projectId) return [];

    try {
        const messagesQuery = query(
            collection(db, "projects", projectId, "messages"),
            orderBy("timestamp", "asc")
        );

        const snapshot = await getDocs(messagesQuery);
        return snapshot.docs.map(doc => ({
            ...doc.data(),
            timestamp: doc.data().timestamp?.toMillis() || Date.now()
        }));
    } catch (e) {
        console.warn("⚠️ Bypass: getChatHistory failed", e.message);
        return [];
    }
}

export async function saveProjectCode(projectId, code) {
    if (!projectId) return;
    return await updateProject(projectId, { currentCode: code });
}

export async function getProjectCode(projectId) {
    if (!projectId) return null;
    try {
        const projectRef = doc(db, "projects", projectId);
        const snap = await getDoc(projectRef);
        if (snap.exists()) {
            return snap.data().currentCode || null;
        }
        return null;
    } catch (e) {
        console.warn("⚠️ Bypass: getProjectCode failed", e.message);
        return null;
    }
}
