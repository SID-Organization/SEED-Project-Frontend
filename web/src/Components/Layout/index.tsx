import React, { useState } from "react";

import { Outlet } from "react-router";

import Header from "../Header";
import Sidebar from "../Sidebar";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

export default function Layout() {
  const getPathHistory = () => {
    return (
      <div role="presentation" className="bg-breadcrumb-bg">
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
    );
  };

  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="screen-content w-full h-full mt-16">
          {getPathHistory()}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
