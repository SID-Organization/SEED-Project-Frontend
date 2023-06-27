// React
import React, { useState } from "react";
import { Outlet } from "react-router";

// Context
import { TranslateContext } from "../../contexts/translate";

// Utils
import TranslateUtils from "../../utils/Translate-Utils";

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
