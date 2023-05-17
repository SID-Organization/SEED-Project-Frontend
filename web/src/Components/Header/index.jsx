import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../styles/index.css";

// MUI
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import SearchIcon from "@mui/icons-material/Search";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import {
  Accordion,
  Avatar,
  Divider,
  InputBase,
  Paper,
  Tooltip,
} from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiButton from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Assets
import BrazilFlag from "../../assets/countries-flags/brazil.png";
import UnitedStatesFlag from "../../assets/countries-flags/united-states.png";
import SpainFlag from "../../assets/countries-flags/spain.png";
import ChinaFlag from "../../assets/countries-flags/china.png";
import WegLogo from "../../assets/weg-logo.png";

// Components
import UserMessageCard from "../Chat-components/user-message-card";
import NotificationCard from "../Notification-card";

//Services
import ChatService from "../../service/Chat-Service";
import NotificationService from "../../service/Notificacao-Service";

// Utils
import UserUtils from "../../utils/User-Utils";
import WebSocketUtils from "../../utils/WebSocket-Utils";

//WebSocket Imports
import { over } from "stompjs";
import SockJs from "sockjs-client/dist/sockjs";

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
  // Usa react router para navegar entre as páginas dentro de funções.
  const navigate = useNavigate();

  // Estado que armazena o usuário logado.
  const [user, setUser] = useState(UserUtils.getLoggedUser());

  // Função que retorna o avatar do usuário (Imagem ou letras).
  const userAvatar = () => {
    if (user && user.fotoUsuario) {
      // add a check to see if 'user' is defined
      return { foto: true, src: user.fotoUsuario };
    } else if (user && user.nomeUsuario) {
      // add a check to see if 'user.nomeUsuario' is defined
      const names = user.nomeUsuario.split(" ");
      const userLetterAvatar =
        names[0][0].toUpperCase() + names[names.length - 1][0].toUpperCase();
      return {
        foto: false,
        src: userLetterAvatar,
      };
    } else {
      // handle case when 'user' is undefined or does not have 'fotoUsuario' or 'nomeUsuario' properties
      return {
        foto: false,
        src: "",
      };
    }
  };

  const [menuAnchoeEl, setmMenuAnchoeEl] = useState(null);
  const [messagesAnchoeEl, setMessagesAnchoeEl] = useState(null);
  const [notificationsAnchoeEl, setNotificationsAnchoeEl] = useState(null);

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

  const handleProfileMenuOpen = (event) => {
    setmMenuAnchoeEl(event.currentTarget);
  };

  const handleMessagesMenuOpen = (event) => {
    setMessagesAnchoeEl(event.currentTarget);
  };

  const handleNotificationsMenuOpen = (event) => {
    setNotificationsAnchoeEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setmMenuAnchoeEl(null);
  };

  const handleMessagesMenuClose = () => {
    setMessagesAnchoeEl(null);
  };

  const handleNotificationsMenuClose = () => {
    setNotificationsAnchoeEl(null);
  };

  const handleSystemExit = () => {
    UserUtils.logUserOut();
    navigate("/login");
    location.reload();
  };

  const notificationsMock = [
    {
      name: "Henrique Cole Fernandes",
      time: "21:00",
      content: "Aprovou sua demanda!",
      unreadNotification: false,
      type: "approved",
    },
    {
      name: "Leonardo Rafaelli",
      time: "12:00",
      content: "Reprovou sua demanda!",
      unreadNotification: true,
      type: "rejected",
    },
    {
      name: "Gustavo Rebelatto Zapella",
      time: "15:00",
      content: "Reprovou sua demanda!",
      unreadNotification: true,
      type: "returned",
    },
    {
      name: "Romario Horngurg",
      time: "18:00",
      content: "Editou sua demanda!",
      unreadNotification: false,
      type: "edited",
    },
    {
      name: "Otavio Augusto dos Santos",
      time: "09:00",
      content: "Reprovou sua demanda!",
      unreadNotification: false,
      type: "rejected",
    },
    {
      name: "Henrique Cole Fernandes",
      time: "22:00",
      content: "Aprovou sua demanda!",
      unreadNotification: false,
      type: "approved",
    },
    {
      name: "Leonardo Rafaelli",
      time: "16:00",
      content: "Devolveu sua demanda!",
      unreadNotification: true,
      type: "returned",
    },
    {
      name: "Gustavo Rebelatto Zapella",
      time: "20:00",
      content: "Devolveu sua demanda!",
      unreadNotification: true,
      type: "returned",
    },
    {
      name: "Romario Horngurg",
      time: "17:00",
      content: "Reprovou sua demanda!",
      unreadNotification: false,
      type: "rejected",
    },
    {
      name: "Otavio Augusto dos Santos",
      time: "14:00",
      content: "Editou sua demanda!",
      unreadNotification: false,
      type: "edited",
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
      onClose={handleCloseMenu}
    >
      <Link to="/perfil">
        <MenuItem onClick={handleCloseMenu}>Seu perfil</MenuItem>
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
                  h-7
                  w-7
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
                  h-7
                  w-7
              "
                src={UnitedStatesFlag}
                alt=""
              />
              <h1 className="ml-1 mr-6">Inglês</h1>
            </div>
          </Button>
        </AccordionDetails>
        <AccordionDetails>
          <Button variant="contained">
            <div className="flex items-center justify-center gap-5">
              <img
                className="
                  h-7
                  w-7
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
                  h-7
                  w-7
              "
                src={ChinaFlag}
                alt=""
              />
              <h1 className="ml-1 mr-[0.9rem]">Chinês</h1>
            </div>
          </Button>
        </AccordionDetails>
      </Accordion>
      <MenuItem onClick={handleSystemExit}>Sair</MenuItem>
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

  const [chatUsers, setChatUsers] = useState([]);
  const [users, setUsers] = useState([]);

  const [messagesReceivedByWS, setMessagesReceivedByWS] = useState([]);
  const [temporaryMessages, setTemporaryMessages] = useState([]);

  const [destinyList, setDestinyList] = useState([]);
  const [notificationsReceivedByWS, setNotificationsReceivedByWS] = useState(
    []
  );

  const userJoin = () => {
    var chatMessage = {
      idUsuario: userData.idUsuario.numeroCadastroUsuario,
      status: "JOIN",
    };
    stompClient.send("/app/message/", {}, JSON.stringify(chatMessage));
  };

  const onConnected = () => {
    setUserData((prvState) => ({ ...prvState, connected: true }));
    stompClient.subscribe(
      "/demanda/" + userData.idDemanda.idDemanda + "/" + userData.idChat.idChat,
      onPrivateMessage
    );
    userJoin();
  };

  const onPrivateMessage = (payload) => {
    var payLoadData = JSON.parse(payload.body);
    if (
      payLoadData.idUsuario.numeroCadastroUsuario == UserUtils.getLoggedUserId()
    ) {
      setMessagesReceivedByWS((prevState) => [...prevState, payLoadData]);
      setTemporaryMessages((prevState) => [
        ...prevState,
        {
          textoMensagem: payLoadData.textoMensagem,
          idUsuario: payLoadData.idUsuario.numeroCadastroUsuario,
          dataMensagem: new Date().toLocaleTimeString(),
          idChat: payLoadData.idChat.idChat,
          position: "left",
        },
      ]);
    }
  };

  // Atualiza a ultima mensagem do chat
  useEffect(() => {
    const lastMessage = messagesReceivedByWS[messagesReceivedByWS.length - 1];
    setUsers(
      users.map((user) => {
        if (user.idChat === lastMessage.idChat.idChat) {
          return { ...user, lastMessage: lastMessage.textoMensagem };
        } else {
          return user;
        }
      })
    );
  }, [messagesReceivedByWS]);

  useEffect(() => {
    if (temporaryMessages.length > 0) {
      const lastMessage = temporaryMessages[temporaryMessages.length - 1];
      setUsers(
        users.map((user) => {
          if (user.idChat === lastMessage.idChat) {
            return { ...user, lastMessage: lastMessage.textoMensagem };
          } else {
            return user;
          }
        })
      );
    }
  }, [temporaryMessages]);

  useEffect(() => {
    if (chatUsers) {
      setUsers(
        chatUsers.map((user) => ({
          picture: user.fotoAnalista,
          name: user.nomeAnalista,
          userDemand: user.tituloDemanda,
          lastMessage: user.ultimaMensagem,
          time: user.dataUltimaMensagem,
          idUsuario: user.idUsuario,
          unreadMessages: "1",
          idChat: user.idChat,
          idDemanda: user.idDemanda,
          isOnline: true,
        }))
      );
    }
  }, [chatUsers]);

  //UseEffect para buscar todos os usuários do banco de dados
  useEffect(() => {
    ChatService.getChatByUserId(UserUtils.getLoggedUserId()).then((users) => {
      setChatUsers(users);
    });
    WebSocketUtils.connect(handleNotification);
    NotificationService.getNotificacaoByUsuario(
      UserUtils.getLoggedUserId()
    ).then((data) => setNotificationsReceivedByWS(data));
    return () => {
      WebSocketUtils.disconnect();
    };
  }, []);

  let listaVerifica = [];
  const handleNotification = (notification) => {
    listaVerifica = [...listaVerifica, notification];
    if (listaVerifica.length === 1) {
      setNotificationsReceivedByWS((prevState) => [
        ...prevState,
        JSON.parse(notification.body),
      ]);
    } else if (listaVerifica[listaVerifica.length - 1] != notification) {
      setNotificationsReceivedByWS((prevState) => [
        ...prevState,
        JSON.parse(notification.body),
      ]);
    }
  };

  useEffect(() => {
    listaVerifica = [];
  }, [notificationsReceivedByWS]);

  const [stompClient, setStompClient] = useState(null);

  const [chatUserId, setChatUserId] = useState();

  //States para armazenar qual o nome do usuário e sua respectiva demanda
  const [userNameCard, setUserNameCard] = useState("");
  const [userDemandCard, setUserDemandCard] = useState("");

  //State para armazenar o id do chat que o usuário está conversando
  const [chatId, setChatId] = useState(0);

  const [userData, setUserData] = useState();

  const connect = () => {
    let Sock = new SockJs("http://localhost:8080/ws");
    setStompClient(over(Sock));
  };

  const onError = (error) => {
    console.log(error);
  };

  useEffect(() => {
    if (stompClient) {
      stompClient.connect({}, onConnected, onError);
    }
  }, [stompClient]);

  //Componente dos chats que o usuário possui
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
        mb-3
        ml-3
        text-2xl
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
        scrollbar-thin
        scrollbar-thumb-[#a5a5a5]
        scrollbar-thumb-rounded-full
        scrollbar-w-2
      "
      >
        {search === ""
          ? users
              .sort((a, b) => {
                if (a.unreadMessages && !b.unreadMessages) return -1;
                if (!a.unreadMessages && b.unreadMessages) return 1;

                // const timeA = new Date(
                //   a.time.split(":")[0] as any,
                //   a.time.split(":")[1] as any
                // );
                // const timeB = new Date(
                //   b.time.split(":")[0] as any,
                //   b.time.split(":")[1] as any
                // );
                // if (timeA > timeB) {
                //   return -1;
                // }
                // if (timeA < timeB) {
                //   return 1;
                // }
                return 0;
              })
              .map((user, i) => {
                return (
                  <div
                    key={i}
                    onClick={() => {
                      const userName = user.name;
                      const userDemand = user.userDemand;
                      setChatUserId(user.idUsuario);
                      setUserNameCard(userName);
                      setUserDemandCard(userDemand);
                      setChatId(user.idChat);
                      setUserData({
                        idUsuario: {
                          numeroCadastroUsuario: user.idUsuario,
                        },
                        idChat: { idChat: user.idChat },
                        idDemanda: { idDemanda: user.idDemanda },
                        connected: false,
                        message: "",
                      });
                      connect();
                    }}
                  >
                    <UserMessageCard
                      picture={user.picture}
                      name={user.name}
                      userDemand={user.userDemand}
                      lastMessage={user.lastMessage}
                      time={user.time}
                      unreadMessages={user.unreadMessages}
                      isOnline={user.isOnline}
                    />
                  </div>
                );
              })
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
        <div className="flex items-center justify-between">
          <p
            className="
        ml-3
        text-2xl
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
        <div className="mb-1 flex items-center">
          <button
            onClick={() => {
              setFilterUnreadNotifications(false);
            }}
            className={
              filterUnreadNotifications
                ? `
                color-[#555555]
              h-[2rem]
              w-[5rem]
              rounded-full
              px-2
              py-1  
              text-[0.8rem]
              font-bold
              transition
              hover:bg-[#f0f2f5]
                `
                : `
                h-[2rem]
                w-[5rem]
                rounded-full
                bg-[#f0f2f5]
                px-2
                py-1
                text-[0.8rem]  
                font-bold
                text-[#0075b1]
                transition
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
                h-[2rem]
              w-[5rem]
              rounded-full
              bg-[#f0f2f5]
              px-2
              py-1
              text-[0.8rem]  
              font-bold
              text-[#0075b1]
              transition
                `
                : `
            color-[#555555]
          h-[2rem]
          w-[5rem]
          rounded-full
          px-2
          py-1  
          text-[0.8rem]
          font-bold
          transition
          hover:bg-[#f0f2f5]
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
        scrollbar-thin
        scrollbar-thumb-[#a5a5a5]
        scrollbar-thumb-rounded-full
        scrollbar-w-2
      "
      >
        {notificationsReceivedByWS &&
          notificationsReceivedByWS
            .sort((a, b) => {
              if (filterUnreadNotifications) {
                if (a.unreadNotification && !b.unreadNotification) return -1;
                if (!a.unreadNotification && b.unreadNotification) return 1;
              }

              // const timeA = new Date(a.time.split(":")[0], a.time.split(":")[1]);
              // const timeB = new Date(b.time.split(":")[0], b.time.split(":")[1]);
              // if (timeA > timeB) {
              //   return -1;
              // }
              // if (timeA < timeB) {
              //   return 1;
              // }
              // return 0;
            })

            .map((notification, i) => (
              <NotificationCard
                key={i}
                name={notification.responsavel}
                content={notification.textoNotificacao}
                time={notification.tempoNotificacao}
                unreadNotification={true}
                type={notification.tipoNotificacao}
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
        <div className="grid items-center justify-center">
          <div className="mt-10 flex items-center justify-center">
            <SearchOffIcon
              sx={{
                fontSize: 100,
                color: "#BDBDBD",
              }}
            />
          </div>
          <p className="cursor-default font-roboto tracking-wide text-[#BDBDBD]">
            Nenhum usuário encontrado
          </p>
        </div>
      );
    } else {
      return filteredUsers.map((user, i) => (
        <UserMessageCard
          key={i}
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
            <Link to="/demandas" className="cursor-pointer">
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
                  <h1 className="flex items-center justify-center text-usual">
                    {user.nomeUsuario}
                  </h1>
                  {userAvatar().foto ? (
                    <Avatar
                      src={"data:image/png;base64," + userAvatar().src}
                      sx={{
                        width: 30,
                        height: 30,
                      }}
                    />
                  ) : (
                    <Avatar
                      sx={{
                        bgcolor: "#023A67",
                        width: 30,
                        height: 30,
                        fontSize: 14,
                      }}
                    >
                      {userAvatar().src}
                    </Avatar>
                  )}
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
                  <Badge badgeContent={users.length} color="error">
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
