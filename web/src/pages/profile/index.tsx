import ProfilePic from "../../assets/profile-pic.png";
import Button from "@mui/material/Button";
import { useState } from "react";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

import "../../styles/index.css";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import LoggedUserInterface from "../../Interfaces/user/LoggedUserInterface";

export default function Perfil() {
  const [phoneNumber, setPhoneNumber] = useState("+55 (47) 99123-2134");
  const [isEditOn, setIsEditOn] = useState(false);
  const [user, setUser] = useState<LoggedUserInterface>(
    JSON.parse(localStorage.getItem("user")!)
  );
  // Seta o avatar do usuário
  const userAvatar = () => {
    if (user.fotoUsuario) {
      return { foto: true, src: user.fotoUsuario };
    } else {
      return {
        foto: false,
        src: user.nomeUsuario.split(" ").map(nome => nome[0]).join("")
      };
    }
  };
  return (
    <div>
      <div className="flex justify-start items-center shadow-page-title-shadow h-[5rem]">
        <h1 className="text-[#023A67] font-bold text-3xl font-roboto ml-7 mt-2">
          Meu perfil
        </h1>
      </div>
      <div className="flex font-roboto gap-10 ml-10 mt-10">
        <div className="grid h-5 gap-3 ">
          {userAvatar().foto
            ? <Avatar
                src={"data:image/png;base64," + userAvatar().src}
                sx={{
                  width: 150,
                  height: 150
                }}
              />
            : <Avatar
                sx={{ bgcolor: "#023A67", width: 150, height: 150, fontSize: 50 }}
              >
                {userAvatar().src}
              </Avatar>}
          <Button
            variant="outlined"
            component="label"
            sx={{
              background: "transparent",
              border: "1px solid #0075B1",
              borderRadius: "5px",
              color: "#0075B1",
              height: "2rem",
              width: "9rem",
              fontSize: "0.8rem",

              "&:hover": {
                background: "#0075B1",
                color: "#fff"
              }
            }}
          >
            Enviar imagem
            <input hidden accept="image/*" multiple type="file" />
          </Button>
        </div>
        <div className="grid">
          <h1 className="font-semibold mb-2">Dados pessoais</h1>
          <div>
            <div className="border-y-[1px] border-[#808080] w-[50rem] flex items-center gap-10 ">
              <h1 className="m-4 font-bold">Nome </h1>
              <span className="font-normal text-[#6C6C6C] ">
                {user.nomeUsuario}
              </span>{" "}
            </div>
            <div className="border-b-[#808080] border-b-[1px] mb-20 flex items-center gap-10 ">
              <h1 className="m-4 font-bold">Telefone </h1>
              <input
                type="text"
                value={phoneNumber}
                disabled={!isEditOn}
                onChange={e => setPhoneNumber(e.target.value)}
                className={
                  `font-normal text-[#6C6C6C]` +
                  (isEditOn
                    ? " border-b-[1px] border-[#0075B1] outline-none"
                    : "")
                }
              />

              <div className="flex justify-end">
                <IconButton onClick={() => setIsEditOn(!isEditOn)}>
                  {isEditOn
                    ? <Tooltip title="Salvar alterações">
                        <CheckRoundedIcon
                          className="cursor-pointer"
                          sx={{
                            color: "#000",
                            transition: "0.3s",
                            "&:hover": {
                              color: "#0075B1"
                            }
                          }}
                        />
                      </Tooltip>
                    : <Tooltip title="Editar telefone">
                        <EditRoundedIcon
                          className="cursor-pointer"
                          sx={{
                            color: "#000",
                            transition: "0.3s",
                            "&:hover": {
                              color: "#0075B1"
                            }
                          }}
                        />
                      </Tooltip>}
                </IconButton>
              </div>
            </div>
          </div>
          <h1 className="mt-5 mb-2 font-semibold">Dados da empresa - WEG</h1>
          <div>
            <div className="border-y-[1px] border-[#808080] flex items-center gap-10  ">
              <h1 className="m-4 font-bold">Departamento </h1>
              <span className="font-normal text-[#6C6C6C]">
                {user.businessUnity}
              </span>{" "}
            </div>
            <div className="border-b-[#808080] border-b-[1px] flex items-center gap-10 ">
              <h1 className="m-4 font-bold">Setor </h1>
              <span className="font-normal text-[#6C6C6C]">
              {user.departamentoUsuario}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
