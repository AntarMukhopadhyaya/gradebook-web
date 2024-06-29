// useAuthStore.js
import { BACKEND } from "@/config";
import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface User {
  _id: string;
  __v: number;
  avatar: string;
  created_at: string;
  email: string;
  role: string;
  verified: boolean;
  // Add other user properties as needed
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

const getTokenFromLocalStorage = (): string | null => {
  if (typeof window !== "undefined" && window.localStorage) {
    return localStorage.getItem("authToken");
  }
  return null;
};

const authStore: StateCreator<AuthState> = (set: any) => ({
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
    console.log(userData);
    set({ user: userData });
  },
});

export const useAuthStore = create(authStore);
export default useAuthStore;
