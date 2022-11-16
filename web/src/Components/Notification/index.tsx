import * as React from "react";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";

import { SnackbarContent } from "@mui/material";

export interface State extends SnackbarOrigin {
  open: boolean;
}

interface messageProps {
  message: string;
}

export default function PositionedSnackbar(props: messageProps) {
  const [state, setState] = React.useState<State>({
    open: true,
    vertical: "top",
    horizontal: "right",
  });
  const { vertical, horizontal, open } = state;



  const handleClose = () => {
    setState({ ...state, open: false });
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setState({ ...state, open: false });
    }
    , 1800);

    return () => clearTimeout(timer); 
  }, []);



  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
      >
      <SnackbarContent
          style={{
            backgroundColor: "#FFF",
            color: "#023A67",
            fontWeight: "bold",
          }}
          message={props.message}
        />
      </Snackbar>
    </>
  );
}
