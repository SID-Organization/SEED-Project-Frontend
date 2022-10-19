import React from "react";

import MuiDrawer from "@mui/material/Drawer";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { HomeOutlined } from "@mui/icons-material";
import Toolbar from "@mui/material/Toolbar";

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
}

const drawerWidth = 150;

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
  width: `calc(${theme.spacing(6)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(7)} + 1px)`
  }
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== "open"
})
(
  ({ theme, open }: any) => ({
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

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

const Sidebar = (props: SidebarProps) => {
  const theme = useTheme();

  const handleDrawerClose = () => {
    props.setIsSidebarOpen(false);
  };

  return (
    <div>
      <Drawer
        variant="permanent"
        open={props.isSidebarOpen}
        sx={{ "& .MuiPaper-root": { zIndex: -1 } }}
      >
        <Toolbar />
        <DrawerHeader>
          <div className="fixed flex align-middle">
          <IconButton onClick={handleDrawerClose} sx={{width: "100%", display: 'flex', justifyContent: 'space-around'}}>
            <p className="text-[16px] mr-[28px]">Home</p>
            <HomeOutlined/>
          </IconButton>
          </div>
        </DrawerHeader>
      </Drawer>
    </div>
  );
};

export default Sidebar;
