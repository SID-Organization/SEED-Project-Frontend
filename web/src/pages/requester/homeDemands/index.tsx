import MyDemands from "../../../Components/SubHeader";
import DemandCard from "../../../Components/DemandCard";

import "../../../styles/index.css";

export default function homeDemands() {
  return (
    <div>
      <div>
      <MyDemands>Minhas demandas</MyDemands>
      </div>
      <div className="flex flex-wrap justify-around">
        <DemandCard status="Cancelado" />
        <DemandCard status="Cancelado" />
        <DemandCard status="Cancelado" />
        <DemandCard status="AprovadoPelaComissao" />
        <DemandCard status="AprovadoPelaComissao" />
        <DemandCard status="AprovadoPeloAnalistaTi" />
        <DemandCard status="AprovadoPeloAnalistaTi" />
        <DemandCard status="AprovadoPeloAnalistaTi" />
        {/* Aprovada pela comissão's card */}
      </div>
    </div>
  );
}
