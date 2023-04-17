//Hooks
import { useEffect, useState } from "react";

//MUI
import { styled } from "@mui/material/styles";
import MuiTextField from "@mui/material/TextField";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { FormControl, IconButton, InputAdornment, InputLabel } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

// Services
import CostCenterService from "../../../../service/CostCenter-Service";

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
    const [ccId, setCCId] = useState("");
    const [error, setError] = useState(false);
    const [CCs, setCCs] = useState([]);

    useEffect(() => {
        CostCenterService.getCostCenters().then((response) => {
            if(response.status === 200) setCCs(response.data);
        });
    }, [])

    useEffect(() => {
        console.log("CCS ",CCs);
    }, [CCs])

    useEffect(() => {
        updateStates();
    }, [props.totalCostCenterPayers]);

    useEffect(() => {
        // New percentage
        let np = (parseInt(props.paymentPercent) - parseInt(props.CCPS[props.index].percentage)) + parseInt(percent);

        if (np > 100 || isNaN(np)) {
            setError(true);
            return;
        }
        setError(false);
        updateNewCCP();
    }, [ccId, percent])


    function handleUpdateCCP() {
        if (error) return;
        props.setTotalCostCenterPayers((prevState) => {
            const CCPList = [...prevState];
            CCPList[props.index] = newCCP;
            return CCPList;
        });
    }

    function updateNewCCP() {
        setNewCCP({ costCenter: ccId, percentage: parseInt(percent) })
    }


    function updateStates() {
        setNewCCP({ costCenter: props.CCP.costCenter, percentage: props.CCP.percentage });
        setPercent(props.CCP.percentage);
        setCCId(props.CCP.costCenter);
    }

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
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">CC</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    error={error}
                    value={ccId}
                    onChange={e => setCCId(e.target.value)}
                >
                    {CCs && CCs.map((cc) => {
                        return (
                            <MenuItem key={cc.idCentroCusto} value={cc.idCentroCusto}>{cc.numeroCentroCusto}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
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
