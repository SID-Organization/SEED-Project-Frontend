import SubHeader from "../../../Components/Sub-header";
import DemandCard from "../../../Components/Demand-card";
import DemandsList from "../../../Components/Demand-card-list";
import NoDemands from "../../../Components/No-demands";

import "../../../styles/index.css";
import { useEffect, useState } from "react";

async function getDemandsFromDatabase() {
  const response = await fetch("http://localhost:8080/sid/api/demanda");
  const demands = await response.json();
  return demands;
}

export default function homeDemands() {
  const [isListFormat, setIsListFormat] = useState(false);

  const [demands, setDemands] = useState<any[]>();

  function getDemandsList() {
    return (
      <div className="flex justify-center items-center h-full">
        <DemandsList />
      </div>
    );
  }

  useEffect(() => {
    getDemandsFromDatabase().then((demands) => {
      setDemands(demands);
      console.log(demands);
    });
  }, []);

  useEffect(() => {
    console.log(demands);
  }, [demands]);

  function getDemandsGrid() {
    return (
      <div className="flex flex-wrap justify-around gap-4 w-full">
        {demands && demands.filter(item => item.statusDemanda != "RASCUNHO").map((demand, i) => {
            return <DemandCard key={i} demand={demand} />;
        })}

        {/* <DemandCard status="Aberto" />
        <DemandCard status="AprovadoPelaComissao" />
        <DemandCard status="Aberto" />
        <DemandCard status="Cancelado" /> */}
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
      <div className="flex justify-center w-full">
        {isListFormat ? getDemandsList() : getDemandsGrid()}
      </div>
    </div>
  );
}
