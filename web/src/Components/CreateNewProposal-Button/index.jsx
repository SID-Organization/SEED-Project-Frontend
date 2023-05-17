import { useState } from "react";

//MUI
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import MuiButton from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import MuiAddBoxIcon from "@mui/icons-material/AddBox";

//Components
import DemandCardProposalModal from "../DemandCardProposalModal";

const ButtonProposalSubHeader = styled(MuiButton)({
  backgroundColor: "#0075B1",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  columnGap: "10px",
  marginRight: "2rem",

  "&:hover": {
    backgroundColor: "#0075B1",
  },
});

const ButtonPage = styled(MuiButton)(() => ({
  color: "#0075B1",
  fontWeight: "bold",
}));

const AddBoxIcon = styled(MuiAddBoxIcon)(({ theme }) => ({
  fontSize: "35px",
  color: "#023A67",
  // Adicione a regra de estilo para ajustar o tamanho do ícone
  "& svg": {
    fontSize: "35px",
  },
}));

const modalDemandsStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 750,
  bgcolor: "background.paper",
  borderTop: "5px solid #0075B1",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

export default function createNewProposalButton(props) {
  const [openModalDemands, setOpenModalDemands] = useState(false);
  const handleOpenModalDemands = () => setOpenModalDemands(true);
  const handleCloseModalDemands = () => setOpenModalDemands(false);

  return (
    <>
      {props.isProposal == true ? (
        <ButtonPage
          variant="outlined"
          startIcon={<AddBoxIcon />}
          onClick={handleOpenModalDemands}
        >
          Crie uma proposta
        </ButtonPage>
      ) : (
        <ButtonProposalSubHeader
          variant="contained"
          onClick={handleOpenModalDemands}
        >
          <AddRoundedIcon />
          Criar nova proposta
        </ButtonProposalSubHeader>
      )}
      <Modal
        open={openModalDemands}
        onClose={handleCloseModalDemands}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalDemandsStyle}>
          <div>
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#0075B1",
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              Selecione uma demanda abaixo
            </Typography>
            <div className="flex items-center justify-center">
              <div
                className="
                  flex max-h-[40rem] flex-col
                  gap-4
                  overflow-y-scroll
                  p-4
                scrollbar-thin scrollbar-thumb-[#a5a5a5] scrollbar-thumb-rounded-full
                scrollbar-w-2
                  "
              >
                {
                  //check if theres any demand
                  props.demandTitle && props.demandTitle.length > 0 ? (
                    props.demandTitle.map((demand, i) => (
                      <DemandCardProposalModal
                        key={i}
                        title={demand.tituloDemanda}
                        id={demand.idDemanda}
                      />
                    ))
                  ) : (
                    <div className="mt-5 grid items-center justify-center">
                      <div className="flex items-center justify-center">
                        <ErrorOutlineIcon
                          sx={{
                            fontSize: "2.7rem",
                            color: "#b3b3b3",
                          }}
                        />
                      </div>
                      <p className="mt-2 font-roboto font-bold text-[#b3b3b3]">
                        Nenhuma demanda cadastrada!
                      </p>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}
