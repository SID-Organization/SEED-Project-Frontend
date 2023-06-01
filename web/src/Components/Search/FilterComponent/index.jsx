import { useEffect, useState } from "react";

//MUI
import MuiTextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { InputAdornment } from "@mui/material";

// Components
import VoiceSpeech from "../../VoiceSpeech";

const TextField = styled(MuiTextField)({
  width: "80%",
});

export default function FilterComponent(props) {

  const [filterSpeech, setFilterSpeech] = useState({ id: 0, text: "" })
  const [isHovering, setIsHovering] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (filterSpeech.text != "") {
      props.setValue(ps => ps + filterSpeech.text);
      setFilterSpeech({ ...filterSpeech, text: "" })
    }
  }, [filterSpeech])

  return (
    <>
      <div className="flex items-center gap-10"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <p className="w-[20rem] text-base text-light-blue-weg">{props.title}</p>
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
      </div>
    </>
  );
}
