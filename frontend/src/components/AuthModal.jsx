import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { FaGoogle } from "react-icons/fa";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { Lock, Unlock } from "lucide-react";

const AuthModal = ({ open, onClose, defaultTab }) => {
  const { login, register, isLoggingIn, isRegistering, authUser } =
    useAuthStore();

  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  /* ================= DEFAULT TAB ================= */
  useEffect(() => {
    if (open) {
      setActiveTab(defaultTab || "login");
    }
  }, [defaultTab, open]);

  /* ================= RESET FORM WHEN TAB CHANGES ================= */
  useEffect(() => {
    setFormData({
      username: "",
      email: "",
      password: "",
    });
    setShowPassword(false);
  }, [activeTab]);

  /* ================= CLOSE ON SUCCESS ================= */
  useEffect(() => {
    if (authUser && open) {
      onClose();
    }
  }, [authUser, open, onClose]);

  /* ================= ESC CLOSE ================= */
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (open) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  /* ================= LOCK SCROLL ================= */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  /* ================= VALIDATION ================= */

  const validateLogin = () => {
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Invalid email format");
      return false;
    }

    if (!formData.password) {
      toast.error("Password is required");
      return false;
    }

    return true;
  };

  const validateRegister = () => {
    if (!formData.username.trim()) {
      toast.error("Username is required");
      return false;
    }

    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Invalid email format");
      return false;
    }

    if (!formData.password) {
      toast.error("Password is required");
      return false;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (activeTab === "login") {
      if (!validateLogin()) return;

      await login({
        email: formData.email,
        password: formData.password,
      });
    } else {
      if (!validateRegister()) return;

      await register(formData);
    }
  };

  /* ================= IF NOT OPEN, RENDER NOTHING ================= */
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[999] px-4 transition-all duration-400">
      <div className="bg-[#18181B] w-full max-w-md rounded-xl px-6 pt-12 pb-6 relative border border-[#26262C]">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-3 top-4 text-gray-400 hover:text-white cursor-pointer"
        >
          <IoClose className="size-5" />
        </button>

        {/* Tabs */}
        <div className="flex mb-6 bg-[#0E0E10] rounded-lg p-1">
          <button
            onClick={() => setActiveTab("login")}
            className={`flex-1 py-2 rounded-md font-semibold transition cursor-pointer ${
              activeTab === "login"
                ? "bg-[#53FC18] text-black"
                : "text-gray-400"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setActiveTab("register")}
            className={`flex-1 py-2 rounded-md font-semibold transition cursor-pointer ${
              activeTab === "register"
                ? "bg-[#53FC18] text-black"
                : "text-gray-400"
            }`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {activeTab === "register" && (
            <input
              type="text"
              placeholder="Username"
              className="w-full bg-[#0E0E10] border border-[#26262C] px-4 py-2 rounded-md focus:outline-none focus:border-[#53FC18]"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          )}

          <input
            placeholder="Email"
            className="w-full bg-[#0E0E10] border border-[#26262C] px-4 py-2 rounded-md focus:outline-none focus:border-[#53FC18]"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full bg-[#0E0E10] border border-[#26262C] px-4 py-2 rounded-md focus:outline-none focus:border-[#53FC18]"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-[#53FC18] transition cursor-pointer"
            >
              {showPassword ? <Unlock size={18} /> : <Lock size={18} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoggingIn || isRegistering}
            className={`w-full bg-[#53FC18] hover:brightness-90 text-black font-semibold py-2 rounded-md transition disabled:opacity-60 ${isLoggingIn || isRegistering ? "cursor-not-allowed" : "cursor-pointer"}`}
          >
            {activeTab === "login"
              ? isLoggingIn
                ? "Logging in..."
                : "Login"
              : isRegistering
                ? "Creating..."
                : "Create Account"}
          </button>

          <button
            type="button"
            className="w-full flex flex-wrap items-center justify-center gap-4 border border-[#26262C] py-2 rounded-md hover:bg-[#26262C] transition cursor=pointer"
          >
            <FaGoogle />
            <span>Continue with Google</span>
          </button>
        </form>
        {/* Bottom Toggle Text */}
        <div className="text-center text-sm mt-5 text-gray-400">
          {activeTab === "login" ? (
            <>
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={() => setActiveTab("register")}
                className="text-[#53FC18] hover:underline font-medium"
              >
                Create Account
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setActiveTab("login")}
                className="text-[#53FC18] hover:underline font-medium"
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
