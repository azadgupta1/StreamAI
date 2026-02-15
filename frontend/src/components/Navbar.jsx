import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiSearch } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { Loader } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import STREAMAI_PNG from "../assets/STREAMAI_PNG.png";
import AuthModal from "./AuthModal";
import toast from "react-hot-toast";

const Navbar = ({
  authModalOpen,
  setAuthModalOpen,
  defaultTab,
  setDefaultTab,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [profileOpen, setProfileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { authUser, logout, isAuthenticate, isCheckingAuth } = useAuthStore();

  /* ================= AUTH CHECK ================= */
  useEffect(() => {
    isAuthenticate();
  }, [isAuthenticate]);

  /* ================= CLOSE MENUS ON ROUTE CHANGE ================= */
  useEffect(() => {
    setSidebarOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  /* ================= CLOSE SIDEBAR ON RESIZE ================= */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ================= LOCK BODY SCROLL ================= */
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "auto";
  }, [sidebarOpen]);

  /* ================= CLOSE PROFILE DROPDOWN ON OUTSIDE CLICK ================= */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".profile-menu")) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  /* ================= LOADER ================= */
  if (isCheckingAuth) {
    return (
      <div className="bg-[#0e0e0e] flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className="w-full h-14 py-4 bg-[#0E0E10] border-b border-[#26262C] flex items-center justify-between px-3 md:px-6 sticky top-0 z-40">
        {/* LEFT */}
        <div className="flex items-center gap-4 md:gap-6">
          <Link to="/">
            <img src={STREAMAI_PNG} alt="logo" className="h-8 md:h-9" />
          </Link>

          <div className="hidden lg:flex gap-6">
            <Link
              to="/following"
              className="text-gray-300 hover:text-white text-sm font-medium"
            >
              Following
            </Link>
            <Link
              to="/browse"
              className="text-gray-300 hover:text-white text-sm font-medium"
            >
              Browse
            </Link>
          </div>
        </div>

        {/* SEARCH (Tablet + Desktop) */}
        <div className="hidden md:flex flex-1 justify-center px-4">
          <div className="flex w-full max-w-md">
            <input
              type="text"
              placeholder="Search streams..."
              className="w-full bg-[#18181B] text-sm px-4 py-2 rounded-l-md border border-[#26262C] focus:outline-none focus:border-[#9147FF]"
            />
            <button className="px-4 bg-[#26262C] border border-l-0 border-[#26262C] rounded-r-md hover:bg-[#333]">
              <FiSearch />
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden md:flex items-center gap-6">
            <NavLink to="/explore" label="Live" />
            <NavLink to="/about" label="About" />
          </div>

          {authUser ? (
            <div className="relative profile-menu hidden sm:block">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#5af04f] flex items-center justify-center hover:scale-105 transition"
              >
                <FaUser className="text-black text-sm md:text-lg" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-[#18181B] border border-[#26262C] rounded-lg shadow-xl overflow-hidden animate-fadeIn">
                  <button
                    onClick={() => navigate("/profile")}
                    className="w-full text-left px-4 py-3 hover:bg-[#26262C] text-sm"
                  >
                    Channel
                  </button>

                  <button
                    onClick={() => navigate("/creator")}
                    className="w-full text-left px-4 py-3 hover:bg-[#26262C] text-sm"
                  >
                    Creator Dashboard
                  </button>

                  <div className="border-t border-[#26262C]" />

                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-3 hover:bg-red-600/20 text-red-400 text-sm"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-4">
              <button
                onClick={() => {
                  setDefaultTab("login");
                  setAuthModalOpen(true);
                }}
                className="text-gray-300 hover:text-white text-sm cursor-pointer hover:border-1 hover:px-4 hover:py-2 hover:rounded-md transition-all duration-150"
              >
                Log In
              </button>

              <button
                onClick={() => {
                  setDefaultTab("register");
                  setAuthModalOpen(true);
                }}
                className="bg-[#53FC18] hover:bg-yellow-400 hover:border-2 hover:border-yellow-400 text-black px-4 py-2 rounded-md text-sm font-semibold cursor-pointer transition-all duration-150"
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden text-[#9147FF] cursor-pointer"
          >
            <FiMenu size={22} />
          </button>
        </div>
      </nav>

      {/* ================= SIDEBAR ================= */}
      <div
        className={`fixed top-0 right-0 h-full w-[80%] max-w-xs bg-[#18181B] border-l border-[#26262C] transform transition-transform duration-300 ease-in-out z-50 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#26262C]">
          <h2 className="text-lg font-semibold text-[#9147FF]">StreamAI</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="cursor-pointer"
          >
            <FiX size={22} />
          </button>
        </div>

        <div className="flex items-start flex-col gap-6 mt-6 px-6 text-sm font-medium">
          <Link to="/following">Following</Link>
          <Link to="/browse">Browse</Link>
          <Link to="/explore">Live Streams</Link>
          <Link to="/about">About</Link>

          {authUser ? (
            <>
              <button onClick={() => navigate("/profile")}>Channel</button>
              <button onClick={() => navigate("/creator")}>
                Creator Dashboard
              </button>
              <button onClick={logout} className="text-red-400">
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setSidebarOpen(false);
                  setDefaultTab("login");
                  setAuthModalOpen(true);
                }}
                className="text-gray-300 hover:text-white text-sm text-left cursor-pointer hover:border-1 hover:px-4 hover:py-2 hover:rounded-md transition-all duration-150"
              >
                Log In
              </button>

              <button
                onClick={() => {
                  setSidebarOpen(false);
                  setDefaultTab("register");
                  setAuthModalOpen(true);
                }}
                className="bg-[#53FC18] hover:bg-yellow-400 hover:border-2 hover:border-yellow-400 text-black px-4 py-2 rounded-md text-sm font-semibold text-left cursor-pointer transition-all duration-150"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <AuthModal
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultTab={defaultTab}
      />
    </>
  );
};

/* ================= REUSABLE NAV LINK ================= */
const NavLink = ({ to, label }) => (
  <Link to={to} className="text-gray-300 hover:text-white transition text-sm">
    {label}
  </Link>
);

export default Navbar;

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { FiMenu, FiX, FiSearch } from "react-icons/fi";
// import { FaUser } from "react-icons/fa";
// import { Loader } from "lucide-react";
// import { useAuthStore } from "../store/useAuthStore";
// import STREAMAI_PNG from "../assets/STREAMAI_PNG.png";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [profileOpen, setProfileOpen] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const { authUser, logout, isAuthenticate, isCheckingAuth } = useAuthStore();
//   // const { logout, isAuthenticate, isCheckingAuth } = useAuthStore();

//   /* ================= AUTH CHECK ================= */
//   useEffect(() => {
//     isAuthenticate();
//   }, [isAuthenticate]);

//   /* ================= CLOSE MENUS ON ROUTE CHANGE ================= */
//   useEffect(() => {
//     setSidebarOpen(false);
//     setProfileOpen(false);
//   }, [location.pathname]);

//   /* ================= CLOSE SIDEBAR ON RESIZE ================= */
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 768) {
//         setSidebarOpen(false);
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   /* ================= LOCK BODY SCROLL ================= */
//   useEffect(() => {
//     document.body.style.overflow = sidebarOpen ? "hidden" : "auto";
//   }, [sidebarOpen]);

//   /* ================= CLOSE PROFILE DROPDOWN ON OUTSIDE CLICK ================= */
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (!e.target.closest(".profile-menu")) {
//         setProfileOpen(false);
//       }
//     };

//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, []);

//   /* ================= LOADER ================= */
//   if (isCheckingAuth) {
//     return (
//       <div className="bg-[#0e0e0e] flex items-center justify-center h-screen">
//         <Loader className="size-10 animate-spin" />
//       </div>
//     );
//   }

//   // const authUser = false;

//   return (
//     <>
//       {/* ================= NAVBAR ================= */}
//       <nav className="w-full h-14 py-4 bg-[#0E0E10] border-b border-[#26262C] flex items-center justify-between px-3 md:px-6 sticky top-0 z-40">
//         {/* LEFT */}
//         <div className="flex items-center gap-4 md:gap-6">
//           <Link to="/">
//             <img src={STREAMAI_PNG} alt="logo" className="h-8 md:h-9" />
//           </Link>

//           <div className="hidden lg:flex gap-6">
//             <Link
//               to="/following"
//               className="text-gray-300 hover:text-white text-sm font-medium"
//             >
//               Following
//             </Link>
//             <Link
//               to="/browse"
//               className="text-gray-300 hover:text-white text-sm font-medium"
//             >
//               Browse
//             </Link>
//           </div>
//         </div>

//         {/* SEARCH (Tablet + Desktop) */}
//         <div className="hidden md:flex flex-1 justify-center px-4">
//           <div className="flex w-full max-w-md">
//             <input
//               type="text"
//               placeholder="Search streams..."
//               className="w-full bg-[#18181B] text-sm px-4 py-2 rounded-l-md border border-[#26262C] focus:outline-none focus:border-[#9147FF]"
//             />
//             <button className="px-4 bg-[#26262C] border border-l-0 border-[#26262C] rounded-r-md hover:bg-[#333]">
//               <FiSearch />
//             </button>
//           </div>
//         </div>

//         {/* RIGHT */}
//         <div className="flex items-center gap-4 md:gap-6">
//           <div className="hidden md:flex items-center gap-6">
//             <NavLink to="/explore" label="Live" />
//             <NavLink to="/about" label="About" />
//           </div>

//           {authUser ? (
//             <div className="relative profile-menu hidden sm:block">
//               <button
//                 onClick={() => setProfileOpen(!profileOpen)}
//                 className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#5af04f] flex items-center justify-center hover:scale-105 transition"
//               >
//                 <FaUser className="text-black text-sm md:text-lg" />
//               </button>

//               {profileOpen && (
//                 <div className="absolute right-0 mt-3 w-48 bg-[#18181B] border border-[#26262C] rounded-lg shadow-xl overflow-hidden animate-fadeIn">
//                   <button
//                     onClick={() => navigate("/profile")}
//                     className="w-full text-left px-4 py-3 hover:bg-[#26262C] text-sm"
//                   >
//                     Channel
//                   </button>

//                   <button
//                     onClick={() => navigate("/creator")}
//                     className="w-full text-left px-4 py-3 hover:bg-[#26262C] text-sm"
//                   >
//                     Creator Dashboard
//                   </button>

//                   <div className="border-t border-[#26262C]" />

//                   <button
//                     onClick={logout}
//                     className="w-full text-left px-4 py-3 hover:bg-red-600/20 text-red-400 text-sm"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <div className="hidden sm:flex items-center gap-4">
//               <Link
//                 to="/login"
//                 className="text-gray-300 hover:text-white text-sm"
//               >
//                 Log In
//               </Link>

//               <Link
//                 to="/register"
//                 className="bg-[#5af04f] hover:bg-[#4bbf43] text-black px-4 py-2 rounded-md text-sm font-semibold"
//               >
//                 Sign Up
//               </Link>
//             </div>
//           )}

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setSidebarOpen(true)}
//             className="md:hidden text-[#9147FF]"
//           >
//             <FiMenu size={22} />
//           </button>
//         </div>
//       </nav>

//       {/* ================= SIDEBAR ================= */}
//       <div
//         className={`fixed top-0 right-0 h-full w-[80%] max-w-xs bg-[#18181B] border-l border-[#26262C] transform transition-transform duration-300 ease-in-out z-50 ${
//           sidebarOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         <div className="flex items-center justify-between px-6 py-4 border-b border-[#26262C]">
//           <h2 className="text-lg font-semibold text-[#9147FF]">StreamAI</h2>
//           <button onClick={() => setSidebarOpen(false)}>
//             <FiX size={22} />
//           </button>
//         </div>

//         <div className="flex items-start flex-col gap-6 mt-6 px-6 text-sm font-medium">
//           <Link to="/following">Following</Link>
//           <Link to="/browse">Browse</Link>
//           <Link to="/explore">Live Streams</Link>
//           <Link to="/about">About</Link>

//           {authUser ? (
//             <>
//               <button onClick={() => navigate("/profile")}>Channel</button>
//               <button onClick={() => navigate("/creator")}>
//                 Creator Dashboard
//               </button>
//               <button onClick={logout} className="text-red-400">
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link
//                 to="/login"
//                 className="text-gray-300 hover:text-white text-sm"
//               >
//                 Log In
//               </Link>

//               <Link
//                 to="/register"
//                 className="bg-[#5af04f] hover:bg-[#4bbf43] text-black px-4 py-2 rounded-md text-sm font-semibold"
//               >
//                 Sign Up
//               </Link>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Overlay */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/60 z-40"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}
//     </>
//   );
// };

// /* ================= REUSABLE NAV LINK ================= */
// const NavLink = ({ to, label }) => (
//   <Link to={to} className="text-gray-300 hover:text-white transition text-sm">
//     {label}
//   </Link>
// );

// export default Navbar;

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { FiMenu, FiX, FiSearch } from "react-icons/fi";
// import { FaUser } from "react-icons/fa";
// import { Loader } from "lucide-react";
// import { useAuthStore } from "../store/useAuthStore";
// import STREAMAI_PNG from "../assets/STREAMAI_PNG.png";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [profileOpen, setProfileOpen] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const { authUser, logout, isAuthenticate, isCheckingAuth } = useAuthStore();

//   /* ================= AUTH CHECK ================= */
//   useEffect(() => {
//     isAuthenticate();
//   }, [isAuthenticate]);

//   /* ================= CLOSE MENUS ON ROUTE CHANGE ================= */
//   useEffect(() => {
//     setSidebarOpen(false);
//     setProfileOpen(false);
//   }, [location.pathname]);

//   /* ================= CLOSE SIDEBAR ON RESIZE ================= */
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 768) setSidebarOpen(false);
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   /* ================= LOCK BODY SCROLL ================= */
//   useEffect(() => {
//     document.body.style.overflow = sidebarOpen ? "hidden" : "auto";
//   }, [sidebarOpen]);

//   /* ================= LOADER ================= */
//   if (isCheckingAuth && !authUser) {
//     return (
//       <div className="bg-[#0e0e0e] flex items-center justify-center h-screen">
//         <Loader className="size-10 animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* ================= NAVBAR ================= */}
//       <nav className="w-full h-14 py-1.5 bg-[#0E0E10] border-b border-[#26262C] flex items-center justify-between px-4 sticky top-0 z-50">
//         {/* ================= LEFT ================= */}
//         <div className="flex items-center gap-6">
//           <Link to="/">
//             <img src={STREAMAI_PNG} alt="logo" className="h-9" />
//           </Link>

//           <Link
//             to="/following"
//             className="hidden md:block text-gray-300 hover:text-white font-medium"
//           >
//             Following
//           </Link>

//           <Link
//             to="/browse"
//             className="hidden md:block text-gray-300 hover:text-white font-medium"
//           >
//             Browse
//           </Link>
//         </div>

//         {/* ================= CENTER SEARCH ================= */}
//         <div className="hidden md:flex flex-1 justify-center">
//           <div className="flex w-[420px]">
//             <input
//               type="text"
//               placeholder="Search"
//               className="w-full bg-[#18181B] text-sm px-4 py-2 rounded-l-md border border-[#26262C] focus:outline-none focus:border-[#9147FF]"
//             />
//             <button className="px-4 bg-[#26262C] border border-l-0 border-[#26262C] rounded-r-md hover:bg-[#333]">
//               <FiSearch />
//             </button>
//           </div>
//         </div>

//         {/* ================= RIGHT ================= */}
//         <div className="flex items-center gap-6">
//           <NavLink to="/explore" label="Live Streams" />
//           <NavLink to="/about" label="About" />

//           {authUser ? (
//             <div className="relative">
//               {/* Green profile icon */}
//               <button
//                 onClick={() => setProfileOpen(!profileOpen)}
//                 className="w-10 h-10 rounded-full bg-[#5af04f] flex items-center justify-center hover:scale-105 transition"
//               >
//                 <FaUser className="text-black text-lg" />
//               </button>

//               {profileOpen && (
//                 <div className="absolute right-0 mt-3 w-48 bg-[#18181B] border border-[#26262C] rounded-lg shadow-lg overflow-hidden">
//                   <button
//                     onClick={() => navigate("/profile")}
//                     className="w-full text-left px-4 py-3 hover:bg-[#26262C] text-sm"
//                   >
//                     Channel
//                   </button>

//                   <button
//                     onClick={() => navigate("/creator")}
//                     className="w-full text-left px-4 py-3 hover:bg-[#26262C] text-sm"
//                   >
//                     Creator Dashboard
//                   </button>

//                   <div className="border-t border-[#26262C]" />

//                   <button
//                     onClick={logout}
//                     className="w-full text-left px-4 py-3 hover:bg-red-600/20 text-red-400 text-sm"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <>
//               <Link
//                 to="/login"
//                 className="text-gray-300 hover:text-white text-sm"
//               >
//                 Log In
//               </Link>

//               <Link
//                 to="/register"
//                 className="bg-[#5af04f] hover:bg-[#4bbf43] text-black px-4 py-2 rounded-md text-sm font-semibold"
//               >
//                 Sign Up
//               </Link>
//             </>
//           )}

//           {/* Mobile menu */}
//           <button
//             onClick={() => setSidebarOpen(true)}
//             className="md:hidden text-[#9147FF]"
//           >
//             <FiMenu size={24} />
//           </button>
//         </div>
//       </nav>

//       {/* ================= SIDEBAR (Mobile) ================= */}
//       <div
//         className={`fixed top-0 right-0 h-full w-72 bg-[#18181B] border-l border-[#26262C] transform transition-transform duration-300 ease-in-out z-50 ${
//           sidebarOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         <div className="flex items-center justify-between px-6 py-4 border-b border-[#26262C]">
//           <h2 className="text-lg font-semibold text-[#9147FF]">StreamAI</h2>
//           <button onClick={() => setSidebarOpen(false)}>
//             <FiX size={22} />
//           </button>
//         </div>

//         <div className="flex flex-col gap-6 mt-6 px-6 text-sm font-medium">
//           <Link to="/following">Following</Link>
//           <Link to="/browse">Browse</Link>
//           <Link to="/explore">Live Streams</Link>
//           <Link to="/about">About</Link>

//           {authUser && (
//             <>
//               <button onClick={() => navigate("/profile")}>Channel</button>
//               <button onClick={() => navigate("/creator")}>
//                 Creator Dashboard
//               </button>
//               <button onClick={logout} className="text-red-400">
//                 Logout
//               </button>
//             </>
//           )}
//         </div>
//       </div>

//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/60"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}
//     </>
//   );
// };

// /* ================= REUSABLE LINKS ================= */
// const NavLink = ({ to, label }) => (
//   <Link to={to} className="text-gray-300 hover:text-white transition text-sm">
//     {label}
//   </Link>
// );

// export default Navbar;

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { FiMenu, FiX } from "react-icons/fi";
// import { IoMdLogOut } from "react-icons/io";
// import { FaUserAstronaut } from "react-icons/fa";
// import { useAuthStore } from "../store/useAuthStore";
// import { Loader } from "lucide-react";
// import STREAMAI_PNG from '../assets/STREAMAI_PNG.png';

// const Navbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [profileOpen, setProfileOpen] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const { authUser, logout, isAuthenticate, isCheckingAuth } = useAuthStore();

//   useEffect(() => {
//     isAuthenticate();
//   }, [isAuthenticate]);

//   /* ================= CLOSE SIDEBAR ON ROUTE CHANGE ================= */
//   useEffect(() => {
//     setSidebarOpen(false);
//     setProfileOpen(false);
//   }, [location.pathname]);

//   /* ================= CLOSE SIDEBAR ON RESIZE ================= */
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 768) {
//         setSidebarOpen(false);
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//     useEffect(() => {
//       const handleClickOutside = (e) => {
//         if (!e.target.closest(".profile-menu")) {
//           setProfileOpen(false);
//         }
//       };

//       document.addEventListener("click", handleClickOutside);
//       return () => document.removeEventListener("click", handleClickOutside);
//     }, []);

//   /* ================= LOCK BODY SCROLL ================= */
//   useEffect(() => {
//     if (sidebarOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//   }, [sidebarOpen]);

//   if (isCheckingAuth && !authUser) {
//     return (
//       <div className="bg-[#0e0e0e] flex items-center justify-center h-screen">
//         <Loader className="size-10 animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* ================= NAVBAR ================= */}
//       <nav className="w-full h-12 bg-[#0E0E10] border-b border-[#26262C] flex items-center justify-between px-2 md:px-4 sticky top-0 z-50">
//         {/* Logo */}
//         <Link
//           to="/"
//           className="text-2xl md:text-3xl font-extrabold text-[#9147FF] hover:opacity-80 transition"
//         >
//           <img
//             src={STREAMAI_PNG}
//             alt="STREAMAI LOGO"
//             className="h:8 md:h-10 w-auto"
//           />
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex items-center gap-8 text-sm font-medium">
//           <NavLink to="/explore" label="Live Streams" />
//           <NavLink to="/about" label="About" />
//         {authUser ? (
//           <div className="relative profile-menu ml-4">
//             {/* Profile Icon */}
//             <button
//               onClick={() => setProfileOpen(!profileOpen)}
//               className="w-10 h-10 rounded-full overflow-hidden border border-[#9147FF] hover:scale-105 transition"
//             >
//               <img
//                 src={
//                   authUser.profile_picture
//                     ? `http://localhost:5000${authUser.profile_picture}`
//                     : "https://ui-avatars.com/api/?name=" + authUser.username
//                 }
//                 alt="profile"
//                 className="w-full h-full object-cover"
//               />
//             </button>

//             {/* Dropdown */}
//             {profileOpen && (
//               <div className="absolute right-0 mt-3 w-52 bg-[#18181B] border border-[#26262C] rounded-lg shadow-lg overflow-hidden">
//                 <button
//                   onClick={() => navigate("/profile")}
//                   className="w-full text-left px-4 py-3 hover:bg-[#26262C] text-sm"
//                 >
//                   Channel
//                 </button>

//                 <button
//                   onClick={() => navigate("/creator")}
//                   className="w-full text-left px-4 py-3 hover:bg-[#26262C] text-sm"
//                 >
//                   Creator Dashboard
//                 </button>

//                 <div className="border-t border-[#26262C]" />

//                 <button
//                   onClick={logout}
//                   className="w-full text-left px-4 py-3 hover:bg-red-600/20 text-red-400 text-sm"
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         ) : (

//             <div className="flex gap-4 ml-4">
//               <Link
//                 to="/login"
//                 className="px-4 py-2 text-sm font-semibold text-gray-300 hover:text-white transition"
//               >
//                 Log In
//               </Link>

//               <Link
//                 to="/signup"
//                 className="bg-[#9147FF] hover:bg-[#772CE8] text-white px-4 py-2 rounded-md text-sm font-semibold transition"
//               >
//                 Sign Up
//               </Link>
//             </div>
//           )}
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           onClick={() => setSidebarOpen(true)}
//           className="md:hidden text-gray-300 hover:text-white transition cursor-pointer"
//         >
//           <FiMenu size={24} className="text-[#9147FF]" />
//         </button>
//       </nav>

//       {/* ================= SIDEBAR ================= */}
//       <div
//         className={`fixed top-0 right-0 h-full w-72 bg-[#18181B] border-l border-[#26262C] transform transition-transform duration-300 ease-in-out z-50 ${
//           sidebarOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between px-6 py-4 border-b border-[#26262C]">
//           <h2 className="text-lg font-semibold text-[#9147FF]">StreamAI</h2>
//           <button
//             onClick={() => setSidebarOpen(false)}
//             className="text-gray-300 hover:text-white transition cursor-pointer"
//           >
//             <FiX size={24} className="text-[#9147FF]" />
//           </button>
//         </div>

//         {/* Links */}
//         <div className="flex flex-col gap-6 mt-6 px-6 text-sm font-medium">
//           <SidebarLink to="/explore" label="Live Streams" />
//           <SidebarLink to="/about" label="About" />

//           {authUser ? (
//             <div className="flex flex-col gap-3">
//               <button
//                 onClick={() => navigate("/profile")}
//                 className="text-left hover:text-white"
//               >
//                 Channel
//               </button>

//               <button
//                 onClick={() => navigate("/creator")}
//                 className="text-left hover:text-white"
//               >
//                 Creator Dashboard
//               </button>

//               <button
//                 onClick={logout}
//                 className="text-left text-red-400 hover:text-red-300"
//               >
//                 Logout
//               </button>
//             </div>
//           ) : (

//             <>
//               <SidebarLink to="/login" label="Log In" />
//               <SidebarLink to="/signup" label="Sign Up" />
//             </>
//           )}
//         </div>
//       </div>

//       {/* Overlay */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}
//     </>
//   );
// };

// const NavLink = ({ to, label }) => (
//   <Link to={to} className="text-gray-300 hover:text-white transition">
//     {label}
//   </Link>
// );

// const SidebarLink = ({ to, label }) => (
//   <Link to={to} className="text-gray-300 hover:text-white transition">
//     {label}
//   </Link>
// );

// export default Navbar;
