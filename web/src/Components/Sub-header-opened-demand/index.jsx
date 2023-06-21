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
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

import "../../styles/index.css";

// Services
import DemandService from "../../service/Demand-Service";
import DemandLogService from "../../service/DemandLog-Service";
import BusinessUnityService from "../../service/BusinessUnity-Service";
import RespITSectionService from "../../service/ResponsableITSection-Service";

// Utils
import UserUtils from "../../utils/User-Utils";
import TranslationJSON from "../../API/Translate/components/subHeaderOpenedDemand.json";
import TranslateUtils from "../../utils/Translate-Utils/index.js";
import ReturnReasonModal from "../ReturnReason-Modal";
import { useContext } from "react";
import { TranslateContext } from "../../contexts/translate";
import ProposalService from "../../service/Proposal-Service";

// Componentes estilizados
const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1150,
  bgcolor: "background.paper",
  borderRadius: "0.125rem",
  boxShadow: 24
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
  borderRadius: 2
};

const TextField = styled(MuiTextField)({
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderLeft: "3px solid #0075B1"
  }
});

const FormControl = styled(MuiFormControl)({
  width: 250,

  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderLeft: "3px solid #0075B1"
  }
});

const Autocomplete = styled(MuiAutocomplete)({
  width: 250
});

/**
 * Classe com utilidades para Analistas e Gerentes decidirem caminhos para as demandas.
 *
 * Parâmetros de controle para edição dos campos
 * @param isEditEnabled
 * @param setIsEditEnabled
 */

export default function subHeader({ children }) {

  let phrase = children[0].trim()

  const translate = TranslationJSON;
  const [ language ] = useContext(TranslateContext);


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

  // Usuário logado
  const [user, setUser] = useState(UserUtils.getLoggedUser());

  // Modal de aprovação da demanda
  const [openApproveDemandModal, setOpenApproveDemandModal] = useState(false);

  // Notificação confirmação demanda aprovada
  const [openNotification, setOpenNotification] = useState(false);

  const [notificationClassifiedDemand, setNotificationClassifiedDemand] = useState(false);

  const anchorRef = React.useRef(null);
  const params = useParams();

  useEffect(() => {
    DemandService.getDemandById(params.id).then((response) => {
      setDemand(response);
    });
  }, []);

  const navigate = useNavigate();


  const getIsDevolution = () => {
    return (
      selectedKey == actionOptions.findIndex((o) => o.text === translate["Devolver"][language]) + 1
    );
  };

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
  };

  const accessProposal = () => {
    navigate(`/propostas/gerar-proposta/${demand.idDemanda}`);
  };

  const accessProposalDetails = async () => {
    navigate(`/propostas/${params.id}`)
  }

  const actionOptions = [
    {
      text: translate["Classificar demanda"][language] ?? "Classificar demanda",
      role: ["ANALISTA"],
      demandStatus: ["ABERTA"],
      notDemandStatus: [""],
      function: handleOpenModal,
      key: 1
    },
    {
      text: translate["Aprovar"][language] ?? "Aprovar",
      role: ["GERENTE", "GESTOR_TI"],
      demandStatus: ["CLASSIFICADO_PELO_ANALISTA", "PROPOSTA_PRONTA"],
      notDemandStatus: [""],
      function: handleOpenApproveDemand,
      key: 2
    },
    {
      text: translate["Acessar proposta"][language] ?? "Acessar proposta",
      role: ["ANALISTA", "GESTOR_TI"],
      demandStatus: ["PROPOSTA_EM_ELABORACAO"],
      notDemandStatus: [""],
      function: accessProposal,
      key: 3
    },
    {
      text: translate["Ver proposta"][language] ?? "Ver proposta",
      role: ["SOLICITANTE", "ANALISTA", "GERENTE", "GESTOR_TI"],
      demandStatus: [
        "PROPOSTA_PRONTA",
        "PROPOSTA_FINALIZADA",
        "EM_PAUTA",
        "APROVADA_EM_COMISSAO",
        "APROVADA_EM_DG",
        "PROPOSTA_EM_EXECUCAO",
        "PROPOSTA_EM_SUPORTE",
        "BUSINESS_CASE"
      ],
      notDemandStatus: [""],
      function: accessProposalDetails,
      key: 4
    },
    {
      text: translate["Devolver"][language] ?? "Devolver",
      role: ["ANALISTA", "GERENTE", "GESTOR_TI"],
      demandStatus: ["TODAS"],
      notDemandStatus: ["EM_EDICAO", "CANCELADA"],
      function: () => setIsReasonOfModalOpen(true),
      key: 5
    },

    {
      text: translate["Recusar"][language] ?? "Recusar",
      role: ["ANALISTA", "GERENTE", "GESTOR_TI"],
      demandStatus: ["TODAS"],
      notDemandStatus: ["EM_EDICAO", "CANCELADA"],
      function: () => setIsReasonOfModalOpen(true),
      key: 6
    },
    {
      text: translate["Alterar status"][language] ?? "Alterar status",
      role: ["ANALISTA"],
      demandStatus: ["TODAS"],
      notDemandStatus: [""],
      function: changeDemandStatus,
      key: 7
    }
  ];

  const demandSizes = [
    {
      text: translate["Muito grande"][language] ?? "Muito grande",
      description: "Acima de 3000h",
      key: 1
    },
    {
      text: translate["Grande"][language] ?? "Grande",
      description: "Entre 1001h e 3000h",
      key: 2
    },
    {
      text: translate["Média"][language] ?? "Média",
      description: "Entre 301h e 1000h",
      key: 3
    },
    {
      text: translate["Pequena"][language] ?? "Pequena",
      description: "Entre 41h e 300h",
      key: 4
    },
    {
      text: translate["Muito pequena"][language] ?? "Muito pequena",
      description: "Entre 1h - 40h",
      key: 5
    }
  ];

  useEffect(() => {
    BusinessUnityService.getBusinessUnity().then((data) => {
      setBusinessUnits(
        data.map((item) => ({
          text: item.siglaBusinessUnity + " - " + item.nomeBusinessUnity,
          key: item.idBusinessUnity
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
            key: item.idSecaoTIResponsavel
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
      idBusinessUnity: item.key
    }));
    const buSolicitante = {
      idBusinessUnity: businessUnits.find((item) => item.key == requesterBu)
        ?.key
    };
    const secaoTiResponsavel = {
      idSecaoTIResponsavel: responsableITSections.find(
        (item) => item.text == responsableSection
      )?.key
    };
    const updatedDemand = {
      busBeneficiadasDemanda: busBeneficiadas,
      buSolicitanteDemanda: buSolicitante,
      secaoTIResponsavelDemanda: secaoTiResponsavel,
      tamanhoDemanda: getDemandSize()
    };

    DemandService.updateBenefitedBUs(demand.idDemanda, updatedDemand)
      .then((response) => {
        if (response.status == 200) {
          DemandLogService.createDemandLog(
            "APROVACAO_GERENTE_AREA",
            demand.idDemanda,
            "Aprovar",
            72132
          );
          return true;
        }
        return false;
      })
      .then((isSuccessful) => {
        if (isSuccessful) {
          setNotificationClassifiedDemand(true);
        }
      });
  };

  const handleManagerApproveDemand = async () => {
    DemandLogService.createDemandLog(
      "ELABORACAO_PROPOSTA",
      demand.idDemanda,
      "Aprovar",
      72131
    ).then((response) => {
      if (response.status == 200 || response.status == 201) {
        DemandService.updateDemandStatus(
          demand.idDemanda,
          "APROVADO_PELO_GERENTE_DA_AREA"
        ).then((response) => {
          if (response.status == 200 || response.status == 201) {
            setOpenNotification(true);
            const timeout = setTimeout(() => {
              navigate("/gerenciar-demandas");
            }, 1500);
            return () => clearTimeout(timeout);
          }
        });
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
      );
    }
  }

  return (
    <div>
      {
        notificationClassifiedDemand && (
          <Notification
            message={
              translate["Demanda classificada com sucesso!"][language] ??
              "Demanda classificada com sucesso!"
            }
            severity="success"
            />
        )
      }
      {openNotification && (
        <Notification message={translate["Demanda aprovada com sucesso!"][language] ?? "Demanda aprovada com sucesso"}
        severity="success" />
      )}
      {/* Modal para confirmar a demanda */}
      <Modal
        open={openApproveDemandModal}
        onClose={handleCloseApproveDemand}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleApproveDemand}>
          <div className="grid items-center justify-center gap-8">
            <div className="grid items-center justify-center gap-2">
              <div className="flex items-center justify-center">
                <CheckCircleOutlineOutlinedIcon
                  sx={{
                    color: "#0075B1",
                    fontSize: "5rem"
                  }}
                />
              </div>
              <h1 className="text-lg font-semibold text-light-blue-weg">
                {translate["Deseja aprovar a demanda?"][language]}
              </h1>
            </div>
            <div className="flex items-center justify-around">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#C2BEBE",
                  color: "#fff",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#C2BEBE"
                  }
                }}
                onClick={handleCloseApproveDemand}
              >
                {translate["Cancelar"][language]}
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#0075B1",
                  color: "#fff",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#0075B1"
                  }
                }}
                onClick={handleApproveDemand}
              >
                {translate["Aprovar"][language]}
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      {/* Modal para inserir o motivo da reprovação */}
      <ReturnReasonModal
        isReasonOfModalOpen={isReasonOfModalOpen}
        setIsReasonOfModalOpen={setIsReasonOfModalOpen}
        getIsDevolution={getIsDevolution}
        demandId={params.id}
      />
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
                {translate["Insira as seguintes informações"][language] ?? "Insira as seguintes informações"}
              </h1>
            </div>
            <div className="mb-6 flex items-center justify-evenly">
              <div className="grid items-center justify-center gap-2">
                <p className="font-bold text-dark-blue-weg">
                  {translate["Seção da TI responsável"][language] ?? "Seção da TI responsável"}
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
                <p className="font-bold text-dark-blue-weg">
                  {translate["BU solicitante"][language] ?? "BU solicitante"}
                </p>
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
                <p className="font-bold text-dark-blue-weg">{translate["BUs beneficiadas"][language] ?? "BUs beneficiadas"}</p>
                <FormControl fullWidth size="small">
                  <Autocomplete
                    sx={{
                      width: 250
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
                  {translate["Classificação de tamanho"][language] ?? "Classificação de tamanho"}
                </p>
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">
                    {translate["Classifique um tamanho"][language] ?? "Classifique um tamanho"}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={classifyDemandSize}
                    label="Classifique um tamanho"
                    onChange={handleChangeClassifyDemandSize}
                    sx={{
                      display: "grid",
                      width: 320
                    }}
                  >
                    {demandSizes.map((item, i) => (
                      <MenuItem key={i} value={item.key}>
                        <Badge
                          badgeContent={item.description}
                          color="primary"
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "right"
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
                              width: "8rem"
                            }
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

            <div className="mb-5 mt-10 flex items-center justify-evenly">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#C2BEBE",
                  color: "#fff",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#C2BEBE"
                  }
                }}
                onClick={handleCloseModal}
              >
                {translate["Cancelar"][language] ?? "Cancelar"}
              </Button>
              <Button
                onClick={() => setIsReasonOfModalOpen(true)}
                variant="outlined"
                sx={{
                  backgroundColor: "#fff",
                  color: "#0075B1",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#fff"
                  }
                }}
              >
                {translate["Devolver"][language] ?? "Devolver"}
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#0075B1",
                  color: "#fff",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#0075B1"
                  }
                }}
                onClick={handleAnalystClassifyDemand}
              >
                {translate["Enviar"][language] ?? "Enviar"}
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      {/* Fim modal para inserir informações */}
      <div className="flex h-[5rem] items-center justify-around shadow-page-title-shadow">
        <h1 className="font-roboto text-3xl font-bold text-dark-blue-weg">
          {translate[phrase]?.[language] ? translate[phrase]?.[language] +  " " + children[1] : children}
        </h1>

        {ableToEdit() && (
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#00579D",
              columnGap: 2,
              width: 50,
              height: 40
            }}
            onClick={editDemand}
          >
            <Toaster
              position="top-center"
              toastOptions={{
                success: {
                  iconTheme: {
                    primary: "#7EB61C",
                    secondary: "white"
                  }
                },
                style: {
                  fontSize: "14px"
                }
              }}
            />
            <Tooltip title="Editar">
              <ModeEditIcon />
            </Tooltip>
          </Button>
        )}

        {user.cargoUsuario != "SOLICITANTE" && (
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
                fontSize: 14
              }}
              onClick={handleToggleActions}
            >
              {translate["Ações"][language] ?? "Ações"}
              {openActions ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </Button>
          </ButtonGroup>
        )}
        <Popper
          sx={{
            zIndex: 1
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
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseActions}>
                  <MenuList id="split-button-menu" autoFocusItem>
                    {actionOptions.map((option, index) => {
                      if (
                        option.role.includes(user.cargoUsuario) &&
                        (option.demandStatus.includes(demand.statusDemanda) ||
                          option.demandStatus.includes("TODAS")) && !option.notDemandStatus.includes(demand.statusDemanda)
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
            marginRight: "1rem"
          }}
          style={{
            boxShadow: "#bdbdbd 0px 1px 5px 1px"
          }}
        >
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon
              sx={{
                fontSize: "20px"
              }}
            />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <InputBase
            sx={{ ml: 1, flex: 1, fontSize: "13px" }}
            placeholder={translate["Procure aqui"][language] ?? "Procure aqui"}
            inputProps={{ "aria-label": `${translate["Procure aqui"][language] ?? "Procure aqui"}` }}
          />
        </Paper>
      </div>
    </div>
  );
}
