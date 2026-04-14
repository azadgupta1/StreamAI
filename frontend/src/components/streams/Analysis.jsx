// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { FaEye, FaThumbsUp, FaComment } from "react-icons/fa";

// const Analysis = () => {
//   const [viewers, setViewers] = useState(1200);
//   const [likes, setLikes] = useState(300);
//   const [comments, setComments] = useState(50);
//   const [engagement, setEngagement] = useState(0);

//   // Simulate live updates
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setViewers((prev) => prev + Math.floor(Math.random() * 5));
//       setLikes((prev) => prev + Math.floor(Math.random() * 2));
//       setComments((prev) => prev + Math.floor(Math.random() * 3));
//       setEngagement(Math.floor(((likes + comments) / viewers) * 100));
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [likes, comments, viewers]);

//   return (
//     <div className="bg-gray-950 text-gray-300 p-4 rounded-lg shadow-md w-[500px] space-y-4">
//       <h2 className="text-lg font-semibold">Live Stream Analysis</h2>

//       <motion.div
//         initial={{ opacity: 0, x: -10 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.5 }}
//         className="flex items-center gap-2"
//       >
//         <FaEye className="text-gray-400" /> <span>Viewers: {viewers}</span>
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0, x: -10 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.5, delay: 0.1 }}
//         className="flex items-center gap-2"
//       >
//         <FaThumbsUp className="text-red-400" /> <span>Likes: {likes}</span>
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0, x: -10 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.5, delay: 0.2 }}
//         className="flex items-center gap-2"
//       >
//         <FaComment className="text-purple-400" />{" "}
//         <span>Comments: {comments}</span>
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0, x: -10 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.5, delay: 0.3 }}
//         className="flex items-center gap-2"
//       >
//         <span className="font-semibold">Engagement:</span> {engagement}%
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.4 }}
//         className="p-2 bg-gray-800 rounded shadow-sm text-gray-300 text-sm font-semibold"
//       >
//         Key Insight: Most viewers are engaging during the first 10 minutes of
//         the stream.
//       </motion.div>
//     </div>
//   );
// };

// export default Analysis;

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { FaEye, FaThumbsUp, FaComment, FaChartLine } from "react-icons/fa";

const generatePoint = (base, variance) =>
  Math.max(0, base + Math.floor((Math.random() - 0.4) * variance));

const Analysis = () => {
  const [viewers, setViewers] = useState(1200);
  const [likes, setLikes] = useState(300);
  const [comments, setComments] = useState(50);
  const [engagement, setEngagement] = useState(0);

  const [viewerHistory, setViewerHistory] = useState(() =>
    Array.from({ length: 10 }, (_, i) => ({
      t: `${i + 1}m`,
      v: generatePoint(1000, 300),
    })),
  );
  const [engagementData, setEngagementData] = useState(() =>
    Array.from({ length: 6 }, (_, i) => ({
      t: `${(i + 1) * 2}m`,
      likes: generatePoint(50, 40),
      comments: generatePoint(15, 15),
    })),
  );

  /* ─── Simulate live updates — functionality untouched ─── */
  useEffect(() => {
    const interval = setInterval(() => {
      setViewers((prev) => {
        const n = prev + Math.floor(Math.random() * 5);
        return n;
      });
      setLikes((prev) => prev + Math.floor(Math.random() * 2));
      setComments((prev) => prev + Math.floor(Math.random() * 3));
      setEngagement(Math.floor(((likes + comments) / viewers) * 100));

      const now = new Date();
      const label = `${now.getMinutes()}:${String(now.getSeconds()).padStart(2, "0")}`;

      setViewerHistory((prev) => [
        ...prev.slice(-14),
        { t: label, v: generatePoint(viewers, 80) },
      ]);
      setEngagementData((prev) => [
        ...prev.slice(-8),
        {
          t: label,
          likes: generatePoint(likes / 30, 20),
          comments: generatePoint(comments / 10, 8),
        },
      ]);
    }, 3000);
    return () => clearInterval(interval);
  }, [likes, comments, viewers]);

  const stats = [
    {
      label: "Viewers",
      value: viewers.toLocaleString(),
      icon: <FaEye />,
      color: "#5af04f",
    },
    {
      label: "Likes",
      value: likes.toLocaleString(),
      icon: <FaThumbsUp />,
      color: "#7b35d9",
    },
    {
      label: "Comments",
      value: comments.toLocaleString(),
      icon: <FaComment />,
      color: "#5af04f",
    },
    {
      label: "Engagement",
      value: `${engagement}%`,
      icon: <FaChartLine />,
      color: "#7b35d9",
    },
  ];

  const tooltipStyle = {
    backgroundColor: "#111827",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "8px",
    fontSize: "11px",
    color: "#d1d5db",
  };

  return (
    <div className="flex flex-col gap-4 pb-4">
      {/* ── Stat cards ── */}
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
            <span className="text-white text-lg font-bold leading-none">
              {value}
            </span>
          </motion.div>
        ))}
      </div>

      {/* ── Viewer graph ── */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-3">
        <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-3">
          Viewer Trend
        </p>
        <ResponsiveContainer width="100%" height={110}>
          <AreaChart
            data={viewerHistory}
            margin={{ top: 4, right: 4, left: -28, bottom: 0 }}
          >
            <defs>
              <linearGradient id="viewerGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#5af04f" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#5af04f" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.04)"
            />
            <XAxis
              dataKey="t"
              tick={{ fill: "#4b5563", fontSize: 9 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#4b5563", fontSize: 9 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              cursor={{ stroke: "rgba(90,240,79,0.2)" }}
            />
            <Area
              type="monotone"
              dataKey="v"
              stroke="#5af04f"
              strokeWidth={1.5}
              fill="url(#viewerGrad)"
              dot={false}
              name="Viewers"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* ── Engagement bar chart ── */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-3">
        <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-3">
          Likes &amp; Comments
        </p>
        <ResponsiveContainer width="100%" height={100}>
          <BarChart
            data={engagementData}
            margin={{ top: 4, right: 4, left: -28, bottom: 0 }}
            barCategoryGap="30%"
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.04)"
            />
            <XAxis
              dataKey="t"
              tick={{ fill: "#4b5563", fontSize: 9 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#4b5563", fontSize: 9 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              cursor={{ fill: "rgba(255,255,255,0.03)" }}
            />
            <Bar
              dataKey="likes"
              fill="#5af04f"
              radius={[3, 3, 0, 0]}
              name="Likes"
            />
            <Bar
              dataKey="comments"
              fill="#7b35d9"
              radius={[3, 3, 0, 0]}
              name="Comments"
            />
          </BarChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-2">
          {[
            { color: "#5af04f", label: "Likes" },
            { color: "#7b35d9", label: "Comments" },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-sm"
                style={{ background: color }}
              />
              <span className="text-[10px] text-gray-500">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Key insight ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex gap-2 bg-[#5af04f]/5 border border-[#5af04f]/15 rounded-xl p-3"
      >
        <FaChartLine className="text-[#5af04f] mt-0.5 shrink-0" size={12} />
        <p className="text-[11px] text-gray-400 leading-relaxed">
          Most viewers engage during the{" "}
          <span className="text-[#5af04f] font-semibold">first 10 minutes</span>{" "}
          of the stream.
        </p>
      </motion.div>
    </div>
  );
};

export default Analysis;
