import { useEffect, useState } from "react";
import { AppBar, Toolbar, Box, Typography, TextField, Button, InputAdornment } from '@mui/material';
import { Link, NavLink } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { setNavBar, setFooter } from "../Redux_Store/Action_Creators";
import { connect } from 'react-redux';
const Admin_Signup = (props) => {

    const [hiddenPwd, getInput] = useState(false);
    const [visiblePwd, checkInput] = useState(false);
    //to set the Input Values
    const [emailid, setEmailID] = useState('');
    const [pwd, setPassword] = useState('');
    const [admin_profile, setAdminProfile] = useState('');
    //Set the flag if Values satisfies the Pattern.
    const [signup_email, setSignUpEmail] = useState(false);
    const [signup_pwd, setSignUpPwd] = useState(false);
    const [imageflag, setImageFlag] = useState(false);
    const [adminid, setAdminId] = useState('');
    const [logged, setCredentials] = useState('');
    const [targetlink, setTargetLink] = useState('');
    //disableattr state
    const [disab, setDisable] = useState(true);
    const [loader, setLoader] = useState(true);
    const [buttonloader, setButtonLoader] = useState(false);
    //pattern Definition
    const emailPattern = /(\w)+@(\w)+\.[a-zA-Z]{2,}/;
    const pwdpat2 = /[A-Z]+/;
    const pwdpat3 = /[0-9]+/;
    const pwdpat4 = /[@#\$\&\^\(\)!]+/;

    const admin_signup = 'Welcome to Admin Signup Page'
    useEffect(() => {
        async function pwd1() {
            if ((pwd.length >= 5) && (pwd.length <= 10) && (pwdpat2.test(pwd) == true) &&
                (pwdpat3.test(pwd) == true) && (pwdpat4.test(pwd) == true))
                await setSignUpPwd(true)
            else
                await setSignUpPwd(false)
        }
        pwd1()
    }, [pwd, pwdpat2, pwdpat3, pwdpat4])
    useEffect(() => {
        document.title = 'Admin Panel'
        document.body.style.backgroundColor = 'rgb(250, 223, 239)';
        toast.info('Welcome to Admin Signup Page!', {
            autoClose: 3000, position: toast.POSITION.BOTTOM_RIGHT,
            toastId: 'admin_signup'
        })
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_admin_cnt`)
            .then((data) => {
                if (Number(data.data.data) == 0)
                    setAdminId(1);
                else if (data.data.data != 0)
                    setAdminId(Number(data.data.data) + 1)
                setLoader(false);
            })
        props.setNavBar('');
        props.setFooter('');
    }, [])
    useEffect(() => {
        if (logged) {
            setTargetLink('/admin/login');
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/delete_admin_profile`)
                .then(() => { })
        }
        else
            setTargetLink('/admin/signup')
    }, [logged])
    return (
        <>
            {loader == true ? <Loader /> : <>
                <ToastContainer />
                <AppBar>
                    <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', backgroundColor: 'white' }}>
                        <Button disableTouchRipple sx={{
                            flex: 1,
                            backgroundColor: 'transparent', border: 'none',
                            '&:hover': { backgroundColor: 'transparent', border: 'none' }
                        }}
                            component={Link} to='/admin/home'><img src='/Images/myntra_favicon.png' alt='Not loaded' width='100vw' height='70vh' style={{ flex: 1 }} /></Button>
                        <Typography sx={{ color: "grey", flex: 4, fontSize: '25px' }}>Admin Panel</Typography>
                        <Box sx={{ flex: 5, marginLeft: '650px' }}>
                            <Button sx={{
                                textTransform: 'none', padding: '10px 30px', fontSize: '18px', fontFamily: 'monospace',
                                color: 'white', backgroundColor: 'rgb(243, 66, 140)', '&:hover': {
                                    backgroundColor: 'rgb(243,66,140)'
                                }
                            }} component={Link} to='/admin/login' >Login</Button>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Box sx={{ backgroundColor: 'white', width: '500px', height: '650px', margin: 'auto', marginTop: '160px' }}>
                    <Typography variant='h6' sx={{ paddingLeft: '40px', paddingTop: '30px', fontWeight: 'bold' }}>Signup with a Account </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '40px', marginTop: '20px' }}>
                        <Typography sx={{ flex: 3, fontFamily: 'cursive', fontSize: '18px' }} color='error'>Admin ID : </Typography>
                        <Typography sx={{ flex: 9, fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }} color='primary'>{adminid}</Typography>
                    </Box>
                    <TextField required label='Email ID' name='admin_email' type='email' variant='outlined' sx={{ width: '85%', marginLeft: '40px', marginTop: '20px' }} value={emailid}
                        onChange={(e) => setEmailID(e.target.value)}
                        onBlur={(e) => {
                            if (emailid.length != 0) {
                                if (emailPattern.test(emailid) === false) {
                                    document.getElementById('admin_signup_error_msg').innerText = 'Please Enter Proper Email ID!!!';
                                    document.getElementById('admin_signup_error_msg').style.display = 'inline-block'
                                    setSignUpEmail(false);
                                }
                                else if (emailPattern.test(emailid)) {
                                    document.getElementById('admin_signup_error_msg').style.display = 'none'
                                    setSignUpEmail(true);
                                }
                            }
                            else {
                                setSignUpEmail(false);
                            }
                        }}
                        InputLabelProps={{ shrink: emailid != '' ? true : false }} />
                    <Typography sx={{ marginLeft: "40px", marginTop: '20px', fontWeight: "bold" }} color='error'>Profile Photo.</Typography>
                    <TextField type='file' sx={{ marginTop: '10px', marginLeft: '40px' }} name='admin_profile_photo' variant='standard'
                        onChange={async (e) => {
                            setAdminProfile(e.target.files[0])
                        }}
                        onBlur={async () => {
                            async function pwd1() {
                                if (admin_profile == '' || admin_profile == undefined) {
                                    document.getElementById('admin_signup_error_msg').innerText = await 'Profile Photo Can\'t be blank!';
                                    await setImageFlag(false);
                                }
                                else if (admin_profile != '' || admin_profile != undefined) {
                                    document.getElementById('admin_signup_error_msg').innerText = await '';
                                    await setImageFlag(true)
                                }
                            }

                            pwd1();
                        }} />
                    <TextField required id='login_password' name='admin_password' label='Password' type='password' variant='outlined' sx={{ width: '85%', marginLeft: '40px', marginTop: '30px' }}
                        onInput={async (e) => {
                            if (e.target.value.length > 0 && visiblePwd === false) {
                                await getInput(true);
                            }
                            else if (e.target.value.length == 0) {
                                getInput(false);
                            }
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position='end'>
                                {hiddenPwd ? <VisibilityOffIcon sx={{ cursor: 'pointer' }} onClick={() => {
                                    checkInput(true);
                                    getInput(false);
                                    document.getElementById('login_password').type = 'text'
                                }} /> : ''}
                                {visiblePwd ? <VisibilityIcon sx={{ cursor: 'pointer' }} onClick={() => {
                                    checkInput(false);
                                    getInput(true);
                                    document.getElementById('login_password').type = 'password'
                                }} /> : ''}
                            </InputAdornment>
                        }} value={pwd}
                        InputLabelProps={{ shrink: pwd != '' ? true : false }}
                        onChange={(e) => {
                            setPassword(e.target.value);

                        }}
                        onBlur={() => {
                            async function pwd2() {
                                setButtonLoader(true);
                                if (signup_email === true && signup_pwd === true && imageflag == true) {
                                    let formData = await new FormData();
                                    await formData.append('admin_id', adminid);
                                    await formData.append('email', emailid);
                                    await formData.append('password', pwd);
                                    await formData.append('admin_profile', admin_profile)
                                    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin_signup`, formData, {
                                        headers: {
                                            "Content-Type": 'multipart-formdata'
                                        }
                                    }).then((data) => {
                                        if (data.data.admin_email != undefined) {
                                            setCredentials(true);
                                        }
                                        else {
                                            setCredentials(false);
                                        }
                                        setDisable(false);
                                        setButtonLoader(false);
                                    })
                                }
                                else {
                                    toast.error('Please fill correct details', { autoClose: 3000, position: 'bottom-right' })
                                }
                            }
                            pwd2()
                        }}
                    />
                    < div style={{ marginLeft: '40px', fontFamily: 'TimeNewRoman', marginTop: '20px', marginRight: '40px' }}>
                        {/* pattern1*/}
                        {
                            pwd.length >= 5 && pwd.length <= 10 &&
                            < Box style={{ fontFamily: 'TimesNewRoman', fontSize: '18px', display: "flex", alignItems: "center", marginTop: '5px' }}>
                                <CheckCircleOutlineIcon sx={{ color: 'green' }} />
                                <Typography sx={{ marginLeft: "10px", color: "green" }}>Should be atleast 5 characters and at most 10 characters long.</Typography>
                            </Box>
                        }
                        {
                            ((pwd.length > 0 && pwd.length < 5) || (pwd.length > 10)) && <Box style={{ fontFamily: 'TimesNewRoman', fontSize: '18px', display: "flex", alignItems: "center", marginTop: '5px' }}>
                                <CancelIcon sx={{ color: 'red' }} />
                                <Typography sx={{ marginLeft: "10px", color: "red" }}> Should be atleast 5 characters and at most 10 characters long.</Typography>
                            </Box>
                        }
                        {
                            pwd.length === 0 && <>
                                <Box style={{ fontFamily: 'TimesNewRoman', fontSize: '18px', display: "flex", alignItems: "center", marginTop: '5px' }}>
                                    <Typography sx={{ marginLeft: "10px" }}> Should be atleast 5 characters and at most 10 characters long.</Typography>
                                </Box>
                            </>
                        }
                        {/* pattern2 */}
                        {
                            pwd.length > 0 && pwdpat2.test(pwd) === true && <Box style={{ fontFamily: 'TimesNewRoman', fontSize: '18px', display: "flex", alignItems: "center", marginTop: '5px' }}>
                                <CheckCircleOutlineIcon sx={{ color: 'green' }} />
                                <Typography sx={{ marginLeft: "10px", color: "green" }}>Should contain a uppercase letter.</Typography>
                            </Box>
                        }
                        {
                            pwd.length > 0 && pwdpat2.test(pwd) === false && <Box style={{ fontFamily: 'TimesNewRoman', fontSize: '18px', display: "flex", alignItems: "center", marginTop: '5px' }}>
                                <CancelIcon sx={{ color: 'red' }} />
                                <Typography sx={{ marginLeft: "10px", color: "red" }}> Should contain a uppercase letter.</Typography>
                            </Box>
                        }
                        {
                            pwd.length === 0 && <>
                                <Box style={{ fontFamily: 'TimesNewRoman', fontSize: '18px', display: "flex", alignItems: "center", marginTop: '5px' }}>
                                    <Typography sx={{ marginLeft: "10px" }}>Should contain a uppercase letter.</Typography>
                                </Box>
                            </>
                        }
                        {/* pattern3 */}
                        {
                            pwd.length > 0 && pwdpat3.test(pwd) === true && <Box style={{ fontFamily: 'TimesNewRoman', fontSize: '18px', display: "flex", alignItems: "center", marginTop: '5px' }}>
                                <CheckCircleOutlineIcon sx={{ color: 'green' }} />
                                <Typography sx={{ marginLeft: "10px", color: "green" }}>Should contain a number.</Typography>
                            </Box>
                        }
                        {
                            pwd.length > 0 && pwdpat3.test(pwd) === false && <Box style={{ fontFamily: 'TimesNewRoman', fontSize: '18px', display: "flex", alignItems: "center", marginTop: '5px' }}>
                                <CancelIcon sx={{ color: 'red' }} />
                                <Typography sx={{ marginLeft: "10px", color: "red" }}>Should contain a number.</Typography>
                            </Box>
                        }
                        {
                            pwd.length === 0 && <>
                                <Box style={{ fontFamily: 'TimesNewRoman', fontSize: '18px', display: "flex", alignItems: "center", marginTop: '5px' }}>
                                    <Typography sx={{ marginLeft: "10px" }}>Should contain a number.</Typography>
                                </Box>
                            </>
                        }
                        {/* pattern4 */}
                        {
                            pwd.length > 0 && pwdpat4.test(pwd) === true && <Box style={{ fontFamily: 'TimesNewRoman', fontSize: '18px', display: "flex", alignItems: "center", marginTop: '5px' }}>
                                <CheckCircleOutlineIcon sx={{ color: 'green' }} />
                                <Typography sx={{ marginLeft: "10px", color: "green" }}>Should contain a special character..</Typography>
                            </Box>
                        }
                        {
                            pwd.length > 0 && pwdpat4.test(pwd) === false && <Box style={{ fontFamily: 'TimesNewRoman', fontSize: '18px', display: "flex", alignItems: "center", marginTop: '5px' }}>
                                <CancelIcon sx={{ color: 'red' }} />
                                <Typography sx={{ marginLeft: "10px", color: "red" }}>Should contain a special character.</Typography>
                            </Box>
                        }
                        {
                            pwd.length === 0 && <>
                                <Box style={{ fontFamily: 'TimesNewRoman', fontSize: '18px', display: "flex", alignItems: "center", marginTop: '5px' }}>
                                    <Typography sx={{ marginLeft: "10px" }}>Should contain a special character.</Typography>
                                </Box>
                            </>
                        }
                    </div >
                    <span id='admin_signup_error_msg' style={{ color: "rgb(224, 79, 79)", marginLeft: '40px', marginTop: '10px', fontFamily: 'TimesNewRoman', display: "none" }}></span>
                    {buttonloader == true ? <Loader /> : <>
                        <Button sx={{
                            marginLeft: '40px', fontWeight: 'bold', marginTop: '20px', width: '80%', padding: '10px', fontSize: '17px', backgroundColor: 'rgb(243, 66, 140)',
                            '&:hover': { backgroundColor: 'rgb(243, 66, 140)' }
                        }} variant='contained' component={Link} to='/admin/login' disabled={disab}
                            onClick={async (e) => {
                                if (logged == false) {
                                    toast.error('Error ! please retry', { autoClose: 3000 })
                                    setTimeout(() => {
                                        window.location.reload(true)
                                    }, 4000)
                                }
                            }}>SUBMIT</Button >
                    </>}
                    <Typography sx={{ marginTop: '20px', marginLeft: "40px" }}>Already have an account? <NavLink style={{ textDecoration: 'none', color: 'magenta' }} to='/admin/login'>Login</NavLink></Typography>
                </Box >
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
export default connect(null, mapDispatchToProps)(Admin_Signup);