import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

// MUI
import { Popper, TextField } from "@mui/material";

// Utils
import FontSizeUtils from "../../utils/FontSize-Utils";


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

export default function VoiceSpeech(props) {

  const [isListening, setIsListening] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [fonts, setFonts] = useState(FontSizeUtils.getFontSizes());
  const [transcriptState, setTranscriptState] = useState("")


  let {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition,
    listening,
  } = useSpeechRecognition({ commands });

  // useEffect(() => {
  //   // When stops listening, set the text
  //   if (!listening) {

  //     props.setTexto(ps => {
  //       if (ps.id != props.speechId) return ps

  //       const newText = { ...ps, text: "" }
  //       newText.text = transcript;

  //       return newText
  //     });
  //     resetTranscript();
  //   }
  // }, [listening]);

  useEffect(() => {
    setTranscriptState(transcript)
  }, [transcript])

  const stopsAndConfirm = () => {
    if (isListening) {
      console.log("Audio desligado")
      SpeechRecognition.stopListening();
      setIsListening(false);
    } else {
      // Called confirm text
      props.setTexto(ps => {
        if (ps.id != props.speechId) return ps
        if (transcriptState == "") return ps

        const newText = { ...ps, text: "" }
        newText.text = " " + transcriptState;

        return newText
      });
      resetTranscript();
      setAnchorEl(null);
    }
  }

  const cancelAndStopListen = () => {
    SpeechRecognition.stopListening();
    setIsListening(false);
    setAnchorEl(null);
  }

  const handleStartListen = (e) => {

    if (!browserSupportsSpeechRecognition) {
      console.log("Seu navegador não é compatível com SpeechRecognition.")
      return <alert>Seu navegador não é compatível com SpeechRecognition.</alert>;
    }

    if (!isListening) {
      setAnchorEl(e.currentTarget);
      console.log("Audio ligado")
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true, language: 'de-DE, en-US, pt-BR' });
      setIsListening(true);
    }

  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <div>
      <button aria-describedby={id} type="button" onClick={handleStartListen}>
        🎤
      </button>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <div className="bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
          <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-2">
            <div className="flex items-center justify-center flex-col">
              {isListening ? (
                <div className="flex">
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-weg"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <p style={{ fontSize: fonts.sm }} className="font-bold text-blue-weg">Ouvindo...</p>
                    <p style={{ fontSize: fonts.sm }} className="text-gray-500">Fale pausadamente e com clareza.</p>
                  </div>
                </div>
              ) : (
                <div className="flex">
                  <div className="flex items-center justify-center">
                    <p>Edite seu texto como preferir</p>
                  </div>
                </div>
              )}
              <TextField
                multiline
                disabled={isListening}
                value={transcriptState}
                onChange={(e) => { setTranscriptState(e.target.value) }}
              />
            </div>
            <div className="flex gap-8">
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-slate-400 text-base text-white sm:text-sm"
                onClick={cancelAndStopListen}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-weg text-base font-medium text-white sm:text-sm"
                onClick={stopsAndConfirm}
              >
                {isListening ? "Parar" : "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      </Popper>
    </div>
  );


}
