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
  const [notShowAgain, setNotShowAgain] = useState(false);
  const [showJoyrider, setShowJoyrider] = useState(false);

  const updateStates = () => {
    setNotShowAgain(!notShowAgain);
  };

  const handleStartTutorial = () => {
    props.setFirstLogin(false);
    setShowJoyrider(true);
    props.setShowTutorial(true);
  };

  const handleJoyrideCallback = (data, tourSteps) => {
    const { index, type } = data;

    if (type === "step:after" && index === tourSteps.length - 1) {
      props.setShowTutorial(false);
      props.setFirstLogin(false);
      console.log("Fim do tutorial")
    }
  };
  
  const handleCloseTutorial = () => {
    console.log("Fim do tutorial close")
    props.setFirstLogin(false);
    props.setShowTutorial(false);
  }

  return (
    <>
      <Dialog
        open={props.firstLogin && !props.showTutorial}
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
                checked={notShowAgain}
                onChange={updateStates}
                aria-label="asdasd"
              />
            }
          />
          <Button
            onClick={() => handleCloseTutorial()}
          >
            Não
          </Button>
          <Button onClick={handleStartTutorial}>Sim</Button>
        </DialogActions>
      </Dialog>
      {showJoyrider && (
        <JoyriderTutorial handleJoyrideCallback={handleJoyrideCallback} />
      )}
    </>
  );
}
