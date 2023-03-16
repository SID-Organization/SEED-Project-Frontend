import { useEffect, useState } from "react";
import PautasCard from "../../../Components/Pautas-card";
import SubHeaderPautas from "../../../Components/Sub-header-pautas";

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
    MeetingDate: "12/12/2021",
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
  {
    PautaName: "Pauta 5",
    QtyProposals: 2,
    MeetingDate: "10/11/2022",
    MeetingTime: "10:00",
    ResponsibleAnalyst: "João da Silva",
  },
  {
    PautaName: "Pauta 6",
    QtyProposals: 2,
    MeetingDate: "10/06/2021",
    MeetingTime: "10:00",
    ResponsibleAnalyst: "Henrique Cole Fernandes",
  },
  {
    PautaName: "Pauta 7",
    QtyProposals: 2,
    MeetingDate: "10/06/2022",
    MeetingTime: "10:00",
    ResponsibleAnalyst: "Leonardo Giuseppe de Souza Rafaelli",
  },
];

export default function Pautas() {
  const [pautas, setPautas] = useState([]);

  const [pautasMonths, setPautasMonths] = useState([]);

  const [pautasYear, setPautasYear] = useState([]);


  useEffect(() => {
    fetch("http://localhost:8080/sid/api/pauta")
      .then((response) => response.json())
      .then((data) => {
        console.log("DATA", data)
        let pautas = data.map(pauta => ({...pauta, dataReuniao: pauta.dataReuniao.split("T")[0].split("-").reverse().join("/")}))
        console.log("pautas", pautas)
        setPautas(pautas);
      });
  }, [])

  useEffect(() => {
    if(pautas.length === 0) return;
    setPautasMonths(() =>
      pautas
        .map((pauta) => pauta.dataReuniao.split("/")[1])
        .sort()
        .filter((value, index, self) => self.indexOf(value) === index)
    );
    setPautasYear(() =>
      pautas
        .map((pauta) => pauta.dataReuniao.split("/")[2])
        .sort().reverse()
        .filter((value, index, self) => self.indexOf(value) === index)
    );
  }, [pautas]);


  const getPautasInMonth = (month, year) => {
    return pautas.filter((pauta) => pauta.dataReuniao.split("/")[1] === month && pauta.dataReuniao.split("/")[2] === year)
  }

  const months = {
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
  }

  return (
    <div>
      <SubHeaderPautas />
      <div
        className="
        flex
        justify-center
        items-center
        flex-col
        gap-10
        mt-12
        mb-20
      "
      >
        {pautasYear.map((year) => (
          <>
            {pautasMonths.map((month) => (
              <>
                {
                  getPautasInMonth(month, year).length > 0 &&
                  <div>
                    <h1 className=" text-xl font-bold text-dark-blue-weg " >
                      {months[month] +
                        " - " + year}
                    </h1>
                    {getPautasInMonth(month, year)
                      .map((pauta) => (
                        <PautasCard
                          PautaName={"ID da pauta: " + pauta.idPauta}
                          Id={pauta.idPauta}
                          QtyProposals={pauta.qtdPropostas}
                          MeetingDate={pauta.dataReuniao}
                          MeetingTime={pauta.horaReuniao.substring(0, 5)}
                          ResponsibleAnalyst={pauta.analistaResponsavel}
                        />
                      ))}
                  </div>
                }
              </>
            ))}
          </>
        ))}
      </div>
    </div>
  );
}
