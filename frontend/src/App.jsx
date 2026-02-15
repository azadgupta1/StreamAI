import React, { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home, Loader } from "lucide-react";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { useAuthStore } from "./store/useAuthStore";
import StreamPlayer from "./pages/StreamPlayer";
import ProfilePage from "./pages/ProfilePage";
import toast from "react-hot-toast";
import ExploreLiveStreamPage from "./pages/ExploreLiveStreamPage";
import CreatorDashboard from "./pages/CreatorDashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import LoggedInRoute from "./components/LoggedInRoute";
import NotFoundRedirect from "./components/NotFoundRedirect";

const App = () => {
  const { authUser } = useAuthStore();
  useEffect(() => {
    if (!localStorage.getItem("hasVisited")) {
      toast.success("Curating something just for you…");
      localStorage.setItem("hasVisited", true);
    }
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/register"
            element={!authUser ? <RegisterPage /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route path="/player/:id" element={<StreamPlayer />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="/explore" element={<ExploreLiveStreamPage />} />
          {/* <Route path="/dashboard" element={<CreatorDashboard />} /> */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <CreatorDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundRedirect />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

// import React, { useEffect } from "react";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { Loader } from "lucide-react";
// import RegisterPage from "./pages/RegisterPage";
// import LoginPage from "./pages/LoginPage";
// import HomePage from "./pages/HomePage";
// import { useAuthStore } from "./store/useAuthStore";
// import StreamPlayer from "./pages/StreamPlayer";
// import ProfilePage from "./pages/ProfilePage";
// import toast from "react-hot-toast";
// import ExploreLiveStreamPage from "./pages/ExploreLiveStreamPage";
// import CreatorDashboard from "./pages/CreatorDashboard";

// import ProtectedRoute from "./components/ProtectedRoute";
// import LoggedInRoute from "./components/LoggedInRoute";

// const App = () => {
//   // const { authUser, isAuthenticate, isCheckingAuth } = useAuthStore();

//   // useEffect(() => {
//   //   isAuthenticate();
//   // }, [isAuthenticate]);

//   // if (isCheckingAuth && !authUser) {
//   //   return (
//   //     <div className="flex items-center justify-center h-screen">
//   //       <Loader className="size-10 animate-spin" />
//   //     </div>
//   //   );
//   // }

//   const { authUser, isAuthenticate, isCheckingAuth } = useAuthStore();
//   useEffect(() => {
//     if (!localStorage.getItem("hasVisited")) {
//       toast.success("Curating something just for you…");
//       localStorage.setItem("hasVisited", true);
//     }
//   });

//   return (
//     <div>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/register" element={<RegisterPage />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/player/:id" element={<StreamPlayer />} />
//           <Route
//             path="/profile"
//             element={
//               <ProtectedRoute>
//                 <ProfilePage />
//               </ProtectedRoute>
//             }
//           />
//           <Route path="/explore" element={<ExploreLiveStreamPage />} />
//           <Route path="/dashboard" element={<CreatorDashboard />} />
//           {/* <Route path="/dashboard" element={<HomePage />} /> */}
//           {/* <Route
//             path="/creator"
//             element={
//               <ProtectedRoute>
//                 <CreatorDashboard />
//               </ProtectedRoute>
//             }
//           /> */}
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// };

// export default App;
