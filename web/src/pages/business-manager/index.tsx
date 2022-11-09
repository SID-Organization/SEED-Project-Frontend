import DemandCard from "../../Components/Demand-card";
import DemandCardList from "../../Components/Demand-card-list";
import SubHeader from "../../Components/Sub-header";

import { useState } from "react";

import "../../styles/index.css";

export default function DemandManager() {
  const [isListFormat, setIsListFormat] = useState(false);

  return (
    <div>
      <SubHeader setIsListFormat={setIsListFormat} isListFormat={isListFormat}>
        Gerenciar demandas
      </SubHeader>
      {isListFormat ? (
        <DemandCardList />
      ) : (
        <div className="flex flex-wrap justify-around">
          <DemandCard status="Aberto" />
          <DemandCard status="Aberto" />
          <DemandCard status="Aberto" />
          <DemandCard status="Aberto" />
          <DemandCard status="Aberto" />
          <DemandCard status="Aberto" />
          <DemandCard status="Aberto" />
          <DemandCard status="Aberto" />
          <DemandCard status="Aberto" />
          <DemandCard status="Aberto" />
          <DemandCard status="Aberto" />
          <DemandCard status="Aberto" />
          <DemandCard status="Aberto" />
          <DemandCard status="Aberto" />
          <DemandCard status="Aberto" />
          <DemandCard status="Aberto" />
        </div>
      )}
    </div>
  );
}
