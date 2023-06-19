import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

// MUI
import MuiCard from "@mui/material/Card";
import PublicIcon from "@mui/icons-material/Public";
import { styled } from "@mui/material/styles";
import MuiIconButton from "@mui/material/IconButton";
import PublicOffIcon from "@mui/icons-material/PublicOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MuiAddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import MuiOpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { IconButton, Tooltip } from "@mui/material";
import MuiVisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import MuiCheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import MuiPlayCircleFilledWhiteRoundedIcon from "@mui/icons-material/PlayCircleFilledWhiteRounded";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";

//Services
import ProposalService from "../../service/Proposal-Service";

//Translation
import TranslationJson from "../../API/Translate/components/proposalCard.json";
import TranslateUtils from "../../utils/Translate-Utils/index.js";
import { TranslateContext } from "../../contexts/translate/index.jsx";

const OpenInNewRoundedIcon = styled(MuiOpenInNewRoundedIcon)({
  color: "#00A3FF",
  cursor: "pointer",
  transition: "0.2s",
  fontSize: "1.2rem",
});

const IconButtonStart = styled(MuiIconButton)({
  backgroundColor: "#0075B1",
  border: "1px solid #0075B1",
  width: "2rem",
  height: "2rem",

  "&:hover": {
    backgroundColor: "#008fd6",
    border: "1px solid #008fd6",
  },
});

const IconButtonDefault = styled(MuiIconButton)({
  backgroundColor: "#0075B1",
  border: "1px solid #0075B1",
  width: "2rem",
  height: "2rem",

  "&:hover": {
    backgroundColor: "#008fd6",
    border: "1px solid #008fd6",
  },
});

const IconButtonClicked = styled(MuiIconButton)({
  backgroundColor: "#FFF",
  border: "1px solid #FFF",
  width: "2rem",
  height: "2rem",

  "&:hover": {
    backgroundColor: "#FFF",
    border: "1px solid #FFF",
  },
});

const PlayCircleFilledWhiteRoundedIcon = styled(
  MuiPlayCircleFilledWhiteRoundedIcon
)({
  color: "#FFF",
  fontSize: "2rem",
});

const AddCircleRoundedIcon = styled(MuiAddCircleRoundedIcon)({
  color: "#FFF",
  fontSize: "2rem",
});

const CheckCircleRoundedIcon = styled(MuiCheckCircleRoundedIcon)({
  color: "#0075B1",
  fontSize: "2rem",
});

const VisibilityRoundedIcon = styled(MuiVisibilityRoundedIcon)({
  color: "#707070",
  fontSize: "1.7rem",
  cursor: "pointer",
  transition: "0.2s",

  "&:hover": {
    color: "#979797",
  },
});

export default function ProposalCard(props) {
  const translate = TranslationJson;
  const [language] = useContext(TranslateContext);

  const [isButtonAddClicked, setIsButtonAddClicked] = useState(false);

  const navigate = useNavigate();

  // Components MUI styles
  const Card = styled(MuiCard)({
    width: props.newPauta ? "100%" : "100%",
    height: props.newPauta ? "6rem" : "none",
    borderRadius: "10px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    border: "1px solid #E5E5E5",
    padding: "10px",
    backgroundColor: "#F0F0F0",
  });

  function handleSelectedProposals() {
    if (!isButtonAddClicked) {
      props.setSelectProposals((prevState) => {
        return [...prevState, props.id];
      });
    } else {
      props.setSelectProposals((prevState) => {
        return prevState.filter((item) => item !== props.id);
      });
    }
    setIsButtonAddClicked(!isButtonAddClicked);
  }

  function openProposalPDF() {
    ProposalService.openProposalPDF(props.proposalId);
  }

  function openProposalDetails() {
    navigate("/propostas/" + props.referenceDemand);
  }

  return (
    <div>
      <Card>
        <div className="flex items-center justify-around gap-16">
          <div
            className={`grid gap-7 font-roboto ${
              !props.newPauta && "w-[48rem]"
            }`}
          >
            <div
              className={`
                ${
                  props.newPauta
                    ? "ml-4 flex items-center justify-between"
                    : "flex items-center justify-around "
                }
              `}
            >
              <div
                className={`
                ${props.newPauta ? "none" : "flex w-[19rem] gap-1"}
                `}
              >
                <Tooltip title={props.title}>
                  <h1
                    className={`${
                      props.newPauta
                        ? "text-base font-bold"
                        : "text-sm font-bold"
                    }`}
                  >
                    {props.title?.length > 25
                      ? props.proposalId +
                        " - " +
                        props.title.substring(0, 25) +
                        "..."
                      : props.proposalId + " - " + props.title}
                  </h1>
                </Tooltip>
                {props.atasCard && (
                  <div className="mr-5 flex items-center">
                    {props.published === "PUBLICADA" ? (
                      <Tooltip
                        title={
                          translate["Proposta publicada"][language] ??
                          "Proposta publicada"
                        }
                      >
                        <PublicIcon
                          sx={{
                            color: "#0075B1",
                          }}
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip
                        title={
                          translate["Proposta não publicada"][language] ??
                          "Proposta não publicada"
                        }
                      >
                        <PublicOffIcon
                          sx={{
                            color: "#0075B1",
                          }}
                        />
                      </Tooltip>
                    )}
                  </div>
                )}
              </div>
              <div className="flex items-center justify-center gap-5">
                <div className="w-[21rem]">
                  <h1
                    className={`
                  ${props.newPauta ? "text-sm font-bold" : "text-sm font-bold"}
                `}
                  >
                    {translate["Tempo de execução"][language] ??
                      "Tempo de execução"}
                    :{" "}
                    <span className="font-normal text-gray-500">
                      {props.executionTime + translate["horas"][language]}
                    </span>
                  </h1>
                </div>
                <div className="flex w-[10rem] items-center justify-center gap-1">
                  <h1
                    className={`
                  ${props.newPauta ? "text-sm font-bold" : "text-sm font-bold"}
                `}
                  >
                    {translate["Valor"][language] ?? "Valor"}:{" "}
                  </h1>
                  <p className="text-sm text-gray-500"> R$ {props.value}</p>
                </div>
                {props.atasCard && (
                  <div className="w-[13rem]">
                    <h1
                      className={`
                  ${props.newPauta ? "text-sm font-bold" : "text-sm font-bold"}
                `}
                    >
                      {translate["Parecer da comissão"][language] ??
                        "Parecer da comissão"}
                      :{" "}
                      <span className="font-normal text-gray-500">
                        {" "}
                        {props.parecerComissao}
                      </span>
                    </h1>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center">
              <h1
                className={`
                ${
                  props.newPauta
                    ? "ml-4 w-[49rem] font-bold"
                    : "text-sm font-bold"
                }
                `}
              >
                {translate["Demanda de referência"][language]}:{" "}
                <Tooltip title={props.referenceDemand + " - " + props.title}>
                  <span
                    className={`
                    ${
                      props.newPauta
                        ? "cursor-default text-sm font-normal text-gray-500"
                        : "cursor-default font-normal text-gray-500"
                    }
                    `}
                  >
                    {props.referenceDemand + " - " + props.title > 70
                      ? (props.referenceDemand + " - " + props.title).substring(
                          0,
                          70
                        ) + "..."
                      : props.referenceDemand + " - " + props.title}
                  </span>
                </Tooltip>
              </h1>
              {props.newPauta && (
                <h1
                  onClick={openProposalDetails}
                  className="flex w-[10rem] cursor-pointer items-center justify-center gap-1 text-sm font-bold text-light-blue-weg
                    hover:underline
                  "
                >
                  {translate["Visualizar Proposta"][language] ??
                    "Visualizar Proposta"}
                  <OpenInNewRoundedIcon />
                </h1>
              )}
            </div>
          </div>
          <div
            className={`
              ${props.newPauta ? "mr-4" : "flex items-center justify-end"}
            `}
          >
            {props.newPauta ? (
              ""
            ) : (
              <Tooltip
                title={
                  translate["Visualizar Proposta"][language] ??
                  "Visualizar Proposta"
                }
                onClick={openProposalPDF}
              >
                {props.newPauta === "card" ? (
                  <VisibilityRoundedIcon />
                ) : (
                  <IconButton>
                    <VisibilityRoundedIcon />
                  </IconButton>
                )}
              </Tooltip>
            )}
            {props.newPauta === "card" && (
              <div className="flex items-center justify-center gap-4">
                {/* <Tooltip title="Iniciar workflow">
                  <IconButtonStart aria-label="delete">
                    <PlayCircleFilledWhiteRoundedIcon />
                  </IconButtonStart>
                </Tooltip> */}
                <Tooltip
                  title={
                    isButtonAddClicked
                      ? translate["Remover Proposta"][language] ??
                        "Remover Proposta"
                      : translate["Selecionar proposta"][language] ??
                        "Selecionar proposta"
                  }
                >
                  {isButtonAddClicked ? (
                    <IconButtonClicked onClick={handleSelectedProposals}>
                      <CheckCircleRoundedIcon />
                    </IconButtonClicked>
                  ) : (
                    <IconButtonDefault onClick={handleSelectedProposals}>
                      <AddCircleRoundedIcon />
                    </IconButtonDefault>
                  )}
                </Tooltip>
                <Tooltip
                  title={
                    translate["Visualizar PDF da proposta"][language] ??
                    "Visualizar PDF da proposta"
                  }
                >
                  <IconButton onClick={openProposalPDF}>
                    <PictureAsPdfOutlinedIcon
                      sx={{
                        color: "#0075B1",
                        height: "1.8rem",
                        width: "1.8rem",
                      }}
                    />
                  </IconButton>
                </Tooltip>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
