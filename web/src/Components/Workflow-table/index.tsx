import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import { Tooltip } from "@mui/material";
import { useState } from "react";

const renderCellTooltip = (params: GridRenderCellParams) =>
  <Tooltip title={params.value} enterDelay={820}>
    <p className="text-[11px]">
      {params.value}
    </p>
  </Tooltip>;

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    renderCell: renderCellTooltip,
    align: "center",
    headerAlign: "center",
    width: 40
  },
  {
    field: "recebimento",
    headerName: "Recebimento",
    type: "date",
    renderCell: renderCellTooltip,
    width: 130
  },
  {
    field: "conclusao",
    headerName: "Conclusão",
    type: "date",
    renderCell: renderCellTooltip,
    width: 130
  },
  {
    field: "prazo",
    headerName: "Prazo",
    type: "date",
    renderCell: renderCellTooltip,
    width: 140
  },
  {
    field: "tarefa",
    headerName: "Tarefa",
    renderCell: renderCellTooltip,
    minWidth: 220
  },
  {
    field: "responsavel",
    headerName: "Responsável",
    renderCell: renderCellTooltip,
    minWidth: 150
  },
  {
    field: "acao",
    headerName: "Ação",
    renderCell: renderCellTooltip,
    width: 90
  },
  {
    field: "status",
    headerName: "Status",
    renderCell: renderCellTooltip,
    width: 90
  },
  {
    field: "versao",
    headerName: "Versão",
    renderCell: renderCellTooltip,
    align: "center",
    headerAlign: "center",
    width: 90
  }
];

const rows = [
  {
    id: 1,
    recebimento: "01/01/2021 - 24:25",
    conclusao: "01/03/2021 - 17:17",
    prazo: "01/01/2021 - 23:59",
    tarefa: "Classificar e aprovar demanda",
    responsavel: "Jeremias Nunes",
    acao: "Aprovar",
    status: "Concluído",
    versao: "0.1"
  },
  {
    id: 2,
    recebimento: "02/01/2021 - 15:25",
    conclusao: "04/04/2021 - 11:32",
    prazo: "02/01/2021 - 16:59",
    tarefa: "Classificar e aprovar demanda",
    responsavel: "Jeremias Nunes",
    acao: "Aprovar",
    status: "Concluído",
    versao: "0.1"
  },
  {
    id: 3,
    recebimento: "01/03/2021 - 16:25",
    conclusao: "01/05/2021 - 17:22",
    prazo: "01/12/2021 - 18:59",
    tarefa: "Classificar e aprovar demanda",
    responsavel: "Jeremias Nunes",
    acao: "Aprovar",
    status: "Concluído",
    versao: "0.1"
  },
  {
    id: 4,
    recebimento: "01/03/2021 - 16:25",
    conclusao: "01/05/2021 - 17:22",
    prazo: "01/12/2021 - 18:59",
    tarefa: "Classificar e aprovar demanda",
    responsavel: "Jeremias Nunes",
    acao: "Aprovar",
    status: "Concluído",
    versao: "0.1"
  },
  {
    id: 5,
    recebimento: "01/03/2021 - 16:25",
    conclusao: "01/05/2021 - 17:22",
    prazo: "01/12/2021 - 18:59",
    tarefa: "Classificar e aprovar demanda",
    responsavel: "Jeremias Nunes",
    acao: "Aprovar",
    status: "Concluído",
    versao: "0.1"
  },
  {
    id: 6,
    recebimento: "01/03/2021 - 16:25",
    conclusao: "01/05/2021 - 17:22",
    prazo: "01/12/2021 - 18:59",
    tarefa: "Classificar e aprovar demanda",
    responsavel: "Jeremias Nunes",
    acao: "Aprovar",
    status: "Concluído",
    versao: "0.1"
  },
  {
    id: 7,
    recebimento: "01/03/2021 - 16:25",
    conclusao: "01/05/2021 - 17:22",
    prazo: "01/12/2021 - 18:59",
    tarefa: "Classificar e aprovar demanda",
    responsavel: "Jeremias Nunes",
    acao: "Aprovar",
    status: "Concluído",
    versao: "0.1"
  },
];

export default function WorkflowTable() {
  const [pageSize, setPageSize] = useState<number>(5);

  return (
    <Box sx={{ height: "20rem" }}>
      <DataGrid
        rowsPerPageOptions={[5, 10, 20]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        columns={columns}
        rows={rows}
        density="compact"
        components={{
          Toolbar: CustomToolbar
        }}
      />
    </Box>
  );
}
