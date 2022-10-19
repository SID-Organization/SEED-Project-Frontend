import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import SearchIcon from "@mui/icons-material/Search";
import ListAltIcon from "@mui/icons-material/ListAlt";
import GridOnIcon from "@mui/icons-material/GridOn";
import FilterListIcon from "@mui/icons-material/FilterList";

import { useState } from "react";

import "../../styles/index.css";

export default function subHeader({
  children,
  isListFormat,
  setIsListFormat,
}: any) {
  const options = [
    "Create a merge commit",
    "Filtrar demandas por",
    "Rebase and merge",
  ];

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

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
      <div className="flex justify-around items-center shadow-page-title-shadow h-[5rem]">
        <h1 className="text-[#023A67] font-bold text-3xl font-roboto">
          {children}
        </h1>
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
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon
              sx={{
                fontSize: "20px",
              }}
            />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <InputBase
            sx={{ ml: 1, flex: 1, fontSize: "13px" }}
            placeholder="Procure aqui"
            inputProps={{ "aria-label": "Procure aqui" }}
          />
        </Paper>

        <div
          className="cursor-pointer"
          onClick={() => setIsListFormat(!isListFormat)}
        >
          {isListFormat ? (
            <GridOnIcon
              sx={{
                fontSize: "30px",
                color: "#0075B1",
              }}
            />
          ) : (
            <ListAltIcon
              sx={{
                fontSize: "30px",
                color: "#0075B1",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
