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

// Utils
import UserUtils from "../../../utils/User-Utils";

const styleChangeDemandImportance = {
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

export default function ChangeDemandStatus(props) {
  const userRole = UserUtils.getLoggedUserRole();

  return (
    <Modal
      open={props.isModalChangeDemandStatusOpen}
      onClose={props.handleCloseChangeDemandStatusModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleChangeDemandImportance}>
        <div className="grid items-center justify-center gap-14">
          <h1 className="text-lg font-semibold text-dark-blue-weg">
            {props.translate["Alterar status da demanda"][props.language]}
          </h1>
          <div className="flex items-center justify-center">
            <FormControl variant="standard">
              <Select
                value={props.demandStatus}
                // onChange={(e) => props.setDemandImportance(e.target.value)}
                sx={{
                  borderRadius: "4px",
                  border: "none",
                  width: "15rem",
                  backgroundColor: "transparent",
                }}
              >
                <MenuItem value={"PROPOSTA_EM_EXECUCAO"}>
                  <div className="ml-2 flex items-center justify-start gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#00ffff]" />
                    Proposta em execução
                  </div>
                </MenuItem>
                <MenuItem value={"PROPOSTA_EM_SUPORTE"}>
                  <div className="ml-2 flex items-center justify-start gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#4b0082]" />
                    Proposta em suporte
                  </div>
                </MenuItem>
                <MenuItem value={"PROPOSTA_FINALIZADA"}>
                  <div className="ml-2 flex items-center justify-start gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#228b22]" />
                    Proposta finalizada
                  </div>
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="flex items-center justify-center">
            <Button
              variant="contained"
              onClick={props.handlePutDemandStatus}
              sx={{
                backgroundColor: "#0075B1",
                color: "white",
                fontSize: "0.8rem",
                width: "5rem",
                height: "2rem",
                borderRadius: "4px",
                "&:hover": {
                  backgroundColor: "#0075B1",
                  color: "white",
                },
              }}
            >
              Aplicar
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
