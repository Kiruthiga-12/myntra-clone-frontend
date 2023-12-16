import { CircularProgress } from "@mui/material";
const Loader = () => {
    return (<>
        <CircularProgress sx={{ color: "rgb(243, 66, 140)", display: "block", marginLeft: "50%", marginTop: "120px" }} />
    </>)
}

export default Loader;