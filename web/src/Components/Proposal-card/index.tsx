import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";

import MuiOpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import MuiPlayCircleFilledWhiteRoundedIcon from "@mui/icons-material/PlayCircleFilledWhiteRounded";
import MuiAddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import MuiCheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { Tooltip } from "@mui/material";

import MuiIconButton from "@mui/material/IconButton";

import { useState } from "react";

interface ProposalCardProps {
  newPauta?: boolean | string;
  title: string;
  executionTime: number;
  value: number;
  referenceDemand: string;
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

  const IconButton = styled(MuiIconButton)({
    backgroundColor: "#0075B1",
    border: "1px solid #0075B1",
    width: "2rem",
    height: "2rem",

    "&:hover": {
      backgroundColor: "#008fd6",
      border: "1px solid #008fd6",
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
    color: "#FFF",
    fontSize: "2rem",
  });

  const demandTitle =
    "10000 - Automatização do processo de criação e desenvolvimento de demandas";

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
            {props.newPauta === "card" && (
              <div className="flex gap-4">
                <Tooltip title="Iniciar workflow">
                  <IconButton aria-label="delete">
                    <PlayCircleFilledWhiteRoundedIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Selecionar proposta">
                  <IconButton
                    aria-label="delete"
                    onClick={() => setIsButtonAddClicked(!isButtonAddClicked)}
                  >
                    {isButtonAddClicked ? (
                      <CheckCircleRoundedIcon />
                    ) : (
                      <AddCircleRoundedIcon />
                    )}
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
