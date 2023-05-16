import { useEffect, useState } from "react";

// Components
import PautasCard from "../../../Components/Pautas-card";
import SubHeaderPautas from "../../../Components/Sub-header-pautas";

// Services
import PautaService from "../../../service/Pauta-Service";

// Utils
import DateUtils from "../../../utils/Date-Utils";

export default function Pautas() {
  const [pautas, setPautas] = useState([]);

  const [pautasMonths, setPautasMonths] = useState([]);

  const [pautasYear, setPautasYear] = useState([]);

  const [filters, setFilters] = useState([{}]);

  useEffect(() => {
    PautaService.getPautas().then((data) => {
      if(!data) return;
      let pautas = data.map(pauta => ({...pauta, dataReuniao: DateUtils.formatDate(pauta.dataReuniao)}))
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
      <SubHeaderPautas filters={filters} setFilters={setFilters}/>
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
                  getPautasInMonth(month, year) &&
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
