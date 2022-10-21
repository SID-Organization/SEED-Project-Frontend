import { useState } from "react";
import reactLogo from "./assets/react.svg";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import Login from "./pages/login";
import Layout from "./Components/Layout";
import HomeDemands from "./pages/requester/homeDemands";
import Drafts from "./pages/requester/drafts";
import DemandCardList from "./Components/DemandCardList";
import CreateDemand from "./pages/requester/createDemand";
import OpenedDemand from "./pages/requester/openedDemand";
import SubHeaderOpenedDemand from "./Components/SubHeaderOpenedDemand";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route path="home" element={<HomeDemands />} />
            <Route path="rascunhos" element={<Drafts />} />
            <Route path="list" element={<DemandCardList />} />
            <Route path="create" element={<CreateDemand />} />
            <Route path="opened" element={<OpenedDemand />} />
            <Route path="subheader" element={<SubHeaderOpenedDemand />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
