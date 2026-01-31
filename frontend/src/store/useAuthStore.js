import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isRegistering: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  isAuthenticate: async () => {
    try {
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      if (token) {
        set({ authUser: user });
      } else {
        throw Error();
      }
    } catch (err) {
      toast.dismiss();
      toast.success("Sign-up/Sign-in to access StreamAI", {
        id: "Unauthenticated user",
      });
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  
  register: async (data) => {
    set({ isRegistering: true });
    try {
      const response = await axiosInstance.post("/auth/signup", data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", response.data.user);
      set({ authUser: response.data.user });
      toast.success("Account created successfully");
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      set({ isRegistering: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const response = await axiosInstance.post("/auth/login", data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", response.data.user);
      set({ authUser: response.data.user });
      toast.success("Logged in successfully");
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {},

  updateProfile: async (data) => {},
}));
