import { useEffect, useState } from "react";
import { useParams } from "react-router";

// MUI
import { AddRounded, Download } from "@mui/icons-material";
import { Button, Tooltip, TextField } from "@mui/material";

// Components
import GenerateAtaProposal from "../../../Components/Generate-ata-proposal";

// Services
import PautaService from "../../../service/Pauta-Service";
import AtaService from "../../../service/Ata-Service";

// Utils
import AtaUtils from "../../../utils/Ata-Utils";

export default function GenerateAta() {
  // ID da pauta
  const { id } = useParams("id");
  const [proposals, setProposals] = useState([]);
  const [finalDecisions, setFinalDecisions] = useState([]);
  const [finalDecisionFile, setFinalDecisionFile] = useState();
  const [numDgAta, setNumDgAta] = useState(0);

  const proposalFinalDecisionTemplate = {
    propostaPropostaLogDTO: { idProposta: 0 },
    parecerComissaoPropostaLogDTO: "",
    consideracoesPropostaLogDTO: "",
    tipoAtaPropostaLogDTO: "",
  }

  // Atualiza a decisão final de uma proposta
  function updateFinalDecision(proposalId, newFinalDecision) {
    const decisions = finalDecisions.map((decision) => {
      if (decision.propostaPropostaLogDTO.idProposta == proposalId) {
        return newFinalDecision;
      }
      return decision;
    });
    setFinalDecisions(decisions);
  }

  // Faz a verificação dos campos obrigatórios
  function verificarAta() {
    if (numDgAta == 0) {
      alert("Número DG Ata não pode ser nulo");
      return;
    };

    for (let fd of finalDecisions) {
      if (AtaUtils.isFinalDecisionValid(fd) == false) {
        alert("Parecer Comissão, Considerações e Tipo Ata são obrigatórios");
        return;
      }
    }

    if (finalDecisionFile == undefined) {
      alert("Documento de aprovação é obrigatório");
      return;
    }
  }

  useEffect(() => {
    if(finalDecisions.length > 0){
      console.log(finalDecisions);
    }
  }, [finalDecisions])

  // Salva a ata no banco de dados
  function saveAta() {
    verificarAta();

    const ata = {
      numeroDgAta: numDgAta,
      pautaAta: {
        idPauta: id
      },
      propostasLogDTO: finalDecisions
    }

    const form = new FormData();

    form.append("ata", JSON.stringify(ata));
    form.append("documentoAprovacao", finalDecisionFile);

    AtaService.createAta(form);
  }


  useEffect(() => {
    PautaService.getPautaProposalsById(id)
      .then((proposals) => {
        setProposals(proposals);
      });
  }, []);

  // Cria um array de decisões finais com base nas propostas
  useEffect(() => {
    if (proposals.length > 0) {
      const finalDecisions = proposals.map((proposal) => {
        return { ...proposalFinalDecisionTemplate, propostaPropostaLogDTO: { idProposta: proposal.idProposta } };
      });
      setFinalDecisions(finalDecisions);
    }
  }, [proposals]);

  return (
    <div className="grid items-center">
      <div className="flex justify-center mb-8">
        <div className="flex-1"></div>
        <div className="flex-1 flex flex-col justify-center items-center">
          <h1 className="font-bold text-3xl text-blue-weg mt-10">Geração de ata</h1>
          <p className="text-blue-weg mt-4">Pauta referência: {id}</p>
        </div>
        <div className="flex-1 flex items-end">
          <p className="text-light-blue-weg">Número DG ata:</p>
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            type="number"
            value={numDgAta}
            onChange={(e) => setNumDgAta(e.target.value)}
            sx={{
              width: "5rem",
              height: "2.5rem",
              marginLeft: "0.5rem",
            }}
          />
        </div>
      </div>
      <div className="grid">
        {proposals.map((proposal, i) => (
          <GenerateAtaProposal
            key={i}
            proposal={proposal}
            proposalIndex={i}
            finalDecision={finalDecisions.find(fd => fd.propostaPropostaLogDTO.idProposta == proposal.idProposta)}
            setFinalDecision={newFinalDecision => updateFinalDecision(proposal.idProposta, newFinalDecision)}
          />
        ))}
      </div>
      <div className="flex justify-end items-center mb-5 mr-10">
        <div className="flex items-center mr-28">
          <Button
            variant="contained"
            component="label"
            startIcon={<Download />}
            sx={{
              backgroundColor: "#0075B1",
              width: "16rem",
              height: "2.5rem",
              marginRight: "0.8rem",

              "&:hover": {
                backgroundColor: "#0075B1",
              },
            }}
          >
            Documento de aprovação
            <input
              type="file"
              accept="application/pdf,application/vnd.ms-excel"
              onChange={(e) => {
                setFinalDecisionFile(e.target.files[0]);
              }}
              hidden
            />
          </Button>
          <div className="w-32">
            {finalDecisionFile && (
              <Tooltip title={finalDecisionFile.name}>
                <p className="text-blue-weg">
                  {
                    finalDecisionFile.name.length > 10 ? finalDecisionFile.name.slice(0, 10) + "..." : finalDecisionFile.name
                  }
                </p>
              </Tooltip>
            )}
          </div>
        </div>
        {/* Button to confirm action and end the circuit of the system */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#0075B1",
            width: "12rem",
            height: "2.5rem",

            "&:hover": {
              backgroundColor: "#0075B1",
            },
          }}
          startIcon={
            <AddRounded />
          }
          onClick={saveAta}
        >
          Gerar nova ata
        </Button>
      </div>
    </div>
  );
}
