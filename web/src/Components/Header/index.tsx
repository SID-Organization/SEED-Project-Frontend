import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { MenuOutlined } from "@mui/icons-material";
import styled from "@emotion/styled";
import { Accordion, Button } from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiButton from "@mui/material/Button";

import BrazilFlag from "../../assets/flag-countries/brazil.png";
import UnitedStatesFlag from "../../assets/flag-countries/united-states.png";
import SpainFlag from "../../assets/flag-countries/spain.png";
import ChinaFlag from "../../assets/flag-countries/china.png";
import GermanyFlag from "../../assets/flag-countries/germany.png";

import { Link } from "react-router-dom";

import Switch from "@mui/material/Switch";

import { useState } from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import WegLogo from "../../assets/weg-logo.png";

import "../../styles/index.css";

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const AccordionDetails = styled(MuiAccordionDetails)({
    padding: "0",
  });

  const Button = styled(MuiButton)({
    backgroundColor: "transparent",
    color: "#000",
    textTransform: "none",
    fontSize: "0.875rem",
    fontFamily: "Roboto",
    boxShadow: "none",
    width: "100%",
    height: "3rem",
    fontWeight: "normal",

    "&:hover": {
      backgroundColor: "transparent",
      color: "#000",
    },
  });

  const label = { inputProps: { "aria-label": "Switch demo" } };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      sx={{ marginTop: "40px" }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link to="/perfil">
        <MenuItem onClick={handleMenuClose}>Seu perfil</MenuItem>
      </Link>
      <Accordion
        sx={{
          border: "none",
          boxShadow: "none",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className="font-roboto"
        >
          <h1 className="font-roboto">Idioma</h1>
        </AccordionSummary>
        <AccordionDetails>
          <Button variant="contained">
            <div className="flex items-center justify-center gap-5">
              <img
                className="
                  w-7
                  h-7
              "
                src={BrazilFlag}
                alt=""
              />
              Português
            </div>
          </Button>
        </AccordionDetails>
        <AccordionDetails>
          <Button variant="contained">
            <div className="flex items-center justify-center gap-5">
              <img
                className="
                  w-7
                  h-7
              "
                src={UnitedStatesFlag}
                alt=""
              />
              <h1 className="mr-6 ml-1">Inglês</h1>
            </div>
          </Button>
        </AccordionDetails>
        <AccordionDetails>
          <Button variant="contained">
            <div className="flex items-center justify-center gap-5">
              <img
                className="
                  w-7
                  h-7
              "
                src={SpainFlag}
                alt=""
              />
              <h1 className="ml-1">Espanhol</h1>
            </div>
          </Button>
        </AccordionDetails>
        <AccordionDetails>
          <Button variant="contained">
            <div className="flex items-center justify-center gap-5">
              <img
                className="
                  w-7
                  h-7
              "
                src={ChinaFlag}
                alt=""
              />
              <h1 className="mr-[0.9rem] ml-1">Chinês</h1>
            </div>
          </Button>
        </AccordionDetails>
      </Accordion>
      <MenuItem>
        Modo escuro
        <Switch {...label} defaultChecked />
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>Sair</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );


  
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          sx={{
            "& .MuiToolbar-root": { zIndex: 20, backgroundColor: "#0075B1", minHeight: "56px" },
          }}
        >
          <Toolbar>
            <Link to="/minhas-demandas" className="cursor-pointer">
              <img className="h-10 w-16" src={WegLogo} alt="" />
            </Link>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={handleProfileMenuOpen}
              >
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  color="inherit"
                  sx={{
                    borderRadius: "0.5rem",
                    columnGap: "0.5rem",
                  }}
                >
                  <h1 className="text-usual flex justify-center items-center">
                    Henrique Cole
                  </h1>
                  <AccountCircle />
                </IconButton>
              </Box>

              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
                sx={{
                  marginLeft: "0.5rem",
                }}
              >
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
    </div>
  );
}
