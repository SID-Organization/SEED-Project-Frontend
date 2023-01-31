import react from "react";

import { useState, useEffect } from "react";

import DemandCard from "../../../Components/Demand-card";

export default function GenerateProposal() {
  const [demand, setDemand] = useState<any>([]);

  useEffect(() => {
    getDemandFromDatabase().then((demand) => {
      setDemand(demand);
    });
  }, []);

  async function getDemandFromDatabase() {
    const response = await fetch("http://localhost:8080/sid/api/demanda/id/1");
    const demand = await response.json();
    console.log("AAAAAAA:", demand);
    return demand;
  }

  return (
    <div>
      <div>working gp</div>
    </div>
  );
}
