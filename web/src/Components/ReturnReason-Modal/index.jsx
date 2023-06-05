import { Box, Button, Modal, TextField } from "@mui/material";

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

    const [reasonOfReturn, setReasonOfReturn] = useState("");

    const sendReturnOrCancel = () => {
        setIsReasonOfModalOpen(false);
        DemandService.returnOrCancel(
          props.demandId,
          reasonOfReturn,
          getIsDevolution(),
          UserUtils.getLoggedUserId()
        ).then((res) => console.warn("RESSS", res));
        setReasonOfReturn("");
        navigate('/gerenciar-demandas');
      };
    


    return (
        <Modal
        open={props.isReasonOfModalOpen}
        onClose={props.handleCloseReasonOfModal}
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
            Motivo da {props.getIsDevolution() ? "devolução" : "recusação"} da demanda
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
            Insira o motivo
            <span style={{ color: "#AD0D0D", fontWeight: 500 }}>*</span>
          </p>
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={4}
            variant="outlined"
            value={reasonOfReturn}
            onChange={(e) => setReasonOfReturn(e.target.value)}
            sx={{
              width: 500,
              height: 100,
              mt: 2,
              mb: 5,
              borderRadius: 5,
              borderColor: "#0075B1",
            }}
          />
          <span className="flex items-center justify-center gap-4">
            <Button
              onClick={sendReturnOrCancel}
              variant="contained"
              style={{
                backgroundColor: "#0075B1",
                color: "#FFFFFF",
                width: 100,
                marginTop: 20,
              }}
            >
              Enviar
            </Button>
          </span>
        </Box>
      </Modal>
    )
}