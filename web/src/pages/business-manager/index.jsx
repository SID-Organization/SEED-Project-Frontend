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
  const [filters, setFilters] = useState([]);

  const [user, setUser] = useState(UserUtils.getLoggedUser());
  const [demandsToManage, setDemandsToManage] = useState([]);
  const [filteredDemands, setFilteredDemands] = useState([]);
  useEffect(() => {
    DemandService.getDemandsToManage(
      user.numeroCadastroUsuario,
      user.cargoUsuario
    ).then((data) => {
      let demandsToManage = data;
      if (user.cargoUsuario === "GERENTE") {
        demandsToManage = demandsToManage.filter(
          (item) => item.statusDemanda === "CLASSIFICADO_PELO_ANALISTA"
        );
      }
      setDemandsToManage(demandsToManage);
    });
  }, []);

  useEffect(() => {
    if (!demandsToManage) return;
    setFilteredDemands(demandsToManage);
  }, [demandsToManage]);

  useEffect(() => {
    if (!filters) return;
    const filtered = DemandFilterUtils.filterBy(demandsToManage, filters);
    setFilteredDemands(filtered);
  }, [filters]);

  return (
    <div>
      <SubHeader
        setIsListFormat={setIsListFormat}
        isListFormat={isListFormat}
        setFilter={setFilters}
        filter={filters}
      >
        Gerenciar demandas
      </SubHeader>
      {isListFormat ? (
        <div className="flex h-full items-center justify-center">
          <DemandList demands={demandsToManage} />
        </div>
      ) : (
        <div className="flex flex-wrap justify-around">
          {filteredDemands
            ? filteredDemands.map((demand, i) => {
                return <DemandCard key={i} demand={demand} />;
              })
            : demandsToManage.map((demand, i) => {
                return <DemandCard key={i} demand={demand} />;
              })}
        </div>
      )}
    </div>
  );
}
