import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

const EXPIRY_TIME = 7 * 24 * 60 * 60 * 1000;

export const useAuthStore = create((set) => ({
  authUser: null,
  isRegistering: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  // ✅ COMMON SESSION SAVER (used everywhere)
  saveSession: (data) => {
    const expiresAt = Date.now() + EXPIRY_TIME;

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("expiresAt", expiresAt);

    set({ authUser: data.user });
  },

  // ✅ CHECK AUTH (unchanged)
  isAuthenticate: async () => {
    try {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      const expiresAt = localStorage.getItem("expiresAt");

      if (!token || !user || !expiresAt) {
        throw new Error("No session");
      }

      if (Date.now() > Number(expiresAt)) {
        localStorage.clear();
        throw new Error("Session expired");
      }

      set({ authUser: JSON.parse(user) });
    } catch (err) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // ✅ REGISTER
  register: async (data) => {
    set({ isRegistering: true });
    try {
      const response = await axiosInstance.post("/auth/signup", data);

      const expiresAt = Date.now() + EXPIRY_TIME;

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("expiresAt", expiresAt);

      set({ authUser: response.data.user });

      toast.success("Account created successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      set({ isRegistering: false });
    }
  },

  // ✅ LOGIN
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const response = await axiosInstance.post("/auth/login", data);

      const expiresAt = Date.now() + EXPIRY_TIME;

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("expiresAt", expiresAt);

      set({ authUser: response.data.user });

      toast.success("Logged in successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  // ✅ GOOGLE LOGIN (THIS WAS MISSING)
  loginSuccess: (data) => {
    const expiresAt = Date.now() + EXPIRY_TIME;

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("expiresAt", expiresAt);

    set({ authUser: data.user });
  },

  // ✅ LOGOUT
  logout: () => {
    localStorage.clear();
    set({ authUser: null });
    toast.success("Logged out successfully");
  },
}));












// import { create } from "zustand";
// import { axiosInstance } from "../lib/axios.js";
// import toast from "react-hot-toast";

// const EXPIRY_TIME = 7 * 24 * 60 * 60 * 1000;

// export const useAuthStore = create((set) => ({
//   authUser: null,
//   isRegistering: false,
//   isLoggingIn: false,
//   isUpdatingProfile: false,
//   isCheckingAuth: true,

//   isAuthenticate: async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const user = localStorage.getItem("user");
//       const expiresAt = localStorage.getItem("expiresAt");

//       if (!token || !user || !expiresAt) {
//         throw new Error("No session");
//       }

//       if (Date.now() > Number(expiresAt)) {
//         localStorage.clear();
//         throw new Error("Session expired");
//       }

//       set({ authUser: JSON.parse(user) });
//     } catch (err) {
//       set({ authUser: null });
//     } finally {
//       set({ isCheckingAuth: false });
//     }
//   },

//   register: async (data) => {
//     set({ isRegistering: true });
//     try {
//       const response = await axiosInstance.post("/auth/signup", data);

//       const expiresAt = Date.now() + EXPIRY_TIME;

//       localStorage.setItem("token", response.data.token);
//       localStorage.setItem("user", JSON.stringify(response.data.user));
//       localStorage.setItem("expiresAt", expiresAt);

//       set({ authUser: response.data.user });

//       toast.success("Account created successfully");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Registration failed");
//     } finally {
//       set({ isRegistering: false });
//     }
//   },

//   login: async (data) => {
//     set({ isLoggingIn: true });
//     try {
//       const response = await axiosInstance.post("/auth/login", data);

//       const expiresAt = Date.now() + EXPIRY_TIME;

//       localStorage.setItem("token", response.data.token);
//       localStorage.setItem("user", JSON.stringify(response.data.user));
//       localStorage.setItem("expiresAt", expiresAt);

//       set({ authUser: response.data.user });

//       toast.success("Logged in successfully");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Login failed");
//     } finally {
//       set({ isLoggingIn: false });
//     }
//   },

//   logout: () => {
//     localStorage.clear();
//     set({ authUser: null });
//     toast.success("Logged out successfully");
//   },
// }));









// import { create } from "zustand";
// import { axiosInstance } from "../lib/axios.js";
// import toast from "react-hot-toast";

// const EXPIRY_TIME = 7 * 24 * 60 * 60 * 1000;

// export const useAuthStore = create((set, get) => ({
//   authUser: null,
//   isRegistering: false,
//   isLoggingIn: false,
//   isUpdatingProfile: false,
//   isCheckingAuth: true,

//   isAuthenticate: async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const user = localStorage.getItem("user");
//       const expiresAt = localStorage.getItem("expiresAt");

//       if (!token || !expiresAt || !user) {
//         throw Error();
//       }

//       if (Date.now() > Number(expiresAt)) {
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         localStorage.removeItem("expiresAt");
//         throw Error("Session expired");
//       }

//       set({ authUser: JSON.parse(user) });
//     } catch (err) {
//       toast.dismiss();
//       toast.error("Sign-up/Sign-in to access StreamAI", {
//         id: "Unauthenticated user",
//       });
//       set({ authUser: null });
//     } finally {
//       set({ isCheckingAuth: false });
//     }
//   },

//   register: async (data) => {
//     set({ isRegistering: true });
//     try {
//       const response = await axiosInstance.post("/auth/signup", data);
//       const expiresAt = Date.now() + EXPIRY_TIME;
//       localStorage.setItem("token", response.data.token);
//       localStorage.setItem("user", JSON.stringify(response.data.user));
//       localStorage.setItem("expiresAt", expiresAt);

//       set({ authUser: response.data.user });
//       toast.success("Account created successfully");
//     } catch (err) {
//       toast.error(err.response.data.message);
//     } finally {
//       set({ isRegistering: false });
//     }
//   },

//   login: async (data) => {
//     set({ isLoggingIn: true });
//     try {
//       const response = await axiosInstance.post("/auth/login", data);
//       const expiresAt = Date.now() + EXPIRY_TIME;

//       localStorage.setItem("token", response.data.token);
//       localStorage.setItem("user", JSON.stringify(response.data.user));
//       localStorage.setItem("expiresAt", expiresAt);

//       set({ authUser: response.data.user });
//       toast.success("Logged in successfully");
//     } catch (err) {
//       toast.error(err.response.data.message);
//     } finally {
//       set({ isLoggingIn: false });
//     }
//   },

//   logout: async () => {
//     try {
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       localStorage.removeItem("expiresAt");
//       localStorage.removeItem("hasVisited");

//       set({ authUser: null });

//       toast.success("Logged out successfully");
//     } catch (err) {
//       toast.error("Something went wrong during logout");
//     }
//   },

//   updateProfile: async (data) => {},
// }));

// import { create } from "zustand";
// import { axiosInstance } from "../lib/axios.js";
// import toast from "react-hot-toast";

// export const useAuthStore = create((set, get) => ({
//   authUser: null,
//   isRegistering: false,
//   isLoggingIn: false,
//   isUpdatingProfile: false,
//   isCheckingAuth: true,

//   isAuthenticate: async () => {
//     try {
//       const user = localStorage.getItem("user");
//       const token = localStorage.getItem("token");
//       if (token) {
//         set({ authUser: user });
//       } else {
//         throw Error();
//       }
//     } catch (err) {
//       toast.dismiss();
//       toast.success("Sign-up/Sign-in to access StreamAI", {
//         id: "Unauthenticated user",
//       });
//       set({ authUser: null });
//     } finally {
//       set({ isCheckingAuth: false });
//     }
//   },

//   register: async (data) => {
//     set({ isRegistering: true });
//     try {
//       const response = await axiosInstance.post("/auth/signup", data);
//       localStorage.setItem("token", response.data.token);
//       localStorage.setItem("user", response.data.user);
//       set({ authUser: response.data.user });
//       toast.success("Account created successfully");
//     } catch (err) {
//       toast.error(err.response.data.message);
//     } finally {
//       set({ isRegistering: false });
//     }
//   },

//   login: async (data) => {
//     set({ isLoggingIn: true });
//     try {
//       const response = await axiosInstance.post("/auth/login", data);
//       localStorage.setItem("token", response.data.token);
//       localStorage.setItem("user", response.data.user);
//       set({ authUser: response.data.user });
//       toast.success("Logged in successfully");
//     } catch (err) {
//       toast.error(err.response.data.message);
//     } finally {
//       set({ isLoggingIn: false });
//     }
//   },

//   logout: async () => {},

//   updateProfile: async (data) => {},
// }));
