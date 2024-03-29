import FilterAta from "../FilterAta";

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
    width: "9rem",

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
            <div className="flex w-80 items-center justify-between">
              <Button
                onClick={() => {
                  props.setIsAtaForDG(false);
                }}
                sx={{
                  backgroundColor: props.isAtaForDG ? "lightgray" : "",
                  "&:hover": {
                    backgroundColor: props.isAtaForDG ? "gray" : "#0075B1",
                  },
                }}
              >
                <p>{translate["Atas"]?.[language] ?? "Atas"}</p>
              </Button>
              <Button
                onClick={() => {
                  props.setIsAtaForDG(true);
                }}
                sx={{
                  backgroundColor: !props.isAtaForDG ? "lightgray" : "",
                  "&:hover": {
                    backgroundColor: !props.isAtaForDG ? "gray" : "#0075B1",
                  },
                }}
              >
                <p>{translate["Atas DG"]?.[language] ?? "Atas DG"}</p>
              </Button>
            </div>
          </div>
          <FilterAta setFilters={props.setFilters} />
        </div>
      </div>
    </div>
  );
}
