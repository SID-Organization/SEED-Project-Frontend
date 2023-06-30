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

//IMGS
import Minor from "../../../assets/demand-importance-icons/Minor.png";
import Major from "../../../assets/demand-importance-icons/Major.png";
import Critical from "../../../assets/demand-importance-icons/Critical.png";

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

export default function ChangeImportance(props) {
  const userRole = UserUtils.getLoggedUserRole();

  return (
    <Modal
      open={props.isImportanceModalOpen}
      onClose={props.handleCloseChangeDemandImportanceModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleChangeDemandImportance}>
        <div className="grid items-center justify-center gap-14">
          <h1
            style={{ fontSize: props.fonts.lg }}
            className="font-semibold text-dark-blue-weg"
          >
            {props.translate["Alterar importância da demanda"][props.language]}
          </h1>
          <div className="flex items-center justify-center">
            <FormControl variant="standard">
              <Select
                value={props.demandImportance}
                onChange={(e) => props.setDemandImportance(e.target.value)}
                sx={{
                  borderRadius: "4px",
                  border: "none",
                  width: "10rem",
                  backgroundColor: "transparent",
                }}
              >
                <MenuItem value={"TRIVIAL"}>
                  <div className="flex w-full items-center justify-between font-bold">
                    <div className="flex items-center">
                      <div className="mr-2 h-[0.7rem] w-[0.7rem] rounded-full border-[1px] border-black" />
                      <p>Trivial</p>
                    </div>
                    <p className="text-[10px]">*1</p>
                  </div>
                </MenuItem>
                <MenuItem value={"MINOR"}>
                  <div className="flex w-full items-center justify-between font-bold">
                    <div className="flex items-center">
                      <img
                        src={Minor}
                        alt="minorimg"
                        className="mr-2 h-4 w-4"
                        draggable="false"
                      />
                      <p>Minor</p>
                    </div>
                    <p className="text-[10px]">*2</p>
                  </div>
                </MenuItem>
                <MenuItem value={"MAJOR"} disabled={userRole == "ANALISTA"}>
                  <div className="flex w-full items-center justify-between font-bold">
                    <div className="flex items-center">
                      <img
                        src={Major}
                        alt="majorimg"
                        className="mr-2 h-4 w-4"
                        draggable="false"
                      />
                      <p>Major</p>
                    </div>
                    <p className="text-[10px]">*4</p>
                  </div>
                </MenuItem>
                <MenuItem
                  value={"CRITICAL"}
                  disabled={userRole == "ANALISTA" || userRole == "GERENTE"}
                >
                  <div className="flex w-full items-center justify-between font-bold">
                    <div className="flex items-center">
                      <img
                        src={Critical}
                        alt="criticalimg"
                        className="mr-2 h-[1.6rem] w-4"
                        draggable="false"
                      />
                      <p>Critical</p>
                    </div>
                    <p className="text-[10px]">*16</p>
                  </div>
                </MenuItem>
                <MenuItem
                  value={"BLOCKER"}
                  disabled={userRole == "ANALISTA" || userRole == "GERENTE"}
                >
                  <div className="flex w-full items-center justify-between font-bold">
                    <div className="flex items-center">
                      <RemoveCircleRoundedIcon
                        sx={{
                          color: "#b55154",
                          fontSize: "1.3rem",
                          marginRight: "6px",
                          marginLeft: "-2px",
                        }}
                      />
                      <p>Blocker</p>
                    </div>
                    <p className="text-[10px]">+100K</p>
                  </div>
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="flex items-center justify-center">
            <Button
              variant="contained"
              onClick={props.handlePutDemandImportance}
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
