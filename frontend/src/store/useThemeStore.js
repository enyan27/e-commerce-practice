import { create } from "zustand";

const useThemeStore = create((set) => ({
    theme: localStorage.getItem("daisyui-theme") || "forest",
    setTheme: (newTheme) => {
        localStorage.setItem("daisyui-theme", newTheme);
        set({ theme: newTheme });
    },
}));

export default useThemeStore;