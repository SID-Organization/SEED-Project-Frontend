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
import Tooltip from "@mui/material/Tooltip";

import toast, { Toaster } from "react-hot-toast";

import DoneIcon from "@mui/icons-material/Done";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SearchIcon from "@mui/icons-material/Search";

import { useState } from "react";

import "../../styles/index.css";

export default function subHeader({
  children,
  isEditEnabled,
  setIsEditEnabled,
}: any) {
  const [arrowUp, setArrowUp] = useState(false);
  const options = ["Aceitar", "Devolver", "Recusar"];
  const notifyEditEnabledOn = () => toast("Agora você pode editar os campos!");
  const notifyEditEnabledOff = () =>
    toast.success("Alterações salvas com sucesso!");

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

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

  function editInput() {
    setIsEditEnabled(!isEditEnabled);
    if (isEditEnabled) {
      notifyEditEnabledOn();
    } else {
      notifyEditEnabledOff();
    }
  }

  return (
    <div>
      <div className="flex justify-around items-center shadow-page-title-shadow h-[5rem]">
        <h1 className="text-dark-blue-weg font-bold text-3xl font-roboto">
          {children}
        </h1>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#00579D",
            columnGap: 2,
            width: 50,
            height: 40,
          }}
          onClick={() => editInput()}
        >
          <Toaster
            position="top-center"
            toastOptions={{
              success: {
                iconTheme: {
                  primary: "#7EB61C",
                  secondary: "white",
                },
              },
              style: {
                fontSize: "14px",
              },
            }}
          />
          {isEditEnabled ? (
            <Tooltip title="Editar">
              <ModeEditIcon />
            </Tooltip>
          ) : (
            <Tooltip title="Salvar alterações">
              <DoneIcon />
            </Tooltip>
          )}
        </Button>

        <Tooltip title="Ações">
          <ButtonGroup
            variant="contained"
            ref={anchorRef}
            aria-label="split button"
          >
            <Button
              size="small"
              aria-controls={open ? "split-button-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-label="select merge strategy"
              aria-haspopup="menu"
              sx={{
                backgroundColor: "#00579D",
                width: 100,
                height: 40,
                fontSize: 14,
              }}
              onClick={handleToggle}
            >
              Ações
              {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </Button>
          </ButtonGroup>
        </Tooltip>
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
      </div>
    </div>
  );
}
