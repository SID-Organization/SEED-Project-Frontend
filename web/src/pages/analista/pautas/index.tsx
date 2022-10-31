import PautasCard from "../../../Components/PautasCard";
import SubHeaderPautas from "../../../Components/SubHeaderPautas";

import "../../../styles/index.css";

export default function Pautas() {
  return (
    <div>
      <SubHeaderPautas />
      <div
        className="
        flex
        justify-center
        items-center
        flex-col
        gap-4
        mt-8
        
      "
      >
        <PautasCard />
        <PautasCard />
        <PautasCard />
        <PautasCard />
      </div>
    </div>
  );
}
