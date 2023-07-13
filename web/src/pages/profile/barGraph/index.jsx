import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { LinearScale } from "chart.js";
import MuiButton from "@mui/material/Button";
import { useContext, useState } from "react";

import { styled } from "@mui/material/styles";
import { MenuItem, Select, TextField } from "@mui/material";

import TranslationJson from "../../../API/Translate/components/graph.json";
import { TranslateContext } from "../../../contexts/translate/index";
import { useEffect } from "react";

// JSONs
import MockData from "./mockData.json";

Chart.register(LinearScale);

// CLASSIFICADO_PELO_ANALISTA
// APROVADO_PELO_GERENTE_DA_AREA
// PROPOSTA_EM_ELABORAÇÃO
// PROPOSTA_PRONTA
// APROVADA_EM_COMISSAO
// APROVADA_EM_DG
// PROPOSTA_EM_EXECUÇÃO
// CANCELADA
// PROPOSTA_FINALIZADA

const data = MockData;

export default function BarGraph() {
  const [isOneMonth, setIsOneMonth] = useState(false);
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [timeInterval, setTimeInterval] = useState("6");

  useEffect(() => {
    setLabels(data.map((item) => item.status));
  }, []);

  useEffect(() => {
    setLabels();
  }, [timeInterval]);

  return (
    <div>
      <Bar data={data} options={options} width={900} height={400} />
    </div>
  );
}
