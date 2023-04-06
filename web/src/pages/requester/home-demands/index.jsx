import { useEffect, useState } from "react";
import "../../../styles/index.css";

// Components
import SubHeader from "../../../Components/Sub-header";
import NoDemands from "../../../Components/No-demands";
import DemandCard from "../../../Components/Demand-card";
import DemandsList from "../../../Components/Demand-card-list";
import DemandService from "../../../service/Demand-Service";
import DemandLogService from "../../../service/DemandLog-Service";

// Utils
import UserUtils from "../../../utils/User-Utils";

export default function homeDemands() {
  const [isListFormat, setIsListFormat] = useState(false);
  const [user, setUser] = useState(UserUtils.getLoggedUser());
  
  /*
    Estão sendo utilizadas 3 variáveis para armazenar as demandas:
    - dbDemands: armazena as demandas que foram buscadas no banco de dados
    - demands: armazena as demandas com o histórico de workflow
    - showingDemands: armazena as demandas que serão mostradas na tela (Já filtradas ou ordenadas)
  */
  
  const [demandsWLogs, setDemandsWLogs] = useState();
  const [dbDemands, setDbDemands] = useState();
  const [sortedDemands, setSortedDemands] = useState([]);
  const [showingDemands, setShowingDemands] = useState([]);


  const [filter, setFilter] = useState({filterId: 0, filterType: "date"});
  const [search, setSearch] = useState("");

  function getDemandsList() {
    return (
      <div className="flex justify-center items-center h-full">
        <DemandsList demands={showingDemands}/>
      </div>
    );
  }

  useEffect(() => {
    DemandService.getDemandsByRequestorId(user.numeroCadastroUsuario).then((demands) => {
      console.log("Demands: ", demands)
      setDbDemands(demands.filter((d) => d.statusDemanda != "RASCUNHO"));
    });
  }, []);



  const getDemandsLogs = async () => {
    let demandsHistoric = dbDemands.map(async (demand) => {
      console.log("Demand: ", demand)
      let demandHistoric = DemandLogService.getDemandLogs(demand.idDemanda);

      return ({
        ...demand,
        historico: await demandHistoric
      });
    })

    setDemandsWLogs(await Promise.all(demandsHistoric));
  }


  const updateDemandSort = (search) => {
    let sortedDemands;
    if(demandsWLogs) {
      console.log("DemandsWLogs: ", demandsWLogs)
      console.log("FILTER: ", filter)
      console.log("SEARCH: ", search)

      // if(filter.filterId === 0){
      //   // Ordenar por data de criação
      //   sortedDemands = demandsWLogs.sort((a, b) => {
      //     let dateA = new Date(a.historico[0].recebimentoHistorico);
      //     let dateB = new Date(b.historico[0].recebimentoHistorico);
      //     if(dateA > dateB) return -1;
      //     if(dateA < dateB) return 1;
      //     return 0
      //   })
      // } else if(filter.filterId === 1){
      //   // Ordenar por data de atualização (ultima atualização)
      //   sortedDemands = demandsWLogs.sort((a, b) => {
      //     let dateA = new Date(a.historico[a.historico.length - 1].recebimentoHistorico);
      //     let dateB = new Date(b.historico[b.historico.length - 1].recebimentoHistorico);
      //     if(dateA > dateB) return -1;
      //     if(dateA < dateB) return 1;
      //     return 0
        // })

      // } else {
        sortedDemands = demandsWLogs;
      }
      
      console.log("sorted demands: ", sortedDemands)

      setSortedDemands(sortedDemands);
    }
  

  useEffect(() => {
    if(dbDemands){
      getDemandsLogs();
    }
  }, [dbDemands])


  useEffect(() => {
    if(demandsWLogs) {
      updateDemandSort(search);

      if(sortedDemands) {
        setShowingDemands(sortedDemands);
      }
    }
  }, [filter, demandsWLogs])



  function getDemandsGrid() {
    return (
      <div className="flex flex-wrap justify-around gap-4 w-full">
        {showingDemands &&
          showingDemands
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
        {showingDemands ? (
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
