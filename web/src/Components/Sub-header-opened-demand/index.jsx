import * as React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";

//Components
import Notification from "../../Components/Notification";

// MUI
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import MuiTextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Select from "@mui/material/Select";
import { Badge, InputLabel, Typography } from "@mui/material";
import MuiFormControl from "@mui/material/FormControl";
import MuiAutocomplete from "@mui/material/Autocomplete";

// Icons
import DoneIcon from "@mui/icons-material/Done";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SearchIcon from "@mui/icons-material/Search";
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

import "../../styles/index.css";

// Services
import DemandService from "../../service/Demand-Service";
import DemandLogService from "../../service/DemandLog-Service";
import BusinessUnityService from "../../service/BusinessUnity-Service";
import RespITSectionService from "../../service/ResponsableITSection-Service";

// Utils
import UserUtils from "../../utils/User-Utils";

// Componentes estilizados
const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1150,
  bgcolor: "background.paper",
  borderRadius: "0.125rem",
  boxShadow: 24,
};

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


const styleApproveDemand = {
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
};

const TextField = styled(MuiTextField)({
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderLeft: "3px solid #0075B1",
  },
});

const FormControl = styled(MuiFormControl)({
  width: 250,

  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderLeft: "3px solid #0075B1",
  },
});

const Autocomplete = styled(MuiAutocomplete)({
  width: 250,
});

/**
 * Classe com utilidades para Analistas e Gerentes decidirem caminhos para as demandas.
 *
 * Parâmetros de controle para edição dos campos
 * @param isEditEnabled
 * @param setIsEditEnabled
 */

export default function subHeader({
  children,
  isEditEnabled,
  setIsEditEnabled,
}) {
  // Controle de modal
  const [openModal, setOpenModal] = useState(false);

  // Controle do botão de ações
  const [openActions, setOpenActions] = useState(false);
  // Controle do botão selecionado
  const [selectedKey, setSelectedKey] = useState(1);

  // Demanda buscada do banco de dados
  const [demand, setDemand] = useState();

  // Dados classificados da demanda
  const [benefitedBus, setBenefitedBus] = useState([]);
  const [responsableSection, setResponsableSection] = useState("");
  const [classifyDemandSize, setClassifyDemandSize] = useState("");
  const [requesterBu, setRequesterBu] = useState("");

  // Dados buscados do banco
  const [businessUnits, setBusinessUnits] = useState([]);
  const [responsableITSections, setResponsableITSections] = useState([]);

  // Motivo da devolução modal
  const [isReasonOfModalOpen, setIsReasonOfModalOpen] = useState(false);

  // Motivo da devolução variável
  const [reasonOfReturnValue, setReasonOfReturnValue] = useState("");

  // Usuário logado
  const [user, setUser] = useState(UserUtils.getLoggedUser());

  // Modal de aprovação da demanda
  const [openApproveDemandModal, setOpenApproveDemandModal] = useState(false);

  // Notificação confirmação demanda aprovada
  const [openNotification, setOpenNotification] = useState(false);

  const anchorRef = React.useRef(null);
  const params = useParams();

  useEffect(() => {
    DemandService.getDemandById(params.id).then((response) => {
      setDemand(response);
    });
  }, []);

  const navigate = useNavigate();

  const handleOpenReasonOfModal = () => setIsReasonOfModalOpen(true);
  const handleCloseReasonOfModal = () => {
    setIsReasonOfModalOpen(false)
    setReasonOfReturnValue("");
  };

  const sendReturnOrCancel = () => {
    setIsReasonOfModalOpen(false);
    DemandService.returnOrCancel(params.id, reasonOfReturnValue, getIsDevolution(), UserUtils.getLoggedUserId())
      .then(res => console.warn("RESSS", res))
    setReasonOfReturnValue("");
  }

  const getIsDevolution = () => {
    return selectedKey == actionOptions.findIndex(o => o.text === 'Devolver') + 1
  }

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenApproveDemand = () => setOpenApproveDemandModal(true);
  
  const handleCloseApproveDemand = () => {
    setOpenApproveDemandModal(false);
  };

  const handleApproveDemand = () => {
    handleManagerApproveDemand();
  };

  const changeDemandStatus = () => {
    // CRIAR MODAL PARA MOSTRAR E TROCAR OS STATUS DA DEMANDA
  }

  const accessProposal = () => {
    navigate(`/propostas/gerar-proposta/${demand.idDemanda}`);
  }


  const actionOptions = [
    {
      text: "Classificar demanda",
      role: ["ANALISTA"],
      demandStatus: ["ABERTA"],
      function: handleOpenModal,
      key: 1,
    },
    {
      text: "Aprovar",
      role: ["GERENTE", "GESTOR_TI"],
      demandStatus: ["CLASSIFICADO_PELO_ANALISTA", "PROPOSTA_PRONTA"],
      function: handleOpenApproveDemand,
      key: 2,
    },
    {
      text: "Acessar proposta",
      role: ["ANALISTA", "GESTOR_TI"],
      demandStatus: ["PROPOSTA_EM_ELABORACAO"],
      function: accessProposal,
      key: 3,
    },
    {
      text: "Ver proposta",
      role: ["SOLICITANTE", "ANALISTA", "GERENTE", "GESTOR_TI"],
      demandStatus: [
        "PROPOSTA_PRONTA",
        "PROPOSTA_FINALIZADA",
        "EM_PAUTA",
        "APROVADA_EM_COMISSAO",
        "APROVADA_EM_DG",
        "PROPOSTA_EM_EXECUCAO",
        "PROPOSTA_EM_SUPORTE",
        "BUSINESS_CASE",
      ],
      key: 4,
    },
    {
      text: "Devolver",
      role: ["ANALISTA", "GERENTE", "GESTOR_TI"],
      demandStatus: ["TODAS"],
      function: handleOpenReasonOfModal,
      key: 5,
    },

    {
      text: "Recusar",
      role: ["ANALISTA", "GERENTE", "GESTOR_TI"],
      demandStatus: ["TODAS"],
      function: handleOpenReasonOfModal,
      key: 6,
    },
    {
      text: "Alterar status",
      role: ["ANALISTA"],
      demandStatus: ["TODAS"],
      function: changeDemandStatus,
      key: 7,
    },
  ];

  const demandSizes = [
    {
      text: "Muito grande",
      description: "Acima de 3000h",
      key: 1,
    },
    {
      text: "Grande",
      description: "Entre 1001h e 3000h",
      key: 2,
    },
    {
      text: "Média",
      description: "Entre 301h e 1000h",
      key: 3,
    },
    {
      text: "Pequena",
      description: "Entre 41h e 300h",
      key: 4,
    },
    {
      text: "Muito pequena",
      description: "Entre 1h - 40h",
      key: 5,
    },
  ];

  useEffect(() => {
    BusinessUnityService.getBusinessUnity().then((data) => {
      setBusinessUnits(
        data.map((item) => ({
          text: item.siglaBusinessUnity + " - " + item.nomeBusinessUnity,
          key: item.idBusinessUnity,
        }))
      );
    });
    RespITSectionService.getResponsableITSections()
      .then((data) => {
        setResponsableITSections(
          data.map((item) => ({
            text:
              item.siglaSecaoTIResponsavel +
              " - " +
              item.nomeSecaoTIResponsavel,
            key: item.idSecaoTIResponsavel,
          }))
        );
      })
      .catch((err) => console.log("Erro ", err));
  }, []);



  const handleToggleActions = () => {
    setOpenActions((prevOpen) => !prevOpen);
  };

  const handleCloseActions = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenActions(false);
  };

  function editDemand() {
    navigate(`/editar-demanda/${params.id}`);
  }

  const handleChangeRequesterBu = (event) => {
    setRequesterBu(event.target.value);
  };

  const handleChangeClassifyDemandSize = (event) => {
    setClassifyDemandSize(event.target.value);
  };

  const handleAnalystClassifyDemand = async () => {
    // Formatting data to send to the backend
    const busBeneficiadas = benefitedBus.map((item) => ({
      idBusinessUnity: item.key,
    }));
    const buSolicitante = {
      idBusinessUnity: businessUnits.find((item) => item.key == requesterBu)
        ?.key,
    };
    const secaoTiResponsavel = {
      idSecaoTIResponsavel: responsableITSections.find(
        (item) => item.text == responsableSection
      )?.key,
    };
    const updatedDemand = {
      busBeneficiadasDemanda: busBeneficiadas,
      buSolicitanteDemanda: buSolicitante,
      secaoTIResponsavelDemanda: secaoTiResponsavel,
      tamanhoDemanda: getDemandSize(),
    };

    DemandService.updateBenefitedBUs(demand.idDemanda, updatedDemand)
      .then((response) => {
        if (response.status == 200) {

          DemandLogService.createDemandLog("APROVACAO_GERENTE_AREA", demand.idDemanda, "Aprovar", 72132);
        }
        return response;
      })
      .then((res) => {
        if (res.status == 200)
          navigate(-1);
      });
  };

  const handleManagerApproveDemand = async () => {
    DemandLogService.createDemandLog("ELABORACAO_PROPOSTA", demand.idDemanda, "Aprovar", 72131).then((response) => {
      if (response.status == 200 || response.status == 201) {
        DemandService.updateDemandStatus(
          demand.idDemanda,
          "APROVADO_PELO_GERENTE_DA_AREA"
        ).then((response) => {
          if (response.status == 200 || response.status == 201) {
            setOpenNotification(true);
            const timeout = setTimeout(() => {
              navigate("/demandas");
            }, 1500);
            return () => clearTimeout(timeout);
          }
        })
        ;
      }
    });
  };

  const getDemandSize = () => {
    if (classifyDemandSize == "1") return "MUITO_GRANDE";
    if (classifyDemandSize == "2") return "GRANDE";
    if (classifyDemandSize == "3") return "MEDIA";
    if (classifyDemandSize == "4") return "PEQUENA";
    if (classifyDemandSize == "5") return "MUITO_PEQUENA";
  };

  function ableToEdit() {
    if (demand) {
      return (
        user.cargoUsuario == "SOLICITANTE" &&
        demand.statusDemanda == "EM_EDICAO"
      )
    }
  }

  return (
    <div>
      {
        openNotification && (    
          <Notification message="Demanda aprovada com sucesso!" action={false} />
        )
      }
      {/* Modal para confirmar a demanda */}
      <Modal
        open={openApproveDemandModal}
        onClose={handleCloseApproveDemand}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleApproveDemand}>
          <div className="grid justify-center items-center gap-8">
            <div className="grid justify-center items-center gap-2">
              <div className="flex justify-center items-center">
                <CheckCircleOutlineOutlinedIcon
                  sx={{
                    color: "#0075B1",
                    fontSize: "5rem",
                  }}
                />
              </div>
              <h1 className="font-semibold text-light-blue-weg text-lg">
                Deseja aprovar a demanda?
              </h1>
            </div>
            <div className="flex justify-around items-center">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#C2BEBE",
                  color: "#fff",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#C2BEBE",
                  },
                }}
                onClick={handleCloseApproveDemand}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#0075B1",
                  color: "#fff",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#0075B1",
                  },
                }}
                onClick={handleApproveDemand}
              >
                Aprovar
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      {/* Modal para inserir o motivo da reprovação */}
      <Modal
        open={isReasonOfModalOpen}
        onClose={handleCloseReasonOfModal}
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
            Motivo da {getIsDevolution() ? "devolução" : "recusação"} da
            demanda
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
            value={reasonOfReturnValue}
            onChange={(e) => setReasonOfReturnValue(e.target.value)}
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
      {/* Fim modal para inserir motivo da reprovação */}

      {/* Modal para inserir as informações da demanda */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <div className="font-roboto">
            <div className="mb-5 flex h-20 w-full items-center justify-center rounded-t-sm bg-dark-blue-weg">
              <h1 className="text-2xl font-bold text-white">
                Insira as seguintes informações
              </h1>
            </div>
            <div className="mb-6 flex items-center justify-evenly">
              <div className="grid items-center justify-center gap-2">
                <p className="font-bold text-dark-blue-weg">
                  Seção da TI responsável
                </p>
                <FormControl variant="outlined" size="small">
                  <Autocomplete
                    size="small"
                    disablePortal
                    id="combo-box-demo"
                    options={responsableITSections.map((option) => option.text)}
                    renderInput={(params) => (
                      <TextField {...params} label="Seção" />
                    )}
                    isOptionEqualToValue={(option, value) => option === value}
                    value={responsableSection}
                    onChange={(event, newValue) => {
                      setResponsableSection(newValue);
                    }}
                  />
                </FormControl>
              </div>
              <div className="grid items-center justify-center gap-2">
                <p className="font-bold text-dark-blue-weg">BU solicitante</p>
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">BU</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={requesterBu}
                    label="BU"
                    onChange={handleChangeRequesterBu}
                  >
                    {businessUnits &&
                      businessUnits.map((item, i) => (
                        <MenuItem key={i} value={item.key}>
                          {item.text}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </div>
              <div className="grid items-center justify-center gap-2">
                <p className="font-bold text-dark-blue-weg">BUs beneficiadas</p>
                <FormControl fullWidth size="small">
                  <Autocomplete
                    sx={{
                      width: 250,
                    }}
                    size="small"
                    multiple
                    id="tags-outlined"
                    options={businessUnits ? businessUnits : []}
                    getOptionLabel={(option) => option.text}
                    value={benefitedBus}
                    onChange={(event, newValues) => {
                      setBenefitedBus(newValues);
                    }}
                    isOptionEqualToValue={(option, value) => option === value}
                    filterSelectedOptions
                    renderInput={(params) => (
                      <TextField {...params} label="BUs" />
                    )}
                  />
                </FormControl>
              </div>
              <div className="mr-20 grid items-center justify-center gap-2">
                <p className="font-bold text-dark-blue-weg">
                  Classificação de tamanho
                </p>
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">
                    Classifique um tamanho
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={classifyDemandSize}
                    label="Classifique um tamanho"
                    onChange={handleChangeClassifyDemandSize}
                    sx={{
                      display: "grid",
                      width: 320,
                    }}
                  >
                    {demandSizes.map((item, i) => (
                      <MenuItem key={i} value={item.key}>
                        <Badge
                          badgeContent={item.description}
                          color="primary"
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          sx={{
                            "& .MuiBadge-badge": {
                              backgroundColor: "#0075B1",
                              color: "#fff",
                              display: "flex",
                              left: "60px",
                              top: "12px",
                              justifyContent: "center",
                              alignItems: "center",
                              width: "8rem",
                            },
                          }}
                        >
                          {item.text}
                        </Badge>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>

            <div className="mt-10 mb-5 flex items-center justify-evenly">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#C2BEBE",
                  color: "#fff",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#C2BEBE",
                  },
                }}
                onClick={handleCloseModal}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleOpenReasonOfModal}
                variant="outlined"
                sx={{
                  backgroundColor: "#fff",
                  color: "#0075B1",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#fff",
                  },
                }}
              >
                Devolver
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#0075B1",
                  color: "#fff",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#0075B1",
                  },
                }}
                onClick={handleAnalystClassifyDemand}
              >
                Enviar
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      {/* Fim modal para inserir informações */}
      <div className="flex h-[5rem] items-center justify-around shadow-page-title-shadow">
        <h1 className="font-roboto text-3xl font-bold text-dark-blue-weg">
          {children}
        </h1>

        {ableToEdit() && (
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#00579D",
              columnGap: 2,
              width: 50,
              height: 40,
            }}
            onClick={editDemand}
          >
            <Toaster
              position="top-center"
              toastOptions={{
                success: {
                  iconTheme: {
                    primary: "#7EB61C",
                    secondary: "white",
                  },
                },
                style: {
                  fontSize: "14px",
                },
              }}
            />
            <Tooltip title="Editar">
              <ModeEditIcon />
            </Tooltip>
          </Button>
        )}

        {user.cargoUsuario != "SOLICITANTE" && (
          <Tooltip title="Ações">
            <ButtonGroup
              variant="contained"
              ref={anchorRef}
              aria-label="split button"
            >
              <Button
                size="small"
                aria-controls={openActions ? "split-button-menu" : undefined}
                aria-expanded={openActions ? "true" : undefined}
                aria-label="select merge strategy"
                aria-haspopup="menu"
                sx={{
                  backgroundColor: "#00579D",
                  width: 100,
                  height: 40,
                  fontSize: 14,
                }}
                onClick={handleToggleActions}
              >
                Ações
                {openActions ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              </Button>
            </ButtonGroup>
          </Tooltip>
        )}
        <Popper
          sx={{
            zIndex: 1,
          }}
          open={openActions}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseActions}>
                  <MenuList id="split-button-menu" autoFocusItem>
                    {actionOptions.map((option, index) => {
                      if (
                        option.role.includes(user.cargoUsuario) &&
                        (option.demandStatus.includes(demand.statusDemanda) ||
                          option.demandStatus.includes("TODAS"))
                      ) {
                        return (
                          <MenuItem
                            onClick={() => {
                              option.function();
                              setSelectedKey(option.key);
                            }}
                            key={option.key}
                          >
                            {option.text}
                          </MenuItem>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>

        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 240,
            height: 40,
            marginRight: "1rem",
          }}
          style={{
            boxShadow: "#bdbdbd 0px 1px 5px 1px",
          }}
        >
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon
              sx={{
                fontSize: "20px",
              }}
            />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <InputBase
            sx={{ ml: 1, flex: 1, fontSize: "13px" }}
            placeholder="Procure aqui"
            inputProps={{ "aria-label": "Procure aqui" }}
          />
        </Paper>
      </div>
    </div>
  );
}
