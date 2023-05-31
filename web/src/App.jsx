import { useState } from "react";
import { Navigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

// Components
import Atas from "./pages/analista/atas";
import Chat from "./pages/requester/chat";
import Login from "./pages/login";
import Layout from "./Components/Layout";
import Pautas from "./pages/analista/pautas";
import Profile from "./pages/profile";
import Proposals from "./pages/analista/proposals";
import GenerateAta from "./pages/analista/generate-ata";
import CreateDemand from "./pages/requester/create-demand";
import OpenedDemand from "./pages/requester/opened-demand";
import DemandCardList from "./Components/Demand-card-list";
import GenerateProposal from "./pages/analista/generate-proposal";
import ProposalDetails from "./pages/analista/proposal-details";
import SubHeaderOpenedDemand from "./Components/Sub-header-opened-demand";
import DemandType from "./Components/DemandsPage/DemandType-ENUM";
import DemandsPage from "./Components/DemandsPage";

// Utils
import UserUtils from "./utils/User-Utils";

// import DemandsPage from "./Components/DemandsPage";

import VLibras from "@djpfs/react-vlibras/dist/cjs/index.js";

import TextToVoice from "./Components/SpeechSyntesis/index.jsx";

function App() {
  const [user, setUser] = useState(UserUtils.getLoggedUser());

  return (
    <>
      <TextToVoice></TextToVoice>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Navigate to={"/login"} />} />
          <Route
            path="/login"
            element={<Login user={user} setUser={setUser} />}
          />
          <Route
            path="/"
            element={user ? <Layout /> : <Navigate to={"/login"} />}
          >
            <Route
              path="demandas"
              element={
                <DemandsPage key="demandas" DemandType={DemandType.DEMAND} />
              }
            />

            <Route
              path="gerenciar-demandas"
              element={
                <DemandsPage
                  key="gerenciar-demandas"
                  DemandType={DemandType.MANAGER}
                />
              }
            />

            <Route
              path="rascunhos"
              element={
                <DemandsPage key="rascunhos" DemandType={DemandType.DRAFT} />
              }
            />

            <Route path="demandas/:id" element={<OpenedDemand />} />

            <Route path="list" element={<DemandCardList />} />

            <Route
              path="nova-demanda"
              element={<CreateDemand isEditting={false} />}
            />

            <Route
              path="rascunhos/:id"
              element={<CreateDemand isEditting={false} />}
            />

            <Route
              path="editar-demanda/:id"
              element={<CreateDemand isEditting={true} />}
            />

            <Route path="pautas/gerar-ata/:id" element={<GenerateAta />} />

            <Route
              path="/propostas/gerar-proposta/:id"
              element={<GenerateProposal />}
            />

            <Route path="subheader" element={<SubHeaderOpenedDemand />} />

            <Route path="pautas" element={<Pautas />} />

            <Route path="atas" element={<Atas isAtaForDG={false} />} />

            <Route path="atas-dg" element={<Atas isAtaForDG={true} />} />

            <Route
              path="atas/gerar-ata-dg/:id"
              element={<GenerateAta isAtaForDG={true} />}
            />

            <Route path="propostas" element={<Proposals />} />

            <Route
              path="propostas/:idProposta/:idDemanda"
              element={<ProposalDetails />}
            />

            <Route path="perfil" element={<Profile />} />

            <Route path="chat" element={<Chat />} />
          </Route>
          <Route path="*" element={<h1>Error 404 (Page not found)</h1>} />
        </Routes>
      </BrowserRouter>
      <VLibras forceOnload={true} />
    </>
  );
}

export default App;
