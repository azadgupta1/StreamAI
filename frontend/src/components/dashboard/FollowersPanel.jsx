import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";

const FollowersPanel = () => {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const { data } = await axiosInstance.get(`/followers/followers`);
        setFollowers(data);
      } catch (error) {
        console.error(
          "Followers fetch error:",
          error?.response?.data?.error || error.message,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFollowers();
  }, []);

const getDaysAgo = (date) => {
  const now = new Date();
  const past = new Date(date);

  const diffMs = now - past;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  return `${diffDays} days `;
};


  /* ================= UI ================= */

  return (
    <div>
      <h2 className="text-2xl text-red-500 mb-4">
        Followers ({followers.length})
      </h2>

      <div className="bg-gray-900 p-6 rounded-lg space-y-3 max-h-[400px] overflow-y-auto">
        {/* Loading */}
        {loading && <div className="text-gray-400">Loading followers...</div>}

        {/* Empty */}
        {!loading && followers.length === 0 && (
          <div className="text-gray-400">No followers yet</div>
        )}

        {/* Followers List */}
        {!loading &&
          followers.map((f) => (
            <div
              key={f.follower_id}
              className="flex items-center justify-between gap-3 bg-gray-800 hover:bg-gray-700 p-3 rounded-md transition"
            >
              {/* Left */}
              <div className="flex items-center gap-3">
                <img
                  src={
                    f.follower.profile_picture ||
                    `https://ui-avatars.com/api/?name=${f.follower.username}&background=random`
                  }
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />

                <div>
                  <div className="text-white font-medium">
                    {f.follower.username}
                  </div>
                  <div className="text-xs text-gray-400">
                    Follower since {getDaysAgo(f.followed_at)}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FollowersPanel;
