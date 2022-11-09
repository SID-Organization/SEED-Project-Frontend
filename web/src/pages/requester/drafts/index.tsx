import SubHeader from "../../../Components/Sub-header";
import DemandCard from "../../../Components/Demand-card";

export default function drafts() {
  return (
    <div>
      <SubHeader>Rascunhos</SubHeader>
      <div className="flex flex-wrap justify-around">
        <DemandCard status="Rascunho" />
        <DemandCard status="Rascunho" />
        <DemandCard status="Rascunho" />
        <DemandCard status="Rascunho" />
        <DemandCard status="Rascunho" />
        <DemandCard status="Rascunho" />
        <DemandCard status="Rascunho" />
        <DemandCard status="Rascunho" />
        <DemandCard status="Rascunho" />
      </div>
    </div>
  );
}
