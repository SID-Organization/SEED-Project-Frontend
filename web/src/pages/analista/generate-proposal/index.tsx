import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DemandCard from "../../../Components/Demand-card";
import { IconButton, Tooltip } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

export default function GenerateProposal() {
  const [demand, setDemand] = useState<any>();

  let demandId = useParams().id;

  async function getDemandFromDatabase() {
    const response = await fetch(
      `http://localhost:8080/sid/api/demanda/id/${demandId}`
    );
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    getDemandFromDatabase().then((demand) => {
      setDemand(demand);
    });
  }, []);

  return (
    <div>
      <div className="grid justify-center items-center gap-5">
        <h1 className="flex items-center justify-center text-2xl font-roboto mt-5 font-bold text-blue-weg">
          Gerando proposta da demanda:{" "}
        </h1>
        {demand && <DemandCard demand={demand} />}
      </div>
      <div>
        <h1 className="flex items-center justify-start text-xl font-roboto mt-5 font-bold p-5">
          Escopo do projeto
        </h1>
        <h1 className="flex justify-center items-center">
          ** EDITOR DE TEXTO AQUI **
        </h1>
      </div>
      <div>
        <h1 className="flex items-center justify-center text-2xl font-roboto mt-5 font-bold text-blue-weg">
          Tabela de custos:{" "}
        </h1>
        <div className="flex justify-center items-center">
          <Tooltip title="Adicionar tabela">
            <IconButton>
              <AddRoundedIcon
                sx={{
                  color: "#0075B1",
                  fontSize: "2rem",
                }}
              />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
