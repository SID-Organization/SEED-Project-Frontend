import { useContext, useEffect, useState } from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MuiTextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { InputAdornment, IconButton, Tooltip } from "@mui/material";
import { DeleteRounded } from "@mui/icons-material";
import { Box } from "@mui/system";

// VoiceSpeech
import VoiceSpeech from "../VoiceSpeech";

//Services
import BenefitService from "../../service/Benefit-Service";

//Translation
import TranslationJson from "../../API/Translate/components/newBenefitInsert.json";
import TranslateUtils from "../../utils/Translate-Utils/index.js";
import { TranslateContext } from "../../contexts/translate/index.jsx";

//Formatador de números
import { NumericFormat } from 'react-number-format';

const TextFieldValue = styled(MuiTextField)({
  width: "15rem",
  height: "3.5rem",

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "1.5px solid #0075B1",
    },
    "&:hover fieldset": {
      borderColor: "#0075B1",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#0075B1",
    },
  },
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderLeft: "4px solid #0075B1",
  },
});


export default function NewBenefitInsertion(props) {

  const translate = TranslationJson;
  const [language] = useContext(TranslateContext);

  const [coin, setCoin] = useState(props.coin);
  const [value, setValue] = useState(props.value);

  const [benefitSpeech, setBenefitSpeech] = useState({ id: props.benefitIndex, text: "" });

  // Updates the real state  when the speech is updated
  useEffect(() => {
    if (benefitSpeech.text != "") {
      props.benefitStates.setRealBenefits(() => {
        const newState = props.benefitStates.realBenefits.filter(
          (item, index) => index !== props.benefitIndex
        );
        newState.splice(props.benefitIndex, 0, {
          ...props.benefitStates.realBenefits[props.benefitIndex],
          descriptionHTML: props.benefitStates.realBenefits[props.benefitIndex].descriptionHTML + benefitSpeech.text,
        });
        return newState;
      });
      setBenefitSpeech({ id: props.benefitIndex, text: "" })
    }
  }, [benefitSpeech])

  const updateState = () => {
    props.benefitStates.setRealBenefits(() => {
      const newState = props.benefitStates.realBenefits.filter(
        (item, index) => index !== props.benefitIndex
      );
      newState.splice(props.benefitIndex, 0, {
        ...props.benefitStates.realBenefits[props.benefitIndex],
        coin,
        value,
      });
      return newState;
    });
  };

  const handleChangeCoinIcon = (event) => {
    setCoin(event.target.value);
  };

  const deleteBenefit = () => {
    let benefit = props.benefitStates.realBenefits[props.benefitIndex];
    if (benefit.benefitId) {
      BenefitService.deleteBenefit(benefit.benefitId)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <div>
        <div className="mb-4 grid">
          <div className="grid gap-10">
            <div className="mb-3 mt-5 flex gap-4">
              <NumericFormat
                customInput={TextFieldValue} // Utilize o TextFieldValue como componente personalizado
                id="outlined-textarea"
                label={translate["Valor mensal"]?.[language] ?? "Valor mensal"}
                onBlur={updateState}
                variant="outlined"
                value={value}
                onValueChange={(values) => {
                  setValue(values.floatValue); // Acessa o valor formatado como número
                }}
                decimalScale={2} // Define duas casas decimais (centavos)
                decimalSeparator="," // Define a vírgula como separador de decimais
                thousandSeparator="." // Define o ponto como separador de milhares
                prefix={coin} // Adiciona a moeda como prefixo do valor
                allowNegative={false} // Impede valores negativos
                isNumericString // Permite apenas valores numéricos
                style={{ width: '15rem', height: '3.5rem' }}
              />
              <Box sx={{ minWidth: 100 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">{translate["Moeda"]?.[language] ?? "Moeda"}</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={coin}
                    label={translate["Valor"]?.[language] ?? "Valor"}
                    onChange={handleChangeCoinIcon}
                    style={{
                      borderRadius: "0.5rem",
                      fontSize: "1rem",
                      height: "3.5rem",
                    }}
                    onBlur={updateState}
                  >
                    <MenuItem value={"R$"}>BRL</MenuItem>
                    <MenuItem value={"$"}>USD</MenuItem>
                    <MenuItem value={"€"}>EUR</MenuItem>
                  </Select>
                </FormControl>

              </Box>
            </div>

            <div className="flex items-center">
              {props.children}
              {props.currentSpeech && (
                <div onClick={() => props.currentSpeech.setId(props.benefitIndex)}>
                  <VoiceSpeech setTexto={setBenefitSpeech} speechId={props.currentSpeech.id} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {props.benefitIndex === props.benefitStates.realBenefits.length - 1 &&
        props.benefitIndex !== 0 && (
          <Tooltip title={translate["Remover benefício"]?.[language] ?? "Remover benefício"} enterDelay={820} leaveDelay={200}>
            <IconButton
              sx={{
                marginLeft: "1rem",
              }}
              onClick={() => {
                props.benefitStates.setRealBenefits(() =>
                  props.benefitStates.realBenefits.filter(
                    (_, index) => index !== props.benefitIndex
                  )
                );
                deleteBenefit();
                // setDeleteNotification(true);
              }}
            >
              <DeleteRounded
                style={{
                  color: "#00579D",
                  fontSize: "2rem",
                  cursor: "pointer",
                }}
              />
            </IconButton>
          </Tooltip>
        )}
    </>
  );
}
