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
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

// Components
import FilterField from "../FilterField";
import DemandFilterUtils from "../../utils/DemandFilter-Utils";

// Voice Speech
import VoiceSpeech from "../VoiceSpeech";

// Utils
import TranslateUtils from "../../utils/Translate-Utils";

// Translation
import TranslationJSON from "../../API/Translate/components/demandFilter.json";
import { TranslateContext } from "../../contexts/translate/index.jsx";
import SaveFilter from "./SaveFilter";
import SavedFilters from "./SavedFilters";


const filtersMock = [
  {
    nomeFiltro: "Filtro 1",
    id: 1,
    filtros: [
      { filterBy: "nomeSolicitante", value: null, type: "text" },
      { filterBy: "nomeGerenteResponsavelDemanda", value: null, type: "text" },
      { filterBy: "nomeAnalistaResponsavel", value: null, type: "text" },
      { filterBy: "codigoPPMDemanda", value: null, type: "number" },
      { filterBy: "departamentoDemanda", value: null, type: "text" },
      { filterBy: "forumDeAprovacaoDemanda", value: null, type: "text" },
      { filterBy: "tamanhoDemanda", value: null, endValue: null, type: "text" },
      { filterBy: "tituloDemanda", value: null, type: "text" },
      { filterBy: "statusDemanda", value: null, type: "text" },
      { filterBy: "custoTotalDemanda", value: null, endValue: null, type: "between" },
      { filterBy: "scoreDemanda", value: 0, endValue: 150, type: "between" },
      { filterBy: "idDemanda", value: null, type: "number" },
    ]
  },
  {
    nomeFiltro: "Filtro 4",
    id: 4,
  },
  {
    nomeFiltro: "Filtro 5",
    id: 5,
  },
  {
    nomeFiltro: "Filtro 6",
    id: 6,
  },
  {
    nomeFiltro: "Filtro 7",
    id: 7,
  },
  {
    nomeFiltro: "Filtro 8",
    id: 8,
  },
  {
    nomeFiltro: "Filtro 9",
    id: 9,
  },
  {
    nomeFiltro: "Filtro 10",
    id: 10,
  },
  {
    nomeFiltro: "Filtro 11",
    id: 11,
  },
  {
    nomeFiltro: "Filtro 12",
    id: 12,
  },
  {
    nomeFiltro: "Filtro 13",
    id: 13,
  },
  {
    nomeFiltro: "Filtro 14",
    id: 14,
  },
  {
    nomeFiltro: "Filtro 15",
    id: 15,
  },
  {
    nomeFiltro: "Filtro 16",
    id: 16,
  },
  {
    nomeFiltro: "Filtro 17",
    id: 17,
  },
  {
    nomeFiltro: "Filtro 18",
    id: 18,
  },
  {
    nomeFiltro: "Filtro 19",
    id: 19,
  },
  {
    nomeFiltro: "Filtro 20",
    id: 20,
  },

]



export default function DemandFilter(props) {

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const [isSaveFilterOpen, setIsSaveFilterOpen] = useState(false);
  const [anchorElSaveFilter, setAnchorElSaveFilter] = useState(null);
  const [newFilterTitle, setNewFilterTitle] = useState("");

  const translate = TranslationJSON;
  const [language] = useContext(TranslateContext);
  const filterTranslate = TranslationJSON.filterComponents;

  // Filters
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

  // Speech state
  const [searchSpeech, setSearchSpeech] = useState({ id: 1, text: "" });

  useEffect(() => {
    if (searchSpeech.text != "") {
      setTitle(ps => ps + searchSpeech.text);
      setSearchSpeech({ ...searchSpeech, text: "" })
    }
  }, [searchSpeech])

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
    }
  }

  // USER SAVED FILTERS
  function openSaveFilter(e) {
    setAnchorElSaveFilter(e.currentTarget);
    setIsSaveFilterOpen(!isSaveFilterOpen);
  }

  function saveNewFilter() {
    console.log("Filter title: ", newFilterTitle);
    setIsSaveFilterOpen(false);
  }

  function selectFilter(id) {
    const filter = filtersMock.find(filter => filter.id === id);
    console.log("Select filter: ", filter);
  }

  // FILTER STATE FUNCTIONS
  function qtyUsedFilters() {
    let qty = 0;

    if (requester != "") qty++;
    if (value != "") qty++;
    if (endValue != "") qty++;
    if (score != "") qty++;
    if (endScore != "") qty++;
    if (title != "") qty++;
    if (responsibleAnalyst != "") qty++;
    if (responsibleManager != "") qty++;
    if (approvalForum != "") qty++;
    if (department != "") qty++;
    if (demandSize != "") qty++;
    if (PPMCode != "") qty++;
    if (requestNumber != "") qty++;
    if (demandStatus != "") qty++;
    return qty;
  }

  function cleanStates() {
    setRequester("");
    setDemandStatus("");
    setValue("");
    setEndValue("");
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
    props.setFilters(DemandFilterUtils.getEmptyFilter());
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
      ))
  };

  useEffect(() => {
    if (title.length > 2 || title.length === 0) {
      filterDemands();
    }
  }, [title])

  return (
    <ClickAwayListener onClickAway={handleCloseAndFilter}>
      <div>
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
            placeholder={translate['Procure pelo título']?.[language]}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
            endAdornment={
              <>
                <VoiceSpeech setTexto={setSearchSpeech} speechId={searchSpeech.id} />
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                  onClick={handleOpenFilter}
                >
                  <Badge
                    badgeContent={qtyUsedFilters()}
                    color="info"
                  >
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
                title={filterTranslate["Solicitante"]?.[language] ?? "Solicitante"}
                type="text"
                value={requester}
                setValue={setRequester}
              />
              <FilterField
                title={(filterTranslate["Valor"]?.[language] ?? "Valor") + " (R$)"}
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
                title={filterTranslate["Status da demanda"]?.[language] ?? "Status da demanda"}
                type="select"
                options={DemandFilterUtils.getDemandStatusOptions()}
                value={demandStatus}
                setValue={setDemandStatus}
              />
              <FilterField
                title={filterTranslate["Analista responsável"]?.[language] ?? "Analista responsável"}
                type="text"
                value={responsibleAnalyst}
                setValue={setResponsibleAnalyst}
              />
              <FilterField
                title={filterTranslate["Gerente responsável"]?.[language] ?? "Gerente responsável"}
                type="text"
                value={responsibleManager}
                setValue={setResponsibleManager}
              />
              <FilterField
                title={filterTranslate["Fórum de aprovação"]?.[language] ?? "Fórum de aprovação"}
                type="text"
                value={approvalForum}
                setValue={setApprovalForum}
              />
              <FilterField
                title={filterTranslate["Departamento"]?.[language] ?? "Departamento"}
                type="text"
                value={department}
                setValue={setDepartment}
              />
              <FilterField
                title={filterTranslate["Tamanho da demanda"]?.[language] ?? "Tamanho da demanda"}
                type="text"
                value={demandSize}
                setValue={setDemandSize}
              />
              <FilterField
                title={filterTranslate["Código PPM"]?.[language] ?? "Código PPM"}
                type="number"
                value={PPMCode}
                setValue={setPPMCode}
              />
              <FilterField
                title={filterTranslate["Número da solicitação"]?.[language] ?? "Número da solicitação"}
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
                  Limpar
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
                  Salvar
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
                  Filtrar
                </Button>
              </div>
            </div>
          </Paper>
          <SavedFilters
            selectFilter={selectFilter}
            filters={filtersMock}
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