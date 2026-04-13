const OverviewCards = () => {
  const stats = [
    { label: "Subscribers", value: "15.5K" },
    { label: "Total Views", value: "10.1M" },
    { label: "Streams", value: "45" },
    { label: "Watch Time", value: "1,240 hrs" },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white tracking-wide">
          Dashboard
        </h2>

        <div className="h-1 w-16 bg-[#5af04f] rounded-full"></div>
      </div>

      {/* Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className="group relative bg-gradient-to-br from-gray-900 via-gray-950 to-black 
                       border border-gray-800 rounded-xl p-6 
                       hover:border-[#5af04f]/60 transition-all duration-300 
                       hover:shadow-[0_0_20px_#5af04f33] cursor-pointer"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 bg-[#5af04f]/5 blur-xl"></div>

            {/* Content */}
            <p className="text-gray-400 text-sm tracking-wide">{s.label}</p>

            <h3 className="text-3xl font-bold mt-3 text-white group-hover:text-[#5af04f] transition">
              {s.value}
            </h3>

            {/* Bottom Accent Line */}
            <div className="mt-4 h-[2px] w-0 bg-[#5af04f] group-hover:w-full transition-all duration-300"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverviewCards;

// const OverviewCards = () => {
//   const stats = [
//     { label: "Subscribers", value: "15.5K" },
//     { label: "Total Views", value: "10.1M" },
//     { label: "Streams", value: "45" },
//     { label: "Watch Time", value: "1,240 hrs" },
//   ];

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-6 text-red-500">Dashboard</h2>

//       <div className="grid md:grid-cols-4 gap-4">
//         {stats.map((s, i) => (
//           <div key={i} className="bg-gray-900 p-6 rounded-lg">
//             <p className="text-gray-400">{s.label}</p>
//             <h3 className="text-2xl font-bold mt-2">{s.value}</h3>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default OverviewCards;
