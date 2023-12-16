import { Typography } from '@mui/material';
import { useEffect } from 'react';
const GiftCards = () => {
    useEffect(() => {
        document.title = 'Myntra Insider';
    }, [])
    return (<>
        <Typography sx={{ fontWeight: "bold", marginTop: "20px", marginleft: "40px" }}>Gift Cards</Typography>
    </>)
}

export default GiftCards;