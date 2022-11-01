import MuiDivider from "@mui/material/Divider";

import { SvgIconTypeMap, Tooltip } from "@mui/material";

import MuiBox from "@mui/material/Box";

import MuiLink from "@mui/material/Link";

import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";

import { useState } from "react";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { BorderTop } from "@mui/icons-material";

import { Link } from "react-router-dom";

interface SidebarItemProps {
  title: string;
  outlinedIcon: any;
  fullIcon: any;
  selected?: boolean;
  hasDivider?: boolean;
  linkTo: string;
}

export default function SidebarLink(props: SidebarItemProps) {
  const [isSectionSelected, setIsSectionSelected] = useState(false);

  const Box = styled(MuiBox)(() => ({
    width: "100%",
    height: "100%",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    "&:hover": {
      backgroundColor: "#f5f5f529",
    },
  }));

  const Divider = styled(MuiDivider)(() => ({
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    borderStyle: "dashed",
    borderColor: "#fff",
  }));

  const icon = props.selected ? props.fullIcon : props.outlinedIcon;

  return (
    <div>
      <div className={`mt-2 ${props.hasDivider ? "mb-2" : "mb-1"}`}>
        <Tooltip title={props.title} placement="right">
          <Link to={props.linkTo}>
            <Box>
              <MuiLink
                onClick={() => {
                  setIsSectionSelected(true);
                }}
                sx={{
                  cursor: "pointer",
                  marginLeft: "0.5rem",
                  display: "flex",
                  textDecoration: "none",
                  "&:hover": {
                    color: "#fff",
                  },
                }}
              >
                <>
                  {icon}
                  <div className="flex justify-end items-center ml-[1rem]">
                    <h1 className="text-white text-sm font-sans">
                      {props.title}
                    </h1>
                  </div>
                </>
              </MuiLink>
            </Box>
          </Link>
        </Tooltip>
      </div>
      {props.hasDivider && <Divider />}
    </div>
  );
}
