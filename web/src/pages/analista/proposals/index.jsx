import { useEffect, useState } from "react";
import ProposalCard from "../../../Components/Proposal-card";
import PautasCard from "../../../Components/Pautas-card";

import SubHeaderProposals from "../../../Components/Sub-header-proposals";

import Modal from "@mui/material/Modal";

import { styled } from "@mui/material/styles";
import MuiButton from "@mui/material/Button";
import { Box } from "@mui/material";
import CreateNewPauta from "../../../Components/Create-new-pauta";

const proposalsMock = [
  {
    id: 1,
    newPauta: "card",
    title: "Automatização do processo",
    executionTime: 10.0,
    value: 10.0,
    referenceDemand: "Demanda 2",
  },
  {
    id: 2,
    newPauta: "card",
    title: "Automatização do processo",
    executionTime: 10.0,
    value: 10.0,
    referenceDemand: "Demanda 2",
  },
  {
    id: 3,
    newPauta: "card",
    title: "Automatização do processo",
    executionTime: 10.0,
    value: 10.0,
    referenceDemand: "Demanda 2",
  },
  {
    id: 4,
    newPauta: "card",
    title: "Automatização do processo",
    executionTime: 10.0,
    value: 10.0,
    referenceDemand: "Demanda 2",
  },
];

const addToAPautaModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 750,
  height: 650,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const ButtonAddSelected = styled(MuiButton)({
  backgroundColor: "#FFF",
  color: "#0075B1",
  fontWeight: "bold",
  border: "#0075B1 solid 1px",
  fontSize: "0.89rem",
  width: 350,

  "&:hover": {
    backgroundColor: "#f3f3f3",
  },
});

export default function Proposals() {
  const [selectProposals, setSelectProposals] = useState([]);
  const [pautas, setPautas] = useState([]);
  const [openAddToAPautaModal, setOpenAddToAPautaModal] = useState(false);

  const handleOpenAddToAPautaModal = () => setOpenAddToAPautaModal(true);
  const handleCloseAddToAPautaModal = () => setOpenAddToAPautaModal(false);

  useEffect(() => {
    fetch("http://localhost:8080/sid/api/pauta")
      .then((response) => response.json())
      .then((data) => {
        let pautas = data.map(pauta => (
          {
            ...pauta,
            dataReuniaoPauta: pauta.dataReuniaoPauta.split("T")[0].split("-").reverse().join("/"),
          }

        ))
        setPautas(pautas);
      });
  }, [])



  const pautasMock = [
    {
      id: 1,
      PautaName: "Pauta 1",
      QtyProposals: 2,
      MeetingDate: "10/10/2021",
      MeetingTime: "10:00",
      ResponsibleAnalyst: "Analista 1",
      isInTheModalAddToAPauta: true,
    },
    {
      id: 2,
      PautaName: "Pauta 1",
      QtyProposals: 2,
      MeetingDate: "10/10/2021",
      MeetingTime: "10:00",
      ResponsibleAnalyst: "Analista 1",
      isInTheModalAddToAPauta: true,
    },
    {
      id: 3,
      PautaName: "Pauta 1",
      QtyProposals: 2,
      MeetingDate: "10/10/2021",
      MeetingTime: "10:00",
      ResponsibleAnalyst: "Analista 1",
      isInTheModalAddToAPauta: true,
    },
    {
      id: 4,
      PautaName: "Pauta 1",
      QtyProposals: 2,
      MeetingDate: "10/10/2021",
      MeetingTime: "10:00",
      ResponsibleAnalyst: "Analista 1",
      isInTheModalAddToAPauta: true,
    },
    {
      id: 5,
      PautaName: "Pauta 1",
      QtyProposals: 2,
      MeetingDate: "10/10/2021",
      MeetingTime: "10:00",
      ResponsibleAnalyst: "Analista 1",
      isInTheModalAddToAPauta: true,
    }
  ];

  return (
    <div>
      <Modal
        open={openAddToAPautaModal}
        onClose={handleCloseAddToAPautaModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={addToAPautaModalStyle}>
          <h1
            className="
            text-center
            text-2xl
            font-bold
            mb-3
            text-dark-blue-weg
            
          "
          >
            Adicionar à uma pauta
          </h1>
          <div className="flex justify-center items-center">
            <CreateNewPauta />
          </div>
          <div
            className="
            grid justify-center
            mt-5
            overflow-y-scroll
            max-h-[31rem]
            overflow-x-hidden
            scrollbar-thumb-[#a5a5a5]
              scrollbar-thumb-rounded-full scrollbar-w-2 scrollbar-thin
          "
          >
            {pautas.map((pauta) => (
              <PautasCard
                id={pauta.idPauta}
                PautaName={"ID da pauta " + pauta.idPauta}
                QtyProposals={pauta.propostasPauta.length}
                MeetingDate={pauta.dataReuniaoPauta}
                MeetingTime={pauta.horarioInicioPauta}
                ResponsibleAnalyst={pauta.forumPauta.analistaResponsavelForum.nomeUsuario}
                isInTheModalAddToAPauta={true}
              />
            ))}
          </div>
        </Box>
      </Modal>
      <div className="mb-10">
        <SubHeaderProposals />
      </div>
      <div className="flex justify-center items-center">
        {
          <div>
            {selectProposals.length > 0 && (
              <div className="mb-10">
                <ButtonAddSelected
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleOpenAddToAPautaModal}
                >
                  Adicionar à pauta {"(" + selectProposals.length + ")"}{" "}
                  {selectProposals.length > 1 ? "propostas" : "proposta"}
                </ButtonAddSelected>
              </div>
            )}
          </div>
        }
      </div>
      <div
        className="
        flex
        justify-center
        items-center
        flex-col
        gap-8
        "
      >
        {proposalsMock.map((proposal, i) => (
          <ProposalCard
            key={i}
            id={proposal.id}
            newPauta={proposal.newPauta}
            title={proposal.title}
            executionTime={proposal.executionTime}
            value={proposal.value}
            referenceDemand={proposal.referenceDemand}
            setSelectProposals={setSelectProposals}
          />
        ))}
      </div>
    </div>
  );
}
