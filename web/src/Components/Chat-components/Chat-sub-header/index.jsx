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

import { useContext, useState } from "react";
import { IconButton, SnackbarContent, Tooltip } from "@mui/material";

//Translations
import TranslationJson from "../../../API/Translate/components/chatSubHeader.json";
import TranslateUtils from "../../../utils/Translate-Utils/index.js";
import { TranslateContext } from "../../../contexts/translate/index.jsx";

export default function ChatSubHeader(props) {

  const translate = TranslationJson;
  const [ language ] = useContext(TranslateContext);

  console.log("HEADER: ", props);

  const [drawerState, setDrawerState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
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
        <div className="mb-5 flex items-center justify-center">
          <h1 className="text-2xl font-bold text-dark-blue-weg">{translate["Informações"]?.[language] ?? "Informações"}</h1>
        </div>
        <Divider />
        <div className="mt-5 grid items-center justify-center gap-2">
          <div className="flex items-center justify-center">
            <img className="h-40 w-40" src={UserIMG} alt="" />
          </div>
          <p className="flex items-center justify-center text-lg">
            {props.userName}
          </p>
        </div>
        <div className="ml-3 mt-5 grid items-center justify-start gap-3 font-roboto">
          <p className="mr-3 text-justify text-lg font-bold">
            {translate["Demanda"]?.[language] ?? "Demanda"}:{" "}
            <span className="font-normal text-[#222222] ">
              {props.userDemand && props.userDemand.length > 35
                ? props.userDemand.slice(0, 35) + "..."
                : props.userDemand}
            </span>
          </p>
          <p className="mr-3 text-justify text-lg font-bold">
            E-mail:{" "}
            <span
              className="cursor-pointer font-normal text-[#222222] hover:underline"
              onClick={() => {
                copyEmailToClipboard();
              }}
            >
              {userInformations.email.length > 35
                ? userInformations.email.slice(0, 35) + "..."
                : userInformations.email}
            </span>
          </p>
          <p className="mr-3 text-lg font-bold">
            {translate["Departamento"]?.[language] ?? "Departamento"}:{" "}
            <span className="font-normal text-[#222222]">
              {userInformations.department}
            </span>
          </p>
          <p className="mr-3 text-justify text-lg font-bold">
            {translate["Seção"]?.[language] ?? "Seção"}:{" "}
            <span className="font-normal text-[#222222]">
              {userInformations.section.length > 35
                ? userInformations.section.slice(0, 35) + "..."
                : userInformations.section}
            </span>
          </p>
          <p className="mr-3 text-justify text-lg font-bold">
            {translate["Telefone"]?.[language] ?? "Telefone"}:{" "}
            <span
              className="cursor-pointer font-normal text-[#222222] hover:underline"
              onClick={() => {
                copyPhoneToClipboard();
              }}
            >
              {userInformations.phone}
            </span>
          </p>
        </div>
        <div className="mt-10 flex items-center justify-center">
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
            {translate["Fechar"]?.[language] ?? "Fechar"}
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
              ? translate["E-mail copiado para a área de transferência!"]?.[language]
              : translate["Telefone copiado para a área de transferência!"]?.[language]
          }
        />
      </Snackbar>
      <div className="flex h-20 items-center justify-between rounded-bl-sm rounded-br-sm border-l-2 border-l-[#d9d9d9] bg-blue-weg shadow-md">
        <p className="ml-5 cursor-default text-xl font-normal text-white ">
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
              {translate["Solicitante"]?.[language] ?? "Solicitante"}
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
              {translate["Analistas"]?.[language] ?? "Analistas"}
            </FilterChatAnalystButton>
          </Tooltip>
        </div>
        <React.Fragment key={"right"}>
          <Tooltip title={translate["Informações do usuário"]?.[language] ?? "Informações do usuário"}>
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
