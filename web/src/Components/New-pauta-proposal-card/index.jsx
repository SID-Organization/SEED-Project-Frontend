import { useEffect, useState } from "react";

import ProposalCard from "../Proposal-card";

import MuiCheckbox from "@mui/material/Checkbox";
import styled from "@emotion/styled";

const Checkbox = styled(MuiCheckbox)({
  color: "#00A3FF",
  "&.Mui-checked": {
    color: "#00A3FF",
  },
});

export default function NewPautaProposalCard(props) {
  const [isAlreadyChecked, setIsAlreadyChecked] = useState();
  const [isCheckboxClicked, setIsCheckBoxClicked] = useState(false);

  const isChecked = () => {
    return props.selectedProposals.some(proposal => proposal.idProposta === props.proposal.idProposta);
  };

  useEffect(() => {
    if (isChecked()) {
      setIsAlreadyChecked(true);
      setIsCheckBoxClicked(true);
    }
  }, [])

  useEffect(() => {
    if (isCheckboxClicked) {
      if (!isAlreadyChecked)
        props.setSelectedProposals(prevState => [...prevState, { idProposta: props.proposal.idProposta, idDemanda: props.proposal.idDemanda }]);
    } else {
      props.setSelectedProposals(prevState => prevState.filter(proposal => proposal.idProposta !== props.proposal.idProposta));
      setIsAlreadyChecked(false);
    }
  }, [isCheckboxClicked]);

  return (
    <div
      className="flex justify-around items-center cursor-pointer"
      onClick={() => setIsCheckBoxClicked(!isCheckboxClicked)}
    >
      <Checkbox checked={isCheckboxClicked} />
      <div className="relative">
        <div
          className={`${isCheckboxClicked && "bg-[#d9d9d9]/40"
            } w-full h-full absolute rounded-[5px]`}
        />
        <ProposalCard
          newPauta={true}
          title={props.proposal.demandaPropostaTitulo}
          executionTime={props.proposal.tempoDeExecucaoDemanda}
          value={props.proposal.valorDemanda}
          referenceDemand={props.proposal.idDemanda}
          proposalId={props.proposal.idProposta}
        />
      </div>
    </div>
  );
}
