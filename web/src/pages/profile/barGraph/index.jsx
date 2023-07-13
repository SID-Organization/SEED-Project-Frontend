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
import GraphsService from "../../../service/Graphs-Service";

// Utils
import DateUtils from "../../../utils/Date-Utils"

// JSONs
import MockData from "./mockData.json";
import labelsJson from "./labels.json";

Chart.register(LinearScale);

const demandStatusOnGraph = ["CLASSIFICADO_PELO_ANALISTA", "APROVADO_PELO_GERENTE_DA_AREA", "PROPOSTA_EM_ELABORACAO", "PROPOSTA_PRONTA", "APROVADA_EM_COMISSAO", "APROVADA_EM_DG", "PROPOSTA_EM_EXECUCAO", "PROPOSTA_FINALIZADA", "CANCELADA"]

export default function BarGraph() {
  const [labels, setLabels] = useState(labelsJson);
  const [data, setData] = useState();
  const [dataFromDB, setDataFromDB] = useState();

  const [timeInterval, setTimeInterval] = useState("6");
  const [graphTitle, setGraphTitle] = useState("");


  const prepareDataForGraph = (data) => {
    const prepparedData = [];

    demandStatusOnGraph.forEach(labelStatus => {
      const filteredData = data.filter(item => item.status == labelStatus)
      if (filteredData.length > 0) {
        prepparedData.push(filteredData[0])
      } else {
        prepparedData.push({ status: labelStatus, dados: [] })
      }
    })
    console.log("Data to graph", prepparedData)
    setDataFromDB(prepparedData);
  }

  useEffect(() => {
    setLabels(labelsJson);
    GraphsService.getGraphData()
      .then((data) => {
        console.log("DATA", data);
        prepareDataForGraph(data);
      });
  }, []);


  useEffect(() => {
    if (!dataFromDB) return;
    const currentDate = new Date(); // Create a new Date object with the current date
    currentDate.setMonth(currentDate.getMonth() + 1); // Updates to the correct month
    const dates = []
    // Get the months according to the time interval
    for (let i = 0; i < timeInterval; i++) {
      dates.push(DateUtils.formatDateForGraph(currentDate.setMonth(currentDate.getMonth() - 1)))
    }

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

  // Updates the graph label
  useEffect(() => {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth());
    const formattedCurrDate = currentDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric', });

    const lastDate = currentDate.setMonth(currentDate.getMonth() - timeInterval);
    const formattedLastDate = new Date(lastDate).toLocaleString('pt-BR', { month: 'long', year: 'numeric', });

    const currDateText = formattedCurrDate.charAt(0).toUpperCase() + formattedCurrDate.slice(1);
    const lastDateText = formattedLastDate.charAt(0).toUpperCase() + formattedLastDate.slice(1);

    if (timeInterval == "1") {
      setGraphTitle(`${currDateText} (Último mês)`)
    } else {
      setGraphTitle(`${lastDateText}  -  ${currDateText}   (Últimos ${timeInterval} meses)`)
    }

  }, [timeInterval])

  const barGraphData = {
    labels: labelsJson,
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
      <button onClick={() => setTimeInterval(16)}>16</button>
    </div>
  );
}
