import "../../../styles/index.css";

// Components
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
