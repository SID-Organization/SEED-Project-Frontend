import { InputAdornment } from "@mui/material";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
//MUI
import { styled } from "@mui/material/styles";
import MuiTextField from "@mui/material/TextField";

// Services
import ProposalService from "../../../../service/Proposal-Service";

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
        <div className="mt-5 grid items-center justify-center">
          <h1
            className="
          font-roboto text-xl font-bold text-black
        "
          >
            Escopo do projeto
          </h1>
          <p className="flex justify-center">
            {getProposalDetails && getProposalDetails.escopoProposta}
          </p>
        </div>
        <div className="mt-5 grid items-center justify-center">
          <h1
            className="
          flex justify-center font-roboto text-xl font-bold text-black
        "
          >
            Tabela de custos
          </h1>
          <p className="flex justify-center">**TABELA DE CUSTOS AQUI**</p>
        </div>
        <div>
          <div className="mt-10 grid items-center justify-center">
            <div
              className="
          h-[5rem] w-[40rem]
          border-2 border-b-0 border-dashed
          border-blue-weg
        "
            >
              <div className="flex h-full items-center justify-start">
                <p
                  className="
              ml-5 mr-3 font-roboto text-xl font-bold
            "
                >
                  Custos totais do projeto:
                </p>
                <p className="font-roboto text-xl font-bold text-blue-weg">
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
                    className="
          ml-5 mr-3 font-roboto text-xl
        "
                  >
                    Total de despesas (desembolso):
                  </p>
                  <p className="font-roboto text-xl font-bold text-blue-weg">
                    R${" "}
                    {getProposalDetails &&
                      getProposalDetails.custosExternosDoProjeto}
                  </p>
                </div>
                <div className="flex h-full items-center justify-start">
                  <p
                    className="
          ml-5 mr-3 font-roboto text-xl
        "
                  >
                    Total de despesas com custos internos
                  </p>
                  <p className="font-roboto text-xl font-bold text-blue-weg">
                    R${" "}
                    {getProposalDetails &&
                      getProposalDetails.custosInternosDoProjeto}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid justify-center gap-10">
          <div className="mt-5">
            <p className="font-roboto text-lg font-bold">Payback</p>
            <EqualInput
              disabled
              id="outlined-textarea"
              variant="outlined"
              placeholder={
                getProposalDetails && getProposalDetails.paybackProposta
              }
              type="number"
              multiline
              maxRows={3}
              InputProps={{
                startAdornment: <InputAdornment position="start" />,
              }}
            />
          </div>
          <div>
            <p className="font-roboto text-lg font-bold">Período de execução</p>
            <div className="mt-2 flex gap-10">
              <DateInput
                disabled
                id="outlined-basic"
                variant="outlined"
                placeholder={
                  getProposalDetails &&
                  DateUtils.formatDate(
                    getProposalDetails.periodoExecucaoInicioProposta
                  )
                }
                label="Início:"
                type="text"
                size="small"
                InputProps={{
                  startAdornment: <InputAdornment position="start" />,
                }}
              />

              <DateInput
                disabled
                id="outlined-basic"
                variant="outlined"
                placeholder={
                  getProposalDetails &&
                  DateUtils.formatDate(
                    getProposalDetails.periodoExecucaoFimProposta
                  )
                }
                label="Término:"
                type="text"
                size="small"
                InputProps={{
                  startAdornment: <InputAdornment position="start" />,
                }}
              />
            </div>
          </div>
          <div>
            <p className="font-roboto text-lg font-bold">
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
