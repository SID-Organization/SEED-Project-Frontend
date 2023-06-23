import { useContext } from "react";

// MUI
import { Paper } from "@mui/material";

// Components
import Filters from "./Filters";

// Translation
import TranslationJson from "../../../API/Translate/components/demandFilter.json";
import { TranslateContext } from "../../../contexts/translate/index.jsx";

export default function SavedFilters(props) {

    const translate = TranslationJson.savedFilters;
    const [language] = useContext(TranslateContext);

    return (
        <Paper
            sx={{
                width: "12rem",
                maxHeight: "40rem",
                padding: 1,
                borderTop: "3px solid #0075b1",
                borderLeft: "1px solid #0075b1",
            }}
        >
            <div className="flex items-center justify-center mb-8">
                <p className="text-light-blue-weg text-lg">
                    {translate["Filtros salvos"]?.[language] ?? "Filtros salvos"}
                </p>
            </div>
            <div className="
                h-[33rem]
                overflow-y-scroll
                scrollbar-thin
                scrollbar-thumb-[#a5a5a5]
                scrollbar-thumb-rounded-full
                scrollbar-w-2 "
            >
                {props.filters.map((filter) => (
                    <Filters
                        filter={filter}
                        selectFilter={props.selectFilter}
                        deleteFilter={props.deleteFilter}
                    />
                )
                )}
            </div>
        </Paper>
    )
}