import { useContext, useEffect, useState } from "react";

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

//Utils
import FontSizeUtils from "../../utils/FontSize-Utils";

//Translations
import TranslationJson from "../../API/Translate/components/createNewProposalButton.json";
import TranslateUtils from "../../utils/Translate-Utils/index.js";
import { TranslateContext } from "../../contexts/translate/index.jsx";

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

  const translate = TranslationJson;
  const [ language ] = useContext(TranslateContext);

  const [openModalDemands, setOpenModalDemands] = useState(false);
  const handleOpenModalDemands = () => setOpenModalDemands(true);
  const handleCloseModalDemands = () => setOpenModalDemands(false);

  const [fonts, setFonts] = useState(FontSizeUtils.getFontSizes());

  useEffect(() => {
    setFonts(FontSizeUtils.getFontSizes());
  }, [FontSizeUtils.getFontControl()]);

  return (
    <>
      {props.isProposal == true ? (
        <ButtonPage
          style={{ fontSize: fonts.sm }}
          variant="outlined"
          startIcon={<AddBoxIcon />}
          onClick={handleOpenModalDemands}
        >
          {translate["Crie uma proposta"][language] ?? "Crie uma proposta"}
        </ButtonPage>
      ) : (
        <ButtonProposalSubHeader
          style={{ fontSize: fonts.sm }}
          variant="contained"
          onClick={handleOpenModalDemands}
        >
          <AddRoundedIcon />
          {translate["Criar nova proposta"][language] ?? "Criar nova proposta"}
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
              style={{ fontSize: fonts.xl }}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#0075B1",
                fontWeight: "bold",
              }}
            >
              {translate["Selecione uma demanda abaixo"][language] ?? "Selecione uma demanda abaixo"}
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
                  props.demandsTitle && props.demandsTitle.length > 0 ? (
                    props.demandsTitle.map((demand, i) => (
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
                      <p
                        style={{ fontSize: fonts.base }}
                        className="mt-2 font-roboto font-bold text-[#b3b3b3]"
                      >
                        {translate["Nenhuma demanda cadastrada!"][language] ?? "Nenhuma demanda cadastrada!"}
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
