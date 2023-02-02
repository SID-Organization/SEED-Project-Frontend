import SubHeader from "../../../Components/Sub-header";
import DemandCard from "../../../Components/Demand-card";
import DemandsList from "../../../Components/Demand-card-list";
import NoDemands from "../../../Components/No-demands";

import "../../../styles/index.css";
import { useEffect, useState } from "react";
import LoggedUserInterface from "../../../Interfaces/user/LoggedUserInterface";
import DemandCardProps from "../../../Interfaces/demand/DemandCardPropsInterface";
import DemandInterface from "../../../Interfaces/demand/DemandInterface";
import Search from "../../../Components/Search";

async function getDemandsFromDatabase(userId: number) {
  const response = await fetch(
    "http://localhost:8080/sid/api/demanda/solicitante/" + userId
  )
  .then((response) => response.json())


  return response;
}


export default function homeDemands() {
  const [isListFormat, setIsListFormat] = useState(false);
  const [user, setUser] = useState<LoggedUserInterface>(
    JSON.parse(localStorage.getItem("user")!)
  );
  
  /*
    Estão sendo utilizadas 3 variáveis para armazenar as demandas:
    - dbDemands: armazena as demandas que foram buscadas no banco de dados
    - demands: armazena as demandas com o histórico de workflow
    - showingDemands: armazena as demandas que serão mostradas na tela (Já filtradas ou ordenadas)
  */
  
  const [demands, setDemands] = useState<any[]>();
  const [dbDemands, setDbDemands] = useState<any[]>();
  const [showingDemands, setShowingDemands] = useState<any[]>([]);


  const [filter, setFilter] = useState<{filterId: number, filterType: string}>({filterId: 0, filterType: "date"});
  const [search, setSearch] = useState<string>("");

  function getDemandsList() {
    return (
      <div className="flex justify-center items-center h-full">
        <DemandsList />
      </div>
    );
  }

  useEffect(() => {
    getDemandsFromDatabase(user.numeroCadastroUsuario).then((demands) => {
      setDbDemands(demands.filter((d: any) => d.statusDemanda != "RASCUNHO"));
    });
  }, []);



  const getDemandsHistoric = async () => {
    let demandsHistoric = dbDemands!.map(async (demand: DemandInterface) => {
      let demandHistoric = await fetch("http://localhost:8080/sid/api/historico-workflow/demanda/" + demand.idDemanda)
        .then((response) => response.json())
        .then((data) => {
          return data;
        })
        .catch((error) => {
          console.log(error);
        })

      return ({
        ...demand,
        historico: await demandHistoric
      });
    })

    setDemands(await Promise.all(demandsHistoric));
  }



  useEffect(() => {
    if(dbDemands){
      getDemandsHistoric();
    }
  }, [dbDemands])

  useEffect(() => {
    if(demands && search != ""){
      console.log("--------------------")
      // console.log(search.split("-").reverse().join("/"))
      // console.log(new Date(demands[0].historico[0].recebimentoHistorico).toLocaleDateString())
    }
  }, [search])

  const updateDemandFilter = async () => {
    if(demands) {
      let filteredDemands;
      console.log("FILTER: ", filter)
      if(filter.filterId === 0){
        filteredDemands = demands.sort((a: any, b: any) => {
          let dateA = new Date(a.historico[0].recebimentoHistorico);
          let dateB = new Date(b.historico[0].recebimentoHistorico);
          if(dateA > dateB) return -1;
          if(dateA < dateB) return 1;
          return 0
        })
        console.log("Filtered demands: ", filteredDemands)
        setShowingDemands(filteredDemands);
      }
    }
  }

  useEffect(() => {
      updateDemandFilter();
  }, [search, filter, demands])

  function getDemandsGrid() {
    return (
      <div className="flex flex-wrap justify-around gap-4 w-full">
        {showingDemands &&
          showingDemands
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
