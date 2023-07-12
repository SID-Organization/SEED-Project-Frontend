import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";

//MUI
import { Avatar, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiButton from "@mui/material/Button";
import HelpIcon from "@mui/icons-material/HelpCenterRounded";

// Utils
import UserUtils from "../../../utils/User-Utils";
import FontSizeUtils from "../../../utils/FontSize-Utils";

//Components
import ProfileRow from "../../../Components/Profile-row";

import "../../../styles/index.css";

//Translation
import TranslationJson from "../../../API/Translate/pages/profile/profile.json";
import { TranslateContext } from "../../../contexts/translate/index";
import Graph from "../graph";

const Button = styled(MuiButton)(() => ({
  background: "transparent",
  border: "1px solid #0075B1",
  borderRadius: "5px",
  color: "#0075B1",
  height: "2rem",
  width: "11rem",
  fontSize: "0.8rem",

  "&:hover": {
    background: "#0075B1",
    color: "#fff",
  },
}));

export default function ManagerProfile(props) {
  const translate = TranslationJson;
  const [language] = useContext(TranslateContext);

  const [user, setUser] = useState(UserUtils.getLoggedUser());

  const [fonts, setFonts] = useState(FontSizeUtils.getFontSizes());

  const [profilePage, setProfilePage] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setFonts(FontSizeUtils.getFontSizes());
  }, [FontSizeUtils.getFontControl()]);

  const restartTutorial = () => {
    localStorage.setItem("tutorial", "true");
    navigate("/demandas");
  };

  // Seta o avatar do usuário
  const userAvatar = () => {
    if (user.fotoUsuario) {
      return { foto: true, src: user.fotoUsuario };
    } else {
      return {
        foto: false,
        src: user.nomeUsuario
          .split(" ")
          .map((nome) => nome[0])
          .join(""),
      };
    }
  };

  const returnProfile = () => {
    return (
      <>
        <div>
          <div className="ml-10 mt-10 flex gap-10 font-roboto">
            <div className="grid w-[50vw] gap-16">
              <div>
                <h1
                  style={{ fontSize: fonts.base }}
                  className="mb-2 font-semibold"
                >
                  {translate["Dados pessoais"]?.[language] ?? "Dados pessoais"}
                </h1>
                <ProfileRow
                  topLine={true}
                  topic={translate["Nome"]?.[language] ?? "Nome"}
                  content={user.nomeUsuario}
                />
                <ProfileRow
                  topLine={false}
                  topic={translate["Telefone"]?.[language] ?? "Telefone"}
                  phone={true}
                />
              </div>
              <div>
                <h1
                  style={{ fontSize: fonts.base }}
                  className="mb-2 mt-5 font-semibold"
                >
                  {translate["Dados da empresa - WEG"]?.[language] ??
                    "Dados da empresa - WEG"}
                </h1>
                <ProfileRow
                  topLine={true}
                  topic={
                    translate["Departamento"]?.[language] ?? "Departamento"
                  }
                  content={user.departamentoUsuario}
                />
                <ProfileRow
                  topLine={false}
                  topic={translate["Setor"]?.[language] ?? "Setor"}
                  content={user.businessUnity.replace(/\+/g, " ")}
                />
              </div>
              <div>
                <h1
                  style={{ fontSize: fonts.base }}
                  className="mb-2 mt-5 font-semibold"
                >
                  {translate["Acessibilidade"]?.[language] ?? "Acessibilidade"}
                </h1>
                <ProfileRow
                  topLine={true}
                  topic={
                    translate["Tamanho da fonte"]?.[language] ??
                    "Tamanho da fonte"
                  }
                  increaseFontSize={true}
                />
                <ProfileRow
                  topLine={false}
                  topic={
                    translate["Tradutor de Libras"]?.[language] ??
                    "Tradutor de Libras"
                  }
                  useSwitch={true}
                  enableAccessibility={props.enableVLibras}
                  isAccessibilityEnabled={props.isVLibrasEnabled}
                />
                <ProfileRow
                  topLine={false}
                  topic={
                    translate["Leitor de texto"]?.[language] ??
                    "Leitor de texto"
                  }
                  useSwitch={true}
                  enableAccessibility={props.enableTextToVoice}
                  isAccessibilityEnabled={props.isTextToVoiceEnabled}
                  helperText={
                    translate["Selecione um texto para ouvir"]?.[language] ??
                    "Selecione um texto para ouvir"
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  console.log("USER: ", user);
  return (
    <>
      <div className="flex h-[5rem] items-center justify-start shadow-page-title-shadow">
        <h1 className="ml-7 mt-2 font-roboto text-3xl font-bold text-[#023A67]">
          {profilePage
            ? translate["Meu perfil"]?.[language] ?? "Meu perfil"
            : translate["Análise"]?.[language] ?? "Análise"}
        </h1>
      </div>
      <div className="ml-10 mt-10 flex">
        <div className="grid h-5 gap-3">
          <div>
            {userAvatar().foto ? (
              <Avatar
                src={"data:image/png;base64," + userAvatar().src}
                sx={{
                  width: 150,
                  height: 150,
                }}
              />
            ) : (
              <div>
                <Avatar
                  sx={{
                    bgcolor: "#023A67",
                    width: 150,
                    height: 150,
                    fontSize: 50,
                  }}
                >
                  {userAvatar().src}
                </Avatar>
              </div>
            )}
          </div>
          <Button
            onClick={() => restartTutorial()}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <HelpIcon sx={{ fontSize: "20px" }} />
            <p>
              {translate["Reiniciar tutorial"]?.[language] ??
                "Reiniciar tutorial"}
            </p>
          </Button>
        </div>
        <div className="flex items-center">
          <Button
            variant="outlined"
            onClick={() => setProfilePage(true)}
            sx={{
              width: "7rem",
              textDecoration: profilePage ? "underline" : "none",
              fontWeight: profilePage ? "bold" : "normal",
              border: "none",
              color: profilePage ? "#0075B1" : "#929292",
              "&:hover": {
                background: "transparent",
                textDecoration: profilePage ? "underline" : "none",
                color: "#0075B1",
                border: "none",
              },
            }}
          >
            {translate["Perfil"]?.[language] ?? "Perfil"}
          </Button>
          <Button
            onClick={() => setProfilePage(false)}
            sx={{
              width: "7rem",
              textDecoration: !profilePage ? "underline" : "none",
              fontWeight: !profilePage ? "bold" : "normal",
              border: "none",
              color: !profilePage ? "#0075B1" : "#929292",
              "&:hover": {
                background: "transparent",
                textDecoration: !profilePage ? "underline" : "none",
                color: "#0075B1",
                border: "none",
              },
            }}
          >
            {translate["Análise"]?.[language] ?? "Análise"}
          </Button>
        </div>
      </div>

      <div className="ml-56">
        {profilePage ? (
          returnProfile()
        ) : (
          <div>
            <Graph />
          </div>
        )}
      </div>
    </>
  );
}
