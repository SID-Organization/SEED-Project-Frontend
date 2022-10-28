import ProfilePic from "../../assets/profile-pic.png";
import EditIcon from "@mui/icons-material/Edit";
import WarningIcon from "@mui/icons-material/Warning";
import { Button } from "@mui/material";

import "../../styles/index.css";

export default function Perfil() {
  return (
    <div>
      <div className="flex justify-start items-center shadow-page-title-shadow h-[5rem]">
        <h1 className="text-[#023A67] font-bold text-3xl font-roboto ml-7 mt-2">
          Meu perfil
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center mt-9">
        <img
          src={ProfilePic}
          alt="Foto de perfil"
          className="rounded-full w-65 h-65"
        />
      </div>
      <div className="flex justify-around">
        <div className="w-max">
          <h1 className="text-[#000000] font-bold text-lg font-roboto mr-36 mt-2 opacity-50">
            Nome
          </h1>
          <div className="flex justify-center border-b-2 w-full border-black">
            <div className="w-7"></div>
            <h1 className="text-[#000000] font-bold text-2xl font-roboto">
              Gustavo Santossssssssssssssssss
            </h1>
            <EditIcon className="ml-1" />
          </div>
        </div>
        <div className="">
          <h1 className="text-[#000000] w-max flex justify-start font-bold text-lg font-roboto mr-40 mt-2 opacity-50">
            Email
          </h1>
          <div className="flex border-b-2 border-cyan-600">
            <div className="w-7"></div>
            <h1 className="text-[#0075B1] font-bold text-2xl font-roboto">
              gustavo_santos@weeeeeeeeeeeeeeg.net
            </h1>
            <div title="Impossivel editar o email!">
              <WarningIcon color="warning" className="ml-1 mb-3" />
            </div>
          </div>
      </div>
      </div>
        <div className="flex flex-col justify-center items-center mt-10">
          <Button variant="contained" className="mt-10">Salvar</Button>
        </div>
    </div>
  );
}
