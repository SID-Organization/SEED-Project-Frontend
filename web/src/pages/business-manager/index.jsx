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
import DemandsPage from "../../Components/DemandsPage";
import DemandType from "../../Components/DemandsPage/DemandType-ENUM";

export default function DemandManager() {
  // State to set the format of the demands
  const [isListFormat, setIsListFormat] = useState(false);

  // Filter search for demands to manage
  const [filters, setFilters] = useState([]);

  const [user, setUser] = useState(UserUtils.getLoggedUser());
  const [demandsToManage, setDemandsToManage] = useState([]);
  const [filteredDemands, setFilteredDemands] = useState([]);

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
      {/* {isListFormat ? (
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
      )} */}
      <DemandsPage DemandType={DemandType.MANAGER} />
    </div>
  );
}
