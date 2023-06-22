import { useState } from "react";
// MUI
import { IconButton, Tooltip } from "@mui/material";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

export default function filters(props) {

    const [isHovering, setIsHovering] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="
                cursor-pointer 
                mb-2 pr-1 pl-1 
                flex justify-between
                hover:bg-slate-200
                rounded-sm
                h-8
            "
        >
            <div className="w-full flex items-center" onClick={() => props.selectFilter(props.filter.id)}>
                <Tooltip title={props.filter.nomeFiltro.length > 14 ? props.filter.nomeFiltro : null} placement="right" >
                    <p className="text-light-blue-weg text-sm flex items-center">{
                        props.filter.nomeFiltro.length > 14 ?
                            props.filter.nomeFiltro.substring(0, 14) + "..."
                            :
                            props.filter.nomeFiltro
                    }</p>
                </Tooltip>
            </div>
            {isHovering && (
                <IconButton onClick={() => props.deleteFilter(props.filter.id)}>
                    <DeleteRoundedIcon sx={{ color: "#0075b1", fontSize: '20px' }} />
                </IconButton>
            )}
        </div>
    )
}