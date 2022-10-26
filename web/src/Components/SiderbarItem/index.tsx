import MuiDivider from "@mui/material/Divider";

import { SvgIconTypeMap, Tooltip } from "@mui/material";

import MuiBox from "@mui/material/Box";

import Link from "@mui/material/Link";

import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";

import { useState } from "react";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { BorderTop } from "@mui/icons-material";

interface SidebarItemProps {
  title: string;
  outlinedIcon: any;
  fullIcon: any;
  selected?: boolean;
  hasDivider?: boolean;
  onClick?: () => void;
}

export default function SidebarItem(props: SidebarItemProps) {
  const [isSectionSelected, setIsSectionSelected] = useState(false);

  const Box = styled(MuiBox)(() => ({
    width: "100%",
    height: "100%",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    "&:hover": {
      backgroundColor: "#f5f5f529"
    }
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
      <div className={`mt-2 ${props.hasDivider ? 'mb-2' : 'mb-1'}`}>
        <Tooltip title={props.title} placement="right">
          <Box>
            <Link
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
                }
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
            </Link>
          </Box>
        </Tooltip>
      </div>
      {props.hasDivider && <Divider />}
    </div>
  );
}
