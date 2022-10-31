import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Tooltip from "@mui/material/Tooltip";
import Filter from "../Filter";

import toast, { Toaster } from "react-hot-toast";

import SearchIcon from "@mui/icons-material/Search";
import ListAltIcon from "@mui/icons-material/ListAlt";
import GridOnIcon from "@mui/icons-material/GridOn";
import DoneIcon from "@mui/icons-material/Done";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

import "../../styles/index.css";

interface ISubHeaderProps {
  hasEditButton?: {
    isEditEnabled: boolean;
  };
  hasActionButton?: {
    isOptionsEnabled: boolean;
  };
  hasFilter?: {
    isFilterEnabled: boolean;
  };
  hasSearch?: {
    isSearchEnabled: boolean;
  };
  hasGridListView?: {
    isGridListViewEnabled: boolean;
  };
}

export default function subHeader(
  {
    children,
    isListFormat,
    setIsListFormat,
    isEditEnabled,
    setIsEditEnabled,
  }: any,
  props: ISubHeaderProps
) {
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
    <div className="mb-10">
      <div className="flex items-center shadow-page-title-shadow h-[5rem]">
        <div className="flex-[2] text-center">
          <h1 className="text-dark-blue-weg font-bold text-3xl font-roboto">
            {children}
          </h1>
        </div>
        {/* open demands actions */}
        {props.hasEditButton && (
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
        )}

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

        <div className="flex-[4] flex justify-evenly">
          <Filter />
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
    </div>
  );
}
