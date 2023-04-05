import "../../styles/index.css";

// MUI
import GridOnIcon from "@mui/icons-material/GridOn";
import ListAltIcon from "@mui/icons-material/ListAlt";

// Components
import Filter from "../Filter";
import Search from "../Search";
import DatePicker from "../Date-picker";


// Subheader de todo o sistema
export default function subHeader(props) {

  // Verifica o tipo de input pedido e retorna o mesmo
  const getSearchInput = () => {
    if(!props.filter) return (<></>);
    
    const filterType = props.filter.filterType;
    if(filterType === "date"){
      return (
        <DatePicker label="Data" searchValue={props.search} serSearchValue={props.setSearch}  />
      )
    } else {
      return (
            <Search
              type={filterType}
              search={props.search}
              setSearch={props.setSearch}
            />
      )
    }
  }

  

  return (
    <div className="mb-10">
      <div className="flex items-center shadow-page-title-shadow h-[5rem]">
        <div className="flex-[2] text-center">
          <h1 className="text-dark-blue-weg font-bold text-3xl font-roboto">
            {props.children}
          </h1>
        </div>
        <div className="flex-[4] flex justify-evenly">
          <div className="flex-1 flex items-center justify-end">
            {
              props.filter && props.setFilter &&
              <Filter
                filter={props.filter}
                setFilter={props.setFilter}
              />
            }
          </div>
          <div className="flex-1 flex items-center justify-end">
            {
              getSearchInput()
            }
          </div>
          <div className="flex-1 flex items-center justify-center">
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
