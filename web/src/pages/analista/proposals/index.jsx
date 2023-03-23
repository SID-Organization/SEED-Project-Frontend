import { useEffect, useState } from "react";

// MUI
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import MuiButton from "@mui/material/Button";
import { styled } from "@mui/material/styles";

// Components
import PautasCard from "../../../Components/Pautas-card";
import SubHeaderProposals from "../../../Components/Sub-header-proposals";
import ProposalCard from "../../../Components/Proposal-card";
import CreateNewPauta from "../../../Components/Create-new-pauta";

// Services
import PautaService from "../../../service/Pauta-Service";
import ProposalService from "../../../service/Proposal-Service";

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
  const [proposals, setProposals] = useState([]);
  const [pautas, setPautas] = useState([]);
  const [selectProposals, setSelectProposals] = useState([]);
  const [openAddToAPautaModal, setOpenAddToAPautaModal] = useState(false);

  const handleOpenAddToAPautaModal = () => setOpenAddToAPautaModal(true);
  const handleCloseAddToAPautaModal = () => setOpenAddToAPautaModal(false);

  useEffect(() => {
    PautaService.getPautas().then((data) => {
      console.log("Pautas", data)
      let pautas = data.map((pauta) => ({
        ...pauta,
        dataReuniao: pauta.dataReuniao
          .split("T")[0]
          .split("-")
          .reverse()
          .join("/"),
      }));
      setPautas(pautas);
    });

    ProposalService.getReadyProposals().then((readyProposal) => {
      console.log("Ready proposals", readyProposal)
      setProposals(readyProposal);
    });
  }, []);

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
    },
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
            mb-3
            text-center
            text-2xl
            font-bold
            text-dark-blue-weg
            
          "
          >
            Adicionar à uma pauta
          </h1>
          <div className="flex items-center justify-center">
            <CreateNewPauta />
          </div>
          <div
            className="
            scrollbar-w-2 mt-5
            grid
            max-h-[31rem]
            justify-center
            overflow-x-hidden
            overflow-y-scroll
              scrollbar-thin scrollbar-thumb-[#a5a5a5] scrollbar-thumb-rounded-full
          "
          >
            {pautas.map((pauta) => (
              <PautasCard
                id={pauta.idPauta}
                PautaName={"ID da pauta " + pauta.idPauta}
                QtyProposals={pauta.qtdPropostas}
                MeetingDate={pauta.dataReuniao}
                MeetingTime={pauta.horaReuniao}
                ResponsibleAnalyst={
                  pauta.analistaResponsavel
                }
                isInTheModalAddToAPauta={true}
              />
            ))}
          </div>
        </Box>
      </Modal>
      <div className="mb-10">
        <SubHeaderProposals />
      </div>
      <div className="flex items-center justify-center">
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
      <div className=" flex flex-col items-center justify-center gap-8" >
        {proposals.length > 0 && proposals.map((proposal, i) => (
          <ProposalCard
            key={i}
            proposalId={proposal.idProposta}
            newPauta={"card"}
            title={proposal.demandaPropostaTitulo}
            executionTime={proposal.tempoDeExecucaoDemanda}
            value={proposal.valorDemanda}
            referenceDemand={proposal.idDemanda}
            setSelectProposals={setSelectProposals}
          />
        ))}
      </div>
    </div>
  );
}


/**
 * executionTime
: 
undefined
id
: 
undefined
newPauta
: 
undefined
referenceDemand
: 
undefined
setSelectProposals
: 
ƒ ()
title
: 
undefined
value
: 
undefined
*/