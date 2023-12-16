import { Typography, Select, MenuItem } from '@mui/material';
import { useState } from 'react';
import View_Order from './View_Order';
import Pay_To_Vendor from './Pay_To_Vendor';
import Pay_To_User from '../User_Details/Pay_To_User';
import Commission_History from './Commission_History';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js'
const View_Details = (props) => {
    const [seloption, setSelOption] = useState('view order');
    //load stripe
    let stripeval = loadStripe("pk_test_51O2Z4hSIr3vWUuJE0XmSYTsbcFCIWUAvnPiasInu1YKZoyFra5QiuNbO8TEG1aMlEXAuvFxJbaLFMZYC0djqYrQw00is58Hv2F")
    return (<>
        <Typography sx={{ fontWeight: "bold", padding: "20px", textDecoration: "underline" }}>Select Option: </Typography>
        <Select sx={{ marginLeft: '20px' }} value={seloption} onChange={(e) => setSelOption(e.target.value)}>
            <MenuItem value='view order'>View Order</MenuItem>
            <MenuItem value='pay to vendor'>Pay To vendor</MenuItem>
            <MenuItem value='pay to user'>Pay to User</MenuItem>
            <MenuItem value='commission history'>Commission History</MenuItem>
        </Select>
        {seloption == 'view order' && <View_Order orderid={props.orderid} />}
        {seloption == 'pay to vendor' && <Elements stripe={stripeval}>
            <Pay_To_Vendor orderid={props.orderid} adminid={props.adminid} email={props.email} />
        </Elements>}
        {seloption == 'pay to user' && <Elements stripe={stripeval}>
            <Pay_To_User orderid={props.orderid} adminid={props.adminid} email={props.email} />
        </Elements>}
        {seloption == 'commission history' && <Commission_History orderid={props.orderid} />}
    </>)
}
export default View_Details;