import { useEffect } from "react";
import { useContext, useState } from "react";

import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { LinearScale } from "chart.js";

import MuiButton from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Button, MenuItem, Select, TextField } from "@mui/material";

import TranslationJson from "../../../API/Translate/components/graph.json";
import { TranslateContext } from "../../../contexts/translate/index";

// Service
import GraphService from "../../../service/Graph-Service";

// Utils
import DateUtils from "../../../utils/Date-Utils";
import DemandUtils from "../../../utils/Demand-Utils";
import UserUtils from "../../../utils/User-Utils";

// JSONs
import MockData from "./mockData.json";
import labelsJson from "./labels.json";
import GraphUtils from "../../../utils/GraphUtils";

Chart.register(LinearScale);

const demandStatusOnGraph = labelsJson.statusToPutOnGraph;

export default function BarGraph() {
  const [data, setData] = useState();
  const [dataFromDB, setDataFromDB] = useState();

  const [timeInterval, setTimeInterval] = useState("6");
  const [graphTitle, setGraphTitle] = useState("");

  const [firstButton, setFirstButton] = useState(false);

  const userRole = UserUtils.getLoggedUserRole();

  const prepareDataForGraph = (data) => {
    const preparedData = [];

    demandStatusOnGraph.forEach((labelStatus) => {
      const filteredData = data.find((item) => item.status == labelStatus);
      if (filteredData) {

        preparedData.push(filteredData)
      } else {
        preparedData.push({ status: labelStatus, dados: [] })
      }
    })
    // console.log("Data to graph", prepparedData)
    setDataFromDB(preparedData);
  }

  useEffect(() => {
    GraphService.getGraphData()
      .then((data) => {
        prepareDataForGraph(data);
      });
  }, []);

  useEffect(() => {
    if (!dataFromDB) return;

    const dates = DateUtils.getMonthInterval(timeInterval);
    // Updates the graph label
    setGraphTitle(GraphUtils.getGraphMonthsTitleByInterval(timeInterval));

    // Get the data from DB
    const barData = dataFromDB.map((item) => {
      let statusSum = 0;
      for (let i = 0; i < item.dados.length; i++) {
        if (dates.includes(item.dados[i].data)) {
          statusSum += item.dados[i].quantidade;
        }
      }
      return statusSum;
    });

    setData(barData);
  }, [timeInterval, dataFromDB]);

  const barGraphData = {
    labels: labelsJson.labels,
    datasets: [
      {
        label: graphTitle,
        data: data,
        backgroundColor: demandStatusOnGraph.map(
          (item) =>
            DemandUtils.getDemandStatusColorByRole(item, userRole) + "90"
        ),
        borderColor: demandStatusOnGraph.map((item) =>
          DemandUtils.getDemandStatusColorByRole(item, userRole)
        ),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "x",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: false,
    maintainAspectRatio: true,
    devicePixelRatio: 2,
    legend: {
      display: false,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: demandStatusOnGraph.map((item) =>
            DemandUtils.getDemandStatusColorByRole(item, userRole)
          ),
          font: {
            size: 12,
          },
        },
      },
    },
  };

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

  return (
    <div className="flex">
      {barGraphData && (
        <Bar data={barGraphData} options={options} width={1000} height={400} />
      )}
      <div className="mt-8 grid h-8 items-center justify-start">
        <Button
          onClick={() => {
            setTimeInterval(12);
            setFirstButton(false);
          }}
          style={{
            textDecoration: !firstButton ? "underline" : "none",
            fontWeight: !firstButton ? "bold" : "normal",
            color: !firstButton ? "#0075B1" : "#929292",
          }}
        >
          12 M
        </Button>
        <Button
          onClick={() => {
            setTimeInterval(1);
            setFirstButton(true);
          }}
          style={{
            textDecoration: firstButton ? "underline" : "none",
            fontWeight: firstButton ? "bold" : "normal",
            color: firstButton ? "#0075B1" : "#929292",
          }}
        >
          1 M
        </Button>
        {firstButton && (
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
        )}
      </div>
    </div>
  );
}
