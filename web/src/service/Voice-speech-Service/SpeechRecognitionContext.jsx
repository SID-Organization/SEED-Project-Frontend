import React, { createContext } from 'react';
// import { useSpeechRecognition } from 'react-speech-recognition';

const SpeechRecognitionContext = createContext();

export const SpeechRecognitionProvider = ({ children }) => {
  const commands = [
    {
      command: 'cid limpar tela',
      callback: ({ resetTranscript }) => resetTranscript(),
    },
    {
      command: 'cid pesquisar sobre * no google',
      callback: (site) => {
        window.open(`https://www.google.com/search?q=${site}`);
      },
    },
    {
      command: 'cid cor *',
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
    console.log("a")
    if (!listening) {
      startListening({ continuous: true });
    } else {
      stopListening();
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Seu navegador não é compatível com SpeechRecognition.</span>;
  }

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
