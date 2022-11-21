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
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import {
  Accordion,
  Button,
  Divider,
  InputBase,
  Paper,
  Tooltip,
} from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiButton from "@mui/material/Button";

import BrazilFlag from "../../assets/countries-flags/brazil.png";
import UnitedStatesFlag from "../../assets/countries-flags/united-states.png";
import SpainFlag from "../../assets/countries-flags/spain.png";
import ChinaFlag from "../../assets/countries-flags/china.png";

import { Link } from "react-router-dom";

import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch, { SwitchProps } from "@mui/material/Switch";
import SearchIcon from "@mui/icons-material/Search";
import SearchOffIcon from "@mui/icons-material/SearchOff";

import { useState } from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import WegLogo from "../../assets/weg-logo.png";

import "../../styles/index.css";
import UserMessageCard from "../Chat-components/User-message-card";
import NotificationCard from "../Notification-card";

const DarkModeSwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

export default function PrimarySearchAppBar() {
  const [menuAnchoeEl, setmMenuAnchoeEl] = useState<null | HTMLElement>(null);
  const [messagesAnchoeEl, setMessagesAnchoeEl] = useState<null | HTMLElement>(
    null
  );
  const [notificationsAnchoeEl, setNotificationsAnchoeEl] =
    useState<null | HTMLElement>(null);

  const [search, setSearch] = useState("");

  const [filterUnreadNotifications, setFilterUnreadNotifications] =
    useState(false);

  const isMenuOpen = Boolean(menuAnchoeEl);
  const isMessagesOpen = Boolean(messagesAnchoeEl);
  const isNotificationsOpen = Boolean(notificationsAnchoeEl);

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
    setmMenuAnchoeEl(event.currentTarget);
  };

  const handleMessagesMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMessagesAnchoeEl(event.currentTarget);
  };

  const handleNotificationsMenuOpen = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setNotificationsAnchoeEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setmMenuAnchoeEl(null);
  };

  const handleMessagesMenuClose = () => {
    setMessagesAnchoeEl(null);
  };

  const handleNotificationsMenuClose = () => {
    setNotificationsAnchoeEl(null);
  };

  const usersMock = [
    {
      name: "John Doe",
      userDemand: "I need a tutor for my son",
      lastMessage: "Hello, I'm interested in your demand",
      time: "12:00",
      unreadMessages: false,
      isOnline: false,
    },
    {
      name: "Henrique",
      userDemand: "I need a tutor for my son",
      lastMessage: "Hello, I'm interested in your demand",
      time: "09:20",
      unreadMessages: 4,
      isOnline: true,
    },
    {
      name: "Thiago",
      userDemand: "I need a tutor for my son",
      lastMessage: "Hello, I'm interested in your demand",
      time: "11:30",
      unreadMessages: false,
      isOnline: false,
    },
    {
      name: "Leonardo de Souza Rafaelli",
      userDemand: "I need a tutor for my son",
      lastMessage: "Salve salve",
      time: "13:54",
      unreadMessages: 6,
      isOnline: false,
    },
    {
      name: "Otavio Augusto do Santos",
      userDemand: "I need a tutor for my son",
      lastMessage: "Eai, como ta?",
      time: "21:32",
      unreadMessages: false,
      isOnline: true,
    },
    {
      name: "Gustavo Rebelatto Zapella",
      userDemand: "I need a tutor for my son",
      lastMessage: "Hello, I'm interested in your demand",
      time: "21:33",
      unreadMessages: 1,
      isOnline: true,
    },
    {
      name: "Gustavo Cole",
      userDemand: "I need a tutor for my son",
      lastMessage: "Hello, I'm interested in your demand",
      time: "12:03",
      unreadMessages: false,
      isOnline: true,
    },
    {
      name: "Leonardo Rebelatto",
      userDemand: "Software is slow",
      lastMessage: "Hello, I'm interested in your demand",
      time: "12:00",
      unreadMessages: 10,
      isOnline: false,
    },
    {
      name: "John Doe",
      userDemand: "I need a tutor for my son",
      lastMessage: "Hello, I'm interested in your demand",
      time: "12:00",
      unreadMessages: false,
      isOnline: false,
    },
    {
      name: "Henrique",
      userDemand: "I need a tutor for my son",
      lastMessage: "Hello, I'm interested in your demand",
      time: "09:20",
      unreadMessages: 4,
      isOnline: true,
    },
    {
      name: "Thiago",
      userDemand: "I need a tutor for my son",
      lastMessage: "Hello, I'm interested in your demand",
      time: "11:30",
      unreadMessages: false,
      isOnline: false,
    },
    {
      name: "Leonardo de Souza Rafaelli",
      userDemand: "I need a tutor for my son",
      lastMessage: "Salve salve",
      time: "13:54",
      unreadMessages: 6,
      isOnline: false,
    },
    {
      name: "Otavio Augusto do Santos",
      userDemand: "I need a tutor for my son",
      lastMessage: "Eai, como ta?",
      time: "18:20",
      unreadMessages: false,
      isOnline: true,
    },
    {
      name: "Gustavo Rebelatto Zapella",
      userDemand: "I need a tutor for my son",
      lastMessage: "Hello, I'm interested in your demand",
      time: "07:30",
      unreadMessages: 1,
      isOnline: true,
    },
    {
      name: "Gustavo Cole",
      userDemand: "I need a tutor for my son",
      lastMessage: "Hello, I'm interested in your demand",
      time: "12:03",
      unreadMessages: false,
      isOnline: true,
    },
    {
      name: "Leonardo Rebelatto",
      userDemand: "Software is slow",
      lastMessage: "Hello, I'm interested in your demand",
      time: "12:00",
      unreadMessages: 10,
      isOnline: false,
    },
  ];

  const notificationsMock = [
    {
      name: "Henrique Cole Fernandes",
      time: "21:00",
      content: "Aprovou sua demanda!",
      unreadNotification: false,
    },
    {
      name: "Leonardo Rafaelli",
      time: "12:00",
      content: "Reprovou sua demanda!",
      unreadNotification: true,
    },
    {
      name: "Gustavo Rebelatto Zapella",
      time: "15:00",
      content: "Aprovou sua demanda!",
      unreadNotification: true,
    },
    {
      name: "Romario Horngurg",
      time: "18:00",
      content: "Reprovou sua demanda!",
      unreadNotification: false,
    },
    {
      name: "Otavio Augusto dos Santos",
      time: "09:00",
      content: "Reprovou sua demanda!",
      unreadNotification: false,
    },
    {
      name: "Henrique Cole Fernandes",
      time: "22:00",
      content: "Aprovou sua demanda!",
      unreadNotification: false,
    },
    {
      name: "Leonardo Rafaelli",
      time: "16:00",
      content: "Reprovou sua demanda!",
      unreadNotification: true,
    },
    {
      name: "Gustavo Rebelatto Zapella",
      time: "20:00",
      content: "Aprovou sua demanda!",
      unreadNotification: true,
    },
    {
      name: "Romario Horngurg",
      time: "17:00",
      content: "Reprovou sua demanda!",
      unreadNotification: false,
    },
    {
      name: "Otavio Augusto dos Santos",
      time: "14:00",
      content: "Reprovou sua demanda!",
      unreadNotification: false,
    },
  ];

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      sx={{ marginTop: "40px" }}
      anchorEl={menuAnchoeEl}
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
      <MenuItem onClick={handleMenuClose}>Sair</MenuItem>
      <MenuItem
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FormGroup>
          <FormControlLabel
            sx={{ m: 1 }}
            control={<DarkModeSwitch {...label} />}
            label=""
          />
        </FormGroup>
      </MenuItem>
    </Menu>
  );

  const messagesId = "primary-search-messages-menu";
  const renderMessages = (
    <Menu
      sx={{ marginTop: "40px" }}
      anchorEl={messagesAnchoeEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={messagesId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMessagesOpen}
      onClose={handleMessagesMenuClose}
    >
      <p
        className="
        text-2xl
        ml-3
        mb-3
        font-bold
        text-blue-weg
      "
      >
        Mensagens
      </p>
      <Divider />
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 350,
          borderRadius: "20rem",
          margin: "1rem",
          backgroundColor: "#f0f2f5",
        }}
      >
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Procure por usuários ou demandas"
          inputProps={{ "aria-label": "search google maps" }}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Paper>
      <div
        className="
        h-[calc(100vh-19.8rem)]
        overflow-y-scroll
        scrollbar-thumb-[#a5a5a5]
        scrollbar-thumb-rounded-full
        scrollbar-w-2
        scrollbar-thin
      "
      >
        {search === ""
          ? usersMock
              .sort((a, b) => {
                if (a.unreadMessages && !b.unreadMessages) return -1;
                if (!a.unreadMessages && b.unreadMessages) return 1;

                const timeA = new Date(
                  a.time.split(":")[0] as any,
                  a.time.split(":")[1] as any
                );
                const timeB = new Date(
                  b.time.split(":")[0] as any,
                  b.time.split(":")[1] as any
                );
                if (timeA > timeB) {
                  return -1;
                }
                if (timeA < timeB) {
                  return 1;
                }
                return 0;
              })
              .map((user) => (
                <UserMessageCard
                  name={user.name}
                  userDemand={user.userDemand}
                  lastMessage={user.lastMessage}
                  time={user.time}
                  unreadMessages={user.unreadMessages}
                  isOnline={user.isOnline}
                />
              ))
          : returnedUserSearch()}
      </div>
    </Menu>
  );

  const notificationsId = "primary-search-notifications-menu";
  const renderNotifications = (
    <Menu
      sx={{
        marginTop: "40px",
      }}
      anchorEl={notificationsAnchoeEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={notificationsId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isNotificationsOpen}
      onClose={handleNotificationsMenuClose}
    >
      <div className="grid">
        <div className="flex justify-between items-center">
          <p
            className="
        text-2xl
        ml-3
        font-bold
        text-blue-weg
      "
          >
            Notificações
          </p>
          <Tooltip title="Marcar todas como lidas">
            <IconButton
              sx={{
                marginRight: "1rem",
              }}
            >
              {/* marcar todas as notificações  */}
              <CheckRoundedIcon />
            </IconButton>
          </Tooltip>
        </div>
        <div className="flex items-center mb-1">
          <button
            onClick={() => {
              setFilterUnreadNotifications(false);
            }}
            className={
              filterUnreadNotifications
                ? `
                rounded-full
              color-[#555555]
              text-[0.8rem]
              font-bold
              w-[5rem]
              h-[2rem]  
              transition
              hover:bg-[#f0f2f5]
              px-2
              py-1
                `
                : `
                rounded-full
                text-[#0075b1]
                text-[0.8rem]
                bg-[#f0f2f5]
                font-bold
                w-[5rem]
                h-[2rem]  
                transition
                px-2
                py-1
                `
            }
          >
            Tudo
          </button>
          <button
            onClick={() => {
              setFilterUnreadNotifications(true);
            }}
            className={
              filterUnreadNotifications
                ? `
                rounded-full
              text-[#0075b1]
              text-[0.8rem]
              bg-[#f0f2f5]
              font-bold
              w-[5rem]
              h-[2rem]  
              transition
              px-2
              py-1
                `
                : `
            rounded-full
          color-[#555555]
          text-[0.8rem]
          font-bold
          w-[5rem]
          h-[2rem]  
          transition
          hover:bg-[#f0f2f5]
          px-2
          py-1
            `
            }
          >
            Não lidas
          </button>
        </div>
      </div>
      <Divider
        sx={{
          marginBottom: "1rem",
        }}
      />
      <div
        className="
        h-[calc(100vh-19.8rem)]
        overflow-y-scroll
        scrollbar-thumb-[#a5a5a5]
        scrollbar-thumb-rounded-full
        scrollbar-w-2
        scrollbar-thin
      "
      >
        {notificationsMock
          .sort((a, b) => {
            if (filterUnreadNotifications) {
              if (a.unreadNotification && !b.unreadNotification) return -1;
              if (!a.unreadNotification && b.unreadNotification) return 1;
            }

            const timeA = new Date(
              a.time.split(":")[0] as any,
              a.time.split(":")[1] as any
            );
            const timeB = new Date(
              b.time.split(":")[0] as any,
              b.time.split(":")[1] as any
            );
            if (timeA > timeB) {
              return -1;
            }
            if (timeA < timeB) {
              return 1;
            }
            return 0;
          })

          .map((notification) => (
            <NotificationCard
              name={notification.name}
              content={notification.content}
              time={notification.time}
              unreadNotification={notification.unreadNotification}
            />
          ))}
      </div>
    </Menu>
  );

  function returnedUserSearch() {
    const filteredUsers = usersMock.filter((user) => {
      return (
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.userDemand.toLowerCase().includes(search.toLowerCase())
      );
    });

    if (filteredUsers.length === 0) {
      return (
        <div className="grid justify-center items-center">
          <div className="flex justify-center items-center mt-10">
            <SearchOffIcon
              sx={{
                fontSize: 100,
                color: "#BDBDBD",
              }}
            />
          </div>
          <p className="font-roboto tracking-wide text-[#BDBDBD] cursor-default">
            Nenhum usuário encontrado
          </p>
        </div>
      );
    } else {
      return filteredUsers.map((user) => (
        <UserMessageCard
          name={user.name}
          userDemand={user.userDemand}
          lastMessage={user.lastMessage}
          time={user.time}
          unreadMessages={user.unreadMessages}
          isOnline={user.isOnline}
        />
      ));
    }
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          sx={{
            "& .MuiToolbar-root": {
              zIndex: 20,
              backgroundColor: "#0075B1",
              minHeight: "56px",
            },
          }}
        >
          <Toolbar>
            <Link to="/minhas-demandas" className="cursor-pointer">
              <img className="h-full w-16" src={WegLogo} alt="" />
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

              <Tooltip title="Mensagens">
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                  sx={{
                    marginLeft: "0.5rem",
                  }}
                  onClick={handleMessagesMenuOpen}
                >
                  <Badge badgeContent={4} color="error">
                    <MailIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title="Notificações">
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                  onClick={handleNotificationsMenuOpen}
                >
                  <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMessages}
        {renderNotifications}
      </Box>
    </div>
  );
}
