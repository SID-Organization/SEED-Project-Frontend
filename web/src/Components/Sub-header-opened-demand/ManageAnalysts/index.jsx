// MUI
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  Divider,
  FormControl,
  IconButton,
  MenuItem,
  Modal,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import FontSizeUtils from "../../../utils/FontSize-Utils";
import { useEffect, useState } from "react";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { styled } from "@mui/material/styles";

import Notification from "../../Notification";

const styleModalManageAnalysts = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "23rem",
  height: "15rem",
  backgroundColor: "#fff",
  boxShadow: 0,
  borderRadius: 2,
  borderLeft: "5px solid #023A67",
};

const InfoTypography = styled(Typography)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1rem",
  marginTop: "0.5rem",
}));

export default function ManageAnalysts(props) {
  const [fonts, setFonts] = useState(FontSizeUtils.getFontSizes());

  useEffect(() => {
    setFonts(FontSizeUtils.getFontSizes());
  }, [FontSizeUtils.getFontControl()]);

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const [isScrolling, setIsScrolling] = useState(false);

  const [showAddAnalystDialog, setShowAddAnalystDialog] = useState(false);

  const [newAnalystCadastro, setNewAnalystCadastro] = useState("");

  const [notificationConfirm, setNotificationConfirm] = useState(false);

  const [analysts, setAnalysts] = useState([
    {
      cadastro: "72131",
      nome: "Analista 1",
      departamento: "Departamento 1",
    },
    {
      cadastro: "72132",
      nome: "Analista 2",
      departamento: "Departamento 2",
    },
    {
      cadastro: "72133",
      nome: "Analista 3",
      departamento: "Departamento 3",
    },
  ]);

  const handleScroll = (event) => {
    setIsScrolling(event.target.scrollTop > 0);
  };

  function handleDeleteAnalyst(index) {
    console.log("DELETANDO ANALISTA: ", index);
  }

  const handleAddAnalyst = () => {
    const newAnalyst = {
      cadastro: newAnalystCadastro,
      nome: "Novo Analista",
      departamento: "Departamento",
    };
    setAnalysts([...analysts, newAnalyst]);
    setNewAnalystCadastro("");
    setShowAddAnalystDialog(false);
    setNotificationConfirm(true);
    const timer = setTimeout(() => {
      setNotificationConfirm(false);
    }, 2000);
    return () => clearTimeout(timer);
  };

  return (
    <>
      {notificationConfirm && (
        <Notification
          message="Analista adicionado com sucesso!"
          severity="success"
        />
      )}
      <Dialog
        open={props.isAnalystsModalOpen}
        onClose={props.handleCloseManageAnalysts}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          "& .MuiDialog-paper": {
            borderLeft: "5px solid #023A67",
            width: "50rem",
            height: "20rem",
            backgroundColor: "#f2f2f2",
          },
        }}
      >
        <Typography
          id="modal-modal-title"
          component="h2"
          style={{
            textAlign: "center",
            padding: "1rem",
            fontSize: "1.5rem",
            color: "#023A67",
            fontWeight: "bold",
            boxShadow: isScrolling ? "0px 4px 8px rgba(0, 0, 0, 0.2)" : "none",
            transition: "box-shadow 0.2s ease-in-out",
          }}
          onScroll={handleScroll}
        >
          Gerenciar analistas
        </Typography>
        <div
          className="max-h-[800px] overflow-y-scroll
     scrollbar-thin scrollbar-thumb-[#a5a5a5] scrollbar-thumb-rounded-full scrollbar-w-2"
          onScroll={handleScroll}
        >
          {analysts.map((analyst, index) => (
            <div className="pl-4 pr-4">
              <Card
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  marginBottom: "1rem",
                  borderRadius: "1rem",
                  display: "flex",
                  alignItems: "center",
                  transition:
                    "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                  transform:
                    hoveredIndex === index ? "translateY(-5px)" : "none",
                  boxShadow:
                    hoveredIndex === index
                      ? "0px 4px 8px rgba(0, 0, 0, 0.2)"
                      : "none",
                }}
              >
                <CardContent
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    height: "3rem",
                    width: "100%",
                  }}
                >
                  <PersonRoundedIcon
                    style={{
                      color: "#023A67",
                      fontSize: "2rem",
                      marginRight: "1rem",
                    }}
                  />
                  <InfoTypography>
                    {analyst.cadastro} - {analyst.nome} - {analyst.departamento}
                  </InfoTypography>
                  <Tooltip title="Remover analista" placement="right">
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDeleteAnalyst(index)}
                      style={{
                        marginTop: "0.5rem",
                        marginLeft: "0.5rem",
                        opacity: hoveredIndex === index ? 1 : 0,
                        transition: "opacity 0.2s ease-in-out",
                      }}
                    >
                      <DeleteRoundedIcon
                        style={{
                          color: "#afafaf",
                          fontSize: "1.5rem",
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        <Button
          style={{
            color: "#0075b1",
          }}
          onClick={() => setShowAddAnalystDialog(true)}
        >
          <AddCircleOutlineRoundedIcon
            style={{
              color: "#0075b1",
              fontSize: "1.5rem",
              marginRight: "0.5rem",
            }}
          />
          Adicionar Analista
        </Button>
      </Dialog>
      <Dialog
        open={showAddAnalystDialog}
        onClose={() => setShowAddAnalystDialog(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          "& .MuiDialog-paper": {
            height: "8rem",
          },
        }}
      >
        <Typography
          id="modal-modal-title"
          component="h2"
          style={{
            textAlign: "center",
            padding: "1rem",
            fontSize: "1.3rem",
            color: "#023A67",
            fontWeight: "bold",
          }}
        >
          Adicionar analista
        </Typography>
        <div className="pl-4 pr-4">
          <CardContent
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              height: "3rem",
              width: "100%",
            }}
          >
            <TextField
              label="Número de cadastro"
              variant="outlined"
              value={newAnalystCadastro}
              onChange={(event) => setNewAnalystCadastro(event.target.value)}
              style={{ marginRight: "1rem" }}
            />
            <Button
              variant="contained"
              onClick={handleAddAnalyst}
              sx={{
                backgroundColor: "#0075b1",

                "&:hover": {
                  backgroundColor: "#0075b1",
                },
              }}
            >
              Adicionar
            </Button>
          </CardContent>
        </div>
      </Dialog>
    </>
  );
}
