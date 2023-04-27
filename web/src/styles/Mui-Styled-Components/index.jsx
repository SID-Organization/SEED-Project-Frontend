import { styled } from "@mui/material/styles";
import MuiTextField from "@mui/material/TextField";


// Create demand
const TextField = styled(MuiTextField)({
    width: "700px",
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
  
    "& .MuiOutlinedInput-input": {
      padding: "5px 5px",
    },
});

export default {
    TextField
}