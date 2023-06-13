import * as React from "react";
import { useState, useEffect, useContext } from "react";

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
import ReturnReasonModal from "../ReturnReason-Modal";

//Translation
import TranslationJson from "../../API/Translate/components/workflowTable.json";
import TranslateUtils from "../../utils/Translate-Utils/index.js";
import { TranslateContext } from "../../contexts/translate/index.jsx";

// Renderizador de células normais
const renderCellTooltip = (params) => (
  <Tooltip title={params.value} enterDelay={820}>
    <p className="text-[11px]">{params.value}</p>
  </Tooltip>
);

// Renderizador de células de data
const renderDateCell = (params) => {
  const translate = TranslationJson;
  let language = TranslateUtils.getLanguage();

  const date = params.value ? DateUtils.formatDateTime(params.value) : translate["Indefinido"]?.[language] ?? "Indefinido";
  return (
    <Tooltip title={date} enterDelay={820}>
      <p className="text-[11px]">{date}</p>
    </Tooltip>
  );
};


const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const getStatusColor = (status) => {
  switch (status) {
    case "Concluído":
      return "text-green-700";
    case "Em andamento":
      return "text-dark-blue-weg";
    default:
      return "text-red-700";
  }
}



export default function WorkflowTable({ demandId }) {

  const translate = TranslationJson;
  const [ language ] = useContext(TranslateContext);

  const [pageSize, setPageSize] = useState(5);
  const [workFlowData, setWorkFlowData] = useState([]);
  const [workFlowRows, setWorkFlowRows] = useState([]);
  
  const [returnReason, setReturnReason] = useState("");
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  
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

        console.log("WF DATA", wfdata.acaoFeitaHistorico)

        return {
          id: index + 1,
          recebimento: wfdata.recebimentoHistorico,
          conclusao: wfdata.conclusaoHistorico,
          prazo: wfdata.prazoHistorico,
          tarefa: translate[wfdata.tarefaHistoricoWorkflow]?.[language] ?? wfdata.tarefaHistoricoWorkflow,
          responsavel: wfdata.nomeResponsavel,
          acao: translate[wfdata.acaoFeitaHistorico]?.[language] ?? wfdata.acaoFeitaHistorico,
          status: wfdata.statusWorkflow,
          versao: wfdata.versaoHistorico,
          observacao: wfdata.motivoDevolucaoHistorico,
        };
      })
    );
  }, [workFlowData]);

  // Columns
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
      headerName: translate["Recebimento"]?.[language] ?? "Recebimento",
      type: "date",
      renderCell: renderDateCell,
      width: 130,
    },
    {
      field: "conclusao",
      headerName: translate["Conclusão"]?.[language] ?? "Conclusão",
      type: "date",
      renderCell: renderDateCell,
      width: 130,
    },
    {
      field: "prazo",
      headerName: translate["Prazo"]?.[language] ?? "Prazo",
      type: "date",
      renderCell: renderDateCell,
      width: 140,
    },
    {
      field: "tarefa",
      headerName: translate["Tarefa"]?.[language] ?? "Tarefa",
      renderCell: renderCellTooltip,
      minWidth: 220,
    },
    {
      field: "responsavel",
      headerName: translate["Responsável"]?.[language] ?? "Responsável",
      renderCell: renderCellTooltip,
      minWidth: 150,
    },
    {
      field: "acao",
      headerName: translate["Ação"]?.[language] ?? "Ação",
      renderCell: renderCellTooltip,
      width: 90,
    },
    {
      field: "status",
      headerName: "Status",
      renderCell: (params) => (
        <p
          className={`text-[11px] ${getStatusColor(params.value)}`}
        >
          {translate[params.value]?.[language] ?? params.value}
        </p>
      ),
      width: 90,
    },
    {
      field: "versao",
      headerName: translate["Versão"]?.[language] ?? "Versão",
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
          return  <Button onClick={() => {setReturnReason(params.value); setIsReturnModalOpen(true)}}>
                    <TextSnippetRoundedIcon />
                  </Button>
        return <p className="text-[11px]">-</p>
      },
      align: "center",
      headerAlign: "center",
      width: 80,
    }
  ];
  
  useEffect(() => {
    console.log("returnReason", returnReason);
  }, [returnReason])


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
      <ReturnReasonModal
        isReasonOfModalOpen={isReturnModalOpen}
        setIsReasonOfModalOpen={setIsReturnModalOpen}
        getIsDevolution={() => true}
        disabled={true}
        reasonOfReturn={returnReason}
      />
    </Box>
  );
}
