import AtaFilter from "../AtaFilter";

//Translation
import TranslationJSON from "../../API/Translate/components/subHeaderAtas.json";
import TranslateUtils from "../../utils/Translate-Utils/index.js";
import { useContext } from "react";
import { TranslateContext } from "../../contexts/translate/index.jsx";

// MUI
import MuiButton from "@mui/material/Button";
import { styled } from "@mui/material/styles";


export default function SubHeaderAtas(props) {
  const translate = TranslationJSON;
  const [language] = useContext(TranslateContext);

  const Button = styled(MuiButton)(() => ({
    backgroundColor: "#0075B1",
    height: "2.2rem",
    width: "6rem",
    "&:hover": {
      backgroundColor: "#0075B1",
    },
    color: "#FFF",
    fontWeight: "demibold",
  }));

  return (
    <div>
      <div className="flex h-[5rem] items-center justify-between shadow-page-title-shadow">
        <h1 className="ml-[8rem] font-roboto text-3xl font-bold text-dark-blue-weg">
          {translate["Atas Registradas"]?.[language]} {props.isAtaForDG && "DG"}
        </h1>

        <div className="mr-10 flex gap-16">
          <div className="flex justify-end">
            <div className="flex justify-between items-center w-56">
              <Button
              onClick={() => {props.setIsAtaForDG(false)}}
                sx={{ backgroundColor: props.isAtaForDG ? "lightgray" : "" }}
              >
                <p>Atas</p>
              </Button>
              <Button
                onClick={() => {props.setIsAtaForDG(true)}}
                sx={{ backgroundColor: !props.isAtaForDG ? "lightgray" : "" }}
              >
                <p>Atas DG</p>
              </Button>
            </div>
          </div>
          <AtaFilter setFilters={props.setFilters} />
        </div>
      </div>
    </div>
  );
}
