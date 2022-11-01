import SubHeader from "../../../Components/SubHeader";
import DemandCard from "../../../Components/DemandCard";
import DemandsList from "../../../Components/DemandCardList";
import NoDemands from "../../../Components/noDemands";

import "../../../styles/index.css";
import { useState } from "react";

export default function homeDemands() {
  const [isListFormat, setIsListFormat] = useState(false);

  function getDemandsList() {
    return (
      <div className="flex justify-center items-center">
        <DemandsList />
      </div>
    );
  }

  function getDemandsGrid() {
    return (
      <div className="flex flex-wrap justify-around">
        <DemandCard status="AprovadoPelaComissao" />
        <DemandCard status="Aberto" />
        <DemandCard status="AprovadoPelaComissao" />
        <DemandCard status="Aberto" />
        <DemandCard status="Cancelado" />
        <DemandCard status="AprovadoPelaComissao" />
        <DemandCard status="Cancelado" />
        <DemandCard status="Aberto" />
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
