import AtaFilter from "../AtaFilter";
import Search from "../Search";
import TranslationJSON from "../../API/Translate/translations.json";
import TranslateUtils from "../../utils/Translate-Utils/index.js";

export default function SubHeaderAtas(props) {
  const translate = TranslationJSON.components.subHeader;
  // const childrenText = TranslateUtils.getChildrenText(props.children);
  const language = TranslateUtils.getLanguage();

  return (
    <div>
      <div className="flex h-[5rem] items-center justify-between shadow-page-title-shadow">
        <h1 className="ml-[8rem] font-roboto text-3xl font-bold text-dark-blue-weg">
          {translate[childrenText][language]} {props.isAtaForDG && "DG"}
        </h1>
        <div className="mr-10 flex gap-16">
          <AtaFilter setFilters={props.setFilters} />
        </div>
      </div>
    </div>
  );
}
