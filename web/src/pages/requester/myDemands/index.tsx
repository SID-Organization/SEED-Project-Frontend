import Header from "../../../Components/Header";

import ListAltIcon from "@mui/icons-material/ListAlt";

import "../../../styles/index.css";

export default function myDemands() {
  return (
    <div>
      <Header />
      <div className="flex justify-around items-center shadow-page-title-shadow h-[5rem]">
        <h1 className="text-[#023A67] font-bold text-3xl font-roboto">
          Minhas demandas
        </h1>
        <input className="w-72 h-10 bg-slate-500" type="text" />
        <input className="w-72 h-10 bg-slate-500" type="text" />
        <ListAltIcon
          style={{
            fontSize: "30px",
            color: "#0075B1",
            cursor: "pointer",
          }}
        />
      </div>
    </div>
  );
}
