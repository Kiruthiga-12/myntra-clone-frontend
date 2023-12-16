import { Box, Typography, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
const SearchBar = (props) => {
    return (
        <>
            <Box sx={{ visibility: "hidden" }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', width: '400px', border: '1px solid lightgrey', borderRadius: "5px", backgroundColor: 'rgb(240,240,240)' }}>
                    <SearchIcon sx={{ color: 'black', marginLeft: "10px", flex: 1 }} />
                    <TextField variant='outlined' type='text' placeholder={props.placeholder} sx={{
                        flex: 11,
                        width: '450px', color: 'black', backgroundColor: 'rgb(240,240,240)', marginLeft: '10px',
                        '& fieldset': { border: 'none' }
                    }} />
                </Box>
            </Box>
        </>
    )
}

export default SearchBar;

