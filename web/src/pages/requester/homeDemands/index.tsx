import MyDemands from "../../../Components/SubHeader";
import CancelledCard from "../../../Components/Cancelled-card";

import "../../../styles/index.css";

export default function homeDemands() {
  return (
    <div>
      <MyDemands>Minhas demandas</MyDemands>
      <CancelledCard />
      <CancelledCard />
      <CancelledCard />
      <CancelledCard />
      {/* Aprovada pela comissão's card */}
    </div>
  );
}
