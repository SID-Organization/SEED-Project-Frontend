import { BrowserRouter, Routes, Route } from "react-router-dom";

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
import Profile from "./pages/profile";
import Chat from "./pages/requester/chat";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route path="admin">
              <Route path="minhas-demandas" element={<HomeDemands />} />
              <Route path="rascunhos" element={<Drafts />} />
              <Route path="list" element={<DemandCardList />} />
              <Route path="nova-demanda" element={<CreateDemand />} />
              <Route path="demanda-aberta" element={<OpenedDemand />} />
              <Route path="subheader" element={<SubHeaderOpenedDemand />} />
              <Route path="gerenciar-demandas" element={<DemandManager />} />
              <Route path="pautas" element={<Pautas />} />
              <Route path="propostas" element={<Proposals />} />
              <Route path="perfil" element={<Profile />} />
              <Route path="chat" element={<Chat />} />
            </Route>
            <Route path="*" element={<h1>Error 404 (Page not found)</h1>} />
          </Route>
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
