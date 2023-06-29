// React
import React from "react";
import { Outlet } from "react-router";

// Components
import Header from "../Header";
import Sidebar from "../Sidebar";
import PathHistory from "../Path-history";

export default function Layout() {
  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="screen-content mt-14 h-full w-full">
          <PathHistory />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
