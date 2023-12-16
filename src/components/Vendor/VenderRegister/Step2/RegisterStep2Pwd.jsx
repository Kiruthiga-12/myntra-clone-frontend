import { useEffect, useState } from "react";
import { Box, Typography, TextField, Button, FormControlLabel, Checkbox } from '@mui/material';
import Register_Navbar from "../Register_Navbar";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { setNavBar, setFooter } from "../../../Redux_Store/Action_Creators";
const RegisterStep2Pwd = (props) => {
    const [checkValue, setCheckState] = useState(false);
    const [timer, setTimer] = useState(30);
    const [timerflag, setTimerFlag] = useState(true);
    const [targetlink, setTargetLink] = useState('/partnerhome/register_step3');
    const [targetflag, setTargetFlag] = useState('');
    const [otpvalue, setOtpValue] = useState('');
    const [msg, setMsg] = useState();
    let sec = 30;
    useEffect(() => {
        document.title = 'Sell with Myntra';
        document.body.style.backgroundImage = 'url(../../Images/Galaxy.jpeg)';
        props.setNavBar('');
        props.setFooter('');
        if ((props.get_vendor_mobile == '' || props.get_vendor_mobile == undefined) || (props.get_vendor_email == ' ' || props.get_vendor_email == undefined)) {
            setMsg('Invalid Resource');
        }
    }, [])
    useEffect(() => {
        if (document.getElementById('registerandpwd') != undefined)
            if (checkValue === true)
                document.getElementById('registerandpwd').type = 'text';
            else if (checkValue === false)
                document.getElementById('registerandpwd').type = 'password';
        function pwd1() {
            if (timerflag === false) {
                if (document.getElementById('resend_otp') != undefined)
                    document.getElementById('resend_otp').innerText = `resend otp in ${timer}s`
            }
        }
        pwd1();
    }, [checkValue, timerflag])
    useEffect(() => {
        let timerid = setInterval(async () => {
            if (sec >= 1 && sec <= 30) {
                const date = await new Date(new Date().setSeconds(sec));
                await setTimer(date.getSeconds());
                await (--sec);
            }
            else if (sec === 0) {
                clearInterval(timerid);
                if (document.getElementById('resend_otp') != undefined)
                    document.getElementById('resend_otp').innerText = 'resend OTP';
            }
        }, 1000);
    }, [timerflag])

    useEffect(() => {
        if (targetflag) {
            setTargetLink('/partnerhome/register_step3')
        }
        else if (targetflag === false) {
            setTargetLink('/partnerhome/register_step2_pwd')
        }
    }, [targetflag])
    return (
        <>
            {msg == undefined && <>
                <ToastContainer className='toastcontainer' />
                <Register_Navbar display='none' />
                <Box sx={{ margin: 'auto', marginTop: '120px', width: '29%', backgroundColor: 'white', padding: '10px', textAlign: 'center' }}>
                    <Typography sx={{ marginTop: '30px', fontSize: '23px', fontWeight: 'bold' }}>Welcome to Myntra!</Typography>
                    <Typography sx={{ marginTop: '10px' }}>Create your Partner Account in 3 simple steps</Typography>
                    <Typography sx={{ marginTop: '20px', fontWeight: 'bold', color: 'grey', marginLeft: '-190px' }}>STEP 1: MOBILE NUMBER</Typography>
                    <input style={{ border: 'none', outline: 'none', fontSize: '16px', padding: '5px', color: 'black', marginLeft: '-160px', marginTop: '5px' }} readOnly value={props.get_vendor_mobile} />
                    <Typography sx={{ marginTop: '10px', fontWeight: 'bold', color: 'grey', marginLeft: '-120px' }}>STEP 2: Enter Company's EMAIL ID</Typography>
                    <input style={{ border: 'none', outline: 'none', fontSize: '16px', padding: '5px', color: 'black', marginLeft: '-160px', marginTop: '5px' }} readOnly value={props.get_vendor_email} />
                    <br></br>
                    <TextField id='registerandpwd' color='secondary' label='OTP' variant='standard' type='password' sx={{ marginTop: '30px', width: '50%', marginLeft: '-130px' }}
                        value={otpvalue} onChange={(e) => setOtpValue(e.target.value)} /><br />
                    <FormControlLabel sx={{ marginLeft: '-260px', marginTop: '20px' }} label='Show OTP' control={<Checkbox
                        onChange={(e, newValue) => setCheckState(newValue)} />}></FormControlLabel><br />
                    <Button id='resend_otp' disableTouchRipple style={{ fontSize: '16px', textTransform: 'none', backgroundColor: 'transparent', marginLeft: '250px', display: 'inline-block', color: "blue", textDecoration: 'underline' }}
                        onClick={async () => {
                            axios.post(`${process.env.REACT_APP_BACKEND_URL}/vendor_otp_register`, {
                                email: props.get_vendor_email
                            })
                                .then((data) => { })

                            setTimerFlag(true);
                            await setTimerFlag(false);
                            sec = 30;
                        }}>resend otp in {timer}s</Button>
                    <br></br>
                    <span id='otp_error' style={{ color: 'red', fontSize: '14px', fontFamily: 'cursive', marginLeft: '-230px', marginTop: '10px', display: 'inline-block' }}></span>
                    <br></br>
                    <Button sx={{
                        color: 'white', backgroundColor: 'rgb(243, 66, 140)', fontWeight: 'bold', marginTop: '30px',
                        marginLeft: '-290px', padding: '5px 15px', '&:hover': { backgroundColor: 'rgb(243, 66, 140)' }
                    }} component={Link} to={targetlink}
                        onClick={() => {
                            axios.post(`${process.env.REACT_APP_BACKEND_URL}/vendor_otp_compare`, {
                                email: props.get_vendor_email,
                                otp: otpvalue
                            }).then((data) => {
                                setTargetFlag(data.data);
                            })

                        }}>SUBMIT</Button>
                    <Box sx={{ height: '30px' }}></Box>
                    <span style={{ color: 'black', fontSize: '14px', fontFamily: 'cursive', fontWeight: 'bold', fontStyle: 'italic', marginLeft: '-110px', display: 'inline-block' }}>Note: Please check your mail for the OTP</span>
                    <br></br>
                </Box>
            </>}
            {msg != undefined && <>
                <Typography sx={{ marginTop: "100px", color: "white", textAlign: "center", fontWeight: "bold", fontSize: '26px' }}>{msg} !!</Typography>
                <Typography sx={{ marginTop: "10px", color: "white", textAlign: "center", fontWeight: "bold", fontSize: '19px', fontFamily: "verdana" }}>Kindly Complete previous Steps !</Typography>
            </>}
        </>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        setNavBar: (data) => dispatch(setNavBar(data)),
        setFooter: (data) => dispatch(setFooter(data))
    }
}
const mapStateToProps = (cstate) => {
    return {
        get_vendor_mobile: cstate.get_vendor_mobile,
        get_vendor_email: cstate.get_vendor_email
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterStep2Pwd);