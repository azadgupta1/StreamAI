import { useState } from "react";
import { axiosInstance } from "../../lib/axios";
import { useAuthStore } from "../../store/useAuthStore";
import {
  Eye,
  EyeOff,
  ShieldAlert,
  LockKeyhole,
  Trash2,
  TriangleAlert,
} from "lucide-react";

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

  const passwordFields = [
    {
      label: "Current Password",
      value: currentPassword,
      setValue: setCurrentPassword,
      visible: showCurrent,
      setVisible: setShowCurrent,
    },
    {
      label: "New Password",
      value: newPassword,
      setValue: setNewPassword,
      visible: showNew,
      setVisible: setShowNew,
    },
    {
      label: "Confirm New Password",
      value: confirmPassword,
      setValue: setConfirmPassword,
      visible: showConfirm,
      setVisible: setShowConfirm,
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-wide text-white">
            Account Settings
          </h2>
          <p className="mt-1 text-sm text-gray-400">
            Manage your password and account security
          </p>
        </div>
        <div className="h-1 w-20 rounded-full bg-[#5af04f] shadow-[0_0_20px_#5af04f66]" />
      </div>

      {/* Change Password */}
      <div className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 via-black to-gray-950 p-5 sm:p-6 shadow-lg">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-800 bg-gray-900 text-[#5af04f]">
            <LockKeyhole size={18} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">
              Change Password
            </h3>
            <p className="text-sm text-gray-400">
              Use a strong password to keep your account safe
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {passwordFields.map((field, index) => (
            <div key={field.label} className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                {field.label}
              </label>

              <div className="flex gap-2">
                <input
                  type={field.visible ? "text" : "password"}
                  placeholder={field.label}
                  value={field.value}
                  onChange={(e) => field.setValue(e.target.value)}
                  className="flex-1 rounded-lg border border-gray-800 bg-gray-900 px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-[#5af04f] focus:ring-1 focus:ring-[#5af04f]"
                />
                <button
                  type="button"
                  onClick={() => field.setVisible(!field.visible)}
                  className="inline-flex items-center justify-center rounded-lg border border-gray-800 bg-gray-900 px-4 text-gray-300 transition hover:border-[#5af04f]/60 hover:text-[#5af04f] cursor-pointer"
                  aria-label={`Toggle ${field.label}`}
                >
                  {field.visible ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {index === 1 && newPassword && (
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isStrongPassword(newPassword)
                        ? "bg-[#5af04f]"
                        : "bg-yellow-500"
                    }`}
                  />
                  <span className="text-gray-400">
                    {isStrongPassword(newPassword)
                      ? "Password strength looks good"
                      : "Password should be at least 6 characters"}
                  </span>
                </div>
              )}
            </div>
          ))}

          <button
            onClick={handleChangePassword}
            disabled={!passwordValid || loading}
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#5af04f] px-6 py-3 font-semibold text-black transition hover:bg-[#49d63f] hover:shadow-[0_0_18px_#5af04f55] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          >
            <ShieldAlert size={18} />
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </div>

      {/* Delete Account */}
      <div className="rounded-2xl border border-red-900/70 bg-gradient-to-br from-gray-900 via-black to-gray-950 p-5 sm:p-6 shadow-lg">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-red-900/70 bg-red-950/40 text-red-400">
            <Trash2 size={18} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-red-400">
              Delete Account
            </h3>
            <p className="text-sm text-gray-400">
              This action is permanent and cannot be undone
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-red-900/40 bg-red-950/20 p-4">
          <div className="mb-3 flex items-start gap-3 text-sm text-gray-300">
            <TriangleAlert className="mt-0.5 shrink-0 text-red-400" size={18} />
            <div className="space-y-1">
              <p>This will permanently delete your account.</p>
              <p>All streams, followers, and data will be removed.</p>
              <p>
                Type <span className="font-semibold text-white">DELETE</span>{" "}
                below to confirm.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <input
              placeholder="DELETE"
              value={deleteConfirm}
              onChange={(e) => setDeleteConfirm(e.target.value)}
              className="w-full rounded-lg border border-gray-800 bg-gray-900 px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />

            <button
              onClick={handleDeleteAccount}
              disabled={loading || deleteConfirm !== "DELETE"}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red-700 px-6 py-3 font-semibold text-white transition hover:bg-red-800 hover:shadow-[0_0_18px_#dc262655] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            >
              <Trash2 size={18} />
              {loading ? "Deleting..." : "Delete My Account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;

// import { useState } from "react";
// import { axiosInstance } from "../../lib/axios";
// import { useAuthStore } from "../../store/useAuthStore";

// const SettingsPanel = () => {
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const [showCurrent, setShowCurrent] = useState(false);
//   const [showNew, setShowNew] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);

//   const [loading, setLoading] = useState(false);
//   const [deleteConfirm, setDeleteConfirm] = useState("");
//   const { logout } = useAuthStore();

//   /* ================= PASSWORD VALIDATION ================= */
//   const isStrongPassword = (pwd) => {
//     return pwd.length >= 6; // change if you want stricter rules
//   };

//   /* ================= CHANGE PASSWORD ================= */
//   const handleChangePassword = async () => {
//     if (!currentPassword || !newPassword || !confirmPassword) {
//       return alert("Fill all fields");
//     }

//     if (newPassword !== confirmPassword) {
//       return alert("Passwords do not match");
//     }

//     if (!isStrongPassword(newPassword)) {
//       return alert("Password must be at least 6 characters");
//     }

//     try {
//       setLoading(true);

//       await axiosInstance.put("users/change-password", {
//         currentPassword,
//         newPassword,
//       });

//       alert("Password updated. Please login again.");
//       logout();
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.error || "Failed to change password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= DELETE ACCOUNT ================= */
//   const handleDeleteAccount = async () => {
//     if (deleteConfirm !== "DELETE") {
//       return alert('Type "DELETE" exactly to confirm');
//     }

//     if (!window.confirm("This will permanently delete your account. Continue?"))
//       return;

//     try {
//       setLoading(true);

//       await axiosInstance.delete("users/delete-account");

//       alert("Account deleted successfully");

//       localStorage.removeItem("token");
//       window.location.href = "/";
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.error || "Failed to delete account");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const passwordValid =
//     currentPassword &&
//     newPassword &&
//     confirmPassword &&
//     newPassword === confirmPassword &&
//     isStrongPassword(newPassword);

//   return (
//     <div className="max-w-3xl space-y-6">
//       <h2 className="text-2xl font-bold text-red-500">Account Settings</h2>

//       {/* ================= CHANGE PASSWORD ================= */}
//       <div className="bg-gray-900 p-6 rounded-lg space-y-4">
//         <h3 className="text-lg font-semibold">Change Password</h3>

//         {/* CURRENT */}
//         <div className="flex gap-2">
//           <input
//             type={showCurrent ? "text" : "password"}
//             placeholder="Current Password"
//             value={currentPassword}
//             onChange={(e) => setCurrentPassword(e.target.value)}
//             className="flex-1 bg-gray-800 p-3 rounded-md placeholder:text-gray-600"
//           />
//           <button
//             onClick={() => setShowCurrent(!showCurrent)}
//             className="px-4 bg-gray-700 rounded-md"
//           >
//             👁
//           </button>
//         </div>

//         {/* NEW */}
//         <div className="flex gap-2">
//           <input
//             type={showNew ? "text" : "password"}
//             placeholder="New Password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             className="flex-1 bg-gray-800 p-3 rounded-md placeholder:text-gray-600"
//           />
//           <button
//             onClick={() => setShowNew(!showNew)}
//             className="px-4 bg-gray-700 rounded-md"
//           >
//             👁
//           </button>
//         </div>

//         {/* CONFIRM */}
//         <div className="flex gap-2">
//           <input
//             type={showConfirm ? "text" : "password"}
//             placeholder="Confirm New Password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             className="flex-1 bg-gray-800 p-3 rounded-md placeholder:text-gray-600"
//           />
//           <button
//             onClick={() => setShowConfirm(!showConfirm)}
//             className="px-4 bg-gray-700 rounded-md"
//           >
//             👁
//           </button>
//         </div>

//         <button
//           onClick={handleChangePassword}
//           disabled={!passwordValid || loading}
//           className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-md w-full disabled:opacity-50"
//         >
//           {loading ? "Updating..." : "Update Password"}
//         </button>
//       </div>

//       {/* ================= DELETE ACCOUNT ================= */}
//       <div className="bg-gray-900 p-6 rounded-lg space-y-4 border border-red-800">
//         <h3 className="text-lg font-semibold text-red-500">
//           Delete Account
//         </h3>

//         <p className="text-sm text-gray-400">
//           This action is permanent. All streams, followers, and data will be deleted.
//         </p>
//         <p className="text-sm text-gray-400">
//           To confirm, type "DELETE" in the box below and click the button.
//         </p>

//         <input
//           placeholder='DELETE'
//           value={deleteConfirm}
//           onChange={(e) => setDeleteConfirm(e.target.value)}
//           className="w-full bg-gray-800 p-3 rounded-md placeholder:text-gray-600"
//         />

//         <button
//           onClick={handleDeleteAccount}
//           disabled={loading || deleteConfirm !== "DELETE"}
//           className="bg-red-700 hover:bg-red-800 px-6 py-3 rounded-md w-full disabled:opacity-50"
//         >
//           {loading ? "Deleting..." : "Delete My Account"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SettingsPanel;
