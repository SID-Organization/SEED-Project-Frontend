import { BrowserRouter, Routes, Route, json } from "react-router-dom";

import "./App.css";

import Login from "./pages/login";
import Layout from "./Components/Layout";
import HomeDemands from "./pages/requester/home-demands";
import Drafts from "./pages/requester/drafts";
import DemandCardList from "./Components/Demand-card-list";
import CreateDemand from "./pages/requester/create-demand";
import OpenedDemand from "./pages/requester/opened-demand";
import SubHeaderOpenedDemand from "./Components/Sub-header-opened-demand";
import DemandManager from "./pages/business-manager";
import Pautas from "./pages/analista/pautas";
import Proposals from "./pages/analista/proposals";
import Atas from "./pages/analista/atas";
import GenerateAta from "./pages/analista/generate-ata";
import Profile from "./pages/profile";
import Chat from "./pages/requester/chat";
import { useState, useEffect } from "react";

import { Navigate } from "react-router-dom";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") as any) || null
  );

  // if(user === null){
  //   alert("Você não está logado");
  // } else {
  //   alert("Você está logado");
  // }

  useEffect(() => {
    console.log("App component", user);
  }, [user]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={user ? <Layout /> : <Navigate to={"/login"} />}
          >
            <Route path="admin">
              <Route path="minhas-demandas" element={<HomeDemands />} />
              <Route path="rascunhos" element={<Drafts />} />
              <Route path="list" element={<DemandCardList />} />
              <Route path="nova-demanda" element={<CreateDemand />} />
              <Route path="demanda/:id" element={<OpenedDemand />} />
              <Route path="pautas/gerar-ata/:id" element={<GenerateAta />} />
              <Route path="subheader" element={<SubHeaderOpenedDemand />} />
              <Route path="gerenciar-demandas" element={<DemandManager />} />
              <Route path="pautas" element={<Pautas />} />
              <Route path="atas" element={<Atas />} />
              <Route path="propostas" element={<Proposals />} />
              <Route path="perfil" element={<Profile />} />
              <Route path="chat" element={<Chat />} />
            </Route>
          </Route>
          <Route path="*" element={<h1>Error 404 (Page not found)</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
