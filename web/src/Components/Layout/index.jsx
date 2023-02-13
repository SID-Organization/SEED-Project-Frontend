import React, { useState } from "react";

import { Outlet } from "react-router";

import Header from "../Header";
import Sidebar from "../Sidebar";
import PathHistory from "../Path-history";

export default function Layout() {
  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="screen-content w-full h-full mt-14">
          <PathHistory />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
