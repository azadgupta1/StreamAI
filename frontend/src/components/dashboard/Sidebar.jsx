import { FaHome, FaVideo, FaChartLine, FaUsers, FaCog, FaHistory, FaChevronLeft, FaChevronRight, FaUser, FaBroadcastTower } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { useNavigate } from "react-router-dom";


const Sidebar = ({ sidebarOpen, setSidebarOpen, activeTab, setActiveTab }) => {
const tabs = [
  { id: "dashboard", label: "Dashboard", icon: <FaHome /> },
  { id: "goLive", label: "Go Live", icon: <FaVideo /> },
  { id: "streams", label: "Streams", icon: <FaHistory /> },
  { id: "analytics", label: "Analytics", icon: <FaChartLine /> },
  { id: "followers", label: "Followers", icon: <FaUsers /> },
  { id: "profile", label: "Profile", icon: <FaUser /> },
  { id: "stream", label: "Stream", icon: <FaBroadcastTower /> },
  { id: "settings", label: "Settings", icon: <FaCog /> },
];


  return (
        <div
        className={`fixed top-0 left-0 h-screen bg-gray-950 border-r border-gray-800 p-3 transition-all duration-300 z-40 ${
            sidebarOpen ? "w-64" : "w-20"
        }`}
        >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        {sidebarOpen && (
          <h2 className="text-xl font-bold text-red-500">StreamAI</h2>
        )}

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-gray-900 rounded-md"
        >
          {sidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-col gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-3 p-3 rounded-md transition ${
              activeTab === tab.id
                ? "bg-red-600"
                : "hover:bg-gray-900 text-gray-300"
            }`}
          >
            <span className="text-lg">{tab.icon}</span>

            {sidebarOpen && (
              <span className="text-sm">{tab.label}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

