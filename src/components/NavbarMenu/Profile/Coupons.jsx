import { Box, Typography, Button } from '@mui/material';
import { useEffect, useState } from 'react';
const arr = [{
    discount: "30",
    description: "On minimum purchase of Rs. 1,899",
    code: "ACCGETMORE",
    expirydate: "OCT 31 2023",
    expirytime: "11:59:00 P.M",
    hidetext: "Rs. 199 off on minimum purchase of Rs. 1299"
},
{
    discount: "5",
    description: "On minimum purchase of Rs. 0",
    code: "KIPEKBMGM",
    expirydate: "NOV 30 2023",
    expirytime: "11:30:00 P.M",
    hidetext: "5% off"
},
{
    discount: "10",
    description: "On minimum purchase of Rs. 799",
    code: "XYXXEXTRA10",
    expirydate: "OCT 31 2023",
    expirytime: "12:43:33 P.M",
    hidetext: "10% off on minimum purchase of Rs. 799"
},
{
    discount: "12",
    description: "On minimum purchase of Rs. 899",
    code: "UNLOCKSAVINGS12",
    expirydate: "OCT 22 2023",
    expirytime: "10:30:00 P.M",
    hidetext: "12% off on minimum purchase of Rs. 899"
},
{
    discount: "15",
    description: "On minimum purchase of Rs. 0",
    code: "ACCSAVEMORE",
    expirydate: "OCT 31 2023",
    expirytime: "11:59:00 P.M",
    hidetext: "15% off"
}]

const Coupons = () => {
    const [finalarr, setFinalArr] = useState([])
    useEffect(() => {
        setFinalArr(arr.slice())
        document.title = 'My Coupons';
    }, [])
    return (<>

        {finalarr.length > 0 && finalarr.map((li) => {
            return (<>
                <Box sx={{
                    border: "1px solid lightgrey", boxShadow: "2px 2px 3px grey", padding: "15px",
                    marginTop: "20px"
                }}>
                    {/* block1 */}
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box sx={{ flex: 3, textAlign: "center", padding: "2px", borderRight: "2px solid lightgrey" }}>
                            <Typography>{li.discount}%</Typography>
                            <Typography>OFF</Typography>
                        </Box>
                        <Box sx={{ flex: 9, marginLeft: '30px' }}>
                            <Typography>{li.description}</Typography>
                            <Typography sx={{ marginTop: "5px" }}>Code: {li.code}</Typography>
                        </Box>
                    </Box>
                    <br></br>
                    <div style={{ backgroundColor: "lightgrey", width: "100%", height: "1pt" }}></div>
                    {/* block2 */}
                    <Box sx={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
                        <Typography sx={{ flex: 5 }}>Expiry: <span style={{ color: "grey" }}>{li.expirydate}</span>| {li.expirytime}</Typography>
                        <Typography sx={{ flex: 5 }}>{li.hidetext}</Typography>
                        <Button sx={{
                            flex: 2, textTransform: "none", color: "darkblue", fontWeight: "bold", fontSize: "16px"
                            , '&:hover': { backgroundColor: "transparent" }
                        }} disableTouchRipple
                            onClick={(e) => {
                                if (e.currentTarget.innerText == 'Details') {
                                    e.currentTarget.innerText = 'Hide';
                                    e.currentTarget.previousSibling.style.display = 'none';
                                }
                                else if (e.currentTarget.innerText == 'Hide') {
                                    e.currentTarget.innerText = 'Details';
                                    e.currentTarget.previousSibling.style.display = 'inline-block';
                                }
                            }}>Details</Button>
                    </Box>
                </Box>
            </>)
        })}
        <Typography sx={{ marginTop: '40px', fontWeight: "bold" }}>How Coupons Work</Typography>
        <Box sx={{
            border: "1px solid lightgrey", boxShadow: "2px 2px 3px grey", padding: "15px",
            marginTop: "20px"
        }}>
            {/* point1 */}
            <Typography sx={{ fontWeight: "bold" }}>1.Ensure that you have items in your shopping bag</Typography>
            <ul >
                <li style={{ fontWeight: "normal", fontFamily: "cursive" }}>Click on the coupon codes in the site or from other sources
                    -- OR --
                    Browse/search for items you want to purchase on Myntra</li>
                <li style={{ fontWeight: "normal", fontFamily: "cursive" }} >You will be taken to the list of items for which selected coupon is applicable or as per your search criteria</li>
                <li style={{ fontWeight: "normal", fontFamily: "cursive" }}>Add your chosen items to your shopping bag.</li>
            </ul>
            {/* point2 */}
            <Typography sx={{ fontWeight: "bold", marginTop: "20px" }}>2.Click the 'Apply Coupon' link in your Shopping Bag</Typography>
            <ul>
                <li style={{ fontWeight: "normal", fontFamily: "cursive" }}>Open your shoping bag and click the link at the bottom of the page.</li>
            </ul>
            {/* point3 */}
            <Typography sx={{ fontWeight: "bold", marginTop: "20px" }}>3.Select the coupon you want to apply</Typography>
            <ul>
                <li style={{ fontWeight: "normal", fontFamily: "cursive" }}>A list of coupons is displayed, with the best coupon selected by default. You can also enter a valid coupon code in the text box.</li>
            </ul>
            {/* point4 */}
            <Typography sx={{ fontWeight: "bold", marginTop: "20px" }}>4.Voila! You are done!</Typography>
            <ul>
                <li style={{ fontWeight: "normal", fontFamily: "cursive" }}>Your final bag will reflect the discount earned by applying your chosen coupon.</li>
            </ul>
        </Box>
    </>)
}

export default Coupons;