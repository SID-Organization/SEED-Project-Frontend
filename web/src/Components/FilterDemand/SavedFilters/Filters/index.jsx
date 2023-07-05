import { useState } from "react";
// MUI
import { IconButton, Paper, Popper, Tooltip } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

export default function filters(props) {
  const [isHovering, setIsHovering] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const confirmDelete = () => {
    props.deleteFilter(props.filter.idFiltroDemanda);
  };

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="
                mb-2 
                flex h-8 cursor-pointer 
                justify-between rounded-sm
                pl-1
                pr-1
                hover:bg-slate-200
            "
    >
      <div
        className="flex w-full items-center"
        onClick={() => props.selectFilter(props.filter.idFiltroDemanda)}
      >
        <Tooltip
          title={
            props.filter.nomeFiltro.length > 14 ? props.filter.nomeFiltro : null
          }
          placement="right"
        >
          <p className="flex items-center pl-4 text-sm text-light-blue-weg">
            {props.filter.nomeFiltro.length > 14
              ? props.filter.nomeFiltro.substring(0, 14) + "..."
              : props.filter.nomeFiltro}
          </p>
        </Tooltip>
      </div>
      {isHovering && (
        <IconButton onClick={() => confirmDelete()}>
          <DeleteRoundedIcon sx={{ color: "#0075b1", fontSize: "20px" }} />
        </IconButton>
      )}
      {confirmDeleteOpen && (
        <Popper>
          <Paper>
            <div className="flex justify-between">
              <p>Tem certeza que deseja excluir o filtro?</p>
              <div>
                <button onClick={() => setConfirmDeleteOpen(false)}>Não</button>
                <button onClick={() => confirmDelete()}>Sim</button>
              </div>
            </div>
          </Paper>
        </Popper>
      )}
    </div>
  );
}
