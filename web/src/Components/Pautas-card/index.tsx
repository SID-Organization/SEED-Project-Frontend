import * as React from "react";
import { useState } from "react";

import MuiAccordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import MuiButton from "@mui/material/Button";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Divider, Icon, IconButton, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiIconButton from "@mui/material/IconButton";
import ProposalCard from "../Proposal-card";

import MuiEditRoundedIcon from "@mui/icons-material/EditRounded";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import MuiVisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import MuiMailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import MuiWhatsAppIcon from "@mui/icons-material/WhatsApp";
import MuiLinkIcon from "@mui/icons-material/Link";
import MuiDownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import { Link } from "react-router-dom";

interface PautaCardProps {
  PautaName: string;
  QtyProposals: number;
  MeetingDate: string;
  MeetingTime: string;
  ResponsibleAnalyst: string;
  isInTheModalAddToAPauta?: boolean;
}

export default function PautasCard(props: PautaCardProps) {
  const [shareModal, setShareModal] = useState(false);
  const handleOpenShareModal = () => setShareModal(true);
  const handleCloseShareModal = () => setShareModal(false);

  const IconButton = styled(MuiIconButton)(({ theme }) => ({
    width: "100%",
    height: "100%",
  }));

  const EditRoundedIcon = styled(MuiEditRoundedIcon)({
    color: "#707070",
    cursor: "pointer",
    transition: "0.2s",

    "&:hover": {
      color: "#00A3FF",
    },
  });

  const VisibilityRoundedIcon = styled(MuiVisibilityRoundedIcon)({
    color: "#707070",
    cursor: "pointer",
    transition: "0.2s",

    "&:hover": {
      color: "#00A3FF",
    },
  });

  const DownloadRoundedIcon = styled(MuiDownloadRoundedIcon)({
    color: "#000",
  });

  const LinkIcon = styled(MuiLinkIcon)({
    color: "#000",
  });

  const WhatsAppIcon = styled(MuiWhatsAppIcon)({
    color: "#000",
  });

  const MailOutlineRoundedIcon = styled(MuiMailOutlineRoundedIcon)({
    color: "#000",
  });

  const modalStyleShare = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
    fontFamily: "Roboto",
  };

  const Accordion = styled(MuiAccordion)(() => ({
    width: "62.5rem",
    border: "2px solid #E5E5E5",
    borderBottom: "none",
  }));

  const Button = styled(MuiButton)(() => ({
    backgroundColor: "#0075B1",
    height: "2rem",

    "&:hover": {
      backgroundColor: "#0075B1",
    },
  }));

  const proposalsMock = [
    {
      newPauta: false,
      title: "Automatização do processo",
      executionTime: 10.0,
      value: 10.0,
      referenceDemand: "Demanda 2",
      ResponsibleAnalyst: "Analista 1",
    },
    {
      newPauta: false,
      title: "Automatização do processo",
      executionTime: 10.0,
      value: 10.0,
      referenceDemand: "Demanda 2",
      ResponsibleAnalyst: "Analista 1",
    },
  ];

  return (
    <div className="mt-5">
      {props.isInTheModalAddToAPauta ? (
        <div
          className="w-[40rem] h-[7rem] bg-[#FFF] shadow-xl rounded-md border-light-blue-weg border-2
          cursor-pointer hover:bg-[#F5F5F5] transition
        "
        >
          <div className="grid font-roboto">
            <div className="flex justify-around mt-2">
              <h1 className="font-bold">{props.PautaName}</h1>
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
            </div>
            <div className="flex justify-between">
              <div className="flex justify-center items-center mt-12 ml-4">
                <h1 className="font-bold">
                  Analista responsável:{" "}
                  <span className="font-normal text-[#707070]">
                    {props.ResponsibleAnalyst}
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      ) : (
        //ACABOUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <div className="grid font-roboto">
              <div className="flex justify-center gap-28">
                <h1 className="font-bold">{props.PautaName}</h1>
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
                <div className="flex justify-center items-center">
                  <h1 className="mt-5 font-bold">
                    Analista responsável:{" "}
                    <span className="font-normal text-[#707070]">
                      {props.ResponsibleAnalyst}
                    </span>
                  </h1>
                </div>
                <div className="flex justify-center items-center gap-5 mt-5">
                  <Tooltip title="Compartilhar pauta">
                    <h1
                      className="
                cursor-pointer
                text-light-blue-weg
                hover:underline
                "
                      onClick={handleOpenShareModal}
                    >
                      <div className="flex justify-center items-center">
                        Compartilhar pauta
                        <ReplyRoundedIcon />
                      </div>
                    </h1>
                  </Tooltip>
                  <Tooltip title="Visualizar pauta">
                    <VisibilityRoundedIcon />
                  </Tooltip>
                  <Tooltip title="Editar pauta">
                    <EditRoundedIcon />
                  </Tooltip>
                  <Tooltip title="Gerar ATA">
                    <Link to="gerar-ata/:id">
                      <Button variant="contained">Gerar ATA</Button>
                    </Link>
                  </Tooltip>
                </div>
              </div>
            </div>
          </AccordionSummary>

          <Modal
            open={shareModal}
            onClose={handleCloseShareModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyleShare}>
              <div className="grid items-center text-[0.8rem]">
                <div>
                  <h1 className="text-xl">Compartilhar via...</h1>
                </div>
                <div className="mt-4 flex justify-center items-center gap-8">
                  <div className="grid gap-2">
                    <div className="flex justify-center items-center">
                      <div
                        className="
                      rounded-full
                      w-14
                      h-14
                      bg-gray-200
                      flex
                      justify-center
                      items-center
                      cursor-pointer
                      transition

                      hover:bg-gray-300
                    "
                      >
                        <IconButton>
                          <MailOutlineRoundedIcon />
                        </IconButton>
                      </div>
                    </div>
                    <div className="flex justify-center items-center">
                      <h1>E-mail</h1>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <div className="flex justify-center items-center">
                      <div
                        className="
                      rounded-full
                      w-14
                      h-14
                      bg-gray-200
                      flex
                      justify-center
                      items-center
                      cursor-pointer
                      transition

                      hover:bg-gray-300
                    "
                      >
                        <IconButton>
                          <WhatsAppIcon />
                        </IconButton>
                      </div>
                    </div>
                    <div className="flex justify-center items-center">
                      <h1>Whatsapp</h1>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <div className="flex justify-center items-center">
                      <div
                        className="
                      rounded-full
                      w-14
                      h-14
                      bg-gray-200
                      flex
                      justify-center
                      items-center
                      cursor-pointer
                      transition

                      hover:bg-gray-300
                    "
                      >
                        <IconButton>
                          <LinkIcon />
                        </IconButton>
                      </div>
                    </div>
                    <div className="flex justify-center items-center">
                      <h1>Copiar link</h1>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <div className="flex justify-center items-center">
                      <div
                        className="
                      rounded-full
                      w-14
                      h-14
                      bg-gray-200
                      flex
                      justify-center
                      items-center
                      cursor-pointer
                      transition

                      hover:bg-gray-300
                    "
                      >
                        <IconButton>
                          <DownloadRoundedIcon />
                        </IconButton>
                      </div>
                    </div>
                    <div className="flex justify-center items-center">
                      <h1>Baixar PDF</h1>
                    </div>
                  </div>
                </div>
              </div>
            </Box>
          </Modal>
          <Divider />
          <AccordionDetails>
            <div className="grid gap-5">
              {proposalsMock.map((proposal) => (
                <ProposalCard
                  newPauta={proposal.newPauta}
                  title={proposal.title}
                  executionTime={proposal.executionTime}
                  value={proposal.value}
                  referenceDemand={proposal.referenceDemand}
                />
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      )}
    </div>
  );
}
