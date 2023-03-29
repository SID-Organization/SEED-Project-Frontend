
// MUI
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { IconButton } from "@mui/material";

// Components
import PayerRow from "./Payers-row";

//Props: type(interno, externo)
export default function CostCenterPayers(props) {
  

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
              <PayerRow
                inputs = {input}
                index={index}
                totalCostCenterPayers={props.totalCostCenterPayers}
                setTotalCostCenterPayers={props.setTotalCostCenterPayers}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
