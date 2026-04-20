import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar,
} from "recharts";
import { FaEye, FaThumbsUp, FaComment, FaChartLine } from "react-icons/fa";
import { axiosInstance } from "../../lib/axios";

const Analysis = ({ socket, streamId, viewerCount }) => {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);
  const [loading, setLoading] = useState(true);

  const [viewerHistory, setViewerHistory] = useState([]);
  const [commentHistory, setCommentHistory] = useState([]);

  // Load initial analytics from DB
  useEffect(() => {
    if (!streamId) return;

    axiosInstance.get(`/analytics/${streamId}`)
      .then(res => {
        setLikes(res.data.likes);
        setComments(res.data.comments);
        setCommentHistory(res.data.chatHistory);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [streamId]);

  // Track viewer count history over time
  useEffect(() => {
    if (viewerCount == null) return;
    const label = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setViewerHistory(prev => [...prev.slice(-14), { t: label, v: viewerCount }]);
  }, [viewerCount]);

  // Live updates via socket
  useEffect(() => {
    if (!socket || !streamId) return;

    const handleUpdate = (data) => {
      if (data.type === "comment") {
        setComments(data.total);
        const label = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        setCommentHistory(prev => [...prev.slice(-14), { t: label, comments: data.total }]);
      }
      if (data.type === "like") {
        setLikes(data.total);
      }
    };

    socket.on("analytics_update", handleUpdate);
    return () => socket.off("analytics_update", handleUpdate);
  }, [socket, streamId]);

  const engagement = viewerCount > 0
    ? Math.min(100, Math.floor(((likes + comments) / viewerCount) * 100))
    : 0;

  const stats = [
    { label: "Viewers",    value: (viewerCount ?? 0).toLocaleString(), icon: <FaEye />,       color: "#5af04f" },
    { label: "Likes",      value: likes.toLocaleString(),               icon: <FaThumbsUp />,  color: "#7b35d9" },
    { label: "Comments",   value: comments.toLocaleString(),            icon: <FaComment />,   color: "#5af04f" },
    { label: "Engagement", value: `${engagement}%`,                     icon: <FaChartLine />, color: "#7b35d9" },
  ];

  const tooltipStyle = {
    backgroundColor: "#111827",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "8px",
    fontSize: "11px",
    color: "#d1d5db",
  };

  if (loading) return (
    <div className="text-gray-600 text-sm italic p-4">Loading analytics...</div>
  );

  return (
    <div className="flex flex-col gap-4 pb-4">
      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-2">
        {stats.map(({ label, value, icon, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="flex flex-col gap-1 bg-gray-900 border border-gray-800 rounded-xl p-3"
          >
            <div className="flex items-center gap-1.5" style={{ color }}>
              <span className="text-xs">{icon}</span>
              <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">
                {label}
              </span>
            </div>
            <span className="text-white text-lg font-bold leading-none">{value}</span>
          </motion.div>
        ))}
      </div>

      {/* Viewer trend */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-3">
        <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-3">
          Viewer Trend
        </p>
        {viewerHistory.length < 2 ? (
          <p className="text-gray-600 text-xs italic">
            Collecting viewer data...
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={110}>
            <AreaChart data={viewerHistory} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
              <defs>
                <linearGradient id="viewerGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#5af04f" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#5af04f" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="t" tick={{ fill: "#4b5563", fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#4b5563", fontSize: 9 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "rgba(90,240,79,0.2)" }} />
              <Area type="monotone" dataKey="v" stroke="#5af04f" strokeWidth={1.5}
                fill="url(#viewerGrad)" dot={false} name="Viewers" />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Comments over time */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-3">
        <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-3">
          Chat Activity
        </p>
        {commentHistory.length < 2 ? (
          <p className="text-gray-600 text-xs italic">
            Collecting chat data...
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={100}>
            <BarChart data={commentHistory} margin={{ top: 4, right: 4, left: -28, bottom: 0 }} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="t" tick={{ fill: "#4b5563", fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#4b5563", fontSize: 9 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
              <Bar dataKey="comments" fill="#5af04f" radius={[3, 3, 0, 0]} name="Comments" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Insight */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex gap-2 bg-[#5af04f]/5 border border-[#5af04f]/15 rounded-xl p-3"
      >
        <FaChartLine className="text-[#5af04f] mt-0.5 shrink-0" size={12} />
        <p className="text-[11px] text-gray-400 leading-relaxed">
          {engagement > 10
            ? <><span className="text-[#5af04f] font-semibold">High engagement!</span> Your audience is very active.</>
            : engagement > 0
            ? <>Engagement at <span className="text-[#5af04f] font-semibold">{engagement}%</span>. Keep interacting with chat!</>
            : <>Analytics will populate as viewers interact with your stream.</>
          }
        </p>
      </motion.div>
    </div>
  );
};

export default Analysis;