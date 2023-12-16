import { useEffect, useState } from "react";
import { Box, Typography, Button, TextField, FormControlLabel, Checkbox } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import axios from 'axios';
import { getVendorLogin, setNavBar, setFooter } from '../../Redux_Store/Action_Creators';
import Loader from '../../Loader/Loader';
const VenderLoginAndPassword = (props) => {

    //status
    const [checkValue, setCheckState] = useState(false);
    const [disab, setDisable] = useState(true);
    const [targetlink, setTargetLink] = useState('');

    //storing values.
    const [vemail, setEmail] = useState('');
    const [vpwd, setPwd] = useState('');

    //pattern
    const pwdpat2 = /[A-Z]+/;
    const pwdpat3 = /[0-9]+/;
    const pwdpat4 = /[@#\$\&\^\(\)!]+/;

    //flag 
    const [logged, setCredentials] = useState(false);
    const [loader, setLoader] = useState(false);
    const vendor_login = 'welcome to vendor login page!';

    useEffect(() => {
        if (logged) {
            const perc = axios.get(`${process.env.REACT_APP_BACKEND_URL}/percentage_email?email=${props.vendor_login}`);
            const vstatus = axios.get(`${process.env.REACT_APP_BACKEND_URL}/vendor_status_email?email=${props.vendor_login}`);

            axios.all([perc, vstatus])
                .then(axios.spread(function (percdet, statusdet) {
                    function f0() {
                        if (percdet.data[0].perc <= 100 && (statusdet.data.data == 'rejected' || statusdet.data.data == 'pending submission'))
                            setTargetLink('/basicinformation');
                        else if (Number(percdet.data[0].perc) == 100 && (statusdet.data.data == 'approved' || statusdet.data.data == 'submitted' || statusdet.data.data == 'resubmitted'))
                            setTargetLink('/vendor/home');
                    }
                    if (percdet.data.length > 0)
                        f0()
                }))

        }
    }, [logged])
    useEffect(() => {
        if (checkValue === true)
            document.getElementById('loginandpwd').type = 'text';
        else if (checkValue === false)
            document.getElementById('loginandpwd').type = 'password';
    }, [checkValue])
    useEffect(() => {
        toast.info('welcome to vendor login page!', {
            autoClose: 3000,
            position: toast.POSITION.BOTTOM_RIGHT,
            toastId: 'vendor_login'
        })
        document.title = 'Myntra';
        document.body.style.backgroundImage = 'url(../../Images/Galaxy.jpeg)';
        props.setNavBar('');
        props.setFooter('')
    }, [])
    return (
        <>
            <ToastContainer />
            <Button component={Link} to='/partnerhome/login' disableTouchRipple sx={{ '&:hover': { backgroundColor: 'transparent' }, position: 'fixed', top: '150px', left: '630px', fontSize: '30px', color: 'black' }}><ArrowBackIcon /></Button>
            <img src='../../Images/myntra_favicon.png' style={{
                top: '90px', left: '760px', position: 'fixed',
                boxShadow: '2px 2px 2px grey,-2px -2px -2px grey'
            }}
                alt='loading' width='190px' height='90px' />
            <Box sx={{
                padding: '30px', textAlign: 'center', margin: 'auto', marginTop: '140px', width: '27%', backgroundColor: 'white',
                boxShadow: '2px 2px 2px grey,-2px -2px -2px grey', height: '550px'
            }}>
                <Typography variant='h5' sx={{ marginTop: '30px' }}> partners_mdirect</Typography>
                <Typography sx={{ marginTop: '20px' }}>Powered by Myntra</Typography>
                <TextField label='Email' variant='standard' type='text' sx={{ marginTop: '30px', width: '90%', fontSize: '30px' }} value={vemail}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => {
                        if (vemail.length == 0)
                            document.getElementById('vendor_resetpwd_errormsg').innerText = 'Please Enter Proper Mail ID!!!';
                        else
                            document.getElementById('vendor_resetpwd_errormsg').innerText = '';

                    }} />
                <TextField id='loginandpwd' label='Password' variant='standard' type='password' sx={{ marginTop: '30px', width: '90%', fontSize: '30px' }}
                    value={vpwd} onChange={(e) => setPwd(e.target.value)}
                    onBlur={() => {
                        function pwd1() {
                            if (vpwd.length > 0 && vpwd.length == 8) {
                                document.getElementById('val1').style.color = 'green';
                                document.getElementById('val1').style.backgroundColor = 'lightgreen';
                                document.getElementById('vendor_resetpwd_errormsg').innerText = '';
                            }
                            else if ((vpwd.length > 0 && vpwd.length < 8) || (vpwd.length > 0 && vpwd.length > 8)) {
                                document.getElementById('val1').style.color = 'red';
                                document.getElementById('val1').style.backgroundColor = 'rgb(248, 166, 166)';
                                document.getElementById('vendor_resetpwd_errormsg').innerText = 'Please Enter valid Password satisfies above criteria!!!';
                            }
                            else if (vpwd.length == 0) {
                                document.getElementById('val1').style.color = 'red';
                                document.getElementById('val1').style.backgroundColor = 'rgb(248, 166, 166)';
                                document.getElementById('vendor_resetpwd_errormsg').innerText = 'Please Enter valid Password satisfies above criteria!!!';
                            }
                        }
                        function pwd2() {
                            if (pwdpat2.test(vpwd)) {
                                document.getElementById('val2').style.color = 'green';
                                document.getElementById('val2').style.backgroundColor = 'lightgreen';
                            }
                            else if (pwdpat2.test(vpwd) === false) {
                                document.getElementById('val2').style.color = 'red';
                                document.getElementById('val2').style.backgroundColor = 'rgb(248, 166, 166)';
                            }
                        }
                        function pwd3() {
                            if (pwdpat3.test(vpwd)) {
                                document.getElementById('val3').style.color = 'green';
                                document.getElementById('val3').style.backgroundColor = 'lightgreen';
                            }
                            else if (pwdpat3.test(vpwd) === false) {
                                document.getElementById('val3').style.color = 'red';
                                document.getElementById('val3').style.backgroundColor = 'rgb(248, 166, 166)';
                            }
                        }
                        function pwd4() {
                            if (pwdpat4.test(vpwd)) {
                                document.getElementById('val4').style.color = 'green';
                                document.getElementById('val4').style.backgroundColor = 'lightgreen';
                                if (vemail.length > 0 && vpwd.length > 0)
                                    pwd5();
                                else
                                    alert('Please fill all the fields')
                            }
                            else if (pwdpat4.test(vpwd) === false) {
                                document.getElementById('val4').style.color = 'red';
                                document.getElementById('val4').style.backgroundColor = 'rgb(248, 166, 166)';
                            }
                        }

                        async function pwd5() {
                            setLoader(true);
                            axios.post(`${process.env.REACT_APP_BACKEND_URL}/vendor_login`, { userdata: vemail, password: vpwd })
                                .then((data) => {
                                    if (data.data.data == true && data.data.vendor_key != undefined) {
                                        setCredentials(true);
                                        props.getVendorLogin(vemail);
                                        localStorage.setItem('vendor_key', data.data.vendor_key);

                                    }
                                    else if (data.data.data == false || data.data.vndor_key == undefined) {
                                        setCredentials(false);
                                    }
                                    setDisable(false);
                                    setLoader(false);
                                })
                        }
                        pwd1();
                        pwd2();
                        pwd3();
                        pwd4();
                        pwd5();
                    }} />
                <Box sx={{ display: 'flex', alignItems: "center", justifyContent: 'space-between', marginLeft: '5px', marginRight: '5px', marginTop: '20px' }}>
                    <Typography id='val1' sx={{ flex: 3, borderRadius: '5px', border: '1px solid transparent', backgroundColor: "lightgrey", textAlign: "center", padding: '5px 5px' }}>8 Characters</Typography>
                    <Typography id='val2' sx={{ flex: 3, borderRadius: '5px', border: '1px solid transparent', backgroundColor: "lightgrey", textAlign: "center", padding: '5px 5px', marginLeft: '5px' }}>1 Uppercase </Typography>
                    <Typography id='val3' sx={{ flex: 3, borderRadius: '5px', border: '1px solid transparent', backgroundColor: "lightgrey", textAlign: "center", padding: '5px 5px', marginLeft: '5px' }}>1 Numeric</Typography>
                    <Typography id='val4' sx={{ flex: 3, borderRadius: '5px', border: '1px solid transparent', backgroundColor: "lightgrey", textAlign: "center", padding: '5px 5px', marginLeft: '5px' }}>1 Special</Typography>
                </Box>
                <FormControlLabel sx={{ marginTop: '30px' }} label='Show Password' control={<Checkbox
                    onChange={(e, newValue) => setCheckState(newValue)} />}></FormControlLabel><br />
                <span id='vendor_resetpwd_errormsg' style={{ marginLeft: '40px', color: "red", marginTop: '20px', fontFamily: 'TimesNewRoman', display: 'inline-block' }}></span>
                <br></br>
                {loader == true ? <Loader /> : <>
                    <Button color='primary' sx={{
                        fontSize: '20px', marginTop: '30px', color: 'white', backgroundColor: 'blue', width: '90%',
                        '&:hover': { color: 'white', backgroundColor: 'blue' }
                    }} component={Link} to={targetlink}
                        disabled={disab}
                        onClick={() => {
                            if (logged == false) {
                                toast.error('Wrong Credentials! Please Retry', { autoClose: 3000 });
                                setTimeout(() => {
                                    window.location.reload(true);
                                }, 4000)
                            }
                        }}>LOG IN </Button>
                </>}
                <Button disableTouchRipple sx={{
                    marginTop: '40px', textDecoration: 'none', fontWeight: 'bold',
                    textTransform: 'none', fontSize: '18px',
                    '&:hover': { backgroundColor: 'transparent' }
                }} onClick={() => {
                    let mail = window.prompt("Please Enter the mail id to send reset password link", '')
                    if (mail.length > 3) {
                        axios.post(`${process.env.REACT_APP_BACKEND_URL}/vendor_reset_mailpwd`,
                            {
                                email: mail
                            })
                            .then((data) => {
                                if (data.data != 0) {
                                    window.location.replace('/partnerhome/reset_pwd')
                                }
                                else if (data.data == 0) {
                                    toast.error('Wrong Credentials! Please retry', { autoClose: 3000 })
                                    setTimeout(() => {
                                        window.location.reload(true)
                                    }, 4000)
                                }
                            })
                    }
                    else {
                        alert('Pleas Enter the mail ID to reset the password!!')
                    }
                }}>Forgot Password</Button>
            </Box >
        </>
    )
}

const mapStateToProps = (cstate) => {
    return {
        vendor_login: cstate.vendor_login
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getVendorLogin: (data) => dispatch(getVendorLogin(data)),
        setNavBar: (data) => dispatch(setNavBar(data)),
        setFooter: (data) => dispatch(setFooter(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(VenderLoginAndPassword);