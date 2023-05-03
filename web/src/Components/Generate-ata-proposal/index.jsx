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
const { quillModules } = ReactQuillUtils;

export default function GenerateAtaProposal(props) {
  const [parecerComissao, setParecerComissao] = useState("");
  const [considerations, setConsiderations] = useState("");
  const [publicada, setPublicada] = useState(false);
  const [naoPublicada, setNaoPublicada] = useState(false);
  // HTML editor
  const [quillValue, setQuillValue] = useState("");
  const parecerRef = useRef();
  
  function formatParecerComissao(parecerComissao) {
    switch (parecerComissao) {
      case "Aprovado":
        return "APROVADO";
      case "Reprovado":
        return "REPROVADO";
      case "Mais informações":
        return "MAIS_INFORMACOES";
      case "Business Case":
        return "BUSINESS_CASE";
      default:
        return "";
    }
  }


  function updateDecision() {
    if (!props.finalDecision) return;
    const newFinalDecision = props.finalDecision;
    newFinalDecision.propostaPropostaLogDTO.idProposta = props.proposal.idProposta;
    newFinalDecision.parecerComissaoPropostaLogDTO = formatParecerComissao(parecerComissao);
    newFinalDecision.consideracoesPropostaLogDTO = ReactQuillUtils.formatQuillText(considerations);
    newFinalDecision.tipoAtaPropostaLogDTO = publicada ? "PUBLICADA" : naoPublicada ? "NAO_PUBLICADA" : "";
    props.setFinalDecision(newFinalDecision);
  }

  useEffect(() => {
    updateDecision();
  }, [parecerComissao, considerations, publicada, naoPublicada]);

  const style = { height: 100, width: 500 };

  const actionsParecerComissao = [
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
            <p className="font-roboto font-bold">Parecer da comissão</p>
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
                >
                  {actionsParecerComissao.map((action, i) => (
                    <MenuItem key={i} value={action.action}>
                      {action.action}
                      <Badge
                        color={
                          action.action === "Aprovado"
                            ? "success"
                            : action.action === "Reprovado"
                              ? "error"
                              : action.action === "Mais informações"
                                ? "warning"
                                : "info"
                        }
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
              value={quillValue}
              onChange={(e) => {
                setQuillValue(e);
                const text = parecerRef.current?.getEditor()?.getText();
                setConsiderations(text);
              }}
              modules={quillModules}
              style={style}
              ref={parecerRef}
            />
          </div>
          <div className="grid">
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
