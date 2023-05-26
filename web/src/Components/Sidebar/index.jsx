import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";

// MUI
import AddBoxIcon from "@mui/icons-material/AddBox";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

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

import { Folder, FolderOutlined } from "@mui/icons-material";

import DescriptionIcon from "@mui/icons-material/Description";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

import MessageIcon from "@mui/icons-material/Message";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

// Components
import SidebarLink from "./SidebarItem";

// Utils
import UserUtils from "../../utils/User-Utils";

const openDrawerWidth = 230;


const openedMixin = (theme) => ({
  width: openDrawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
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
})(({ theme, open }) => ({
  width: openDrawerWidth,
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

export default function Sidebar() {

  const location = useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarFixed, setIsSidebarFixed] = useState(false);
  const [selectedPage, setSelectedPage] = useState(1);

  // Usuário logado
  const [user, setUser] = useState(UserUtils.getLoggedUser());

  const isRoleRequester = user.cargoUsuario === "SOLICITANTE";

  const iconStyle = { color: "#fff", fontSize: "1.9rem", marginLeft: 1.1 };
  const openSidebarIconStyle = { color: "#fff", fontSize: "1.4rem" };

  const sideBarItems = [
    {
      title: "Nova demanda",
      outlinedIcon: <AddBoxOutlinedIcon sx={iconStyle} />,
      fullIcon: <AddBoxIcon sx={iconStyle} />,
      linkTo: "/nova-demanda",
      hasDivider: true,
      isActiveToUser: true,
    },
    {
      title: "Minhas demandas",
      outlinedIcon: <HomeOutlinedIcon sx={iconStyle} />,
      fullIcon: <HomeIcon sx={iconStyle} />,
      linkTo: "/demandas",
      isActiveToUser: true,
    },
    {
      title: "Rascunhos",
      outlinedIcon: <NoteAltOutlinedIcon sx={iconStyle} />,
      fullIcon: <NoteAltIcon sx={iconStyle} />,
      linkTo: "/rascunhos",
      hasDivider: true,
      isActiveToUser: true,
    },
    {
      title: "Gerenciar demandas",
      outlinedIcon: <ManageAccountsOutlinedIcon sx={iconStyle} />,
      fullIcon: <ManageAccountsIcon sx={iconStyle} />,
      hasDivider: true,
      linkTo: "/gerenciar-demandas",
      isActiveToUser: !isRoleRequester,
    },
    {
      title: "Pautas",
      outlinedIcon: <CalendarMonthOutlinedIcon sx={iconStyle} />,
      fullIcon: <CalendarMonthIcon sx={iconStyle} />,
      linkTo: "/pautas",
      isActiveToUser: !isRoleRequester,
    },
    {
      title: "Atas",
      outlinedIcon: <ClassOutlinedIcon sx={iconStyle} />,
      fullIcon: <ClassIcon sx={iconStyle} />,
      linkTo: "/atas",
      isActiveToUser: !isRoleRequester,
    },
    {
      title: "Atas DG",
      outlinedIcon: <FolderOutlined sx={iconStyle} />,
      fullIcon: <Folder sx={iconStyle} />,
      linkTo: "/atas-dg",
      hasDivider: true,
      isActiveToUser: !isRoleRequester
    },
    {
      title: "Propostas",
      outlinedIcon: <DescriptionOutlinedIcon sx={iconStyle} />,
      fullIcon: <DescriptionIcon sx={iconStyle} />,
      linkTo: "/propostas",
      hasDivider: true,
      isActiveToUser: !isRoleRequester,
    },
    {
      title: "Chat",
      outlinedIcon: <MessageOutlinedIcon sx={iconStyle} />,
      fullIcon: <MessageIcon sx={iconStyle} />,
      linkTo: "/chat",
      isActiveToUser: true,
    },
    {
      title: "Sair",
      outlinedIcon: <LogoutRoundedIcon sx={iconStyle} />,
      fullIcon: <LogoutRoundedIcon sx={iconStyle} />,
      linkTo: "/login",
      isActiveToUser: true,
    },
  ];

  useEffect(() => {
    const index = sideBarItems.findIndex(item => item.linkTo == location.pathname);
    setSelectedPage(index);
  }, [location])


  const getSideBarItems = () => {
    return sideBarItems
      .filter(item => item.isActiveToUser)
      .map((item, index) => {
        return (
          <SidebarLink
            key={index}
            title={item.title}
            outlinedIcon={item.outlinedIcon}
            fullIcon={item.fullIcon}
            selected={selectedPage == index}
            setSelected={setSelectedPage}
            index={index}
            linkTo={item.linkTo}
            hasDivider={item.hasDivider}
          />
        )
      });
  };


  const handleDrawerToggle = () => {
    if (!isSidebarOpen && !isSidebarFixed) {
      setIsSidebarOpen(true);
    }

    if (isSidebarOpen && !isSidebarFixed) {
      setIsSidebarOpen(true);
    }

    if (isSidebarOpen && isSidebarFixed) {
      setIsSidebarOpen(false);
    }

    setIsSidebarFixed(!isSidebarFixed);
  };

  return (
    <div>
      <div
        onMouseEnter={() => setIsSidebarOpen(true)}
        className="fixed z-20 mt-14 h-[200%] w-1 text-[1px]"
      />
      <Drawer
        onMouseLeave={
          !isSidebarFixed ? () => setIsSidebarOpen(false) : () => { }
        }
        variant="permanent"
        open={isSidebarOpen}
        sx={{
          "& .MuiPaper-root": {
            zIndex: 10,
            backgroundColor: "#023A67",
            boxShadow: "1px 0px 7px 0px #838383",
          },
        }}
      >
        <Toolbar />
        <div
          className="flex items-center justify-end"
          onClick={() => handleDrawerToggle()}
        >
          <IconButton
            sx={{
              backgroundColor: "#002848",
              height: "20px",
              width: "20px",
            }}
          >
            {isSidebarFixed ? (
              <div className="flex items-center justify-center">
                <ChevronLeftIcon sx={openSidebarIconStyle} />
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <ChevronRightIcon sx={openSidebarIconStyle} />
              </div>
            )}
          </IconButton>
        </div>
        {getSideBarItems()}
      </Drawer>
    </div>
  );
}

