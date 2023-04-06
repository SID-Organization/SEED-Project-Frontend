import { useState, useEffect } from "react";

// Styles
import "../../styles/index.css";

// Components
import DemandList from "../../Components/Demand-card-list";
import SubHeader from "../../Components/Sub-header";

// Interfaces
import DemandCard from "../../Components/Demand-card";

// Services
import DemandService from "../../service/Demand-Service";

// Utils
import DemandFilterUtils from "../../utils/DemandFilter-Utils";
import UserUtils from "../../utils/User-Utils";

export default function DemandManager() {
  // State to set the format of the demands
  const [isListFormat, setIsListFormat] = useState(false);

  // Filter search for demands to manage
  const [filter, setFilter] = useState();
  const [search, setSearch] = useState("");


  const [user, setUser] = useState(UserUtils.getLoggedUser());
  const [demandsToManage, setDemandsToManage] = useState([]);
  const [filteredDemands, setFilteredDemands] = useState([]);
  useEffect(() => {
    DemandService.getDemandsToManage(user.numeroCadastroUsuario, user.cargoUsuario)
      .then((data) => {
        let demandsToManage = data;
        if (user.cargoUsuario === "GERENTE") {
          demandsToManage = demandsToManage.filter((item) => item.statusDemanda === "CLASSIFICADO_PELO_ANALISTA");
        }
        setDemandsToManage(demandsToManage);
      });
      setFilter(DemandFilterUtils.filterTypes[0]);
  }, []);


  useEffect(() => {
    if(!demandsToManage) return;
    setFilteredDemands(demandsToManage);
  }, [demandsToManage])

  useEffect(() => {
    if(!filter) return;
      const filtered = DemandFilterUtils.filterBy(demandsToManage, filter.filterBy, search);
      setFilteredDemands(filtered);
  }, [search, filter])

  return (
    <div>
      <SubHeader
        search={search}
        setSearch={setSearch}
        setIsListFormat={setIsListFormat}
        isListFormat={isListFormat}
        setFilter={setFilter}
        filter={filter}
      >
        Gerenciar demandas
      </SubHeader>
      {isListFormat ? (
        <div className="flex justify-center items-center h-full">
          <DemandList demands={demandsToManage} />
        </div>
      ) : (
        <div className="flex flex-wrap justify-around">
          {demandsToManage &&
            filteredDemands
              .map((demand, i) => {
                return <DemandCard key={i} demand={demand} />;
              })
          }
        </div>
      )}
    </div>
  );
}
