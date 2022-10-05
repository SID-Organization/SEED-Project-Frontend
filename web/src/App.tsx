import { useState } from "react";
import reactLogo from "./assets/react.svg";

import {BrowserRouter, Routes, Route} from "react-router-dom";

import "./App.css";

import Login from "./pages/login";
import Sidebar from "./Components/Sidebar";

function App() {
  return (
    <>
      <Sidebar />
      <BrowserRouter>
        <Routes>
          <Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
