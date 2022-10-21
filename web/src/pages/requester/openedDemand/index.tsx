import SubHeaderOpenedDemand from "../../../Components/SubHeaderOpenedDemand";

import Button from "@mui/material/Button";

import MessageIcon from "@mui/icons-material/Message";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";

import "../../../styles/index.css";
import { useState } from "react";

export default function openedDemand() {
  return (
    <div>
      <SubHeaderOpenedDemand>Visualização Demanda 0012</SubHeaderOpenedDemand>
      <div>
        <div className="flex justify-around items-center mt-5">
          <Button variant="contained">Workflow</Button>
          <div className="grid justify-center items-center">
            <div className="flex justify-center items-center">
              <div>
                <h1 className="text-light-blue-weg font-bold text-2xl font-roboto">
                  Aumento da velocidade de consulta de dados
                </h1>
              </div>
              <div>
                <MessageIcon
                  sx={{
                    color: "#00579D",
                    fontSize: 30,
                    marginLeft: 2,
                    cursor: "pointer",
                  }}
                />
              </div>
            </div>
            <div className="flex justify-center items-center">
              <h1 className="font-semibold text-[#023A67] font-roboto">
                Score: 2143
              </h1>
            </div>
          </div>
          <div>
            <Button variant="contained">
              <OpenInFullIcon />
            </Button>
          </div>
        </div>
        <div className="flex justify-around items-center">
          <div className="grid justify-center items-center">
            <h1 className="font-roboto font-bold text-[#023A67] text-lg">
              Solicitante
            </h1>
            <h1 className="font-roboto font-semibold text-base">
              GUSTAVO SANTOS
            </h1>
            <h1 className="font-roboto text-sm">WEG DIGITAL SOLUTIONS</h1>
          </div>
          <div className="flex justify-center items-center gap-5">
            <h1 className="font-roboto font-bold">
              De: <span className="text-[#023A67]">10/05/2022</span>
            </h1>
            <h1 className="font-roboto font-bold">
              Até: <span className="text-[#023A67]">20/06/2022</span>
            </h1>
          </div>
          <div className="grid justify-center items-center">
            <h1 className="text-[#023A67] font-bold font-roboto">
              Centro de custo
            </h1>
            <h1 className="font-roboto">Departamento 3</h1>
          </div>
        </div>
        <div
          className="
          flex flex-wrap justify-center items-center
          ml-[6.5rem] mr-[6.5rem] mt-10
        "
        >
          <div className="grid justify-around items-center gap-5">
            <div className="grid justify-center items-center">
              <h1 className="text-[#023A67] font-bold font-roboto text-lg">
                Descrição:
              </h1>
              <h1 className="font-roboto text-justify font-medium">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam in
                imperdiet felis. Donec et porta elit. Sed nec est id diam
                placerat mattis. Fusce molestie lobortis erat, a laoreet turpis
                placerat in. Cras sollicitudin nulla at urna sodales, eu
                placerat leo aliquam. Cras imperdiet mauris in orci placerat,
                vitae efficitur dolor egestas. Donec ex libero, vehicula ut
                aliquam id, auctor in diam.
              </h1>
            </div>
            <div className="grid justify-center items-center">
              <h1 className="text-[#023A67] font-bold font-roboto text-lg">
                Problema a ser resolvido:
              </h1>
              <h1 className="font-roboto text-justify font-medium">
                Sed ut iaculis felis. Phasellus eget pharetra tortor. Proin
                tempor risus purus. Suspendisse porttitor ultricies nibh
                facilisis interdum. In et nisi quis magna vulputate finibus ac
                in felis. Vivamus rhoncus tincidunt sapien. Nam ultrices arcu
                lectus, tincidunt auctor diam suscipit eu. Aenean nec diam et
                tortor laoreet viverra. Aliquam volutpat orci ut mauris pretium
                elementum vel eu turpis. In et tincidunt lectus, et blandit
                elit. Duis luctus eget arcu ornare pellentesque. Sed hendrerit
                quam ac ante luctus, et dictum ligula euismod. Nullam efficitur
                urna urna, vel varius erat suscipit ac. Donec dolor velit,
                luctus a ligula eu, auctor convallis turpis.
              </h1>
            </div>
            <div className="grid justify-center items-center">
              <h1 className="text-[#023A67] font-bold font-roboto text-lg">
                Proposta:
              </h1>
              <h1 className="font-roboto text-justify font-medium">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                facilisis velit sapien, nec dapibus velit tempor et. Vivamus
                fringilla venenatis nisi, malesuada efficitur quam elementum
                sed. Vivamus venenatis velit a turpis mollis finibus. Proin
                dignissim ante velit, vitae molestie turpis condimentum ac. Cras
                a elit condimentum, sodales dui sed, ullamcorper tellus. Sed
                vitae lacinia libero. Praesent ut lacus imperdiet, euismod
                libero vitae, sollicitudin augue. Duis ullamcorper magna et
                metus gravida, sed dictum ex fermentum. Suspendisse tellus erat,
                volutpat quis odio sed, accumsan vehicula metus. Class aptent
                taciti sociosqu ad litora torquent per conubia nostra, per
                inceptos himenaeos. Nunc vestibulum a felis quis efficitur. In
                fermentum sit amet libero eleifend rutrum.
              </h1>
            </div>
            <div className="grid justify-center items-center">
              <h1 className="text-[#023A67] font-bold font-roboto text-lg">
                Em que irá ajudar:
              </h1>
              <h1 className="font-roboto text-justify font-medium">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                facilisis velit sapien, nec dapibus velit tempor et. Vivamus
                fringilla venenatis nisi, malesuada efficitur quam elementum
                sed. Vivamus venenatis velit a turpis mollis finibus. Proin
                dignissim ante velit, vitae molestie turpis condimentum ac. Cras
                a elit condimentum, sodales dui sed, ullamcorper tellus. Sed
                vitae lacinia libero. Praesent ut lacus imperdiet, euismod
                libero vitae, sollicitudin augue.
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
