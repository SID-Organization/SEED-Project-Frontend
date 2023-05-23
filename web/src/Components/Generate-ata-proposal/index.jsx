import { Badge, Box, Divider, FormControl, MenuItem } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";

// MUI
import Select from "@mui/material/Select";
import MuiButton from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import PublicIcon from "@mui/icons-material/Public";
import PublicOffIcon from "@mui/icons-material/PublicOff";

// Comoponents
import ProposalCard from "../Proposal-card";

// Utils
import ReactQuillUtils from "../../utils/ReactQuill-Utils";
const { quillModules, removeHTML } = ReactQuillUtils;

export default function fsdGenerateAtaProposal(props) {
  const [parecerComissao, setParecerComissao] = useState("");
  const [publicada, setPublicada] = useState(false);
  const [naoPublicada, setNaoPublicada] = useState(false);
  // HTML editor
  const [quillHtmlConsideration, setQuillHtmlConsideration] = useState("");

  function formatParecerComissao(parecerComissao) {
    let txtToUpper = parecerComissao.toUpperCase();
    let cleanedTxt = txtToUpper.replace(/Ç/g, 'C').replace(/Õ/g, 'O').replace(/ /g, "_");

    return cleanedTxt;
  }


  function updateDecision() {
    if (!props.finalDecision) return;
    const newFinalDecision = { ...props.finalDecision };
    console.log(newFinalDecision);
    // newFinalDecision.propostaPropostaLog.idProposta = props.proposal.idProposta;
    newFinalDecision.parecerComissaoPropostaLog = formatParecerComissao(parecerComissao);
    newFinalDecision.consideracoesPropostaLog = removeHTML(quillHtmlConsideration);
    newFinalDecision.idDemanda = props.proposal.idDemanda;

    if (!props.isAtaForDG)
      newFinalDecision.tipoAtaPropostaLog = publicada ? "PUBLICADA" : naoPublicada ? "NAO_PUBLICADA" : "";

    
    props.setFinalDecision(newFinalDecision);
  }

  useEffect(() => {
    updateDecision();
  }, [parecerComissao, publicada, naoPublicada, quillHtmlConsideration]);

  const style = { height: 100, width: 500 };

  const actionsComission = [
    {
      action: "Aprovado",
    },
    {
      action: "Reprovado",
    },
    {
      action: "Mais informações",
    },
    {
      action: "Business Case",
    },
  ];

  const actionsDG = [
    {
      action: "Aprovado",
    },
    {
      action: "Reprovado",
    },
  ]

  const getActions = () => {
    if (props.isAtaForDG) return actionsDG;
    return actionsComission;
  }

  const getBadgeColor = (action) => {
    switch (action) {
      case 'Aprovado': return 'success'
      case 'Reprovado': return 'error'
      case 'Mais informações': return 'warning'
      default: return 'info'
    }
  }

  const Button = styled(MuiButton)({
    height: 50,
    width: 150,
    border: "1px solid #000",
  });

  return (
    <div>
      <div className="grid justify-center">
        <div className="w-[65rem]">
          <ProposalCard
            proposalId={props.proposal.idProposta}
            newPauta={true}
            title={props.proposal.demandaPropostaTitulo}
            executionTime={props.proposal.tempoExecucaoDemanda}
            value={props.proposal.valorDemanda}
            referenceDemand={props.proposal.idDemanda}
          />
        </div>
        <div
          className="
          md:grid md:grid-cols-2 md:gap-4 md:mt-5
          mt-5
          
        "
        >
          <div className="grid">
            <p className="font-roboto font-bold">Parecer da {props.isAtaForDG ? "DG" : "comissão"}</p>
            <Box sx={{ minWidth: 120 }}>
              <FormControl
                fullWidth
                sx={{
                  width: 200,
                }}
              >
                <Select
                  sx={{
                    height: 40,
                  }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={parecerComissao}
                  onChange={(e) => setParecerComissao(e.target.value)}
                  onBlur={updateDecision}
                >
                  {getActions().map((action, i) => (
                    <MenuItem key={i} value={action.action}>
                      {action.action}
                      <Badge
                        color={getBadgeColor(action.action)}
                        variant="dot"
                        sx={{
                          ml: 1.5,
                        }}
                      />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </div>
          <div className="grid">
            <p className="font-roboto font-bold">Considerações</p>
            <ReactQuill
              value={quillHtmlConsideration}
              onChange={(e) => setQuillHtmlConsideration(e)}
              // onBlur={updateDecision}
              modules={quillModules}
              style={style}
            />
          </div>
          {!props.isAtaForDG ? <div className="grid">
            <p className="font-roboto font-bold mb-2">
              Assunto registrado em ata
            </p>
            <div className="flex gap-2 mb-10">
              <Button
                sx={{
                  height: 40,
                  width: 150,
                  border: publicada ? "1px solid #023A67" : "1px solid #000",
                  color: publicada ? "#fff" : "#000",
                  backgroundColor: publicada ? "#0075B1" : "#fff",

                  "&:hover": {
                    backgroundColor: publicada ? "#0075B1" : "#fff",
                  },
                }}
                onClick={() => {
                  setPublicada(!publicada);
                  setNaoPublicada(false);
                }}
                variant={publicada ? "contained" : "outlined"}
                startIcon={
                  <PublicIcon sx={{ color: publicada ? "#fff" : "#000" }} />
                }
              >
                Publicada
              </Button>
              <Button
                onClick={() => {
                  setNaoPublicada(!naoPublicada);
                  setPublicada(false);
                }}
                sx={{
                  height: 40,
                  width: 180,
                  border: publicada ? "1px solid #023A67" : "1px solid #000",
                  color: naoPublicada ? "#fff" : "#000",
                  backgroundColor: naoPublicada ? "#0075B1" : "#fff",

                  "&:hover": {
                    backgroundColor: naoPublicada ? "#0075B1" : "#fff",
                  },
                }}
                variant={naoPublicada ? "contained" : "outlined"}
                startIcon={
                  <PublicOffIcon
                    sx={{ color: naoPublicada ? "#fff" : "#000" }}
                  />
                }
              >
                Não publicada
              </Button>
            </div>
          </div>
            : (
              <div className="h-28" />
            )}
        </div>
      </div>
      <Divider
        sx={{
          marginLeft: 30,
          marginRight: 30,
          marginBottom: 5,
        }}
      />
    </div>
  );
}
