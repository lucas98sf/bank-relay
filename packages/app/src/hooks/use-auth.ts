import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
  isAuthenticated: boolean;
  accountId: string | null;
  setAuth: (isAuthenticated: boolean, accountId?: string | null) => void;
  logout: () => void;
};

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      accountId: null as string | null,
      setAuth: (isAuthenticated, accountId = null) =>
        set({ isAuthenticated, accountId }),
      logout: () => set({ isAuthenticated: false, accountId: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);
