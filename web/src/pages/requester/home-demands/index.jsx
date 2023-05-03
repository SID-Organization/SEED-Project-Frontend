import { useEffect, useState } from "react";
import "../../../styles/index.css";

// Components
import SubHeader from "../../../Components/Sub-header";
import DemandsPage from "../../../Components/DemandsPage";
import DemandType from "../../../Components/DemandsPage/DemandType-ENUM";

export default function homeDemands() {
  return (
    <div>
      <div className="flex flex-wrap justify-around">
        <DemandsPage DemandType={DemandType.DEMAND} />
      </div>
    </div>
  );
}
