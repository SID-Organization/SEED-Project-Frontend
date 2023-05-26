import { useEffect, useState } from "react";

// MUI
import MuiBox from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import SquareRoundedIcon from "@mui/icons-material/SquareRounded";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

// MUI Styled
import styled from "@emotion/styled";

// Services
import DemandLogService from "../../service/DemandLog-Service";

// Utils
import DemandUtils from "../../utils/Demand-Utils";
import UserUtils from "../../utils/User-Utils";

const columns = [
  {
    field: "status",
    headerName: "Status",
    width: 80,
    renderCell: (params) => (
      <Tooltip title={params.value}>
        <SquareRoundedIcon sx={
          {
            color: DemandUtils.getDemandStatusColorByRole(params.value, UserUtils.getLoggedUserRole())
          }
        } />
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


const Box = styled(MuiBox)(() => ({
  height: 750,
  width: 890,
}));

const getDemandHistoric = async (demandId) => {
  const historic = await DemandLogService.getDemandLogs(demandId)
    .then(res => res.data)
    .catch(err => console.log(err));

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
