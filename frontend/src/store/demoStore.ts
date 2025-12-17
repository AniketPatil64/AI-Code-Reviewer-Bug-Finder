import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DemoState {
  attempts: number;
  increment: () => void;
  reset: () => void;
  isLoggedIn: boolean;
  setLoggedIn: (value: boolean) => void;

}

export const useDemoStore = create<DemoState>()(
  persist(
    (set) => ({
      attempts: 0,
      isLoggedIn: false,
      setLoggedIn: (value) => set({ isLoggedIn: value }),
      increment: () =>
        set((state) => ({ attempts: state.attempts + 1 })),
      reset: () => set({ attempts: 0 }),
    }),
    {
      name: "demo-attempts", // key in localStorage
    }
  )
);
