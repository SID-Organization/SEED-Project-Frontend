import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

// Components
import AtasCard from "../../../Components/Atas-card";
import SubHeaderAtas from "../../../Components/Sub-header-atas";
import NoContent from "../../../Components/No-content";

// Service
import AtaService from "../../../service/Ata-Service";

// Utils
import DateUtils from "../../../utils/Date-Utils";

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
  10: "Outubro",
  11: "Novembro",
  12: "Dezembro",
};

export default function Atas() {
  const [atas, setAtas] = useState([]);
  const [atasMonths, setAtasMonths] = useState([]);
  const [atasYears, setAtasYears] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAtasInMonth = (month, year) => {
    return atas.filter(
      (ata) =>
        ata.dataReuniaoAta.split("/")[1] === month &&
        ata.dataReuniaoAta.split("/")[2] === year
    );
  };

  useEffect(() => {
    setIsLoading(true);
    AtaService.getAtas()
      .then((res) => {
        if (!res.error) {
          const dbAtas = res.data.map((ata) => {
            ata.dataReuniaoAta = DateUtils.formatDateFromDB(ata.dataReuniaoAta);
            return ata;
          });
          setAtas(dbAtas);
        } else {
          alert("Erro ao buscar atas");
          console.log("Request", res);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
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
        .sort()
        .reverse()
        .filter((value, index, self) => self.indexOf(value) === index)
    );
  }, [atas]);

  return (
    <div>
      <SubHeaderAtas />
      <div className="mt-8 flex flex-col items-center justify-center gap-4">
        {isLoading ? (
          <CircularProgress />
        ) : atasYears.length === 0 ? (
          <div className="flex h-[71vh] items-center justify-around">
            <NoContent isAta={true}>Sem atas!</NoContent>
          </div>
        ) : (
          atasYears.map((year, iY) => (
            <React.Fragment key={year}>
              {atasMonths.map((month, iM) => (
                <React.Fragment key={month}>
                  {getAtasInMonth(month, year).length > 0 && (
                    <div key={iM}>
                      <h1 className="text-xl font-bold text-dark-blue-weg">
                        {months[month] + " - " + year}
                      </h1>
                      {getAtasInMonth(month, year).map((ata, i) => (
                        <AtasCard
                          key={ata.idAta}
                          idAta={ata.idAta}
                          qtyProposals={ata.qtdPropostas}
                          meetingDate={ata.dataReuniaoAta}
                          meetingTime={ata.horarioInicioAta}
                          responsibleAnalyst={ata.analistaResponsavel}
                          proposals={ata.propostasLog}
                        />
                      ))}
                    </div>
                  )}
                </React.Fragment>
              ))}
            </React.Fragment>
          ))
        )}
      </div>
    </div>
  );
}
