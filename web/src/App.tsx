import { useState } from "react";
import reactLogo from "./assets/react.svg";

import {BrowserRouter, Routes, Route} from "react-router-dom";

import "./App.css";

import Login from "./pages/login";
import Sidebar from "./Components/Sidebar";
import Layout from "./Components/Layout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
            
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
