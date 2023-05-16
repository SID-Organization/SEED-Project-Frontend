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
            : demandsToManage && demandsToManage.map((demand, i) => {
                return <DemandCard key={i} demand={demand} />;
              })}
        </div>
      )} */}
      <DemandsPage DemandType={DemandType.MANAGER} />
    </div>
  );
}
