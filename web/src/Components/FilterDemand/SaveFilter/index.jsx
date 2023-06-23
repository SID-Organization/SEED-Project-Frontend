import { useContext, useState } from "react";

// MUI
import { IconButton, Paper, Popper, TextField, Tooltip } from "@mui/material";
import BookmarkAddIcon from '@mui/icons-material/BookmarkAddRounded';
import CloseIcon from '@mui/icons-material/CloseRounded';

// Traslation
import TranslationJson from "../../../API/Translate/components/demandFilter.json";
import { TranslateContext } from "../../../contexts/translate/index.jsx";
import { useEffect } from "react";


export default function SaveFilter(props) {

    const translate = TranslationJson.saveFilter;
    const [language] = useContext(TranslateContext);

    const [helperText, setHelperText] = useState("");

    const saveNewFilter = () => {
        if(props.newFilterTitle == "") {
            setHelperText(translate["Digite um nome para o filtro"]?.[language] ?? "Digite um nome para o filtro");
            return;
        };
        setHelperText("");
        props.saveNewFilter();
    }

    useEffect(() => {
        setHelperText("");
    }, [props.isSaveFilterOpen])

    return (
        <Popper
            open={props.isSaveFilterOpen}
            anchorEl={props.anchorElSaveFilter}
            placement="bottom-end"
        >
            <Paper
                sx={{
                    overflow: "auto",
                    padding: 2,
                    borderTop: "3px solid #0075b1",
                }}
            >
                <div className="grid gap-3">
                    <div className="text-light-blue-weg flex justify-between">
                        <p className="w-[13rem] text-lg text-light-blue-weg">{translate["Nomeie o filtro"]?.[language] ?? "Nomeie o filtro"}</p>
                        <div className="">
                            <Tooltip title={translate["Salvar filtro"]?.[language] ?? "Salvar filtro"}>
                                <IconButton onClick={() => saveNewFilter()}>
                                    <BookmarkAddIcon sx={{ color: "#0075B1" }} />
                                </IconButton>
                            </Tooltip>
                            <IconButton onClick={() => props.setIsSaveFilterOpen(false)}>
                                <CloseIcon sx={{ color: "#0075B1" }} />
                            </IconButton>
                        </div>
                    </div>
                    <TextField
                        id="outlined-basic"
                        label={translate["Nome do filtro"]?.[language] ?? "Nome do filtro"}
                        variant="outlined"
                        type="text"
                        autoComplete="off"
                        helperText={helperText}
                        error={helperText != ""}
                        value={props.newFilterTitle}
                        onChange={(e) => props.setNewFilterTitle(e.target.value)}
                    />
                </div>
            </Paper>
        </Popper>
    )
}