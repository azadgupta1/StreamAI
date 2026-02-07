import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { IoMdLogOut } from "react-icons/io";
import { FaUserAstronaut } from "react-icons/fa";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { authUser, logout } = useAuthStore();

  /* ================= CLOSE SIDEBAR ON ROUTE CHANGE ================= */
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


  
    useEffect(() => {
      const handleClickOutside = (e) => {
        if (!e.target.closest(".profile-menu")) {
          setProfileOpen(false);
        }
      };

      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    
  /* ================= LOCK BODY SCROLL ================= */
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [sidebarOpen]);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className="w-full h-16 bg-[#0E0E10] border-b border-[#26262C] flex items-center justify-between px-6 md:px-10 sticky top-0 z-50">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl md:text-3xl font-extrabold text-[#9147FF] hover:opacity-80 transition"
        >
          Stream<span className="text-white">AI</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <NavLink to="/explore" label="Live Streams" />
          <NavLink to="/about" label="About" />

        {authUser ? (
          <div className="relative profile-menu ml-4">
            {/* Profile Icon */}
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="w-10 h-10 rounded-full overflow-hidden border border-[#9147FF] hover:scale-105 transition"
            >
              <img
                src={
                  authUser.profile_picture
                    ? `http://localhost:5000${authUser.profile_picture}`
                    : "https://ui-avatars.com/api/?name=" + authUser.username
                }
                alt="profile"
                className="w-full h-full object-cover"
              />
            </button>

            {/* Dropdown */}
            {profileOpen && (
              <div className="absolute right-0 mt-3 w-52 bg-[#18181B] border border-[#26262C] rounded-lg shadow-lg overflow-hidden">
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

            <div className="flex gap-4 ml-4">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-semibold text-gray-300 hover:text-white transition"
              >
                Log In
              </Link>

              <Link
                to="/signup"
                className="bg-[#9147FF] hover:bg-[#772CE8] text-white px-4 py-2 rounded-md text-sm font-semibold transition"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden text-gray-300 hover:text-white transition cursor-pointer"
        >
          <FiMenu size={24} className="text-[#9147FF]" />
        </button>
      </nav>

      {/* ================= SIDEBAR ================= */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-[#18181B] border-l border-[#26262C] transform transition-transform duration-300 ease-in-out z-50 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#26262C]">
          <h2 className="text-lg font-semibold text-[#9147FF]">StreamAI</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-300 hover:text-white transition cursor-pointer"
          >
            <FiX size={24} className="text-[#9147FF]" />
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-6 mt-6 px-6 text-sm font-medium">
          <SidebarLink to="/explore" label="Live Streams" />
          <SidebarLink to="/about" label="About" />

          {authUser ? (
            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate("/profile")}
                className="text-left hover:text-white"
              >
                Channel
              </button>

              <button
                onClick={() => navigate("/creator")}
                className="text-left hover:text-white"
              >
                Creator Dashboard
              </button>

              <button
                onClick={logout}
                className="text-left text-red-400 hover:text-red-300"
              >
                Logout
              </button>
            </div>
          ) : (

            <>
              <SidebarLink to="/login" label="Log In" />
              <SidebarLink to="/signup" label="Sign Up" />
            </>
          )}
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};

const NavLink = ({ to, label }) => (
  <Link to={to} className="text-gray-300 hover:text-white transition">
    {label}
  </Link>
);

const SidebarLink = ({ to, label }) => (
  <Link to={to} className="text-gray-300 hover:text-white transition">
    {label}
  </Link>
);

export default Navbar;

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FiMenu, FiX } from "react-icons/fi";
// import { IoMdLogOut } from "react-icons/io";
// import { FaUserAstronaut } from "react-icons/fa";
// import { useAuthStore } from "../store/useAuthStore";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const { authUser, logout } = useAuthStore();

//   return (
//     <>
//       {/* ================= NAVBAR ================= */}
//       <nav className="w-full h-20 bg-[#0E0E10] border-b border-[#26262C] flex items-center justify-between px-6 md:px-10 sticky top-0 z-50">
//         {/* ===== Logo ===== */}
//         <Link
//           to="/"
//           className="text-3xl font-extrabold tracking-wide text-[#9147FF] hover:opacity-80 transition"
//         >
//           Stream<span className="text-white">AI</span>
//         </Link>

//         {/* ===== Desktop Menu ===== */}
//         <div className="hidden md:flex items-center gap-8 text-md font-medium">
//           <NavLink to="/explore" label="Live Streams" />
//           <NavLink to="/about" label="About" />

//           {authUser || false ? (
//             <div className="flex items-center gap-6 ml-4">
//               <button
//                 onClick={() => navigate("/profile")}
//                 className="flex items-center gap-2 text-gray-300 hover:text-white transition"
//               >
//                 <FaUserAstronaut className="text-[#9147FF] text-lg" />
//                 Profile
//               </button>

//               <button
//                 onClick={logout}
//                 className="flex items-center gap-2 text-gray-300 hover:text-white transition"
//               >
//                 <IoMdLogOut className="text-[#9147FF] text-lg" />
//                 Logout
//               </button>
//             </div>
//           ) : (
//             <div className="flex">
//               <Link
//                 to="/login"
//                 className="flex bg-[#9147FF] hover:bg-[#772CE8] text-white px-4 py-2 rounded-full text-sm font-semibold transition ml-4 hover:rounded-md"
//               >
//                 Log In
//               </Link>
//               <Link
//                 to="/login"
//                 className="flex bg-[#9147FF] hover:bg-[#772CE8] text-white px-4 py-2 rounded-md text-sm font-semibold transition ml-4 hover:rounded-full"
//               >
//                 Sign Up
//               </Link>
//             </div>
//           )}
//         </div>

//         {/* ===== Mobile Menu Button ===== */}
//         <button
//           onClick={() => setSidebarOpen(true)}
//           className="md:hidden text-gray-300 hover:text-white transition"
//         >
//           <FiMenu size={24} />
//         </button>
//       </nav>

//       {/* ================= SIDEBAR ================= */}
//       <div
//         className={`fixed top-0 right-0 h-full w-72 bg-[#18181B] border-l border-[#26262C] transform transition-transform duration-300 ease-in-out z-50 ${
//           sidebarOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         {/* Sidebar Header */}
//         <div className="flex items-center justify-between px-6 py-4 border-b border-[#26262C]">
//           <h2 className="text-lg font-semibold text-[#9147FF]">StreamAI</h2>
//           <button
//             onClick={() => setSidebarOpen(false)}
//             className="text-gray-300 hover:text-white transition"
//           >
//             <FiX size={24} />
//           </button>
//         </div>

//         {/* Sidebar Links */}
//         <div className="flex flex-col gap-6 mt-6 px-6 text-sm font-medium">
//           <SidebarLink
//             to="/dashboard"
//             label="Home"
//             setSidebarOpen={setSidebarOpen}
//           />
//           <SidebarLink
//             to="/explore"
//             label="Live Streams"
//             setSidebarOpen={setSidebarOpen}
//           />
//           <SidebarLink
//             to="/about"
//             label="About"
//             setSidebarOpen={setSidebarOpen}
//           />

//           {authUser || true ? (
//             <>
//               <button
//                 onClick={() => {
//                   navigate("/profile");
//                   setSidebarOpen(false);
//                 }}
//                 className="flex items-center gap-2 text-gray-300 hover:text-white transition"
//               >
//                 <FaUserAstronaut className="text-[#9147FF]" />
//                 Profile
//               </button>

//               <button
//                 onClick={() => {
//                   logout();
//                   setSidebarOpen(false);
//                 }}
//                 className="flex items-center gap-2 text-gray-300 hover:text-white transition"
//               >
//                 <IoMdLogOut className="text-[#9147FF]" />
//                 Logout
//               </button>
//             </>
//           ) : (
//             <SidebarLink
//               to="/login"
//               label="Log In"
//               setSidebarOpen={setSidebarOpen}
//             />
//           )}
//         </div>
//       </div>

//       {/* ===== Overlay ===== */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
//           onClick={() => setSidebarOpen(false)}
//         ></div>
//       )}
//     </>
//   );
// };

// const NavLink = ({ to, label }) => (
//   <Link to={to} className="text-gray-300 hover:text-white transition">
//     {label}
//   </Link>
// );

// const SidebarLink = ({ to, label, setSidebarOpen }) => (
//   <Link
//     to={to}
//     onClick={() => setSidebarOpen(false)}
//     className="text-gray-300 hover:text-white transition"
//   >
//     {label}
//   </Link>
// );

// export default Navbar;

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FiMenu, FiX } from "react-icons/fi";
// import { useAuthStore } from "../store/useAuthStore";
// import { IoMdLogOut } from "react-icons/io";
// import { FaUserAstronaut } from "react-icons/fa";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const { authUser, isAuthenticate, logout } = useAuthStore();

//   return (
//     <>
//       {/* Navbar */}
//       <nav className="navbar bg-black/50 backdrop-blur-md text-white px-6 py-6 sticky top-0 z-50 shadow-md">
//         {/* Left: Logo */}
//         <div className="flex-1">
//           <Link
//             to="/"
//             className="text-2xl md:text-3xl font-extrabold tracking-wide text-red-500 hover:text-white transition duration-300"
//           >
//             Stream<span className="text-white">AI</span>
//           </Link>
//         </div>

//         {/* Right: Desktop Menu */}
//         <div className="hidden md:flex items-center space-x-8">
//           <NavLink to="/dashboard" label="Home" />
//           <NavLink to="/explore" label="Live Streams" />
//           <NavLink to="/" label="About" />

//           {authUser ? (
//             <>
//               <div
//                 onClick={() => navigate("/profile")}
//                 className="flex gap-1 items-center cursor-pointer"
//               >
//                 <FaUserAstronaut className="text-red-600 size-6" />
//                 Profile
//               </div>
//               <div
//                 onClick={logout}
//                 className="flex gap-1 items-center cursor-pointer"
//               >
//                 <IoMdLogOut className="text-red-600 size-5" />
//                 Logout
//               </div>
//             </>
//           ) : (
//             <Link
//               to="/login"
//               className="text-red-500 hover:border-2 hover:border-red-500 px-4 py-2 rounded-lg font-semibold shadow-md transition duration-300"
//             >
//               Login / Sign-in
//             </Link>
//           )}
//         </div>

//         {/* Mobile Menu Button */}
//         <div className="md:hidden flex items-center">
//           <button
//             onClick={() => setSidebarOpen(true)}
//             className="text-white hover:text-red-500 transition"
//           >
//             <FiMenu size={26} />
//           </button>
//         </div>
//       </nav>

//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 right-0 h-full w-64 bg-black/95 backdrop-blur-lg text-white transform transition-transform duration-300 ease-in-out z-60 ${
//           sidebarOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         <div className="flex justify-between items-center px-6 py-4 border-b border-red-500">
//           <h2 className="text-2xl font-semibold text-red-500">Explore</h2>
//           <button
//             onClick={() => setSidebarOpen(false)}
//             className="text-white hover:text-red-500 transition"
//           >
//             <FiX size={26} />
//           </button>
//         </div>

//         {/* Sidebar Links */}
//         <ul className="flex flex-col space-y-4 mt-6 px-6">
//           <SidebarLink to="/" label="Home" setSidebarOpen={setSidebarOpen} />
//           <SidebarLink
//             to="/stream"
//             label="Streams"
//             setSidebarOpen={setSidebarOpen}
//           />
//           <SidebarLink
//             to="/about"
//             label="About"
//             setSidebarOpen={setSidebarOpen}
//           />
//           <SidebarLink
//             to="/login"
//             label="Login / Sign-in"
//             setSidebarOpen={setSidebarOpen}
//           />
//         </ul>
//       </div>

//       {/* Overlay when Sidebar is open */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-40"
//           onClick={() => setSidebarOpen(false)}
//         ></div>
//       )}
//     </>
//   );
// };

// const NavLink = ({ to, label }) => (
//   <Link
//     to={to}
//     className="hover:text-white text-gray-200 transition font-normal text-lg tracking-wide"
//   >
//     {label}
//   </Link>
// );

// const SidebarLink = ({ to, label, setSidebarOpen }) => (
//   <li>
//     <Link
//       to={to}
//       onClick={() => setSidebarOpen(false)}
//       className="block text-gray-200 text-lg font-medium hover:text-red-500 transition"
//     >
//       {label}
//     </Link>
//   </li>
// );

// export default Navbar;
