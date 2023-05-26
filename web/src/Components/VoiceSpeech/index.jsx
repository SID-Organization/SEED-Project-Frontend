import "regenerator-runtime/runtime";
import React, { useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default function SpeechRecognitionText(props) {

  const commands = [
    {
      command: 'sidney limpar tela',
      callback: ({ resetTranscript }) => resetTranscript(),
    },
    {
      command: 'sidney pesquisar sobre * no google',
      callback: (site) => {
        window.open(`https://www.google.com/search?q=${site}`);
      },
    },
    {
      command: 'sidney cor *',
      callback: (cor) => {
        document.body.style.background = cor;
        if (cor === 'Black') document.getElementById('h1-text').style.color = 'white';
        else document.getElementById('h1-text').style.color = 'black';
      },
    },
  ];

  let {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition,
    listening,
    startListening,
    stopListening,
  } = useSpeechRecognition({ commands });

  useEffect(() => {
    //NECESSITA DE UM USEEFECT AQUI DENTRO PARA RETORNAR CONFORME A VARIÁVEL TRANSCRIPT ESTÁ SENDO MUDADA, DA FORMA QUE ESTÁ AGORA ELÁ SÓ É RETORNADA
    //QUANDO LIGAMOS O MICROFONE (e nesse momento ela é vazia).
    if (listening) {
      console.log("Texto falado: " + transcript);
      props.setTextoFalado(transcript);
    } else if (!listening) {
      console.log("setTexto: " + transcript);
      props.setTexto(transcript);
    }
  }, [listening]);

  const handleStart = () => {

    console.log("handleStart")

    if (!browserSupportsSpeechRecognition) {
      console.log("Seu navegador não é compatível com SpeechRecognition.")
      return <alert>Seu navegador não é compatível com SpeechRecognition.</alert>;
    }

    if (!listening) {
      console.log("Audio ligado")
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
    } else {
      console.log("Audio desligado")
      SpeechRecognition.stopListening();
    }
  };


  return (
    <div>
      <button onClick={handleStart}>🎤</button>
    </div>
  );


}