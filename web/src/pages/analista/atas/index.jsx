import { useEffect, useState, Fragment, useContext } from "react";

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

//Translation
import TranslationJson from "../../../API/Translate/pages/analista/atas.json";
import { TranslateContext } from "../../../contexts/translate/index.jsx";

export default function Atas() {
  
  const translate = TranslationJson;
  const [language] = useContext(TranslateContext);

  const months = {
    "01": translate["Janeiro"]?.[language] ?? "Janeiro",
    "02": translate["Fevereiro"]?.[language] ?? "Fevereiro",
    "03": translate["Março"]?.[language] ?? "Março",
    "04": translate["Abril"]?.[language] ?? "Abril",
    "05": translate["Maio"]?.[language] ?? "Maio",
    "06": translate["Junho"]?.[language] ?? "Junho",
    "07": translate["Julho"]?.[language] ?? "Julho",
    "08": translate["Agosto"]?.[language] ?? "Agosto",
    "09": translate["Setembro"]?.[language] ?? "Setembro",
    10: translate["Outubro"]?.[language] ?? "Outubro",
    11: translate["Novembro"]?.[language] ?? "Novembro",
    12: translate["Dezembro"]?.[language] ?? "Dezembro",
  };

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
    setAtasYears([]);
    setAtasMonths([]);
    if (!isAtaForDG) {
      // Get Atas passadas pela comissão
      AtaService.getAtas()
        .then((res) => {
          console.log("ATAS", res.data);
          if (!res.error) {
            if (res.data) {
              // Formata a data de reunião de cada ata para filtrar
              const dbAtas = res.data.map((ata) => {
                ata.dataReuniaoAta = DateUtils.formatDate(ata.dataReuniaoAta);
                return ata;
              });
              setAtas(dbAtas);
            }
          } else {
            alert(translate["Erro ao buscar atas"]?.[language] ?? "Erro ao buscar atas");
            console.log("Request", res);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      // Busca as atas já passadas pela DG
      AtaService.getAtasDG()
        .then((data) => {
          if (data) {
            const dbAtas = data.map((ata) => {
              // Formata a data de reunião de cada ata para filtrar
              ata.dataReuniaoAta = DateUtils.formatDate(ata.dataReuniaoAta);
              return ata;
            });
            setAtas(dbAtas);
          }
        }).finally(() => {
          setIsLoading(false);
        })
    }

  }, [isAtaForDG]);

  // Separa as atas em seus respectivos meses e anos
  useEffect(() => {
    if (atas && atas.length === 0) return;
    setAtasMonths(() =>
      atas && atas
      // Pega o mês de reunião de cada ata
        .map((ata) => ata.dataReuniaoAta.split("/")[1])
        .sort()
        .filter((value, index, self) => self.indexOf(value) === index)
    );
    setAtasYears(() =>
      atas && atas
      // Pega o ano de reunião de cada ata
        .map((ata) => ata.dataReuniaoAta.split("/")[2])
        .sort()
        .reverse()
        .filter((value, index, self) => self.indexOf(value) === index)
    );
  }, [atas]);

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
        ) : atas.length === 0 ? (
          <div className="flex h-[71vh] items-center justify-around">
            <NoContent isAta={true}>
              <span style={{ fontSize: fonts.xl }}>{translate["Sem atas!"]?.[language] ?? "Sem atas!"}</span>
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
                          isAtaForDG={isAtaForDG}
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