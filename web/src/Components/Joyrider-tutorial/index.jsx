import { useState } from "react";
import Joyride from "react-joyride";

export default function JoyriderTutorial(props) {
  const [tourSteps, setTourSteps] = useState([
    {
      target: "#tutorial-demandCard",
      content:
        "Este é o card da demanda, onde você poderá ver diversas informações sobre ela. Como título, score, valor, datas e etc.",
    },
    {
      target: "#tutorial-sideBar",
      content: "Este é o menu lateral onde você poderá navegar pelo sistema.",
    },
    {
      target: "#tutorial-filter",
      content:
        "Este é o filtro de demandas, onde você poderá filtrar as demandas pelo solicitante, valor, score, título e etc.",
    },
    {
      target: "#tutorial-profile",
      content:
        "E por aqui você poderá acessar seu perfil e mudar suas configurações.",
    },
  ]);
  return (
    <>
      <Joyride
        steps={tourSteps}
        run={true}
        continuous={true}
        showProgress={true}
        showSkipButton={true}
        disableScrolling={true}
        placement={"top"}
        styles={{
          options: {
            zIndex: 10000,
            arrowColor: "#333",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          spotlight: {
            backgroundColor: "#d4ecf944",
          },
          tooltip: {
            backgroundColor: "#333",
            color: "#fff",
          },
          buttonClose: {
            display: "none",
          },
          buttonNext: {
            backgroundColor: "#333",
            color: "#fff",
          },
          buttonBack: {
            backgroundColor: "#333",
            color: "#fff",
          },
          beacon: {
            backgroundColor: "#333",
            borderColor: "#333",
          },
        }}
      />
    </>
  );
}
