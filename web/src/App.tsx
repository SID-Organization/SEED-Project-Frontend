import { useState } from "react";
import reactLogo from "./assets/react.svg";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import Login from "./pages/login";
import Layout from "./Components/Layout";
import HomeDemands from "./pages/requester/home-demands";
import Drafts from "./pages/requester/drafts";
import DemandCardList from "./Components/DemandCardList";
import CreateDemand from "./pages/requester/create-demand";
import OpenedDemand from "./pages/requester/opened-demand";
import SubHeaderOpenedDemand from "./Components/SubHeaderOpenedDemand";
import DemandManager from "./pages/business-manager";
import Pautas from "./pages/analista/pautas";
import { Navigate } from "react-router";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route path="minhas-demandas" element={<HomeDemands />} />
            <Route path="rascunhos" element={<Drafts />} />
            <Route path="list" element={<DemandCardList />} />
            <Route path="nova-demanda" element={<CreateDemand />} />
            <Route path="demanda-aberta" element={<OpenedDemand />} />
            <Route path="subheader" element={<SubHeaderOpenedDemand />} />
            <Route path="gerenciar-demandas" element={<DemandManager />} />
            <Route path="pautas" element={<Pautas />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
