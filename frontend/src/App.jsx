import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Loader } from "lucide-react";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { useAuthStore } from "./store/useAuthStore";
import StreamPlayer from "./pages/StreamPlayer";
import ProfilePage from "./pages/ProfilePage";
import toast from "react-hot-toast";
import ExploreLiveStreamPage from "./pages/ExploreLiveStreamPage";

import Dashboard from './pages/Dashboard';
import StartStream from './pages/StartStream';
import ViewStream from './pages/ViewStream';

import SignUp from './pages/SignUp';

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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/view" element={<ViewStream />} />
          <Route path="/start" element={<StartStream />} />

          <Route path="/" element = {<SignUp/>} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

