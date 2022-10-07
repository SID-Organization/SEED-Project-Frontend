import { useState } from "react";
import reactLogo from "./assets/react.svg";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import Login from "./pages/login";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import NoDemands from "./pages/noDemands";
import HomeDemands from "./pages/requester/homeDemands";
import Drafts from "./pages/requester/drafts";

function App() {
  return (
    <>
      <Sidebar />
      <BrowserRouter>
        <Routes>
          <Route></Route>
        </Routes>
      </BrowserRouter>
      <Drafts />
    </>
  );
}

export default App;
