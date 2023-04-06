//Hooks
import { useEffect, useState } from "react";

//MUI
import { styled } from "@mui/material/styles";
import MuiTextField from "@mui/material/TextField";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { IconButton, InputAdornment } from "@mui/material";

const CCInput = styled(MuiTextField)({
    width: "8rem",
});

// CCP - Cost Center Payer

export default function PayerRow(props) {

    const [newCCP, setNewCCP] = useState({
        costCenter: props.CCP.costCenter,
        percentage: props.CCP.percentage,
    })

    function handleUpdateCCP() {
        props.setTotalCostCenterPayers((prevState) => {
            const CCPList = [...prevState];
            CCPList[props.index] = newCCP;
            return CCPList;
        });
    }

    function updateStates() {
        setNewCCP({
            costCenter: props.CCP.costCenter,
            percentage: props.CCP.percentage,
        })

    }



    useEffect(() => {
        updateStates()
    }, [props.totalCostCenterPayers])

    return (
        <div
            className="mb-5 flex items-center justify-around"
        >
            <CCInput
                error
                label="Centro de custo"
                value={newCCP.costCenter}
                onChange={(e) =>
                    setNewCCP({ ...newCCP, costCenter: parseInt(e.target.value) })
                }
                onBlur={handleUpdateCCP}
            />
            <CCInput
                error
                label="Porcentagem"
                type="number"
                value={newCCP.percentage}
                onChange={
                    (e) => setNewCCP({ ...newCCP, percentage: parseInt(e.target.value) })
                }
                onBlur={handleUpdateCCP}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                    ),
                }}
            />
            <IconButton>
                <DeleteRoundedIcon
                    sx={{ color: "#0075B1", fontSize: "1.4rem" }}
                    onClick={() => {
                        props.setTotalCostCenterPayers((prevState) => {
                            const newCostCenterPayers = [...prevState];
                            newCostCenterPayers.splice(props.index, 1);
                            return newCostCenterPayers;
                        });
                        props.setPaymentPercent(parseInt(props.paymentPercent) - parseInt(newCCP.percentage));
                    }}
                />
            </IconButton>
        </div>
    )
}