import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "status", headerName: "Status", width: 210 },
  { field: "solicitante", headerName: "Solicitante", width: 140 },
  { field: "ultimaAtualizacao", headerName: "Última atualização", width: 200 },
  {
    field: "score",
    headerName: "Score",
    type: "number",
    width: 120,
  },
  {
    field: "versao",
    headerName: "Versão",
    type: "number",
    width: 120,
  },
];

const demandStatusType = [
  "Cancelado",
  "Aprovado pela comissão",
  "Aprovado pelo analista de TI",
  "Rascunho",
];

const rows = [
  {
    id: 1,
    status: demandStatusType[0],
    solicitante: "Henrique Cole",
    ultimaAtualizacao: "2 de mar. de 2022 Gustavo Santos",
    score: 324,
    versao: 4.2,
  },
  {
    id: 2,
    status: demandStatusType[2],
    solicitante: "Leonardo Rafaelli",
    ultimaAtualizacao: "3 de mar. de 2021 Henrique Cole",
    score: 543,
    versao: 1.2,
  },
  {
    id: 1,
    status: demandStatusType[0],
    solicitante: "Henrique Cole",
    ultimaAtualizacao: "2 de mar. de 2022 Gustavo Santos",
    score: 324,
    versao: 4.2,
  },
  {
    id: 2,
    status: demandStatusType[2],
    solicitante: "Leonardo Rafaelli",
    ultimaAtualizacao: "3 de mar. de 2021 Henrique Cole",
    score: 543,
    versao: 1.2,
  },
  {
    id: 1,
    status: demandStatusType[0],
    solicitante: "Henrique Cole",
    ultimaAtualizacao: "2 de mar. de 2022 Gustavo Santos",
    score: 324,
    versao: 4.2,
  },
  {
    id: 2,
    status: demandStatusType[2],
    solicitante: "Leonardo Rafaelli",
    ultimaAtualizacao: "3 de mar. de 2021 Henrique Cole",
    score: 543,
    versao: 1.2,
  },
  {
    id: 1,
    status: demandStatusType[0],
    solicitante: "Henrique Cole",
    ultimaAtualizacao: "2 de mar. de 2022 Gustavo Santos",
    score: 324,
    versao: 4.2,
  },
  {
    id: 2,
    status: demandStatusType[2],
    solicitante: "Leonardo Rafaelli",
    ultimaAtualizacao: "3 de mar. de 2021 Henrique Cole",
    score: 543,
    versao: 1.2,
  },
  {
    id: 1,
    status: demandStatusType[0],
    solicitante: "Henrique Cole",
    ultimaAtualizacao: "2 de mar. de 2022 Gustavo Santos",
    score: 324,
    versao: 4.2,
  },
];

export default function DataTable() {
  return (
    <div
      style={{
        height: 600,
        width: "65%",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        sx={{ color: "#023A67", fontWeight: "bold", border: "none" }}
      />
    </div>
  );
}
