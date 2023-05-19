import "regenerator-runtime/runtime";

// React
import React, { useEffect, useRef, useState } from "react";

// MUI
import { InputAdornment } from "@mui/material";

// Components
import ReactQuill from "react-quill";

// Styled Components
import MUISC from "../../../../styles/Mui-Styled-Components";

// Styles
import "react-quill/dist/quill.snow.css";

// Utils
import ReactQuillUtils from "../../../../utils/ReactQuill-Utils";
import { SpeechRecognitionProvider } from "../../../../service/Voice-speech-Service/SpeechRecognitionContext.jsx";
import VoiceSpeech from "../../../../Components/VoiceSpeech/index.jsx";

const { quillModules, quillStyle } = ReactQuillUtils;
import FontSizeUtils from "../../../../utils/FontSize-Utils";

export default function FirstStep({ props }) {
  const [fonts, setFonts] = useState(FontSizeUtils.getFontSizes());

  const [textoSpeech, setTextoSpeech] = React.useState("");

  const [microfone, setMicrofone] = React.useState(false);

  useEffect(() => {
    props.setTitle(textoSpeech);
  }, [textoSpeech]);

  useEffect(() => {
    setFonts(FontSizeUtils.getFontSizes());
  }, [FontSizeUtils.getFontControl()]);

  const updateProposal = (e) => {
    props.setProposalHTML(e);
  };

  const updateCurrentProblem = (e) => {
    props.setCurrentProblemHTML(e);
  };

  const updateFrequencyOfUse = (e) => {
    props.setFrequencyOfUseHTML(e);
  };

  return (
    <div className="grid items-center justify-start gap-20">
      <div className="grid gap-1">
        <div className="mb-5 flex items-center justify-center">
          <div className="mr-12 h-[5px] w-40 rounded-full bg-blue-weg" />
          <VoiceSpeech setTexto={setTextoSpeech} setMicOn={setMicrofone} />
          <h1
            style={{ fontSize: fonts.xl }}
            className="flex items-center justify-center font-roboto font-bold text-[#343434]"
          >
            Título
          </h1>
          <div className="ml-12 h-[5px] w-40 rounded-full bg-blue-weg" />
        </div>
        <MUISC.TextField
          id="outlined-textarea"
          variant="outlined"
          type="text"
          multiline
          maxRows={3}
          value={props.title}
          onChange={(e) => props.setTitle(e.target.value)}
          onBlur={props.handleCreateDemand}
          InputProps={{
            startAdornment: <InputAdornment position="start" />
          }}
          helperText={
            props.title.length == 0
              ? "O título é obrigatório"
              : props.title.length > 100
          }
          error={props.title.length == 0 || props.title.length > 100}
        />
      </div>
      <div className="grid gap-1">
        <div className="mb-5 flex items-center justify-center gap-5">
          <div className="h-[5px] w-40 rounded-full bg-blue-weg" />
          <h1
            style={{ fontSize: fonts.xl }}
            className="flex items-center justify-center font-roboto font-bold text-[#343434]"
          >
            Objetivo
          </h1>
          <div className="h-[5px] w-40 rounded-full bg-blue-weg" />
        </div>
        <ReactQuill
          value={props.proposalHTML}
          onChange={updateProposal}
          placeholder="Escreva a visão do negócio que vai resolver"
          modules={quillModules}
          style={quillStyle}
          onBlur={props.handleCreateDemand}
        />
      </div>
      <div className="grid gap-1">
        <div className="mb-5 flex items-center justify-center gap-5">
          <div className="mr-3 h-[5px] w-40 rounded-full bg-blue-weg" />
          <h1
            style={{ fontSize: fonts.xl }}
            className="flex items-center justify-center font-roboto font-bold text-[#343434]"
          >
            Situação atual
          </h1>
          <div className="ml-3 h-[5px] w-40 rounded-full bg-blue-weg" />
        </div>
        <ReactQuill
          value={props.currentProblemHTML}
          onChange={updateCurrentProblem}
          placeholder="Descreva a situação atual da demanda."
          onBlur={props.handleCreateDemand}
          modules={quillModules}
          style={quillStyle}
        />
      </div>

      <div className="mb-20 grid gap-1">
        <div className="mb-5 flex items-center justify-center gap-5">
          <div className="h-[5px] w-40 rounded-full bg-blue-weg" />
          <h1
            style={{ fontSize: fonts.xl }}
            className="flex items-center justify-center font-roboto font-bold text-[#343434]"
          >
            Frequência de uso
          </h1>
          <div className="h-[5px] w-40 rounded-full bg-blue-weg" />
        </div>
        <ReactQuill
          onBlur={props.handleCreateDemand}
          value={props.frequencyOfUseHTML}
          onChange={updateFrequencyOfUse}
          placeholder="Descreva a frequência de uso da demanda."
          modules={quillModules}
          style={quillStyle}
        />
      </div>
    </div>
  );
}

