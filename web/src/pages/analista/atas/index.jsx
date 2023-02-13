import { useEffect, useState } from "react";
import AtasCard from "../../../Components/Atas-card";

import SubHeaderAtas from "../../../Components/Sub-header-atas";

const atasMock = [
  {
    AtaName: "Ata 1",
    QtyProposals: 2,
    MeetingDate: "10/11/2021",
    MeetingTime: "10:00",
    ResponsibleAnalyst: "João da Silva",
  },
  {
    AtaName: "Ata 2",
    QtyProposals: 2,
    MeetingDate: "10/06/2021",
    MeetingTime: "10:00",
    ResponsibleAnalyst: "Henrique Cole Fernandes",
  },
  {
    AtaName: "Ata 3",
    QtyProposals: 2,
    MeetingDate: "10/02/2022",
    MeetingTime: "10:00",
    ResponsibleAnalyst: "Leonardo Giuseppe de Souza Rafaelli",
  },
  {
    AtaName: "Ata 4",
    QtyProposals: 2,
    MeetingDate: "10/11/2021",
    MeetingTime: "10:00",
    ResponsibleAnalyst: "João da Silva",
  },
];

export default function Atas() {
  const [atas, setAtas] = useState(atasMock);

  const [atasMonths, setAtasMonths] = useState(() =>
    atas
      .map((ata) => ata.MeetingDate.split("/")[1])
      .sort()
      .filter((value, index, self) => self.indexOf(value) === index)
  );

  const [atasYears, setAtasYears] = useState(() =>
    atas
      .map((ata) => ata.MeetingDate.split("/")[2])
      .sort()
      .filter((value, index, self) => self.indexOf(value) === index)
  );

  useEffect(() => {}, [atas]);

  return (
    <div>
      <SubHeaderAtas />
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
        {atasMonths.map((month) => (
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
                atasYears[0]}
            </h1>
            {atas
              .filter((ata) => ata.MeetingDate.split("/")[1] === month)
              .map((ata) => (
                <AtasCard
                  AtaName={ata.AtaName}
                  QtyProposals={ata.QtyProposals}
                  MeetingDate={ata.MeetingDate}
                  MeetingTime={ata.MeetingTime}
                  ResponsibleAnalyst={ata.ResponsibleAnalyst}
                />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
