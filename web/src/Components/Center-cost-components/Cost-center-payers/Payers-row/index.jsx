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
    });
    
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

    useEffect(() => {
        updateStates();
    }, [props.totalCostCenterPayers]);


    function updateNewCCP() {
        setNewCCP({ costCenter: ccName, percentage: parseInt(percent) })
    }


    function updateStates() {
        setNewCCP({ costCenter: props.CCP.costCenter, percentage: props.CCP.percentage });
        setPercent(props.CCP.percentage);
        setCCName(props.CCP.costCenter);
    }

    useEffect(() => {
        // New percentage
        let np = parseInt(((props.paymentPercent - props.CCPS[props.index].percentage)) + parseInt(percent));
        console.log(np)
        if (np > 100 || isNaN(np)) {
            setError(true);
            return;
        }
        setError(false);
        updateNewCCP();
    }, [ccName, percent])


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
            className="mb-5 flex items-center justify-around gap-10 p-2"
        >
            <CCInput
                variant="standard"
                error={error}
                label="CC"
                value={ccName}
                onChange={e => setCCName(e.target.value)}
                onBlur={handleUpdateCCP}
            />
            <CCInput
                variant="standard"
                error={error}
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
