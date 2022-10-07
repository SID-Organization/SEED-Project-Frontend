import React, { useState } from "react";

import { Outlet } from "react-router";

import Header from "../Header";
import Sidebar from "../Sidebar";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  console.log(isSidebarOpen);

  const getPathHistory = () => {
    return (
<<<<<<< HEAD
      <div
        role="presentation"
        className="bg-breadcrumb-bg"
      >
=======
      <div role="presentation" className="bg-breadcrumb-bg">
>>>>>>> tryMergeCole
        <Breadcrumbs aria-label="breadcrumb">
          <div className="ml-3">
            <Link underline="hover" color="inherit" href="/">
              MUI
            </Link>
          </div>
          <Link
            underline="hover"
            color="inherit"
            href="/material-ui/getting-started/installation/"
          >
            Core
          </Link>
          <Typography color="text.primary">Breadcrumbs</Typography>
        </Breadcrumbs>
      </div>
<<<<<<< HEAD
    )
=======
    );
>>>>>>> tryMergeCole
  };

  return (
    <div>
      <Header
        setIsSidebarOpen={setIsSidebarOpen}
        isSidebarOpen={isSidebarOpen}
      />
      <div className="flex">
<<<<<<< HEAD
        <Sidebar isSidebarOpen={isSidebarOpen}  setIsSidebarOpen={setIsSidebarOpen}/>
=======
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
>>>>>>> tryMergeCole
        <div className="screen-content w-full h-full">
          {getPathHistory()}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
