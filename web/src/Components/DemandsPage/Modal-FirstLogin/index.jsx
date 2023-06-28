import JoyriderTutorial from "../../Joyrider-tutorial";
import Checkbox from "@mui/material/Checkbox";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  FormControlLabel,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function ModalFirstLogin(props) {
  const [showAgain, setShowAgain] = useState(true);
  const [checkedButton, setCheckedButton] = useState(false);
  const [showJoyrider, setShowJoyrider] = useState(false);
  const [closeDialog, setCloseDialog] = useState(false);

  useEffect(() => {
    console.log("ShowAgain: ", showAgain);
  }, [showAgain]);

  const updateStates = () => {
    setShowAgain(!showAgain);
    setCheckedButton(!checkedButton);
    setCloseDialog(true);
  };

  const handleStartTutorial = () => {
    props.setFirstLogin(false);
    setShowJoyrider(true);
  };

  return (
    <>
      <Dialog
        open={props.firstLogin}
        sx={{
          "& .MuiDialog-paper": {
            borderLeft: "5px solid #023a67",
          },
        }}
      >
        <DialogTitle>Deseja fazer o tutorial do sistema?</DialogTitle>
        <DialogActions
          sx={{
            display: "flex",
            gap: "1rem",
          }}
        >
          <FormControlLabel
            label="Não mostrar novamente"
            labelPlacement="start"
            control={
              <Checkbox
                checked={checkedButton}
                onChange={updateStates}
                aria-label="asdasd"
              />
            }
          />
          <Button
            onClick={() => {
              props.setFirstLogin(false);
            }}
          >
            Não
          </Button>
          <Button onClick={handleStartTutorial}>Sim</Button>
        </DialogActions>
      </Dialog>
      {showJoyrider === true ? <JoyriderTutorial /> : console.log("Fidey")}
    </>
  );
}
