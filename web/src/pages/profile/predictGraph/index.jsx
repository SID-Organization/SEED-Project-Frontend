// PredictGraph.jsx
import { useContext, useState } from "react";
import { useEffect } from "react";
// Chart JS
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { LinearScale } from "chart.js";

// MUI
import { styled } from "@mui/material/styles";
import MuiButton from "@mui/material/Button";
import { IconButton, MenuItem, Select, TextField } from "@mui/material";

// Translate
import TranslationJson from "../../../API/Translate/components/graph.json";
import { TranslateContext } from "../../../contexts/translate/index";

// Service
import GraphService from "../../../service/Graph-Service";
import DemandService from "../../../service/Demand-Service";
// utils
import GraphUtils from "../../../utils/Graph-Utils";
import DateUtils from "../../../utils/Date-Utils";

import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";

Chart.register(LinearScale);

const Button = styled(MuiButton)(() => ({
  background: "transparent",
  borderRadius: "5px",
  color: "#929292",
  fontSize: "0.8rem",

  "&:hover": {
    background: "transparent",
  },
}));

const demandStatusOnGraph = ["ABERTA"];

export default function PredictGraph() {
  const [timeInterval, setTimeInterval] = useState(7);
  const [preparedData, setPreparedData] = useState([]);
  const [predictedData, setPredictedData] = useState([]);
  const [labels, setLabels] = useState([]);

  const translate = TranslationJson;
  const [language] = useContext(TranslateContext);

  useEffect(() => {
    // Generate data for the next 7 days
    DemandService.getDemandPrevision().then((response) => {
      console.log("Prevision List", response);
      
      // Transformar as datas no formato desejado (dd/mm/yyyy)
      const labels = response.map((item) => {
        const dateString = item.data;
        const dateObject = new Date(dateString);
        const dia = dateObject.getDate() + 1;
        const mes = dateObject.getMonth() + 1;
        const ano = dateObject.getFullYear();
        return dia.toString().padStart(2, '0') + '/' + mes.toString().padStart(2, '0') + '/' + ano;
      });
    
      setLabels(labels);
      setPredictedData(response.map((item) => item.quantidade_demandas));
    });
    
    
    // setLabels(next7Days);
    // setPredictedData(predictedDemand);
  }, []);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Demandas Previstas",
        data: predictedData,
        fill: false,
        backgroundColor: "#023A67",
        borderColor: "#023A67",
        pointHoverBackgroundColor: "#023A67",
        pointBackgroundColor: "#fff",
        pointBorderColor: "#023A67",
        pointBorderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: false,
      },
      subtitle: {
        display: false,
      },
    },
    tension: 0.3,
    responsive: false,
    maintainAspectRatio: true,
    devicePixelRatio: 2,
  };

  const downloadGraph = async () => {
    GraphUtils.downloadGraph("demand-predict-graph", "predict-graph");
  };

  return (
    <div className="grid items-center justify-start">
      <div className="flex">
        <div id="demand-predict-graph">
          <Line data={data} options={options} width={1000} height={400} />
        </div>
        <div className="mt-72 flex items-center">
          <Button onClick={downloadGraph}>
            <DownloadRoundedIcon
              style={{
                color: "#0075B1",
              }}
            />
            <p className="cursor-pointer font-roboto font-bold text-blue-weg">
              .png
            </p>
          </Button>
        </div>
      </div>
    </div>
  );
}
