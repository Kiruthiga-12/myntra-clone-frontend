import { Typography, Box, TextField, Button } from '@mui/material';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getPaymentMode } from '../../../../Redux_Store/Action_Creators';
const Cashondel = (props) => {
    const [disab, setDisab] = useState(true)
    const [cacheno, setCacheNo] = useState();
    const [randomval, setRandomVal] = useState();
    useEffect(() => {
        setRandomVal(Math.round(Math.random() * 9999))
    }, [])
    return (<>
        <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>Cash On Delivery</Typography>
        <Typography sx={{ marginTop: "30px", backgroundColor: "rgb(240,240,240)", padding: "10px", width: "90%" }}>&#8377;10 will be charged extra for Cash on Delivery option.</Typography>
        <Box sx={{ display: "flex", alignItems: 'center' }}>
            <Box sx={{ marginTop: "30px", marginLeft: "30px", width: "200px", height: "100px", border: "1px solid black", borderRadius: "5px" }}>
                <Typography sx={{ fontSize: "40px", fontFamily: "fantasy", padding: "20px", textAlign: "center" }}>{randomval}</Typography>
            </Box>
            <AutorenewOutlinedIcon sx={{ marginLeft: "20px", color: "rgb(243, 66, 140)", cursor: "pointer" }} onClick={() => setRandomVal(Math.round(Math.random() * 9999))} />
        </Box>
        <TextField sx={{ marginTop: "40px", width: "80%", marginLeft: "30px" }} type='text' required value={cacheno}
            color='secondary'
            label='Enter code shown in above image'
            onChange={(e) => { setCacheNo(e.target.value) }}
            onBlur={() => {
                if ((cacheno != '' && cacheno != undefined) && (Number(cacheno) == randomval))
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

    </>)
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPaymentMode: (data) => dispatch(getPaymentMode(data))
    }
}
export default connect(null, mapDispatchToProps)(Cashondel);