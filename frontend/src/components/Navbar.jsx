import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { IoMdLogOut } from "react-icons/io";
import { FaUserAstronaut } from "react-icons/fa";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { authUser, logout } = useAuthStore();

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className="w-full h-16 bg-[#0E0E10] border-b border-[#26262C] flex items-center justify-between px-6 md:px-10 sticky top-0 z-50">
        {/* ===== Logo ===== */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wide text-[#9147FF] hover:opacity-80 transition"
        >
          Stream<span className="text-white">AI</span>
        </Link>

        {/* ===== Desktop Menu ===== */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <NavLink to="/dashboard" label="Home" />
          <NavLink to="/explore" label="Live Streams" />
          <NavLink to="/about" label="About" />

          {authUser ? (
            <div className="flex items-center gap-6 ml-4">
              <button
                onClick={() => navigate("/profile")}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition"
              >
                <FaUserAstronaut className="text-[#9147FF] text-lg" />
                Profile
              </button>

              <button
                onClick={logout}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition"
              >
                <IoMdLogOut className="text-[#9147FF] text-lg" />
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-[#9147FF] hover:bg-[#772CE8] text-white px-4 py-2 rounded-md text-sm font-semibold transition ml-4"
            >
              Log In
            </Link>
          )}
        </div>

        {/* ===== Mobile Menu Button ===== */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden text-gray-300 hover:text-white transition"
        >
          <FiMenu size={24} />
        </button>
      </nav>

      {/* ================= SIDEBAR ================= */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-[#18181B] border-l border-[#26262C] transform transition-transform duration-300 ease-in-out z-50 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#26262C]">
          <h2 className="text-lg font-semibold text-[#9147FF]">StreamAI</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-300 hover:text-white transition"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Sidebar Links */}
        <div className="flex flex-col gap-6 mt-6 px-6 text-sm font-medium">
          <SidebarLink
            to="/dashboard"
            label="Home"
            setSidebarOpen={setSidebarOpen}
          />
          <SidebarLink
            to="/explore"
            label="Live Streams"
            setSidebarOpen={setSidebarOpen}
          />
          <SidebarLink
            to="/about"
            label="About"
            setSidebarOpen={setSidebarOpen}
          />

          {authUser ? (
            <>
              <button
                onClick={() => {
                  navigate("/profile");
                  setSidebarOpen(false);
                }}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition"
              >
                <FaUserAstronaut className="text-[#9147FF]" />
                Profile
              </button>

              <button
                onClick={() => {
                  logout();
                  setSidebarOpen(false);
                }}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition"
              >
                <IoMdLogOut className="text-[#9147FF]" />
                Logout
              </button>
            </>
          ) : (
            <SidebarLink
              to="/login"
              label="Log In"
              setSidebarOpen={setSidebarOpen}
            />
          )}
        </div>
      </div>

      {/* ===== Overlay ===== */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </>
  );
};

const NavLink = ({ to, label }) => (
  <Link to={to} className="text-gray-300 hover:text-white transition">
    {label}
  </Link>
);

const SidebarLink = ({ to, label, setSidebarOpen }) => (
  <Link
    to={to}
    onClick={() => setSidebarOpen(false)}
    className="text-gray-300 hover:text-white transition"
  >
    {label}
  </Link>
);

export default Navbar;

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
