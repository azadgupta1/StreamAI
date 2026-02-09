import { useState } from "react";
import { axiosInstance } from "../../lib/axios";
import { useAuthStore } from "../../store/useAuthStore";

const SettingsPanel = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const { logout } = useAuthStore();

  /* ================= PASSWORD VALIDATION ================= */
  const isStrongPassword = (pwd) => {
    return pwd.length >= 6; // change if you want stricter rules
  };

  /* ================= CHANGE PASSWORD ================= */
  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      return alert("Fill all fields");
    }

    if (newPassword !== confirmPassword) {
      return alert("Passwords do not match");
    }

    if (!isStrongPassword(newPassword)) {
      return alert("Password must be at least 6 characters");
    }

    try {
      setLoading(true);

      await axiosInstance.put("users/change-password", {
        currentPassword,
        newPassword,
      });

      alert("Password updated. Please login again.");
      logout();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE ACCOUNT ================= */
  const handleDeleteAccount = async () => {
    if (deleteConfirm !== "DELETE") {
      return alert('Type "DELETE" exactly to confirm');
    }

    if (!window.confirm("This will permanently delete your account. Continue?"))
      return;

    try {
      setLoading(true);

      await axiosInstance.delete("users/delete-account");

      alert("Account deleted successfully");

      localStorage.removeItem("token");
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to delete account");
    } finally {
      setLoading(false);
    }
  };

  const passwordValid =
    currentPassword &&
    newPassword &&
    confirmPassword &&
    newPassword === confirmPassword &&
    isStrongPassword(newPassword);

  return (
    <div className="max-w-3xl space-y-6">
      <h2 className="text-2xl font-bold text-red-500">Account Settings</h2>

      {/* ================= CHANGE PASSWORD ================= */}
      <div className="bg-gray-900 p-6 rounded-lg space-y-4">
        <h3 className="text-lg font-semibold">Change Password</h3>

        {/* CURRENT */}
        <div className="flex gap-2">
          <input
            type={showCurrent ? "text" : "password"}
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="flex-1 bg-gray-800 p-3 rounded-md placeholder:text-gray-600"
          />
          <button
            onClick={() => setShowCurrent(!showCurrent)}
            className="px-4 bg-gray-700 rounded-md"
          >
            👁
          </button>
        </div>

        {/* NEW */}
        <div className="flex gap-2">
          <input
            type={showNew ? "text" : "password"}
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="flex-1 bg-gray-800 p-3 rounded-md placeholder:text-gray-600"
          />
          <button
            onClick={() => setShowNew(!showNew)}
            className="px-4 bg-gray-700 rounded-md"
          >
            👁
          </button>
        </div>

        {/* CONFIRM */}
        <div className="flex gap-2">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="flex-1 bg-gray-800 p-3 rounded-md placeholder:text-gray-600"
          />
          <button
            onClick={() => setShowConfirm(!showConfirm)}
            className="px-4 bg-gray-700 rounded-md"
          >
            👁
          </button>
        </div>

        <button
          onClick={handleChangePassword}
          disabled={!passwordValid || loading}
          className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-md w-full disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </div>

      {/* ================= DELETE ACCOUNT ================= */}
      <div className="bg-gray-900 p-6 rounded-lg space-y-4 border border-red-800">
        <h3 className="text-lg font-semibold text-red-500">
          Delete Account
        </h3>

        <p className="text-sm text-gray-400">
          This action is permanent. All streams, followers, and data will be deleted.
        </p>
        <p className="text-sm text-gray-400">
          To confirm, type "DELETE" in the box below and click the button.
        </p>

        <input
          placeholder='DELETE'
          value={deleteConfirm}
          onChange={(e) => setDeleteConfirm(e.target.value)}
          className="w-full bg-gray-800 p-3 rounded-md placeholder:text-gray-600"
        />

        <button
          onClick={handleDeleteAccount}
          disabled={loading || deleteConfirm !== "DELETE"}
          className="bg-red-700 hover:bg-red-800 px-6 py-3 rounded-md w-full disabled:opacity-50"
        >
          {loading ? "Deleting..." : "Delete My Account"}
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;
