import { useEffect } from "react";
import { useContext, useState } from "react";

import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { LinearScale } from "chart.js";

import MuiButton from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { MenuItem, Select, TextField } from "@mui/material";

import TranslationJson from "../../../API/Translate/components/graph.json";
import { TranslateContext } from "../../../contexts/translate/index";

// Service
import GraphService from "../../../service/Graph-Service";

// Utils
import DateUtils from "../../../utils/Date-Utils"

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


  const prepareDataForGraph = (data) => {
    const preparedData = [];

    demandStatusOnGraph.forEach(labelStatus => {
      const filteredData = data.find(item => item.status == labelStatus)
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
        // console.log("DATA", data);
        prepareDataForGraph(data);
      });
  }, []);


  useEffect(() => {
    if (!dataFromDB) return;

    const dates = DateUtils.getMonthInterval(timeInterval);
    // Updates the graph label
    setGraphTitle(GraphUtils.getGraphMonthsTitleByInterval(timeInterval))

    // Get the data from DB
    const barData = dataFromDB.map(item => {
      let statusSum = 0;
      for (let i = 0; i < item.dados.length; i++) {
        if (dates.includes(item.dados[i].data)) {
          statusSum += item.dados[i].quantidade
        }
      }
      return statusSum;
    });

    setData(barData);
  }, [timeInterval, dataFromDB])


  const barGraphData = {
    labels: labelsJson.labels,
    datasets: [
      {
        label: graphTitle,
        data: data,
      }
    ],
  }



  return (
    <div>
      {barGraphData && (
        <Bar data={barGraphData} />
      )}
      <button onClick={() => setTimeInterval(1)}>1</button>
      <br />
      <br />
      <button onClick={() => setTimeInterval(12)}>16</button>
    </div>
  );
}
