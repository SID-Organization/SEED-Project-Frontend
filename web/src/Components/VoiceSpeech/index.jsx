import "regenerator-runtime/runtime";
import React, { useContext, useEffect } from "react";
import SpeechRecognitionContext from "../../service/Voice-speech-Service/SpeechRecognitionContext.jsx";

export default function SpeechRecognitionText(props) {
  let { transcript, handleStart, listening } = useContext(SpeechRecognitionContext);

  const [texto, setTexto] = React.useState("");

  useEffect(() => {
    //NECESSITA DE UM USEEFECT AQUI DENTRO PARA RETORNAR CONFORME A VARIÁVEL TRANSCRIPT ESTÁ SENDO MUDADA, DA FORMA QUE ESTÁ AGORA ELÁ SÓ É RETORNADA
    //QUANDO LIGAMOS O MICROFONE (e nesse momento ela é vazia).
    if (listening) {
      console.log("Texto falado: " + transcript);
      props.setTextoFalado(transcript);
      transcript = "";
    } else if (!listening) {
      console.log("setTexto: " + transcript);
      props.setTexto(transcript);
      transcript = "";
    }
  }, [listening]);

  return (
    <div>
      <button onClick={handleStart}>🎤</button>
    </div>
  );


}