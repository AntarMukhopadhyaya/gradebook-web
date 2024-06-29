// useAuthStore.js
import { BACKEND } from "@/config";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const getTokenFromLocalStorage = (): string | null => {
  if (typeof window !== "undefined" && window.localStorage) {
    return localStorage.getItem("authToken");
  }
  return null;
};

const authStore = (set) => ({
  user: null,
  token: getTokenFromLocalStorage(),
  isAuthenticated: !!getTokenFromLocalStorage(),
  login: async (token: string) => {
    localStorage.setItem("authToken", token);
    set({ token, isAuthenticated: true });
    await useAuthStore.getState().fetchUser();
  },
  logout: () => {
    localStorage.removeItem("authToken");
    set({ user: null, token: null, isAuthenticated: false });
  },
  fetchUser: async () => {
    const token = useAuthStore.getState().token;
    if (!token) return;

    // Replace with your actual API call to fetch user details
    const response = await fetch(`${BACKEND}/u/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const userData = await response.json();
    set({ user: userData });
  },
});

export const useAuthStore = create(
  persist(devtools(authStore), { name: "auth-storage" })
);
export default useAuthStore;
