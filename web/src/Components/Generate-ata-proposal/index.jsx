import { Badge, Box, Divider, FormControl, MenuItem } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
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
import TranslationJson from "../../API/Translate/components/generateAtaProposal.json";
import TranslateUtils from "../../utils/Translate-Utils/index.js";
import { TranslateContext } from "../../contexts/translate/index.jsx";
const { quillModules, removeHTML } = ReactQuillUtils;

export default function GenerateAtaProposal(props) {
  const translate = TranslationJson;
  const [language] = useContext(TranslateContext);

  const [parecerComissao, setParecerComissao] = useState("");
  const [publicada, setPublicada] = useState(false);
  const [naoPublicada, setNaoPublicada] = useState(false);
  // HTML editor
  const [quillHtmlConsideration, setQuillHtmlConsideration] = useState("");

  function formatParecerComissao(parecerComissao) {
    let txtToUpper = parecerComissao.toUpperCase();
    let cleanedTxt = txtToUpper
      .replace(/Ç/g, "C")
      .replace(/Õ/g, "O")
      .replace(/ /g, "_");

    return cleanedTxt;
  }

  function updateDecision() {
    if (!props.finalDecision) return;
    const newFinalDecision = { ...props.finalDecision };
    console.log(newFinalDecision);
    // newFinalDecision.propostaPropostaLog.idProposta = props.proposal.idProposta;
    newFinalDecision.parecerComissaoPropostaLog =
      formatParecerComissao(parecerComissao);

    console.log("FINAL DECISION", props.finalDecision);

    newFinalDecision.consideracoesPropostaLog = removeHTML(
      quillHtmlConsideration
    );
    newFinalDecision.idDemanda = props.proposal.idDemanda;

    if (!props.isAtaForDG)
      newFinalDecision.tipoAtaPropostaLog = publicada
        ? "PUBLICADA"
        : naoPublicada
        ? "NAO_PUBLICADA"
        : "";

    props.setFinalDecision(newFinalDecision);
  }

  useEffect(() => {
    updateDecision();
  }, [parecerComissao, publicada, naoPublicada]);

  const style = { height: 100, width: 500 };

  const actionsComission = [
    {
      action: translate["Aprovado"][language] ?? "Aprovado",
    },
    {
      action: translate["Reprovado"][language] ?? "Reprovado",
    },
    {
      action: translate["Mais informações"][language] ?? "Mais informações",
    },
    {
      action: "Business Case",
    },
  ];

  const actionsDG = [
    {
      action: translate["Aprovado"][language] ?? "Aprovado",
    },
    {
      action: translate["Reprovado"][language] ?? "Reprovado",
    },
  ];

  const getActions = () => {
    if (props.isAtaForDG) return actionsDG;
    return actionsComission;
  };

  const getBadgeColor = (action) => {
    switch (action) {
      case translate["Aprovado"][language] ?? "Aprovado":
        return "success";
      case translate["Reprovado"][language] ?? "Reprovado":
        return "error";
      case translate["Mais informações"][language] ?? "Mais informações":
        return "warning";
      default:
        return "info";
    }
  };

  const Button = styled(MuiButton)({
    height: 50,
    width: 150,
    border: "1px solid #000",
  });

  return (
    <div>
      <div className="grid justify-center">
        <div className="flex w-[65rem] justify-center">
          <ProposalCard
            proposalId={props.proposal.idProposta}
            title={props.proposal.demandaPropostaTitulo}
            executionTime={
              props.isAtaForDG
                ? props.proposal.tempoExecucaoDemanda
                : props.proposal.tempoDeExecucaoDemanda
            }
            value={props.proposal.valorDemanda}
            referenceDemand={props.proposal.idDemanda}
            largeCard={true}
          />
        </div>
        <div
          className="
          mt-5 md:mt-5 md:grid md:grid-cols-2
          md:gap-4
          
        "
        >
          <div className="grid">
            <p className="font-roboto font-bold">
              {translate[`Parecer da ${props.isAtaForDG ? "DG" : "comissão"}`][
                language
              ] ?? `Parecer da ${props.isAtaForDG ? "DG" : "comissão"}`}
            </p>
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
                      <Badge
                        color={getBadgeColor(action.action)}
                        variant="dot"
                        sx={{
                          marginRight: 1.5,
                        }}
                      />
                      {action.action}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </div>
          <div className="grid">
            <p className="font-roboto font-bold">
              {translate["Considerações"][language] ?? "Considerações"}
            </p>
            <ReactQuill
              value={quillHtmlConsideration}
              onChange={(e) => setQuillHtmlConsideration(e)}
              onBlur={updateDecision}
              modules={quillModules}
              style={style}
            />
          </div>
          {!props.isAtaForDG ? (
            <div className="grid">
              <p className="mb-2 font-roboto font-bold">
                {translate["Assunto registrado em ata"][language] ??
                  "Assunto registrado em ata"}
              </p>
              <div className="mb-10 flex gap-2">
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
                  {translate["Publicada"][language] ?? "Publicada"}
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
                  {translate["Não publicada"][language] ?? "Não publicada"}
                </Button>
              </div>
            </div>
          ) : (
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
