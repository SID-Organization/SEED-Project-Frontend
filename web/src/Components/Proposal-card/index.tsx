import Box from "@mui/material/Box";
import MuiCard from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";

import MuiVisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import MuiOpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";

import { IconButton, Tooltip } from "@mui/material";

interface ProposalCardProps {
  newPauta?: boolean;
  title: string;
  executionTime: number;
  value: number;
  referenceDemand: string;
}

export default function ProposalCard(props: ProposalCardProps) {
  const VisibilityRoundedIcon = styled(MuiVisibilityRoundedIcon)({
    color: "#707070",
    cursor: "pointer",
    transition: "0.2s",
    fontSize: "1.8rem",

    "&:hover": {
      color: "#00A3FF",
    },
  });

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
            <Tooltip title="Visualizar pauta">
              <IconButton>
                <VisibilityRoundedIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </Card>
    </div>
  );
}
