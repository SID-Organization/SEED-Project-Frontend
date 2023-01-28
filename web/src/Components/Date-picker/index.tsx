import react from 'react'

import { TextField, InputAdornment } from '@mui/material'
import { styled } from '@mui/material/styles'

const DateField = styled(TextField)({
    width: "14rem",
    marginBottom: "1rem",
    height: "3rem",
});

interface IDatePicker {
    searchValue: Date;
}

export default function DatePicker(props: IDatePicker ) {
    return (
        <DateField
            id="outlined-basic"
            variant="outlined"
            placeholder="dd/mm/aaaa"
            type="date"
            label="Data da reunião"
            InputProps={{
            startAdornment: <InputAdornment position="start" />,
            }}
        />
    )
}