import { Typography } from '@mui/material';
import { useEffect } from 'react';
const Insider = () => {
    useEffect(() => {
        document.title = 'Myntra Insider';
    }, [])
    return (<>
        <Typography sx={{ fontWeight: "bold", marginTop: "20px", marginleft: "40px" }}>Myntra Insider Page</Typography>
    </>)
}

export default Insider;