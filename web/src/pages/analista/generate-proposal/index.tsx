import react from "react";

import { useState, useEffect } from "react";

import DemandCard from "../../../Components/Demand-card";
import { useParams } from "react-router";
import DemandCardProps from "../../../Interfaces/demand/DemandCardPropsInterface";

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

  useEffect(() => {
    console.log("demand ", demand);
  }, [demand]);

  return (
    <div>
      <div className="grid justify-center items-center gap-5">
        <h1
          className="
          flex items-center justify-center
          text-2xl font-roboto mt-5 font-bold text-blue-weg
        "
        >
          Gerando proposta da demanda:{" "}
        </h1>
        {demand && <DemandCard demand={demand} />}
      </div>
      <div>
        <h1
          className="
          flex items-center justify-start
          text-xl font-roboto mt-5 font-bold p-5
        "
        >
          Escopo do projeto
        </h1>
      </div>
    </div>
  );
}
