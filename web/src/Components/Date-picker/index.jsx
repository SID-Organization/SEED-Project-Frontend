import react from "react";

import { TextField, InputAdornment } from "@mui/material";
import { styled } from "@mui/material/styles";

const DateField = styled(TextField)({
  width: "14rem",
  marginBottom: "1rem",
  height: "3rem",
});

export default function DatePicker(props) {
  console.log("props.meetingdata: ", props.searchValue);
  return (
    <>
      {props.viewOnly === true ? (
        <DateField
          id="outlined-basic"
          variant="outlined"
          placeholder="dd/mm/aaaa"
          type="date"
          label={props.label}
          value={props.searchValue}
          disabled
          InputProps={{
            startAdornment: <InputAdornment position="start" />,
          }}
        />
      ) : (
        <DateField
          id="outlined-basic"
          variant="outlined"
          placeholder="dd/mm/aaaa"
          type="date"
          label={props.label}
          value={props.searchValue}
          onChange={(e) => props.setSearchValue(e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start" />,
          }}
        />
      )}
    </>
  );
}
