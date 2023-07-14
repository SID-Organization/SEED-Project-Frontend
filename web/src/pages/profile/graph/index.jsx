import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { LinearScale } from "chart.js";
import MuiButton from "@mui/material/Button";
import { useContext, useState } from "react";

import { styled } from "@mui/material/styles";
import { MenuItem, Select, TextField } from "@mui/material";

import TranslationJson from "../../../API/Translate/components/graph.json";
import { TranslateContext } from "../../../contexts/translate/index";
import MonthsJSON from "./monthsJSON.json";
import { useEffect } from "react";
import GraphService from "../../../service/Graph-Service";
import GraphUtils from "../../../utils/GraphUtils";
import DateUtils from "../../../utils/Date-Utils";

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

const months = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

const demandStatusOnGraph = ["APROVADA_EM_DG", "CANCELADA"]

export default function Graph() {
  const [timeInterval, setTimeInterval] = useState(12);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [preparedData, setPreparedData] = useState([]);
  const [approvedData, setApprovedData] = useState([]);
  const [cancelledData, setCancelledData] = useState([]);
  const [labels, setLabels] = useState([]);

  const translate = TranslationJson;
  const [language] = useContext(TranslateContext);



  useEffect(() => {
    // Get data for graph
    GraphService.getGraphData()
      .then(data => {
        setPreparedData(GraphUtils.prepareDataForGraph(demandStatusOnGraph, data))
      })
  }, []);

  useEffect(() => {
    // Get data for graph
    const dates = DateUtils.getMonthInterval(timeInterval);

    const datelabels = dates.map(date => {
      return months[parseInt(date.split('/')[0]) - 1] + '/' + date.split('/')[1].slice(-2)
    })
      .reverse();

    const approvedCount = dates.map(date => {
      const count = preparedData.find(item => item.status == "APROVADA_EM_DG")
        ?.dados.find(item => item.data == date)
        ?.quantidade
      return count ?? 0
    }).reverse();


    const cancelledCount = dates.map(date => {
      const count = preparedData.find(item => item.status == "CANCELADA")
        ?.dados.find(item => item.data == date)
        ?.quantidade
      return count ?? 0
    }).reverse();



    console.log("approvedCount", approvedCount);
    console.log("cancelledCount", cancelledCount);

    if (approvedCount) {
      setApprovedData(approvedCount);
    }
    if (cancelledCount) {
      setCancelledData(cancelledCount);
    }
    if (datelabels) {
      setLabels(datelabels);
    }
  }, [timeInterval, preparedData])

  const approvedAvg =
    approvedData.reduce((a, b) => a + b, 0) / approvedData.length;
  const cancelledAvg =
    cancelledData.reduce((a, b) => a + b, 0) / cancelledData.length;

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Demandas Aprovadas",
        data: approvedData,
        fill: false,
        backgroundColor: "#0075B1",
        borderColor: "#0075B1",
        pointHoverBackgroundColor: "#0075B1",
        pointBackgroundColor: "#fff",
        pointBorderColor: "#0075B1",
        pointBorderWidth: 2,
      },
      {
        label: "Média Aprovadas",
        data: labels.map(() => approvedAvg.toFixed(2)),
        fill: false,
        backgroundColor: "#0075B160",
        borderColor: "#0075B160",
        pointHoverBackgroundColor: "#0075B1",
        elements: {
          point: {
            radius: 0,
          },
        },
      },
      {
        label: "Demandas Canceladas",
        data: cancelledData,
        fill: false,
        backgroundColor: "#adadad",
        borderColor: "#adadad",
        pointHoverBackgroundColor: "#adadad",
        pointBackgroundColor: "#fff",
        pointBorderColor: "#adadad",
        pointBorderWidth: 2,
      },
      {
        label: "Média Canceladas",
        data: labels.map(() => cancelledAvg.toFixed(2)),
        fill: false,
        backgroundColor: "#adadad60",
        borderColor: "#adadad60",
        pointHoverBackgroundColor: "#333",
        elements: {
          point: {
            radius: 0,
          },
        },
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: `Média aprovadas: ${approvedAvg.toFixed(
          2
        )}    |    Média canceladas: ${cancelledAvg.toFixed(2)}`,
        font: {
          size: 16,
          weight: "bold",
        },
        color: "#023A67",
        padding: {
          top: 10,
          bottom: 10,
        },
      },
      subtitle: {
        display: true,
        font: {
          size: 14,
          weight: "bold",
        },
        position: "bottom",
        color: "#023A67",
        padding: {
          top: 10,
          bottom: 10,
        },
      },
    },
    tension: 0.3,
    responsive: false,
    maintainAspectRatio: true,
    devicePixelRatio: 2,
  };

  return (
    <div className="grid items-center justify-start">
      <div className="flex">
        <Line data={data} options={options} width={900} height={400} />
        <div className="mt-16 grid h-full items-center justify-start">
          <Button
            onClick={() => {
              setTimeInterval(12);
            }}
            style={{
              textDecoration: timeInterval == 12 ? "underline" : "none",
              fontWeight: timeInterval == 12 ? "bold" : "normal",
              color: timeInterval == 12 ? "#0075B1" : "#929292",
            }}
          >
            12 M
          </Button>
          <Button
            onClick={() => {
              setTimeInterval(6);
            }}
            style={{
              textDecoration: timeInterval == 6 ? "underline" : "none",
              fontWeight: timeInterval == 6 ? "bold" : "normal",
              color: timeInterval == 6 ? "#0075B1" : "#929292",
            }}
          >
            6 M
          </Button>
          {/* <Button
            onClick={() => {
              setTimeInterval(1);
            }}
            style={{
              textDecoration: timeInterval == 1 ? "underline" : "none",
              fontWeight: timeInterval == 1 ? "bold" : "normal",
              color: timeInterval == 1 ? "#0075B1" : "#929292",
            }}
          >
            1 M
          </Button>
          {timeInterval == 1 && (
            <Select
              variant="standard"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              style={{
                width: "4rem",
                height: "2rem",
                fontSize: "0.8rem",
                color: "#0075B1",
                fontWeight: "bold",
                textAlignLast: "center",
              }}
              onChange={() => {}}
            >
              {months.map((month, index) => (
                <MenuItem
                  value={index}
                  sx={{
                    fontSize: "0.8rem",
                    color: "#0075B1",
                    fontWeight: "bold",
                  }}
                >
                  {month}
                </MenuItem>
              ))}
            </Select>
          )} */}
        </div>
      </div>
    </div>
  );
}
