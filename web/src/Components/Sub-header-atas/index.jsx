import AtaFilter from "../AtaFilter";
import Search from "../Search";
import TranslationJSON from "../../API/Translate/translations.json";
import TranslateUtils from "../../utils/Translate-Utils/index.js";

export default function SubHeaderAtas(props) {

  const translate = TranslationJSON.components.subHeader;
  const childrenText = TranslateUtils.getChildrenText(props.children);
  const language = TranslateUtils.getLanguage();

  return (
    <div>
      <div className="flex justify-between items-center shadow-page-title-shadow h-[5rem]">
        <h1 className="text-dark-blue-weg font-bold text-3xl font-roboto ml-[8rem]">
          {translate[childrenText][language]} {props.isAtaForDG && "DG"}
        </h1>
        <div className="flex mr-10 gap-16">
          <AtaFilter setFilters={props.setFilters} />
        </div>
      </div>
    </div>
  );
}
