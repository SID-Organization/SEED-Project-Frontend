import * as React from "react";
import { useState, useEffect } from "react";

// Components
import Search from "../Search";
import CreateNewProposalButton from "../CreateNewProposal-Button";

// Services
import DemandService from "../../service/Demand-Service";

export default function SubHeaderPautas() {
  const [demandTitle, setDemandTitle] = useState([]);

  useEffect(() => {
    DemandService.getDemandsTitleAndStatus().then((demands) => {
      demands = demands.filter(
        (demand) => demand.statusDemanda === "APROVADO_PELO_GERENTE_DA_AREA"
      );
      setDemandTitle(demands);
    });
  }, []);

  return (
    <div>
      <div className="flex h-[5rem] items-center justify-between shadow-page-title-shadow">
        <h1 className="ml-[8rem] font-roboto text-3xl font-bold text-dark-blue-weg">
          Propostas
        </h1>
        <div className="mr-10 flex gap-16">
          <CreateNewProposalButton demandTitle={demandTitle} />
          <Search />
        </div>
      </div>
    </div>
  );
}
