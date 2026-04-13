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
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white tracking-wide">
          Streamer Profile Details
        </h2>
        <div className="h-1 w-20 bg-[#5af04f] rounded-full"></div>
      </div>

      {/* Card */}
      <div
        className="bg-gradient-to-br from-gray-900 via-black to-gray-950 
                    border border-gray-800 rounded-2xl p-6 md:p-8 
                    space-y-8 shadow-lg"
      >
        {/* PROFILE SECTION */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Avatar */}
          <div className="relative group">
            <div
              className="w-28 h-28 rounded-full overflow-hidden border-2 border-gray-700 
                          group-hover:border-[#5af04f] transition shadow-md"
            >
              {preview ? (
                <img src={preview} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                  No Image
                </div>
              )}
            </div>

            {/* Glow Effect */}
            <div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 
                          bg-[#5af04f]/10 blur-xl transition"
            ></div>
          </div>

          {/* Upload */}
          <div className="text-center md:text-left">
            <label className="block text-sm text-gray-400 mb-2">
              Change Profile Picture
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 
                       file:rounded-md file:border-0 
                       file:bg-[#5af04f] file:text-black 
                       hover:file:bg-[#49d63f] 
                       cursor-pointer"
            />
          </div>
        </div>

        {/* INPUT FIELDS */}
        <div className="grid gap-6">
          {/* Username */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full bg-gray-900 placeholder:text-gray-400 border border-gray-800 
                       focus:border-[#5af04f] focus:ring-1 focus:ring-[#5af04f] 
                       p-3 rounded-lg outline-none transition"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell something about yourself"
              rows={4}
              className="w-full bg-gray-900 placeholder:text-gray-400 border border-gray-800 
                       focus:border-[#5af04f] focus:ring-1 focus:ring-[#5af04f] 
                       p-3 rounded-lg outline-none transition resize-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Email</label>
            <input
              value={email}
              disabled
              className="w-full bg-gray-900 border border-gray-800 
                       p-3 rounded-lg opacity-60 cursor-not-allowed"
            />
          </div>
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full py-3 rounded-lg font-semibold 
                   bg-[#5af04f] text-black 
                   hover:bg-[#49d63f] 
                   disabled:opacity-50 disabled:cursor-not-allowed 
                   cursor-pointer transition 
                   shadow-md hover:shadow-[0_0_15px_#5af04f55]"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default ProfilePanel;

// import { useState, useEffect } from "react";
// import { axiosInstance } from "../../lib/axios";

// const ProfilePanel = () => {
//   const [username, setUsername] = useState("");
//   const [bio, setBio] = useState("");
//   const [email, setEmail] = useState("");
//   const [profilePic, setProfilePic] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [loading, setLoading] = useState(false);

//   /* ================= LOAD PROFILE ================= */
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axiosInstance.get("/users/profile", {});
//         console.log("User profile data:", res.data);
//         setUsername(res.data.username);
//         setBio(res.data.bio);
//         setEmail(res.data.email);
//         if (res.data.profilePic) {
//           setPreview(res.data.profilePic);
//         }
//       } catch (err) {
//         console.error("Failed to load user", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   /* ================= IMAGE PREVIEW ================= */
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setProfilePic(file);
//     setPreview(URL.createObjectURL(file));
//   };

//   /* ================= SAVE SETTINGS ================= */
//   const handleSave = async () => {
//     try {
//       setLoading(true);

//       const formData = new FormData();
//       formData.append("username", username);
//       formData.append("bio", bio);
//       if (profilePic) formData.append("profile_picture", profilePic);

//       await axiosInstance.put("/users/profile", formData);

//       alert("Profile updated");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl">
//       <h2 className="text-2xl font-bold text-red-500 mb-6">Creator Settings</h2>

//       {/* PROFILE CARD */}
//       <div className="bg-gray-900 p-6 rounded-lg space-y-6">
//         {/* Profile Picture */}
//         <div className="flex items-center gap-6">
//           <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-700">
//             {preview ? (
//               <img src={preview} className="w-full h-full object-cover" />
//             ) : (
//               <div className="w-full h-full flex items-center justify-center text-gray-500">
//                 No Image
//               </div>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm text-gray-400 mb-2">
//               Change Profile Picture
//             </label>

//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="text-sm"
//             />
//           </div>
//         </div>

//         {/* Username */}
//         <div>
//           <label className="block text-sm text-gray-400 mb-1">Username</label>
//           <input
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="w-full bg-gray-800 p-3 rounded-md outline-none"
//             placeholder="Enter username"
//           />
//         </div>

//         {/* Bio */}
//         <div>
//           <label className="block text-sm text-gray-400 mb-1">Bio</label>
//           <textarea
//             value={bio}
//             onChange={(e) => setBio(e.target.value)}
//             className="w-full bg-gray-800 p-3 rounded-md outline-none"
//             placeholder="Tell something about yourself"
//           />
//         </div>

//         {/* Email */}
//         <div>
//           <label className="block text-sm text-gray-400 mb-1">Email</label>
//           <input
//             value={email}
//             disabled
//             className="w-full bg-gray-800 p-3 rounded-md opacity-70"
//           />
//         </div>

//         {/* Save Button */}
//         <button
//           onClick={handleSave}
//           disabled={loading}
//           className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-md font-semibold transition"
//         >
//           {loading ? "Saving..." : "Save Changes"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProfilePanel;
