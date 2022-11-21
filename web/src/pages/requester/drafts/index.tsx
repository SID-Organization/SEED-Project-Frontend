import SubHeader from "../../../Components/Sub-header";
import DemandCard from "../../../Components/Demand-card";

export default function drafts() {
  return (
    <div>
      <SubHeader>Rascunhos</SubHeader>
      <div className="flex flex-wrap justify-around">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
          <DemandCard status="Rascunho" />
        ))}
      </div>
    </div>
  );
}
