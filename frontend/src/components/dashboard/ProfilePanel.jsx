import { useState, useEffect } from "react";
import { axiosInstance } from "../../lib/axios";

const ProfilePanel = () => {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= LOAD PROFILE ================= */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/users/profile", {});
        console.log("User profile data:", res.data);
        setUsername(res.data.username);
        setBio(res.data.bio);
        setEmail(res.data.email);
        if (res.data.profilePic) {
          setPreview(res.data.profilePic);
        }
      } catch (err) {
        console.error("Failed to load user", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  /* ================= IMAGE PREVIEW ================= */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProfilePic(file);
    setPreview(URL.createObjectURL(file));
  };

  /* ================= SAVE SETTINGS ================= */
  const handleSave = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("username", username);
      formData.append("bio", bio);
      if (profilePic) formData.append("profile_picture", profilePic);

      await axiosInstance.put("/users/profile", formData);

      alert("Profile updated");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <h2 className="text-2xl font-bold text-red-500 mb-6">Creator Settings</h2>

      {/* PROFILE CARD */}
      <div className="bg-gray-900 p-6 rounded-lg space-y-6">
        {/* Profile Picture */}
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-700">
            {preview ? (
              <img src={preview} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Change Profile Picture
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-sm"
            />
          </div>
        </div>

        {/* Username */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-gray-800 p-3 rounded-md outline-none"
            placeholder="Enter username"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full bg-gray-800 p-3 rounded-md outline-none"
            placeholder="Tell something about yourself"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">Email</label>
          <input
            value={email}
            disabled
            className="w-full bg-gray-800 p-3 rounded-md opacity-70"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-md font-semibold transition"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default ProfilePanel;
