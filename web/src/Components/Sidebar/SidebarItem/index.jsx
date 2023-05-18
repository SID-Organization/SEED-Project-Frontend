import React, { useEffect } from "react";
import { Link } from "react-router-dom";

// MUI
import MuiBox from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import MuiDivider from "@mui/material/Divider";
import { Tooltip } from "@mui/material";
import { useState } from "react";


const Box = styled(MuiBox)(() => ({
  width: "100%",
  height: "100%",
  paddingTop: "0.8rem",
  paddingBottom: "0.8rem",
  "&:hover": {
    backgroundColor: "#f5f5f529",
  },
  cursor: "pointer",
  paddingLeft: "0.5rem",
  display: "flex",
}));

const Divider = styled(MuiDivider)(() => ({
  width: "90%",
  marginLeft: "auto",
  marginRight: "auto",
  borderStyle: "dashed",
  borderColor: "#fff",
}));

export default function SidebarLink(props) {

  const [icon, setIcon] = useState();

  useEffect(() => {
    setIcon(props.selected ? props.fullIcon : props.outlinedIcon)
  }, [props.selected])

  const pageSelected = () => {
    props.setSelected(props.index)
  }

  return (
    <div>
      <div className={`mt-1 ${props.hasDivider ? "mb-1" : ""}`}>
        <Tooltip title={props.title} placement="right">
          <Link to={props.linkTo} onClick={() => {
            if (props.title === "Sair") {
              localStorage.clear();
              window.location.reload();
            }
          }} style={{ width: "100%" }}>
            <Box onClick={pageSelected}>
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
