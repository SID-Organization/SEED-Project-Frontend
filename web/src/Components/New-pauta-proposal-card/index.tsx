import { useState } from "react";

import ProposalCard from "../Proposal-card";

import MuiCheckbox from "@mui/material/Checkbox";
import styled from "@emotion/styled";

const Checkbox = styled(MuiCheckbox)({
  color: "#00A3FF",
  "&.Mui-checked": {
    color: "#00A3FF",
  },
});

export default function NewPautaProposalCard() {
  const [isCheckboxClicked, setIsCheckBoxClicked] = useState(false);

  return (
    <div
      className="flex justify-around items-center cursor-pointer"
      onClick={() => setIsCheckBoxClicked(!isCheckboxClicked)}
    >
      <Checkbox checked={isCheckboxClicked} />
      <div className="relative">
        <div
          className={`${
            isCheckboxClicked && "bg-[#d9d9d9]/40"
          } w-full h-full absolute rounded-[5px]`}
        />
        <ProposalCard
          newPauta={true}
          title="Proposta 0001"
          executionTime={10}
          value={4000}
          referenceDemand="10000 - Automatização do processo de criação e desenvolvimento de demandas"
        />
      </div>
    </div>
  );
}
