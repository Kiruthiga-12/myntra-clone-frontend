import { useEffect, useState } from "react";
import { AppBar, Toolbar, Box, Typography, TextField, Button, InputAdornment } from '@mui/material';
import { Link, NavLink } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { getAdminLogin, setNavBar, setFooter } from '../Redux_Store/Action_Creators';
import Loader from '../Loader/Loader';
const Admin_Login = (props) => {

    const [hiddenPwd, getInput] = useState(false);
    const [visiblePwd, checkInput] = useState(false);


    //to store Email and password.
    const [login_mail, setLoginEmail] = useState('');
    const [login_password, setLoginPassword] = useState('');

    const admin_login = 'Welcome to Admin Login Page!';
    //disable Status
    const [disab, setDisable] = useState(true);

    //patterns
    const mailPattern = /(\w)+@(\w)+\.[a-zA-Z]{2,}/;

    //Status to enable Submit Button
    const [loginmailstatus, setEmailStatus] = useState(false);
    const [targetlink, setTargetLink] = useState('');
    const [logged, setCredentials] = useState('');
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        function pwd2() {
            if (logged)
                setTargetLink('/admin/home')
            else if (logged === false)
                setTargetLink('/admin/login')
        }
        pwd2()
    }, [logged])
    useEffect(() => {
        toast.info('Welcome to Admin Login Page!', {
            autoClose: 3000, position: toast.POSITION.BOTTOM_RIGHT,
            toastId: 'admin_login'
        })
        document.title = 'Admin Panel'
        document.body.style.backgroundColor = 'rgb(250, 223, 239)';
        props.setNavBar('')
        props.setFooter('')
    }, [])
    return (
        <>
            <ToastContainer />
            <AppBar>
                <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', backgroundColor: 'white' }}>
                    {
                        props.admin_login != '' &&
                        <Button disableTouchRipple sx={{
                            flex: 1,
                            backgroundColor: 'transparent', border: 'none',
                            '&:hover': { backgroundColor: 'transparent', border: 'none' }
                        }}
                            component={Link} to='/admin/home'><img src='/Images/myntra_favicon.png' alt='Not loaded' width='100vw' height='70vh' style={{ flex: 1 }} /></Button>
                    }
                    {props.admin_login == '' &&
                        <Button disableTouchRipple sx={{
                            flex: 1,
                            backgroundColor: 'transparent', border: 'none',
                            '&:hover': { backgroundColor: 'transparent', border: 'none' }
                        }}><img src='/Images/myntra_favicon.png' alt='Not loaded' width='100vw' height='70vh' style={{ flex: 1 }} /></Button>}
                    <Typography sx={{ color: "grey", flex: 6, fontSize: '25px' }}>Admin Panel</Typography>
                    <Box sx={{ flex: 5, marginLeft: '650px' }}>
                        <Button sx={{
                            textTransform: 'none', padding: '10px 30px', fontSize: '18px', fontFamily: 'monospace',
                            color: 'white', backgroundColor: 'rgb(243, 66, 140)', '&:hover': {
                                backgroundColor: 'rgb(243,66,140)'
                            }
                        }} component={Link} to='/admin/signup' >Register</Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box sx={{ backgroundColor: 'white', width: '500px', height: '580px', margin: 'auto', marginTop: '160px' }}>
                <Typography variant='h6' sx={{ paddingLeft: '40px', paddingTop: '30px', fontWeight: 'bold' }}>Login to your account </Typography>
                <TextField required label='Email ID' type='email' variant='outlined' sx={{ width: '85%', marginLeft: '40px', marginTop: '40px' }}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    onBlur={(e) => {
                        if (login_mail.length != 0) {
                            if (mailPattern.test(login_mail) === false) {
                                document.getElementById('admin_login_error').innerText = 'Please Enter Proper Email ID!!!';
                                document.getElementById('admin_login_error').style.display = 'inline-block'
                                setEmailStatus(false);
                            }
                            else if (mailPattern.test(login_mail) == true) {
                                document.getElementById('admin_login_error').style.display = 'none'
                                setEmailStatus(true);
                            }
                        }
                        else {
                            setEmailStatus(false);
                        }
                    }} />
                <TextField required id='login_password' label='Password' type='password' variant='outlined' sx={{ width: '85%', marginLeft: '40px', marginTop: '30px' }}
                    onChange={(e) => setLoginPassword(e.target.value)}
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
                    }}
                    onBlur={async () => {
                        if (loginmailstatus === true) {
                            setLoader(true);
                            axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin_login`, { email: login_mail, password: login_password })
                                .then((data) => {
                                    if (data.data.admin_key != undefined) {
                                        setCredentials(true);
                                        props.getAdminLogin(login_mail);
                                        localStorage.setItem('admin_key', data.data.admin_key)
                                    }
                                    else {
                                        setCredentials(false);
                                    }
                                    setDisable(false);
                                    setLoader(false);
                                }).catch((error) => { })
                        }
                        else {
                            toast.error('Please fill correct details', { autoClose: 3000, position: 'bottom-right' })
                        }
                    }} />
                <span id='admin_login_error' style={{ color: "rgb(224, 79, 79)", marginLeft: '40px', marginTop: '10px', fontFamily: 'TimesNewRoman', display: "none" }}></span>
                {loader == true ? <Loader /> : <>
                    <Button sx={{
                        marginLeft: '40px', fontWeight: 'bold', marginTop: '30px', width: '80%', padding: '10px', fontSize: '17px', backgroundColor: 'rgb(243, 66, 140)',
                        '&:hover': { backgroundColor: 'rgb(243, 66, 140)' }
                    }} variant='contained' component={Link} to={targetlink} disabled={disab}
                        onClick={async (e) => {
                            if (logged == false) {
                                toast.error('Wrong Credentials. Please Retry!!', { autoClose: 3000, position: toast.POSITION.BOTTOM_RIGHT });
                                setTimeout(() => {
                                    window.location.reload(true);
                                }, 4000)
                            }
                        }}>LOGIN</Button>
                </>}
                <Button disableTouchRipple sx={{
                    marginLeft: '40px',
                    marginTop: '40px', textDecoration: 'none', fontWeight: 'bold',
                    textTransform: 'none', fontSize: '18px',
                    '&:hover': { backgroundColor: 'transparent' }
                }} onClick={async () => {
                    let mail = await window.prompt("Please Enter the mail id to send reset password link", '')
                    if (mail.length > 3) {
                        axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin_reset_mailpwd`,
                            {
                                email: mail
                            })
                            .then((data) => {
                                if (data.data != 0) {
                                    window.location.replace('/admin_reset_pwd')
                                }
                                else if (data.data == 0) {
                                    toast.error('Wrong Credentials! Please retry', { autoClose: 3000 })
                                    setTimeout(() => {
                                        window.location.reload(true)
                                    }, 4000)
                                }
                            })
                            .catch((error) => { })
                    }
                    else {
                        alert('Please Enter the mail ID to reset the password!!')
                    }
                }}>Forgot Password</Button>
                <Typography sx={{ marginTop: '20px', marginLeft: "40px" }}>Don't have an account? <NavLink style={{ textDecoration: 'none', color: 'magenta' }} to='/admin/signup'>Sign up</NavLink></Typography>
            </Box>
        </>
    )
}
const mapStateToProps = (cstate) => {
    return {
        admin_login: cstate.admin_login
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAdminLogin: (data) => dispatch(getAdminLogin(data)),
        setNavBar: (data) => dispatch(setNavBar(data)),
        setFooter: (data) => dispatch(setFooter(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Admin_Login);