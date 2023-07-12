import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// MUI
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { Box, DialogTitle, IconButton, Modal, Tooltip } from "@mui/material";
import MuiButton from "@mui/material/Button";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";

//Services
import ProposalService from "../../service/Proposal-Service";
import DemandService from "../../service/Demand-Service";
import DemandLogService from "../../service/DemandLog-Service";

// Utils
import CurrencyUtils from "../../utils/Currency-Utils";

//Translation
import TranslationJson from "../../API/Translate/components/proposalCard.json";
import { TranslateContext } from "../../contexts/translate/index.jsx";
import EditRounded from "@mui/icons-material/EditRounded";
import UserUtils from "../../utils/User-Utils";

const modalDemandsStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 200,
  backgroundColor: "white",
  borderTop: "5px solid #0075B1",
  boxShadow: 24,
  borderRadius: 4,
  padding: 20,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
};

// Components MUI styles
const SmallCard = styled(MuiCard)({
  width: "24rem",
  height: "12rem",
  backgroundColor: "#FFF",
  borderRadius: "10px",
  border: "1px solid #D9D9D9",
  padding: "10px",
  cursor: "pointer",
  transition: "0.3s",
  boxShadow: "none",

  "&:hover": {
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.123)",
    transform: "translateY(-7px)",
    transition: "transform 0.2s ease-in-out",
  },
});

const LargeCard = styled(MuiCard)({
  width: "63.5rem",
  height: "7rem",
  backgroundColor: "#F0F0F0",
  borderRadius: "10px",
  border: "1px solid #D9D9D9",
  padding: "10px",
  cursor: "pointer",
  transition: "0.3s",
  boxShadow: "none",

  "&:hover": {
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.123)",
    transform: "translateY(-7px)",
    transition: "transform 0.2s ease-in-out",
  },
});

const Button = styled(MuiButton)(({ weight }) => {
  const style = {
    width: "100px",
    height: "40px",
  };

  if (weight == "primary") {
    style.backgroundColor = "#0075B1";
    style.color = "#FFF";
    style.fontWeight = "bold";
    style["&:hover"] = {
      backgroundColor: "#0075B1bb",
    }
  }
  if (weight == "secondary") {
    style.backgroundColor = "#AAA";
    style.color = "#FFF";
    style.fontWeight = "bold";
    style["&:hover"] = {
      backgroundColor: "#AAAB",
    }
  }

  return style;
})


export default function ProposalCard(props) {
  const [isConfirmingReturn, setIsConfirmingReturn] = useState(false);
  const translate = TranslationJson;
  const [language] = useContext(TranslateContext);

  const navigate = useNavigate();

  function openProposalPDF() {
    ProposalService.openProposalPDF(props.proposalId);
  }

  function openProposalType() {
    if (props.getContinueProposal) {
      console.log("GO TO GENERATE PROPOSAL");
      navigate("/propostas/gerar-proposta/" + props.referenceDemand);
    } else {
      console.log("GO TO PROPOSAL");
      navigate("/propostas/" + props.referenceDemand);
    }
  }

  const cutTitleIn = 32;
  const cutReferenceDemandIn = 42;

  function confirmReturnProposalToEdit(e) {
    e.stopPropagation();
    setIsConfirmingReturn(true);
  }
  function returnProposalToEdit() {
    // setIsConfirmingReturn(false);
    DemandService.updateDemandStatus(props.referenceDemand, "PROPOSTA_EM_ELABORACAO").then(
      (response) => {
        if (response.status === 200) {
          DemandLogService.createDemandLog(
            "ELABORACAO_PROPOSTA",
            props.referenceDemand,
            "Retornar",
            UserUtils.getLoggedUserId()
          )
            .then(
              (response) => {
                if ([200, 201].includes(response.status)) {
                  navigate("/propostas/" + props.referenceDemand);
                }
              }
            )
        }
      }
    )
  }

  const smallCard = () => {
    return (
      <SmallCard onClick={openProposalType}>
        <div className="grid items-center gap-2">
          <div className="flex items-center justify-between">
            <div className="mb-4 flex items-center justify-between">
              <BookmarkRoundedIcon
                sx={{
                  color: "#0075B1",
                  fontSize: "2rem",
                }}
              />
              <Tooltip title={props.title?.length > cutTitleIn && props.title}>
                <p className="font-roboto font-bold">
                  {props.title?.length > cutTitleIn
                    ? props.proposalId +
                    " - " +
                    props.title.substring(0, cutTitleIn) +
                    "..."
                    : props.proposalId + " - " + props.title}
                </p>
              </Tooltip>
            </div>
            <div
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
            >
              <IconButton
                onClick={openProposalPDF}
                sx={{
                  width: "100%",
                }}
              >
                <PictureAsPdfOutlinedIcon
                  sx={{
                    color: "#023A67",
                    height: "1.8rem",
                    width: "1.8rem",
                  }}
                />
              </IconButton>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <p className="font-roboto text-sm font-bold">
              {translate["Tempo de execução"][language] ?? "Tempo de execução"}:{" "}
            </p>
            <span className="font-roboto text-sm font-normal text-gray-500">
              {props.executionTime + " " + translate["horas"][language]}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <p className="font-roboto text-sm font-bold">
              {translate["Valor"][language] ?? "Valor"}:{" "}
            </p>
            <span className="font-roboto text-sm font-normal text-gray-500">
              {" "}
              {CurrencyUtils.formatCurrency(props.value) ?? "Indefinido"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div className="flex-[5]">
              <p className="font-roboto text-sm font-bold">
                {translate["Demanda de referência"][language]}:{" "}
              </p>
              <Tooltip
                title={
                  props.title.length > cutReferenceDemandIn &&
                  props.referenceDemand + " - " + props.title
                }
              >
                <span className="font-roboto text-sm font-normal text-gray-500">
                  {props.title.length > cutReferenceDemandIn
                    ? (props.referenceDemand + " - " + props.title).substring(
                      0,
                      cutReferenceDemandIn
                    ) + "..."
                    : props.referenceDemand + " - " + props.title}
                </span>
              </Tooltip>
            </div>
            {!props.getContinueProposal && (
              <div className="flex-1 text-end">
                <Tooltip title={translate["Retornar proposta à edição"]?.[language] ?? "Retornar proposta à edição"}>
                  <IconButton
                    sx={{ color: '#023A67' }}
                    onClick={confirmReturnProposalToEdit}
                  >
                    <EditRounded />
                  </IconButton>
                </Tooltip>
              </div>
            )}
          </div>
          <div>
          </div>
        </div>
      </SmallCard>
    );
  };

  const largeCard = () => {
    return (
      <LargeCard onClick={openProposalType}>
        <div className="grid items-center gap-2">
          <div className="flex items-center justify-between">
            <div className="mb-4 flex items-center justify-between">
              <BookmarkRoundedIcon
                sx={{
                  color: "#0075B1",
                  fontSize: "2rem",
                }}
              />
              <Tooltip title={props.title?.length > cutTitleIn && props.title}>
                <p className="font-roboto font-bold">
                  {props.title?.length > cutTitleIn
                    ? props.proposalId +
                    " - " +
                    props.title.substring(0, cutTitleIn) +
                    "..."
                    : props.proposalId + " - " + props.title}
                </p>
              </Tooltip>
            </div>
            <div
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
            >
              <IconButton
                onClick={openProposalPDF}
                sx={{
                  width: "100%",
                }}
              >
                <PictureAsPdfOutlinedIcon
                  sx={{
                    color: "#023A67",
                    height: "1.8rem",
                    width: "1.8rem",
                  }}
                />
              </IconButton>
            </div>
          </div>
          <div className="flex gap-10">
            <div className="flex items-center gap-1">
              <p className="font-roboto text-sm font-bold">
                {translate["Tempo de execução"][language] ??
                  "Tempo de execução"}
                :{" "}
              </p>
              <span className="font-roboto text-sm font-normal text-gray-500">
                {props.executionTime + " " + translate["horas"][language]}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <p className="font-roboto text-sm font-bold">
                {translate["Valor"][language] ?? "Valor"}:{" "}
              </p>
              <span className="font-roboto text-sm font-normal text-gray-500">
                {" "}
                {CurrencyUtils.formatCurrency(props.value) ?? "Indefinido"}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <p className="font-roboto text-sm font-bold">
                {translate["Demanda de referência"][language]}:{" "}
              </p>
              <Tooltip
                title={
                  props.title.length > cutReferenceDemandIn &&
                  props.referenceDemand + " - " + props.title
                }
              >
                <span className="font-roboto text-sm font-normal text-gray-500">
                  {props.title.length > cutReferenceDemandIn
                    ? (props.referenceDemand + " - " + props.title).substring(
                      0,
                      cutReferenceDemandIn
                    ) + "..."
                    : props.referenceDemand + " - " + props.title}
                </span>
              </Tooltip>
            </div>
          </div>
        </div>
      </LargeCard>
    );
  };

  return <>
    {props.largeCard ? largeCard() : smallCard()}
    <Modal
      open={isConfirmingReturn}
      onClose={() => setIsConfirmingReturn(false)}
    >
      <Box style={modalDemandsStyle}>
        <div className="w-full text-center">
          <DialogTitle style={{ color: '#0075B1' }}>
            <p>{translate["Deseja realmente retornar esta proposta para edição?"]?.[language] ?? "Deseja realmente retornar esta proposta para edição?"}</p>
          </DialogTitle>
        </div>
        <div className="flex justify-around w-full">
          <Button weight="secondary" onClick={() => setIsConfirmingReturn(false)}>Não</Button>
          <Button weight="primary" onClick={returnProposalToEdit}>Sim</Button>
        </div>
      </Box>
    </Modal>

  </>;
}
