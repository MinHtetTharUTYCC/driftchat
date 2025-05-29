import { create } from "zustand";
type AuthStore = {
    userId: string | null;
    setUserId: (id: string) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
    userId: null,
    setUserId: (id) => set({ userId: id }),
}));
