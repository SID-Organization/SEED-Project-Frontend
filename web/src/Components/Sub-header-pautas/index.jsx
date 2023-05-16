import Search from "../Search";
import CreateNewPauta from "../Create-new-pauta";

export default function SubHeaderPautas(props) {
  return (
    <div>
      <div className="flex justify-between items-center shadow-page-title-shadow h-[5rem]">
        <h1 className="text-dark-blue-weg font-bold text-3xl font-roboto ml-[8rem]">
          Pautas
        </h1>
        <div className="flex mr-10 gap-16">
          <CreateNewPauta />
          <Search filter={props.filters} setFilter={props.setFilters}/>
        </div>
      </div>
    </div>
  );
}
