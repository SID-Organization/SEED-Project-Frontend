import MyDemands from "../../../Components/SubHeader";
import CancelledCard from "../../../Components/Cancelled-card";

import "../../../styles/index.css";

export default function homeDemands() {
  return (
    <div>
      <div>
        <MyDemands>Minhas demandas</MyDemands>
      </div>
      <div className="flex flex-wrap justify-around">
        <CancelledCard />
        <CancelledCard />
        <CancelledCard />
        <CancelledCard />
        <CancelledCard />
        <CancelledCard />
        <CancelledCard />
        <CancelledCard />
        <CancelledCard />
        <CancelledCard />
        <CancelledCard />
        <CancelledCard />
        {/* Aprovada pela comissão's card */}
      </div>
    </div>
  );
}
