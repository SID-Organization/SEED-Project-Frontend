import AtaFilter from "../AtaFilter";
import Search from "../Search";

export default function SubHeaderAtas(props) {
  return (
    <div>
      <div className="flex justify-between items-center shadow-page-title-shadow h-[5rem]">
        <h1 className="text-dark-blue-weg font-bold text-3xl font-roboto ml-[8rem]">
          Atas registradas {props.isAtaForDG && "DG"}
        </h1>
        <div className="flex mr-10 gap-16">
          <AtaFilter setFilters={props.setFilters} />
        </div>
      </div>
    </div>
  );
}
