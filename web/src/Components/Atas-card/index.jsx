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

// MUI Styled Components
const Accordion = styled(MuiAccordion)(() => ({
  width: "62.5rem",
  border: "2px solid #E5E5E5",
  borderBottom: "none",
}));

export default function PautasCard(props) {

  const navigate = useNavigate();

  const openAtaPDF = () => {
    AtaService.openAtaPDF(props.idAta);
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
                Qtd. Propostas:{" "}
                <span className="font-normal text-[#707070]">
                  {props.qtyProposals}
                </span>
              </h1>
              <h1 className="font-bold">
                Data da reunião:{" "}
                <span className="font-normal text-[#707070]">
                  {props.meetingDate}
                </span>
              </h1>
              <h1 className="font-bold">
                Horário:{" "}
                <span className="font-normal text-[#707070]">
                  {props.meetingTime}
                </span>
              </h1>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center justify-center">
                <p className="mt-5 font-bold">
                  Analista responsável:{" "}
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
                  Gerar ATA DG
                </Button>
              </div>
              <div className="flex items-end justify-center gap-3">
                <p className="font-bold">Visualizar Ata: </p>
                <Tooltip title="Publicada">
                  <IconButton
                    onClick={openAtaPDF}
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
                <Tooltip title="Não publicada">
                  <IconButton
                    onClick={openAtaPDF}
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
