import React from "react";

// MUI
import { IconButton, Tooltip } from "@mui/material";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";

// Components
import Notification from "../../../../Components/Notification";
import NewBenefitInsertion from "../../../../Components/New-benefit-insert";
import ReactQuill from "react-quill";

// Styled Components
import MUISC from "../../../../styles/Mui-Styled-Components";

// Utils
import ReactQuillUtils from "../../../../utils/ReactQuill-Utils";
const { quillModules } = ReactQuillUtils;

export default function SecondStep({ props }) {
  return (
    <div className="grid gap-3">
      <div className="mb-5 flex items-center justify-center gap-10">
        <div className="h-[5px] w-40 rounded-full bg-blue-weg" />
        <h1 className="font-roboto text-[17px] font-bold text-[#343434]">
          Benefícios reais
        </h1>
        <div className="h-[5px] w-40 rounded-full bg-blue-weg" />

        {props.buttonNotification && (
          <Notification message="Benefício adicionado com sucesso!" />
        )}
        {props.deleteNotification && (
          <Notification message="Benefício removido com sucesso!" />
        )}

        <Tooltip title="Adicionar mais benefícios reais">
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
              benefitIndex={i}
            >
                <ReactQuill
                  value={item.descriptionHTML}
                  onBlur={props.handleCreateDemand}
                  onChange={(e) => {
                    const newRealBenefits = [...props.realBenefits];
                    newRealBenefits[i].descriptionHTML = e;
                    newRealBenefits[i].description = e.replace(/<\/?[^>]+(>|$)/g, "");
                    props.setRealBenefits(newRealBenefits);
                  }}
                  placeholder="Descreva o benefício."
                  modules={quillModules}
                  ref={item.ref}
              />
            </NewBenefitInsertion>
            {(i < props.realBenefits.length - 1 || i === 0) && (
              <div className="mr-16" />
            )}
          </div>
        ))}
      <div className="mb-5 mt-10 flex items-center justify-center gap-10">
        <div className="h-[5px] w-40 rounded-full bg-blue-weg" />
        <h1 className="font-roboto text-[17px] font-bold text-[#343434]">
          Benefícios potenciais
        </h1>
        <div className="h-[5px] w-40 rounded-full bg-blue-weg" />
        <Tooltip title="Adicionar mais benefícios potenciais">
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
                newPotentialBenefits[i].description = item.ref.current
                  ?.getEditor()
                  .getText();
                props.setPotentialBenefits(newPotentialBenefits);
              }}
              ref={item.ref}
              onBlur={props.handleCreateDemand}
              placeholder="Descreva o benefício."
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
        <h1 className="font-roboto text-[17px] font-bold text-[#343434]">
          Benefício qualitativo
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
          onBlur={props.handleCreateDemand}
          onChange={(e) => props.setQualitativeBenefit(e.target.value)}
        />
        <div className="mr-16" />
      </div>
      {/* FIM BENEFICIO QUALITATIVO */}
    </div>
  );
}
