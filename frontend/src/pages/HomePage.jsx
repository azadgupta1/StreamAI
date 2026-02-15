import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Home from "../components/Home";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const HomePage = () => {
  const location = useLocation();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [defaultTab, setDefaultTab] = useState("login");

  useEffect(() => {
    if (location.state?.openAuth) {
      setAuthModalOpen(true);
      setDefaultTab("login");
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <div className="h-screen bg-[#0E0E10] flex flex-col">
      <Navbar
        authModalOpen={authModalOpen}
        setAuthModalOpen={setAuthModalOpen}
        defaultTab={defaultTab}
        setDefaultTab={setDefaultTab}
      />

      <div className="flex flex-1 relative">
        <div className="sticky top-16 z-10">
          <Sidebar />
        </div>

        <div className="flex-1 overflow-y-auto h-screen">
          <Home />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

// import React from "react";
// import Home from "../components/Home";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import Hero from "../components/Hero";

// const HomePage = () => {
//   return (
//     <div className="h-screen bg-base-200 flex flex-col">
//       {/* Navbar */}
//       <Navbar />

//       {/* Content area */}
//       <div className="flex flex-1 relative">
//         {/* Sidebar: fixed position */}
//         <div className="sticky top-16 z-10">
//           <Sidebar />
//         </div>

//         {/* Main content scrollable */}
//         <div className="flex-1 overflow-y-auto h-screen pt-0">
//           <Home />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;

// import React from "react";
// import Home from "../components/Home";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";

// const HomePage = () => {
//   return (
//     <div className="h-screen bg-base-200 flex flex-col">
//       {/* Navbar */}
//       <Navbar />

//       {/* Content area */}
//       <div className="flex flex-1">
//         {/* Sidebar component */}
//         <Sidebar />

//         {/* Main content */}
//         <div className="flex-1 p-0">
//           <Home />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;
