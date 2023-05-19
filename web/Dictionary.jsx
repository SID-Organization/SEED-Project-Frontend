import 'regenerator-runtime/runtime';

import React from "react";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";

export const SpeechRecognitionText = () => {
  const commands = [
    {
      command: 'cid limpar tela',
      callback: ({resetTranscript}) => resetTranscript(),
    },
    {
      command: 'cid pesquisar sobre * no google',
      callback: (site) => {
        window.open(`https://www.google.com/search?q=${site}`)
      },
    },
    {
      command: 'cid cor *',
      callback: (cor) => {
        document.body.style.background = cor;
        if(cor === 'Black') document.getElementById('h1-text').style.color = 'white'
        else document.getElementById('h1-text').style.color = 'black'
      }
    }
  ]

  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({commands})

  function handleStart() {
    SpeechRecognition.startListening({continuous: true})
  }

  if(!browserSupportsSpeechRecognition) return (<span>Seu navegador não é compativel com SpeechRecognition.</span>)

  return (
    <div>
      <button onClick={handleStart}>Ativar</button>
      <button onClick={SpeechRecognition.stopListening}>Desativar</button>
      <button onClick={resetTranscript}>Limpar</button>

      <h1 id="h1-text">{transcript}</h1>
    </div>
  )
}