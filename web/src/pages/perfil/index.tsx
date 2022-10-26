
import ProfilePic from "../../assets/profile-pic.png";
import EditIcon from '@mui/icons-material/Edit';

export default function Perfil() {

  return (
    <div>
      <div className="flex justify-start items-center shadow-page-title-shadow h-[5rem]">
        <h1 className="text-[#023A67] font-bold text-3xl font-roboto ml-7 mt-2">
          Meu perfil
        </h1>
      </div>
        <div className="flex flex-col justify-center items-center mt-9">
            <img src={ProfilePic} alt="Foto de perfil" className="rounded-full w-65 h-65"/>
        </div>
        <div className="flex justify-around">
            <h1 className="text-[#000000] font-bold text-lg font-roboto mr-28 mt-2 opacity-50">
                Nome
            </h1>
            <h1 className="text-[#000000] font-bold text-lg font-roboto mr-28 mt-2 opacity-50">
                Email
            </h1>
        </div>
        <div className="flex justify-around">
            <div className="flex">
                <h1 className="text-[#000000] font-bold text-2xl font-roboto ml-11 underline">
                    Gustavo Santos
                </h1>
                <EditIcon className="ml-1"/>
            </div>
            <h1 className="text-[#0075B1] font-bold text-2xl font-roboto ml-10">
                Email do usuário
            </h1>
            </div>
    </div>
  );
}
