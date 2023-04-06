//MUI
import MuiTextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const TextField = styled(MuiTextField)({
  width: "100%",
});

export default function FilterComponent(props) {
  return (
    <>
      <div className="flex items-center gap-10">
        <p className="w-[20rem] text-base text-light-blue-weg">{props.title}</p>
        <TextField
          id="standard-basic"
          variant="standard"
          type={props.type}
          value={props.value}
          onChange={(e) => props.setValue(e.target.value)}
        />
      </div>
    </>
  );
}
