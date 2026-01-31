import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Loader } from "lucide-react";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { useAuthStore } from "./store/useAuthStore";
import StreamPlayer from "./pages/StreamPlayer";
import toast from "react-hot-toast";

import Dashboard from './pages/Dashboard';
import StartStream from './pages/StartStream';
import ViewStream from './pages/ViewStream';

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
          <Route path="/" element={<Dashboard />} />
          <Route path="/view" element={<ViewStream />} />
          <Route path="/start" element={<StartStream />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;














          {/* <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route 
            path="/player"
            element= {<StreamPlayer/>}
          />
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!authUser ? <RegisterPage /> : <Navigate to="/" />}
          /> */}
          {/* <Route path="/stream/:id" element={<Stream />} /> */}
          {/* <Route path="/profile" element={<Profile />} /> */}
          {/* <Route path="/about" element={<About />} /> */}
          {/* <Route path="/landing" element={<Landing />} /> */}