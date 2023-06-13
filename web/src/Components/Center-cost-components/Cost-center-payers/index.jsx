// MUI
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { IconButton } from "@mui/material";

// Components
import PayerRow from "./Payers-row";
import { useContext, useEffect, useState } from "react";

//Translation
import TranslationJson from "../../../API/Translate/components/payersRow.json";
import { TranslateContext } from "../../../contexts/translate/index.jsx";

//Props: type(interno, externo)
export default function CostCenterPayers(props) {

  const translate = TranslationJson;
  const [ language ] = useContext(TranslateContext);

  const [paymentPercentage, setPaymentPercentage] = useState(0);

  const addNewCCP = () => {
    props.setTotalCostCenterPayers((prevState) => {
      return [
        ...prevState,
        {
          costCenter: "",
          percentage: 0,
        },
      ];
    });
  };

  const updatePercentCCP = () => {
    // Atualiza a porcentagem de pagamento dos CCP
    let newPaymentPercent = 0;
    for (let CC of props.totalCostCenterPayers) {
      // Se NaN, retorna 0;
      if (!isNaN(CC.percentage)) {
        newPaymentPercent += CC.percentage;
      }
    }
    setPaymentPercentage(newPaymentPercent);
  };

  useEffect(() => {
    updatePercentCCP();
  }, [props.totalCostCenterPayers]);

  return (
    <div>
      {" "}
      <div className="grid items-center justify-start">
        <div className="  rounded border-[1px] border-dark-blue-weg">
          {" "}
          <div className="mb-5 flex items-center justify-center">
            <h1 className="flex justify-center font-roboto text-lg font-bold text-blue-weg">
              {`${translate["CC pagantes"]?.[language] ?? "CC pagantes"} (${props.typeTitle}) - ${paymentPercentage}%`}
            </h1>
            {props.page !== "viewProposal" && (
              <IconButton onClick={addNewCCP}>
                <AddRoundedIcon sx={{ color: "#0075B1", fontSize: "1.4rem" }} />
              </IconButton>
            )}
          </div>
          {props.totalCostCenterPayers.map((CCP, index) => {
            return (
              <PayerRow
                CCP={CCP}
                index={index}
                CCPS={props.totalCostCenterPayers}
                totalCostCenterPayers={props.totalCostCenterPayers}
                setTotalCostCenterPayers={props.setTotalCostCenterPayers}
                paymentPercent={paymentPercentage}
                setPaymentPercent={setPaymentPercentage}
                page={props.page}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
