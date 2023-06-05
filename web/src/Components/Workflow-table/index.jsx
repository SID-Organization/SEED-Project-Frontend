import * as React from "react";
import { useState, useEffect } from "react";

// MUI
import Box from "@mui/material/Box";
import TextSnippetRoundedIcon from '@mui/icons-material/TextSnippetRounded';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { Button, Tooltip } from "@mui/material";

// Services
import DemandLogService from "../../service/DemandLog-Service";

// Utils
import DateUtils from "../../utils/Date-Utils";
import ReturnReasonService from "../../service/ReturnReason-Service";

// Renderizador de células normais
const renderCellTooltip = (params) => (
  <Tooltip title={params.value} enterDelay={820}>
    <p className="text-[11px]">{params.value}</p>
  </Tooltip>
);

// Renderizador de células de data
const renderDateCell = (params) => {
  const date = params.value ? DateUtils.formatDateTime(params.value) : "Indefinido";
  return (
    <Tooltip title={date} enterDelay={820}>
      <p className="text-[11px]">{date}</p>
    </Tooltip>
  );
};


function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const columns = [
  {
    field: "id",
    headerName: "ID",
    renderCell: renderCellTooltip,
    align: "center",
    headerAlign: "center",
    width: 40,
  },
  {
    field: "recebimento",
    headerName: "Recebimento",
    type: "date",
    renderCell: renderDateCell,
    width: 130,
  },
  {
    field: "conclusao",
    headerName: "Conclusão",
    type: "date",
    renderCell: renderDateCell,
    width: 130,
  },
  {
    field: "prazo",
    headerName: "Prazo",
    type: "date",
    renderCell: renderDateCell,
    width: 140,
  },
  {
    field: "tarefa",
    headerName: "Tarefa",
    renderCell: renderCellTooltip,
    minWidth: 220,
  },
  {
    field: "responsavel",
    headerName: "Responsável",
    renderCell: renderCellTooltip,
    minWidth: 150,
  },
  {
    field: "acao",
    headerName: "Ação",
    renderCell: renderCellTooltip,
    width: 90,
  },
  {
    field: "status",
    headerName: "Status",
    renderCell: (params) => (
      <p
        className={`text-[11px] ${params.value === "Concluído"
          ? "text-green-700"
          : params.value === "Em andamento"
            ? "text-dark-blue-weg"
            : "text-red-700"
          }`}
      >
        {params.value}
      </p>
    ),
    width: 90,
  },
  {
    field: "versao",
    headerName: "Versão",
    renderCell: renderCellTooltip,
    align: "center",
    headerAlign: "center",
    width: 80,
  },
  {
    field: "observacao",
    headerName: "Obs.",
    renderCell: (params) => {
      if (params.value)
        return  <Button onClick={() => { alert(params.value) }}>
                  <TextSnippetRoundedIcon />
                </Button>
      return <p className="text-[11px]">-</p>
    },
    align: "center",
    headerAlign: "center",
    width: 80,
  }
];

export default function WorkflowTable({ demandId }) {
  const [pageSize, setPageSize] = useState(5);
  const [workFlowData, setWorkFlowData] = useState([]);
  const [workFlowRows, setWorkFlowRows] = useState([]);

  // Busca os dados do workflow da demanda
  useEffect(() => {
    DemandLogService.getDemandLogs(demandId).then((res) => {
      setWorkFlowData(res.data);
      console.log("Workflow RES", res.data);
    });
  }, []);


  // Seta as linhas da tabela de workflow
  useEffect(() => {
    if (!workFlowData) return;
    setWorkFlowRows(() =>
      workFlowData.map( (wfdata, index) => {

        return {
          id: wfdata.idHistoricoWorkflow,
          recebimento: wfdata.recebimentoHistorico,
          conclusao: wfdata.conclusaoHistorico,
          prazo: wfdata.prazoHistorico,
          tarefa: wfdata.tarefaHistoricoWorkflow,
          responsavel: wfdata.nomeResponsavel,
          acao: wfdata.acaoFeitaHistorico ?? "- - - - -",
          status: wfdata.statusWorkflow,
          versao: wfdata.versaoHistorico,
          observacao: wfdata.motivoDevolucaoHistorico,
        };
      })
    );
  }, [workFlowData]);

  useEffect(() => {
    console.log("WorkFlowRows", workFlowRows);
  }, [workFlowRows])

  return (
    <Box sx={{ height: pageSize === 5 ? "20rem" : "25rem" }}>
      <DataGrid
        rowsPerPageOptions={[5, 10, 20]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        columns={columns}
        rows={workFlowRows}
        density="compact"
        components={{
          Toolbar: CustomToolbar,
        }}
        initialState={{
          sorting: {
            sortModel: [{ field: "id", sort: "desc" }],
          },
        }}
        disableSelectionOnClick
      />
    </Box>
  );
}
