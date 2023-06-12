import Search from "../Search";
import CreateNewPauta from "../Create-new-pauta";

import TranslationJson from "../../API/Translate/components/subHeaderPautas.json"
import TranslateUtils from "../../utils/Translate-Utils/index.js";

export default function SubHeaderPautas(props) {

  const translate = TranslationJson;
  let language = TranslateUtils.getLanguage();

  return (
    <div>
      <div className="flex h-[5rem] items-center justify-between shadow-page-title-shadow">
        <h1 className="ml-[8rem] font-roboto text-3xl font-bold text-dark-blue-weg">
          {translate["Pautas"][language] ?? "Pautas"}
        </h1>
        <div className="mr-10 flex gap-16">
          <CreateNewPauta />
          <Search filters={props.filters} setFilters={props.setFilters} />
        </div>
      </div>
    </div>
  );
}
