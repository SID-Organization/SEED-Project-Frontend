import * as React from "react";
import { useState } from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import type {} from '@mui/x-data-grid/themeAugmentation';

import MuiBox from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SquareRoundedIcon from "@mui/icons-material/SquareRounded";
import Tooltip from "@mui/material/Tooltip";

import styled from "@emotion/styled";



const columns: GridColDef[] = [
  {
    field: "status",
    headerName: "Status",
    width: 80,
    renderCell: (params) => (
      <Tooltip title={params.value}>
        <SquareRoundedIcon sx={{ color: getStatusColor(params.value) }} />
      </Tooltip>
    ),
    maxWidth: 80,
    align: "center",
    headerAlign: "center",
  },
  { field: "solicitante", headerName: "Solicitante", width: 210 },
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
    field: "valor",
    headerName: "Valor",
    headerAlign: "center",
    type: "string",
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

const getStatusColor = (rowStatusParam: string) => {
  let rowStatus = rowStatusParam;
  let bgColor = "#fff";

  switch (rowStatus) {
    case "Aberta":
      bgColor = "#C2BEBE";
      break;
    case "Classificado pelo analista de TI":
      bgColor = "#64C3D5";
      break;
    case "Aprovado pelo gerente da área":
      bgColor = "#00579D";
      break;
    case "Aprovado pela comissão":
      bgColor = "#7EB61C";
      break;
    case "Proposta em execução":
      bgColor = "#EF8300";
      break;
    case "Suporte":
      bgColor = "#FFD600";
      break;
    case "Concluída":
      bgColor = "#00612E";
      break;
    case "Cancelada":
      bgColor = "#C31700";
      break;
  }
  return bgColor;
};

const demandStatusType = [
  "Aberta",
  "Classificado pelo analista de TI",
  "Aprovado pelo gerente da área",
  "Aprovado pela comissão",
  "Proposta em execução",
  "Suporte",
  "Concluída",
  "Cancelada",
];

const rows = [
  {
    id: 1,
    status: demandStatusType[0],
    solicitante: "Henrique Cole",
    ultimaAtualizacao: "2 de mar. de 2022 Gustavo Santos",
    score: 324,
    valor: "R$ 100.000,00",
    versao: 4.2,
  },
  {
    id: 2,
    status: demandStatusType[2],
    solicitante: "Leonardo Rafaelli",
    ultimaAtualizacao: "3 de mar. de 2021 Henrique Cole",
    score: 543,
    valor: "R$ 1.000,00",
    versao: 1.2,
  },
  {
    id: 3,
    status: demandStatusType[4],
    solicitante: "Henrique Cole",
    ultimaAtualizacao: "2 de mar. de 2022 Gustavo Santos",
    score: 324,
    valor: "R$ 1.000,00",
    versao: 4.2,
  },
  {
    id: 4,
    status: demandStatusType[2],
    solicitante: "Leonardo Rafaelli",
    ultimaAtualizacao: "3 de mar. de 2021 Henrique Cole",
    score: 543,
    valor: "R$ 1.000,00",
    versao: 1.2,
  },
  {
    id: 5,
    status: demandStatusType[1],
    solicitante: "Henrique Cole",
    ultimaAtualizacao: "2 de mar. de 2022 Gustavo Santos",
    score: 324,
    valor: "R$ 1.000,00",
    versao: 4.2,
  },
  {
    id: 6,
    status: demandStatusType[2],
    solicitante: "Leonardo Rafaelli",
    ultimaAtualizacao: "3 de mar. de 2021 Henrique Cole",
    score: 543,
    valor: "R$ 1.000,00",
    versao: 1.2,
  },
  {
    id: 7,
    status: demandStatusType[3],
    solicitante: "Henrique Cole",
    ultimaAtualizacao: "2 de mar. de 2022 Gustavo Santos",
    score: 324,
    valor: "R$ 1.000,00",
    versao: 4.2,
  },
  {
    id: 8,
    status: demandStatusType[2],
    solicitante: "Leonardo Rafaelli",
    ultimaAtualizacao: "3 de mar. de 2021 Henrique Cole",
    score: 543,
    valor: "R$ 1.000,00",
    versao: 1.2,
  },
  {
    id: 9,
    status: demandStatusType[3],
    solicitante: "Henrique Cole",
    ultimaAtualizacao: "2 de mar. de 2022 Gustavo Santos",
    score: 324,
    valor: "R$ 1.000,00",
    versao: 4.2,
  },
  {
    id: 10,
    status: demandStatusType[6],
    solicitante: "Henrique Cole",
    ultimaAtualizacao: "2 de mar. de 2022 Gustavo Santos",
    score: 324,
    valor: "R$ 1.000,00",
    versao: 4.2,
  },
  {
    id: 11,
    status: demandStatusType[5],
    solicitante: "Henrique Cole",
    ultimaAtualizacao: "2 de mar. de 2022 Gustavo Santos",
    score: 324,
    valor: "R$ 1.000,00",
    versao: 4.2,
  },
  {
    id: 12,
    status: demandStatusType[7],
    solicitante: "Henrique Cole",
    ultimaAtualizacao: "2 de mar. de 2022 Gustavo Santos",
    score: 324,
    valor: "R$ 1.000,00",
    versao: 4.2,
  },
  {
    id: 13,
    status: demandStatusType[7],
    solicitante: "Henrique Cole",
    ultimaAtualizacao: "2 de mar. de 2022 Gustavo Santos",
    score: 324,
    valor: "R$ 1.000,00",
    versao: 4.2,
  },
  {
    id: 14,
    status: demandStatusType[4],
    solicitante: "Henrique Cole",
    ultimaAtualizacao: "2 de mar. de 2022 Gustavo Santos",
    score: 324,
    valor: "R$ 1.000,00",
    versao: 4.2,
  },
  {
    id: 15,
    status: demandStatusType[3],
    solicitante: "Henrique Cole",
    ultimaAtualizacao: "2 de mar. de 2022 Gustavo Santos",
    score: 324,
    valor: "R$ 1.000,00",
    versao: 4.2,
  },
  {
    id: 16,
    status: demandStatusType[6],
    solicitante: "Henrique Cole",
    ultimaAtualizacao: "2 de mar. de 2022 Gustavo Santos",
    score: 324,
    valor: "R$ 1.000,00",
    versao: 4.2,
  },
  {
    id: 17,
    status: demandStatusType[5],
    solicitante: "Henrique Cole",
    ultimaAtualizacao: "2 de mar. de 2022 Gustavo Santos",
    score: 324,
    valor: "R$ 1.000,00",
    versao: 4.2,
  },
  {
    id: 18,
    status: demandStatusType[1],
    solicitante: "Henrique Cole",
    ultimaAtualizacao: "2 de mar. de 2022 Gustavo Santos",
    score: 324,
    valor: "R$ 1.000,00",
    versao: 4.2,
  },
  {
    id: 19,
    status: demandStatusType[2],
    solicitante: "Henrique Cole",
    ultimaAtualizacao: "2 de mar. de 2022 Gustavo Santos",
    score: 324,
    valor: "R$ 1.000,00",
    versao: 4.2,
  },
  {
    id: 20,
    status: demandStatusType[0],
    solicitante: "Henrique Cole",
    ultimaAtualizacao: "2 de mar. de 2022 Gustavo Santos",
    score: 324,
    valor: "R$ 1.000,00",
    versao: 4.2,
  },
  {
    id: 21,
    status: demandStatusType[1],
    solicitante: "Henrique Cole",
    ultimaAtualizacao: "2 de mar. de 2022 Gustavo Santos",
    score: 324,
    valor: "R$ 1.000,00",
    versao: 4.2,
  },
];

const Box = styled(MuiBox)(() => ({
  height: 750,
  width: 890,
}));

export default function DataTable() {
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
