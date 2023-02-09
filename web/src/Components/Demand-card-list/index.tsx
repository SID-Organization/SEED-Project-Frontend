import * as React from "react";
import { useState } from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";

import MuiBox from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SquareRoundedIcon from "@mui/icons-material/SquareRounded";
import Tooltip from "@mui/material/Tooltip";

import styled from "@emotion/styled";

import { useEffect } from "react";
import DemandInterface from "../../Interfaces/demand/DemandInterface";

const columns: GridColDef[] = [
  {
    field: "status",
    headerName: "Status",
    width: 80,
    renderCell: params =>
      <Tooltip title={params.value}>
        <SquareRoundedIcon sx={{ color: getStatusColor(params.value) }} />
      </Tooltip>,
    maxWidth: 80,
    align: "center",
    headerAlign: "center"
  },
  {
    field: "titulo",
    headerName: "Título",
    headerAlign: "left",
    type: "string",
    width: 200,
    renderCell: params =>
      <Tooltip title={params.value}>
        <Typography variant="body2">
          {params.value.length > 27 ? params.value.substring(0, 27) + "..." : params.value}
        </Typography>
      </Tooltip>
  },
  {
    field: "solicitante",
    headerName: "Solicitante",
    width: 180,
    renderCell: params =>
      <Tooltip title={params.value}>
        <Typography variant="body2">
          {params.value}
        </Typography>
      </Tooltip>
  },
  {
    field: "ultimaAtualizacao",
    headerName: "Última atualização",
    width: 210,
    renderCell: params =>
      <Tooltip title={params.value}>
        <Typography variant="body2">
          {params.value}
        </Typography>
      </Tooltip>
  },
  {
    field: "score",
    headerName: "Score",
    align: "center",
    headerAlign: "center",
    type: "number",
    width: 120
  },
  {
    field: "versao",
    headerName: "Versão",
    align: "center",
    headerAlign: "center",
    type: "number",
    width: 120,
    renderCell: params =>
      <Typography variant="body2">
        {params.value}
      </Typography>
  }
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
    case "ABERTA":
      bgColor = "#C2BEBE";
      break;
    case "CLASSIFICADO_PELO_ANALISTA":
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

const Box = styled(MuiBox)(() => ({
  height: 750,
  width: 890
}));

const getDemandHistoric = async (id: number) => {
  const response = await fetch(
    `http://localhost:8080/sid/api/historico-workflow/demanda/${id}`
  );
  const historic = await response.json();
  return {
    version: historic[historic.length - 1].versaoHistorico,
    lastUpdate: new Date(
      historic[historic.length - 2].recebimentoHistorico
    ).toLocaleDateString(),
    responsable: historic[historic.length - 1].nomeResponsavel
  };
};

export default function DataTable(props: { demands: any[] }) {
  const [rows, setRows] = useState<any[]>([]);

  const getRows = async (demands: any[]) => {
    const tableRows = demands.map(async demand => {
      const historic = await getDemandHistoric(demand.idDemanda);
      return {
        id: demand.idDemanda,
        status: demand.statusDemanda,
        solicitante: demand.solicitanteDemanda.nomeUsuario,
        score: demand.scoreDemanda,
        titulo: demand.tituloDemanda,
        versao: historic.version,
        ultimaAtualizacao: historic.lastUpdate + " - " + historic.responsable
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
        onPageSizeChange={newPageSize => setPageSize(newPageSize)}
        components={{
          Toolbar: GridToolbar
        }}
        sx={{
          color: "#023A67",
          fontWeight: "bold",
          border: "none"
        }}
      />
    </Box>
  );
}
