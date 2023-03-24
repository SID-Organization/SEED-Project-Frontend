import { useEffect, useState } from "react";
import { useParams } from "react-router";

// MUI
import { AddRounded, Download } from "@mui/icons-material";
import { Button, Tooltip, TextField } from "@mui/material";

// Components
import GenerateAtaProposal from "../../../Components/Generate-ata-proposal";

// Services
import PautaService from "../../../service/Pauta-Service";

export default function GenerateAta() {
  const { id } = useParams("id");
  const [proposals, setProposals] = useState([]);
  const [finalDecisions, setFinalDecisions] = useState([]);
  const [finalDecisionFile, setFinalDecisionFile] = useState();

  const proposalFinalDecisionTemplate = {
    propostaPropostaLogDTO: { idProposta: 0 },
    parecerComissaoPropostaLogDTO: "",
    consideracoesPropostaLogDTO: "",
    tipoAtaPropostaLogDTO: "",
  }

  useEffect(() => {
    if(finalDecisions.length > 0) {
      console.log(finalDecisions);
    }
  }, [finalDecisions]);


  /**
   * {
    "numeroDgAta": 2,
    "pautaAta": {
        "idPauta": 7
    },
    "propostasLogDTO": [
        {
            "propostaPropostaLogDTO": {"idProposta": 4},
            "parecerComissaoPropostaLogDTO": "APROVADO",
            "consideracoesPropostaLogDTO": "Muito boa",
            "tipoAtaPropostaLogDTO": "PUBLICADA"
        }
    ]
}
   */

  useEffect(() => {
    PautaService.getPautaProposalsById(id)
      .then((proposals) => {
        setProposals(proposals);
      });
  }, []);

  useEffect(() => {
    if(proposals.length > 0) {
      const finalDecisions = proposals.map((proposal) => {
        return proposalFinalDecisionTemplate;
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
            finalDecision={finalDecisions[i]}
            setFinalDecisions={setFinalDecisions}
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
        >
          Gerar nova ata
        </Button>
      </div>
    </div>
  );
}
