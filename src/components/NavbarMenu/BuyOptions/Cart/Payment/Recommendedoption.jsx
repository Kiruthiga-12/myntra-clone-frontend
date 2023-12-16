import { Box, Button, TextField, Typography, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel } from "@mui/material";
import { useEffect, useState } from "react";
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import { connect } from 'react-redux';
import { getPaymentMode } from "../../../../Redux_Store/Action_Creators";
const Recommendedoption = (props) => {
    const [value, setValue] = useState();
    const [value1, setValue1] = useState();
    const [disab, setDisab] = useState(true)
    const [disab1, setDisab1] = useState(true)
    const [cacheno, setCacheNo] = useState();
    const [randomval, setRandomVal] = useState();
    useEffect(() => {
        setRandomVal(Math.round(Math.random() * 99999))
    }, [])
    return (<>
        <Typography sx={{ marginLeft: "30px", marginTop: "20px", fontWeight: "bold", fontSize: "18px" }}>Recommend Payment Options</Typography>
        <FormControl sx={{ marginTop: "20px", marginLeft: "30px" }}>
            <FormLabel id="demo-controlled-radio-buttons-group"></FormLabel>
            <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={(e) => setValue(e.target.value)} >
                <FormControlLabel value="Cash on Delivery" control={<Radio />} label="Cash on Delivery" />
                {value == 'Cash on Delivery' && <>
                    <Typography sx={{ marginTop: "30px", backgroundColor: "rgb(240,240,240)", padding: "10px", width: "90%" }}>&#8377;10 will be charged extra for Cash on Delivery option.</Typography>
                    <Box sx={{ display: "flex", alignItems: 'center' }}>
                        <Box sx={{ marginTop: "30px", marginLeft: "30px", width: "200px", height: "100px", border: "1px solid black", borderRadius: "5px" }}>
                            <Typography sx={{ fontSize: "40px", fontFamily: "fantasy", padding: "20px", textAlign: "center" }}>{randomval}</Typography>
                        </Box>
                        <AutorenewOutlinedIcon sx={{ marginLeft: "20px", color: "rgb(243, 66, 140)", cursor: "pointer" }} onClick={() => setRandomVal(Math.round(Math.random() * 99999))} />
                    </Box>
                    <TextField sx={{ marginTop: "40px", width: "80%", marginLeft: "30px" }} type='text' required value={cacheno}
                        color='secondary'
                        label='Enter code shown in above image'
                        onChange={(e) => { setCacheNo(e.target.value) }}
                        onBlur={() => {
                            if ((cacheno != '') && (Number(cacheno) == randomval))
                                setDisab(false);
                            else
                                setDisab(true)
                        }} />
                    <Button disabled={disab} disableTouchRipple sx={{
                        padding: "10px", marginTop: "40px", fontSize: '18px', marginLeft: "30px",
                        width: "80%", color: "white", backgroundColor: "rgb(243, 66, 140)", fontWeight: "bold",
                        '&:hover': { color: "white", backgroundColor: "rgb(243, 66, 140)" }
                    }} onClick={() => {
                        alert('Redirecting to card option.Kindly pay using Card option')
                        props.getPaymentMode('Credit')
                    }}>PLACE ORDER</Button>
                </>}
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
                        alert('Redirecting to card option.Kindly pay using Card option')
                        props.getPaymentMode('Credit')
                    }}> PAY NOW</Button>
                </>}
                <FormControlLabel value="Phonepe" control={<Radio />} label="Phonepe" />
                {value == 'Phonepe' && <>
                    <Button disableTouchRipple sx={{
                        padding: "10px", marginTop: "20px", fontSize: '18px', marginLeft: "30px",
                        width: "80%", color: "white", backgroundColor: "rgb(243, 66, 140)", fontWeight: "bold",
                        '&:hover': { color: "white", backgroundColor: "rgb(243, 66, 140)" }
                    }} onClick={() => {
                        alert('Redirecting to card option.Kindly pay using Card option')
                        props.getPaymentMode('Credit')
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
export default connect(null, mapDispatchToProps)(Recommendedoption);