import { useState, useEffect } from "react";

import DemandsPage from "../../../Components/DemandsPage";
import DemandType from "../../../Components/DemandsPage/DemandType-ENUM";

export default function drafts() {
  const [selectedDrafts, setSelectedDrafts] = useState([]);

  <div className="flex flex-wrap items-center justify-around">
    {/* {demands.length > 0 ? (
          demands.map((demand) => (
            <DemandCard
              key={demand.idDemanda}
              demand={demand}
              setSelectedDrafts={setSelectedDrafts}
            />
          ))
        ) : (
          <div className="flex h-[65vh] flex-wrap items-center justify-around">
            <NoDemands>Sem rascunhos!</NoDemands>
          </div>
        )} */}

    <DemandsPage
      DemandType={DemandType.DRAFT}
      setSelectedDrafts={setSelectedDrafts}
    />
  </div>;
}
