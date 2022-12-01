import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";

import MuiOpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import MuiPlayCircleFilledWhiteRoundedIcon from "@mui/icons-material/PlayCircleFilledWhiteRounded";
import MuiAddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import MuiCheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import MuiVisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { Tooltip } from "@mui/material";

import MuiIconButton from "@mui/material/IconButton";

import { useState } from "react";
import { PropaneSharp } from "@mui/icons-material";

interface ProposalCardProps {
  id: number;
  newPauta?: boolean | string;
  title: string;
  executionTime: number;
  value: number;
  referenceDemand: string;
  setSelectProposals: (value: any) => void;
}

export default function ProposalCard(props: ProposalCardProps) {
  const [isButtonAddClicked, setIsButtonAddClicked] = useState(false);

  const OpenInNewRoundedIcon = styled(MuiOpenInNewRoundedIcon)({
    color: "#00A3FF",
    cursor: "pointer",
    transition: "0.2s",
    fontSize: "1.2rem",
  });

  const Card = styled(MuiCard)({
    width: props.newPauta ? "100%" : "100%",
    height: props.newPauta ? "6rem" : "none",
    borderRadius: "10px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    border: "1px solid #E5E5E5",
    padding: "10px",
    backgroundColor: "#F0F0F0",
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

  const demandTitle =
    "10000 - Automatização do processo de criação e desenvolvimento de demandas";

  function handleSelectedProposals() {
    if (!isButtonAddClicked) {
      props.setSelectProposals((prevState: any) => {
        return [...prevState, props.id];
      });
    } else {
      props.setSelectProposals((prevState: any) => {
        return prevState.filter((item: any) => item !== props.id);
      });
    }
    setIsButtonAddClicked(!isButtonAddClicked);
  }

  return (
    <div>
      <Card>
        <div className="flex justify-center items-center gap-16">
          <div className="grid font-roboto gap-7 ">
            <div
              className={`
                ${
                  props.newPauta
                    ? "flex items-center justify-between ml-4"
                    : "flex items-center justify-around"
                }
              `}
            >
              <div
                className={`
                ${props.newPauta ? "none" : "mr-80"}
                `}
              >
                <h1
                  className={`${
                    props.newPauta ? "text-base font-bold" : "font-bold"
                  }`}
                >
                  {props.title}
                </h1>
              </div>
              <div className="flex justify-center items-center gap-5">
                <h1
                  className={`
                  ${props.newPauta ? "text-sm font-bold" : "font-bold"}
                `}
                >
                  Tempo de execução:{" "}
                  <span className="font-normal text-gray-500">
                    {props.executionTime} horas
                  </span>
                </h1>
                <h1
                  className={`
                  ${props.newPauta ? "text-sm font-bold" : "font-bold"}
                `}
                >
                  Valor:{" "}
                  <span className="font-normal text-gray-500">
                    {" "}
                    R$ {props.value}
                  </span>
                </h1>
              </div>
            </div>
            <div className="flex items-center">
              <h1
                className={`
                ${props.newPauta ? "font-bold w-[49rem] ml-4" : "font-bold"}
                `}
              >
                Demanda de referência:{" "}
                <Tooltip title={demandTitle}>
                  <span
                    className={`
                    ${
                      props.newPauta
                        ? "font-normal text-sm text-gray-500 cursor-default"
                        : "font-normal text-gray-500 cursor-default"
                    }
                    `}
                  >
                    {demandTitle.length > 80
                      ? demandTitle.substring(0, 80) + "..."
                      : demandTitle}
                  </span>
                </Tooltip>
              </h1>
              {props.newPauta && (
                <h1
                  className="text-sm w-[10rem] flex justify-center items-center cursor-pointer gap-1 font-bold text-light-blue-weg
                    hover:underline
                  "
                >
                  Link para a proposta
                  <OpenInNewRoundedIcon />
                </h1>
              )}
            </div>
          </div>
          <div
            className={`
              ${props.newPauta ? "mr-4" : "flex justify-end items-center"}
            `}
          >
            {props.newPauta ? (
              ""
            ) : (
              <Tooltip title="Visualizar proposta">
                <VisibilityRoundedIcon />
              </Tooltip>
            )}
            {props.newPauta === "card" && (
              <div className="flex gap-4">
                <Tooltip title="Iniciar workflow">
                  <IconButtonStart aria-label="delete">
                    <PlayCircleFilledWhiteRoundedIcon />
                  </IconButtonStart>
                </Tooltip>
                <Tooltip
                  title={
                    isButtonAddClicked
                      ? "Remover proposta"
                      : "Selecionar proposta"
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
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
