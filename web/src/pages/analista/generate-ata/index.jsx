import { useEffect, useState } from "react";
import { useParams } from "react-router";

// MUI
import { AddRounded, Download, Clear } from "@mui/icons-material";
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
  const [numDgAta, setNumDgAta] = useState();
  const [clearFile, setClearFile] = useState(false);

  const proposalFinalDecisionTemplate = {
    propostaPropostaLog: { idProposta: 0 },
    parecerComissaoPropostaLog: "",
    consideracoesPropostaLog: "",
    tipoAtaPropostaLog: "",
  };

  // Atualiza a decisão final de uma proposta
  function updateFinalDecision(proposalId, newFinalDecision) {
    const decisions = finalDecisions.map((decision) => {
      if (decision.propostaPropostaLog.idProposta == proposalId) {
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
      return false;
    }

    for (let fd of finalDecisions) {
      if (AtaUtils.isFinalDecisionValid(fd) == false) {
        alert("Parecer Comissão, Considerações e Tipo Ata são obrigatórios");
        return false;
      }
    }

    if (finalDecisionFile == undefined) {
        alert("Você não selecionou um arquivo de decisão final. Por favor, anexe um!")
        return false;
    }
    return true;
  }

  // Salva a ata no banco de dados
  function saveAta() {
    if (!verificarAta()) return;

    const ata = {
      numeroDgAta: numDgAta,
      pautaAta: {
        idPauta: id,
      },
      propostasLog: finalDecisions,
    };

    console.log("NEW ATA", ata);

    const form = new FormData();

    form.append("ata", JSON.stringify(ata));
    form.append("documentoAprovacao", finalDecisionFile);

    AtaService.createAta(form).then((response) => {
      if (response.status == 201) alert("Ata gerada com sucesso");
    });
  }

  useEffect(() => {
    PautaService.getPautaProposalsById(id).then((proposals) => {
      setProposals(proposals);
    });
  }, []);

  // Cria um array de decisões finais com base nas propostas
  useEffect(() => {
    if (proposals.length > 0) {
      const finalDecisions = proposals.map((proposal) => {
        return {
          ...proposalFinalDecisionTemplate,
          propostaPropostaLog: { idProposta: proposal.idProposta },
        };
      });
      setFinalDecisions(finalDecisions);
    }
  }, [proposals]);

  return (
    <div className="grid items-center">
      <div className="mb-8 flex justify-center">
        <div className="flex-1"></div>
        <div className="flex flex-1 flex-col items-center justify-center">
          <h1 className="mt-10 text-3xl font-bold text-blue-weg">
            Geração de ata
          </h1>
          <p className="mt-4 text-blue-weg">Pauta referência: {id}</p>
        </div>
        <div className="flex flex-1 items-end">
          <p className="text-light-blue-weg">Número DG ata:</p>
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            type="number"
            value={numDgAta}
            placeholder="000"
            onChange={(e) => {
              const value = e.target.value;
              console.log("VALUE", value)
              if (isNaN(value) || value == "")
                setNumDgAta("");

              if (e.target.value.match(/^[0-9]+$/))
                setNumDgAta(e.target.value)
            }}
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
            finalDecision={finalDecisions.find(
              (fd) =>
                fd.propostaPropostaLog.idProposta == proposal.idProposta
            )}
            setFinalDecision={(newFinalDecision) =>
              updateFinalDecision(proposal.idProposta, newFinalDecision)
            }
          />
        ))}
      </div>
      <div className="mb-5 mr-10 flex items-center justify-end">
        <div
          className="mr-28 flex items-center"
          onMouseEnter={() => setClearFile(true)}
          onMouseLeave={() => setClearFile(false)}
        >
          {clearFile && finalDecisionFile != undefined && (
            <Clear
              sx={{
                color: "#0075B1",
                cursor: "pointer",
              }}
              onClick={() => setFinalDecisionFile(undefined)}
            />
          )}
          <div className="w-36">
            {finalDecisionFile && (
              <Tooltip title={finalDecisionFile.name}>
                <p className="text-blue-weg">
                  {finalDecisionFile.name.length > 13
                    ? finalDecisionFile.name.slice(0, 13) + "..."
                    : finalDecisionFile.name}
                </p>
              </Tooltip>
            )}
          </div>

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
          startIcon={<AddRounded />}
          onClick={saveAta}
        >
          Gerar nova ata
        </Button>
      </div>
    </div>
  );
}
