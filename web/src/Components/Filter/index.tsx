import React from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Button from "@mui/material/Button";
import FilterListIcon from "@mui/icons-material/FilterList";
import Paper from "@mui/material/Paper";

import { useState } from "react";

export default function Filter() {
const options = [
  "Create a merge commit",
  "Filtrar demandas por",
  "Rebase and merge",
];

const [open, setOpen] = useState(false);
const anchorRef = React.useRef<HTMLDivElement>(null);
const [selectedIndex, setSelectedIndex] = useState(1);

const handleClick = () => {
  console.info(`You clicked ${options[selectedIndex]}`);
};

const handleMenuItemClick = (
  event: React.MouseEvent<HTMLLIElement, MouseEvent>,
  index: number
) => {
  setSelectedIndex(index);
  setOpen(false);
};

const handleToggle = () => {
  setOpen((prevOpen) => !prevOpen);
};

const handleClose = (event: Event) => {
  if (
    anchorRef.current &&
    anchorRef.current.contains(event.target as HTMLElement)
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
            }}
            onClick={handleClick}
          >
            {options[selectedIndex]}
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
            onClick={handleToggle}
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
                        key={option}
                        disabled={index === 2}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                      >
                        {option}
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
