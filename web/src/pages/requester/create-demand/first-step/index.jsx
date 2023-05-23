import "regenerator-runtime/runtime";
import React, { useEffect, useRef } from "react";
import { InputAdornment } from "@mui/material";
import ReactQuill from "react-quill";
import MUISC from "../../../../styles/Mui-Styled-Components";
import "react-quill/dist/quill.snow.css";
import ReactQuillUtils from "../../../../utils/ReactQuill-Utils";
import { SpeechRecognitionProvider } from "../../../../service/Voice-speech-Service/SpeechRecognitionContext.jsx";
import VoiceSpeech from "../../../../Components/VoiceSpeech/index.jsx";

const { quillModules, quillStyle } = ReactQuillUtils;

export default function FirstStep({ props }) {
  const [textoSpeech, setTextoSpeech] = React.useState("");
  const [textoAgora, setTextoAgora] = React.useState("");
  const [textoInput, setTextoInput] = React.useState("");

  useEffect(() => {
    console.log("textoSpeech", textoSpeech);
    if (textoSpeech !== "") {
      if (props.title === "") {
        props.setTitle(textoSpeech);
      } else {
        props.setTitle(props.title + " " + textoSpeech);
      }
    }
    setTextoSpeech("");
  }, [textoSpeech]);

  useEffect(() => {
    console.log(textoAgora);
  }, [textoAgora]);

  useEffect(() => {
    console.log("textoInput", textoInput);
    props.setTitle(textoInput);
  }, [textoInput]);

  const updateProposal = (e) => {
    props.setProposalHTML(e);
  };

  const updateCurrentProblem = (e) => {
    props.setCurrentProblemHTML(e);
  };

  const updateFrequencyOfUse = (e) => {
    props.setFrequencyOfUseHTML(e);
  };

  const handleSpeechInput = (text) => {
    setTextoSpeech(text);
  };

  return (
    <div className="grid items-center justify-start gap-20">
      <div className="grid gap-1">
        <div className="mb-5 flex items-center justify-center">
          <div className="mr-12 h-[5px] w-40 rounded-full bg-blue-weg" />
          <h1 className="flex items-center justify-center font-roboto text-[17px] font-bold text-[#343434]">
            Título
          </h1>
          <div className="ml-12 h-[5px] w-40 rounded-full bg-blue-weg" />
          <VoiceSpeech setTexto={setTextoSpeech} setTitle={props.setTitle} setTextoFalado={setTextoAgora} />
        </div>
        <MUISC.TextField
          id="outlined-textarea"
          variant="outlined"
          type="text"
          multiline
          maxRows={3}
          value={props.title}
          onChange={(e) => setTextoInput(e.target.value)}
          onBlur={props.handleCreateDemand}
          InputProps={{
            startAdornment: <InputAdornment position="start" />
          }}
          helperText={
            props.title.length == 0 ? "O título é obrigatório" : props.title.length > 100
          }
          error={props.title.length == 0 || props.title.length > 100}
        />
      </div>
      <div className="grid gap-1">
        <div className="mb-5 flex items-center justify-center gap-5">
          <div className="h-[5px] w-40 rounded-full bg-blue-weg" />
          <h1 className="flex items-center justify-center font-roboto text-[17px] font-bold text-[#343434]">
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
          <h1 className="flex items-center justify-center font-roboto text-[17px] font-bold text-[#343434]">
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
          <h1 className="flex items-center justify-center font-roboto text-[17px] font-bold text-[#343434]">
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
};