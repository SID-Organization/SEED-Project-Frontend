import * as React from "react";
import Snackbar from "@mui/material/Snackbar";

import { Button, SnackbarContent } from "@mui/material";
import { Link } from "react-router-dom";

//Translation
import TranslationJson from "../../API/Translate/components/notification.json";
import TranslateUtils from "../../utils/Translate-Utils/index.js";

export default function Notification(props) {

  const translate = TranslationJson;
  let language = TranslateUtils.getLanguage();

  const [state, setState] = React.useState({
    open: true,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const action = (
    <Link to="/nova-demanda">
      <Button color="secondary" size="small">
        {translate["Criar demanda"][language] ?? "Criar demanda"}
      </Button>
    </Link>
  );

  if (props.action == true) {
    return (
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
      >
        <SnackbarContent
          style={{
            backgroundColor: "#FFF",
            color: "#023A67",
            fontWeight: "bold",
          }}
          message={props.message}
          action={action}
        />
      </Snackbar>
    );
  } else {
    return (
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
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
    );
  }
}
