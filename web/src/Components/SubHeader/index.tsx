import Filter from "../Filter";
import Search from "../Search";

import ListAltIcon from "@mui/icons-material/ListAlt";
import GridOnIcon from "@mui/icons-material/GridOn";

import "../../styles/index.css";

export default function subHeader({
  children,
  isListFormat,
  setIsListFormat,
}: any) {
  return (
    <div className="mb-10">
      <div className="flex items-center shadow-page-title-shadow h-[5rem]">
        <div className="flex-[2] text-center">
          <h1 className="text-dark-blue-weg font-bold text-3xl font-roboto">
            {children}
          </h1>
        </div>
        <div className="flex-[4] flex justify-evenly">
          <Filter />
          <Search />
          <div
            className="cursor-pointer"
            onClick={() => setIsListFormat(!isListFormat)}
          >
            {isListFormat ? (
              <GridOnIcon
                sx={{
                  fontSize: "30px",
                  color: "#0075B1",
                }}
              />
            ) : (
              <ListAltIcon
                sx={{
                  fontSize: "30px",
                  color: "#0075B1",
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
