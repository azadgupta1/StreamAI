const OverviewCards = () => {
  const stats = [
    { label: "Subscribers", value: "15.5K" },
    { label: "Total Views", value: "10.1M" },
    { label: "Streams", value: "45" },
    { label: "Watch Time", value: "1,240 hrs" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-red-500">Dashboard</h2>

      <div className="grid md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-gray-900 p-6 rounded-lg">
            <p className="text-gray-400">{s.label}</p>
            <h3 className="text-2xl font-bold mt-2">{s.value}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverviewCards;

