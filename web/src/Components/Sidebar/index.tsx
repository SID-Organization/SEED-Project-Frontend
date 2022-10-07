import React from "react";

import { Box } from "@mui/material"
import MuiDrawer from "@mui/material/Drawer";
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
}

const drawerWidth = 200;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open } : any) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Sidebar = (props: SidebarProps) => {

  const theme = useTheme();

  const handleDrawerClose = () => {
    props.setIsSidebarOpen(false);
  };

  return (
    <div>
      <Drawer variant="permanent" open={props.isSidebarOpen} sx={{'& .MuiPaper-root': {zIndex: -1}}}>
        <Toolbar />
        <DrawerHeader >
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? '<ChevronRightIcon />' : '<ChevronLeftIcon />'}
          </IconButton>
        </DrawerHeader>
      </Drawer>
    </div>
  );
};

export default Sidebar;
