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

    const [percent, setPercent] = useState(0);
    const [ccName, setCCName] = useState("");
    const [error, setError] = useState(false);

    function handleUpdateCCP() {
        if(error) return;
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

    function updateNewCCP() {
        setNewCCP({ costCenter: ccName, percentage: parseInt(percent) })
    }

    useEffect(() => {
        if (((props.paymentPercent - props.CCPS[props.index].percentage) + percent) > 100) {
            setError(true);
            return;
        }
        setError(false);
        updateNewCCP();
    }, [ccName, percent])


    useEffect(() => {
        updateStates()
    }, [props.totalCostCenterPayers])

    function deleteCCP() {
        props.setTotalCostCenterPayers((prevState) => {
            const newCostCenterPayers = [...prevState];
            newCostCenterPayers.splice(props.index, 1);
            return newCostCenterPayers;
        });
        props.setPaymentPercent(parseInt(props.paymentPercent) - parseInt(newCCP.percentage));

    }

    return (
        <div
            className="mb-5 flex items-center justify-around"
        >
            <CCInput
                error
                label="Centro de custo"
                value={ccName}
                onChange={e => setCCName(e.target.value)}
                onBlur={handleUpdateCCP}
            />
            <CCInput
                error
                label="Porcentagem"
                type="number"
                value={percent}
                onChange={e => setPercent(e.target.value)}
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
                    onClick={deleteCCP}
                />
            </IconButton>
        </div>
    )
}