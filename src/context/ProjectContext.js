"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";
import { createProject, getProjects as fetchFromDB, updateProject, deleteProject } from "@/lib/db/firestore";

const ProjectContext = createContext();

const getTime = (val) => {
    if (!val) return 0;
    if (val.toMillis) return val.toMillis();
    if (val instanceof Date) return val.getTime();
    if (val.seconds) return val.seconds * 1000;
    const d = new Date(val);
    return isNaN(d.getTime()) ? 0 : d.getTime();
};

export function ProjectProvider({ children }) {
    const { user } = useAuth();
    const [projects, setProjects] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Initial load from Firestore OR local storage
    useEffect(() => {
        let mounted = true;
        const loadProjects = async () => {
            if (user?.uid) {
                try {
                    // Timeout to prevent hanging if offline - but CATCH it to prevent red screen
                    const timeoutPromise = new Promise((_, reject) =>
                        setTimeout(() => reject(new Error("Firestore fetch timeout")), 5000)
                    );

                    const dbProjects = await Promise.race([
                        fetchFromDB(user.uid),
                        timeoutPromise
                    ]);

                    if (mounted) {
                        const sortedDb = dbProjects.sort((a, b) => {
                            const timeA = Math.max(getTime(a.lastEdited), getTime(a.createdAt));
                            const timeB = Math.max(getTime(b.lastEdited), getTime(b.createdAt));
                            return timeB - timeA;
                        });
                        setProjects(sortedDb);
                        setIsLoaded(true);
                    }
                } catch (e) {
                    console.warn("Firestore fetch timed out or failed, using local fallback:", e.message);
                    // Fallback to local storage if DB fails
                    try {
                        const savedProjects = localStorage.getItem("struxly_projects");
                        if (savedProjects && mounted) {
                            const parsed = JSON.parse(savedProjects);
                            const sortedLocal = parsed.sort((a, b) => {
                                const timeA = Math.max(getTime(a.lastEdited), getTime(a.createdAt));
                                const timeB = Math.max(getTime(b.lastEdited), getTime(b.createdAt));
                                return timeB - timeA;
                            });
                            setProjects(sortedLocal);
                        }
                    } catch (localError) {
                        // ignore local store errors
                    }
                    if (mounted) setIsLoaded(true);
                }
            } else {
                // Not logged in or waiting: Try local storage
                try {
                    const savedProjects = localStorage.getItem("struxly_projects");
                    if (savedProjects && mounted) {
                        const parsed = JSON.parse(savedProjects);
                        const sortedLocal = parsed.sort((a, b) => {
                            const timeA = Math.max(getTime(a.lastEdited), getTime(a.createdAt));
                            const timeB = Math.max(getTime(b.lastEdited), getTime(b.createdAt));
                            return timeB - timeA;
                        });
                        setProjects(sortedLocal);
                    }
                } catch (e) {
                    // ignore
                }
                if (mounted) {
                    setIsLoaded(true);
                }
            }
        };

        if (user !== undefined) {
            loadProjects();
        }

        return () => { mounted = false; };
    }, [user]);

    // Save ALL projects to local storage as a backup
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("struxly_projects", JSON.stringify(projects));
        }
    }, [projects, isLoaded]);

    const addProject = async (projectDetails) => {
        const baseProject = {
            slug: projectDetails.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
            title: projectDetails.name,
            templateSlug: projectDetails.templateSlug || null,
            image: projectDetails.image || null,
            type: "Website",
            badge: projectDetails.badge || "Draft",
        };

        const tempId = `temp-${Date.now()}`;
        const optimisticProject = { ...baseProject, id: tempId, lastEdited: new Date(), createdAt: new Date() };

        // Optimistic update
        setProjects(prev => [optimisticProject, ...prev]);

        if (!user?.uid) {
            return optimisticProject; // Proceed with temporary project for guests
        }

        try {
            // Give Firebase 3 seconds maximum to respond, otherwise we assume it's stuck (offline/permission issues)
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Firestore timeout")), 3000)
            );

            const newProject = await Promise.race([
                createProject(user.uid, baseProject),
                timeoutPromise
            ]);

            // Replace optimistic with real
            setProjects(prev => prev.map(p => p.id === tempId ? newProject : p));
            return newProject;
        } catch (error) {
            console.warn("⚠️ Project create DB save failed, using local temp:", error.message);
            // Even if it failed to save to DB, let the user continue with the temporary project
            return optimisticProject;
        }
    };

    const touchProject = useCallback(async (projectId) => {
        if (!projectId) return;

        const now = new Date();

        // Update local state
        setProjects(prev => {
            const updated = prev.map(p => {
                if (p.id === projectId) {
                    return { ...p, lastEdited: now };
                }
                return p;
            });
            // Re-sort so current appears first immediately
            return [...updated].sort((a, b) => {
                const timeA = Math.max(getTime(a.lastEdited), getTime(a.createdAt));
                const timeB = Math.max(getTime(b.lastEdited), getTime(b.createdAt));
                return timeB - timeA;
            });
        });

        if (user?.uid && !projectId.toString().startsWith('temp-')) {
            try {
                await updateProject(projectId, { lastEdited: now });
            } catch (error) {
                console.warn("⚠️ Touch project timestamp skipped:", error.message);
            }
        }
    }, [user?.uid]);

    const updateProjectDetails = async (projectId, updates) => {
        if (!projectId) return;

        // Optimistic update
        setProjects(prev => prev.map(p => {
            if (p.id === projectId) {
                return { ...p, ...updates, lastEdited: new Date() };
            }
            return p;
        }));

        if (user?.uid && !projectId.toString().startsWith('temp-')) {
            try {
                await updateProject(projectId, { ...updates, lastEdited: new Date() });
            } catch (error) {
                console.warn("⚠️ Update project details skipped:", error.message);
            }
        }
    };

    const publishProject = async (projectId) => {
        const pToPublish = projects.find(p => p.id === projectId);
        if (!pToPublish) return;

        const slug = pToPublish.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        const publishedUrl = `${slug}.struxly.app`;

        // Optimistic update
        setProjects(prev => prev.map(p => {
            if (p.id === projectId) {
                return {
                    ...p,
                    badge: "Published",
                    publishedUrl,
                    publishedAt: new Date(),
                };
            }
            return p;
        }));

        try {
            await updateProject(projectId, {
                badge: "Published",
                publishedUrl,
                publishedAt: new Date(),
            });
        } catch (error) {
            console.warn("⚠️ Publish project skipped:", error.message);
        }
    };

    const removeProject = async (projectId) => {
        if (!projectId) return;

        // Optimistic update
        setProjects(prev => prev.filter(p => p.id !== projectId));

        if (user?.uid && !projectId.toString().startsWith('temp-')) {
            try {
                await deleteProject(projectId);
            } catch (error) {
                console.warn("⚠️ Delete project skipped:", error.message);
            }
        }
    };

    return (
        <ProjectContext.Provider value={{ projects, addProject, publishProject, touchProject, updateProjectDetails, removeProject, isLoaded }}>
            {children}
        </ProjectContext.Provider>
    );
}

export function useProjects() {
    const context = useContext(ProjectContext);
    if (!context) {
        throw new Error("useProjects must be used within a ProjectProvider");
    }
    return context;
}
