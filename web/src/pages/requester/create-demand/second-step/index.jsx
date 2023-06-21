import React, { useEffect, useState, useContext } from "react";

// MUI
import { IconButton, Tooltip } from "@mui/material";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";

// Components
import Notification from "../../../../Components/Notification";
import NewBenefitInsertion from "../../../../Components/New-benefit-insert";
import ReactQuill from "react-quill";
import VoiceSpeech from "../../../../Components/VoiceSpeech";

// Styled Components
import MUISC from "../../../../styles/Mui-Styled-Components";

// Utils
import ReactQuillUtils from "../../../../utils/ReactQuill-Utils";
const { quillModules, quillStyle } = ReactQuillUtils;

//Translation
import TranslationJson from "../../../../API/Translate/pages/requester/createDemandSecondStep.json"
import { TranslateContext } from "../../../../contexts/translate/index";

import FontSizeUtils from "../../../../utils/FontSize-Utils";

export default function SecondStep({ props }) {

  const translate = TranslationJson;
  const [language] = useContext(TranslateContext);

  const [fonts, setFonts] = useState(FontSizeUtils.getFontSizes());

  const [realBenefitSpeechId, setRealBenefitSpeechId] = useState(0);
  const [potBenefitSpeechId, setPotBenefitSpeechId] = useState(0);
  const [qualitativeSpeechId, setQualitativeSpeechId] = useState(0);
  
  const [qualitativeSpeech, setQualitativeSpeech] = useState({ id: 1, text: "" });

  useEffect(() => {
    if (qualitativeSpeech.text != "") {
      props.setQualitativeBenefit(ps => ps + qualitativeSpeech.text);
      setQualitativeSpeech({ ...qualitativeSpeech, text: "" })
    }
  }, [qualitativeSpeech])

  useEffect(() => {
    setFonts(FontSizeUtils.getFontSizes());
  }, [FontSizeUtils.getFontControl()]);

  return (
    <div className="grid gap-3">
      <div className="mb-5 flex items-center justify-center gap-10">
        <div className="h-[5px] w-40 rounded-full bg-blue-weg" />
        <h1
          style={{ fontSize: fonts.xl }}
          className="font-roboto font-bold text-[#343434]"
        >
          {translate["Benefícios reais"]?.[language] ?? "Benefícios reais"}
        </h1>
        <div className="h-[5px] w-40 rounded-full bg-blue-weg" />

        {props.buttonNotification && (
          <Notification message={translate["Benefício adicionado com sucesso!"]?.[language] ?? "Benefício adicionado com sucesso!"} />
        )}
        {props.deleteNotification && (
          <Notification message={translate["Benefício removido com sucesso!"]?.[language] ?? "Benefício removido com sucesso!"} />
        )}

        <Tooltip title={translate["Adicionar mais benefícios reais"]?.[language] ?? "Adicionar mais benefícios reais"}>
          <IconButton onClick={props.addRealBenefit}>
            <AddBoxRoundedIcon
              sx={{
                color: "#00579D",
                fontSize: "2rem",
                cursor: "pointer",
              }}
            />
          </IconButton>
        </Tooltip>
      </div>
      {props.realBenefits &&
        props.realBenefits.map((item, i) => (
          <div className="flex items-center justify-center" key={i}>
            <NewBenefitInsertion
              coin={item.coin}
              value={item.value}
              description={item.descriptionHTML}
              benefitStates={{
                realBenefits: props.realBenefits,
                setRealBenefits: props.setRealBenefits,
              }}
              currentSpeech={{
                id: realBenefitSpeechId,
                setId: setRealBenefitSpeechId,
              }}
              benefitIndex={i}
            >
              <ReactQuill
                value={item.descriptionHTML}
                onBlur={() => props.handleCreateDemand()}
                onChange={(e) => {
                  const newRealBenefits = [...props.realBenefits];
                  newRealBenefits[i].descriptionHTML = e;
                  props.setRealBenefits(newRealBenefits);
                }}
                placeholder={translate["Descreva o benefício."]?.[language] ?? "Descreva o benefício."}
                modules={quillModules}
                style={quillStyle}
              />
            </NewBenefitInsertion>
            {(i < props.realBenefits.length - 1 || i === 0) && (
              <div className="mr-16" />
            )}
          </div>
        ))}
      <div className="mb-5 mt-10 flex items-center justify-center gap-10">
        <div className="h-[5px] w-40 rounded-full bg-blue-weg" />
        <h1
          style={{ fontSize: fonts.xl }}
          className="font-roboto font-bold text-[#343434]"
        >
          {translate["Benefícios potenciais"]?.[language] ?? "Benefícios potenciais"}
        </h1>
        <div className="h-[5px] w-40 rounded-full bg-blue-weg" />
        <Tooltip title={translate["Adicionar mais benefícios potenciais"]?.[language] ?? "Adicionar mais benefícios potenciais"}>
          <IconButton onClick={props.addPotentialBenefit}>
            <AddBoxRoundedIcon
              sx={{
                color: "#00579D",
                fontSize: "2rem",
                cursor: "pointer",
              }}
            />
          </IconButton>
        </Tooltip>
      </div>
      {props.potentialBenefits.map((item, i) => (
        <div className="flex items-center justify-center" key={i}>
          <NewBenefitInsertion
            coin={item.coin}
            value={item.value}
            description={item.descriptionHTML}
            currentSpeech={{
              id: potBenefitSpeechId,
              setId: setPotBenefitSpeechId,
            }}
            benefitStates={{
              realBenefits: props.potentialBenefits,
              setRealBenefits: props.setPotentialBenefits,
            }}
            benefitIndex={i}
          >
            <ReactQuill
              theme="snow"
              modules={quillModules}
              value={item.descriptionHTML}
              onChange={(e) => {
                const newPotentialBenefits = [...props.potentialBenefits];
                newPotentialBenefits[i].descriptionHTML = e;
                props.setPotentialBenefits(newPotentialBenefits);
              }}
              onBlur={() => props.handleCreateDemand()}
              placeholder={translate["Descreva o benefício."]?.[language] ?? "Descreva o benefício."}
            />
          </NewBenefitInsertion>
          {(i < props.potentialBenefits.length - 1 || i === 0) && (
            <div className="mr-16" />
          )}
        </div>
      ))}
      {/* BENEFICIO QUALITATIVO */}
      <div className="mb-5 mt-10 flex items-center justify-center gap-10">
        <div className="h-[5px] w-40 rounded-full bg-blue-weg" />
        <h1
          style={{ fontSize: fonts.xl }}
          className="font-roboto font-bold text-[#343434]"
        >
          {translate["Benefício qualitativo"]?.[language] ?? "Benefício qualitativo"}
        </h1>
        <div className="h-[5px] w-40 rounded-full bg-blue-weg" />
      </div>
      <div className="flex items-center justify-center">
        <MUISC.TextField
          sx={{
            marginBottom: "5rem",
          }}
          id="ined-basic"
          label="Descrição"
          variant="outlined"
          type="text"
          multiline
          maxRows={4}
          value={props.qualitativeBenefit}
          onBlur={() => props.handleCreateDemand()}
          onChange={(e) => props.setQualitativeBenefit(e.target.value)}
        />
        <div onClick={() => setQualitativeSpeechId(1)} className="mb-16">
          <VoiceSpeech setTexto={setQualitativeSpeech} speechId={qualitativeSpeechId} />
        </div>
        <div className="mr-16" />
      </div>
      {/* FIM BENEFICIO QUALITATIVO */}
    </div>
  );
}
