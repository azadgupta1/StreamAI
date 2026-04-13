import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { FiTrendingUp, FiEye, FiClock, FiUsers } from "react-icons/fi";

const AnalyticsPanel = () => {
  const overviewStats = [
    {
      label: "Total Views",
      value: "10.1M",
      change: "+12.4%",
      icon: <FiEye />,
    },
    {
      label: "Watch Time",
      value: "1,240 hrs",
      change: "+8.1%",
      icon: <FiClock />,
    },
    {
      label: "Avg. Viewers",
      value: "8.4K",
      change: "+15.7%",
      icon: <FiUsers />,
    },
    {
      label: "Engagement",
      value: "94%",
      change: "+6.3%",
      icon: <FiTrendingUp />,
    },
  ];

  const viewsData = [
    { name: "Mon", views: 42000, watchTime: 120 },
    { name: "Tue", views: 51000, watchTime: 146 },
    { name: "Wed", views: 47000, watchTime: 132 },
    { name: "Thu", views: 68000, watchTime: 184 },
    { name: "Fri", views: 72000, watchTime: 201 },
    { name: "Sat", views: 85000, watchTime: 246 },
    { name: "Sun", views: 91000, watchTime: 280 },
  ];

  const retentionData = [
    { name: "0-10s", value: 92 },
    { name: "10-30s", value: 84 },
    { name: "30-60s", value: 76 },
    { name: "1-5m", value: 68 },
    { name: "5m+", value: 54 },
  ];

  const deviceData = [
    { name: "Mobile", value: 48 },
    { name: "Desktop", value: 34 },
    { name: "Tablet", value: 18 },
  ];

  const streamPerformance = [
    { title: "Peak Live Viewers", value: "12.8K" },
    { title: "New Followers", value: "+1,240" },
    { title: "Chat Messages", value: "18.4K" },
    { title: "Average Session", value: "42m 18s" },
  ];

  const COLORS = ["#5af04f", "#7b35d9", "#22c55e", "#a3e635"];

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;

    return (
      <div className="rounded-xl border border-gray-700 bg-gray-950/95 px-4 py-3 shadow-xl backdrop-blur-md">
        <p className="text-sm font-semibold text-white mb-1">{label}</p>
        {payload.map((item, index) => (
          <p key={index} className="text-sm text-gray-300">
            <span style={{ color: item.color }} className="font-semibold">
              {item.name}:
            </span>{" "}
            {item.value}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full text-white">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-wide text-white">
            Analytics
          </h2>
          <p className="mt-1 text-sm text-gray-400">
            Live performance insights for your stream
          </p>
        </div>

        <div className="h-1 w-20 rounded-full bg-[#5af04f] shadow-[0_0_20px_#5af04f66]" />
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-6">
        {overviewStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.08 }}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 via-black to-gray-950 p-5 shadow-lg transition-all duration-300 hover:border-[#5af04f]/60 hover:shadow-[0_0_25px_#5af04f22]"
          >
            <div className="absolute inset-0 bg-[#5af04f]/5 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

            <div className="relative flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-gray-400">{stat.label}</p>
                <h3 className="mt-2 text-3xl font-bold text-white">
                  {stat.value}
                </h3>
                <span className="mt-3 inline-flex rounded-full bg-[#5af04f]/10 px-3 py-1 text-xs font-semibold text-[#5af04f]">
                  {stat.change}
                </span>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-800 bg-gray-900 text-xl text-[#5af04f] shadow-inner">
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid gap-6 xl:grid-cols-3">
        {/* Area Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="xl:col-span-2 rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 via-black to-gray-950 p-5 shadow-lg"
        >
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">
                Views & Watch Time
              </h3>
              <p className="text-sm text-gray-400">Last 7 days</p>
            </div>
            <span className="rounded-full bg-[#5af04f]/10 px-3 py-1 text-xs font-semibold text-[#5af04f]">
              Trending up
            </span>
          </div>

          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={viewsData}>
                <defs>
                  <linearGradient id="viewGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5af04f" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#5af04f" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="views"
                  name="Views"
                  stroke="#5af04f"
                  strokeWidth={3}
                  fill="url(#viewGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="watchTime"
                  name="Watch Time"
                  stroke="#7b35d9"
                  strokeWidth={2}
                  fillOpacity={0}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Retention Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 via-black to-gray-950 p-5 shadow-lg"
        >
          <div className="mb-5">
            <h3 className="text-lg font-semibold text-white">
              Audience Retention
            </h3>
            <p className="text-sm text-gray-400">Viewer drop-off points</p>
          </div>

          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={retentionData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                <XAxis type="number" stroke="#9ca3af" />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke="#9ca3af"
                  width={70}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="value"
                  name="Retention"
                  radius={[0, 8, 8, 0]}
                  fill="#5af04f"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        {/* Device Mix */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 via-black to-gray-950 p-5 shadow-lg"
        >
          <h3 className="text-lg font-semibold text-white">Device Mix</h3>
          <p className="mb-5 text-sm text-gray-400">How viewers are watching</p>

          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={62}
                  outerRadius={92}
                  paddingAngle={4}
                >
                  {deviceData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 space-y-3">
            {deviceData.map((item, index) => (
              <div
                key={item.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm text-gray-300">{item.name}</span>
                </div>
                <span className="text-sm font-semibold text-white">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Performance Cards */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="xl:col-span-2 rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 via-black to-gray-950 p-5 shadow-lg"
        >
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">
                Stream Performance
              </h3>
              <p className="text-sm text-gray-400">
                Mock live data until backend is ready
              </p>
            </div>
            <span className="rounded-full border border-[#5af04f]/30 bg-[#5af04f]/10 px-3 py-1 text-xs font-semibold text-[#5af04f]">
              LIVE MODE
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {streamPerformance.map((item, index) => (
              <motion.div
                key={item.title}
                whileHover={{ scale: 1.02 }}
                className="rounded-xl border border-gray-800 bg-gray-900 p-4 transition hover:border-[#5af04f]/50"
              >
                <p className="text-sm text-gray-400">{item.title}</p>
                <h4 className="mt-2 text-2xl font-bold text-white">
                  {item.value}
                </h4>

                <div className="mt-4 h-1.5 w-full rounded-full bg-gray-800">
                  <div
                    className="h-1.5 rounded-full bg-[#5af04f] shadow-[0_0_12px_#5af04f88]"
                    style={{ width: `${72 - index * 8}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer Note */}
      <div className="mt-6 rounded-2xl border border-gray-800 bg-gray-950/70 px-5 py-4 text-sm text-gray-400">
        Analytics are powered by live stream activity, viewer behavior, and
        engagement signals.
      </div>
    </div>
  );
};

export default AnalyticsPanel;

// const AnalyticsPanel = () => {
//   return (
//     <div>
//       <h2 className="text-2xl text-red-500 mb-4">Analytics</h2>
//       <div className="bg-gray-900 p-6 rounded-lg">
//         Charts, views, retention, watch time (future)
//       </div>
//     </div>
//   );
// };

// export default AnalyticsPanel;
