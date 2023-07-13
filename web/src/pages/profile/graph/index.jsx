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

  const [approvedData, setApprovedData] = useState([]);
  const [cancelledData, setCancelledData] = useState([]);
  const [labels, setLabels] = useState([]);

  const translate = TranslationJson;
  const [language] = useContext(TranslateContext);

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

  useEffect(() => {
    if (twelveMonths) {
      setApprovedData([12, 19, 3, 15, 10, 12, 5, 3, 8, 2, 1, 4]);
      setCancelledData([5, 3, 8, 2, 1, 4, 12, 19, 3, 15, 10, 12]);
      setLabels([
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
      ]);
    } else if (sixMonths) {
      setApprovedData([12, 19, 3, 15, 10, 12]);
      setCancelledData([5, 3, 8, 2, 1, 4]);
      setLabels(["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"]);
    } else if (oneMonth) {
      setApprovedData([
        1, 0, 0, 0, 2, 1, 4, 0, 1, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 2,
      ]);
      setCancelledData([
        0, 0, 0, 0, 2, 1, 4, 0, 1, 3, 1, 1, 2, 1, 2, 1, 0, 0, 0, 2, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 2,
      ]);
      setLabels([
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
      ]);
    }
  }, [twelveMonths, sixMonths, oneMonth]);

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
        pointHoverBackgroundColor: "#25640D",
      },
      {
        label: "Média Aprovadas",
        data: labels.map(() => approvedAvg.toFixed(2)),
        fill: false,
        backgroundColor: "#0075B160",
        borderColor: "#0075B160",
        pointHoverBackgroundColor: "#25640D",
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
        pointHoverBackgroundColor: "#333",
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
          {oneMonth && (
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
              onChange={(e) => {
                setApprovedData(
                  MonthsJSON[e.target.value].APPROVED.map((data) =>
                    parseInt(data)
                  )
                );
                setCancelledData(
                  MonthsJSON[e.target.value].CANCELLED.map((data) =>
                    parseInt(data)
                  )
                );
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
    </div>
  );
}
