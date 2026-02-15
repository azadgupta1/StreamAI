import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <Toaster
      toastOptions={{
        duration: 4000,
        style: {
          background: "#0E0E10",
          color: "#fff",
          border: "1px solid #53FC18",
          borderRadius: "25px",
          padding: "10px",
          paddingLeft: "20px",
          paddingRight: "20px",
        },
        success: {
          style: {
            color: "#53FC18",
          },
        },
        error: {
          style: {
            color: "#ef4444",
          },
        },
      }}
    />
  </StrictMode>,
);
// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";
// import { Toaster } from "react-hot-toast";

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <App />
//     <Toaster
//       toastOptions={{
//         duration: 4000,
//         style: {
//           background: "#000",
//           color: "#fff",
//           border: "1px solid #0e0e0e",
//           borderRadius: "25px",
//           padding: "10px",
//         },
//         success: {
//           style: {
//             background: "#9147ff",
//             color: "#fff",
//           },
//         },
//         error: {
//           style: {
//             background: "#ef4444",
//             color: "#fff",
//           },
//         },
//       }}
//     />
//   </StrictMode>,
// );
