import * as React from "react";
import { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import MuiBox from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SquareRoundedIcon from "@mui/icons-material/SquareRounded";
import Tooltip from "@mui/material/Tooltip";

import HistoricoWorkflowService from "../../service/HistoricoWorkflow-Service";

import styled from "@emotion/styled";

import { useEffect } from "react";

// Services
import DemandLogService from "../../service/DemandLog-Service";

const columns = [
  {
    field: "status",
    headerName: "Status",
    width: 80,
    renderCell: (params) => (
      <Tooltip title={params.value}>
        <SquareRoundedIcon sx={{ color: statusColor[params.value] }} />
      </Tooltip>
    ),
    maxWidth: 80,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "titulo",
    headerName: "Título",
    headerAlign: "left",
    type: "string",
    width: 200,
    renderCell: (params) => (
      <Tooltip title={params.value}>
        <Typography variant="body2">
          {params.value.length > 27
            ? params.value.substring(0, 27) + "..."
            : params.value}
        </Typography>
      </Tooltip>
    ),
  },
  {
    field: "solicitante",
    headerName: "Solicitante",
    width: 180,
    renderCell: (params) => (
      <Tooltip title={params.value}>
        <Typography variant="body2">{params.value}</Typography>
      </Tooltip>
    ),
  },
  {
    field: "ultimaAtualizacao",
    headerName: "Última atualização",
    width: 210,
    renderCell: (params) => (
      <Tooltip title={params.value}>
        <Typography variant="body2">{params.value}</Typography>
      </Tooltip>
    ),
  },
  {
    field: "score",
    headerName: "Score",
    align: "center",
    headerAlign: "center",
    type: "number",
    width: 120,
  },
  {
    field: "versao",
    headerName: "Versão",
    align: "center",
    headerAlign: "center",
    type: "number",
    width: 120,
    renderCell: (params) => (
      <Typography variant="body2">{params.value}</Typography>
    ),
  },
];

/**
 * Status:
 * 1 - Backlog (Aberta) - Cinza - #C2BEBE
 * 2 - Assesment (Classificado pelo analista de TI) - Azul claro - #64C3D5
 * 3 - Aprovado pelo gerente da área - Azul - #00579D
 * 4 - Aprovado pela comissão - Verde - #7EB61C
 * 5 - Proposta em execução - Laranja - #EF8300
 * 6 - Suporte - Amarelo - #FFD600
 * 7 - Concluída - Verde - #00612E
 * 8 - Cancelada - Vermelho - #C31700
 */

const statusColor = {
  CANCELADA: "#C31700",
  APROVADO_PELA_COMISSAO: "#0076B8",
  CLASSIFICADO_PELO_ANALISTA: "#696969",
  ABERTA: "#C2BEBE",
  RASCUNHO: "#D9D9D9",
  APROVADO_PELO_GERENTE_DA_AREA: "#7EB61C",
  PROPOSTA_EM_ELABORACAO: "#99D6D2",
  PROPOSTA_EM_EXECUCAO: "#FFFF00",
  PROPOSTA_EM_SUPORTE: "008080",
  PROPOSTA_PRONTA: "#7AB7FF",
  PROPOSTA_FINALIZADA: "006400",

  BACKLOG: "#C2BEBE",
  ASSESMENT: "#00579D",
  BUSINESS_CASE: "#8862A2",
  TO_DO: "#7EB61C",
  DESIGN_AND_BUILD: "#EF8300",
  SUPPORT: "#FFD600",
  CANCELLED: "#C31700",
  DONE: "#00612E",
};

const Box = styled(MuiBox)(() => ({
  height: 750,
  width: 890,
}));

const getDemandHistoric = async (demandId) => {
  const historic = await DemandLogService.getDemandLogs(demandId);
  return {
    version: historic[historic.length - 1].versaoHistorico,
    lastUpdate: new Date(
      historic[historic.length - 2].recebimentoHistorico
    ).toLocaleDateString(),
    responsable: historic[historic.length - 2].nomeResponsavel,
  };
};

export default function DemandsList(props) {
  const [rows, setRows] = useState([]);

  const getRows = async (demands) => {
    const tableRows = demands.map(async (demand) => {
      const historic = await getDemandHistoric(demand.idDemanda);
      return {
        id: demand.idDemanda,
        status: demand.statusDemanda,
        solicitante: demand.nomeSolicitante,
        score: demand.scoreDemanda,
        titulo: demand.tituloDemanda,
        versao: historic.version,
        ultimaAtualizacao: historic.lastUpdate + " - " + historic.responsable,
      };
    });

    setRows(await Promise.all(tableRows));
  };

  useEffect(() => {
    if (props.demands) {
      getRows(props.demands);
    }
  }, []);

  const [pageSize, setPageSize] = useState(5);

  return (
    <Box>
      <DataGrid
        rows={rows}
        columns={columns}
        rowsPerPageOptions={[5, 10, 25]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        components={{
          Toolbar: GridToolbar,
        }}
        sx={{
          color: "#023A67",
          fontWeight: "bold",
          border: "none",
        }}
      />
    </Box>
  );
}
