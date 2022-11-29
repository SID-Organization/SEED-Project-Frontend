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
        <div
          className="
        w-[calc(100vw-20rem)]
        flex items-center"
        >
          <Tooltip
            title="Selecionar propostas"
            enterDelay={800}
            leaveDelay={200}
          >
            <div className="flex items-center">
              <button
                className={
                  isButtonSelectMoreClicked
                    ? `
            flex items-center justify-center
            mt-3
            h-10
            w-10
            rounded-full
            transition
            bg-[#eeeeee]
            mb-3
            `
                    : `
            flex items-center justify-center
            mt-3
            h-10
            w-10
            rounded-full
            transition
            mb-3
            `
                }
                onClick={() =>
                  setIsButtonSelectMoreClicked(!isButtonSelectMoreClicked)
                }
              >
                <ContentCopyOutlinedIcon />
              </button>
            </div>
          </Tooltip>
          {isButtonSelectMoreClicked && (
            <h1 className="ml-10 text-roboto">
              <span className="font-bold text-blue-weg">0</span> selecionados
            </h1>
          )}
        </div>
        {proposalsMock.map((proposal) =>
          isButtonSelectMoreClicked ? (
            <div className="flex items-center justify-center">
              <Checkbox
                checked={isCheckBoxChecked}
                onClick={() => setIsCheckBoxChecked(!isCheckBoxChecked)}
                sx={{
                  color: "#0075B1",
                  marginRight: "1rem",
                  "&.Mui-checked": {
                    color: "#0075B1",
                  },
                }}
              />
              <ProposalCard
                newPauta={proposal.newPauta}
                title={proposal.title}
                executionTime={proposal.executionTime}
                value={proposal.value}
                referenceDemand={proposal.referenceDemand}
              />
            </div>
          ) : (
            <div>
              <ProposalCard
                newPauta={proposal.newPauta}
                title={proposal.title}
                executionTime={proposal.executionTime}
                value={proposal.value}
                referenceDemand={proposal.referenceDemand}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
}
