import "regenerator-runtime/runtime";
import React, { useContext, useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

// MUI
import { Button, IconButton, Popper, TextField, Tooltip } from "@mui/material";
import MicRoundedIcon from "@mui/icons-material/MicRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

// Utils
import FontSizeUtils from "../../utils/FontSize-Utils";

//Translation
import TranslationJson from "../../API/Translate/components/voiceSpeech.json";
import TranslateUtils from "../../utils/Translate-Utils/index.js";
import { TranslateContext } from "../../contexts/translate/index.jsx";

const commands = [
  {
    command: "sidney limpar tela",
    callback: ({ resetTranscript }) => resetTranscript(),
  },
  {
    command: "sidney pesquisar sobre * no google",
    callback: (site) => {
      window.open(`https://www.google.com/search?q=${site}`);
    },
  },
  {
    command: "sidney cor *",
    callback: (cor) => {
      document.body.style.background = cor;
      if (cor === "Black")
        document.getElementById("h1-text").style.color = "white";
      else document.getElementById("h1-text").style.color = "black";
    },
  },
];

export default function VoiceSpeech(props) {
  const translate = TranslationJson;
  const [language] = useContext(TranslateContext);

  const [isListening, setIsListening] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [fonts, setFonts] = useState(FontSizeUtils.getFontSizes());
  const [transcriptState, setTranscriptState] = useState("");

  let { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition({ commands });

  useEffect(() => {
    setTranscriptState(transcript);
  }, [transcript]);

  const stopsAndConfirm = () => {
    if (isListening) {
      SpeechRecognition.stopListening();
      setIsListening(false);
      const speectText = transcript[0].toUpperCase() + transcript.slice(1);
      // Called confirm text
      props.setTexto((ps) => {
        if (props.speechId && ps.id != props.speechId) return ps;
        if (speectText == "") return ps;

        const newText = { ...ps, text: "" };
        newText.text = " " + speectText;

        return newText;
      });
      resetTranscript();
      if (props.setIsSpeaking) props.setIsSpeaking(false);
      setAnchorEl(null);
    }
  };

  const cancelAndStopListen = () => {
    SpeechRecognition.stopListening();
    setIsListening(false);
    resetTranscript();
    if (props.setIsSpeaking) props.setIsSpeaking(false);
    setAnchorEl(null);
  };

  const handleStartListen = (e) => {
    if (!browserSupportsSpeechRecognition) {
      console.log("Seu navegador não é compatível com SpeechRecognition.");
      return (
        <alert>
          {translate["Seu navegador não é compatível com SpeechRecognition."]?.[
            language
          ] ?? "Seu navegador não é compatível com SpeechRecognition"}
        </alert>
      );
    }

    if (!isListening) {
      setAnchorEl(e.currentTarget);
      resetTranscript();
      SpeechRecognition.startListening({
        continuous: true,
        language: ["pt-br", "en-US"],
      }); // 'de-DE',
      setIsListening(true);
      if (props.setIsSpeaking) props.setIsSpeaking(true);
    } else {
      cancelAndStopListen();
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <div>
      <IconButton
        aria-describedby={id}
        type="button"
        onClick={handleStartListen}
      >
        <MicRoundedIcon className="text-blue-weg" sx={{ fontSize: "1.4rem" }} />
      </IconButton>
      <Popper id={id} open={open} anchorEl={anchorEl} style={{ zIndex: 9999 }}>
        <div className="w-80 overflow-hidden rounded-lg border-l-4 border-blue-weg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="relative grid bg-white">
            <div className="flex flex-col items-center justify-center">
              {isListening ? (
                <div className="grid w-full items-center justify-start p-5">
                  <div className="flex items-center justify-start">
                    <svg
                      className="-ml-1 mr-3 h-5 w-5 animate-spin text-blue-weg"
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
                    <p
                      style={{ fontSize: fonts.sm }}
                      className="font-bold text-blue-weg"
                    >
                      {translate["Ouvindo ..."]?.[language] ?? "Ouvindo ..."}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex">
                  <div className="flex items-center justify-center gap-2 p-5 font-bold text-blue-weg">
                    <EditRoundedIcon
                      className="text-blue-weg"
                      fontSize="small"
                    />
                    <p>
                      {translate["Edite seu texto como preferir"]?.[language] ??
                        "Edite seu texto como preferir"}
                    </p>
                  </div>
                </div>
              )}
              <div className="w-full">
                {isListening == true && (
                  <div className="flex flex-col pl-4">
                    <p style={{ fontSize: fonts.sm }} className="text-gray-500">
                      {translate["Fale pausadamente e com clareza."]?.[
                        language
                      ] ?? "Fale pausadamente e com clareza."}
                    </p>
                  </div>
                )}
                <TextField
                  sx={{
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                      {
                        border: "none",
                      },
                    width: "100%",
                    height: "100%",
                    paddingLeft: "3px",
                  }}
                  multiline
                  maxRows={10}
                  disabled={isListening}
                  value={transcriptState}
                  onChange={(e) => {
                    setTranscriptState(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex items-center justify-around gap-8 p-4">
              <Button
                sx={{
                  backgroundColor: "#adadad",

                  "&:hover": {
                    backgroundColor: "#adadad",
                  },
                }}
                variant="contained"
                type="button"
                className="inline-flex w-full justify-center rounded-md border border-transparent bg-slate-400 px-4 py-2 text-base text-white shadow-sm sm:text-sm"
                onClick={cancelAndStopListen}
              >
                {translate["Cancelar"]?.[language] ?? "Cancelar"}
              </Button>
              <Button
                sx={{
                  backgroundColor: "#0075b1",
                }}
                variant="contained"
                type="button"
                className="hover:bg-blue-weg-light focus:ring-blue-weg-light inline-flex w-full justify-center rounded-md border border-transparent bg-blue-weg px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm"
                onClick={stopsAndConfirm}
              >
                {isListening
                  ? translate["Parar"]?.[language] ?? "Parar"
                  : translate["Confirmar"][language] ?? "Confirmar"}
              </Button>
            </div>
          </div>
        </div>
      </Popper>
    </div>
  );
}
