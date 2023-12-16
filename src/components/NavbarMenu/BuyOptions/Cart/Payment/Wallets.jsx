import { Typography, FormControl, FormControlLabel, Button, FormLabel, RadioGroup, Radio } from "@mui/material";
import { useState } from 'react';
import { connect } from 'react-redux';
import { getPaymentMode } from "../../../../Redux_Store/Action_Creators";
const Wallets = (props) => {
    const [value, setValue] = useState();
    return (<>
        <Typography sx={{ marginLeft: '30px', fontWeight: "bold", marginTop: "20px", fontSize: "20px" }}>Select wallet to pay</Typography>
        <FormControl sx={{ marginTop: "20px", marginLeft: "30px" }}>
            <FormLabel id="wallet-controlled-radio-buttons-group"></FormLabel>
            <RadioGroup
                aria-labelledby="wallet-controlled-radio-buttons-group"
                name="wallet-controlled-radio-buttons-group"
                value={value}
                onChange={(e) => setValue(e.target.value)} >
                <FormControlLabel value="Paytm" control={<Radio />} label="Paytm (Wallet)" />
                {value == 'Paytm' && <>
                    <Button disableTouchRipple sx={{
                        padding: "10px", marginTop: "10px", fontSize: '18px', marginLeft: "30px",
                        width: "80%", color: "white", backgroundColor: "rgb(243, 66, 140)", fontWeight: "bold",
                        '&:hover': { color: "white", backgroundColor: "rgb(243, 66, 140)" }
                    }} onClick={() => {
                        alert('Redirecting to card option.Kindly pay using Card option');
                        props.getPaymentMode('Credit')
                    }}>PAY NOW</Button>
                </>}
                <div style={{ borderBottom: "1px dashed lightgrey", marginTop: "10px", width: "300px" }}></div>
                <FormControlLabel value="Airtel Money" control={<Radio />} label="Airtel Money" />
                {value == 'Airtel Money' && <>
                    <Button disableTouchRipple sx={{
                        padding: "10px", marginTop: "40px", fontSize: '18px', marginLeft: "30px",
                        width: "80%", color: "white", backgroundColor: "rgb(243, 66, 140)", fontWeight: "bold",
                        '&:hover': { color: "white", backgroundColor: "rgb(243, 66, 140)" }
                    }}
                        onClick={() => {
                            alert('Redirecting to card option.Kindly pay using Card option');
                            props.getPaymentMode('Credit')
                        }}>PAY NOW</Button>
                </>}
                <div style={{ borderBottom: "1px dashed lightgrey", marginTop: "10px", width: "300px" }}></div>
                <FormControlLabel value="Freecharge" control={<Radio />} label="Freecharge (Wallet + Pay Later)" />
                {value == 'Freecharge' && <>
                    <Button disableTouchRipple sx={{
                        padding: "10px", marginTop: "20px", fontSize: '18px', marginLeft: "30px",
                        width: "80%", color: "white", backgroundColor: "rgb(243, 66, 140)", fontWeight: "bold",
                        '&:hover': { color: "white", backgroundColor: "rgb(243, 66, 140)" }
                    }}
                        onClick={() => {
                            alert('Redirecting to card option.Kindly pay using Card option');
                            props.getPaymentMode('Credit')
                        }}>PAY NOW</Button>
                </>}
                <div style={{ borderBottom: "1px dashed lightgrey", marginTop: "10px", width: "300px" }}></div>
                <FormControlLabel value="Mobiwik" control={<Radio />} label="Mobiwik | ZIP (Pay Later)" />
                {value == 'Mobiwik' && <>
                    <Button disableTouchRipple sx={{
                        padding: "10px", marginTop: "20px", fontSize: '18px', marginLeft: "30px",
                        width: "80%", color: "white", backgroundColor: "rgb(243, 66, 140)", fontWeight: "bold",
                        '&:hover': { color: "white", backgroundColor: "rgb(243, 66, 140)" }
                    }}
                        onClick={() => {
                            alert('Redirecting to card option.Kindly pay using Card option');
                            props.getPaymentMode('Credit')
                        }}>PAY NOW</Button>
                </>}
                <div style={{ borderBottom: "1px dashed lightgrey", marginTop: "10px", width: "300px" }}></div>
                <FormControlLabel value="OlaMoney" control={<Radio />} label="OlaMoney (Wallet + Postpaid)" />
                {value == 'OlaMoney' && <>
                    <Button disableTouchRipple sx={{
                        padding: "10px", marginTop: "20px", fontSize: '18px', marginLeft: "30px",
                        width: "80%", color: "white", backgroundColor: "rgb(243, 66, 140)", fontWeight: "bold",
                        '&:hover': { color: "white", backgroundColor: "rgb(243, 66, 140)" }
                    }} onClick={() => {
                        alert('Redirecting to card option.Kindly pay using Card option');
                        props.getPaymentMode('Credit')
                    }}>PAY NOW</Button>
                </>}
                <div style={{ borderBottom: "1px dashed lightgrey", marginTop: "10px", width: "300px" }}></div>
            </RadioGroup>
        </FormControl>

    </>)
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPaymentMode: (data) => dispatch(getPaymentMode(data))
    }
}
export default connect(null, mapDispatchToProps)(Wallets);