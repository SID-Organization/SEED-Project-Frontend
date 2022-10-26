import MuiDivider from "@mui/material/Divider";

import { Tooltip } from "@mui/material";

import MuiBox from "@mui/material/Box";

import Link from "@mui/material/Link";

import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import AddBoxIcon from "@mui/icons-material/AddBox";

import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

import NoteAltIcon from "@mui/icons-material/NoteAlt";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";

import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";

import EventNoteIcon from "@mui/icons-material/EventNote";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

import ClassIcon from "@mui/icons-material/Class";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";

import DescriptionIcon from "@mui/icons-material/Description";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

import MessageIcon from "@mui/icons-material/Message";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";

import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";

import { useState } from "react";

export default function SidebarItem() {
  const [newDemandIcon, setNewDemandIcon] = useState(false);
  const [homeIcon, setHomeIcon] = useState(false);
  const [draftIcon, setDraftIcon] = useState(false);
  const [manageDemandIcon, setManageDemandIcon] = useState(false);
  const [pautasIcon, setPautasIcon] = useState(false);
  const [atasIcon, setAtasIcon] = useState(false);
  const [proposalsIcon, setProposalsIcon] = useState(false);
  const [messagesIcon, setMessagesIcon] = useState(false);

  const Box = styled(MuiBox)(({ theme }) => ({
    width: "100%",
    height: "100%",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    "&:hover": {
      backgroundColor: "#f5f5f529",
    },
  }));

  return (
    <div>
      <Tooltip title="Minhas demandas" placement="right">
        <Box>
          <Link
            onClick={() => {
              setHomeIcon(!homeIcon);
            }}
            sx={{
              cursor: "pointer",
              marginLeft: "0.5rem",
              display: "flex",
              alignItems: "center",
              color: "#fff",
              fontSize: "1.2rem",
              fontWeight: "bold",
              textDecoration: "none",
              "&:hover": {
                color: "#fff",
                textDecoration: "none",
              },
            }}
          >
            {homeIcon ? (
              <HomeIcon
                sx={{ color: "#fff", fontSize: "2rem", marginLeft: 1 }}
              />
            ) : (
              <HomeOutlinedIcon
                sx={{ color: "#fff", fontSize: "2rem", marginLeft: 1 }}
              />
            )}
            <div className="flex justify-end items-center ml-[1rem]">
              <h1 className="text-white text-sm">Minhas demandas</h1>
            </div>
          </Link>
        </Box>
      </Tooltip>
    </div>
  );
}
