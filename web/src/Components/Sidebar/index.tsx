import React from "react";

import MuiBox from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";

import MuiDivider from "@mui/material/Divider";

import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import AddBoxIcon from "@mui/icons-material/AddBox";

import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

import NoteAltIcon from "@mui/icons-material/NoteAlt";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";

import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";

import EventNoteIcon from "@mui/icons-material/EventNote";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";

import ClassIcon from "@mui/icons-material/Class";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";

import DescriptionIcon from "@mui/icons-material/Description";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

import MessageIcon from "@mui/icons-material/Message";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Tooltip } from "@mui/material";

const drawerWidth = 200;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }: any) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Sidebar = () => {
  const theme = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const handleDrawerClose = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [newDemandIcon, setNewDemandIcon] = React.useState(false);
  const [homeIcon, setHomeIcon] = React.useState(false);
  const [draftIcon, setDraftIcon] = React.useState(false);
  const [manageDemandIcon, setManageDemandIcon] = React.useState(false);
  const [pautasIcon, setPautasIcon] = React.useState(false);
  const [atasIcon, setAtasIcon] = React.useState(false);
  const [proposalsIcon, setProposalsIcon] = React.useState(false);
  const [messagesIcon, setMessagesIcon] = React.useState(false);

  const Box = styled(MuiBox)(({ theme }) => ({
    width: "100%",
    height: "100%",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    "&:hover": {
      backgroundColor: "#f5f5f529",
    },
  }));

  return (
    <div>
      <Drawer
        variant="permanent"
        open={isSidebarOpen}
        sx={{ "& .MuiPaper-root": { zIndex: 10, backgroundColor: "#023A67" } }}
      >
        <Toolbar />
        <div className="flex justify-end items-center">
          <IconButton onClick={() => handleDrawerClose()}>
            <ChevronRightIcon sx={{ color: "#fff", fontSize: "1.4rem" }} />
          </IconButton>
        </div>

        <div>
          <Tooltip title="Nova demanda" placement="right">
            <Box>
              <Link
                onClick={() => {
                  setNewDemandIcon(!newDemandIcon);
                }}
                sx={{
                  cursor: "pointer",
                  marginLeft: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                  color: "#fff",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  textDecoration: "none",
                  "&:hover": {
                    color: "#fff",
                    textDecoration: "none",
                  },
                }}
              >
                {newDemandIcon ? (
                  <AddBoxIcon
                    sx={{ color: "#fff", fontSize: "2rem", marginLeft: 1 }}
                  />
                ) : (
                  <AddBoxOutlinedIcon
                    sx={{ color: "#fff", fontSize: "2rem", marginLeft: 1 }}
                  />
                )}
                <div className="flex justify-end items-center ml-[1rem]">
                  <h1 className="text-white text-sm">Nova demanda</h1>
                </div>
              </Link>
            </Box>
          </Tooltip>
        </div>
        {/* Divisor heere */}
        <div>
          <Tooltip title="Minhas demandas" placement="right">
            <Box>
              <Link
                onClick={() => {
                  setHomeIcon(!homeIcon);
                }}
                sx={{
                  cursor: "pointer",
                  marginLeft: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                  color: "#fff",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  textDecoration: "none",
                  "&:hover": {
                    color: "#fff",
                    textDecoration: "none",
                  },
                }}
              >
                {homeIcon ? (
                  <HomeIcon
                    sx={{ color: "#fff", fontSize: "2rem", marginLeft: 1 }}
                  />
                ) : (
                  <HomeOutlinedIcon
                    sx={{ color: "#fff", fontSize: "2rem", marginLeft: 1 }}
                  />
                )}
                <div className="flex justify-end items-center ml-[1rem]">
                  <h1 className="text-white text-sm">Minhas demandas</h1>
                </div>
              </Link>
            </Box>
          </Tooltip>
        </div>
        <div>
          <Tooltip title="Rascunhos" placement="right">
            <Box>
              <Link
                onClick={() => {
                  setDraftIcon(!draftIcon);
                }}
                sx={{
                  cursor: "pointer",
                  marginLeft: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                  color: "#fff",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  textDecoration: "none",
                  "&:hover": {
                    color: "#fff",
                    textDecoration: "none",
                  },
                }}
              >
                {draftIcon ? (
                  <NoteAltIcon
                    sx={{ color: "#fff", fontSize: "2rem", marginLeft: 1 }}
                  />
                ) : (
                  <NoteAltOutlinedIcon
                    sx={{ color: "#fff", fontSize: "2rem", marginLeft: 1 }}
                  />
                )}
                <div className="flex justify-end items-center ml-[1rem]">
                  <h1 className="text-white text-sm">Rascunhos</h1>
                </div>
              </Link>
            </Box>
          </Tooltip>
        </div>
        {/* Divisor here */}
        <div>
          <Tooltip title="Gerenciar demandas" placement="right">
            <Box>
              <Link
                onClick={() => {
                  setManageDemandIcon(!manageDemandIcon);
                }}
                sx={{
                  cursor: "pointer",
                  marginLeft: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                  color: "#fff",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  textDecoration: "none",
                  "&:hover": {
                    color: "#fff",
                    textDecoration: "none",
                  },
                }}
              >
                {manageDemandIcon ? (
                  <ManageAccountsIcon
                    sx={{ color: "#fff", fontSize: "2rem", marginLeft: 1 }}
                  />
                ) : (
                  <ManageAccountsOutlinedIcon
                    sx={{ color: "#fff", fontSize: "2rem", marginLeft: 1 }}
                  />
                )}
                <div className="flex justify-end items-center ml-[1rem]">
                  <h1 className="text-white text-sm">Gerenciar demandas</h1>
                </div>
              </Link>
            </Box>
          </Tooltip>
        </div>
        {/* Divisor here */}
        <div>
          <Tooltip title="Pautas" placement="right">
            <Box>
              <Link
                onClick={() => {
                  setPautasIcon(!pautasIcon);
                }}
                sx={{
                  cursor: "pointer",
                  marginLeft: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                  color: "#fff",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  textDecoration: "none",
                  "&:hover": {
                    color: "#fff",
                    textDecoration: "none",
                  },
                }}
              >
                {pautasIcon ? (
                  <EventNoteIcon
                    sx={{ color: "#fff", fontSize: "2rem", marginLeft: 1 }}
                  />
                ) : (
                  <EventNoteOutlinedIcon
                    sx={{ color: "#fff", fontSize: "2rem", marginLeft: 1 }}
                  />
                )}
                <div className="flex justify-end items-center ml-[1rem]">
                  <h1 className="text-white text-sm">Pautas</h1>
                </div>
              </Link>
            </Box>
          </Tooltip>
        </div>
        <div>
          <Tooltip title="Atas" placement="right">
            <Box>
              <Link
                onClick={() => {
                  setAtasIcon(!atasIcon);
                }}
                sx={{
                  cursor: "pointer",
                  marginLeft: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                  color: "#fff",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  textDecoration: "none",
                  "&:hover": {
                    color: "#fff",
                    textDecoration: "none",
                  },
                }}
              >
                {atasIcon ? (
                  <ClassIcon
                    sx={{ color: "#fff", fontSize: "2rem", marginLeft: 1 }}
                  />
                ) : (
                  <ClassOutlinedIcon
                    sx={{ color: "#fff", fontSize: "2rem", marginLeft: 1 }}
                  />
                )}
                <div className="flex justify-end items-center ml-[1rem]">
                  <h1 className="text-white text-sm">Atas registradas</h1>
                </div>
              </Link>
            </Box>
          </Tooltip>
        </div>
        {/* Divisor here */}
        <div>
          <Tooltip title="Propostas" placement="right">
            <Box>
              <Link
                onClick={() => {
                  setProposalsIcon(!proposalsIcon);
                }}
                sx={{
                  cursor: "pointer",
                  marginLeft: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                  color: "#fff",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  textDecoration: "none",
                  "&:hover": {
                    color: "#fff",
                    textDecoration: "none",
                  },
                }}
              >
                {proposalsIcon ? (
                  <DescriptionIcon
                    sx={{ color: "#fff", fontSize: "2rem", marginLeft: 1 }}
                  />
                ) : (
                  <DescriptionOutlinedIcon
                    sx={{ color: "#fff", fontSize: "2rem", marginLeft: 1 }}
                  />
                )}
                <div className="flex justify-end items-center ml-[1rem]">
                  <h1 className="text-white text-sm">Propostas</h1>
                </div>
              </Link>
            </Box>
          </Tooltip>
        </div>
        {/* Divisor here */}
        <div>
          <Tooltip title="Conversas" placement="right">
            <Box>
              <Link
                onClick={() => {
                  setMessagesIcon(!messagesIcon);
                }}
                sx={{
                  cursor: "pointer",
                  marginLeft: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                  color: "#fff",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  textDecoration: "none",
                  "&:hover": {
                    color: "#fff",
                    textDecoration: "none",
                  },
                }}
              >
                {messagesIcon ? (
                  <MessageIcon
                    sx={{ color: "#fff", fontSize: "2rem", marginLeft: 1 }}
                  />
                ) : (
                  <MessageOutlinedIcon
                    sx={{ color: "#fff", fontSize: "2rem", marginLeft: 1 }}
                  />
                )}
                <div className="flex justify-end items-center ml-[1rem]">
                  <h1 className="text-white text-sm">Mensagens</h1>
                </div>
              </Link>
            </Box>
          </Tooltip>
        </div>
      </Drawer>
    </div>
  );
};

export default Sidebar;
