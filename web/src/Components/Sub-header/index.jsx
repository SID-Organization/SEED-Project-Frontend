import { useEffect } from "react";
import { useState } from "react";
import "../../styles/index.css";

// MUI
import GridOnIcon from "@mui/icons-material/GridOn";
import ListAltIcon from "@mui/icons-material/ListAlt";

// Translation
import TranslationJSON from "../../API/Translate/components/subHeader.json";
import TranslateUtils from "../../utils/Translate-Utils";

// Components
import Search from "../Search";

// Subheader de todo o sistema
export default function subHeader(props) {
  const translate = TranslationJSON;
  const childrenText = TranslateUtils.getChildrenText(props.children);
  const language = TranslateUtils.getLanguage();

  return (
    <div className="mb-10">
      <div className="flex h-[5rem] items-center shadow-page-title-shadow">
        <div className="flex-[2] text-center">
          <h1 className="font-roboto text-3xl font-bold text-dark-blue-weg">
            {translate[childrenText][language]}
          </h1>
        </div>
        <div className="flex flex-[1] justify-around gap-10">
          <div className="flex flex-1 items-center justify-end">
            <Search setFilters={props.setFilters} />
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div
              className="cursor-pointer"
              onClick={() => props.setIsListFormat(!props.isListFormat)}
            >
              {props.isListFormat ? (
                <GridOnIcon
                  sx={{
                    fontSize: "30px",
                    color: "#0075B1",
                  }}
                />
              ) : (
                <ListAltIcon
                  sx={{
                    fontSize: "30px",
                    color: "#0075B1",
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
