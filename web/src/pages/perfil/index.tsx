import ProfilePic from "../../assets/profile-pic.png";
import MuiButton from "@mui/material/Button";
import { useState } from "react";
import { styled } from "@mui/material/styles";

import "../../styles/index.css";

export default function Perfil() {
  const [isEditMode, setIsEditMode] = useState(true);
  const [buttonEdit, setButtonEdit] = useState("Editar perfil");
  const [userName, setUserName] = useState("Gustavo Santos");
  const [sector, setSector] = useState("WEG Digital Solutions");
  const [city, setCity] = useState("Jaraguá do Sul, Brazil");

  const Button = styled(MuiButton)({
    background: "transparent",
    border: "1px solid #0075B1",
    borderRadius: "5px",
    color: "#0075B1",
    height: "2.5rem",
    width: "10.5rem",
    fontSize: "0.8rem",

    "&:hover": {
      background: "#0075B1",
      color: "#fff",
    },
  });

  const ButtonClicked = styled(MuiButton)({
    background: "#0075B1",
    borderRadius: "5px",
    color: "#FFF",
    height: "2.5rem",
    width: "10.5rem",
    fontSize: "0.8rem",

    "&:hover": {
      background: "#0089ce",
    },
  });

  return (
    <div>
      <div className="flex justify-start items-center shadow-page-title-shadow h-[5rem]">
        <h1 className="text-[#023A67] font-bold text-3xl font-roboto ml-7 mt-2">
          Meu perfil
        </h1>
      </div>
      <div className="grid gap-8">
        <div className="flex justify-center items-center mt-9">
          <img
            src={ProfilePic}
            alt="Foto de perfil"
            className="rounded-full w-60 h-60"
          />
        </div>
        <div className="flex justify-center flex-wrap mt-2">
          <div className="grid text-center mr-16">
            <h1 className="text-[#0075B1] font-bold text-xl font-roboto">10</h1>
            <h1 className="text-black font-bold text-lg font-roboto opacity-50">
              Demandas criadas
            </h1>
          </div>
          <div className="grid text-center mr-16">
            <h1 className="text-[#0075B1] font-bold text-xl font-roboto">5</h1>
            <h1 className="text-black font-bold text-lg font-roboto opacity-50">
              Demandas aceitas
            </h1>
          </div>
          <div className="grid text-center">
            <h1 className="text-[#0075B1] font-bold text-xl font-roboto">5</h1>
            <h1 className="text-black font-bold text-lg font-roboto opacity-50">
              Demandas canceladas
            </h1>
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <div className={`grid justify-center gap-[-1rem]`}>
            <input
              className={
                `text-dark-blue-weg font-bold text-2xl font-roboto
              outline-dark-blue-weg p-4 h-7 w-[14rem] ` +
                (isEditMode ? "" : "border-[1px] border-dark-blue-weg rounded")
              }
              disabled={isEditMode}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              className={
                `text-[#7c7c7c] font-bold text-base font-roboto
              outline-dark-blue-weg p-4 h-7 w-[14rem] ` +
                (isEditMode ? "" : "border-[1px] border-dark-blue-weg rounded")
              }
              disabled={isEditMode}
              value={sector}
              onChange={(e) => setSector(e.target.value)}
            />
            <input
              className={
                `text-[#7c7c7c] font-bold text-base font-roboto
              outline-dark-blue-weg p-4 h-7 w-[14rem] ` +
                (isEditMode ? "" : "border-[1px] border-dark-blue-weg rounded")
              }
              disabled={isEditMode}
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          {isEditMode ? (
            <Button
              variant="outlined"
              onClick={() => {
                setIsEditMode(false);
                setButtonEdit("Salvar");
              }}
            >
              {buttonEdit}
            </Button>
          ) : (
            <ButtonClicked
              variant="outlined"
              onClick={() => {
                setIsEditMode(true);
                setButtonEdit("Editar perfil");
              }}
            >
              {buttonEdit}
            </ButtonClicked>
          )}
        </div>
      </div>
    </div>
  );
}
