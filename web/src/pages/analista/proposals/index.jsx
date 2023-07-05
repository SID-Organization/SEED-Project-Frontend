import { useContext, useEffect, useState } from "react";

// MUI
import Modal from "@mui/material/Modal";
import { Box, CircularProgress, Grid } from "@mui/material";
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

//Translation
import TranslationJson from "../../../API/Translate/pages/analista/proposalPage.json";
import { TranslateContext } from "../../../contexts/translate/index.jsx";

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
  const translate = TranslationJson;
  const [language] = useContext(TranslateContext);

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

  const returnProposalsCard = () => {
    return (
      <Grid
        container
        gap={3}
        rowGap={2}
        direction="row"
        justify="center"
        alignItems="center"
        alignContent="center"
        style={{ padding: "0 20px" }}
      >
        {proposals &&
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
          ))}
      </Grid>
    );
  };

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
            {translate["Adicionar à uma pauta"]?.[language] ??
              "Adicionar à uma pauta"}
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
        <SubHeaderProposals filters={filters} setFilters={setFilters} />
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
              {translate["Adicionar à pauta"]?.[language] ??
                "Adicionar à pauta"}{" "}
              (
              {selectProposals.length > 1
                ? selectProposals.length + " propostas"
                : translate["1 proposta"]?.[language]}
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
              <span style={{ fontSize: fonts.xl }}>
                {translate["Sem propostas!"]?.[language] ?? "Sem propostas!"}
              </span>
            </NoContent>
          </div>
        ) : (
          returnProposalsCard()
        )}
      </div>
    </div>
  );
}
