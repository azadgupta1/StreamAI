import { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import OverviewCards from "../components/dashboard/OverviewCards";
import GoLivePanel from "../components/dashboard/GoLivePanel";
import StreamsPanel from "../components/dashboard/StreamsPanel";
import AnalyticsPanel from "../components/dashboard/AnalyticsPanel";
import FollowersPanel from "../components/dashboard/FollowersPanel";
import ProfilePanel from "../components/dashboard/ProfilePanel";
import StreamPanel from "../components/dashboard/StreamPanel";
import SettingsPanel from "../components/dashboard/SettingsPanel";

const CreatorDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (activeTab) {
        case "goLive":
        return <GoLivePanel />;
        case "streams":
        return <StreamsPanel />;
        case "analytics":
        return <AnalyticsPanel />;
        case "followers":
        return <FollowersPanel />;
        case "profile":
        return <ProfilePanel />;
        case "stream":
        return <StreamPanel />;
        case "settings":
        return <SettingsPanel />;
        default:
        return <OverviewCards />;
    }
  };


  return (

    <div className="bg-black text-white min-h-screen relative">
        
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab}/>
      


      <div
    className={`flex-1 p-6 transition-all duration-300 ${
            sidebarOpen ? "ml-64" : "ml-20"
            }`}
        >
        {renderContent()}
      </div>
    </div>
  );
};

export default CreatorDashboard;
