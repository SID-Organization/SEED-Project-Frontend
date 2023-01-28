import SubHeader from "../../../Components/Sub-header";
import DemandCard from "../../../Components/Demand-card";
import DemandsList from "../../../Components/Demand-card-list";
import NoDemands from "../../../Components/No-demands";

import "../../../styles/index.css";
import { useEffect, useState } from "react";
import LoggedUserInterface from "../../../Interfaces/user/LoggedUserInterface";
import DemandCardProps from "../../../Interfaces/demand/DemandCardPropsInterface";
import DemandInterface from "../../../Interfaces/demand/DemandInterface";

async function getDemandsFromDatabase(userId: number) {
  const response = await fetch(
    "http://localhost:8080/sid/api/demanda/solicitante/" + userId
  );
  const demands = await response.json();
  return demands;
}

export default function homeDemands() {
  const [isListFormat, setIsListFormat] = useState(false);
  const [user, setUser] = useState<LoggedUserInterface>(
    JSON.parse(localStorage.getItem("user")!)
  );
  const [demands, setDemands] = useState<any[]>();
  const [filter, setFilter] = useState<{filterId: number, filterType: string}>({filterId: 0, filterType: "text"});
  const [search, setSearch] = useState<string | Date | number>("");

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
    });
  }, []);

  /*
    demand: {
      idDemanda: string;
      statusDemanda: string;
      descricaoDemanda: string;
      situacaoAtualDemanda: string;
      propostaDemanda: string;
      frequenciaUsoDemanda: string;
      descricaoQualitativoDemanda: string;
      arquivosDemandas: any[];
      beneficiosDemanda: any[];
      tituloDemanda: string;
      scoreDemanda: number;
      solicitanteDemanda: {
        nomeUsuario: string;
        departamentoUsuario: string;
      }
      centroCustoDemanda: any[]
    }
  */

  const updateDemandFilter = async () => {
    if(demands) {
      let filteredDemands;
      if(filter.filterId === 0){
        filteredDemands = demands.filter((demand: DemandInterface, i, arr) => {

        });
      }
    }
    
  }

  useEffect(() => {
    if(demands){
      updateDemandFilter();
    }
  }, [search, filter])

  function getDemandsGrid() {
    return (
      <div className="flex flex-wrap justify-around gap-4 w-full">
        {demands &&
          demands
            .filter(demand => (demand.statusDemanda != "RASCUNHO"))
            .map((demand, i) => {
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
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
        >
          Minhas demandas
        </SubHeader>
      </div>
      <div className="flex justify-center w-full">
        {demands ? (
          isListFormat ? (
            getDemandsList()
          ) : (
            getDemandsGrid()
          )
        ) : (
          <NoDemands>Sem demandas!</NoDemands>
        )}
      </div>
    </div>
  );
}
