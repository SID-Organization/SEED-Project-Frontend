import react from "react";

import { useState, useEffect } from "react";

import DemandCard from "../../../Components/Demand-card";
import { useParams } from "react-router";

export default function GenerateProposal() {
  const [demand, setDemand] = useState<any>([]);

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
      <div>{/* <DemandCard demand={demand} /> */}</div>
    </div>
  );
}
