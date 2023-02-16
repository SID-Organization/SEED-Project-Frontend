import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiButton from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Snackbar from "@mui/material/Snackbar";

import { styled } from "@mui/material/styles";

import UserIMG from "../../../assets/profile-pic.png";

import { useState } from "react";
import { IconButton, SnackbarContent, Tooltip } from "@mui/material";

export default function ChatSubHeader(props) {
  const [drawerState, setDrawerState] = useState({
    right: false,
  });

  const toggleDrawer =
    (anchor, open) =>
    (event) => {
      if (
        event.type === "keydown" &&
        ((event).key === "Tab" ||
          (event).key === "Shift")
      ) {
        return;
      }

      setDrawerState({ ...drawerState, [anchor]: open });
    };

  const userInformations = {
    name: "Henrique Cole Fernandes",
    userDemand: "Oracle database new plan available for teams with 10 or more.",
    email: "henriquecolefernandes@weg.net",
    department: "WEG Digital Solutions",
    section: "Front-end",
    phone: "(+55) 47 99999-9999",
  };

  const [notificationTypeMessage, setNotificationTypeMessage] =
    useState(Boolean);

  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  function copyEmailToClipboard() {
    navigator.clipboard.writeText(userInformations.email);
    handleClick({ vertical: "top", horizontal: "center" })();
    setNotificationTypeMessage(true);
  }

  function copyPhoneToClipboard() {
    navigator.clipboard.writeText(userInformations.phone);
    handleClick({ vertical: "top", horizontal: "center" })();
    setNotificationTypeMessage(false);
  }

  const [requesterButtonActive, setRequesterButtonActive] = useState(true);
  const [analystButtonActive, setAnalystButtonActive] = useState(false);

  const FilterChatRequesterButton = styled(MuiButton)(({ theme }) => ({
    width: "7rem",
    height: "30px",
    borderRadius: "5px",
    backgroundColor: requesterButtonActive ? "#0075B1" : "#F2F2F2",
    color: requesterButtonActive ? "#FFFFFF" : "#023A67",
    "&:hover": {
      backgroundColor: requesterButtonActive ? "#0075B1" : "#F2F2F2",
    },
  }));

  const FilterChatAnalystButton = styled(MuiButton)(({ theme }) => ({
    width: "7rem",
    height: "30px",
    borderRadius: "5px",
    backgroundColor: analystButtonActive ? "#0075B1" : "#F2F2F2",
    color: analystButtonActive ? "#FFFFFF" : "#023A67",
    "&:hover": {
      backgroundColor: analystButtonActive ? "#0075B1" : "#F2F2F2",
    },
  }));

  const list = (anchor) => (
    <Box
      sx={{ width: 350 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="mt-3">
        <div className="flex justify-center items-center mb-5">
          <h1 className="font-bold text-2xl text-dark-blue-weg">Informações</h1>
        </div>
        <Divider />
        <div className="grid justify-center items-center gap-2 mt-5">
          <div className="flex justify-center items-center">
            <img className="h-40 w-40" src={UserIMG} alt="" />
          </div>
          <p className="flex justify-center items-center text-lg">
            {props.userName}
          </p>
        </div>
        <div className="grid justify-start items-center font-roboto gap-3 ml-3 mt-5">
          <p className="text-lg font-bold text-justify mr-3">
            Demanda:{" "}
            <span className="font-normal text-[#222222] ">
              {props.userDemand.length > 35
                ? props.userDemand.slice(0, 35) + "..."
                : props.userDemand}
            </span>
          </p>
          <p className="text-lg font-bold text-justify mr-3">
            E-mail:{" "}
            <span
              className="font-normal text-[#222222] cursor-pointer hover:underline"
              onClick={() => {
                copyEmailToClipboard();
              }}
            >
              {userInformations.email.length > 35
                ? userInformations.email.slice(0, 35) + "..."
                : userInformations.email}
            </span>
          </p>
          <p className="text-lg font-bold mr-3">
            Departamento:{" "}
            <span className="font-normal text-[#222222]">
              {userInformations.department}
            </span>
          </p>
          <p className="text-lg font-bold text-justify mr-3">
            Seção:{" "}
            <span className="font-normal text-[#222222]">
              {userInformations.section.length > 35
                ? userInformations.section.slice(0, 35) + "..."
                : userInformations.section}
            </span>
          </p>
          <p className="text-lg font-bold text-justify mr-3">
            Telefone:{" "}
            <span
              className="font-normal text-[#222222] cursor-pointer hover:underline"
              onClick={() => {
                copyPhoneToClipboard();
              }}
            >
              {userInformations.phone}
            </span>
          </p>
        </div>
        <div className="flex justify-center items-center mt-10">
          <Button
            variant="contained"
            color="primary"
            onClick={toggleDrawer(anchor, false)}
            sx={{
              width: "80%",
              height: "50px",
              borderRadius: "10px",
              backgroundColor: "#0075B1",
              "&:hover": {
                backgroundColor: "#0075B1",
              },
            }}
          >
            Fechar
          </Button>
        </div>
      </div>
    </Box>
  );

  return (
    <div className="mb-9">
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <SnackbarContent
          style={{
            backgroundColor: "#FFF",
            color: "#023A67",
            fontWeight: "bold",
          }}
          message={
            notificationTypeMessage
              ? "E-mail copiado para a área de transferência!"
              : "Telefone copiado para a área de transferência!"
          }
        />
      </Snackbar>
      <div className="shadow-md border-l-[#d9d9d9] border-l-2 h-20 flex justify-between items-center bg-blue-weg rounded-br-sm rounded-bl-sm">
        <p className="ml-5 text-white font-normal text-xl cursor-default ">
          {props.userName}
        </p>
        <div className="flex gap-5">
          <Tooltip title="Conversar com o solicitante">
            <FilterChatRequesterButton
              variant="contained"
              color="primary"
              onClick={() => {
                setRequesterButtonActive(true);
                setAnalystButtonActive(false);
              }}
            >
              Solicitante
            </FilterChatRequesterButton>
          </Tooltip>
          <Tooltip title="Conversar com os analistas">
            <FilterChatAnalystButton
              variant="contained"
              color="primary"
              onClick={() => {
                setAnalystButtonActive(true);
                setRequesterButtonActive(false);
              }}
            >
              Analistas
            </FilterChatAnalystButton>
          </Tooltip>
        </div>
        <React.Fragment key={"right"}>
          <Tooltip title="Informações do usuário">
            <IconButton
              onClick={toggleDrawer("right", true)}
              sx={{
                marginRight: "1rem",
              }}
            >
              <InfoOutlinedIcon
                sx={{
                  color: "#fff",
                  height: "2rem",
                  width: "2rem",
                }}
              />
            </IconButton>
          </Tooltip>
          <Drawer
            anchor={"right"}
            open={drawerState["right"]}
            onClose={toggleDrawer("right", false)}
          >
            {list("right")}
          </Drawer>
        </React.Fragment>
      </div>
    </div>
  );
}