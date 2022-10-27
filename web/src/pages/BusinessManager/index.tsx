import DemandCard from "../../Components/DemandCard";
import DemandCardList from "../../Components/DemandCardList";
import SubHeader from "../../Components/SubHeader";

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
        </div>
      )}
    </div>
  );
}
