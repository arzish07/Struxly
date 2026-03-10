"use client";

import { createContext, useContext, useReducer, useCallback, useEffect, useState, useMemo, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { getChatHistory, saveChatMessage, getProjectCode, saveProjectCode } from "@/lib/db/firestore";

const CanvasContext = createContext(null);

const initialState = {
    inspectorActive: false,
    selectedElement: null,
    elements: {},
    chatMessages: [
        {
            id: "welcome",
            role: "assistant",
            content:
                "Welcome to Struxly Canvas! 👋 I'm your AI design assistant. Toggle Inspector Mode and click any element to start editing, or just tell me what you'd like to build.",
            timestamp: Date.now(),
        },
    ],
    shopifyConnected: false,
    shopifyStore: null,
    generatedCode: null,
    isGenerating: false,
    projectId: null,
    activeView: "preview", // 'preview' | 'code' | 'analytics'
    deviceView: "desktop", // 'desktop' | 'tablet' | 'mobile'
    isPublished: false,
    suggestions: [],
    isAwaitingInstructions: false,
    promptQueue: [], // Array of { id, text, timestamp }
};

function canvasReducer(state, action) {
    switch (action.type) {
        case "SET_ACTIVE_VIEW":
            return {
                ...state,
                activeView: action.payload,
            };

        case "SET_DEVICE_VIEW":
            return {
                ...state,
                deviceView: action.payload,
            };

        case "SET_IS_PUBLISHED":
            return {
                ...state,
                isPublished: action.payload,
            };

        case "SET_SUGGESTIONS":
            return {
                ...state,
                suggestions: action.payload,
            };

        case "SET_AWAITING_INSTRUCTIONS":
            return {
                ...state,
                isAwaitingInstructions: action.payload,
            };

        case "ADD_TO_QUEUE":
            return {
                ...state,
                promptQueue: [...state.promptQueue, action.payload],
            };

        case "REMOVE_FROM_QUEUE":
            return {
                ...state,
                promptQueue: state.promptQueue.filter(item => item.id !== action.payload),
            };

        case "SHIFT_QUEUE":
            return {
                ...state,
                promptQueue: state.promptQueue.slice(1),
            };

        case "SET_GENERATED_CODE":
            return {
                ...state,
                generatedCode: action.payload,
            };

        case "SET_PROJECT_ID":
            return {
                ...state,
                projectId: action.payload,
            };

        case "SET_CHAT_HISTORY":
            // Force uniqueness for every single message from the database
            const uniqueHistory = action.payload.map((msg, i) => {
                const randomId = Math.random().toString(36).substring(2, 6);
                return {
                    ...msg,
                    id: `${msg.id || 'msg'}-${randomId}`
                };
            });
            return {
                ...state,
                chatMessages: uniqueHistory,
            };

        case "SET_IS_GENERATING":
            return {
                ...state,
                isGenerating: action.payload,
            };

        case "TOGGLE_INSPECTOR":
            return {
                ...state,
                inspectorActive: !state.inspectorActive,
                selectedElement: state.inspectorActive ? null : state.selectedElement,
            };

        case "SELECT_ELEMENT":
            return {
                ...state,
                selectedElement: action.payload,
            };

        case "DESELECT":
            return {
                ...state,
                selectedElement: null,
            };

        case "UPDATE_ELEMENT":
            return {
                ...state,
                elements: {
                    ...state.elements,
                    [action.payload.id]: {
                        ...state.elements[action.payload.id],
                        ...action.payload.updates,
                    },
                },
            };

        case "ADD_MESSAGE": {
            const existingIdx = state.chatMessages.findIndex(m => m.id === action.payload.id);
            if (existingIdx >= 0) {
                const updatedMessages = [...state.chatMessages];
                updatedMessages[existingIdx] = { ...updatedMessages[existingIdx], ...action.payload };
                return {
                    ...state,
                    chatMessages: updatedMessages
                };
            }
            return {
                ...state,
                chatMessages: [...state.chatMessages, action.payload],
            };
        }

        case "CONNECT_SHOPIFY":
            return {
                ...state,
                shopifyConnected: true,
                shopifyStore: action.payload,
            };

        case "DISCONNECT_SHOPIFY":
            return {
                ...state,
                shopifyConnected: false,
                shopifyStore: null,
            };

        default:
            return state;
    }
}

export function CanvasProvider({ children }) {
    const [state, dispatch] = useReducer(canvasReducer, initialState);
    const searchParams = useSearchParams();
    const projectId = searchParams.get('projectId');
    const [isLoaded, setIsLoaded] = useState(false);

    // Initial Load from DB
    useEffect(() => {
        let mounted = true;
        const loadContext = async () => {
            const fallbackKey = searchParams.get('template') || 'default';
            const localKey = `struxly_canvas_${projectId || fallbackKey}`;

            if (projectId) {
                dispatch({ type: "SET_PROJECT_ID", payload: projectId });

                try {
                    // Timeout to prevent hanging if offline - but CATCH it to prevent red screen
                    const timeoutPromise = new Promise((_, reject) =>
                        setTimeout(() => reject(new Error("Canvas fetch timeout")), 5000)
                    );

                    const [history, savedCode] = await Promise.race([
                        Promise.all([
                            getChatHistory(projectId),
                            getProjectCode(projectId)
                        ]),
                        timeoutPromise
                    ]);

                    if (mounted) {
                        if (history && history.length > 0) {
                            dispatch({ type: "SET_CHAT_HISTORY", payload: history });
                        }
                        if (savedCode) {
                            dispatch({ type: "SET_GENERATED_CODE", payload: savedCode });
                        }
                        setIsLoaded(true);
                    }
                } catch (e) {
                    console.warn("Canvas context fetch timed out or failed:", e.message);
                }
            }

            // Fallback to local storage if no DB data or no projectId
            if (mounted) {
                try {
                    const localData = localStorage.getItem(localKey);
                    if (localData) {
                        const parsed = JSON.parse(localData);
                        if (parsed.chatMessages && parsed.chatMessages.length > 1) { // more than just welcome
                            dispatch({ type: "SET_CHAT_HISTORY", payload: parsed.chatMessages });
                        }
                        if (parsed.generatedCode) {
                            dispatch({ type: "SET_GENERATED_CODE", payload: parsed.generatedCode });
                        }
                    }
                } catch (e) { console.error("Error reading local storage", e); }
                setIsLoaded(true);
            }
        };

        if (!isLoaded) {
            loadContext();
        }

        return () => { mounted = false; };
    }, [projectId, isLoaded]);

    // Debounced sync to local storage whenever state changes
    const saveTimerRef = useRef(null);
    useEffect(() => {
        if (!isLoaded) return;
        if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
        saveTimerRef.current = setTimeout(() => {
            const fallbackKey = searchParams.get('template') || 'default';
            const localKey = `struxly_canvas_${projectId || fallbackKey}`;
            try {
                localStorage.setItem(localKey, JSON.stringify({
                    chatMessages: state.chatMessages,
                    generatedCode: state.generatedCode
                }));
            } catch (e) { console.error("Error writing local storage", e); }
        }, 500);
        return () => { if (saveTimerRef.current) clearTimeout(saveTimerRef.current); };
    }, [state.chatMessages, state.generatedCode, isLoaded, searchParams]);

    const toggleInspector = useCallback(() => dispatch({ type: "TOGGLE_INSPECTOR" }), []);
    const selectElement = useCallback(
        (element) => dispatch({ type: "SELECT_ELEMENT", payload: element }),
        []
    );
    const deselectElement = useCallback(() => dispatch({ type: "DESELECT" }), []);
    const updateElement = useCallback(
        (id, updates) => dispatch({ type: "UPDATE_ELEMENT", payload: { id, updates } }),
        []
    );
    const addMessage = useCallback(
        (message) => {
            const randomId = Math.random().toString(36).substring(2, 7);
            const newMessage = { ...message, id: message.id || `msg-${Date.now()}-${randomId}`, timestamp: Date.now() };
            dispatch({
                type: "ADD_MESSAGE",
                payload: newMessage,
            });
            // Persist to DB
            if (state.projectId) {
                saveChatMessage(state.projectId, newMessage).catch(err => console.warn("⚠️ Chat save skipped:", err.message));
            }
        },
        [state.projectId]
    );
    const connectShopify = useCallback(
        (store) => dispatch({ type: "CONNECT_SHOPIFY", payload: store }),
        []
    );
    const setGeneratedCode = useCallback(
        (code) => {
            dispatch({ type: "SET_GENERATED_CODE", payload: code });
            // Persist to DB
            if (state.projectId) {
                saveProjectCode(state.projectId, code).catch(err => console.warn("⚠️ Code save skipped:", err.message));
            }
        },
        [state.projectId]
    );
    const setIsGenerating = useCallback(
        (isGen) => dispatch({ type: "SET_IS_GENERATING", payload: isGen }),
        []
    );
    const setActiveView = useCallback(
        (view) => dispatch({ type: "SET_ACTIVE_VIEW", payload: view }),
        []
    );
    const setDeviceView = useCallback(
        (view) => dispatch({ type: "SET_DEVICE_VIEW", payload: view }),
        []
    );
    const setIsPublished = useCallback(
        (isPub) => dispatch({ type: "SET_IS_PUBLISHED", payload: isPub }),
        []
    );
    const setSuggestions = useCallback(
        (suggestions) => dispatch({ type: "SET_SUGGESTIONS", payload: suggestions }),
        []
    );

    const setIsAwaitingInstructions = useCallback((isAwaiting) => {
        dispatch({ type: "SET_AWAITING_INSTRUCTIONS", payload: isAwaiting });
    }, []);

    const addToQueue = useCallback((text) => {
        dispatch({
            type: "ADD_TO_QUEUE",
            payload: {
                id: `q-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
                text,
                timestamp: Date.now(),
            },
        });
    }, []);

    const removeFromQueue = useCallback((id) => {
        dispatch({ type: "REMOVE_FROM_QUEUE", payload: id });
    }, []);

    const shiftQueue = useCallback(() => {
        const next = state.promptQueue[0] || null;
        dispatch({ type: "SHIFT_QUEUE" });
        return next;
    }, [state.promptQueue]);

    const contextValue = useMemo(() => ({
        ...state,
        toggleInspector,
        selectElement,
        deselectElement,
        updateElement,
        addMessage,
        connectShopify,
        setGeneratedCode,
        setIsGenerating,
        setActiveView,
        setDeviceView,
        setIsPublished,
        setSuggestions,
        setIsAwaitingInstructions,
        addToQueue,
        removeFromQueue,
        shiftQueue,
        isLoaded,
    }), [
        state,
        toggleInspector,
        selectElement,
        deselectElement,
        updateElement,
        addMessage,
        connectShopify,
        setGeneratedCode,
        setIsGenerating,
        setActiveView,
        setDeviceView,
        setIsPublished,
        setSuggestions,
        setIsAwaitingInstructions,
        addToQueue,
        removeFromQueue,
        shiftQueue,
        isLoaded,
    ]);

    return (
        <CanvasContext.Provider value={contextValue}>
            {children}
        </CanvasContext.Provider>
    );
}

export function useCanvas() {
    const context = useContext(CanvasContext);
    if (!context) throw new Error("useCanvas must be used within CanvasProvider");
    return context;
}
