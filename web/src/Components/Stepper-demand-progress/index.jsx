import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useState, useEffect, useContext } from "react";

//Utils
import FontSizeUtils from "../../utils/FontSize-Utils";

//Translation
import TranslationJson from "../../API/Translate/components/stepperDemand.json";
import { TranslateContext } from "../../contexts/translate/index";

export default function HorizontalLinearStepper(props) {
  const translate = TranslationJson;
  const [language] = useContext(TranslateContext);

  const [skipped, setSkipped] = React.useState(new Set());

  const [fonts, setFonts] = useState(FontSizeUtils.getFontSizes());

  useEffect(() => {
    setFonts(FontSizeUtils.getFontSizes());
  }, [FontSizeUtils.getFontControl()]);

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleBack = () => {
    props.setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(props.activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    props.setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(props.activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    props.setActiveStep(0);
  };

  return (
    <Box sx={{ width: "50%" }}>
      <Stepper activeStep={props.activeStep}>
        {props.steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>
                <Typography style={{ fontSize: fonts.sm }}>{label}</Typography>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {props.activeStep === props.steps.length ? (
        <React.Fragment>
          <Typography style={{ fontSize: fonts.base }} sx={{ mt: 2, mb: 1 }}>
            {translate["Todos os passos foram completados!"]?.[language] ??
              "Todos os passos foram completados!"}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button style={{ fontSize: fonts.sm }} onClick={handleReset}>
              {translate["Resetar"]?.[language] ?? "Resetar"}
            </Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography style={{ fontSize: fonts.base }} sx={{ mt: 2, mb: 1 }}>
            {translate["Passo"]?.[language] ?? "Passo"} {props.activeStep + 1}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              style={{ fontSize: fonts.sm }}
              color="inherit"
              disabled={props.activeStep === 0}
              onClick={props.handleBack}
              sx={{ mr: 1 }}
            >
              {translate["Voltar"]?.[language] ?? "Voltar"}
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {isStepOptional(props.activeStep) && (
              <Button
                style={{ fontSize: fonts.sm }}
                color="inherit"
                onClick={handleSkip}
                sx={{ mr: 1 }}
              >
                {translate["Pular"]?.[language] ?? "Pular"}
              </Button>
            )}
            <Button
              style={{ fontSize: fonts.sm }}
              onClick={props.handleNext}
              disabled={props.title == 0}
            >
              {props.activeStep === props.steps.length - 1
                ? translate["Finalizar"]?.[language] ?? "Finalizar"
                : translate["Próximo"]?.[language] ?? "Próximo"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
