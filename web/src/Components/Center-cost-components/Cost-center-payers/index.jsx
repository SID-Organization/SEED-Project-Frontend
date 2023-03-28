//MUI
import MuiTextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { IconButton, InputAdornment } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

//Props: type(interno, externo)
export default function CostCenterPayers(props) {
  const CCInput = styled(MuiTextField)({
    width: "8rem",
  });

  return (
    <div>
      {" "}
      <div className="grid items-center justify-center">
        <div className="h-64 w-[20rem] rounded border-2 border-dark-blue-weg">
          {" "}
          <div className="flex items-center justify-center">
            <h1 className="mb-5 flex justify-center font-roboto text-lg font-bold text-blue-weg">
              Centro de custos{" "}
              {props.type == "interno" ? "(interno)" : "(externo)"}
            </h1>
            <IconButton>
              <AddRoundedIcon sx={{ color: "#0075B1", fontSize: "1.4rem" }} />
            </IconButton>
          </div>
          <div className="flex items-center justify-around ">
            <CCInput error label="Centro de custo" />
            <CCInput
              error
              label="Porcentagem"
              type="number"
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
