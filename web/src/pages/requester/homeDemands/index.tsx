import SubHeader from "../../../Components/SubHeader";
import DemandCard from "../../../Components/DemandCard";
import Grid from "@mui/material/Grid";
import DemandList from "../../../Components/DemandCardList";

import "../../../styles/index.css";
import { useState } from "react";

export default function homeDemands() {
  const [isListFormat, setIsListFormat] = useState(false);

  function getDemandsList() {
    return (
      <div className="flex justify-center items-center">
        <DemandList />
      </div>
    );
  }

  function getDemandsGrid() {
    return (
      <div className="flex flex-wrap justify-around">
        <DemandCard status="Cancelado" />
        <DemandCard status="Cancelado" />
        <DemandCard status="Cancelado" />
        <DemandCard status="Cancelado" />
        <DemandCard status="Cancelado" />
        <DemandCard status="Cancelado" />
        <DemandCard status="Cancelado" />
        <DemandCard status="Cancelado" />
        <DemandCard status="Cancelado" />
      </div>
    );
  }

  return (
    <div>
      <div>
        <SubHeader
          setIsListFormat={setIsListFormat}
          isListFormat={isListFormat}
        >
          Minhas demandas
        </SubHeader>
      </div>
      <div>{isListFormat ? getDemandsList() : getDemandsGrid()}</div>
    </div>
  );
}
