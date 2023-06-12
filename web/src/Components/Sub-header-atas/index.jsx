import AtaFilter from "../AtaFilter";
import TranslationJSON from "../../API/Translate/components/subHeaderAtas.json";
import TranslateUtils from "../../utils/Translate-Utils/index.js";

export default function SubHeaderAtas(props) {
  const translate = TranslationJSON;
  const language = TranslateUtils.getLanguage();

  return (
    <div>
      <div className="flex h-[5rem] items-center justify-between shadow-page-title-shadow">
        <h1 className="ml-[8rem] font-roboto text-3xl font-bold text-dark-blue-weg">
          {translate["Atas Registradas"]?.[language]} {props.isAtaForDG && "DG"}
        </h1>
        <div className="mr-10 flex gap-16">
          <AtaFilter setFilters={props.setFilters} />
        </div>
      </div>
    </div>
  );
}
