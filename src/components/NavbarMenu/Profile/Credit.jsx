import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import NorthOutlinedIcon from '@mui/icons-material/NorthOutlined';
import DiscountOutlinedIcon from '@mui/icons-material/DiscountOutlined';
const Credit = () => {
    useEffect(() => {
        document.title = 'Myntra Credit'
    }, [])
    return (<>
        <Box sx={{
            border: "1px solid lightgrey", boxShadow: "2px 2px 3px grey", padding: "15px",
            marginTop: "20px", textAlign: "center", width: "80%"
        }}>
            <Box sx={{ textAlign: "center" }}>
                <Typography sx={{ marginTop: "40px", fontSize: "14px", fontFamily: "verdana" }}>MYNTRA</Typography>
                <Typography sx={{ fontWeight: "bold", fontFamily: "cursive", fontSize: "19px" }}>CREDIT</Typography>
                <Typography sx={{ color: "grey", marginTop: "15px", fontFamily: "cursive", fontSize: "14px" }}>A QUICK AND CONVENIENT WAY TO PAY AND REFUND</Typography>
            </Box>
            <hr style={{ marginTop: "20px" }} />

            <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", flexDirection: "column" }}>
                {/* block1 */}
                <Box sx={{ textAlign: "center", flex: 6, marginTop: "20px" }}>
                    <LocalMallOutlinedIcon sx={{ fontSize: "50px", color: "rgb(72, 185, 157)" }} />
                    <Typography sx={{ marginTop: "10px", fontWeight: 'bold' }}>INSTANT CHECKOUT</Typography>
                    <Typography sx={{ color: "grey", marginTop: "3px", fontFamily: "cursive", fontSize: "16px" }}>One - click , easy and fast checkout</Typography>
                </Box>
                {/* block2 */}
                <Box sx={{ textAlign: "center", flex: 6, marginTop: "20px" }}>
                    <CurrencyRupeeOutlinedIcon sx={{ fontSize: "50px", color: "rgb(72, 185, 157)" }} />
                    <Typography sx={{ marginTop: "10px", fontWeight: 'bold' }}>FASTER REFUNDS</Typography>
                    <Typography sx={{ color: "grey", marginTop: "3px", fontFamily: "cursive", fontSize: "16px" }}>Get instant refunds as Myntra Credit</Typography>
                </Box>
                {/* block3 */}
                <Box sx={{ textAlign: "center", flex: 6, marginTop: "20px" }}>
                    <NorthOutlinedIcon sx={{ fontSize: "50px", color: "rgb(72, 185, 157)" }} />
                    <Typography sx={{ marginTop: "10px", fontWeight: 'bold' }}>CONSOLIDATED MONEY</Typography>
                    <Typography sx={{ color: "grey", marginTop: "3px", fontFamily: "cursive", fontSize: "16px" }}>Gift cards, refunds and cashbacks in one place</Typography>
                </Box>
                {/* block4 */}
                <Box sx={{ textAlign: "center", flex: 6, marginTop: "20px" }}>
                    <DiscountOutlinedIcon sx={{ fontSize: "50px", color: "rgb(72, 185, 157)" }} />
                    <Typography sx={{ marginTop: "10px", fontWeight: 'bold' }}>MANY MORE BENEFITS</Typography>
                    <Typography sx={{ color: "grey", marginTop: "3px", fontFamily: "cursive", fontSize: "16px" }}>Benefits and offers on using Myntra Credit</Typography>
                </Box>
            </Box>
        </Box>
        <Box sx={{
            border: "1px solid lightgrey", boxShadow: "2px 2px 3px grey", padding: "15px",
            marginTop: "20px", textAlign: "center", width: "80%"
        }}>
            <Typography sx={{ marginTop: "10px", fontWeight: 'bold', fontFamily: "cursive" }}>TOP-UP YOUR MYNTRA CREDIT NOW!</Typography>
            <Typography sx={{ color: "darkslategray", marginTop: "15px", fontWeight: "bold", fontSize: "35px", fontFamily: "cursive" }}>&#8377; 0.00</Typography>
        </Box>
        <Box sx={{
            border: "1px solid lightgrey", boxShadow: "2px 2px 3px grey", padding: "15px",
            marginTop: "20px", width: "80%"
        }}>
            <Typography sx={{ marginTop: "10px", fontWeight: 'bold', fontFamily: "cursive" }}>PLEASE NOTE</Typography>
            <ul>
                <li style={{ fontWeight: "normal", fontFamily: 'cursive', color: "grey" }}>Myntra Credit can't be cancelled or transferred to another account.</li>
                <li style={{ marginTop: "10px", fontWeight: "normal", fontFamily: 'cursive', color: "grey" }}>It can't be withdrawn in the form of cash or transferred to any bank account.</li>
                <li style={{ marginTop: "10px", fontWeight: "normal", fontFamily: 'cursive', color: "grey" }}>It can't be used to purchase Gift Cards.</li>
                <li style={{ marginTop: "10px", fontWeight: "normal", fontFamily: 'cursive', color: "grey" }}>Net-banking and credit/debit cards issued in India can be used for Myntra Credit top up.</li>
                <li style={{ marginTop: "10px", fontWeight: "normal", fontFamily: 'cursive', color: "grey" }}>Credits have an expiry. Check FAQs for more details.</li>
            </ul>
        </Box>
    </>)
}

export default Credit;