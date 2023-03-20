import react from 'react'

import { TextField, InputAdornment } from '@mui/material'
import { styled } from '@mui/material/styles'

const DateField = styled(TextField)({
    width: "14rem",
    marginBottom: "1rem",
    height: "3rem",
});

export default function DatePicker(props) {
    return (
        <DateField
            id="outlined-basic"
            variant="outlined"
            placeholder="dd/mm/aaaa"
            type="date"
            label={props.label}
            value={props.searchValue}
            onChange={(e) => props.setSearchValue(e.target.value)}
            InputProps={{
            startAdornment: <InputAdornment position="start" />,
            }}
        />
    )
}