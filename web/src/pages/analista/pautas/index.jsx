import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

// Components
import PautasCard from "../../../Components/Pautas-card";
import SubHeaderPautas from "../../../Components/Sub-header-pautas";
import NoContent from "../../../Components/No-content";

// Services
import PautaService from "../../../service/Pauta-Service";

// Utils
import DateUtils from "../../../utils/Date-Utils";

export default function Pautas() {
  const [pautas, setPautas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [pautasMonths, setPautasMonths] = useState([]);
  const [pautasYear, setPautasYear] = useState([]);

  const [filters, setFilters] = useState([{}]);

  useEffect(() => {
    setIsLoading(true); // Define o estado de carregamento como verdadeiro
    PautaService.getPautas().then((data) => {
      if (!data || typeof data !== "object") {
        setPautas([]); // Define a lista de pautas como vazia
        setIsLoading(false); // Define o estado de carregamento como falso
        return;
      }

      if (!data) return;
      let pautas = data.map((pauta) => ({
        ...pauta,
        dataReuniao: DateUtils.formatDate(pauta.dataReuniao),
      }));

      setPautas(pautas);
      setIsLoading(false); // Define o estado de carregamento como falso quando os dados são carregados
    });
  }, []);

  useEffect(() => {
    if (pautas.length === 0) return;
    setPautasMonths(() =>
      pautas
        .map((pauta) => pauta.dataReuniao.split("/")[1])
        .sort()
        .filter((value, index, self) => self.indexOf(value) === index)
    );
    setPautasYear(() =>
      pautas
        .map((pauta) => pauta.dataReuniao.split("/")[2])
        .sort()
        .reverse()
        .filter((value, index, self) => self.indexOf(value) === index)
    );
  }, [pautas]);

  const getPautasInMonth = (month, year) => {
    return pautas.filter(
      (pauta) =>
        pauta.dataReuniao.split("/")[1] === month &&
        pauta.dataReuniao.split("/")[2] === year
    );
  };

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <SubHeaderPautas filters={filters} setFilters={setFilters} />
      <div className="mb-20 mt-12 flex flex-col items-center justify-center gap-10">
        {isLoading ? (
          <div className="flex h-[71vh] items-center justify-around">
            <CircularProgress />
          </div>
        ) : pautas.length > 0 ? (
          pautasYear.map((year) => (
            <>
              {pautasMonths.map((month) => (
                <>
                  {getPautasInMonth(month, year).length > 0 && (
                    <div key={`${year}-${month}`}>
                      <h1 className="text-xl font-bold text-dark-blue-weg">
                        {months[month] + " - " + year}
                      </h1>
                      {getPautasInMonth(month, year).map((pauta) => (
                        <PautasCard
                          key={i}
                          pautaName={"ID da pauta: " + pauta.idPauta}
                          pautaId={pauta.idPauta}
                          qtyProposals={pauta.qtdPropostas}
                          meetingDate={pauta.dataReuniao}
                          meetingTime={pauta.horaReuniao.substring(0, 5)}
                          responsibleAnalyst={pauta.analistaResponsavel}
                        />
                      ))}
                    </div>
                  )}
                </>
              ))}
            </>
          ))
        ) : (
          <div className="flex h-[71vh] items-center justify-around">
            <NoContent isPauta={true} onButtonClick={handleOpenModal}>
              Sem pautas!
            </NoContent>
          </div>
        )}
      </div>
    </div>
  );
}
