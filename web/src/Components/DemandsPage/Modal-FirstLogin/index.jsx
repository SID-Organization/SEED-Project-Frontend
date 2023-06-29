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

  useEffect(() => {
    console.log("ShowAgain: ", showAgain);
  }, [showAgain]);

  const updateStates = () => {
    setShowAgain(!showAgain);
    setCheckedButton(!checkedButton);
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
    }
  };

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
      {showJoyrider ? (
        <JoyriderTutorial handleJoyrideCallback={handleJoyrideCallback} />
      ) : (
        console.log("Fidey")
      )}
    </>
  );
}
