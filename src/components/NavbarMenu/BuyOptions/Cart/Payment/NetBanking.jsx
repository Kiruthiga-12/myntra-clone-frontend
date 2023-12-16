import {
    Typography, FormControl, FormLabel, RadioGroup, Radio, Button, FormControlLabel,
    Select, MenuItem
} from "@mui/material";
import { useState } from 'react';
import { connect } from 'react-redux';
import { getPaymentMode } from "../../../../Redux_Store/Action_Creators";
const NetBanking = (props) => {
    const [value, setValue] = useState('');
    return (<>
        <Typography sx={{ marginLeft: '30px', marginTop: "20px", fontWeight: "bold", fontSize: "20px" }}>Net Banking</Typography>
        <FormControl sx={{ marginTop: "20px", marginLeft: "30px" }}>
            <FormLabel id="netbanking-controlled-radio-buttons-group"></FormLabel>
            <RadioGroup
                aria-labelledby="netbanking-controlled-radio-buttons-group"
                name="netbanking-controlled-radio-buttons-group"
                value={value}
                onChange={(e) => setValue(e.target.value)} >
                <FormControlLabel value="Axis Bank" control={<Radio />} label="Axis Bank" />
                {value == 'Axis Bank' && <>
                    <Button disableTouchRipple sx={{
                        padding: "5px", marginTop: "10px", fontSize: '18px', marginLeft: "30px",
                        width: "80%", color: "white", backgroundColor: "rgb(243, 66, 140)", fontWeight: "bold",
                        '&:hover': { color: "white", backgroundColor: "rgb(243, 66, 140)" }
                    }} onClick={() => {
                        alert('Redirecting to card option.Kindly pay using Card option')
                        props.getPaymentMode('Credit')
                    }}>PAY NOW</Button>
                </>}
                <FormControlLabel value="HDFC Bank" control={<Radio />} label="HDFC Bank" />
                {value == 'HDFC Bank' && <>
                    <Button disableTouchRipple sx={{
                        padding: "5px", marginTop: "10px", fontSize: '18px', marginLeft: "30px",
                        width: "80%", color: "white", backgroundColor: "rgb(243, 66, 140)", fontWeight: "bold",
                        '&:hover': { color: "white", backgroundColor: "rgb(243, 66, 140)" }
                    }} onClick={() => {
                        alert('Redirecting to card option.Kindly pay using Card option');
                        props.getPaymentMode('Credit')
                    }}>PAY NOW</Button>
                </>}
                <FormControlLabel value="ICICI Bank" control={<Radio />} label="ICICI Bank" />
                {value == 'ICICI Bank' && <>
                    <Button disableTouchRipple sx={{
                        padding: "5px", marginTop: "10px", fontSize: '18px', marginLeft: "30px",
                        width: "80%", color: "white", backgroundColor: "rgb(243, 66, 140)", fontWeight: "bold",
                        '&:hover': { color: "white", backgroundColor: "rgb(243, 66, 140)" }
                    }} onClick={() => {
                        alert('Redirecting to card option.Kindly pay using Card option')
                        props.getPaymentMode('Credit')
                    }}>PAY NOW</Button>
                </>}
                <FormControlLabel value="Kotak" control={<Radio />} label="Kotak" />
                {value == 'Kotak' && <>
                    <Button disableTouchRipple sx={{
                        padding: "5px", marginTop: "10px", fontSize: '18px', marginLeft: "30px",
                        width: "80%", color: "white", backgroundColor: "rgb(243, 66, 140)", fontWeight: "bold",
                        '&:hover': { color: "white", backgroundColor: "rgb(243, 66, 140)" }
                    }} onClick={() => {
                        alert('Redirecting to card option.Kindly pay using Card option');
                        props.getPaymentMode('Credit');
                    }}>PAY NOW</Button>
                </>}
                <FormControlLabel value="SBI" control={<Radio />} label="SBI" />
                {value == 'SBI' && <>
                    <Button disableTouchRipple sx={{
                        padding: "5px", marginTop: "10px", fontSize: '18px', marginLeft: "30px",
                        width: "80%", color: "white", backgroundColor: "rgb(243, 66, 140)", fontWeight: "bold",
                        '&:hover': { color: "white", backgroundColor: "rgb(243, 66, 140)" }
                    }} onClick={() => {
                        alert('Redirecting to card option.Kindly pay using Card option');
                        props.getPaymentMode('Credit');
                    }}>PAY NOW</Button>
                </>}
                <Select variant='outlined' color='secondary'
                    sx={{ marginTop: '30px', width: '100%' }} onChange={(e) => {
                        setValue(e.target.value)
                    }}
                    value={value}>
                    <MenuItem value='Bank of India'>Bank of India</MenuItem>
                    <MenuItem value='Canara Bank'>Canara Bank</MenuItem>
                    <MenuItem value='City Union Bank'>City Union Bank</MenuItem>
                    <MenuItem value='Indian Overseas Bank'>Indian Overseas Bank</MenuItem>
                    <MenuItem value='Yes Bank'>Yes Bank</MenuItem>
                </Select>
                {((value == 'Bank of India') || (value == 'Canara Bank') || (value == 'City Union Bank')
                    || (value == 'Indian Overseas Bank') || (value == 'Yes Bank')) && <>
                        <Button disableTouchRipple sx={{
                            padding: "5px", marginTop: "15px", fontSize: '18px', marginLeft: "30px",
                            width: "80%", color: "white", backgroundColor: "rgb(243, 66, 140)", fontWeight: "bold",
                            '&:hover': { color: "white", backgroundColor: "rgb(243, 66, 140)" }
                        }} onClick={() => {
                            alert('Redirecting to card option.Kindly pay using Card option')
                            props.getPaymentMode('Credit');
                        }}>PAY NOW</Button>
                    </>}
            </RadioGroup>
        </FormControl>
    </>)
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPaymentMode: (data) => dispatch(getPaymentMode(data))
    }
}
export default connect(null, mapDispatchToProps)(NetBanking);