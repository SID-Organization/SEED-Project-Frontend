import { Button, Checkbox, Tooltip } from "@mui/material";
import MuiIconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";
import ProposalCard from "../../../Components/Proposal-card";
import SubHeaderProposals from "../../../Components/Sub-header-proposals";

import { styled } from "@mui/material/styles";

import MuiContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";

const proposalsMock = [
  {
    newPauta: "card",
    title: "Automatização do processo",
    executionTime: 10.0,
    value: 10.0,
    referenceDemand: "Demanda 2",
  },
  {
    newPauta: "card",
    title: "Automatização do processo",
    executionTime: 10.0,
    value: 10.0,
    referenceDemand: "Demanda 2",
  },
  {
    newPauta: "card",
    title: "Automatização do processo",
    executionTime: 10.0,
    value: 10.0,
    referenceDemand: "Demanda 2",
  },
  {
    newPauta: "card",
    title: "Automatização do processo",
    executionTime: 10.0,
    value: 10.0,
    referenceDemand: "Demanda 2",
  },
  {
    newPauta: "card",
    title: "Automatização do processo",
    executionTime: 10.0,
    value: 10.0,
    referenceDemand: "Demanda 2",
  },
  {
    newPauta: "card",
    title: "Automatização do processo",
    executionTime: 10.0,
    value: 10.0,
    referenceDemand: "Demanda 2",
  },
  {
    newPauta: "card",
    title: "Automatização do processo",
    executionTime: 10.0,
    value: 10.0,
    referenceDemand: "Demanda 2",
  },
];

export default function Proposals() {
  const [isButtonSelectMoreClicked, setIsButtonSelectMoreClicked] =
    useState(false);

  const [isCheckBoxChecked, setIsCheckBoxChecked] = useState(false);

  const ContentCopyOutlinedIcon = styled(MuiContentCopyOutlinedIcon)({
    color: "#0075B1",
    transition: "0.2s",

    "&:hover": {
      color: "#008fd6",
    },
  });

  return (
    <div>
      <SubHeaderProposals />
      <div
        className="
        flex
        justify-center
        items-center
        flex-col
        gap-8
      "
      >
        {proposalsMock.map((proposal) => (
          <ProposalCard
            newPauta={proposal.newPauta}
            title={proposal.title}
            executionTime={proposal.executionTime}
            value={proposal.value}
            referenceDemand={proposal.referenceDemand}
          />
        ))}
      </div>
    </div>
  );
}
