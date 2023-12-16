import { useEffect } from "react";
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
const Cash = () => {
    useEffect(() => {
        document.title = 'Myn cash'
    }, [])
    return (<>
        <Box sx={{
            border: "1px solid lightgrey", boxShadow: "2px 2px 3px grey", padding: "15px",
            marginTop: "20px", textAlign: "center", width: "80%"
        }}>
            <Typography sx={{ fontWeight: "bold", marginTop: "30px", color: "rgb(72, 185, 157)" }}>TOTAL AVAILABLE MYNCASH</Typography>
            <Typography sx={{ color: "darkslategray", marginTop: "15px", fontWeight: "bold", fontSize: "35px", fontFamily: "cursive" }}>0</Typography>
            <Typography sx={{ marginTop: "15px" }}>Your total MynCash is worth &#8377;0.00</Typography>
            <Typography sx={{ color: "grey", marginTop: "15px", fontSize: "14px" }}>You can pay upto 10% (may vary during the sale &
                <br></br>
                promotion events) of your order value through
                <br></br>
                MynCash. Use them on the Payments page during
                <br></br>
                checkout.
            </Typography>
            <Typography sx={{ marginTop: "15px" }}>You have <span> 100 </span>referral MynCash pending</Typography>
        </Box>
        {/* block1 */}
        <Accordion sx={{ marginTop: '20px', width: "85%" }}>
            <AccordionSummary >
                <Typography sx={{ marginTop: "10px", fontWeight: 'bold', fontFamily: "cursive" }}>ELIGIBILTY,MEMBERSHIP,ACCRUAL</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ color: "grey" }}>
                <ul >
                    <li style={{ fontWeight: "normal", fontFamily: "cursive" }}>These terms and conditions are operational only in India and open to participation
                        of all the registered members, resident of India of myntra,over and above the age of 18 years.
                    </li>
                    <li style={{ marginTop: "10px", fontWeight: "normal", fontFamily: "cursive" }}>My privilege program has been converted into MynCash Program .The same denomination is applicable for MynCash.</li>
                </ul>
            </AccordionDetails>
        </Accordion>
        {/* block2 */}
        <Accordion sx={{ marginTop: '20px', width: "85%" }}>
            <AccordionSummary >
                <Typography sx={{ marginTop: "10px", fontWeight: 'bold', fontFamily: "cursive" }}>GENERAL TERMS AND CONDITIONS</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ color: "grey" }}>
                <ul >
                    <li style={{ fontWeight: "normal", fontFamily: "cursive" }}>Each member is responsible for remaining knowledgeable about the Myntra Program Terms and Conditions and the MynCash in his or her account.
                    </li>
                    <li style={{ marginTop: "10px", fontWeight: "normal", fontFamily: "cursive" }}>Myntra will send correspondence to active members to advise them of matters of interest, including notification of Myntra Program changes and MynCash Updates.</li>
                    <li style={{ marginTop: "10px", fontWeight: "normal", fontFamily: "cursive" }}>Myntra will not be liable or responsible for correspondence lost or delayed in the mail/e-mail.</li>
                    <li style={{ marginTop: "10px", fontWeight: "normal", fontFamily: "cursive" }}>Myntra reserves the right to refuse, amend, vary or cancel membership of any Member without assigning any reason and without prior notification.</li>
                    <li style={{ marginTop: "10px", fontWeight: "normal", fontFamily: "cursive" }}>Any change in the name, address, or other information relating to the Member must be notified to Myntra via the Helpdesk/email by the Member, as soon as possible at support@myntra.com or call at +91-80-43541999 24 Hours a Day / 7 Days a Week.</li>
                    <li style={{ marginTop: "10px", fontWeight: "normal", fontFamily: "cursive" }}>Myntra reserves the right to add,modify,delete or otherwise change the Terms and Conditions without any approval, prior notice or reference to the Member.</li>
                    <li style={{ marginTop: "10px", fontWeight: "normal", fontFamily: "cursive" }}>In the event of dispute in connection with Myntra Program and the interpretation of Terms and Conditions, Myntra's decision shall be final and binding.</li>
                    <li style={{ marginTop: "10px", fontWeight: "normal", fontFamily: "cursive" }}>This Policy and these terms shall be read in conjunction with the standard legal policies of Myntra, including its Privacy policy</li>
                </ul>
            </AccordionDetails>
        </Accordion>
    </>)
}

export default Cash;