import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

import { useState } from "react";

import UserMessageCard from "../../../Components/Chat-components/user-message-card";

export default function Chat() {
  const [search, setSearch] = useState("");

  function filterUser(e: any) {
    setSearch(e.target.value);
  }

  const users = [
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

  return (
    <div className="flex max-h-screen h-[calc(100vh-10rem)]">
      <div>
        <div className="w-[25rem] h-[5rem] flex justify-center items-center bg-blue-weg">
          {/* search user here */}
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
              backgroundColor: "#5e80c1",
            }}
          >
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon
                sx={{
                  color: "#fff",
                }}
              />
            </IconButton>
            <Divider
              sx={{ height: "50%", m: 0.5, backgroundColor: "#fff" }}
              orientation="vertical"
            />
            <InputBase
              sx={{ ml: 1, flex: 1, color: "#fff" }}
              placeholder="Procure por um usuário ou demanda"
              inputProps={{ "aria-label": "search google maps" }}
              onChange={(e) => filterUser(e)}
            />
          </Paper>
        </div>
        <div className=" w-[25rem] overflow-y-scroll h-[calc(100vh-10rem)]">
          {/* recent messages and respective users here */}
          {search === ""
            ? users
                .sort((a, b) => {
                  //user with unread messages first
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
            : users
                .filter((user) => {
                  return (
                    user.name.toLowerCase().includes(search.toLowerCase()) ||
                    user.userDemand.toLowerCase().includes(search.toLowerCase())
                  );
                })
                .map((user) => {
                  return (
                    <UserMessageCard
                      name={user.name}
                      userDemand={user.userDemand}
                      lastMessage={user.lastMessage}
                      time={user.time}
                      unreadMessages={user.unreadMessages}
                      isOnline={user.isOnline}
                    />
                  );
                })}
        </div>
      </div>
      <div className="border-black border-2 w-full ">
        {/* this is the username subheader */}
        <div className="shadow-md h-20 flex justify-start items-center bg-[#eeedef]">
          <p className="ml-5 font-roboto text-blue-weg font-bold text-2xl">
            Henrique Cole Fernandes
          </p>
        </div>
        <div>{/* messages here */}</div>
        <div>{/* chat here */}</div>
      </div>
    </div>
  );
}
