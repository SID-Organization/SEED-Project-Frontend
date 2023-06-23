import { useContext, useEffect, useState } from "react";

//MUI
import MuiTextField from "@mui/material/TextField";
import MuiSelected from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import { InputAdornment, MenuItem } from "@mui/material";

// Demand status JSON
import DemandStatusJSON from "../../utils/Demand-Utils/JSONs/DemandStatus.json"

// Components
import VoiceSpeech from "../VoiceSpeech";

// Translation
import TranslationJson from "../../API/Translate/components/demandFilter.json";
import { TranslateContext } from "../../contexts/translate/index.jsx";

const TextField = styled(MuiTextField)({
  width: "60%",
});

const Select = styled(MuiSelected)({
  width: "60%",
});

export default function FilterComponent(props) {

  const translate = TranslationJson.filterFields;
  const [language] = useContext(TranslateContext);

  const [filterSpeech, setFilterSpeech] = useState({ id: 0, text: "" })
  const [isHovering, setIsHovering] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (filterSpeech.text != "") {
      props.setValue(ps => ps + filterSpeech.text);
      setFilterSpeech({ ...filterSpeech, text: "" })
    }
  }, [filterSpeech])

  const getInput = () => {
    if (props.type == "text" || props.type == "number") {
      return (
        <TextField
          id="standard-basic"
          variant="standard"
          type={props.type}
          value={props.value}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {isHovering || isSpeaking ?
                  <VoiceSpeech setIsSpeaking={setIsSpeaking} setTexto={setFilterSpeech} />
                  :
                  <div className="w-10" />
                }
              </InputAdornment>
            ),
          }}
          onChange={(e) => props.setValue(e.target.value)}
        />
      )
    }
    else
      if (props.type == "select") {
        return (
          <Select
            value={props.value}
            onChange={(e) => props.setValue(e.target.value)}
            variant="standard"
          >
            {props.options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                <div className="h-6 pl-2" style={{ borderLeft: `3px solid ${DemandStatusJSON[option.value]?.["COLOR"]}` }}>
                  {option.label}
                </div>
              </MenuItem>
            ))}
          </Select>
        )
      }
      else
        if (props.type == "date") {
          return (
            <TextField
              id="datetime"
              type={props.type}
              value={props.value}
              onChange={(e) => props.setValue(e.target.value)}
              variant="standard"
              InputLabelProps={{
                shrink: true,
              }}
            />
          )
        }
        else
          if (props.type == "between") {
            return (
              <>
                <TextField
                  id="standard-basic"
                  variant="standard"
                  type="number"
                  sx={{ width: "27%" }}
                  value={props.value}
                  onChange={(e) => props.setValue(e.target.value)}
                />
                <p className="text-sm text-light-blue-weg ml-2 mr-2">{translate['até']?.[language] ?? 'até'}</p>
                <TextField
                  id="standard-basic"
                  variant="standard"
                  type="number"
                  sx={{ width: "27%" }}
                  value={props.endValue}
                  onChange={(e) => props.setEndValue(e.target.value)}
                />
              </>
            )
          }
          else if (props.type == "betweenDate") {
            return (
              <>
                <TextField
                  id="datestart"
                  type="date"
                  value={props.value}
                  onChange={(e) => props.setValue(e.target.value)}
                  variant="standard"
                  sx={{ width: "27%" }}
                />
                <p className="text-sm text-light-blue-weg ml-2 mr-2">{translate['até']?.[language] ?? 'até'}</p>
                <TextField
                  id="dateend"
                  type="date"
                  value={props.endValue}
                  onChange={(e) => props.setEndValue(e.target.value)}
                  variant="standard"
                  sx={{ width: "27%" }}
                />
              </>
            )
          } else if (props.type == "betweenTime") {
            return (
              <>
                <TextField
                  id="time"
                  type="time"
                  value={props.value}
                  onChange={(e) => props.setValue(e.target.value)}
                  variant="standard"
                  sx={{ width: "27%" }}
                />
                <p className="text-sm text-light-blue-weg ml-2 mr-2">{translate['até']?.[language] ?? 'até'}</p>
                <TextField
                  id="timeend"
                  type="time"
                  value={props.endValue}
                  onChange={(e) => props.setEndValue(e.target.value)}
                  variant="standard"
                  sx={{ width: "27%" }}
                />
              </>
            )
          }
          else if (props.type == "time") {
            return (
              <TextField
                id="time"
                type={props.type}
                value={props.value}
                onChange={(e) => props.setValue(e.target.value)}
                variant="standard"
              />
            )
          }
  }

  return (
    <>
      <div className="flex items-center"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <p className="w-[20rem] text-base text-light-blue-weg">{props.title}</p>
        {getInput()}
      </div>
    </>
  );
}
