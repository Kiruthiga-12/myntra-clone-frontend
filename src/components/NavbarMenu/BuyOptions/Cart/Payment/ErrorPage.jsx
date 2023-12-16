import { Typography, Box, Button } from "@mui/material"
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { setNavBar, setFooter } from '../../../../Redux_Store/Action_Creators';
import Loader from '../../../../Loader/Loader';
import axios from 'axios';
const ErrorPage = (props) => {
    const [amount, setAmount] = useState();
    const [loader, setLoader] = useState(true);
    const [msg, setMsg] = useState();

    const navigate = useNavigate();
    useEffect(() => {
        props.setNavBar('navbar');
        props.setFooter('');
        if (props.user.user_id != undefined && props.user.user_id != '')
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_amount?user_id=${props.user.user_id}`)
                .then((data) => {
                    if (data.data.length > 0)
                        setAmount(data.data[0].total_amount)
                    setLoader(false);
                })
        else {
            setMsg('Invalid Resource');
            setLoader(false)
        }
    }, [])
    return (<>
        {loader == true ? <Loader /> : <>
            {msg == undefined && <>
                <Box sx={{ marginTop: '10%', textAlign: "center" }}>
                    <Typography sx={{ fontWeight: "bold", fontFamily: 'TimesNewRoman', fontSize: "25px", color: "rgb(243, 66, 140)" }}>Payment failed  <span style={{ fontSize: "25px", color: "black" }}>!!</span></Typography >
                    <Typography sx={{ marginTop: "30px", fontSize: '20px' }}>You can place order again using Payment option </Typography>
                    <Typography sx={{ marginTop: "25px", fontFamily: "TimesNewRoman", fontSize: "20px" }}>Amount to Pay <span style={{ fontFamily: "TimesNewRoman", fontWeight: "bold", fontSize: "25px" }}>&#8377; {amount}.00</span> </Typography>
                    <Button sx={{
                        width: "200px",
                        cursor: 'pointer',
                        marginTop: '50px', marginLeft: '20px',
                        color: 'white', backgroundColor: 'rgb(250, 50, 84)'
                        , '&:hover': { backgroundColor: 'rgb(250, 50, 84)', color: 'white' }
                    }} onClick={() => navigate('/checkout/cart')}>Retry Payment</Button>
                </Box>
            </>}
            {msg != undefined && <>
                <Typography sx={{ marginTop: "150px", color: "rgb(250, 102, 102)", textAlign: "center", fontWeight: "bold", fontSize: '26px' }}>{msg} !!</Typography>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </>}
        </>}
    </>)
}
const mapStateToProps = (cstate) => {
    return {
        user: cstate.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setNavBar: (data) => dispatch(setNavBar(data)),
        setFooter: (data) => dispatch(setFooter(data)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ErrorPage);