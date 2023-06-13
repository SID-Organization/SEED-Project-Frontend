import { useContext, useEffect, useRef, useState } from "react";

// MUI
import { Badge, Button, Popper } from "@mui/material";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import ClickAwayListener from "@mui/material/ClickAwayListener";

// Components
import FilterComponent from "./FilterComponent";
import DemandFilterUtils from "../../utils/DemandFilter-Utils";

// Voice Speech
import VoiceSpeech from "../VoiceSpeech";
import TranslateUtils from "../../utils/Translate-Utils";

// Translation
import TranslationJSON from "../../API/Translate/components/demandFilter.json";
import { TranslateContext } from "../../contexts/translate/index.jsx";


export default function Search(props) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  // Used to not active clickaway
  const selectRef = useRef(null);

  const translate = TranslationJSON;
  const componentTranslate = TranslationJSON.filterComponents;
  const [ language ] = useContext(TranslateContext);

  // Filters
  const [requester, setRequester] = useState("");
  const [demandStatus, setDemandStatus] = useState("");
  const [value, setValue] = useState("");
  const [score, setScore] = useState("");
  const [title, setTitle] = useState("");
  const [responsibleAnalyst, setResponsibleAnalyst] = useState("");
  const [responsibleManager, setResponsibleManager] = useState("");
  const [approvalForum, setApprovalForum] = useState("");
  const [department, setDepartment] = useState("");
  const [demandSize, setDemandSize] = useState("");
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

  function handleCloseAndFilter() {
    if (isFilterOpen) {
      setIsFilterOpen(false);
      filterDemands();
    }
  }

  function qtyUsedFilters() {
    let qty = 0;

    if (requester != "") qty++;
    if (value != "") qty++;
    if (score != "") qty++;
    if (title != "") qty++;
    if (responsibleAnalyst != "") qty++;
    if (responsibleManager != "") qty++;
    if (approvalForum != "") qty++;
    if (department != "") qty++;
    if (demandSize != "") qty++;
    if (PPMCode != "") qty++;
    if (requestNumber != "") qty++;

    return qty;
  }

  function cleanStates() {
    setRequester("");
    setDemandStatus([]);
    setValue("");
    setScore("");
    setTitle("");
    setResponsibleAnalyst("");
    setResponsibleManager("");
    setApprovalForum("");
    setDepartment("");
    setDemandSize("");
    setPPMCode("");
    setRequestNumber("");
    setIsFilterOpen(false);
  }

  // Quando algum campo de pesquisa é utilizado, chama essa função e atualiza o filter
  function filterDemands() {
    console.log('StatusDemanda', demandStatus);
    // props.setFilters(
    //   DemandFilterUtils.getUpdatedFilter(
    //     requester,
    //     responsibleManager,
    //     responsibleAnalyst,
    //     PPMCode,
    //     department,
    //     approvalForum,
    //     demandSize,
    //     title,
    //     value,
    //     score,
    //     requestNumber
    //   ))
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
                    color="error"
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
        >
          <Paper
            sx={{
              overflow: "auto",
              padding: 2,
              borderTop: "3px solid #0075b1",
            }}
          >
            <div className="grid gap-3">
              <FilterComponent
                title={componentTranslate["Solicitante"]?.[language]}
                type="text"
                value={requester}
                setValue={setRequester}
              />
              <FilterComponent
                title={componentTranslate["Valor"]?.[language]}
                type="number"
                value={value}
                setValue={setValue}
              />
              <FilterComponent
                title={componentTranslate["Score"]?.[language]}
                type="number"
                value={score}
                setValue={setScore}
              />
              <FilterComponent
                title={componentTranslate["Título"]?.[language]}
                type="text"
                value={title}
                setValue={setTitle}
              />
              <div
                ref={selectRef}
              >
                <FilterComponent
                  title={componentTranslate["Status da demanda"]?.[language]}
                  type="select"
                  options={DemandFilterUtils.getDemandStatusOptions()}
                  value={demandStatus}
                  setValue={setDemandStatus}
                />
              </div>
              <FilterComponent
                title={componentTranslate["Analista responsável"]?.[language]}
                type="text"
                value={responsibleAnalyst}
                setValue={setResponsibleAnalyst}
              />
              <FilterComponent
                title={componentTranslate["Gerente responsável"]?.[language]}
                type="text"
                value={responsibleManager}
                setValue={setResponsibleManager}
              />
              <FilterComponent
                title={componentTranslate["Fórum de aprovação"]?.[language]}
                type="text"
                value={approvalForum}
                setValue={setApprovalForum}
              />
              <FilterComponent
                title={componentTranslate["Departamento"]?.[language]}
                type="text"
                value={department}
                setValue={setDepartment}
              />
              <FilterComponent
                title={componentTranslate["Tamanho da demanda"]?.[language]}
                type="text"
                value={demandSize}
                setValue={setDemandSize}
              />
              <FilterComponent
                title={componentTranslate["Código PPM"]?.[language]}
                type="number"
                value={PPMCode}
                setValue={setPPMCode}
              />
              <FilterComponent
                title={componentTranslate["Número da solicitação"]?.[language]}
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
        </Popper>
      </div>
    </ClickAwayListener>
  );
}