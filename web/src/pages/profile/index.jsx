import ProfilePic from "../../assets/profile-pic.png";
import { useEffect, useState, useContext } from "react";
import { useNavigate} from "react-router-dom"

//MUI
import { Avatar, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiButton from "@mui/material/Button";
import HelpIcon from '@mui/icons-material/HelpCenterRounded';

// Utils
import UserUtils from "../../utils/User-Utils";
import FontSizeUtils from "../../utils/FontSize-Utils";

//Components
import ProfileRow from "../../Components/Profile-row";

import "../../styles/index.css";

//Translation
import TranslationJson from "../../API/Translate/pages/profile/profile.json"
import { TranslateContext } from "../../contexts/translate/index";
import { Launch } from "@mui/icons-material";

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


export default function Perfil(props) {

  const translate = TranslationJson;
  const [language] = useContext(TranslateContext);

  const [user, setUser] = useState(UserUtils.getLoggedUser());

  const [fonts, setFonts] = useState(FontSizeUtils.getFontSizes());

  const navigate = useNavigate();

  useEffect(() => {
    setFonts(FontSizeUtils.getFontSizes());
  }, [FontSizeUtils.getFontControl()]);

  const restartTutorial = () => {
    localStorage.setItem('tutorial', 'true');
    navigate('/demandas')
  }

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

  return (
    <div>
      <div className="flex h-[5rem] items-center justify-start shadow-page-title-shadow">
        <h1 className="ml-7 mt-2 font-roboto text-3xl font-bold text-[#023A67]">
          {translate["Meu perfil"]?.[language] ?? "Meu perfil"}
        </h1>
      </div>
      <div className="ml-10 mt-10 flex gap-10 font-roboto">
        <div className="grid h-5 gap-3 ">
          {userAvatar().foto ? (
            <Avatar
              src={"data:image/png;base64," + userAvatar().src}
              sx={{
                width: 150,
                height: 150,
              }}
            />
          ) : (
            <Avatar
              sx={{ bgcolor: "#023A67", width: 150, height: 150, fontSize: 50 }}
            >
              {userAvatar().src}
            </Avatar>
          )}
          {/* <Button
            style={{ fontSize: fonts.xs }}
            variant="outlined"
            component="label"
          >
            {translate["Enviar imagem"]?.[language] ?? "Enviar imagem"}
            <input hidden accept="image/*" multiple type="file" />
          </Button> */}
          <div className="mt-5 flex items-center" style={{ fontSize: fonts.sm }}>
            <Button
              onClick={() => restartTutorial()}
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}
            >
              <HelpIcon sx={{ fontSize: '20px' }} />
              <p>{translate['Reiniciar tutorial']?.[language] ?? 'Reiniciar tutorial'}</p>
            </Button>
          </div>
        </div>
        <div className="grid w-[50vw] gap-16">
          <div>
            <h1 style={{ fontSize: fonts.base }} className="mb-2 font-semibold">
              {translate["Dados pessoais"]?.[language] ?? "Dados pessoais"}
            </h1>
            <ProfileRow
              topLine={true}
              topic={translate["Nome"]?.[language] ?? "Nome"}
              content={user.nomeUsuario}
            />
            <ProfileRow topLine={false} topic={translate["Telefone"]?.[language] ?? "Telefone"} phone={true} />
          </div>
          <div>
            <h1
              style={{ fontSize: fonts.base }}
              className="mb-2 mt-5 font-semibold"
            >
              {translate["Dados da empresa - WEG"]?.[language] ?? "Dados da empresa - WEG"}
            </h1>
            <ProfileRow
              topLine={true}
              topic={translate["Departamento"]?.[language] ?? "Departamento"}
              content={user.departamentoUsuario}
            />
            <ProfileRow
              topLine={false}
              topic={translate["Setor"]?.[language] ?? "Setor"}
              content={user.businessUnity.replace(/\+/g, ' ')}
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
              topic={translate["Tamanho da fonte"]?.[language] ?? "Tamanho da fonte"}
              increaseFontSize={true}
            />
            <ProfileRow
              topLine={false}
              topic={translate["Tradutor de Libras"]?.[language] ?? "Tradutor de Libras"}
              useSwitch={true}
              enableAccessibility={props.enableVLibras}
              isAccessibilityEnabled={props.isVLibrasEnabled}
            />
            <ProfileRow
              topLine={false}
              topic={translate["Leitor de texto"]?.[language] ?? "Leitor de texto"}
              useSwitch={true}
              enableAccessibility={props.enableTextToVoice}
              isAccessibilityEnabled={props.isTextToVoiceEnabled}
              helperText={translate["Selecione um texto para ouvir"]?.[language] ?? "Selecione um texto para ouvir"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
