import { useEffect, useState } from "react";

// MUI
import Modal from "@mui/material/Modal";
import { Box, CircularProgress } from "@mui/material";
import MuiButton from "@mui/material/Button";
import { styled } from "@mui/material/styles";

// Components
import PautasCard from "../../../Components/Pautas-card";
import SubHeaderProposals from "../../../Components/Sub-header-proposals";
import ProposalCard from "../../../Components/Proposal-card";
import CreateNewPauta from "../../../Components/Create-new-pauta";
import NoContent from "../../../Components/No-content";

// Services
import PautaService from "../../../service/Pauta-Service";
import ProposalService from "../../../service/Proposal-Service";

// Utils
import DateUtils from "../../../utils/Date-Utils";
import FontSizeUtils from "../../../utils/FontSize-Utils";
import DemandFilterUtils from "../../../utils/DemandFilter-Utils";

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
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState(DemandFilterUtils.getEmptyFilter());

  const [fonts, setFonts] = useState(FontSizeUtils.getFontSizes());

  useEffect(() => {
    setFonts(FontSizeUtils.getFontSizes());
  }, [FontSizeUtils.getFontControl()]);

  const handleOpenAddToAPautaModal = () => setOpenAddToAPautaModal(true);
  const handleCloseAddToAPautaModal = () => setOpenAddToAPautaModal(false);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([PautaService.getPautas(), ProposalService.getReadyProposals()])
      .then(([pautasData, proposalsData]) => {
        if (Array.isArray(pautasData)) {
          let pautas = pautasData.map((pauta) => ({
            ...pauta,
            dataReuniao: DateUtils.formatDate(pauta.dataReuniao),
          }));
          setPautas(pautas);
        }
        console.warn("PROPOSALS", proposalsData);
        setProposals(proposalsData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <Modal
        open={openAddToAPautaModal}
        onClose={handleCloseAddToAPautaModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={addToAPautaModalStyle}>
          <h1 className="mb-3 text-center text-2xl font-bold text-dark-blue-weg">
            Adicionar à uma pauta
          </h1>
          <div className="flex items-center justify-center">
            <CreateNewPauta />
          </div>
          <div className="mt-5 grid max-h-[31rem] justify-center overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-[#a5a5a5] scrollbar-thumb-rounded-full scrollbar-w-2">
            {pautas.map((pauta) => (
              <PautasCard
                key={pauta.idPauta}
                id={pauta.idPauta}
                PautaName={"ID da pauta " + pauta.idPauta}
                QtyProposals={pauta.qtdPropostas}
                MeetingDate={pauta.dataReuniao}
                MeetingTime={pauta.horaReuniao}
                ResponsibleAnalyst={pauta.analistaResponsavel}
                isInTheModalAddToAPauta={true}
              />
            ))}
          </div>
        </Box>
      </Modal>
      <div className="mb-10">
        <SubHeaderProposals filters={filters} setFilters={setFilters}/>
      </div>
      <div className="flex items-center justify-center">
        {selectProposals.length > 0 && (
          <div className="mb-10">
            <ButtonAddSelected
              variant="contained"
              color="primary"
              size="large"
              onClick={handleOpenAddToAPautaModal}
            >
              Adicionar à pauta (
              {selectProposals.length > 1
                ? selectProposals.length + " propostas"
                : "1 proposta"}
              )
            </ButtonAddSelected>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center justify-center gap-8">
        {isLoading ? (
          <div className="flex h-[71vh] items-center justify-around">
            <CircularProgress />
          </div>
        ) : proposals && proposals.length === 0 ? (
          <div className="flex h-[71vh] items-center justify-around">
            <NoContent isProposal={true}>
              <span style={{ fontSize: fonts.xl }}>Sem propostas!</span>
            </NoContent>
          </div>
        ) : (
          proposals &&
          proposals.map((proposal, i) => (
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
          ))
        )}
      </div>
    </div>
  );
}
