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
import UserUtils from "../../../utils/User-Utils";
import UserService from "../../../service/User-Service";

export default function ModalFirstLogin(props) {
  const [notShowAgain, setNotShowAgain] = useState(false);
  const [showJoyrider, setShowJoyrider] = useState(false);
  const [restartTutorial, setRestartTutorial] = useState(false);

  const getRestartTutorial = () => {
    return JSON.parse(localStorage.getItem('tutorial'));
  }

  useEffect(() => {
    setRestartTutorial(getRestartTutorial());
  }, [])


  const resetRestartTutorial = (value) => {
    localStorage.setItem('tutorial', value);
  }


  const updateStates = () => {
    setNotShowAgain(!notShowAgain);
  };

  const handleStartTutorial = () => {
    props.setFirstLogin(false);
    setShowJoyrider(true);
    props.setShowTutorial(true);
    setRestartTutorial(false);
  };

  const handleJoyrideCallback = (data, tourSteps) => {
    const { index, type } = data;

    if (type === "step:after" || index === tourSteps.length - 1) {
      console.log("Fim do tutorial")
      props.setShowTutorial(false);
      props.setFirstLogin(false);
      resetRestartTutorial(false);
      if(notShowAgain) {
        disableFirstAccess();
      }
    }
  };
  
  const handleCloseTutorial = () => {
    props.setFirstLogin(false);
    props.setShowTutorial(false);
    resetRestartTutorial(false);
    if(notShowAgain) {
      disableFirstAccess();
    }
  }

  const disableFirstAccess = () => {
    const userId = UserUtils.getLoggedUserId();
    UserService.disableUserFirstAccess(userId);
    UserUtils.disableFirstLogin();
  }

  return (
    <>
      <Dialog
        open={(props.firstLogin && !props.showTutorial) || restartTutorial}
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
