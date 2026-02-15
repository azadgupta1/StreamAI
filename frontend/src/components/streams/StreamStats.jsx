import React, { useState, useEffect } from "react";
import { FaEye, FaThumbsUp, FaComment, FaUserPlus } from "react-icons/fa";
import { motion } from "framer-motion";

const StreamStatsWithSubscribe = () => {
  const [viewers, setViewers] = useState(1200);
  const [likes, setLikes] = useState(300);
  const [comments, setComments] = useState(50);
  const [subscribers, setSubscribers] = useState(80);
  const [subscribed, setSubscribed] = useState(false);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setViewers((prev) => prev + Math.floor(Math.random() * 5));
      setLikes((prev) => prev + Math.floor(Math.random() * 2));
      setComments((prev) => prev + Math.floor(Math.random() * 3));
      setSubscribers((prev) => prev + Math.floor(Math.random() * 1));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      icon: <FaEye />,
      label: "Viewers",
      value: viewers,
    },
    {
      icon: <FaThumbsUp />,
      label: "Likes",
      value: likes,
    },
    {
      icon: <FaComment />,
      label: "Comments",
      value: comments,
    },
    {
      icon: <FaUserPlus />,
      label: "Subscribers",
      value: subscribers,
    },
  ];

  const handleSubscribe = () => setSubscribed(!subscribed);

  return (
    <div className="w-full mt-4 bg-[#0f0f0f] border border-gray-800 rounded-xl p-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      {/* Stats */}
      <div className="flex flex-wrap gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 bg-[#141414] px-4 py-2 rounded-lg border border-gray-800 hover:border-green-500 transition-all duration-200 cursor-pointer min-w-[130px]"
          >
            <div className="text-green-400 text-lg">{stat.icon}</div>

            <div className="flex flex-col">
              <span className="text-white font-semibold text-sm">
                {stat.value.toLocaleString()}
              </span>
              <span className="text-gray-500 text-xs">{stat.label}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Subscribe Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSubscribe}
        className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 text-sm
          ${
            subscribed
              ? "bg-gray-700 text-gray-300 border border-gray-600"
              : "bg-green-500 text-black hover:bg-green-600 shadow-md shadow-green-500/20"
          }`}
      >
        {subscribed ? "Subscribed" : "Subscribe"}
      </motion.button>
    </div>
  );
};

export default StreamStatsWithSubscribe;

// import React, { useState, useEffect } from "react";
// import { FaEye, FaThumbsUp, FaComment, FaUserPlus } from "react-icons/fa";
// import { motion } from "framer-motion";

// const StreamStatsWithSubscribe = () => {
//   const [viewers, setViewers] = useState(1200);
//   const [likes, setLikes] = useState(300);
//   const [comments, setComments] = useState(50);
//   const [subscribers, setSubscribers] = useState(80);
//   const [subscribed, setSubscribed] = useState(false);

//   // Simulate live updates
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setViewers((prev) => prev + Math.floor(Math.random() * 5));
//       setLikes((prev) => prev + Math.floor(Math.random() * 2));
//       setComments((prev) => prev + Math.floor(Math.random() * 3));
//       setSubscribers((prev) => prev + Math.floor(Math.random() * 1));
//     }, 2000);

//     return () => clearInterval(interval);
//   }, []);

//   const stats = [
//     {
//       icon: <FaThumbsUp className="text-red-400" />,
//       label: "Likes",
//       value: likes,
//     },
//     {
//       icon: <FaEye className="text-gray-400" />,
//       label: "Viewers",
//       value: viewers,
//     },
//     {
//       icon: <FaComment className="text-purple-400" />,
//       label: "Comments",
//       value: comments,
//     },
//     {
//       icon: <FaUserPlus className="text-pink-400" />,
//       label: "Subscribers",
//       value: subscribers,
//     },
//   ];

//   const handleSubscribe = () => setSubscribed(!subscribed);

//   return (
//     <div className="bg-black/50 text-white p-4 rounded-lg shadow-md max-w-full overflow-x-auto flex items-center justify-between flex-wrap gap-4">
//       <div className="flex flex-wrap items-center gap-12">
//         {stats.map((stat, index) => (
//           <motion.div
//             key={stat.label}
//             initial={{ opacity: 0, y: -10, scale: 0.8 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             transition={{ duration: 0.5, delay: index * 0.1 }}
//             className="flex items-center gap-2 bg-gray-950 p-3 rounded-lg shadow hover:bg-gray-900 cursor-pointer min-w-[120px] justify-center"
//           >
//             {stat.icon}
//             <div className="flex flex-col items-center">
//               <span className="font-semibold">{stat.value}</span>
//               <span className="text-sm text-gray-400">{stat.label}</span>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* Subscribe Button */}
//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={handleSubscribe}
//         className={`btn ml-auto ${
//           subscribed ? "btn" : "btn-error"
//         } min-w-[120px]`}
//       >
//         {subscribed ? "Subscribed" : "Subscribe"}
//       </motion.button>
//     </div>
//   );
// };

// export default StreamStatsWithSubscribe;
