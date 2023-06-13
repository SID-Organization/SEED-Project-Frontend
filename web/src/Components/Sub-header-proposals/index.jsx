import * as React from "react";
import { useState, useEffect, useContext } from "react";

// Components
import Search from "../Search";
import CreateNewProposalButton from "../CreateNewProposal-Button";

// Services
import DemandService from "../../service/Demand-Service";

//Translation
import TranslationJson from "../../API/Translate/components/subHeaderProposals.json";
import TranslateUtils from "../../utils/Translate-Utils/index.js";
import { TranslateContext } from "../../contexts/translate/index.jsx";

export default function SubHeaderPautas(props) {

  const translate = TranslationJson;
  const [ language ] = useContext(TranslateContext);

  const [demandsTitle, setDemandsTitle] = useState([]);

  useEffect(() => {
    DemandService.getDemandsTitleAndStatus().then((demands) => {
      demands = demands.filter(
        (demand) => demand.statusDemanda === "APROVADO_PELO_GERENTE_DA_AREA"
      );
      setDemandsTitle(demands);
    });
  }, []);

  return (
    <div>
      <div className="flex h-[5rem] items-center justify-between shadow-page-title-shadow">
        <h1 className="ml-[8rem] font-roboto text-3xl font-bold text-dark-blue-weg">
          {translate["Propostas"]?.[language] ?? "Propostas"}
        </h1>
        <div className="mr-10 flex gap-16">
          <CreateNewProposalButton demandsTitle={demandsTitle} />
          <Search filters={props.filters} setFilters={props.setFilters} />
        </div>
      </div>
    </div>
  );
}
