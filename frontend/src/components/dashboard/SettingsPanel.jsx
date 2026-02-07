import { useState } from "react";
import axios from "axios";

const SettingsPanel = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");

  /* ================= CHANGE PASSWORD ================= */
  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      return alert("Fill all fields");
    }

    if (newPassword !== confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      setLoading(true);

      await axios.put(
        "http://localhost:5000/api/users/change-password",
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      alert("Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE ACCOUNT ================= */
  const handleDeleteAccount = async () => {
    if (deleteConfirm !== "DELETE") {
      return alert('Type "DELETE" to confirm');
    }

    try {
      setLoading(true);

      await axios.delete(
        "http://localhost:5000/api/users/delete-account",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Account deleted");
      localStorage.removeItem("token");
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Failed to delete account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      <h2 className="text-2xl font-bold text-red-500">Account Settings</h2>

      {/* CHANGE PASSWORD */}
      <div className="bg-gray-900 p-6 rounded-lg space-y-4">
        <h3 className="text-lg font-semibold">Change Password</h3>

        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full bg-gray-800 p-3 rounded-md"
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full bg-gray-800 p-3 rounded-md"
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full bg-gray-800 p-3 rounded-md"
        />

        <button
          onClick={handleChangePassword}
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-md w-full"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </div>

      {/* DELETE ACCOUNT */}
      <div className="bg-gray-900 p-6 rounded-lg space-y-4 border border-red-800">
        <h3 className="text-lg font-semibold text-red-500">
          Delete Account
        </h3>

        <p className="text-sm text-gray-400">
          This action is permanent. All your streams, followers, and data will be deleted.
        </p>

        <input
          placeholder='Type "DELETE" to confirm'
          value={deleteConfirm}
          onChange={(e) => setDeleteConfirm(e.target.value)}
          className="w-full bg-gray-800 p-3 rounded-md"
        />

        <button
          onClick={handleDeleteAccount}
          disabled={loading}
          className="bg-red-700 hover:bg-red-800 px-6 py-3 rounded-md w-full"
        >
          {loading ? "Deleting..." : "Delete My Account"}
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;
