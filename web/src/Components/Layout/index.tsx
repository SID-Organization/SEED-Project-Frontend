import React, { useState } from "react";

import { Outlet } from "react-router";

import Header from "../Header";
import Sidebar from "../Sidebar";
import PathHistory from "../PathHistory";

export default function Layout() {
  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="screen-content w-full h-full mt-16">
          <PathHistory />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
