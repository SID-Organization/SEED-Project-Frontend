import { useEffect, useState, Fragment } from "react";

// MUI
import { CircularProgress } from "@mui/material";

// Components
import AtasCard from "../../../Components/Atas-card";
import SubHeaderAtas from "../../../Components/Sub-header-atas";
import NoContent from "../../../Components/No-content";

// Service
import AtaService from "../../../service/Ata-Service";
import AtaDGService from "../../../service/AtaDG-Service";

// Utils
import DateUtils from "../../../utils/Date-Utils";
import FontSizeUtils from "../../../utils/FontSize-Utils";
import DemandFilterUtils from "../../../utils/DemandFilter-Utils";


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
  const [isAtaForDG, setIsAtaForDG] = useState(false);

  const [filters, setFilters] = useState(DemandFilterUtils.getEmptyFilter())

  // Font size of the system
  const [fonts, setFonts] = useState(FontSizeUtils.getFontSizes());

  useEffect(() => {
    setFonts(FontSizeUtils.getFontSizes());
  }, [FontSizeUtils.getFontControl()]);

  const getAtasInMonth = (month, year) => {
    if (atas)
      return atas.filter(
        (ata) =>
          ata.dataReuniaoAta.split("/")[1] === month &&
          ata.dataReuniaoAta.split("/")[2] === year
      );
    return [];
  };


  useEffect(() => {
    setIsLoading(true);
    if (!isAtaForDG) {
      // Get Atas passadas pela comissão
      AtaService.getAtas()
        .then((res) => {
          console.log("ATAS", res.data);
          if (!res.error) {
            if (res.data) {
              const dbAtas = res.data.map((ata) => {
                ata.dataReuniaoAta = DateUtils.formatDate(ata.dataReuniaoAta);
                return ata;
              });
              setAtas(dbAtas);
            }
          } else {
            alert("Erro ao buscar atas");
            console.log("Request", res);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      // Busca as atas já passadas pela DG
      AtaDGService.getAtasDG()
        .then((data) => {
          if (data)
            setAtas(data);
        });
    }
  }, [isAtaForDG]);

  useEffect(() => {
    if (atas && atas.length === 0) return;
    setAtasMonths(() =>
      atas && atas
        .map((ata) => ata.dataReuniaoAta.split("/")[1])
        .sort()
        .filter((value, index, self) => self.indexOf(value) === index)
    );
    setAtasYears(() =>
      atas && atas
        .map((ata) => ata.dataReuniaoAta.split("/")[2])
        .sort()
        .reverse()
        .filter((value, index, self) => self.indexOf(value) === index)
    );
  }, [atas]);

  useEffect(() => {
    console.warn("atas", atas);
  }, [atas])

  return (
    <div>
      <SubHeaderAtas
        setFilters={setFilters}
        isAtaForDG={isAtaForDG}
        setIsAtaForDG={setIsAtaForDG}
      />
      <div className="mt-8 flex flex-col items-center justify-center gap-4">
        {isLoading ? (
          <div className="flex h-[71vh] items-center justify-around">
            <CircularProgress />
          </div>
        ) : atasYears.length === 0 ? (
          <div className="flex h-[71vh] items-center justify-around">
            <NoContent isAta={true}>
              <span style={{ fontSize: fonts.xl }}>Sem atas!</span>
            </NoContent>
          </div>
        ) : (
          atasYears.map((year, iY) => (
            <Fragment key={year}>
              {atasMonths.map((month, iM) => (
                <Fragment key={month}>
                  {getAtasInMonth(month, year).length > 0 && (
                    <div key={iM}>
                      <h1
                        style={{ fontSize: fonts.xl }}
                        className=" font-bold text-dark-blue-weg"
                      >
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
                      ))
                      }
                    </div>
                  )}
                </Fragment>
              ))}
            </Fragment>
          ))
        )}
      </div>
    </div>
  );
}