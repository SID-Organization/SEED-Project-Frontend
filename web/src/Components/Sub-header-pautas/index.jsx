import Search from "../Search";
import CreateNewPauta from "../Create-new-pauta";

export default function SubHeaderPautas(props) {
  return (
    <div>
      <div className="flex h-[5rem] items-center justify-between shadow-page-title-shadow">
        <h1 className="ml-[8rem] font-roboto text-3xl font-bold text-dark-blue-weg">
          Pautas
        </h1>
        <div className="mr-10 flex gap-16">
          <CreateNewPauta />
          <Search filter={props.filters} setFilter={props.setFilters} />
        </div>
      </div>
    </div>
  );
}
