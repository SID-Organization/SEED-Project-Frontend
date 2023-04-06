import { useState } from "react";

// MUI
import { Button, Popper } from "@mui/material";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import MuiTextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import FilterComponent from "./FilterComponent";
import { useEffect } from "react";

export default function Search(props) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  function handleOpenFilter(event) {
    setAnchorEl(event.currentTarget);
    setIsFilterOpen(!isFilterOpen);
  }

  function handleCloseFilter() {
    setIsFilterOpen(false);
  }

  const [requester, setRequester] = useState("");
  const [value, setValue] = useState("");
  const [score, setScore] = useState("");
  const [title, setTitle] = useState("");
  const [responsibleAnalyst, setResponsibleAnalyst] = useState("");
  const [responsibleManager, setResponsibleManager] = useState("");
  const [approvalForum, setApprovalForum] = useState("");
  const [department, setDepartment] = useState("");
  const [demandSize, setDemandSize] = useState("");
  const [PPMCode, setPPMCode] = useState("");
  const [requestNumber, setRequestNumber] = useState("");

  function cleanStates() {
    setRequester("");
    setValue("");
    setScore("");
    setTitle("");
    setResponsibleAnalyst("");
    setResponsibleManager("");
    setApprovalForum("");
    setDepartment("");
    setDemandSize("");
    setPPMCode("");
    setRequestNumber("");
  }

  return (
    <ClickAwayListener onClickAway={handleCloseFilter}>
      <div>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 240,
            height: 40,
          }}
          style={{
            boxShadow: "#bdbdbd 0px 1px 5px 1px",
          }}
        >
          <SearchIcon
            sx={{
              color: "#919191",
              fontSize: "20px",
              width: "25px",
            }}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

          <InputBase
            type={props.type}
            sx={{ ml: 1, flex: 1, fontSize: "13px" }}
            placeholder="Procure aqui"
            inputProps={{ "aria-label": "Procure aqui" }}
            onChange={(e) => props.setSearch(e.target.value)}
            value={props.search}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
            endAdornment={
              <IconButton
                type="button"
                sx={{ p: "10px" }}
                aria-label="search"
                onClick={handleOpenFilter}
              >
                <TuneRoundedIcon
                  sx={{
                    fontSize: "20px",
                  }}
                />
              </IconButton>
            }
          />
        </Paper>
        <Popper
          open={isFilterOpen}
          anchorEl={anchorEl}
          placement="bottom-start"
          style={{ zIndex: 1000 }}
        >
          <Paper
            sx={{
              overflow: "auto",
              padding: 2,
              borderTop: "3px solid #0075b1",
            }}
          >
            <div className="grid gap-3">
              <FilterComponent
                title="Solicitante"
                type="text"
                value={requester}
                setValue={setRequester}
              />
              <FilterComponent
                title="Valor"
                type="number"
                value={value}
                setValue={setValue}
              />
              <FilterComponent
                title="Score"
                type="number"
                value={score}
                setValue={setScore}
              />
              <FilterComponent
                title="Título"
                type="text"
                value={title}
                setValue={setTitle}
              />
              <FilterComponent
                title="Analista responsável"
                type="text"
                value={responsibleAnalyst}
                setValue={setResponsibleAnalyst}
              />
              <FilterComponent
                title="Gerente responsável"
                type="text"
                value={responsibleManager}
                setValue={setResponsibleManager}
              />
              <FilterComponent
                title="Fórum de aprovação"
                type="text"
                value={approvalForum}
                setValue={setApprovalForum}
              />
              <FilterComponent
                title="Departamento"
                type="text"
                value={department}
                setValue={setDepartment}
              />
              <FilterComponent
                title="Tamanho da demanda"
                type="text"
                value={demandSize}
                setValue={setDemandSize}
              />
              <FilterComponent
                title="Código PPM"
                type="number"
                value={PPMCode}
                setValue={setPPMCode}
              />
              <FilterComponent
                title="Número da solicitação"
                type="number"
                value={requestNumber}
                setValue={setRequestNumber}
              />
              <div className="flex items-center justify-center gap-16 p-3">
                <Button
                  variant="contained"
                  sx={{
                    width: "100%",
                    backgroundColor: "#c2bebe",
                    color: "white",

                    "&:hover": {
                      backgroundColor: "#c2bebe",
                    },
                  }}
                  onClick={cleanStates}
                >
                  Limpar
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    width: "100%",
                    backgroundColor: "#0075b1",
                    color: "white",

                    "&:hover": {
                      backgroundColor: "#0075b1",
                    },
                  }}
                >
                  Filtrar
                </Button>
              </div>
            </div>
          </Paper>
        </Popper>
      </div>
    </ClickAwayListener>
  );
}
