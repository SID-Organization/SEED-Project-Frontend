import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

// MUI
import { AddRounded, Download, Clear } from "@mui/icons-material";
import { Button, Tooltip, TextField } from "@mui/material";

// Components
import GenerateAtaProposal from "../../../Components/Generate-ata-proposal";

// Services
import AtaService from "../../../service/Ata-Service";
import PautaService from "../../../service/Pauta-Service";
import DemandLogService from "../../../service/DemandLog-Service";
import ProposalService from "../../../service/Proposal-Service";

// Utils
import AtaUtils from "../../../utils/Ata-Utils";
import DemandService from "../../../service/Demand-Service";
import ProposalUtils from "../../../utils/Proposal-Utils";
import AtaDGService from "../../../service/AtaDG-Service";

export default function GenerateAta(props) {
  // ID da pauta para Generate ATA
  // ID da ata para Generate ATA DG
  const params = useParams("id");
  const navigate = useNavigate();

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

  // Formata a decisão final para o formato de Ata DG
  function formatFinalDecisionToAtaDG(finalDecision) {
    const newFinalDecision = {
      idAta: params.id,
      numeroAtaDG: numDgAta,
      idPropostaLog: finalDecision.propostaPropostaLog.idProposta,
      parecerDGPropostaLog: finalDecision.parecerComissaoPropostaLog,
      consideracoesParecerDGPropostaLog: finalDecision.consideracoesPropostaLog,
    }
    return newFinalDecision;
  }

  // Faz a verificação dos campos obrigatórios
  function verificarAta() {
    if (numDgAta == 0) {
      alert("Número DG Ata não pode ser nulo");
      return false;
    }

    for (let fd of finalDecisions) {
      if (!AtaUtils.isFinalDecisionValid(fd)) {
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

    if (!props.isAtaForDG && !verificarAta()) return;

    // Creates ata JSON, and removes idDemanda from finalDecisions
    const ata = {
      pautaAta: {
        idPauta: params.id,
      },
      propostasLog: finalDecisions.map((fd) => { delete fd.idDemanda; return fd; }),
    };

    const form = new FormData();

    console.log("ATA", ata);

    form.append("ata", JSON.stringify(ata));
    form.append("documentoAprovacao", finalDecisionFile);

    if (!props.isAtaForDG) {
      AtaService.createAta(form).then((response) => {
        if (response.status == 201) {
          updateEachDemand(false)
          alert("Ata gerada com sucesso")
          navigate("/atas")
        };
      });
    } else {
      console.log("FINAL DECISIONS DG", finalDecisions)
      const decisions = finalDecisions.map(fd => {
        const finalDecision = formatFinalDecisionToAtaDG(fd)
        return finalDecision;
      })

      AtaService.updateProposalsLogs(decisions).then(res => {
        if ([200, 201].includes(res.status))
          updateEachDemand(true)
      });

    }


  }

  const formatParecerToDemandStatus = (status, isForDG) => {
    switch (status) {
      case "APROVADO":
        return isForDG ? "APROVADA_EM_DG" : "APROVADA_EM_COMISSAO";
      case "REPROVADO":
        return "CANCELADA";
      case "MAIS INFORMACOES":
        return "BUSINESS_CASE";
      case "BUSINESS CASE":
        return "BUSINESS_CASE";
    }
  }

  const getCorrectId = (proposal) => {
    return props.isAtaForDG ? proposal.idPropostaLog : proposal.idProposta
  }

  const updateEachDemand = (isForDG = false) => {
    finalDecisions.forEach((fd) => {
      // const proposal = await ProposalService.getProposalById(fd.propostaPropostaLog.idProposta);
      const demandId = fd.idDemanda;
      if (!isForDG) {
        DemandLogService.createDemandLog("APROVACAO_DG", demandId, "Aprovar", 72131).then(res => {
          if (res.status == 201 || res.status == 200) {
            DemandService.updateDemandStatus(demandId, formatParecerToDemandStatus(fd.parecerComissaoPropostaLog, isForDG));
          }
        })
      } else {
        // console.log("EXECUCAO_PROPOSTA", demandId, "Aprovar", 72131);
        // console.log(demandId, formatStatusToDemand(fd.parecerComissaoPropostaLog, isForDG));
        DemandLogService.createDemandLog("EXECUCAO_PROPOSTA", demandId, "Aprovar", 72131).then(res => {
          if (res.status == 201 || res.status == 200) {
            DemandService.updateDemandStatus(demandId, formatParecerToDemandStatus(fd.parecerComissaoPropostaLog, isForDG));
          }
        })
      }

    })
  }

  // On component mount get proposals from pauta or ata
  useEffect(() => {
    if (!props.isAtaForDG) {
      // Proposal ID
      PautaService.getPautaProposalsById(params.id).then((proposals) => {
        setProposals(proposals);
      });
    } else {
      // Ata ID
      AtaService.getAtaById(params.id).then(ata => {
        setProposals(ProposalUtils.formatLogProposalsToProposals(ata.propostasLog));
        setNumDgAta(ata.numeroDgAta);
      })
    }
  }, []);

  // Cria um array de decisões finais com base nas propostas
  useEffect(() => {
    if (proposals.length > 0) {
      const finalDecisions = proposals.map((proposal) => {
        const fd = {
          ...proposalFinalDecisionTemplate,
          propostaPropostaLog: { idProposta: getCorrectId(proposal) },
        }
        return fd;
      });
      console.log("Final decisions", finalDecisions);
      setFinalDecisions(finalDecisions);
    }
  }, [proposals]);

  useEffect(() => {
    console.log("Final decisions", finalDecisions);
    console.log("Proposals", proposals);
  }, [proposals, finalDecisions])

  return (
    <div className="grid items-center">
      <div className="mb-8 flex justify-center">
        <div className="flex-1"></div>
        <div className="flex flex-1 flex-col items-center justify-center">
          <h1 className="mt-10 text-3xl font-bold text-blue-weg">
            Geração de ata {props.isAtaForDG && "para DG"}
          </h1>
          <p className="mt-4 text-blue-weg">{props.isAtaForDG ? "Ata" : "Pauta"} referência: {params.id}</p>
        </div>
        <div className="flex flex-1 items-end">
          {props.isAtaForDG && (
            <>
              <p className="text-light-blue-weg">Número ata DG:</p>
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="small"
                type="number"
                value={numDgAta}
                placeholder="000"
                onChange={(e) => {
                  const value = e.target.value;

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
            </>
          )}
        </div>
      </div>
      <div className="grid">
        {proposals && proposals.map((proposal, i) => (
          <GenerateAtaProposal
            key={i}
            proposal={proposal}
            isAtaForDG={props.isAtaForDG}
            proposalIndex={i}
            finalDecision={finalDecisions.find(
              (fd) =>
                fd.propostaPropostaLog.idProposta == getCorrectId(proposal)
            )}
            setFinalDecision={(newFinalDecision) =>
              updateFinalDecision(getCorrectId(proposal), newFinalDecision)
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
