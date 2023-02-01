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
  )
  .then((response) => response.json())


  return response;
}


export default function homeDemands() {
  const [isListFormat, setIsListFormat] = useState(false);
  const [user, setUser] = useState<LoggedUserInterface>(
    JSON.parse(localStorage.getItem("user")!)
  );
  const [demands, setDemands] = useState<any[]>();
  const [dbDemands, setDbDemands] = useState<any[]>();
  const [filter, setFilter] = useState<{filterId: number, filterType: string}>({filterId: 0, filterType: "date"});
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
      setDbDemands(demands);
    });
  }, []);

0
  //useEffect to show demands

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



  const updateDemandFilter = async () => {
    if(demands) {
      let filteredDemands;
      if(filter.filterId === 0){
        filteredDemands = demands.filter((demand: any, i, arr) => {
          let selectedDate = search.toString().split('-').reverse().join("/");

          return null;
        });
        console.log(filteredDemands)
      }
    }
    
  }

  useEffect(() => {
    if(demands){
      updateDemandFilter();
    }
  }, [search, filter])

  useEffect(() => {
    if(demands){
      console.log(demands)
    }
  }, demands)

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
