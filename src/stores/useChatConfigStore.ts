import { create } from "zustand";

interface ChatConfigState {
    sidebar: boolean,
    thinking: boolean,
    toggleSidebar: () => void,
    toggleThinking: () => void
}

const useChatConfigStore = create<ChatConfigState>((set, get) => ({
    sidebar: false,
    thinking: false,
    toggleSidebar: () => set((state) => ({ sidebar: !state.sidebar })),
    toggleThinking: () => set((state) => ({ thinking: !state.thinking }))
}))