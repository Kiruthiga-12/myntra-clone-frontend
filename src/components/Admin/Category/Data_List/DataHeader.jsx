import { Box, Typography } from '@mui/material';
const DataHeader = () => {
    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', padding: '10px', marginTop: '120px', marginLeft: '20px', backgroundColor: 'purple', width: '96%' }}
                id='prodid_header'>
                <Typography sx={{ flex: 1, color: 'white' }}>PID</Typography>
                <Typography sx={{ flex: 1, color: 'white' }}>IMAGE</Typography>
                <Typography sx={{ flex: 3, color: 'white', textAlign: 'center' }}>TITLE</Typography>
                <Typography sx={{ flex: 3, color: 'white', textAlign: 'center' }}>BRAND</Typography>
                <Typography sx={{ flex: 1, color: 'white' }}>PRICE</Typography>
                <Typography sx={{ flex: 1, color: 'white' }}>STRIKE <br></br>PRICE</Typography>
                <Typography sx={{ flex: 1, color: 'white' }}>EDIT</Typography>
                <Typography sx={{ flex: 1, color: 'white' }}>DELETE</Typography>
            </Box>
        </>
    )
}

export default DataHeader;