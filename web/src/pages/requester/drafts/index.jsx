import DemandsPage from "../../../Components/DemandsPage";
import DemandType from "../../../Components/DemandsPage/DemandType-ENUM";

export default function drafts() {
  <div className="flex flex-wrap items-center justify-around">
    <DemandsPage DemandType={DemandType.DRAFT} />
  </div>;
}
