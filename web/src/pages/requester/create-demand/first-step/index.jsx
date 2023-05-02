// React
import React, { useRef } from "react";

// MUI
import { InputAdornment } from "@mui/material";

// Components
import ReactQuill from "react-quill";

// Styled Components
import MUISC from "../../../../styles/Mui-Styled-Components"

// Styles
import "react-quill/dist/quill.snow.css";

// Utils
import ReactQuillUtils from "../../../../utils/ReactQuill-Utils";
const { quillModules, quillStyle } = ReactQuillUtils;


export default function FirstStep({ props }) {

    const proposalRef = useRef(null);
    const currentProblemRef = useRef(null);
    const frequencyOfUseRef = useRef(null);

    const updateProposal = (e) => {
        props.setProposalHTML(e);
        if (proposalRef.current?.getEditor().getText())
            props.setProposal(proposalRef.current?.getEditor().getText());
    }

    const updateCurrentProblem = (e) => {
        props.setCurrentProblemHTML(e);
        if (currentProblemRef.current?.getEditor().getText())
            props.setCurrentProblem(currentProblemRef.current?.getEditor().getText());
    }

    const updateFrequencyOfUse = (e) => {
        props.setFrequencyOfUseHTML(e);
        if (frequencyOfUseRef.current?.getEditor().getText())
            props.setFrequencyOfUse(frequencyOfUseRef.current?.getEditor().getText());
    }

    return (
        <div className="grid items-center justify-start gap-20">
            <div className="grid gap-1">
                <div className="mb-5 flex items-center justify-center">
                    <div className="mr-12 h-[5px] w-40 rounded-full bg-blue-weg" />
                    <h1 className="flex items-center justify-center font-roboto text-[17px] font-bold text-[#343434]">
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
                        startAdornment: <InputAdornment position="start" />,
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
                    ref={proposalRef}
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
                    ref={currentProblemRef}
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
                    ref={frequencyOfUseRef}
                    style={quillStyle}
                />
            </div>
        </div>
    );
};