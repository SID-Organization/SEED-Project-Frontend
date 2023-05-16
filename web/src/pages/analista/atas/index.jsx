import { useEffect, useState } from "react";

// Components
import AtasCard from "../../../Components/Atas-card";
import SubHeaderAtas from "../../../Components/Sub-header-atas";

// Service
import AtaService from "../../../service/Ata-Service"

// Utils
import DateUtils from "../../../utils/Date-Utils"

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

export default function Atas() {
  const [atas, setAtas] = useState([]);

  const [atasMonths, setAtasMonths] = useState([]);

  const [atasYears, setAtasYears] = useState([]);

  const getAtasInMonth = (month, year) => {
    return atas.filter((ata) => ata.dataReuniaoAta.split("/")[1] === month && ata.dataReuniaoAta.split("/")[2] === year)
  }

  useEffect(() => {
    AtaService.getAtas().then(res => {
      if (!res.error) {
        console.log("ATAS", res.data);
        const dbAtas = res.data.map(ata => {
          ata.dataReuniaoAta = DateUtils.formatDateFromDB(ata.dataReuniaoAta)
          return ata;
        })
        setAtas(dbAtas);
      } else {
        alert("Erro ao buscar atas");
        console.log("Request", res)
      }
    })
  }, [])

  // Filtra para pegar os meses e anos das atas
  useEffect(() => {
    console.log("ATAS", atas);
    if (atas.length === 0) return;
    setAtasMonths(() =>
      atas
        .map((ata) => ata.dataReuniaoAta.split("/")[1])
        .sort()
        .filter((value, index, self) => self.indexOf(value) === index)
    );
    setAtasYears(() =>
      atas
        .map((ata) => ata.dataReuniaoAta.split("/")[2])
        .sort().reverse()
        .filter((value, index, self) => self.indexOf(value) === index)
    );
  }, [atas]);

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


        {atasYears.map((year, iY) => (
          <>
            {atasMonths.map((month, iM) => (
              <>
                {
                  getAtasInMonth(month, year).length > 0 &&
                  <div key={iM + "" + iY}>
                    <h1 className=" text-xl font-bold text-dark-blue-weg " >
                      {months[month] +
                        " - " + year}
                    </h1>
                    {getAtasInMonth(month, year)
                      .map((ata, i) => (
                        <AtasCard
                          key={i}
                          idAta={ata.idAta}
                          QtyProposals={ata.qtdPropostas}
                          MeetingDate={ata.dataReuniaoAta}
                          MeetingTime={ata.horarioInicioAta}
                          ResponsibleAnalyst={ata.analistaResponsavel}
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
