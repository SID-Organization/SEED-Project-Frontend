import React from "react";

//MUI
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { InputAdornment, Tooltip } from "@mui/material";
import MuiTextField from "@mui/material/TextField";
import { Button, Modal } from "@mui/material";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

//Translations
import TranslationJson from "../../../API/Translate/components/createOrAcessalProposal.json";
import TranslateUtils from "../../../utils/Translate-Utils/index.js";

const TextField = styled(MuiTextField)({
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderLeft: "3px solid #0075B1",
  },
});

const styleModalGenerateProposal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 580,
  height: 405,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
};

export default function CreateOrAccessProposal(props) {
  const translate = TranslationJson;
  let language = TranslateUtils.getLanguage();

  const generateOrAccess = () => {
    if (
      props.statusDemanda === "APROVADO_PELO_GERENTE_DA_AREA" &&
      props.cargoUsuario === "ANALISTA"
    )
      props.handleOpenGenerateProposal();
    else if (
      props.statusDemanda === "PROPOSTA_EM_ELABORACAO" &&
      props.cargoUsuario === "ANALISTA"
    )
      props.handleAccessProposal();
    else if (
      props.statusDemanda == "PROPOSTA_PRONTA"
    )
      props.handleViewProposal();
  };

  return (
    <>
      {props.statusDemanda === "APROVADO_PELO_GERENTE_DA_AREA" && (
        <div>
          <Tooltip title={translate["Gerar proposta"]?.[language]}>
            <Button
              onClick={() => generateOrAccess()}
              variant="contained"
              style={{ fontSize: props.fonts.xs }}
              sx={{
                backgroundColor: "#FFF",
                color: "#0075B1",
                fontWeight: "bold",
                border: "#0075B1 solid 1px",

                "&:hover": {
                  backgroundColor: "#f3f3f3",
                },
              }}
            >
              <AddBoxRoundedIcon
                sx={{
                  color: "#0075B1",
                  marginRight: "5px",
                  fontSize: "1.3rem",
                }}
              />
              {translate["Proposta"]?.[language] ?? "Proposta"}
            </Button>
          </Tooltip>
        </div>
      )}
      {props.statusDemanda === "PROPOSTA_EM_ELABORACAO" && (
        <div>
          <Tooltip title={translate["Acessar proposta"]?.[language]}>
            <Button
              onClick={() => generateOrAccess()}
              variant="contained"
              style={{ fontSize: props.fonts.xs }}
              sx={{
                backgroundColor: "#FFF",
                color: "#0075B1",
                fontWeight: "bold",
                border: "#0075B1 solid 1px",
                width: language === "de" ? 110 : 140,

                "&:hover": {
                  backgroundColor: "#f3f3f3",
                },
              }}
            >
              <OpenInNewRoundedIcon
                sx={{
                  color: "#0075B1",
                  marginRight: "5px",
                  fontSize: "1.2rem",
                }}
              />
              {translate["Proposta"]?.[language] ?? "Proposta"}
            </Button>
          </Tooltip>
        </div>
      )}
      {props.statusDemanda === "PROPOSTA_PRONTA" && (
        <div>
          <Tooltip title={translate["Acessar proposta"]?.[language]}>
            <Button
              onClick={() => generateOrAccess()}
              variant="contained"
              style={{ fontSize: props.fonts.xs }}
              sx={{
                backgroundColor: "#FFF",
                color: "#0075B1",
                fontWeight: "bold",
                border: "#0075B1 solid 1px",
                width: language === "de" ? 110 : 140,

                "&:hover": {
                  backgroundColor: "#f3f3f3",
                },
              }}
            >
              <RemoveRedEyeIcon
                sx={{
                  color: "#0075B1",
                  marginRight: "5px",
                  fontSize: "1.2rem",
                }}
              />
              {translate["Proposta"]?.[language] ?? "Proposta"}
            </Button>
          </Tooltip>
        </div>
      )}
      <Modal
        open={props.openGenerateProposal}
        onClose={props.handleCloseGenerateProposal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModalGenerateProposal}>
          <div className="mb-5 flex h-14 w-full items-center justify-center rounded-t-lg bg-dark-blue-weg">
            <p
              style={{ fontSize: props.fonts.xl }}
              className="font-roboto font-bold text-[#FFF]"
            >
              {translate["Insira as seguintes informações"]?.[language] ??
                "Insira as seguintes informações"}
            </p>
          </div>
          <div className="flex items-center justify-center font-roboto">
            <div className="flex gap-14">
              <div className="grid items-center justify-center gap-1">
                <p className="font-bold text-dark-blue-weg">
                  {translate["Prazo para a elaboração da proposta"][language] ??
                    "Prazo para a elaboração da proposta"}
                </p>
                <div className="grid items-center justify-center gap-10">
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="dd/mm/aaaa"
                    type="date"
                    label="De:"
                    size="small"
                    value={props.startDevDate}
                    onChange={(e) => props.setStartDevDate(e.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start" />,
                    }}
                  />
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="dd/mm/aaaa"
                    type="date"
                    label="Até:"
                    size="small"
                    value={props.deadLineDate}
                    onChange={(e) => props.setDeadLineDate(e.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start" />,
                    }}
                  />
                </div>
                <div className="grid items-center justify-center gap-4">
                  <p className="font-bold text-dark-blue-weg">
                    {translate["Link para EPIC do projeto no Jira"][language] ??
                      "Link para EPIC do projeto no Jira"}
                  </p>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="https://jira.weg.net/browse/EPIC-123"
                    type="text"
                    label="Link"
                    size="small"
                    value={props.jiraLink}
                    onChange={(e) => props.setJiraLink(e.target.value)}
                  />
                </div>
              </div>
              <div className="h-[19rem] w-0.5 bg-dark-blue-weg" />
              <div>
                <div className="h-[16rem]">
                  <div className="ml-4 grid gap-4">
                    <p className="font-bold text-dark-blue-weg">
                      {translate["Código PPM"][language] ?? "Código PPM"}
                    </p>
                    <TextField
                      sx={{
                        width: 100,
                      }}
                      id="outlined-basic"
                      variant="outlined"
                      placeholder="123"
                      type="number"
                      label="PPM"
                      size="small"
                      value={props.ppmCode}
                      onChange={(e) => props.setPpmCode(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-end justify-between gap-1">
                  <Button
                    onClick={props.handleCloseGenerateProposal}
                    variant="contained"
                    style={{ fontSize: props.fonts.xs }}
                    sx={{
                      backgroundColor: "#C2BEBE",
                      color: "#505050",
                      width: 80,

                      "&:hover": {
                        backgroundColor: "#C2BEBE",
                      },
                    }}
                  >
                    {translate["Cancelar"][language] ?? "Cancelar"}
                  </Button>
                  <Button
                    onClick={props.handleCreateProposal}
                    variant="contained"
                    style={{ fontSize: props.fonts.xs }}
                    sx={{
                      backgroundColor: "#0075B1",
                      width: 80,
                      marginTop: 2,

                      "&:hover": {
                        backgroundColor: "#0075B1",
                      },
                    }}
                  >
                    {translate["Enviar"][language] ?? "Enviar"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}
