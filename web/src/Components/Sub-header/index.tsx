import Filter from "../Filter";
import Search from "../Search";

import ListAltIcon from "@mui/icons-material/ListAlt";
import GridOnIcon from "@mui/icons-material/GridOn";

import "../../styles/index.css";

interface ISubHeaderProps {
  children: string;
  isListFormat: boolean;
  setIsListFormat: (isListFormat: boolean) => void;
  search: string;
  setSearch: (search: string) => void;
  filterType: string;
  setFilterType: (filterType: string) => void;
}

export default function subHeader(props: ISubHeaderProps) {
  return (
    <div className="mb-10">
      <div className="flex items-center shadow-page-title-shadow h-[5rem]">
        <div className="flex-[2] text-center">
          <h1 className="text-dark-blue-weg font-bold text-3xl font-roboto">
            {props.children}
          </h1>
        </div>
        <div className="flex-[4] flex justify-evenly">
          <Filter
            filterType={props.filterType}
            setFilterType={props.setFilterType}
          />
          {
            props.filterType === 0 &&
            <Search search={props.search} setSearch={props.setSearch}/>
          }
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
  );
}
