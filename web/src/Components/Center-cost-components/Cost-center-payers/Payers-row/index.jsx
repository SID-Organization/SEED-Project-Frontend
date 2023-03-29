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

export default function PayerRow(props) {

    const [input, setInput] = useState({
        costCenter: props.inputs.costCenter,
        percentage: props.inputs.percentage,
    })

    const updateCostCenterPayer = () => {
        props.setTotalCostCenterPayers((prevState) => {
            const newCostCenterPayers = [...prevState];
            newCostCenterPayers[props.index] = input;
            return newCostCenterPayers;
        });
    }

    const updateStates = () => {
        setInput({
            costCenter: props.inputs.costCenter,
            percentage: props.inputs.percentage,
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
                value={input.costCenter}
                onChange={(e) =>
                    setInput({ ...input, costCenter: e.target.value })
                }
                onBlur={updateCostCenterPayer}
            />
            <CCInput
                error
                label="Porcentagem"
                type="number"
                value={input.percentage}
                onChange={
                    (e) => setInput({ ...input, percentage: e.target.value })
                }
                onBlur={updateCostCenterPayer}
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
                    }}
                />
            </IconButton>
        </div>
    )
}