import "regenerator-runtime/runtime";
import React, { useEffect, useRef, useState } from "react";
import { InputAdornment } from "@mui/material";
import ReactQuill from "react-quill";
import MUISC from "../../../../styles/Mui-Styled-Components";
import "react-quill/dist/quill.snow.css";
import ReactQuillUtils from "../../../../utils/ReactQuill-Utils";
import VoiceSpeech from "../../../../Components/VoiceSpeech/index.jsx";
import FontSizeUtils from "../../../../utils/FontSize-Utils";

export default function FirstStep({ props }) {
  const [fonts, setFonts] = useState(FontSizeUtils.getFontSizes());

  const [titleSpeech, setTitleSpeech] = useState({ id: 1, text: "" });
  const [proposalSpeech, setProposalSpeech] = useState({ id: 2, text: "" });
  const [currentProblemSpeech, setCurrentProblemSpeech] = useState({ id: 3, text: "" });
  const [frequencyOfUseSpeech, setFrequencyOfUseSpeech] = useState({ id: 4, text: "" });

  const [currentSpeechId, setCurrentSpeechId] = useState(1);

  useEffect(() => {
    setFonts(FontSizeUtils.getFontSizes());
  }, [FontSizeUtils.getFontControl()]);

  // UseEffect para atualizar os estados quando for utilizado o voice speech
  useEffect(() => {
    if (titleSpeech.text != "") {
      props.setTitle(ps => ps + titleSpeech.text);
      setTitleSpeech({ ...titleSpeech, text: "" })
    }

    if (proposalSpeech.text != "") {
      props.setProposalHTML(ps => ps + proposalSpeech.text);
      setProposalSpeech({ ...proposalSpeech, text: "" })
    }

    if (currentProblemSpeech.text != "") {
      props.setCurrentProblemHTML(ps => ps + currentProblemSpeech.text);
      setCurrentProblemSpeech({ ...currentProblemSpeech, text: "" })
    }

    if (frequencyOfUseSpeech.text != "") {
      props.setFrequencyOfUseHTML(ps => ps + frequencyOfUseSpeech.text);
      setFrequencyOfUseSpeech({ ...frequencyOfUseSpeech, text: "" })
    }
  }, [titleSpeech, proposalSpeech, currentProblemSpeech, frequencyOfUseSpeech])

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
          <h1
            style={{ fontSize: fonts.xl }}
            className="flex items-center justify-center font-roboto font-bold text-[#343434]"
          >
            Título
          </h1>
          <div className="ml-12 h-[5px] w-40 rounded-full bg-blue-weg" />
          <div onClick={() => setCurrentSpeechId(titleSpeech.id)}>
            <VoiceSpeech setTexto={setTitleSpeech} speechId={currentSpeechId} />
          </div>
        </div>
        <MUISC.TextField
          id="outlined-textarea"
          variant="outlined"
          type="text"
          multiline
          maxRows={3}
          value={props.title}
          onChange={(e) => props.setTitle(e.target.value)}
          onBlur={() => props.handleCreateDemand()}
          InputProps={{
            startAdornment: <InputAdornment position="start" />
          }}
          helperText={props.title.length == 0 ? "O título é obrigatório" : props.title.length > 100}
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
          <div onClick={() => setCurrentSpeechId(proposalSpeech.id)}>
            <VoiceSpeech setTexto={setProposalSpeech} speechId={currentSpeechId} />
          </div>
        </div>
        <ReactQuill
          value={props.proposalHTML}
          onChange={updateProposal}
          placeholder="Escreva a visão do negócio que vai resolver"
          modules={ReactQuillUtils.quillModules}
          style={ReactQuillUtils.quillStyle}
          onBlur={() => props.handleCreateDemand()}
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
          <div onClick={() => setCurrentSpeechId(currentProblemSpeech.id)}>
            <VoiceSpeech setTexto={setCurrentProblemSpeech} speechId={currentSpeechId} />
          </div>
        </div>
        <ReactQuill
          value={props.currentProblemHTML}
          onChange={updateCurrentProblem}
          placeholder="Descreva a situação atual da demanda."
          onBlur={() => props.handleCreateDemand()}
          modules={ReactQuillUtils.quillModules}
          style={ReactQuillUtils.quillStyle}
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
          <div onClick={() => setCurrentSpeechId(frequencyOfUseSpeech.id)}>
            <VoiceSpeech setTexto={setFrequencyOfUseSpeech} speechId={currentSpeechId} />
          </div>
        </div>
        <ReactQuill
          onBlur={() => props.handleCreateDemand()}
          value={props.frequencyOfUseHTML}
          onChange={updateFrequencyOfUse}
          placeholder="Descreva a frequência de uso da demanda."
          modules={ReactQuillUtils.quillModules}
          style={ReactQuillUtils.quillStyle}
        />
      </div>
    </div>
  );
};
