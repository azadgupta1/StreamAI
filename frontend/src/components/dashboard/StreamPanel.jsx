const StreamPanel = () => {
  return (
    <div className="max-w-3xl">
      <h2 className="text-2xl font-bold text-red-500 mb-6">
        Stream Settings
      </h2>

      <div className="bg-gray-900 p-6 rounded-lg space-y-4">

        <div>
          <label className="text-sm text-gray-400">RTMP Server</label>
          <input
            value="rtmp://yourdomain.com/live"
            disabled
            className="w-full bg-gray-800 p-3 rounded-md mt-1"
          />
        </div>

        <div>
          <label className="text-sm text-gray-400">Stream Key</label>
          <div className="flex gap-2 mt-1">
            <input
              value="***************"
              disabled
              className="flex-1 bg-gray-800 p-3 rounded-md"
            />
            <button className="px-4 bg-gray-700 rounded-md">Show</button>
            <button className="px-4 bg-red-600 rounded-md">Reset</button>
          </div>
        </div>

        <div className="bg-yellow-900/20 border border-yellow-700 p-4 rounded-md text-sm">
          Never share your stream key with anyone.
        </div>
      </div>
    </div>
  );
};

export default StreamPanel;
