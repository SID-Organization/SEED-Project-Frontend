import { getPaperUtilityClass } from "@mui/material";
import React, { useEffect, useState } from "react";
import PautasCard from "../../../Components/Pautas-card";
import SubHeaderPautas from "../../../Components/Sub-header-pautas";

import "../../../styles/index.css";

const pautasMock = [
  {
    PautaName: "Pauta 1",
    QtyProposals: 2,
    MeetingDate: "10/11/2021",
    MeetingTime: "10:00",
    ResponsibleAnalyst: "João da Silva",
  },
  {
    PautaName: "Pauta 2",
    QtyProposals: 2,
    MeetingDate: "10/06/2021",
    MeetingTime: "10:00",
    ResponsibleAnalyst: "Henrique Cole Fernandes",
  },
  {
    PautaName: "Pauta 3",
    QtyProposals: 2,
    MeetingDate: "10/02/2022",
    MeetingTime: "10:00",
    ResponsibleAnalyst: "Leonardo Giuseppe de Souza Rafaelli",
  },
];

export default function Pautas() {
  const [pautas, setPautas] = useState(pautasMock);

  const [pautasMonths, setPautasMonths] = useState(() =>
    pautas
      .map((pauta) => pauta.MeetingDate.split("/")[1])
      .sort()
      .filter((value, index, self) => self.indexOf(value) === index)
  );

  const [pautasYears, setPautasYears] = useState(() =>
    pautas
      .map((pauta) => pauta.MeetingDate.split("/")[2])
      .sort()
      .filter((value, index, self) => self.indexOf(value) === index)
  );

  useEffect(() => {}, [pautas]);

  return (
    <div>
      <SubHeaderPautas />
      <div
        className="
        flex
        justify-center
        items-center
        flex-col
        gap-4
        mt-8
      "
      >
        {pautasMonths.map((month) => (
          <div>
            <h1
              className="
      text-xl
      font-bold
      text-dark-blue-weg
      "
            >
              {{
                "01": "Janeiro",
                "02": "Fevereiro",
                "03": "Março",
                "04": "Abril",
                "05": "Maio",
                "06": "Junho",
                "07": "Julho",
                "08": "Agosto",
                "09": "Setembro",
                "10": "Outubro",
                "11": "Novembro",
                "12": "Dezembro",
              }[month] +
                " - " +
                pautasYears[0]}
            </h1>
            {pautas
              .filter((pauta) => pauta.MeetingDate.split("/")[1] === month)
              .map((pauta) => (
                <PautasCard
                  PautaName={pauta.PautaName}
                  QtyProposals={pauta.QtyProposals}
                  MeetingDate={pauta.MeetingDate}
                  MeetingTime={pauta.MeetingTime}
                  ResponsibleAnalyst={pauta.ResponsibleAnalyst}
                />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
