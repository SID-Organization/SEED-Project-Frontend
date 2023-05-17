// Styles
import "../../styles/index.css";

// Components
import SubHeader from "../../Components/Sub-header";

// Utils
import DemandsPage from "../../Components/DemandsPage";
import DemandType from "../../Components/DemandsPage/DemandType-ENUM";

export default function DemandManager() {
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
      <DemandsPage DemandType={DemandType.MANAGER} />
    </div>
  );
}
