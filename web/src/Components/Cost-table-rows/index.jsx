import React, { useState, useEffect, useRef } from "react";
import { IconButton, InputAdornment, TextField, Tooltip } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

import { styled } from "@mui/material/styles";

import MuiTextField from "@mui/material/TextField";

const TableInput = styled(MuiTextField)({
  width: "100%",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      border: "none",
    },
    "&.Mui-focused fieldset": {
      border: "none",
    },
  },
});

export default function CostTableRow(props) {
  const [expenseType, setExpenseType] = useState(props.totalCost.expenseType);
  const [expenseProfile, setExpenseProfile] = useState(
    props.totalCost.expenseProfile
  );
  const [monthTimeExecution, setMonthTimeExecution] = useState(
    props.totalCost.monthTimeExecution
  );
  const [necessaryHours, setNecessaryHours] = useState(
    props.totalCost.necessaryHours
  );
  const [costHour, setCostHour] = useState(props.totalCost.costHour);
  const [totalExpenseCost, setTotalExpenseCost] = useState(
    props.totalCost.totalExpenseCost
  );
  const [costCenterPayers, setCostCenterPayers] = useState(
    props.totalCost.costCenterPayers
  );

  const cleanStates = () => {
    setExpenseType("");
    setExpenseProfile("");
    setMonthTimeExecution("");
    setNecessaryHours("");
    setCostHour("");
    setTotalExpenseCost("");
    setCostCenterPayers("");
  };

  const updateTable = () => {
    let costList = props.costList;
    costList[props.index] = {
      expenseType,
      expenseProfile,
      monthTimeExecution,
      necessaryHours,
      costHour,
      totalExpenseCost,
      costCenterPayers,
    };
    props.setCostList(costList);
  };

  const deleteRow = () => {
    cleanStates();
    props.setCostList(props.costList.filter((_, i) => i !== props.index));
  };

  useEffect(() => {
    console.log("props", props.totalCost);
  }, [props.totalCost]);

  return (
    <>
      <tr>
        <td className="border-2 border-blue-weg border-b-2 border-t-0">
          <TableInput
            id="outlined-basic"
            variant="outlined"
            size="small"
            value={expenseType}
            onChange={(e) => {
              setExpenseType(e.target.value);
            }}
            multiline
            onBlur={updateTable}
          />
        </td>
        <td className="border-2 border-blue-weg border-b-2 border-t-0">
          <TableInput
            id="outlined-basic"
            variant="outlined"
            size="small"
            value={expenseProfile}
            onChange={(e) => {
              setExpenseProfile(e.target.value);
            }}
            onBlur={updateTable}
          />
        </td>
        <td className="border-2 border-blue-weg border-b-2 border-t-0">
          <TableInput
            id="outlined-basic"
            variant="outlined"
            size="small"
            value={monthTimeExecution}
            onChange={(e) => {
              setMonthTimeExecution(e.target.value);
            }}
            onBlur={updateTable}
          />
        </td>
        <td className="border-2 border-blue-weg border-b-2 border-t-0">
          <div className="flex justify-center items-center">
            <TableInput
              id="outlined-basic"
              variant="outlined"
              size="small"
              value={necessaryHours}
              onChange={(e) => {
                setNecessaryHours(e.target.value);
              }}
              onBlur={updateTable}
            />
          </div>
        </td>
        <td className="border-2 border-blue-weg border-b-2 border-t-0">
          <div className="flex justify-center items-center">
            <TableInput
              id="outlined-basic"
              variant="outlined"
              size="small"
              value={costHour}
              onChange={(e) => {
                setCostHour(e.target.value);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">R$</InputAdornment>
                ),
              }}
              onBlur={updateTable}
            />
          </div>
        </td>
        <td className="border-2 border-blue-weg border-b-2 border-t-0">
          <div className="flex justify-center items-center">
            <TableInput
              id="outlined-basic"
              variant="outlined"
              size="small"
              value={totalExpenseCost}
              onChange={(e) => {
                setTotalExpenseCost(e.target.value);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">R$</InputAdornment>
                ),
              }}
              onBlur={updateTable}
            />
          </div>
        </td>
        <td className="border-2 border-blue-weg border-b-2 border-t-0">
          <div className="flex justify-center items-center">
            <TableInput
              id="outlined-basic"
              variant="outlined"
              size="small"
              value={costCenterPayers}
              onChange={(e) => {
                setCostCenterPayers(e.target.value);
              }}
              onBlur={updateTable}
            />
          </div>
        </td>
        <div>
          <Tooltip title="Deletar linha">
            <IconButton onClick={deleteRow}>
              <DeleteRoundedIcon
                sx={{
                  color: "#0175B2",
                }}
              />
            </IconButton>
          </Tooltip>
        </div>
      </tr>
    </>
  );
}
