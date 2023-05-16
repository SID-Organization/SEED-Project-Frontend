import { useState, useEffect } from "react";
import * as React from "react";

// MUI
import { styled } from "@mui/material/styles";
import PublicIcon from "@mui/icons-material/Public";
import MuiAccordion from "@mui/material/Accordion";
import PublicOffIcon from "@mui/icons-material/PublicOff";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Divider, IconButton, Tooltip } from "@mui/material";


// Components
import ProposalCard from "../Proposal-card";

export default function PautasCard(props) {
  const Accordion = styled(MuiAccordion)(() => ({
    width: "62.5rem",
    border: "2px solid #E5E5E5",
    borderBottom: "none",
  }));

  useEffect(() => {
    
  }, [])

  const proposalsMock = [
    {
      newPauta: false,
      title: "Automatização do processoaaaaa",
      executionTime: 10.0,
      value: 10.0,
      referenceDemand: "Demanda 2",
      ResponsibleAnalyst: "Analista 1",
      published: true,
      atasCard: true,
      parecerComissao: "Aprovado",
      proposalId: 1,
    },
    {
      newPauta: false,
      title: "Automatização do processo",
      executionTime: 10.0,
      value: 10.0,
      referenceDemand: "Demanda 2",
      ResponsibleAnalyst: "Analista 1",
      published: false,
      atasCard: true,
      parecerComissao: "Reprovado",
      proposalId: 2,
    },
  ];

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
                  {props.QtyProposals}
                </span>
              </h1>
              <h1 className="font-bold">
                Data da reunião:{" "}
                <span className="font-normal text-[#707070]">
                  {props.MeetingDate}
                </span>
              </h1>
              <h1 className="font-bold">
                Horário:{" "}
                <span className="font-normal text-[#707070]">
                  {props.MeetingTime}
                </span>
              </h1>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center justify-center">
                <p className="mt-5 font-bold">
                  Analista responsável:{" "}
                  <span className="font-normal text-[#707070]">
                    {props.ResponsibleAnalyst}
                  </span>
                </p>
              </div>
              <div className="flex items-end justify-center gap-3">
                <p className="font-bold">Visualizar Ata: </p>
                <Tooltip title="Publicada">
                  <IconButton
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
            {proposalsMock.map((proposal, i) => (
              <ProposalCard
                key={i}
                atasCard={proposal.atasCard}
                newPauta={proposal.newPauta}
                title={proposal.title}
                executionTime={proposal.executionTime}
                value={proposal.value}
                referenceDemand={proposal.referenceDemand}
                published={proposal.published}
                parecerComissao={proposal.parecerComissao}
                proposalId={proposal.proposalId}
              />
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
