import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";

import App from "./App";
import { AuthProvider } from "./context/AuthContext";

import { registerSW } from "virtual:pwa-register";

import "./index.css";
import "./styles/globals.css";
import "./styles/variables.css";
import "./styles/animations.css";

registerSW({
  immediate: true,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <App />

        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            style: {
              background: "#18181b",
              color: "#fff",
              border: "1px solid #3f3f46",
            },
          }}
        />
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);