import { create } from "zustand";
type UiStore = {
    hideHeader: boolean;
    setHideHeader: (value: boolean) => void;

    showChatWindow: boolean;
    setShowChatWindow: (value: boolean) => void;

    showChatInfo: boolean;
    setShowChatInfo: (value: boolean) => void;
};

export const useUiStore = create<UiStore>((set) => ({
    hideHeader: false,
    setHideHeader: (value) => set({ hideHeader: value }),

    showChatWindow: false,
    setShowChatWindow: (value) => {
        console.log("chat window", value);
        return set({ showChatWindow: value });
    },

    showChatInfo: false,
    setShowChatInfo: (value) => {
        console.log("chat info", value);
        return set({ showChatInfo: value });
    },
}));
