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
        "E por aqui você poderá acessar seu perfil e mudar as configurações.",
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
            arrowColor: "#FFF",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          spotlight: {
            backgroundColor: "#d4ecf944",
          },
          tooltip: {
            backgroundColor: "#FFF",
            color: "#023a67",
            borderLeft: "5px solid #023a67",
          },
          buttonClose: {
            display: "none",
          },
          buttonNext: {
            backgroundColor: "#023a67",
            color: "#fff",
            marginLeft: "0.5rem",
          },
          buttonBack: {
            backgroundColor: "#C9C9C9",
            color: "#444",
            borderRadius: "3px",
          },
          buttonSkip: {
            color: "#023a67",
            fontWeight: "bold",
          },
        }}
      />
    </>
  );
}
