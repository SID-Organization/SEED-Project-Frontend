import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import SearchOffIcon from "@mui/icons-material/SearchOff";

import "react-chat-elements/dist/main.css";
import { MessageBox } from "react-chat-elements";
import { SystemMessage } from "react-chat-elements";
import AttachFileIcon from "@mui/icons-material/AttachFile";

import { useEffect, useState } from "react";

import UserMessageCard from "../../../Components/Chat-components/user-message-card";
import ChatSubHeader from "../../../Components/Chat-components/Chat-sub-header";
import { Tooltip } from "@mui/material";

async function getUsersFromDatabase() {
  const response = await fetch(
    "http://localhost:8080/sid/api/chat/usuario/72130"
  );
  const users = await response.json();
  return users;
}

async function getMessagesFromDatabase() {
  const response = await fetch("http://localhost:8080/sid/api/chat/mensagem/1");
  const messages = await response.json();
  return messages;
}

function getLoggedUserId() {
  return JSON.parse(localStorage.getItem("user")!).numeroCadastroUsuario;
}

export default function Chat() {
  //State para filtrar os usuários que serão exibidos na lista de usuários
  const [search, setSearch] = useState("");

  //States para armazenar os usuários de um chat e suas respectivas mensagens
  const [chatUsers, setChatUsers] = useState<any[]>([]);
  const [chatMessages, setChatMessages] = useState<any[]>([]);

  //States para armazenar qual o nome do usuário e sua respectiva demanda
  const [userNameCard, setUserNameCard] = useState<string>("");
  const [userDemandCard, setUserDemandCard] = useState<string>("");

  //State para armazenar a mensagem que o usuário quer enviar
  const [message, setMessage] = useState("");

  //State para armazenar as mensagens buscadas no banco de dados
  const [messages, setMessages] = useState<any[]>([]);

  //State para armazenar os usuários buscados no banco de dados
  const [users, setUsers] = useState<any>([]);

  //States para armazenar arquivos enviados
  const [file, setFile] = useState([]);
  const [preview, setPreview] = useState("");

  //UseEffect para buscar todos os usuários do banco de dados
  useEffect(() => {
    getUsersFromDatabase().then((users) => {
      setChatUsers(users);
      console.log("USERS: ", users);
    });
  }, []);

  //UseEffect para buscar todas as mensagens do banco de dados
  useEffect(() => {
    getMessagesFromDatabase().then((messages) => {
      setChatMessages(messages);
      console.log("MESSAGES: ", messages);
    });
  }, []);

  //UseEffect para setar no card de usuário o nome e a demanda do usuário
  useEffect(() => {
    setUsers(
      chatUsers.map((user) => ({
        picture: user.fotoAnalista,
        name: user.nomeAnalista,
        userDemand: user.tituloDemanda,
        lastMessage: user.ultimaMensagem,
        time: user.dataUltimaMensagem,
        unreadMessages: "1",
        isOnline: true,
      }))
    );
  }, [chatUsers]);

  //UseEffect para setar as mensagens no chat
  useEffect(() => {
    setMessages(
      chatMessages.map((message) => ({
        position: message.idUsuario === getLoggedUserId() ? "right" : "left",
        type: "text",
        text: message.textoMensagem,
        date: message.dataMensagem,
        status: "received ",
      }))
    );
  }, [chatMessages]);

  //Função para enviar uma mensagem
  function sendMessage() {
    setMessages([
      ...messages,
      {
        position: "right",
        type: "text",
        text: message,
        date: new Date(),
        status: "received",
      },
    ]);
    setMessage("");
  }

  //Função para filtrar os usuários que serão exibidos na lista de usuários
  function returnedUserSearch() {
    const filteredUsers = users.filter((user: any) => {
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
      return filteredUsers.map((user: any) => (
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
          "
        >
          {/* USERS HERE */}
          {search === ""
            ? users
                .sort((a: any, b: any) => {
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
                .map((user: any) => (
                  <div
                    onClick={() => {
                      const userName = user.name;
                      const userDemand = user.userDemand;
                      setUserNameCard(userName);
                      setUserDemandCard(userDemand);
                      console.log("USERNAME: ", userNameCard);
                      console.log("USERDEMAND: ", userDemandCard);
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
                ))
            : returnedUserSearch()}
        </div>
      </div>
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
                      setFile(file as any);
                      setPreview(reader.result as string);
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
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                if (message !== "") {
                  sendMessage();
                }
              }
            }}
            value={message}
          />
          <Tooltip title="Enviar mensagem">
            <IconButton
              onClick={
                message !== ""
                  ? () => {
                      sendMessage();
                      setMessage("");
                    }
                  : () => {}
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
    </div>
  );
}
