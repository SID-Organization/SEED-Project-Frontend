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

  const [language, setLanguage] = useState(TranslateUtils.getLanguage());

  const updateLanguage = (languageCode) => {
    TranslateUtils.setLanguage(languageCode);
    setLanguage(languageCode);
  }

  return (
    <TranslateContext.Provider value={[language, updateLanguage]}>
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
    </TranslateContext.Provider>
  );
}
