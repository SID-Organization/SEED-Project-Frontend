//React
import { useEffect, useState } from "react";

//MUI
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { IconButton, Tooltip } from "@mui/material";

//Components
import CostTableRow from "../Cost-table-rows";

//Utils
import FontSizeUtils from "../../../utils/FontSize-Utils";

//Props: type(interno, externo)
export default function CostTable(props) {
  const [fonts, setFonts] = useState(FontSizeUtils.getFontSizes());

  useEffect(() => {
    setFonts(FontSizeUtils.getFontSizes());
  }, [FontSizeUtils.getFontControl()]);

  function addTotalCoasts() {
    props.setCosts([
      ...props.costs,
      {
        expenseProfile: "",
        monthTimeExecution: "",
        necessaryHours: "",
        costHour: "",
        totalExpenseCost: "",
      },
    ]);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        {
          <h1
            style={{ fontSize: fonts.xl }}
            className="font-roboto font-bold text-blue-weg"
          >
            {props.typeTitle}
          </h1>
        }
        {props.page !== "viewProposal" && (
          <Tooltip title="Adicionar linha">
            <IconButton onClick={addTotalCoasts}>
              <AddRoundedIcon sx={{ color: "#0075B1", fontSize: "2rem" }} />
            </IconButton>
          </Tooltip>
        )}
      </div>
      <thead>
        <tr>
          <th className="w-48 border-[1px] border-b-[1px] border-r-0 border-[#00579D]">
            <p
              style={{ fontSize: fonts.base }}
              className="font-roboto font-bold "
            >
              Perfil de despesa
            </p>
          </th>
          <th className="w-48 border-[1px] border-b-[1px] border-r-0 border-blue-weg">
            <p
              style={{ fontSize: fonts.base }}
              className="font-roboto font-bold "
            >
              Mês de execução
            </p>
          </th>
          <th className="w-48 border-[1px] border-b-[1px] border-r-0 border-blue-weg">
            <p
              style={{ fontSize: fonts.base }}
              className="font-roboto font-bold "
            >
              Horas necessárias
            </p>
          </th>
          <th className="w-48 border-[1px] border-b-[1px] border-r-0 border-blue-weg">
            <p
              style={{ fontSize: fonts.base }}
              className="font-roboto font-bold "
            >
              Custo por hora
            </p>
          </th>
          <th className="border-r-1 w-48 border-[1px] border-b-[1px] border-blue-weg">
            <p
              style={{ fontSize: fonts.base }}
              className="font-roboto font-bold "
            >
              Custo total da despesa
            </p>
          </th>
          <th className="w-10"></th>
        </tr>
      </thead>
      <tbody>
        {props.costs &&
          props.costs.map((cost, index) => (
            <CostTableRow
              key={index}
              index={index}
              totalCost={cost}
              setCostList={props.setCosts}
              costList={props.costs}
              page={props.page}
            />
          ))}
      </tbody>
    </div>
  );
}
