import Box from "@mui/material/Box";
import MuiCard from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";

import MuiVisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { IconButton, Tooltip } from "@mui/material";

export default function ProposalCard() {
  const VisibilityRoundedIcon = styled(MuiVisibilityRoundedIcon)({
    color: "#707070",
    cursor: "pointer",
    transition: "0.2s",
    fontSize: "1.8rem",

    "&:hover": {
      color: "#00A3FF",
    },
  });

  const Card = styled(MuiCard)({
    width: "100%",
    height: "100%",
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
            <div className="flex items-center justify-around">
              <div className="mr-80">
                <h1 className="font-bold">Proposta 0001</h1>
              </div>
              <div className="flex justify-center items-center">
                <h1 className="font-bold">
                  Tempo de execução:{" "}
                  <span className="font-normal text-gray-500">1050 horas</span>
                </h1>
                <h1 className="font-bold ml-10">
                  Valor:{" "}
                  <span className="font-normal text-gray-500"> R$ 20.000</span>
                </h1>
              </div>
            </div>
            <div className="flex items-center">
              <h1 className="font-bold">
                Demanda de referência:{" "}
                <Tooltip title={demandTitle}>
                  <span className="font-normal text-gray-500 cursor-default">
                    {demandTitle.length > 80
                      ? demandTitle.substring(0, 80) + "..."
                      : demandTitle}
                  </span>
                </Tooltip>
              </h1>
            </div>
          </div>
          <div className="flex justify-end items-center">
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
