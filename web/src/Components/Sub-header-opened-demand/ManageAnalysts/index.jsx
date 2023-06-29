// MUI
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Modal,
  Select,
} from "@mui/material";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import FontSizeUtils from "../../../utils/FontSize-Utils";
import { useEffect, useState } from "react";

const styleModalManageAnalysts = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "23rem",
  height: "15rem",
  backgroundColor: "#fff",
  boxShadow: 0,
  borderRadius: 2,
  borderLeft: "5px solid #023A67",
};

export default function ManageAnalysts(props) {
  const [fonts, setFonts] = useState(FontSizeUtils.getFontSizes());

  useEffect(() => {
    setFonts(FontSizeUtils.getFontSizes());
  }, [FontSizeUtils.getFontControl()]);

  console.log("RECEBENDOOO: ", props.demand.analistaResponsavelDemanda);

  return (
    <Modal
      open={props.isAnalystsModalOpen}
      onClose={props.handleCloseManageAnalysts}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleModalManageAnalysts}>Gerenciar analistas</Box>
    </Modal>
  );
}
