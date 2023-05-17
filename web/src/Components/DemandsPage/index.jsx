import { useEffect, useState } from "react";
import DemandType from "./DemandType-ENUM";

//Services
import DemandService from "../../service/Demand-Service";
import DemandLogService from "../../service/DemandLog-Service";
import DemandCard from "../Demand-card";
import { Box, CircularProgress, Fade, Grid, Pagination } from "@mui/material";
import DemandsList from "../Demand-card-list";

//Utils
import UserUtils from "../../utils/User-Utils";

//Components
import NoContent from "../No-content";
import SubHeader from "../Sub-header";
import Notification from "../../Components/Notification";

//MUI
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import MuiButton from "@mui/material/Button";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";

// Tools
import Draggable from "react-draggable";

export default function DemandsPage(props) {
  /*
    Estão sendo utilizadas 3 variáveis para armazenar as demandas:
    - dbDemands: armazena as demandas que foram buscadas no banco de dados
    - demands: armazena as demandas com o histórico de workflow
    - showingDemands: armazena as demandas que serão mostradas na tela (Já filtradas ou ordenadas)
  */
  const [isListFormat, setIsListFormat] = useState(false);
  const [user, setUser] = useState(UserUtils.getLoggedUser());

  //States para demandas
  const [demandsWLogs, setDemandsWLogs] = useState();
  const [dbDemands, setDbDemands] = useState([]);
  const [sortedDemands, setSortedDemands] = useState([]);
  const [showingDemands, setShowingDemands] = useState([]);
  const [selectedDrafts, setSelectedDrafts] = useState([]);

  //States para filtro
  const [filter, setFilter] = useState({ filterId: 0, filterType: "date" });
  const [search, setSearch] = useState("");

  //Variáveis para o Pagination
  const [currentPage, setCurrentPage] = useState(1); // Define a página atual como 1
  const demandsPerPage = 12; // Define o número de demandas por página
  const lastIndex = currentPage * demandsPerPage; // Último índice das demandas a serem mostradas
  const firstIndex = lastIndex - demandsPerPage; // Primeiro índice das demandas a serem mostradas

  const [demandType, setDemandType] = useState(props.DemandType);

  const [isLoaded, setIsLoaded] = useState(false);
  const [hasDemands, setHasDemands] = useState(true); // Novo estado para controlar se há demandas cadastradas

  useEffect(() => {
    setDemandType(props.DemandType);
    console.log("props.DemandType: ", props.DemandType);
  }, [props.DemandType]);

  // Pegar as respectivas demandas
  useEffect(() => {
    if (demandType === DemandType.DEMAND) {
      DemandService.getDemandsByRequestorId(user.numeroCadastroUsuario)
        .then((res) => {
          if (res.data && res.data.length > 0) {
            setDbDemands(
              res.data.filter((d) => d.statusDemanda !== "RASCUNHO")
            );
            setHasDemands(true); // Atualiza o estado para indicar que há demandas cadastradas
          } else {
            setDbDemands([]);
            setHasDemands(false); // Atualiza o estado para indicar que não há demandas cadastradas
          }
          setIsLoaded(true); // Atualiza o estado de carregamento
        })
        .catch((error) => {
          console.error("Erro ao obter as demandas:", error);
        });
    } else if (demandType === DemandType.DRAFT) {
      DemandService.getDraftsByRequestorId(user.numeroCadastroUsuario)
        .then((demands) => {
          if (demands && demands.length > 0) {
            setDbDemands(demands.filter((d) => d.statusDemanda === "RASCUNHO"));
            setHasDemands(true); // Atualiza o estado para indicar que há demandas cadastradas
          } else {
            setDbDemands([]);
            setHasDemands(false); // Atualiza o estado para indicar que não há demandas cadastradas
          }
          setIsLoaded(true); // Atualiza o estado de carregamento
        })
        .catch((error) => {
          console.error("Erro ao obter os rascunhos:", error);
        });
    } else {
      DemandService.getDemandsToManage(
        user.numeroCadastroUsuario,
        user.cargoUsuario
      )
        .then((data) => {
          let demandsToManage = data;
          if (user.cargoUsuario === "GERENTE") {
            demandsToManage = demandsToManage.filter(
              (item) => item.statusDemanda === "CLASSIFICADO_PELO_ANALISTA"
            );
          }
          if (demandsToManage && demandsToManage.length > 0) {
            setDbDemands(demandsToManage);
            setHasDemands(true); // Atualiza o estado para indicar que há demandas cadastradas
          } else {
            setDbDemands([]);
            setHasDemands(false); // Atualiza o estado para indicar que não há demandas cadastradas
          }
          console.log("Demandas para gerenciar: ", demandsToManage);
          setIsLoaded(true); // Atualiza o estado de carregamento
        })
        .catch((error) => {
          console.error("Erro ao obter as demandas para gerenciar:", error);
        });
    }
  }, []);
  useEffect(() => {
    if (dbDemands && dbDemands.length > 0) {
      setIsLoaded(true);
    }
  }, [dbDemands]);

  useEffect(() => {
    if (dbDemands) {
      if (demandType == DemandType.DEMAND) {
        console.log("Demands carregadas:", dbDemands);
      } else if (demandType == DemandType.DRAFT) {
        console.log("Drafts carregados:", dbDemands);
      } else {
        console.log("Demands to manage: ", dbDemands);
      }
      getDemandsLogs();
    }
  }, [dbDemands]);

  useEffect(() => {
    if (demandsWLogs) {
      updateDemandSort(search);

      if (sortedDemands) {
        setShowingDemands(sortedDemands);
      }
    }
  }, [filter, demandsWLogs]);

  const getDemandsLogs = async () => {
    let demandsHistoric = dbDemands.map(async (demand) => {
      let demandHistoric = DemandLogService.getDemandLogs(demand.idDemanda);

      return {
        ...demand,
        historico: await demandHistoric,
      };
    });

    setDemandsWLogs(await Promise.all(demandsHistoric));
  };

  const updateDemandSort = (search) => {
    let sortedDemands;
    if (demandsWLogs) {
      sortedDemands = demandsWLogs;

      setSortedDemands(sortedDemands);
    }
  };

  // useEffect(() => {
  //   if (!demandsToManage) return;
  //   setFilteredDemands(demandsToManage);
  // }, [demandsToManage]);

  // useEffect(() => {
  //   if (!filters) return;
  //   const filtered = DemandFilterUtils.filterBy(demandsToManage, filters);
  //   setFilteredDemands(filtered);
  // }, [filters]);

  // console.log("DbDemands: ", dbDemands);

  //DRAFT THINGS
  const [openModalConfirmationDemand, setOpenModalConfirmationDemand] =
    useState(false);
  const [
    openModalConfirmationSelectedDemand,
    setOpenModalConfirmationSelectedDemand,
  ] = useState(false);

  const ButtonAddSelected = styled(MuiButton)({
    backgroundColor: "#FFF",
    color: "#0075B1",
    fontWeight: "bold",
    border: "#0075B1 solid 1px",
    fontSize: "0.89rem",
    width: 260,
    height: "2.5rem",

    "&:hover": {
      backgroundColor: "#f3f3f3",
    },
  });

  function PaperComponent(props) {
    return (
      <Draggable
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper {...props} />
      </Draggable>
    );
  }

  const handleClickOpenModalConfirmationDemand = () => {
    setOpenModalConfirmationDemand(true);
  };

  const handleCloseModalConfirmationDemand = () => {
    setOpenModalConfirmationDemand(false);
  };
  const handleClickOpenModalConfirmationSelectedDemand = () => {
    setOpenModalConfirmationSelectedDemand(true);
  };

  const handleCloseModalConfirmationSelectedDemand = () => {
    setOpenModalConfirmationSelectedDemand(false);
  };

  const deleteSelectedDrafts = () => {
    DemandService.deleteListDemands(selectedDrafts).then((response) => {
      if (response.status === 200) {
        setSelectedDrafts([]);
        window.location.reload();
      }
    });
  };

  const deleteAllDrafts = () => {
    DemandService.deleteAllDemands().then((response) => {
      if (response.status === 200) {
        window.location.reload();
      }
    });
  };

  function getDemandsList() {
    return (
      <div className="flex h-full items-center justify-center">
        <DemandsList demands={showingDemands} />
      </div>
    );
  }

  function getDemandsGrid() {
    const showingDemandsPaginated = showingDemands
      ? showingDemands.slice(firstIndex, lastIndex)
      : [];
    const handleChangePage = (event, value) => {
      // Função para alterar a página atual
      setCurrentPage(value);
    };

    return (
      <>
        <Grid
          container
          gap={3}
          rowGap={1}
          direction="row"
          justify="center"
          alignItems="center"
          alignContent="center"
          style={{ padding: "0 20px" }}
        >
          {showingDemandsPaginated &&
            showingDemandsPaginated.map((demand, i) => {
              if (demandType == DemandType.DRAFT) {
                return (
                  <DemandCard
                    key={i}
                    demand={demand}
                    setSelectedDrafts={setSelectedDrafts}
                  />
                );
              } else {
                return <DemandCard key={i} demand={demand} />;
              }
            })}
        </Grid>

        <div className="flex w-full justify-center">
          {showingDemands && showingDemands.length > 0 && (
            <Pagination
              count={Math.ceil(showingDemands?.length / demandsPerPage)}
              page={currentPage}
              onChange={handleChangePage}
              color="primary"
            />
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <SubHeader
          setIsListFormat={setIsListFormat}
          isListFormat={isListFormat}
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
        >
          {demandType == DemandType.DEMAND && <p>Minhas demandas</p>}
          {demandType == DemandType.DRAFT && <p>Rascunhos</p>}
          {demandType == DemandType.MANAGER && <p>Gerenciar demandas</p>}
        </SubHeader>
      </div>
      {/* DRAFT CASE */}
      {demandType == DemandType.DRAFT && (
        <div className="ml-5 flex items-center">
          {/* MODAL DELETAR TODOS OS RASCUNHOS */}
          <Dialog
            open={openModalConfirmationDemand}
            onClose={handleCloseModalConfirmationDemand}
            PaperComponent={PaperComponent}
            sx={{
              "& .MuiDialog-paper": {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "23rem",
                height: "15rem",
                backgroundColor: "#fff",
                boxShadow: 0,
                borderRadius: 2,
              },
            }}
          >
            <div className="grid items-center justify-center">
              <div className="flex items-center justify-center">
                <WarningAmberRoundedIcon
                  sx={{
                    fontSize: "5rem",
                    color: "#0075B1",
                  }}
                />
              </div>
              <DialogTitle style={{ color: "#0075B1" }}>
                <p
                  className="
                  text-center
                "
                >
                  Têm certeza que deseja deletar todos os rascunhos?
                </p>
              </DialogTitle>
            </div>
            <DialogActions>
              <div className="flex gap-5">
                <Button
                  autoFocus
                  onClick={handleCloseModalConfirmationDemand}
                  sx={{
                    backgroundColor: "#C2BEBE",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#C2BEBE",
                    },
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={deleteAllDrafts}
                  sx={{
                    backgroundColor: "#0075B1",
                    height: "2.5rem",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#0075B1",
                    },
                  }}
                >
                  Deletar tudo
                </Button>
              </div>
            </DialogActions>
          </Dialog>
          {/* FIM MODAL DELETAR TODOS OS RASCUNHOS */}
          {/* MODAL CONFIRM DELETE SELECTED DRAFTS */}
          <Dialog
            open={openModalConfirmationSelectedDemand}
            onClose={handleCloseModalConfirmationSelectedDemand}
            sx={{
              "& .MuiDialog-paper": {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "23rem",
                height: "15rem",
                backgroundColor: "#fff",
                boxShadow: 0,
                borderRadius: 2,
              },
            }}
          >
            <div className="grid items-center justify-center">
              <div className="flex items-center justify-center">
                <WarningAmberRoundedIcon
                  sx={{
                    fontSize: "5rem",
                    color: "#0075B1",
                  }}
                />
              </div>
              <DialogTitle style={{ color: "#0075B1" }}>
                <p
                  className="
                  text-center
                "
                >
                  Têm certeza que deseja deletar{" "}
                  {selectedDrafts.length > 1
                    ? "esses rascunhos?"
                    : "esse rascunho?"}
                </p>
              </DialogTitle>
            </div>
            <DialogActions>
              <div className="flex gap-5">
                <Button
                  autoFocus
                  onClick={handleCloseModalConfirmationSelectedDemand}
                  sx={{
                    backgroundColor: "#C2BEBE",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#C2BEBE",
                    },
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={deleteSelectedDrafts}
                  sx={{
                    backgroundColor: "#0075B1",
                    height: "2.5rem",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#0075B1",
                    },
                  }}
                >
                  Deletar
                </Button>
              </div>
            </DialogActions>
          </Dialog>
          {/* FIM MODAL DELETAR TODOS OS RASCUNHOS SELECIONADOS */}
          {dbDemands && dbDemands.length > 0 && (
            <div className="mb-10 flex gap-10">
              <Button
                onClick={handleClickOpenModalConfirmationDemand}
                variant="contained"
                sx={{
                  backgroundColor: "#0075B1",
                  color: "#FFF",
                  fontSize: "0.89rem",
                  width: 200,
                  height: "2.5rem",
                  marginLeft: 2,
                  "&:hover": {
                    backgroundColor: "#0075B1",
                  },
                }}
                startIcon={
                  <DeleteRoundedIcon
                    sx={{
                      color: "#FFF",
                      fontSize: "0.89rem",
                    }}
                  />
                }
              >
                Deletar tudo
              </Button>
              {selectedDrafts.length > 0 && (
                <Fade
                  in={true}
                  sx={{
                    transitionDelay:
                      selectedDrafts.length > 0 ? "500ms" : "0ms",
                  }}
                >
                  <ButtonAddSelected
                    onClick={handleClickOpenModalConfirmationSelectedDemand}
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={
                      <DeleteRoundedIcon
                        sx={{
                          color: "#0075B1",
                          fontSize: "0.89rem",
                        }}
                      />
                    }
                    className={`opacity-0 transition-opacity duration-300 ease-in-out ${
                      selectedDrafts.length > 0 ? "opacity-100" : ""
                    }`}
                  >
                    Deletar {"(" + selectedDrafts.length + ")"}{" "}
                    {selectedDrafts.length > 1 ? "rascunhos" : "rascunho"}
                  </ButtonAddSelected>
                </Fade>
              )}
            </div>
          )}
        </div>
      )}

      <div className="flex flex-wrap justify-around">
        {isLoaded ? (
          dbDemands && dbDemands.length > 0 ? (
            isListFormat ? (
              getDemandsList()
            ) : (
              getDemandsGrid()
            )
          ) : (
            <div className="flex h-[71vh] items-center justify-around">
              {!hasDemands ? (
                <NoContent
                  isManager={demandType == DemandType.MANAGER ? false : true}
                >
                  {demandType == DemandType.DEMAND && <>Sem demandas!</>}
                  {demandType == DemandType.DRAFT && <>Sem rascunhos!</>}
                  {demandType == DemandType.MANAGER && (
                    <>Sem demandas para gerenciar!</>
                  )}
                </NoContent>
              ) : (
                <CircularProgress />
              )}
            </div>
          )
        ) : (
          <div className="flex h-[71vh] items-center justify-around">
            <CircularProgress />
          </div>
        )}
      </div>
    </>
  );
}
