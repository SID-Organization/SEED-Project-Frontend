import { useEffect, useState } from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MuiTextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { InputAdornment, IconButton, Tooltip } from "@mui/material";
import { DeleteRounded } from "@mui/icons-material";
import { Box } from "@mui/system";

//Services
import BenefitService from "../../service/Benefit-Service";

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

// interface INewBenefit {
//   coin: string;
//   value: number;
//   description: string;
//   benefitIndex: number;
//   benefitStates: {
//     realBenefits: INewBenefitInsert[];
//     setRealBenefits: React.Dispatch<React.SetStateAction<INewBenefitInsert[]>>;
//   };
// }

// interface INewBenefitInsert {
//   coin: string;
//   value: number;
//   description: string;
//   descriptionRef: React.RefObject<HTMLDivElement>;
// }

export default function NewBenefitInsertion(props) {
  const [coin, setCoin] = useState(props.coin);
  const [value, setValue] = useState(props.value);

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
              <TextFieldValue
                id="outlined-textarea"
                label="Valor mensal"
                onBlur={updateState}
                variant="outlined"
                type="number"
                multiline
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">{coin}</InputAdornment>
                  ),
                }}
                maxRows={1}
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
              />
              <Box sx={{ minWidth: 100 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Moeda</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={coin}
                    label="Valor"
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

            <div className="flex items-center">{props.children}</div>
          </div>
        </div>
      </div>
      {props.benefitIndex === props.benefitStates.realBenefits.length - 1 &&
        props.benefitIndex !== 0 && (
          <Tooltip title="Remover benefício" enterDelay={820} leaveDelay={200}>
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
