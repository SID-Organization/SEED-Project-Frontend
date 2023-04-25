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
import { Pagination } from "@mui/material";

export default function homeDemands() {
  /*
    Estão sendo utilizadas 3 variáveis para armazenar as demandas:
    - dbDemands: armazena as demandas que foram buscadas no banco de dados
    - demands: armazena as demandas com o histórico de workflow
    - showingDemands: armazena as demandas que serão mostradas na tela (Já filtradas ou ordenadas)
  */

  const [isListFormat, setIsListFormat] = useState(false);
  const [user, setUser] = useState(UserUtils.getLoggedUser());

  const [demandsWLogs, setDemandsWLogs] = useState();
  const [dbDemands, setDbDemands] = useState();
  const [sortedDemands, setSortedDemands] = useState([]);
  const [showingDemands, setShowingDemands] = useState([]);

  const [filter, setFilter] = useState({ filterId: 0, filterType: "date" });
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1); // Define a página atual como 1
  const demandsPerPage = 12; // Define o número de demandas por página
  const lastIndex = currentPage * demandsPerPage; // Último índice das demandas a serem mostradas
  const firstIndex = lastIndex - demandsPerPage; // Primeiro índice das demandas a serem mostradas

  useEffect(() => {
    DemandService.getDemandsByRequestorId(user.numeroCadastroUsuario).then(
      (demands) => {
        console.log("Demands: ", demands);
        setDbDemands(demands.filter((d) => d.statusDemanda != "RASCUNHO"));
      }
    );
  }, []);

  useEffect(() => {
    if (dbDemands) {
      getDemandsLogs();
    }
  }, [dbDemands]);

  useEffect(() => {
    if (demandsWLogs) {
      updateDemandSort(search);

      if (sortedDemands) {
        setShowingDemands(sortedDemands);
      }
    }
  }, [filter, demandsWLogs]);

  function getDemandsList() {
    return (
      <div className="flex h-full items-center justify-center">
        <DemandsList demands={showingDemands} />
      </div>
    );
  }

  function getDemandsGrid() {
    const showingDemandsPaginated = showingDemands
      ? showingDemands.slice(firstIndex, lastIndex)
      : []; // Fatiamento das demandas

    const handleChangePage = (event, value) => {
      // Função para alterar a página atual
      setCurrentPage(value);
    };

    return (
      <div>
        <div className="flex w-full flex-wrap justify-around gap-4">
          {showingDemandsPaginated &&
            showingDemandsPaginated.map((demand, i) => {
              return <DemandCard key={i} demand={demand} />;
            })}
        </div>
        <div className="mt-4 flex w-full justify-center">
          {showingDemands.length > 0 && (
            <Pagination
              count={Math.ceil(showingDemands?.length / demandsPerPage)}
              page={currentPage}
              onChange={handleChangePage}
              color="primary"
            />
          )}
        </div>
      </div>
    );
  }

  const getDemandsLogs = async () => {
    let demandsHistoric = dbDemands.map(async (demand) => {
      console.log("Demand: ", demand);
      let demandHistoric = DemandLogService.getDemandLogs(demand.idDemanda);

      return {
        ...demand,
        historico: await demandHistoric,
      };
    });

    setDemandsWLogs(await Promise.all(demandsHistoric));
  };

  const updateDemandSort = (search) => {
    let sortedDemands;
    if (demandsWLogs) {
      console.log("DemandsWLogs: ", demandsWLogs);
      console.log("FILTER: ", filter);
      console.log("SEARCH: ", search);

      sortedDemands = demandsWLogs;

      console.log("sorted demands: ", sortedDemands);

      setSortedDemands(sortedDemands);
    }
  };

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
      <div className="flex flex-wrap justify-around">
        {showingDemands.length > 0 ? (
          isListFormat ? (
            getDemandsList()
          ) : (
            getDemandsGrid()
          )
        ) : (
          <div className="flex h-[65vh] w-full items-center justify-center">
            <NoDemands>Sem demandas!</NoDemands>
          </div>
        )}
      </div>
    </div>
  );
}
