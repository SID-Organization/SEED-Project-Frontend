import { useEffect, useState } from "react";

// MUI
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Tooltip } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import Diversity3RoundedIcon from "@mui/icons-material/Diversity3Rounded";

// React chat elements
import "react-chat-elements/dist/main.css";
import { MessageBox } from "react-chat-elements";
import { SystemMessage } from "react-chat-elements";

//WebSocket Imports
import { over } from "stompjs";
import SockJs from "sockjs-client/dist/sockjs";

// Components
import UserMessageCard from "../../../Components/Chat-components/user-message-card";
import ChatSubHeader from "../../../Components/Chat-components/Chat-sub-header";

// Services
import ChatService from "../../../service/Chat-Service";

// Utils
import UserUtils from "../../../utils/User-Utils";

export default function Chat() {
  const [temporaryMessages, setTemporaryMessages] = useState([]);
  const [messagesReceivedByWS, setMessagesReceivedByWS] = useState([]);
  const [chatUserId, setChatUserId] = useState();

  const [stompClient, setStompClient] = useState(null);

  const [privateChats, setPrivateChats] = useState(new Map());

  //State para filtrar os usuários que serão exibidos na lista de usuários
  const [search, setSearch] = useState("");

  //States para armazenar os usuários de um chat e suas respectivas mensagens
  const [chatUsers, setChatUsers] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);

  //States para armazenar qual o nome do usuário e sua respectiva demanda
  const [userNameCard, setUserNameCard] = useState("");
  const [userDemandCard, setUserDemandCard] = useState("");

  //State para armazenar o id do chat que o usuário está conversando
  const [chatId, setChatId] = useState(0);

  //State para armazenar a mensagem que o usuário quer enviar
  const [message, setMessage] = useState("");

  //State para armazenar as mensagens buscadas no banco de dados
  const [messages, setMessages] = useState([]);

  //States para armazenar arquivos enviados
  const [file, setFile] = useState([]);
  const [preview, setPreview] = useState("");

  const connect = () => {
    let Sock = new SockJs("http://localhost:8080/ws");
    setStompClient(over(Sock));
  };

  useEffect(() => {
    if (stompClient) {
      stompClient.connect({}, onConnected, onError);
    }
  }, [stompClient]);

  const [userData, setUserData] = useState({});

  useEffect(() => {
    ChatService.getChatByUserId(UserUtils.getLoggedUserId())
      .then((response) => {
        setChatUsers(response.data);
      });
  }, []);

  useEffect(() => {
    console.log("USERS: ", chatUsers);
  }, [chatUsers]);


  const onConnected = () => {
    setUserData((prvState) => ({ ...prvState, connected: true }));
    stompClient.subscribe(
      "/demanda/" + userData.idDemanda.idDemanda + "/" + userData.idChat.idChat,
      onPrivateMessage
    );
    userJoin();
  };

  const onError = (error) => {
    console.log(error);
  };

  const userJoin = () => {
    var chatMessage = {
      idUsuario: userData.idUsuario.numeroCadastroUsuario,
      status: "JOIN",
    };
    stompClient.send("/app/message/", {}, JSON.stringify(chatMessage));
  };

  const onPrivateMessage = (payload) => {
    var payLoadData = JSON.parse(payload.body);
    console.log("PAYLOAD: ", payLoadData);
    if (payLoadData.idUsuario.numeroCadastroUsuario == UserUtils.getLoggedUserId()) {
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
    setChatUsers(
      chatUsers.map((user) => {
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
      setChatUsers(
        chatUsers.map((user) => {
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
    console.log("CHAT ID: ", chatId);
  }, [chatId]);

  const sendPrivateValue = () => {
    const date = new Date();

    var chatMessage = {
      textoMensagem: userData.message,
      arquivoMensagem: null,
      dataMensagem: date.toISOString(),
      idUsuario: userData.idUsuario,
      idChat: { idChat: userData.idChat.idChat },
    };

    if (userData.idChat.idChat !== userData.idChat.idChat) {
      privateChats.get(userData.idChat.idChat).push(chatMessage);
      setPrivateChats(new Map(privateChats));
    }
    stompClient.send("/app/sid/api/mensagem", {}, JSON.stringify(chatMessage));

    setTemporaryMessages([
      ...temporaryMessages,
      {
        textoMensagem: userData.message,
        idUsuario: chatUserId,
        dataMensagem: new Date().toLocaleTimeString(),
        idChat: userData.idChat.idChat,
        position: "right",
      },
    ]);

    setUserData({ ...userData, message: "" });
  };

  //UseEffect para buscar todas as mensagens do banco de dados
  useEffect(() => {
    ChatService.getChatMessagesByChatId(chatId)
      .then((messages) => {
        setChatMessages(messages);
      });
  }, [chatId]);

  useEffect(() => {
    setTemporaryMessages([]);
  }, [chatUserId]);

  //UseEffect para setar no card de usuário o nome e a demanda do usuário
  const [userCard, setUserCard] = useState();

  useEffect(() => {
    if (chatUsers.length > 0) {
      setChatUsers(
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

  //UseEffect para setar as mensagens no chat
  useEffect(() => {
    if (chatId != 0) {
      setMessages(
        chatMessages.map((message) => {
          return {
            position:
              message.idUsuario !== UserUtils.getLoggedUserId() ? "right" : "left",
            type: "text",
            text: message.textoMensagem,
            date: message.dataMensagem,
            status: "received ",
          };
        })
      );
    }
  }, [chatMessages]);

  //Função para filtrar os usuários que serão exibidos na lista de usuários
  function returnedUserSearch() {
    const filteredUsers = chatUsers.filter(user => {
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
    <div className="flex max-h-screen h-[calc(100vh-10rem)]">
      <div>
        <div className="w-[25rem] h-[5rem] flex justify-center items-center shadow-md">
          {/* Search user here */}
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: "100%",
              height: "3.5rem",
              borderRadius: "50px",
              marginLeft: "1rem",
              marginRight: "1rem",
            }}
          >
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon
                sx={{
                  color: "#9e9e9e",
                }}
              />
            </IconButton>
            <Divider sx={{ height: "50%", m: 0.5 }} orientation="vertical" />
            <InputBase
              sx={{ ml: 1, flex: 1, color: "#020202" }}
              placeholder="Procure por um usuário ou demanda"
              inputProps={{ "aria-label": "search google maps" }}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Paper>
        </div>
        <div
          className=" w-[25rem] overflow-y-scroll h-[calc(100vh-10rem)]
           scrollbar-thumb-[#C9c9c9] scrollbar-thumb-rounded-full 
           hover:scrollbar-thumb-[#acacac] scrollbar-w-2 scrollbar-thin
           bg-[#F5F5F5]
          "
        >
          {/* USERS HERE */}
          {search === ""
            ? chatUsers
              .sort((a, b) => {
                if (a.unreadMessages && !b.unreadMessages) return -1;
                if (!a.unreadMessages && b.unreadMessages) return 1;

                // const timeA = new Date(
                //   a.time.split(":")[0],
                //   a.time.split(":")[1]
                // );

                // const timeB = new Date(
                //   b.time.split(":")[0],
                //   b.time.split(":")[1]
                // );

                // if (timeA > timeB) {
                //   return -1;
                // }
                // if (timeA < timeB) {
                //   return 1;
                // }

                return 0;
              })

              .map((user) => {
                return (
                  <div
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
      </div>
      {chatId === 0 ? (
        <div className="w-full h-full flex justify-center items-center">
          <div className="grid items-center justify-center">
            <div className="flex justify-center">
              <Diversity3RoundedIcon
                sx={{
                  fontSize: 200,
                  color: "#0075B1",
                }}
              />
            </div>
            <p className="font-roboto tracking-wide text-blue-weg font-bold text-2xl cursor-default">
              Selecione um usuário para iniciar uma conversa
            </p>
          </div>
        </div>
      ) : (
        <div className=" w-full bg-[#dddddd]">
          {/* Nome do usuário no subheader */}
          <ChatSubHeader userName={userNameCard} userDemand={userDemandCard} />
          <div
            className="
              bg-[#dddddd]
              h-[calc(100vh-19.8rem)]
              overflow-y-scroll
              scrollbar-thumb-[#a5a5a5]
              scrollbar-thumb-rounded-full
              scrollbar-w-2
              scrollbar-thin
              flex flex-col-reverse
            "
          >
            {/* messages here */}
            <div className="grid gap-5">
              <SystemMessage text={"Hoje"} />
              {messages.map((message) => {
                return (
                  <MessageBox
                    position={message.position}
                    text={message.text}
                    type={message.type}
                    date={message.date}
                    status={message.status}
                    className={message.position === "left" ? "mr-32" : "ml-32"}
                  />
                );
              })}
              {temporaryMessages.map((message) => {
                return (
                  <MessageBox
                    position={message.position}
                    text={message.textoMensagem}
                    type="text"
                    date={message.dataMensagem}
                  />
                );
              })}
            </div>
          </div>
          <div
            className="
              bg-[#ffffff]
            h-[7.5rem]
            flex
            "
          >
            <Tooltip title="Adicionar anexo">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
                sx={{
                  ml: 2,
                  mt: 5,
                  mb: 1,
                  mr: 1,
                  color: "#0075B1",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    color: "#000",
                  },
                  height: "2.5rem",
                  width: "2.5rem",
                }}
              >
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  //get the file and set in the input

                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFile(file);
                        setPreview(reader.result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <AttachFileIcon />
              </IconButton>
            </Tooltip>
            <input
              className="
              w-[calc(100%-3.5rem)]
              h-[6.5rem]
              border-[1px]
              border-[#c9c9c9]
              rounded-[1.5rem]
              px-5
              focus:outline-none
              mt-2
              "
              type="text"
              placeholder="Digite uma mensagem"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  if (userData.message !== "") {
                    sendPrivateValue();
                  }
                }
              }}
              onChange={(e) => {
                setUserData({
                  ...userData,
                  message: e.target.value,
                });
              }}
              value={userData.message}
            />
            <Tooltip title="Enviar mensagem">
              <IconButton
                onClick={
                  userData.message !== ""
                    ? () => {
                      sendPrivateValue();
                      setMessage("");
                    }
                    : () => { }
                }
                color="primary"
                aria-label="upload picture"
                component="label"
                sx={{
                  ml: 2,
                  mt: 5,
                  mb: 1,
                  mr: 1,
                  color: "#0075B1",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    color: "#000",
                  },
                  height: "2.5rem",
                  width: "2.5rem",
                }}
              >
                <SendRoundedIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      )}
    </div>
  );
}
