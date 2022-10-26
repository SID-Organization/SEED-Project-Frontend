import React from "react";

import MuiBox from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { HomeOutlined } from "@mui/icons-material";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";

import MuiDivider from "@mui/material/Divider";

import SidebarItem from "../SiderbarItem";

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

const drawerWidth = 245;

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

        
        <SidebarItem title="Nova demanda"
        outlinedIcon={<AddBoxOutlinedIcon sx={{ color: "#fff", fontSize: "2rem", marginLeft: 1 }}/>}
        fullIcon={<AddBoxIcon sx={{ color: "#fff", fontSize: "2rem", marginLeft: 1 }}/>}
        hasDivider={true}/>
        
        <SidebarItem title="Minhas demandas"
        outlinedIcon={<HomeOutlinedIcon sx={{ color: "#fff", fontSize: "2rem", marginLeft: 1 }}/>}
        fullIcon={<HomeIcon sx={{ color: "#fff", fontSize: "2rem", marginLeft: 1 }}/>}
        />

        <SidebarItem title="Rascunhos"
        outlinedIcon={<NoteAltOutlinedIcon sx={{ color: "#fff", fontSize: "2rem", marginLeft: 1 }}/>}
        fullIcon={<NoteAltIcon sx={{ color: "#fff", fontSize: "2rem", marginLeft: 1 }}/>}
        hasDivider={true}
        />

        <SidebarItem title="Gerenciar demandas"
        outlinedIcon={<ManageAccountsOutlinedIcon sx={{ color: "#fff", fontSize: "2rem", marginLeft: 1 }}/>}
        fullIcon={<ManageAccountsIcon sx={{ color: "#fff", fontSize: "2rem", marginLeft: 1 }}/>}
        hasDivider={true}
        />

        <SidebarItem title="Pautas"
        outlinedIcon={<EventNoteOutlinedIcon sx={{ color: "#fff", fontSize: "2rem", marginLeft: 1 }}/>}
        fullIcon={<EventNoteIcon sx={{ color: "#fff", fontSize: "2rem", marginLeft: 1 }}/>}
        />

        <SidebarItem title="Atas  "
        outlinedIcon={<ClassOutlinedIcon sx={{ color: "#fff", fontSize: "2rem", marginLeft: 1 }}/>}
        fullIcon={<ClassIcon sx={{ color: "#fff", fontSize: "2rem", marginLeft: 1 }}/>}
        hasDivider={true}
        />

        <SidebarItem title="Propostas"
        fullIcon={<DescriptionIcon sx={{ color: "#fff", fontSize: "2rem", marginLeft: 1 }}/>}
        outlinedIcon={<DescriptionOutlinedIcon sx={{ color: "#fff", fontSize: "2rem", marginLeft: 1 }}/>}
        hasDivider={true}
        />

        <SidebarItem title="Mensagens"
        outlinedIcon={<MessageOutlinedIcon sx={{ color: "#fff", fontSize: "2rem", marginLeft: 1 }}/>}
        fullIcon={<MessageIcon sx={{ color: "#fff", fontSize: "2rem", marginLeft: 1 }}/>}
        />

      </Drawer>
    </div>
  );
};

export default Sidebar;
