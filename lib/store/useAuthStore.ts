import { create } from "zustand";
type AuthStore = {
    userId: string | null;
    setUserId: (id: string) => void;

    hideHeader: boolean;
    setHideHeader: (value: boolean) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
    userId: null,
    setUserId: (id) => set({ userId: id }),

    hideHeader: false,
    setHideHeader: (value) => set({ hideHeader: value }),
}));
