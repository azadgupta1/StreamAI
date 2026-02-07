import React, { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Loader } from "lucide-react";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { useAuthStore } from "./store/useAuthStore";
import StreamPlayer from "./pages/StreamPlayer";
import StreamPlayer2 from "./pages/player2";
import ProfilePage from "./pages/ProfilePage";
import toast from "react-hot-toast";
import ExploreLiveStreamPage from "./pages/ExploreLiveStreamPage";

import Dashboard from "./pages/Dashboard";
import StartStream from "./pages/StartStream";
import ViewStream from "./pages/ViewStream";

import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import LoggedInRoute from "./components/LoggedInRoute";

const App = () => {
  const { authUser, isAuthenticate, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    isAuthenticate();
  }, [isAuthenticate]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element = {<SignUp />} /> */}
          {/* <Route path="/login" element = {<Login />} /> */}

          {/* <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> */}
          <Route
            path="/view"
            element={
              <ProtectedRoute>
                <ViewStream />
              </ProtectedRoute>
            }
          />
          <Route
            path="/start"
            element={
              <ProtectedRoute>
                <StartStream />
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<HomePage />} />

          <Route
            path="/register"
            element={
              <LoggedInRoute>
                <RegisterPage />
              </LoggedInRoute>
            }
          />
          <Route
            path="/login"
            element={
              <LoggedInRoute>
                <LoginPage />
              </LoggedInRoute>
            }
          />

          <Route path="/player" element={<StreamPlayer />} />
          <Route path="/player2" element={<StreamPlayer2 />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/explore" element={<ExploreLiveStreamPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
