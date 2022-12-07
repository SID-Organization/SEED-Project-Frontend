import { useParams } from "react-router";

import ProposalCard from "../../../Components/Proposal-card";

export default function GenerateAta() {
  const { id } = useParams();
  console.log("ID: ", id);

  return (
    <div className="grid items-center">
      <div className="flex justify-center items-center">
        <h1 className="font-bold text-3xl text-blue-weg mt-10">Ata 0003</h1>
      </div>
      <ProposalCard
        id={1}
        newPauta={true}
        title="Proposta 1"
        executionTime={10}
        value={1000}
        referenceDemand="Automatizar o processo de geração de atas"
      />
    </div>
  );
}
