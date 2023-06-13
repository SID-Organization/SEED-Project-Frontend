import * as React from "react";

// MUI
import { styled } from "@mui/material/styles";
import PublicIcon from "@mui/icons-material/Public";
import MuiAccordion from "@mui/material/Accordion";
import PublicOffIcon from "@mui/icons-material/PublicOff";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Button, Divider, IconButton, Tooltip } from "@mui/material";

// Service
import AtaService from "../../service/Ata-Service";


// Components
import ProposalCard from "../Proposal-card";
import { useNavigate } from "react-router";

//Translation
import TranslationJson from "../../API/Translate/components/atasCard.json";
import { useContext } from "react";
import { TranslateContext } from "../../contexts/translate/index.jsx";

// MUI Styled Components
const Accordion = styled(MuiAccordion)(() => ({
  width: "62.5rem",
  border: "2px solid #E5E5E5",
  borderBottom: "none",
}));

export default function PautasCard(props) {

  const translate = TranslationJson;
  const [ language ] = useContext(TranslateContext);

  const navigate = useNavigate();

  const openAtaPDF = (tipo) => {
    AtaService.openAtaPDF(props.idAta, tipo);
  }

  const generateAtaDG = () => {
    navigate("/atas/gerar-ata-dg/" + props.idAta);
  }

  return (
    <div className="mt-5">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className="grid font-roboto">
            <div className="flex gap-32">
              <h1 className="font-bold">{"ATA " + props.idAta}</h1>
              <h1 className="font-bold">
                {translate["Qtd. Propostas"]?.[language] ?? "Qtd. Propostas"}:{" "}
                <span className="font-normal text-[#707070]">
                  {props.qtyProposals}
                </span>
              </h1>
              <h1 className="font-bold">
                {translate["Data da reunião"]?.[language] ?? "Data da reunião"}:{" "}
                <span className="font-normal text-[#707070]">
                  {props.meetingDate}
                </span>
              </h1>
              <h1 className="font-bold">
                {translate["Horário"]?.[language] ?? "Horário"}:{" "}
                <span className="font-normal text-[#707070]">
                  {props.meetingTime}
                </span>
              </h1>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center justify-center">
                <p className="mt-5 font-bold">
                  {translate["Analista responsável"]?.[language] ?? "Analista responsável"}:{" "}
                  <span className="font-normal text-[#707070]">
                    {props.responsibleAnalyst}
                  </span>
                </p>
              </div>
              <div className="flex items-end">
                <Button
                  onClick={generateAtaDG}
                  variant="contained"
                  sx={{
                    backgroundColor: "#FFF",
                    color: "#0075B1",
                    fontWeight: "bold",
                    border: "#0075B1 solid 1px",
                    fontSize: 10,

                    "&:hover": {
                      backgroundColor: "#f3f3f3",
                    },
                  }}
                >
                  {translate["Gerar Ata DG"]?.[language] ?? "Gerar Ata DG"}
                </Button>
              </div>
              <div className="flex items-end justify-center gap-3">
                <p className="font-bold">{translate["Visualizar Ata:"]?.[language] ?? "Visualizar Ata:"} </p>
                <Tooltip title={translate["Publicada"]?.[language] ?? "Publicada"}>
                  <IconButton
                    onClick={() => openAtaPDF("publicada")}
                    sx={{
                      padding: "0px",
                    }}
                  >
                    <PublicIcon
                      sx={{
                        color: "#0075B1",
                        transition: "0.3s",

                        "&:hover": {
                          color: "#008bd1",
                        },
                      }}
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip title={translate["Não publicada"]?.[language] ?? "Não publicada"}>
                  <IconButton
                    onClick={() => openAtaPDF("nao-publicada")}
                    sx={{
                      padding: "0",
                    }}
                  >
                    <PublicOffIcon
                      sx={{
                        color: "#0075B1",
                        transition: "0.3s",

                        "&:hover": {
                          color: "#008bd1",
                        },
                      }}
                    />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </div>
        </AccordionSummary>
        <Divider />
        <AccordionDetails>
          <div className="grid gap-5">
            {props.proposals.map((proposal, i) => (
              <ProposalCard
                key={i}
                atasCard={true}
                newPauta={false}
                title={proposal.demandaTituloPropostaLog}
                executionTime={proposal.demandaTempoExecucaoPropostaLog}
                value={proposal.demandaValorPropostaLog}
                referenceDemand={proposal.idPropostaLog}
                published={proposal.tipoAtaPropostaLog}
                parecerComissao={proposal.parecerComissaoPropostaLog}
                proposalId={proposal.idPropostaLog}
              />
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
