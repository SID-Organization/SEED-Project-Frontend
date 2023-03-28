//React
import { useState } from "react";

//Components
import CostTableRow from "../Cost-table-rows";

//MUI
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { IconButton, Tooltip } from "@mui/material";

export default function CostTable() {
  const [totalCostList, setTotalCostList] = useState([
    {
      expenseType: "",
      expenseProfile: "",
      monthTimeExecution: "",
      necessaryHours: "",
      costHour: "",
      totalExpenseCost: "",
      costCenterPayers: "",
    },
  ]);

  function addTotalCoasts() {
    setTotalCostList([
      ...totalCostList,
      {
        expenseType: "",
        expenseProfile: "",
        monthTimeExecution: "",
        necessaryHours: "",
        costHour: "",
        totalExpenseCost: "",
        costCenterPayers: "",
      },
    ]);
  }
  return (
    <>
      <thead>
        <div className="flex items-center justify-center">
          <Tooltip title="Adicionar tabela de custos">
            <IconButton onClick={addTotalCoasts}>
              <AddRoundedIcon sx={{ color: "#0075B1", fontSize: "2rem" }} />
            </IconButton>
          </Tooltip>
        </div>
        <tr>
          <th className="w-48 border-2 border-b-2 border-r-0 border-blue-weg">
            <p className="font-roboto text-base font-bold ">
              Perfil de despesa
            </p>
          </th>
          <th className="w-48 border-2 border-b-2 border-r-0 border-blue-weg">
            <p className="font-roboto text-base font-bold ">Mês de execução</p>
          </th>
          <th className="w-48 border-2 border-b-2 border-r-0 border-blue-weg">
            <p className="font-roboto text-base font-bold ">
              Horas necessárias
            </p>
          </th>
          <th className="w-48 border-2 border-b-2 border-r-0 border-blue-weg">
            <p className="font-roboto text-base font-bold ">Custo por hora</p>
          </th>
          <th className="w-48 border-2 border-b-2 border-r-0 border-blue-weg">
            <p className="font-roboto text-base font-bold ">
              Custo total da despesa
            </p>
          </th>
          <th className="w-10"></th>
        </tr>
      </thead>
      <tbody>
        {totalCostList.map((totalCost, index) => (
          <CostTableRow
            key={index}
            index={index}
            totalCost={totalCost}
            setCostList={setTotalCostList}
            costList={totalCostList}
          />
        ))}
      </tbody>
    </>
  );
}
