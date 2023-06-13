import { styled } from "@mui/material/styles";

// Create demand (Step 1 and 2)
import MuiTextField from "@mui/material/TextField";

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


// Create demand (Step 3)
import { TableCell, TableRow } from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));


export default {
    TextField,
    StyledTableCell,
    StyledTableRow,
}