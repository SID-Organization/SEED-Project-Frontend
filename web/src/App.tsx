import { useState } from "react";
import reactLogo from "./assets/react.svg";

import "./App.css";

import Login from "./pages/login";
import Header from "./Components/Header";
import NoDemands from "./pages/noDemands";
import MyDemands from "./pages/requester/myDemands";

function App() {
  return (
    <>
      <MyDemands />
    </>
  );
}

export default App;
