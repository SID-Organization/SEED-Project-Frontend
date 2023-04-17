import "../../styles/index.css";

// MUI
import GridOnIcon from "@mui/icons-material/GridOn";
import ListAltIcon from "@mui/icons-material/ListAlt";

// Components
import Search from "../Search";

// Subheader de todo o sistema
export default function subHeader(props) {
  return (
    <div className="mb-10">
      <div className="flex h-[5rem] items-center shadow-page-title-shadow">
        <div className="flex-[2] text-center">
          <h1 className="font-roboto text-3xl font-bold text-dark-blue-weg">
            {props.children}
          </h1>
        </div>
        <div className="flex flex-[1] justify-around gap-10">
          <div className="flex flex-1 items-center justify-end">
            <Search filter={props.filter} setFilter={props.setFilter}/>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div
              className="cursor-pointer"
              onClick={() => props.setIsListFormat(!props.isListFormat)}
            >
              {props.isListFormat ? (
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
    </div>
  );
}
