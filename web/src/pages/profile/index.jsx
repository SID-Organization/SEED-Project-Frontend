import ProfilePic from "../../assets/profile-pic.png";
import { useEffect, useState } from "react";

//MUI
import { Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiButton from "@mui/material/Button";

// Utils
import UserUtils from "../../utils/User-Utils";
import FontSizeUtils from "../../utils/FontSize-Utils";

//Components
import ProfileRow from "../../Components/Profile-row";

import "../../styles/index.css";

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

export default function Perfil() {
  const [user, setUser] = useState(UserUtils.getLoggedUser());

  const [fonts, setFonts] = useState(FontSizeUtils.getFontSizes());

  useEffect(() => {
    setFonts(FontSizeUtils.getFontSizes());
  }, [FontSizeUtils.getFontControl()]);

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
          Meu perfil
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
          <Button
            style={{ fontSize: fonts.xs }}
            variant="outlined"
            component="label"
          >
            Enviar imagem
            <input hidden accept="image/*" multiple type="file" />
          </Button>
        </div>
        <div className="grid w-[50vw] gap-16">
          <div>
            <h1 style={{ fontSize: fonts.base }} className="mb-2 font-semibold">
              Dados pessoais
            </h1>
            <ProfileRow
              topLine={true}
              topic={"Nome"}
              content={user.nomeUsuario}
            />
            <ProfileRow topLine={false} topic={"Telefone"} phone={true} />
          </div>
          <div>
            <h1
              style={{ fontSize: fonts.base }}
              className="mb-2 mt-5 font-semibold"
            >
              Dados da empresa - WEG
            </h1>
            <ProfileRow
              topLine={true}
              topic={"Departamento"}
              content={user.departamentoUsuario}
            />
            <ProfileRow
              topLine={false}
              topic={"Setor"}
              content={user.businessUnity}
            />
          </div>
          <div>
            <h1
              style={{ fontSize: fonts.base }}
              className="mb-2 mt-5 font-semibold"
            >
              Acessibilidade
            </h1>
            <ProfileRow
              topLine={true}
              topic={"Tamanho da fonte"}
              increaseFontSize={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
