import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Loader } from "lucide-react";

export default function ProtectedRoute({ children }) {
  const { authUser, isAuthenticate, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    isAuthenticate();
  }, [isAuthenticate]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="bg-[#0e0e0e] flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  if (!authUser) {
    return <Navigate to="/" state={{ openAuth: true }} replace />;
  }

  return children;
}

// import React, { useEffect } from "react";
// import { Navigate } from "react-router-dom";
// import { useAuthStore } from "../store/useAuthStore";
// import { Loader } from "lucide-react";

// export default function ProtectedRoute({ children }) {
//   const { authUser, isAuthenticate, isCheckingAuth } = useAuthStore();

//   useEffect(() => {
//     isAuthenticate();
//   }, [isAuthenticate]);

//   if (isCheckingAuth && !authUser) {
//     return (
//       <div className="bg-[#0e0e0e] flex items-center justify-center h-screen">
//         <Loader className="size-10 animate-spin" />
//       </div>
//     );
//   }

//   if (!authUser) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// }

// import React, { useEffect } from "react";
// import { Navigate } from "react-router-dom";
// import { useAuthStore } from "../store/useAuthStore";
// import { Loader } from "lucide-react";

// export default function ProtectedRoute({ children }) {
//   const { authUser, isAuthenticate, isCheckingAuth } = useAuthStore();

//   useEffect(() => {
//     isAuthenticate();
//   }, []);

//   if (isCheckingAuth && !authUser) {
//     return (
//       <div className="bg-[#0e0e0e] flex items-center justify-center h-screen">
//         <Loader className="size-10 animate-spin" />
//       </div>
//     );
//   }

//   if (!authUser) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// }
