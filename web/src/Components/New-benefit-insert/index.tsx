import { useEffect, useState } from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MuiTextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { InputAdornment, IconButton, Tooltip } from "@mui/material";
import { DeleteRounded } from "@mui/icons-material";
import { Box } from "@mui/system";

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

interface INewBenefit {
  coin: string;
  value: number;
  description: string;
  benefitIndex: number;
  benefitStates: {realBenefits: INewBenefitInsert[], setRealBenefits: React.Dispatch<React.SetStateAction<INewBenefitInsert[]>>
  }};

interface INewBenefitInsert {
  coin: string;
  value: number;
  description: string;
}


export default function NewBenefitInsertion(props : INewBenefit) {
  const [coin, setCoin] = useState(props.coin);
  const [value, setValue] = useState(props.value);
  const [description, setDescription] = useState(props.description);
  
  useEffect(() => {
      props.benefitStates.setRealBenefits(() => {
        const newState = props.benefitStates.realBenefits.filter((item: any, index: any) => index !== props.benefitIndex);
        newState.splice(props.benefitIndex, 0, {coin, value, description});
        return newState;
      })
  }, [coin, value, description]);

  console.log(props.benefitIndex);

  const handleChangeCoinIcon = (event: SelectChangeEvent) => {
    setCoin(event.target.value);
  };

  return (
    <>
    <div>
      <div className="grid mb-4">
        <div className="grid gap-10">
          <div className="flex gap-4 mb-3 mt-5">
            <TextFieldValue
              id="outlined-textarea"
              label="Valor mensal"
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
                >
                  <MenuItem value={"R$"}>BRL</MenuItem>
                  <MenuItem value={"$"}>USD</MenuItem>
                  <MenuItem value={"€"}>EUR</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>

          <div className="flex items-center">
            <TextField
              id="ined-basic"
              label="Descrição"
              variant="outlined"
              type="text"
              multiline
              maxRows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
      {(props.benefitIndex === (props.benefitStates.realBenefits.length-1) && props.benefitIndex !== 0) && (
        <Tooltip
        title="Remover benefício real"
        enterDelay={820}
            leaveDelay={200}
          >
          <IconButton
            sx={{
              marginLeft: "1rem"
            }}
            onClick={() => {
              props.benefitStates.setRealBenefits(() =>
                props.benefitStates.realBenefits.filter((_, index) => index !== props.benefitIndex)
              );
              // setDeleteNotification(true);
            }}
            >
            <DeleteRounded
              style={{
                color: "#00579D",
                fontSize: "2rem",
                cursor: "pointer"
              }}
              />
          </IconButton>
        </Tooltip>
      )}
    </>
  );
}
