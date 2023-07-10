import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { LinearScale } from "chart.js";
import MuiButton from "@mui/material/Button";
import { useState } from "react";

import { styled } from "@mui/material/styles";

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

export default function Graph() {
  const [twelveMonths, setTwelveMonths] = useState(true);

  const [sixMonths, setSixMonths] = useState(false);

  const [oneMonth, setOneMonth] = useState(false);

  let approvedData;
  let cancelledData;
  let labels = [];

  if (twelveMonths) {
    approvedData = [12, 19, 3, 15, 10, 12, 4, 5, 10, 13, 3, 1];
    cancelledData = [5, 3, 8, 2, 1, 4, 5, 10, 13, 3, 1, 12];
    labels = [
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
      "Dec",
    ];
  } else if (sixMonths) {
    approvedData = [12, 19, 3, 15, 10, 12];
    cancelledData = [5, 3, 8, 2, 1, 4];
    labels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];
  } else if (oneMonth) {
    approvedData = [
      1, 0, 0, 0, 2, 1, 4, 0, 1, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0,
      0, 0, 0, 0, 2,
    ];
    cancelledData = [
      0, 0, 0, 0, 2, 1, 4, 0, 1, 3, 1, 1, 2, 1, 2, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0,
      0, 0, 0, 0, 2,
    ];
    labels = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
    ];
  }

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
        backgroundColor: "#58970f",
        borderColor: "#58970f",
        pointHoverBackgroundColor: "#25640D",
      },
      {
        label: "Demandas Canceladas",
        data: cancelledData,
        fill: false,
        backgroundColor: "#adadad",
        borderColor: "#adadad",
        pointHoverBackgroundColor: "#333",
      },
      {
        label: "Média Aprovadas",
        data: labels.map(() => approvedAvg.toFixed(2)),
        fill: false,
        backgroundColor: "#57970f75",
        borderColor: "#57970f75",
        pointHoverBackgroundColor: "#25640D",
      },
      {
        label: "Média Canceladas",
        data: labels.map(() => cancelledAvg.toFixed(2)),
        fill: false,
        backgroundColor: "#adadad84",
        borderColor: "#adadad84",
        pointHoverBackgroundColor: "#333",
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
    },
    tension: 0.3,
  };

  return (
    <div className="flex items-center">
      <Line data={data} options={options} />
      <div className="grid h-full items-center">
        <Button
          onClick={() => {
            setTwelveMonths(false);
            setSixMonths(false);
            setOneMonth(true);
          }}
          style={{
            textDecoration: oneMonth ? "underline" : "none",
            fontWeight: oneMonth ? "bold" : "normal",
            color: oneMonth ? "#0075B1" : "#929292",
          }}
        >
          1 M
        </Button>
        <Button
          onClick={() => {
            setTwelveMonths(false);
            setSixMonths(true);
            setOneMonth(false);
          }}
          style={{
            textDecoration: sixMonths ? "underline" : "none",
            fontWeight: sixMonths ? "bold" : "normal",
            color: sixMonths ? "#0075B1" : "#929292",
          }}
        >
          6 M
        </Button>
        <Button
          onClick={() => {
            setTwelveMonths(true);
            setSixMonths(false);
            setOneMonth(false);
          }}
          style={{
            textDecoration: twelveMonths ? "underline" : "none",
            fontWeight: twelveMonths ? "bold" : "normal",
            color: twelveMonths ? "#0075B1" : "#929292",
          }}
        >
          12 M
        </Button>
      </div>
    </div>
  );
}
