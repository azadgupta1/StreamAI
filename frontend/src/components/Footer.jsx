import React from "react";
import { Link } from "react-router-dom";
import { FaYoutube, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0E0E10] border-t border-[#26262C] text-gray-400 pt-14 pb-8 px-6 md:px-12 lg:px-20">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Logo & Description */}
        <div className="text-center md:text-left">
          <Link
            to="/"
            className="text-3xl font-extrabold text-[#9147FF] hover:opacity-80 transition"
          >
            Stream<span className="text-white">AI</span>
          </Link>

          <p className="mt-4 text-sm leading-relaxed max-w-sm mx-auto md:mx-0">
            Stream smarter, faster, and cleaner with AI-powered features —
            redefining live entertainment with intelligent streaming.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center md:text-left">
          <h3 className="text-white font-semibold mb-5 uppercase tracking-wide text-sm">
            Quick Links
          </h3>

          <ul className="space-y-3 text-sm">
            <li>
              <Link
                to="/"
                className="hover:text-[#9147FF] transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/explore"
                className="hover:text-[#9147FF] transition duration-300"
              >
                Explore
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-[#9147FF] transition duration-300"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="hover:text-[#9147FF] transition duration-300"
              >
                Log In
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="text-center md:text-left">
          <h3 className="text-white font-semibold mb-5 uppercase tracking-wide text-sm">
            Connect
          </h3>

          <div className="flex justify-center md:justify-start gap-6">
            {[FaYoutube, FaInstagram, FaTwitter, FaGithub].map(
              (Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-[#9147FF] 
                             transition duration-300 
                             transform hover:-translate-y-1 hover:scale-110"
                >
                  <Icon size={20} />
                </a>
              ),
            )}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#26262C] my-8"></div>

      {/* Bottom Section */}
      <div className="text-center text-xs text-gray-500">
        © {new Date().getFullYear()}{" "}
        <span className="text-[#9147FF] font-semibold">StreamAI</span>. All
        rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

// import React from "react";
// import { Link } from "react-router-dom";
// import { FaYoutube, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

// const Footer = () => {
//   return (
//     <footer className="bg-black/80 border-t border-gray-800 text-gray-300 pt-10 pb-6 px-6 md:px-16">
//       {/* Top Section */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start text-center md:text-left">
//         {/* Logo and Tagline */}
//         <div>
//           <Link
//             to="/"
//             className="text-3xl font-extrabold text-red-500 tracking-wide hover:text-white transition duration-300"
//           >
//             Stream<span className="text-white">AI</span>
//           </Link>
//           <p className="mt-3 text-gray-400 text-sm leading-relaxed">
//             Stream smarter, faster, and cleaner with AI-powered features —
//             bringing the next evolution in live entertainment.
//           </p>
//         </div>

//         {/* Quick Links */}
//         <div>
//           <h2 className="text-lg font-semibold text-white mb-4 uppercase tracking-wide">
//             Quick Links
//           </h2>
//           <ul className="space-y-2">
//             <li>
//               <Link to="/" className="hover:text-red-500 transition">
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link to="/stream" className="hover:text-red-500 transition">
//                 Streams
//               </Link>
//             </li>
//             <li>
//               <Link to="/about" className="hover:text-red-500 transition">
//                 About
//               </Link>
//             </li>
//             <li>
//               <Link to="/login" className="hover:text-red-500 transition">
//                 Login / Sign-in
//               </Link>
//             </li>
//           </ul>
//         </div>

//         {/* Social Media */}
//         <div>
//           <h2 className="text-lg font-semibold text-white mb-4 uppercase tracking-wide">
//             Connect with Us
//           </h2>
//           <div className="flex justify-center md:justify-start space-x-5">
//             <a
//               href="#"
//               className="text-gray-400 hover:text-red-500 transition"
//               aria-label="YouTube"
//             >
//               <FaYoutube size={22} />
//             </a>
//             <a
//               href="#"
//               className="text-gray-400 hover:text-red-500 transition"
//               aria-label="Instagram"
//             >
//               <FaInstagram size={22} />
//             </a>
//             <a
//               href="#"
//               className="text-gray-400 hover:text-red-500 transition"
//               aria-label="Twitter"
//             >
//               <FaTwitter size={22} />
//             </a>
//             <a
//               href="#"
//               className="text-gray-400 hover:text-red-500 transition"
//               aria-label="GitHub"
//             >
//               <FaGithub size={22} />
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Divider */}
//       <div className="border-t border-gray-800 my-6"></div>

//       {/* Bottom Section */}
//       <div className="text-center text-sm text-gray-500">
//         © {new Date().getFullYear()}{" "}
//         <span className="text-red-500 font-semibold">StreamAI</span> — All
//         rights reserved.
//       </div>
//     </footer>
//   );
// };

// export default Footer;
