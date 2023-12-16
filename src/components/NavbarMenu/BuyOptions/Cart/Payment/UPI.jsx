import { Typography, Button, TextField, RadioGroup, FormControl, FormLabel, FormControlLabel, Radio } from "@mui/material";
import { useState } from 'react';
import { getPaymentMode } from "../../../../Redux_Store/Action_Creators";
import { connect } from 'react-redux';
const UPI = (props) => {
    const [value, setValue] = useState();
    const [value1, setValue1] = useState();
    const [value2, setValue2] = useState();
    const [disab, setDisab] = useState(true)
    const [disab1, setDisab1] = useState(true)
    return (<>
        <Typography sx={{ marginTop: "20px", marginLeft: "30px", fontWeight: "bold" }}>Pay using UPI</Typography>
        <FormControl sx={{ marginTop: "20px", marginLeft: "30px" }}>
            <FormLabel id="demo-controlled-radio-buttons-group"></FormLabel>
            <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={(e) => setValue(e.target.value)} >
                <FormControlLabel value="Phonepe" control={<Radio />} label="Phonepe" />
                {value == 'Phonepe' && <>
                    <Button disableTouchRipple sx={{
                        padding: "10px", marginTop: "10px", fontSize: '18px', marginLeft: "30px",
                        width: "80%", color: "white", backgroundColor: "rgb(243, 66, 140)", fontWeight: "bold",
                        '&:hover': { color: "white", backgroundColor: "rgb(243, 66, 140)" }
                    }} onClick={() => {
                        alert('Redirecting to card option.Kindly pay using Card option')
                        props.getPaymentMode('Credit')
                    }}>PAY NOW</Button>
                </>}
                <div style={{ borderBottom: "1px dashed lightgrey", marginTop: "10px", width: "300px" }}></div>
                <FormControlLabel value="Google Pay" control={<Radio />} label="Google Pay" />
                {value == 'Google Pay' && <>
                    <TextField type='text' label='Enter UPI Id here' sx={{ marginTop: "20px", width: "100%" }}
                        value={value1} onChange={(e) => setValue1(e.target.value)}
                        onBlur={() => {
                            if ((value1 != '') && (value1 != undefined))
                                setDisab1(false);
                            else
                                setDisab1(true);
                        }} />
                    <Button disabled={disab1} disableTouchRipple sx={{
                        padding: "10px", marginTop: "40px", fontSize: '18px', marginLeft: "30px",
                        width: "80%", color: "white", backgroundColor: "rgb(243, 66, 140)", fontWeight: "bold",
                        '&:hover': { color: "white", backgroundColor: "rgb(243, 66, 140)" }
                    }} onClick={() => {
                        alert('Redirecting to card option.Kindly pay using Card option');
                        props.getPaymentMode('Credit');
                    }}>  PAY NOW</Button>
                </>}
                <div style={{ borderBottom: "1px dashed lightgrey", marginTop: "10px", width: "300px" }}></div>
                <FormControlLabel value="Enter UPI ID" control={<Radio />} label="Enter UPI ID" />
                {value == 'Enter UPI ID' && <>
                    <TextField type='text' label='Enter UPI Id here' sx={{ marginTop: "20px", width: "100%" }}
                        value={value2} onChange={(e) => setValue2(e.target.value)}
                        onBlur={() => {
                            if ((value2 != '') && (value2 != undefined))
                                setDisab(false);
                            else
                                setDisab(true);
                        }} />
                    <Button disabled={disab} disableTouchRipple sx={{
                        padding: "10px", marginTop: "20px", fontSize: '18px', marginLeft: "30px",
                        width: "80%", color: "white", backgroundColor: "rgb(243, 66, 140)", fontWeight: "bold",
                        '&:hover': { color: "white", backgroundColor: "rgb(243, 66, 140)" }
                    }} onClick={() => {
                        alert('Redirecting to card option.Kindly pay using Card option');
                        props.getPaymentMode('Credit');
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
export default connect(null, mapDispatchToProps)(UPI);