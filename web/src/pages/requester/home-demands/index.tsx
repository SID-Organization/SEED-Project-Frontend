import SubHeader from "../../../Components/Sub-header";
import DemandCard from "../../../Components/Demand-card";
import DemandsList from "../../../Components/Demand-card-list";
import NoDemands from "../../../Components/No-demands";

import "../../../styles/index.css";
import { useEffect, useState } from "react";
import LoggedUserInterface from "../../../Interfaces/user/LoggedUserInterface";

async function getDemandsFromDatabase(userId: number) {
  const response = await fetch("http://localhost:8080/sid/api/demanda/solicitante/" + userId);
  const demands = await response.json();
  return demands;
}

export default function homeDemands() {
  const [isListFormat, setIsListFormat] = useState(false);
  const [user, setUser] = useState<LoggedUserInterface>(JSON.parse(localStorage.getItem("user")!));
  const [demands, setDemands] = useState<any[]>();

  function getDemandsList() {
    return (
      <div className="flex justify-center items-center h-full">
        <DemandsList />
      </div>
    );
  }

  useEffect(() => {
    getDemandsFromDatabase(user.numeroCadastroUsuario).then((demands) => {
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
        {demands ? isListFormat ? getDemandsList() : getDemandsGrid() : <NoDemands />}
      </div>
    </div>
  );
}
