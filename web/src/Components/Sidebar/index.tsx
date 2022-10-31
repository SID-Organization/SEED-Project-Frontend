import React, { useEffect, useState } from "react";

import MuiBox from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { HomeOutlined } from "@mui/icons-material";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";

import MuiDivider from "@mui/material/Divider";

import SidebarLink from "../SidebarLink";

import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import AddBoxIcon from "@mui/icons-material/AddBox";

import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

import NoteAltIcon from "@mui/icons-material/NoteAlt";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";

import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

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
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: "hidden"
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== "open"
})(({ theme, open }: any) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme)
  },
  ...!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme)
  }
}));

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarFixed, setIsSidebarFixed] = useState(false);

  useEffect(() => {}, [isSidebarFixed, isSidebarOpen]);

  const handleDrawerToggle = () => {
    setIsSidebarFixed(!isSidebarFixed);
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex items-center">
      <div
        onMouseEnter={() => setIsSidebarOpen(true)}
        className="z-20 h-full text-[1px]"
      >
        .
      </div>
      <Drawer
        onMouseLeave={
          !isSidebarFixed ? () => setIsSidebarOpen(false) : () => {}
        }
        variant="permanent"
        open={isSidebarOpen}
        sx={{ "& .MuiPaper-root": { zIndex: 10, backgroundColor: "#023A67" } }}
      >
        <Toolbar />
        <div
          className="flex justify-end items-center"
          onClick={() => handleDrawerToggle()}
        >
          <IconButton
            sx={{
              backgroundColor: "#002848",
              height: "20px",
              width: "20px"
            }}
          >
            {isSidebarOpen
              ? <div className="flex justify-center items-center">
                  <ChevronLeftIcon sx={{ color: "#fff", fontSize: "1.4rem" }} />
                </div>
              : <div className="flex justify-center items-center">
                  <ChevronRightIcon
                    sx={{ color: "#fff", fontSize: "1.4rem" }}
                  />
                </div>}
          </IconButton>
        </div>
        <SidebarLink
          title="Nova demanda"
          outlinedIcon={
            <AddBoxOutlinedIcon
              sx={{ color: "#fff", fontSize: "2rem", marginLeft: 1 }}
            />
          }
          fullIcon={
            <AddBoxIcon
              sx={{ color: "#fff", fontSize: "2rem", marginLeft: 1 }}
            />
          }
          hasDivider={true}
          linkTo="/nova-demanda"
        />
        <SidebarLink
          title="Minhas demandas"
          outlinedIcon={
            <HomeOutlinedIcon
              sx={{ color: "#fff", fontSize: "2rem", marginLeft: 1 }}
            />
          }
          fullIcon={
            <HomeIcon sx={{ color: "#fff", fontSize: "2rem", marginLeft: 1 }} />
          }
          linkTo="/minhas-demandas"
        />
        <SidebarLink
          title="Rascunhos"
          outlinedIcon={
            <NoteAltOutlinedIcon
              sx={{ color: "#fff", fontSize: "2rem", marginLeft: 1 }}
            />
          }
          fullIcon={
            <NoteAltIcon
              sx={{ color: "#fff", fontSize: "2rem", marginLeft: 1 }}
            />
          }
          hasDivider={true}
          linkTo="/rascunhos"
        />
        <SidebarLink
          title="Gerenciar demandas"
          outlinedIcon={
            <ManageAccountsOutlinedIcon
              sx={{ color: "#fff", fontSize: "2rem", marginLeft: 1 }}
            />
          }
          fullIcon={
            <ManageAccountsIcon
              sx={{ color: "#fff", fontSize: "2rem", marginLeft: 1 }}
            />
          }
          hasDivider={true}
          linkTo="/gerenciar-demandas"
        />
        <SidebarLink
          title="Pautas"
          outlinedIcon={
            <CalendarMonthOutlinedIcon
              sx={{ color: "#fff", fontSize: "2rem", marginLeft: 1 }}
            />
          }
          fullIcon={
            <CalendarMonthIcon
              sx={{ color: "#fff", fontSize: "2rem", marginLeft: 1 }}
            />
          }
          linkTo="/pautas"
        />
        <SidebarLink
          title="Atas  "
          outlinedIcon={
            <ClassOutlinedIcon
              sx={{ color: "#fff", fontSize: "2rem", marginLeft: 1 }}
            />
          }
          fullIcon={
            <ClassIcon
              sx={{ color: "#fff", fontSize: "2rem", marginLeft: 1 }}
            />
          }
          hasDivider={true}
          linkTo="/atas"
        />
        <SidebarLink
          title="Propostas"
          fullIcon={
            <DescriptionIcon
              sx={{ color: "#fff", fontSize: "2rem", marginLeft: 1 }}
            />
          }
          outlinedIcon={
            <DescriptionOutlinedIcon
              sx={{ color: "#fff", fontSize: "2rem", marginLeft: 1 }}
            />
          }
          hasDivider={true}
          linkTo="/propostas"
        />
        <SidebarLink
          title="Mensagens"
          outlinedIcon={
            <MessageOutlinedIcon
              sx={{ color: "#fff", fontSize: "2rem", marginLeft: 1 }}
            />
          }
          fullIcon={
            <MessageIcon
              sx={{ color: "#fff", fontSize: "2rem", marginLeft: 1 }}
            />
          }
          linkTo="/mensagens"
        />
      </Drawer>
    </div>
  );
};

export default Sidebar;
