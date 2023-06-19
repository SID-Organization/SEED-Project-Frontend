import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
import { Button } from "@mui/material";
import { Logout } from "@mui/icons-material";

//Translations
import TranslationJson from "../../API/Translate/components/demandCardList.json";
import TranslateUtils from "../../utils/Translate-Utils/index.js";
import { TranslateContext } from "../../contexts/translate/index.jsx";




const Box = styled(MuiBox)(() => ({
  height: 690,
  width: 1050
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
    responsable: historic[historic.length - 2].nomeResponsavel
  };
};

export default function DemandsList(props) {

  const [rows, setRows] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const navigate = useNavigate();

  const translate = TranslationJson;
  const [ language ] = useContext(TranslateContext);

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
      headerAlign: "center"
    },
    {
      field: "titulo",
      headerName: translate["Título"][language],
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
      )
    },
    {
      field: "solicitante",
      headerName: translate["Solicitante"][language],
      width: 180,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <Typography variant="body2">{params.value}</Typography>
        </Tooltip>
      )
    },
    {
      field: "ultimaAtualizacao",
      headerName: translate["Última atualização"][language],
      width: 210,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <Typography variant="body2">{params.value}</Typography>
        </Tooltip>
      )
    },
    {
      field: "score",
      headerName: "Score",
      align: "center",
      headerAlign: "center",
      type: "number",
      width: 120,
      renderCell: (params) => (
        <Tooltip title={params.value ?? "Indefinido"}>
          <Typography variant="body2"><strong>{params.value ?? "- - - -"}</strong></Typography>
        </Tooltip>
      )
    },
    {
      field: "versao",
      headerName: translate["Versão"][language],
      align: "center",
      headerAlign: "center",
      type: "number",
      width: 120,
      renderCell: (params) => (
        <Typography variant="body2">{params.value}</Typography>
      )
    }
  ];

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
        ultimaAtualizacao: historic.lastUpdate + " - " + historic.responsable
      };
    });

    setRows(await Promise.all(tableRows));
  };

  const handleRowDoubleClick = (params) => {
    navigate(`/demandas/${params.row.id}`);
  };

  useEffect(() => {
    if (props.demands) {
      getRows(props.demands);
    }
  }, []);


  return (
    <Box>
      <DataGrid
        rows={rows}
        columns={columns}
        rowsPerPageOptions={[5, 10, 25]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        onRowDoubleClick={handleRowDoubleClick}
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
