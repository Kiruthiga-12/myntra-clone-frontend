import { Box, Typography } from '@mui/material';
import MobileFriendlyOutlinedIcon from '@mui/icons-material/MobileFriendlyOutlined';
import { useEffect } from 'react';
const UPI = () => {
    useEffect(() => {
        document.title = 'Saved UPI';
    }, [])
    return (<>
        <Box sx={{ marginTop: "80px", textAlign: "center" }}>
            <MobileFriendlyOutlinedIcon sx={{ color: "darkblue", fontSize: "170px" }} />
            <Typography sx={{ fontWeight: "bold", marginTop: '20px' }}>SAVE YOUR UPI ID WHILE DOING A PAYMENT</Typography>
            <Typography sx={{ marginTop: "20px", fontSize: "18px", color: "grey" }}>It's convenient to pay with saved UPI IDs.</Typography>
        </Box>
    </>)
}

export default UPI;