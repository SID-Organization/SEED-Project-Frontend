import SubHeader from "../../../Components/SubHeader";
import DemandCard from "../../../Components/DemandCard";

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
