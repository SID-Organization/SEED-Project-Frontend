import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

import { useState } from "react";

import UserMessageCard from "../../../Components/Chat-components/user-message-card";

export default function Chat() {
  return (
    <div className="flex max-h-[100rem]">
      <div className="grid">
        <div className="w-[25rem] h-[5rem] flex justify-center items-center">
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
              backgroundColor: "#F5F5F5",
            }}
          >
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <Divider sx={{ height: "50%", m: 0.5 }} orientation="vertical" />
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Procure"
              inputProps={{ "aria-label": "search google maps" }}
            />
          </Paper>
        </div>
        <div className=" w-[25rem] overflow-y-scroll h-[75vh]">
          {/* recent messages and respective users here */}

          <UserMessageCard
            name="Henrique Cole Fernandes"
            userDemand="Software lento"
            lastMessage="Bom dia, tudo bem?"
            time="12:00"
            isOnline={true}
            unreadMessages={false}
          />
          <UserMessageCard
            name="Leonardo Giuseppe de Souza Rafaelli"
            userDemand="Maquina de café quebrada"
            lastMessage="Hello world"
            time="12:00"
            isOnline={false}
            unreadMessages={10}
          />
          <UserMessageCard
            name="Otavio Augusto dos Santos"
            userDemand="Sistema de segurança fraco"
            lastMessage="Opa bele?"
            time="12:00"
            isOnline={false}
            unreadMessages={false}
          />
          <UserMessageCard
            name="Gustavo Rebelatto Zapella"
            userDemand="Computador lento no software X"
            lastMessage="Salve salve, tudo bem?"
            time="12:00"
            unreadMessages={3}
            isOnline={true}
          />
          <UserMessageCard
            name="Leonardo Rafaelli"
            userDemand="Software lento"
            lastMessage="Bom dia, tudo bem?"
            time="12:00"
            unreadMessages={4}
            isOnline={false}
          />
          <UserMessageCard
            name="Leonardo Rafaelli"
            userDemand="Software lento"
            lastMessage="Bom dia, tudo bem?"
            time="12:00"
            isOnline={true}
            unreadMessages={false}
          />
          <UserMessageCard
            name="Henrique Cole Fernandes"
            userDemand="Software lento"
            lastMessage="Bom dia, tudo bem?"
            time="12:00"
            isOnline={true}
            unreadMessages={false}
          />
          <UserMessageCard
            name="Leonardo Giuseppe de Souza Rafaelli"
            userDemand="Maquina de café quebrada"
            lastMessage="Hello world"
            time="12:00"
            isOnline={false}
            unreadMessages={10}
          />
          <UserMessageCard
            name="Otavio Augusto dos Santos"
            userDemand="Sistema de segurança fraco"
            lastMessage="Opa bele?"
            time="12:00"
            isOnline={false}
            unreadMessages={false}
          />
          <UserMessageCard
            name="Gustavo Rebelatto Zapella"
            userDemand="Computador lento no software X"
            lastMessage="Salve salve, tudo bem?"
            time="12:00"
            unreadMessages={3}
            isOnline={false}
          />
          <UserMessageCard
            name="Leonardo Rafaelli"
            userDemand="Software lento"
            lastMessage="Bom dia, tudo bem?"
            time="12:00"
            unreadMessages={4}
            isOnline={true}
          />
          <UserMessageCard
            name="Leonardo Rafaelli"
            userDemand="Software lento"
            lastMessage="Bom dia, tudo bem?"
            time="12:00"
            isOnline={false}
            unreadMessages={false}
          />
        </div>
      </div>
      <div className="border-black border-2 h-auto w-full">
        <div>{/* messages here */}</div>
        <div>{/* chat here */}</div>
      </div>
    </div>
  );
}
