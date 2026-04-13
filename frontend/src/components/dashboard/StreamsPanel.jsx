const StreamsPanel = () => {
  const previews = [
    "/preview/1.webm",
    "/preview/2.webm",
    "/preview/3.webm",
    "/preview/4.mp4",
    "/preview/5.mp4",
    "/preview/6.mp4",
    "/preview/7.mp4",
    "/preview/8.mp4",
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white tracking-wide">
          Your Streams
        </h2>
        <div className="h-1 w-16 bg-[#5af04f] rounded-full"></div>
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {previews.map((video, i) => (
          <div
            key={i}
            className="group relative bg-gradient-to-br from-gray-900 via-black to-gray-950 
                       border border-gray-800 rounded-xl overflow-hidden 
                       hover:border-[#5af04f]/60 transition-all duration-300 
                       hover:shadow-[0_0_20px_#5af04f33] cursor-pointer"
          >
            {/* Video Preview */}
            <video
              src={video}
              muted
              loop
              onMouseEnter={(e) => e.target.play()}
              onMouseLeave={(e) => e.target.pause()}
              className="w-full h-40 object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
              <span className="text-[#5af04f] font-semibold text-sm tracking-wide">
                ▶ Play
              </span>
            </div>

            {/* Info */}
            <div className="p-4">
              <h3 className="text-sm font-semibold text-white group-hover:text-[#5af04f] transition">
                Stream #{i + 1}
              </h3>

              <p className="text-xs text-gray-400 mt-1">Mock preview stream</p>
            </div>

            {/* Bottom Accent */}
            <div className="h-[2px] w-0 bg-[#5af04f] group-hover:w-full transition-all duration-300"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StreamsPanel;
