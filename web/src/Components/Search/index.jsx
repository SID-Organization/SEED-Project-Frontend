import { useState } from "react";

// MUI
import { Popper } from "@mui/material";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import ClickAwayListener from "@mui/material/ClickAwayListener";


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
              width: 240,
              height: 100,
              overflow: "auto",
            }}
          >
            <h1>Filter</h1>
          </Paper>
        </Popper>
      </div>
    </ClickAwayListener>
  );
}
