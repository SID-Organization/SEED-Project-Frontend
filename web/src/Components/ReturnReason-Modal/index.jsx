import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

// MUI
import { Box, Button, Modal, TextField } from "@mui/material";

// Service
import DemandService from "../../service/Demand-Service";

// Translation
import TranslationJSON from "../../API/Translate/components/returnReasonModal.json";
import TranslateUtils from "../../utils/Translate-Utils";

// Utils
import UserUtils from "../../utils/User-Utils";

const styleModalReasonOfDevolution = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 580,
  height: 405,
  bgcolor: "background.paper",
  borderTop: "8px solid #0075B1",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function ReturnReasonModal(props) {

  const [returnReason, setReturnReason] = useState(props.reasonOfReturn);

  useEffect(() => {
    setReturnReason(props.reasonOfReturn);
  }, [props.reasonOfReturn])


  const navigate = useNavigate();

  const translate = TranslationJSON;
  const language = TranslateUtils.getLanguage();

  const sendReturnOrCancel = () => {
    props.setIsReasonOfModalOpen(false);
    DemandService.returnOrCancel(
      props.demandId,
      returnReason,
      props.getIsDevolution(),
      UserUtils.getLoggedUserId()
    ).then((res) => console.warn("RESSS", res));
    setReturnReason("");
    navigate('/gerenciar-demandas');
  };

  return (
    <Modal
      open={props.isReasonOfModalOpen}
      onClose={() => props.setIsReasonOfModalOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleModalReasonOfDevolution}>
        <h1
          className="
            flex
            items-center
            justify-center
            font-roboto
            text-2xl
            font-bold
            text-[#0075B1]
          "
        >
          {translate[`Motivo da ${props.getIsDevolution() ? "devolução" : "recusação"}`][language]}
        </h1>
        <p
          className="
            mt-5
            flex
            gap-1
            font-roboto
            text-lg
            font-bold
            text-[#000000]
          "
        >
          {translate["Motivo"][language]}
          <span style={{ color: "#AD0D0D", fontWeight: 500 }}>*</span>
        </p>
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={4}
          variant="outlined"
          disabled={props.disabled}
          value={returnReason}
          onChange={(e) => setReturnReason(e.target.value)}
          sx={{
            width: 500,
            height: 100,
            mt: 2,
            mb: 5,
            borderRadius: 5,
            borderColor: "#0075B1"
          }}
        />
        {!props.disabled && (
          <span className="flex items-center justify-center gap-4">
            <Button
              onClick={sendReturnOrCancel}
              variant="contained"
              style={{
                backgroundColor: "#0075B1",
                color: "#FFFFFF",
                width: 100,
                marginTop: 20
              }}
            >
              {translate["Enviar"][language]}
            </Button>
          </span>
        )}
      </Box>
    </Modal>
  )
}