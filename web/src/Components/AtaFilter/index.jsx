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

// Utils
import FontSizeUtils from "../../utils/FontSize-Utils";

//Translation
import TranslationJson from "../../API/Translate/components/ataFilter.json";
import { TranslateContext } from "../../contexts/translate/index.jsx";

// Components
import FilterField from "../FilterField";


export default function AtaFilter(props) {

    const translate = TranslationJson;
    const [language] = useContext(TranslateContext);


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

    const [fonts, setFonts] = useState(FontSizeUtils.getFontSizes());

    useEffect(() => {
        setFonts(FontSizeUtils.getFontSizes());
    }, [FontSizeUtils.getFontControl()])

    // Filters
    const [meetingDate, setMeetingDate] = useState();
    const [meetingTimeStart, setMeetingTimeStart] = useState();
    const [meetingTimeEnd, setMeetingTimeEnd] = useState();
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
                <Button
                    type="button"
                    sx={{ p: "10px" }}
                    aria-label="search"
                    variant="outlined"
                    onClick={handleOpenFilter}
                >
                    <p
                        style={{
                            fontSize: fonts.sm
                        }}
                        className='mr-2 text-light-blue-weg'
                    >
                        {translate["Filtro"]?.[language] ?? "Filtro"}
                    </p>
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
                </Button>
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
                            <FilterField
                                title={translate["Data da Reunião"]?.[language] ?? "Data da Reunião"}
                                type="date"
                                value={meetingDate}
                                setValue={setMeetingDate}
                            />
                            <FilterField
                                title={translate["Horário Início"]?.[language] ?? "Horário Início"}
                                type="time"
                                value={meetingTimeStart}
                                setValue={setMeetingTimeStart}
                            />
                            <FilterField
                                title={translate["Horário Término"]?.[language] ?? "Horário Término"}
                                type="time"
                                value={meetingTimeEnd}
                                setValue={setMeetingTimeEnd}
                            />
                            <FilterField
                                title={translate["Qtd. de Propostas"]?.[language] ?? "Qtd. de Propostas"}
                                type="number"
                                value={qtyProposals}
                                setValue={setQtyProposals}
                            />
                            <FilterField
                                title={translate["Fórum de Aprovação"]?.[language] ?? "Fórum de Aprovação"}
                                type="text"
                                value={approvalForum}
                                setValue={setApprovalForum}
                            />
                            <FilterField
                                title={translate["Analista Responsável"]?.[language] ?? "Analista Responsável"}
                                type="text"
                                value={responsibleAnalyst}
                                setValue={setResponsibleAnalyst}
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
                </Popper>
            </div>
        </ClickAwayListener>
    );
}