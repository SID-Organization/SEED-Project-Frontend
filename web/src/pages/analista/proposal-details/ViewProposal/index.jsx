import { InputAdornment } from "@mui/material";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
//MUI
import { styled } from "@mui/material/styles";
import MuiTextField from "@mui/material/TextField";

// Services
import ProposalService from "../../../../service/Proposal-Service";
import FontSizeUtils from "../../../../utils/FontSize-Utils";

// Utils
import DateUtils from "../../../../utils/Date-Utils";

const DateInput = styled(MuiTextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "1.5px solid #0075B1",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#0075B1",
    },
  },
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderLeft: "4px solid #0075B1",
  },

  "& .MuiOutlinedInput-input": {
    padding: "5px 5px",
  },
});

const NameAreaInput = styled(MuiTextField)({
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderLeft: "3px solid #0075B1",
  },
});

const EqualInput = styled(MuiTextField)({
  width: "700px",
  height: "3.5rem",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "1.5px solid #0075B1",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#0075B1",
    },
  },
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderLeft: "4px solid #0075B1",
  },

  "& .MuiOutlinedInput-input": {
    padding: "5px 5px",
  },
});

export default function ViewProposal() {
  const params = useParams();
  const [getProposalDetails, setGetProposalDetails] = useState();

  const [fonts, setFonts] = useState(FontSizeUtils.getFontSizes());

  useEffect(() => {
    setFonts(FontSizeUtils.getFontSizes());
  }, [FontSizeUtils.getFontControl()]);

  useEffect(() => {
    if (params.idProposta) {
      ProposalService.getProposalById(params.idProposta).then((proposal) => {
        setGetProposalDetails(proposal);
      });
    }
  }, []);

  return (
    <div>
      <div>
        <div className="grid items-center gap-1">
          <h1
            style={{ fontSize: fonts.base }}
            className="font-roboto font-bold text-blue-weg"
          >
            Escopo do projeto:
          </h1>
          <p
            style={{ fontSize: fonts.base }}
            className="whitespace-pre-wrap break-all pl-10 pr-10 font-roboto font-normal"
          >
            {getProposalDetails && getProposalDetails.escopoProposta} asd
          </p>
        </div>
        <div className="grid items-center gap-1">
          <h1
            style={{ fontSize: fonts.base }}
            className="font-roboto font-bold text-blue-weg"
          >
            Não faz parte do escopo do projeto:
          </h1>
          <p
            style={{ fontSize: fonts.base }}
            className="whitespace-pre-wrap break-all pl-10 pr-10 font-roboto font-normal"
          >
            {getProposalDetails && getProposalDetails.escopoProposta}asdsa
          </p>
        </div>
        <div className="grid items-center">
          <h1
            style={{ fontSize: fonts.base }}
            className="
          flex font-roboto font-bold text-blue-weg
        "
          >
            Tabela de custos
          </h1>
          <p style={{ fontSize: fonts.base }}>**TABELA DE CUSTOS AQUI**</p>
        </div>
        <div>
          <div className="mt-10 grid items-center">
            <div
              className="
          h-[5rem] w-[40rem]
          border-2 border-b-0 border-dashed
          border-blue-weg
        "
            >
              <div className="flex h-full items-center justify-start">
                <p
                  style={{ fontSize: fonts.base }}
                  className="
              ml-5 mr-3 font-roboto font-bold
            "
                >
                  Custos totais do projeto:
                </p>
                <p
                  style={{ fontSize: fonts.base }}
                  className="font-roboto font-bold text-blue-weg"
                >
                  R${" "}
                  {getProposalDetails &&
                    getProposalDetails.custosTotaisDoProjeto}
                </p>
              </div>
            </div>
            <div
              className="
          h-[10rem] w-[40rem]
          border-2 border-dashed border-blue-weg
        "
            >
              <div className="grid h-full items-center justify-start">
                <div className="flex h-full items-center justify-start">
                  <p
                    style={{ fontSize: fonts.base }}
                    className="
          ml-5 mr-3 font-roboto
        "
                  >
                    Total de despesas (desembolso):
                  </p>
                  <p
                    style={{ fontSize: fonts.base }}
                    className="font-roboto font-bold text-blue-weg"
                  >
                    R${" "}
                    {getProposalDetails &&
                      getProposalDetails.custosExternosDoProjeto}
                  </p>
                </div>
                <div className="flex h-full items-center justify-start">
                  <p
                    style={{ fontSize: fonts.base }}
                    className="
          ml-5 mr-3 font-roboto
        "
                  >
                    Total de despesas com custos internos
                  </p>
                  <p
                    style={{ fontSize: fonts.base }}
                    className="font-roboto font-bold text-blue-weg"
                  >
                    R${" "}
                    {getProposalDetails &&
                      getProposalDetails.custosInternosDoProjeto}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid">
          <div className="flex items-center gap-1">
            <p
              style={{ fontSize: fonts.base }}
              className="font-roboto font-bold text-blue-weg"
            >
              Payback:
            </p>
            <p className="font-roboto">
              {getProposalDetails && getProposalDetails.paybackProposta} 223
            </p>
          </div>
          <div>
            <p
              style={{ fontSize: fonts.base }}
              className="font-roboto font-bold text-blue-weg"
            >
              Período de execução:
            </p>
            <div className="flex gap-10">
              <div className="flex items-center gap-1">
                <p className="font-roboto font-bold text-blue-weg">Início:</p>
                <p className="font-roboto">
                  12/04/2022
                  {getProposalDetails &&
                    DateUtils.formatDate(
                      getProposalDetails.periodoExecucaoInicioProposta
                    )}
                </p>
              </div>

              <div className="flex items-center gap-1">
                <p className="font-roboto font-bold text-blue-weg">Término:</p>
                <p className="font-roboto">
                  16/05/2022
                  {getProposalDetails &&
                    DateUtils.formatDate(
                      getProposalDetails.periodoExecucaoFimProposta
                    )}
                </p>
              </div>
            </div>
          </div>
          <div>
            <p
              style={{ fontSize: fonts.base }}
              className="font-roboto font-bold"
            >
              Responsável pelo negócio
            </p>
            <div className="mt-2 flex gap-10">
              <NameAreaInput
                disabled
                id="outlined-textarea"
                variant="outlined"
                type="text"
                multiline
                placeholder={
                  getProposalDetails &&
                  getProposalDetails.nomeResponsavelNegocio > 0
                    ? getProposalDetails.nomeResponsavelNegocio
                    : "Não informado"
                }
                maxRows={3}
                InputProps={{
                  startAdornment: <InputAdornment position="start" />,
                }}
              />
              <NameAreaInput
                disabled
                id="outlined-textarea"
                variant="outlined"
                type="text"
                multiline
                placeholder={
                  getProposalDetails &&
                  getProposalDetails.areaResponsavelNegocio > 0
                    ? getProposalDetails.areaResponsavelNegocio
                    : "Não informado"
                }
                maxRows={3}
                onChange={(e) => setAreaBusinessResponsible(e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start" />,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
