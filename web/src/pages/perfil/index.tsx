import ProfilePic from "../../assets/profile-pic.png";
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
      <div className="grid gap-8">
        <div className="flex justify-center items-center mt-9">
          <img
            src={ProfilePic}
            alt="Foto de perfil"
            className="rounded-full w-65 h-65"
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
        <div className="flex justify-center gap-x-16 flex-wrap text-center items-center">
          <div className="grid justify-end w-[21rem]">
            <h1 className="text-[#023A67] font-bold text-2xl font-roboto">
              Gustavo Santos
            </h1>
            <h1 className="text-black font-bold text-base font-roboto opacity-50">
              WEG Digital Solutions
            </h1>
            <h1 className="text-black font-bold text-base font-roboto opacity-50">
              Jaraguá do Sul, Brazil
            </h1>
          </div>
          <div className="grid h-16">
            <div>
              <Button variant="outlined">Editar perfil</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
