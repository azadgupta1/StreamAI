import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";

/* ================= CONFIG ================= */
// 👉 Switch this to false when backend is ready
const USE_DUMMY_DATA = false;

/* ================= DUMMY DATA ================= */
const dummyFollowers = [
  {
    follower_id: 1,
    follower: {
      username: "Om Yeole",
      profile_picture: "",
    },
    followed_at: "2026-04-10",
  },
  {
    follower_id: 2,
    follower: {
      username: "Azad Gupta",
      profile_picture: "",
    },
    followed_at: "2026-04-08",
  },
  {
    follower_id: 3,
    follower: {
      username: "Sarang Shinde",
      profile_picture: "",
    },
    followed_at: "2026-04-05",
  },
  {
    follower_id: 4,
    follower: {
      username: "Parth Dalvi",
      profile_picture: "",
    },
    followed_at: "2026-04-05",
  },
];

/* ================= DATA ADAPTER ================= */
// 👉 This ensures backend/dummy structure stays same
const normalizeFollowers = (data) => {
  return data.map((f) => ({
    id: f.follower_id,
    username: f.follower.username,
    profile_picture: f.follower.profile_picture,
    followed_at: f.followed_at,
  }));
};

const FollowersPanel = () => {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFollowers = async () => {
      try {
        let data;

        if (USE_DUMMY_DATA) {
          data = dummyFollowers;
        } else {
          const res = await axiosInstance.get(`/followers/followers`);
          data = res.data;
        }

        // Normalize for UI
        const formatted = normalizeFollowers(data);
        setFollowers(formatted);
      } catch (error) {
        console.error(
          "Followers fetch error:",
          error?.response?.data?.error || error.message,
        );
      } finally {
        setLoading(false);
      }
    };

    loadFollowers();
  }, []);

  const getDaysAgo = (date) => {
    const now = new Date();
    const past = new Date(date);
    const diffDays = Math.floor((now - past) / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return "Today";
    if (diffDays === 1) return "1 day ago";
    return `${diffDays} days ago`;
  };

  /* ================= UI ================= */

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white tracking-wide">
          Followers
        </h2>
        <div className="text-sm text-[#5af04f] font-semibold">
          {followers.length} Total
        </div>
      </div>

      {/* Container */}
      <div
        className="bg-gradient-to-br from-gray-900 via-black to-gray-950 
                      border border-gray-800 rounded-xl p-4 
                      max-h-[500px] overflow-y-auto space-y-3"
      >
        {/* Loading */}
        {loading && (
          <div className="text-gray-400 text-center py-10 animate-pulse">
            Loading followers...
          </div>
        )}

        {/* Empty */}
        {!loading && followers.length === 0 && (
          <div className="text-gray-400 text-center py-10">
            No followers yet
          </div>
        )}

        {/* List */}
        {!loading &&
          followers.map((f) => (
            <div
              key={f.id}
              className="group flex items-center justify-between 
                         bg-gray-900 border border-gray-800 
                         hover:border-[#5af04f]/50 
                         hover:shadow-[0_0_15px_#5af04f22] 
                         p-3 rounded-lg transition"
            >
              {/* LEFT */}
              <div className="flex items-center gap-3">
                <img
                  src={
                    f.profile_picture ||
                    `https://ui-avatars.com/api/?name=${f.username}&background=random`
                  }
                  alt="avatar"
                  className="w-11 h-11 rounded-full object-cover border border-gray-700"
                />

                <div>
                  <div className="text-white font-semibold group-hover:text-[#5af04f] transition">
                    {f.username}
                  </div>

                  <div className="text-xs text-gray-400">
                    Followed {getDaysAgo(f.followed_at)}
                  </div>
                </div>
              </div>

              {/* RIGHT (status badge) */}
              <div className="text-xs px-3 py-1 rounded-full bg-[#5af04f]/10 text-[#5af04f]">
                Active
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FollowersPanel;

// import React, { useEffect, useState } from "react";
// import { axiosInstance } from "../../lib/axios";

// const FollowersPanel = () => {
//   const [followers, setFollowers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchFollowers = async () => {
//       try {
//         const { data } = await axiosInstance.get(`/followers/followers`);
//         setFollowers(data);
//       } catch (error) {
//         console.error(
//           "Followers fetch error:",
//           error?.response?.data?.error || error.message,
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFollowers();
//   }, []);

// const getDaysAgo = (date) => {
//   const now = new Date();
//   const past = new Date(date);

//   const diffMs = now - past;
//   const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

//   if (diffDays <= 0) return "Today";
//   if (diffDays === 1) return "1 day ago";
//   return `${diffDays} days `;
// };

//   /* ================= UI ================= */

//   return (
//     <div>
//       <h2 className="text-2xl text-red-500 mb-4">
//         Followers ({followers.length})
//       </h2>

//       <div className="bg-gray-900 p-6 rounded-lg space-y-3 max-h-[400px] overflow-y-auto">
//         {/* Loading */}
//         {loading && <div className="text-gray-400">Loading followers...</div>}

//         {/* Empty */}
//         {!loading && followers.length === 0 && (
//           <div className="text-gray-400">No followers yet</div>
//         )}

//         {/* Followers List */}
//         {!loading &&
//           followers.map((f) => (
//             <div
//               key={f.follower_id}
//               className="flex items-center justify-between gap-3 bg-gray-800 hover:bg-gray-700 p-3 rounded-md transition"
//             >
//               {/* Left */}
//               <div className="flex items-center gap-3">
//                 <img
//                   src={
//                     f.follower.profile_picture ||
//                     `https://ui-avatars.com/api/?name=${f.follower.username}&background=random`
//                   }
//                   alt="avatar"
//                   className="w-10 h-10 rounded-full object-cover"
//                 />

//                 <div>
//                   <div className="text-white font-medium">
//                     {f.follower.username}
//                   </div>
//                   <div className="text-xs text-gray-400">
//                     Follower since {getDaysAgo(f.followed_at)}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default FollowersPanel;
