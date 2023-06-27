import { useContext, useEffect, useRef, useState } from "react";

// MUI
import { Badge, Button, Popper, Tooltip } from "@mui/material";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

// Components
import FilterField from "../FilterField";
import DemandFilterUtils from "../../utils/DemandFilter-Utils";

// Voice Speech
import VoiceSpeech from "../VoiceSpeech";

// Utils
import TranslateUtils from "../../utils/Translate-Utils";
import UserUtils from "../../utils/User-Utils";

// Service
import FilterService from "../../service/Filter-Service";

// Translation
import TranslationJSON from "../../API/Translate/components/demandFilter.json";
import { TranslateContext } from "../../contexts/translate/index.jsx";
import SaveFilter from "./SaveFilter";
import SavedFilters from "./SavedFilters";

export default function DemandFilter(props) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const [isSaveFilterOpen, setIsSaveFilterOpen] = useState(false);
  const [anchorElSaveFilter, setAnchorElSaveFilter] = useState(null);
  const [newFilterTitle, setNewFilterTitle] = useState("");

  const translate = TranslationJSON;
  const [language] = useContext(TranslateContext);
  const filterTranslate = TranslationJSON.filterComponents;

  // Filter variables
  const [requester, setRequester] = useState("");
  const [demandStatus, setDemandStatus] = useState("");
  // Demand value
  const [value, setValue] = useState("");
  const [endValue, setEndValue] = useState("");
  // Score
  const [score, setScore] = useState("");
  const [endScore, setEndScore] = useState("");

  const [title, setTitle] = useState("");
  const [responsibleAnalyst, setResponsibleAnalyst] = useState("");
  const [responsibleManager, setResponsibleManager] = useState("");
  const [approvalForum, setApprovalForum] = useState("");
  const [department, setDepartment] = useState("");
  // Demand size
  const [demandSize, setDemandSize] = useState("");
  const [endDemandSize, setEndDemandSize] = useState("");

  const [PPMCode, setPPMCode] = useState("");
  const [requestNumber, setRequestNumber] = useState("");

  // User filters (DB)
  const [savedFilters, setSavedFilters] = useState([]);

  // Speech state
  const [searchSpeech, setSearchSpeech] = useState({ id: 1, text: "" });

  useEffect(() => {
    if (searchSpeech.text != "") {
      setTitle((ps) => ps + searchSpeech.text);
      setSearchSpeech({ ...searchSpeech, text: "" });
    }
  }, [searchSpeech]);

  useEffect(() => {
    getAndSetUserFilters();
  }, []);

  function getAndSetUserFilters() {
    FilterService.getUserFilters(UserUtils.getLoggedUserId())
      .then((data) => {
        console.log("User filters: ", data);
        setSavedFilters(data);
      })
      .catch((err) => {
        console.log("User filters error: ", err);
      });
  }

  function handleOpenFilter(event) {
    setAnchorEl(event.currentTarget);
    setIsFilterOpen(!isFilterOpen);
  }

  function handleCloseAndFilter(e) {
    // If the clicked target is a select, don't close the filter (Comes as body)
    if (e.target.tagName === "SELECT") return;
    if (e.target.tagName === "BODY") return;
    if (isFilterOpen) {
      setIsFilterOpen(false);
      filterDemands();
      setAnchorEl(null);
      setAnchorElSaveFilter(null);
      setIsSaveFilterOpen(false);
      setNewFilterTitle("");
    }
  }

  // USER SAVED FILTERS
  function openSaveFilter(e) {
    setAnchorElSaveFilter(e.currentTarget);
    setIsSaveFilterOpen(!isSaveFilterOpen);
    setNewFilterTitle("");
  }

  function saveNewFilter() {
    setIsSaveFilterOpen(false);
    setNewFilterTitle("");

    FilterService.saveFilter(
      newFilterTitle,
      props.filters,
      UserUtils.getLoggedUserId()
    )
      .then((res) => {
        getAndSetUserFilters();
        console.log("FIlter save response", res);
      })
      .catch((err) => {
        console.log("Filter save error", err);
      });
  }

  function deleteFilter(id) {
    FilterService.deleteFilter(id)
      .then((res) => {
        setSavedFilters(savedFilters.filter((f) => f.idFiltroDemanda != id));
      })
      .catch((err) => {
        console.log("Filter delete error", err);
      });
  }

  /**
   * { { filterBy: "nomeSolicitante", value: requester, type: "text" },
      { filterBy: "nomeGerenteResponsavelDemanda", value: responsibleManager, type: "text" },
      { filterBy: "nomeAnalistaResponsavel", value: responsibleAnalyst, type: "text" },
      { filterBy: "codigoPPMDemanda", value: PPMCode, type: "number" },
      { filterBy: "departamentoDemanda", value: department, type: "text" },
      { filterBy: "forumDeAprovacaoDemanda", value: approvalForum, type: "text" },
      { filterBy: "tamanhoDemanda", value: demandSize, type: "text" },
      { filterBy: "tituloDemanda", value: title, type: "text" },
      { filterBy: "statusDemanda", value: status, type: "text" },
      { filterBy: "custoTotalDemanda", value: value, endValue: endValue, type: "between" },
      { filterBy: "scoreDemanda", value: score, endValue: endScore, type: "between" },
      { filterBy: "idDemanda", value: requestNumber, type: "number" },} id 
   */

  function selectFilter(id) {
    cleanStates();
    console.log("ID", id);
    const filterObj = savedFilters.find((f) => f.idFiltroDemanda == id);
    console.log("Filter obj", filterObj);
    const filters = filterObj.filtros;
    console.log("Filters", filters);

    filters.forEach((f) => {
      switch (f.filterBy) {
        case "nomeSolicitante":
          setRequester(f.value);
          break;
        case "nomeGerenteResponsavelDemanda":
          setResponsibleManager(f.value);
          break;
        case "nomeAnalistaResponsavel":
          setResponsibleAnalyst(f.value);
          break;
        case "codigoPPMDemanda":
          setPPMCode(f.value);
          break;
        case "departamentoDemanda":
          setDepartment(f.value);
          break;
        case "forumDeAprovacaoDemanda":
          setApprovalForum(f.value);
          break;
        case "tamanhoDemanda":
          setDemandSize(f.value);
          break;
        case "tituloDemanda":
          setTitle(f.value);
          break;
        case "statusDemanda":
          setDemandStatus(f.value);
          break;
        case "custoTotalDemanda":
          setValue(f.value);
          setEndValue(f.endValue);
          break;
        case "scoreDemanda":
          setScore(f.value);
          setEndScore(f.endValue);
          break;
        case "idDemanda":
          setRequestNumber(f.value);
          break;
        default:
          break;
      }
    });
  }

  // FILTER STATE FUNCTIONS
  function qtyUsedFilters() {
    let qty = 0;

    if (!["", null].includes(requester)) qty++;
    if (!["", null].includes(value)) qty++;
    if (!["", null].includes(endValue)) qty++;
    if (!["", null].includes(score)) qty++;
    if (!["", null].includes(endScore)) qty++;
    if (!["", null].includes(title)) qty++;
    if (!["", null].includes(responsibleAnalyst)) qty++;
    if (!["", null].includes(responsibleManager)) qty++;
    if (!["", null].includes(approvalForum)) qty++;
    if (!["", null].includes(department)) qty++;
    if (!["", null].includes(demandSize)) qty++;
    if (!["", null].includes(PPMCode)) qty++;
    if (!["", null].includes(requestNumber)) qty++;
    if (!["", null].includes(demandStatus)) qty++;
    return qty;
  }

  function cleanStates() {
    console.log("Cleaning");
    setValue("");
    setEndValue("");
    setRequester("");
    setDemandStatus("");
    setScore("");
    setEndScore("");
    setTitle("");
    setResponsibleAnalyst("");
    setResponsibleManager("");
    setApprovalForum("");
    setDepartment("");
    setDemandSize("");
    setPPMCode("");
    setRequestNumber("");
  }

  // Quando algum campo de pesquisa é utilizado, chama essa função e atualiza o filter
  function filterDemands() {
    props.setFilters(
      DemandFilterUtils.getUpdatedFilter(
        requester,
        responsibleManager,
        responsibleAnalyst,
        PPMCode,
        department,
        approvalForum,
        demandSize,
        title,
        demandStatus,
        { value, endValue },
        { score, endScore },
        requestNumber
      )
    );
  }

  useEffect(() => {
    if (title.length > 2 || title.length === 0) {
      filterDemands();
    }
  }, [title]);

  return (
    <ClickAwayListener onClickAway={handleCloseAndFilter}>
      <div id="tutorial-filter">
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 240,
            height: 40,
          }}
          style={{
            boxShadow: "#bdbdbd 0px 1px 5px 1px",
          }}
        >
          <SearchIcon
            sx={{
              color: "#919191",
              fontSize: "20px",
              width: "25px",
            }}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

          <InputBase
            type={props.type}
            sx={{ ml: 1, flex: 1, fontSize: "13px" }}
            placeholder={translate["Procure pelo título"]?.[language]}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
            endAdornment={
              <>
                <VoiceSpeech
                  setTexto={setSearchSpeech}
                  speechId={searchSpeech.id}
                />
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                  onClick={handleOpenFilter}
                >
                  <Badge badgeContent={qtyUsedFilters()} color="info">
                    <TuneRoundedIcon
                      sx={{
                        fontSize: "20px",
                      }}
                    />
                  </Badge>
                </IconButton>
              </>
            }
          />
        </Paper>
        <Popper
          open={isFilterOpen}
          anchorEl={anchorEl}
          placement="bottom-start"
          sx={{
            display: "flex",
          }}
        >
          <Paper
            sx={{
              overflow: "auto",
              padding: 2,
              borderTop: "3px solid #0075b1",
            }}
          >
            <div className="grid gap-3">
              <FilterField
                title={
                  filterTranslate["Solicitante"]?.[language] ?? "Solicitante"
                }
                type="text"
                value={requester}
                setValue={setRequester}
              />
              <FilterField
                title={
                  (filterTranslate["Valor"]?.[language] ?? "Valor") + " (R$)"
                }
                type="between"
                value={value}
                setValue={setValue}
                endValue={endValue}
                setEndValue={setEndValue}
              />
              <FilterField
                title={filterTranslate["Score"]?.[language] ?? "Score"}
                type="between"
                value={score}
                setValue={setScore}
                endValue={endScore}
                setEndValue={setEndScore}
              />
              <FilterField
                title={filterTranslate["Título"]?.[language] ?? "Título"}
                type="text"
                value={title}
                setValue={setTitle}
              />
              <FilterField
                title={
                  filterTranslate["Status da demanda"]?.[language] ??
                  "Status da demanda"
                }
                type="select"
                options={DemandFilterUtils.getDemandStatusOptions()}
                value={demandStatus}
                setValue={setDemandStatus}
              />
              <FilterField
                title={
                  filterTranslate["Analista responsável"]?.[language] ??
                  "Analista responsável"
                }
                type="text"
                value={responsibleAnalyst}
                setValue={setResponsibleAnalyst}
              />
              <FilterField
                title={
                  filterTranslate["Gerente responsável"]?.[language] ??
                  "Gerente responsável"
                }
                type="text"
                value={responsibleManager}
                setValue={setResponsibleManager}
              />
              <FilterField
                title={
                  filterTranslate["Fórum de aprovação"]?.[language] ??
                  "Fórum de aprovação"
                }
                type="text"
                value={approvalForum}
                setValue={setApprovalForum}
              />
              <FilterField
                title={
                  filterTranslate["Departamento"]?.[language] ?? "Departamento"
                }
                type="text"
                value={department}
                setValue={setDepartment}
              />
              <FilterField
                title={
                  filterTranslate["Tamanho da demanda"]?.[language] ??
                  "Tamanho da demanda"
                }
                type="text"
                value={demandSize}
                setValue={setDemandSize}
              />
              <FilterField
                title={
                  filterTranslate["Código PPM"]?.[language] ?? "Código PPM"
                }
                type="number"
                value={PPMCode}
                setValue={setPPMCode}
              />
              <FilterField
                title={
                  filterTranslate["Número da solicitação"]?.[language] ??
                  "Número da solicitação"
                }
                type="number"
                value={requestNumber}
                setValue={setRequestNumber}
              />
              <div className="flex items-center justify-center gap-16 p-3">
                <Button
                  variant="contained"
                  sx={{
                    width: "100%",
                    backgroundColor: "#c2bebe",
                    color: "white",

                    "&:hover": {
                      backgroundColor: "#c2bebe",
                    },
                  }}
                  onClick={cleanStates}
                >
                  {translate["Limpar"]?.[language] ?? "Limpar"}
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    width: "50%",
                    backgroundColor: "transparent",
                    color: "#0075b1",
                    display: "flex",
                    justifyContent: "space-evenly",

                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                  }}
                  onClick={openSaveFilter}
                >
                  {translate["Salvar"]?.[language] ?? "Salvar"}
                  <BookmarkIcon />
                </Button>
                <Button
                  onClick={handleCloseAndFilter}
                  variant="contained"
                  sx={{
                    width: "100%",
                    backgroundColor: "#0075b1",
                    color: "white",

                    "&:hover": {
                      backgroundColor: "#0075b1",
                    },
                  }}
                >
                  {translate["Filtrar"]?.[language] ?? "Filtrar"}
                </Button>
              </div>
            </div>
          </Paper>
          <SavedFilters
            selectFilter={selectFilter}
            deleteFilter={deleteFilter}
            filters={savedFilters}
          />
          <SaveFilter
            isSaveFilterOpen={isSaveFilterOpen}
            setIsSaveFilterOpen={setIsSaveFilterOpen}
            saveNewFilter={saveNewFilter}
            anchorElSaveFilter={anchorElSaveFilter}
            newFilterTitle={newFilterTitle}
            setNewFilterTitle={setNewFilterTitle}
          />
        </Popper>
      </div>
    </ClickAwayListener>
  );
}
