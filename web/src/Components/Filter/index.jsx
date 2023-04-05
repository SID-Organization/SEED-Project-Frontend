import React from "react";
import { useState } from "react";

// MUI
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import ButtonGroup from "@mui/material/ButtonGroup";
import FilterListIcon from "@mui/icons-material/FilterList";
import ClickAwayListener from "@mui/material/ClickAwayListener";

// Utils
import DemandFilterUtils from "../../utils/DemandFilter-utils";

// Requested filters
// solicitante, gerente
// responsável, forum de aprovação, departamento, tamanho da demanda, codigo PPM, numero da
// solicitação.
export default function Filter(props) {
  const options = DemandFilterUtils.filterTypes;

  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (
    event,
    index
  ) => {
    setSelectedIndex(index);
    props.setFilter({filterId: options[index].id, filterType: options[index].type, filterBy: options[index].filterBy});
    setOpen(false);
  };


  const handleClose = (event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target)
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <React.Fragment>
        <ButtonGroup
          variant="contained"
          ref={anchorRef}
          aria-label="split button"
          style={{
            boxShadow: "#bdbdbd 0px 1px 5px 1px",
          }}
        >
          <Button
            sx={{
              backgroundColor: "transparent",
              color: "#707070",
            }}
            style={{
              backgroundColor: "transparent",
              borderColor: "#7070706f",
              width: "13rem",
            }}
            onClick={handleClick}
          >
            {options[selectedIndex].value}
          </Button>
          <Button
            sx={{
              backgroundColor: "transparent",
              color: "#707070",
              borderColor: "none",
            }}
            style={{ backgroundColor: "transparent" }}
            size="small"
            aria-controls={open ? "split-button-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={() => setOpen((prevOpen) => !prevOpen)}
          >
            <FilterListIcon />
          </Button>
        </ButtonGroup>
        <Popper
          sx={{
            zIndex: 1,
          }}
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu" autoFocusItem>
                    {options.map((option, index) => (
                      <MenuItem
                        key={option.id}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                      >
                        {option.value}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        </React.Fragment>
    </div>
  );
}
