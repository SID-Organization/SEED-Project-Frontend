import { useState } from "react";
import reactLogo from "./assets/react.svg";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import Login from "./pages/login";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import NoDemands from "./pages/noDemands";
import HomeDemands from "./pages/requester/homeDemands";

function App() {
  return (
    <>
      <Sidebar />
      <BrowserRouter>
        <Routes>
          <Route></Route>
        </Routes>
      </BrowserRouter>
      <HomeDemands />
    </>
  );
}

export default App;
