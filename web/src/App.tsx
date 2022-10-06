import { useState } from "react";
import reactLogo from "./assets/react.svg";

import "./App.css";

import Login from "./pages/login";
import Header from "./Components/Header";
import NoDemands from "./pages/noDemands";
import HomeDemands from "./pages/requester/homeDemands";

function App() {
  return (
    <>
      <HomeDemands />
    </>
  );
}

export default App;
