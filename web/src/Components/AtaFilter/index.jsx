import { useContext, useEffect, useState } from "react";

// MUI
import { Badge, Button, Modal, Popper, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import ClickAwayListener from "@mui/material/ClickAwayListener";

//Translation
import TranslationJson from "../../API/Translate/components/ataFilter.json";
import { TranslateContext } from "../../contexts/translate/index.jsx";

// Components
// import FilterComponent from "./FilterComponent";


export default function AtaFilter(props) {

  const translate = TranslationJson;
  const [ language ] = useContext(TranslateContext);

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    /**
     *  - Data da reunião (<, >, =, Between (talvez))
        - Horario início (<, >, =, Between (talvez))
        - Horario termino (<, >, =, Between (talvez))
        - Forum ata (mais de 1)
        - Analista responsável
        - Qtd de propostas (<, >, =, Between (talvez))
     * 
     */

    // Filters
    const [meetingDate, setMeetingDate] = useState();
    const [meetingTime, setMeetingTime] = useState();
    const [qtyProposals, setQtyProposals] = useState();
    const [approvalForum, setApprovalForum] = useState();
    const [responsibleAnalyst, setResponsibleAnalyst] = useState();

    function handleOpenFilter(event) {
        setAnchorEl(event.currentTarget);
        setIsFilterOpen(!isFilterOpen);
    }

    function handleCloseAndFilter() {
        if (isFilterOpen) {
            setIsFilterOpen(false);
            filterAtas();
        }
    }

    function qtyUsedFilters() {
        let qty = 0;


        return qty;
    }

    function cleanStates() {
        setIsFilterOpen(false);
    }

    // Quando algum campo de pesquisa é utilizado, chama essa função e atualiza o filter
    function filterAtas() {
    };

    return (
        <ClickAwayListener onClickAway={handleCloseAndFilter}>
            <div>
                <Paper
                    sx={{
                        p: "2px 4px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                        width: 120,
                        height: 40,
                    }}
                    style={{
                        boxShadow: "#bdbdbd 0px 1px 5px 1px",
                    }}
                >
                    <Typography
                        sx={{
                            color: "#919191",
                            fontSize: "14px",
                            width: "25px",
                        }}
                    >
                      {translate["Filtro"]?.[language] ?? "Filtro"}
                    </Typography>
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <>
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
                </Paper>
                <Modal
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
                </Modal>
            </div>
        </ClickAwayListener>
    );
}