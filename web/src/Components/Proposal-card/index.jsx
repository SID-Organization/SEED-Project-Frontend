import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// MUI
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { IconButton, Tooltip } from "@mui/material";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";

//Services
import ProposalService from "../../service/Proposal-Service";
// Utils
import CurrencyUtils from "../../utils/Currency-Utils";

//Translation
import TranslationJson from "../../API/Translate/components/proposalCard.json";
import { TranslateContext } from "../../contexts/translate/index.jsx";

export default function ProposalCard(props) {
  const translate = TranslationJson;
  const [language] = useContext(TranslateContext);

  const [isButtonAddClicked, setIsButtonAddClicked] = useState(false);

  const navigate = useNavigate();

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
    width: "65rem",
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

  console.log("PROPS: ", props.getContinueProposal);

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
              <Tooltip title={props.title?.length > 35 && props.title}>
                <p className="font-roboto font-bold">
                  {props.title?.length > 35
                    ? props.proposalId +
                      " - " +
                      props.title.substring(0, 35) +
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
            <p className="font-roboto text-sm font-bold">
              {translate["Demanda de referência"][language]}:{" "}
            </p>
            <Tooltip
              title={
                props.referenceDemand.length + props.title.length > 34 &&
                props.referenceDemand + " - " + props.title
              }
            >
              <span className="font-roboto text-sm font-normal text-gray-500">
                {props.referenceDemand.length + " - " + props.title.length > 34
                  ? (props.referenceDemand + " - " + props.title).substring(
                      0,
                      34
                    ) + "..."
                  : props.referenceDemand + " - " + props.title}
              </span>
            </Tooltip>
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
              <Tooltip title={props.title?.length > 35 && props.title}>
                <p className="font-roboto font-bold">
                  {props.title?.length > 35
                    ? props.proposalId +
                      " - " +
                      props.title.substring(0, 35) +
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
                  props.referenceDemand.length + props.title.length > 34 &&
                  props.referenceDemand + " - " + props.title
                }
              >
                <span className="font-roboto text-sm font-normal text-gray-500">
                  {props.referenceDemand.length + " - " + props.title.length >
                  34
                    ? (props.referenceDemand + " - " + props.title).substring(
                        0,
                        34
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

  return <>{props.largeCard ? largeCard() : smallCard()}</>;
}
