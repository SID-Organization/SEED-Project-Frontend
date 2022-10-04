import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";

import Login from "./pages/login";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>
);
