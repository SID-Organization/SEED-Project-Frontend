// MUI
import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  Dialog,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import FontSizeUtils from "../../../utils/FontSize-Utils";
import { useEffect, useState } from "react";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { styled } from "@mui/material/styles";
import Notification from "../../Notification";

// Service
import DemandService from "../../../service/Demand-Service";
import UserService from "../../../service/User-Service";

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

  const [allAnalysts, setAllAnalysts] = useState([]);
  const [newAnalystCadastro, setNewAnalystCadastro] = useState("");

  const [notificationConfirm, setNotificationConfirm] = useState(false);
  const [changedAnalysts, setChangedAnalysts] = useState(false);

  const [analysts, setAnalysts] = useState([]);

  useEffect(() => {
    setAnalysts(props.analysts);
  }, [props.analysts]);

  useEffect(() => {
    if (!analysts) return;
    UserService.getAllAnalysts()
      .then(res => {
        const notResponsableAnalysts = res.data.filter(a => !analysts.find(an => an.numeroCadastroUsuario === a.numeroCadastroUsuario));
        setAllAnalysts(notResponsableAnalysts);
      })
      .catch(err => {
        console.log("Erro ao buscar analistas");
        console.warn(err);
      });
  }, [analysts]);

  const handleScroll = (event) => {
    setIsScrolling(event.target.scrollTop > 0);
  };

  function handleDeleteAnalyst(index) {
    const newAnalysts = analysts.filter((analyst, i) => i !== index);
    setAnalysts(newAnalysts);
  }

  useEffect(() => {
    if (!analysts) return;
    // Verifica se houve alteração na lista de analistas
    if (analysts.length !== props.analysts.length) {
      setChangedAnalysts(true);
      return;
    }
    for (let i = 0; i < analysts.length; i++) {
      // Verifica se o analista atual é diferente do analista da demanda
      if (analysts[i].numeroCadastroUsuario !== props.analysts[i].numeroCadastroUsuario) {
        setChangedAnalysts(true);
        return;
      }
    }
    setChangedAnalysts(false);
  }, [analysts])

  function saveAnalystChanges() {
    DemandService.updateDemandAnalysts(props.demandId, analysts)
      .then((res) => {
        console.log("Analistas atualizados com sucesso");
        props.handleCloseManageAnalysts();
        setChangedAnalysts(false);
      })
      .catch((err) => {
        if (err.status === 404) {
          console.log("Analista não encontrado");
          console.warn(err);
        }
        console.log("Erro ao atualizar analistas");
        console.warn(err);
      });
  }

  const handleAddAnalyst = () => {
    UserService.getUserById(newAnalystCadastro)
      .then(res => {
        console.log("res", res)
        const newAnalysts = [...analysts, res.data];
        setAnalysts(newAnalysts);
      })
      .catch(err => {
        console.log("Usuário não encontrado");
        console.log(err);
      });
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
            height: "30rem",
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
            marginBottom: "1rem",
            fontSize: "1.5rem",
            color: "#023A67",
            fontWeight: "bold",
            boxShadow: isScrolling ? "0px 2px 4px rgba(0, 0, 0, 0.2)" : "none",
            transition: "box-shadow 0.2s ease-in-out",
          }}
          onScroll={handleScroll}
        >
          Gerenciar analistas
        </Typography>
        <div
          className="max-h-[800px] h-[800px] overflow-y-scroll
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
                  boxShadow:
                    hoveredIndex === index
                      ? "0px 2px 4px rgba(0, 0, 0, 0.2)"
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
                    {analyst.numeroCadastroUsuario} - {analyst.nomeUsuario} - {analyst.departamentoUsuario.nomeBusinessUnity}
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
        <div className="flex justify-around">
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
          <div>
            {changedAnalysts && (
              <Button
                style={{
                  color: "#0075b1",
                }}
                onClick={() => saveAnalystChanges()}
              >
                <CheckRoundedIcon
                  style={{
                    color: "#0075b1",
                    fontSize: "1.5rem",
                    marginRight: "0.5rem",
                  }}
                />
                Salvar
              </Button>
            )}
          </div>
        </div>
      </Dialog>
      <Dialog
        open={showAddAnalystDialog}
        onClose={() => setShowAddAnalystDialog(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          "& .MuiDialog-paper": {
            height: "8rem",
            width: "25rem",
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
        <div className="pl-1 pr-1">
          <CardContent
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              height: "3rem",
              width: "100%",
            }}
          >
            <Autocomplete
              id="combo-box-demo"
              onChange={(event, newValue) => {
                setNewAnalystCadastro(newValue.numeroCadastroUsuario);
              }}
              options={allAnalysts || []}
              getOptionLabel={(option) => option.numeroCadastroUsuario + " - " + option.nomeUsuario}
              style={{ width: 200 }}
              renderInput={(params) => <TextField {...params} label="Analista" variant="outlined" />}
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
