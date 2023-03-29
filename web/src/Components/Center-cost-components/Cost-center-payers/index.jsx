//Hooks
import { useState } from "react";

//MUI
import MuiTextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { IconButton, InputAdornment } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

//Props: type(interno, externo)
export default function CostCenterPayers(props) {
  const CCInput = styled(MuiTextField)({
    width: "8rem",
  });

  console.log("PROPS: ", props);

  const addCCInput = () => {
    props.setTotalCostCenterPayers((prevState) => {
      return [
        ...prevState,
        {
          costCenter: "",
          percentage: "",
        },
      ];
    });
  };

  return (
    <div>
      {" "}
      <div className="grid items-center justify-center">
        <div className=" w-[20rem] rounded border-2 border-dark-blue-weg">
          {" "}
          <div className="mb-5 flex items-center justify-center">
            <h1 className="flex justify-center font-roboto text-lg font-bold text-blue-weg">
              Centro de custos{" "}
              {props.type == "interno" ? "(interno)" : "(externo)"}
            </h1>
            <IconButton onClick={addCCInput}>
              <AddRoundedIcon sx={{ color: "#0075B1", fontSize: "1.4rem" }} />
            </IconButton>
          </div>
          {props.totalCostCenterPayers.map((input, index) => {
            return (
              <div
                key={index}
                className="mb-5 flex items-center justify-around"
              >
                <CCInput
                  error
                  label="Centro de custo"
                  value={input.costCenter}
                />
                <CCInput
                  error
                  label="Porcentagem"
                  type="number"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">%</InputAdornment>
                    ),
                  }}
                />
                <IconButton>
                  <DeleteRoundedIcon
                    sx={{ color: "#0075B1", fontSize: "1.4rem" }}
                  />
                </IconButton>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
