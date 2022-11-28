import { useEffect, useState } from "react";
import ProposalCard from "../../../Components/Proposal-card";
import SubHeaderProposals from "../../../Components/Sub-header-proposals";

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
        mt-8
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
