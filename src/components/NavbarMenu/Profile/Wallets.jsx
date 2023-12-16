import { Box, Typography } from '@mui/material';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import { useEffect } from 'react';
const Wallets = () => {
    useEffect(() => {
        document.title = 'Saved Wallets/BNPL';
    }, [])
    return (<>
        <Typography sx={{ marginTop: "30px", marginLeft: "30px", fontWeight: "bold", color: "grey", fontSize: "20px" }}>Saved Wallets/BNPL</Typography>
        <Box sx={{ marginTop: "80px", textAlign: "center" }}>
            <AccountBalanceWalletOutlinedIcon sx={{ color: "darkblue", fontSize: "130px" }} />
            <Typography sx={{ fontWeight: "bold", marginTop: '20px' }}>LINK YOUR WALLETS/BNPL WHILE DOING A PAYMENT</Typography>
            <Typography sx={{ marginTop: "20px", fontSize: "18px", color: "grey" }}>It's convenient to pay with Linked</Typography>
            <Typography sx={{ fontSize: "18px", color: "grey" }}>Wallets/BNPL.</Typography>
        </Box>
    </>)
}

export default Wallets;