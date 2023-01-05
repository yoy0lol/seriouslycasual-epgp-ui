import { HelmetProvider, Helmet } from "react-helmet-async";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <Helmet></Helmet>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </HelmetProvider>
);
