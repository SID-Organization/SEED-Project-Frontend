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
            "& .MuiToolbar-root": { zIndex: 20, backgroundColor: "#0075B1" },
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
                  <h1 className="text-base flex justify-center items-center">
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

// const MaterialUISwitch = styled(Switch)(({ theme }) => ({
//   width: 62,
//   height: 34,
//   padding: 7,
//   '& .MuiSwitch-switchBase': {
//     margin: 1,
//     padding: 0,
//     transform: 'translateX(6px)',
//     '&.Mui-checked': {
//       color: '#fff',
//       transform: 'translateX(22px)',
//       '& .MuiSwitch-thumb:before': {
//         backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
//           '#fff',
//         )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
//       },
//       '& + .MuiSwitch-track': {
//         opacity: 1,
//         backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
//       },
//     },
//   },
//   '& .MuiSwitch-thumb': {
//     backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
//     width: 32,
//     height: 32,
//     '&:before': {
//       content: "''",
//       position: 'absolute',
//       width: '100%',
//       height: '100%',
//       left: 0,
//       top: 0,
//       backgroundRepeat: 'no-repeat',
//       backgroundPosition: 'center',
//       backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
//         '#fff',
//       )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
//     },
//   },
//   '& .MuiSwitch-track': {
//     opacity: 1,
//     backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
//     borderRadius: 20 / 2,
//   },
// }));
