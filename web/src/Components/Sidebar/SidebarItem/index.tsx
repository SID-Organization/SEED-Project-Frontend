import MuiDivider from "@mui/material/Divider";

import { Tooltip } from "@mui/material";

import MuiBox from "@mui/material/Box";
import MuiButton from "@mui/material/Button";

import { styled } from "@mui/material/styles";

import React, { useState } from "react";

import { Link } from "react-router-dom";

interface SidebarItemProps {
  title: string;
  outlinedIcon: JSX.Element;
  fullIcon: JSX.Element;
  selected?: boolean;
  hasDivider?: boolean;
  linkTo: string;
}

export default function SidebarLink(props: SidebarItemProps) {
  const [isSectionSelected, setIsSectionSelected] = useState(false);

  const Box = styled(MuiBox)(() => ({
    width: "100%",
    height: "100%",
    paddingTop: "0.8rem",
    paddingBottom: "0.8rem",
    "&:hover": {
      backgroundColor: "#f5f5f529"
    },
    cursor: "pointer",
    paddingLeft: "0.5rem",
    display: "flex"
  }));

  const Divider = styled(MuiDivider)(() => ({
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    borderStyle: "dashed",
    borderColor: "#fff"
  }));

  const icon = props.selected ? props.fullIcon : props.outlinedIcon;

  return (
    <div>
      <div className={`mt-1 ${props.hasDivider ? "mb-1" : ""}`}>
        <Tooltip title={props.title} placement="right">
          <Link to={props.linkTo} style={{ width: "100%" }}>
            <Box
              onClick={() => {
                setIsSectionSelected(true);
              }}
            >
              <React.Fragment>
                {icon}
                <div className="flex justify-end items-center ml-[1.1rem]">
                  <h1 className="text-white text-usual font-sans">
                    {props.title}
                  </h1>
                </div>
              </React.Fragment>
            </Box>
          </Link>
        </Tooltip>
      </div>
      {props.hasDivider && <Divider />}
    </div>
  );
}
