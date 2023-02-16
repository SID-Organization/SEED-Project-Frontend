import Search from "../Search";
import CreateNewPauta from "../Create-new-pauta";

export default function SubHeaderPautas() {
  return (
    <div>
      <div className="flex justify-between items-center shadow-page-title-shadow h-[5rem]">
        <h1 className="text-dark-blue-weg font-bold text-3xl font-roboto ml-[8rem]">
          Atas registradas
        </h1>
        <div className="flex mr-10 gap-16">
          <Search />
        </div>
      </div>
    </div>
  );
}