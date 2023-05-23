import React, { createContext, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const SpeechRecognitionContext = createContext();
export const SpeechRecognitionProvider = ({ children }) => {
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

  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition,
    listening,
    startListening,
    stopListening,
  } = useSpeechRecognition({ commands });

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

  const contextValue = {
    transcript,
    resetTranscript,
    handleStart,
    startListening,
    browserSupportsSpeechRecognition,
    listening,
    stopListening,
  };

  return <SpeechRecognitionContext.Provider value={contextValue}>{children}</SpeechRecognitionContext.Provider>;
};

export default SpeechRecognitionContext;
