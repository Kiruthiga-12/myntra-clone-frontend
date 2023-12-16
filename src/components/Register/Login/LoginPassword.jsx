import { Box, Typography, TextField, Button, InputAdornment } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { connect } from 'react-redux';
import { userLogged, getUserData, setNavBar, setFooter } from '../../Redux_Store/Action_Creators';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../Loader/Loader';
const LoginPassword = (props) => {
    const [hiddenPwd, getInput] = useState(false);
    const [visiblePwd, checkInput] = useState(false);
    //status
    const [disab, setDisable] = useState(true);
    const [targetlink, setTargetLink] = useState('');
    const [logged, setCredentials] = useState('');
    //storing value
    const [mailormobno, setValue] = useState('');
    const [pwd, setPwd] = useState('');
    const [loader, setLoader] = useState(false);
    const user_login = 'Welcome To Login Page';
    useEffect(() => {
        function pwd2() {
            if (logged == true)
                setTargetLink('/home')
            else if (logged != true)
                setTargetLink('/loginpassword');
        }
        pwd2();
    }, [logged])
    useEffect(() => {
        document.title = 'Myntra';
        toast.success('Welcome To Login Page', {
            autoClose: 3000,
            toastId: 'user_login',
            position: toast.POSITION.BOTTOM_RIGHT
        })
        props.setNavBar('navbar');
        props.setFooter('');
    }, [])
    return (
        <>
            <ToastContainer />
            <Box sx={{ backgroundColor: 'rgb(250, 223, 239)', width: '100vw', marginLeft: '-12px', height: '87vh', overflow: 'hidden', marginTop: '94px' }}>
                <Box sx={{ backgroundColor: 'white', width: '500px', height: '600px', margin: 'auto', marginTop: '50px' }}>
                    <Typography variant='h6' sx={{ paddingLeft: '40px', paddingTop: '30px', fontWeight: 'bold' }}>Login to your account </Typography>
                    <TextField label='Email or Mobile Number' type='text' variant='outlined' sx={{ width: '85%', marginLeft: '40px', marginTop: '40px' }} required
                        value={mailormobno}
                        onChange={(e) => setValue(e.target.value)}
                        onBlur={() => {
                            if (mailormobno.length == 0)
                                document.getElementById('userlogin_error_message').innerText = 'Please Enter Email Or Mobile No!!!';
                            else
                                document.getElementById('userlogin_error_message').innerText = '';

                        }} />
                    <TextField id='login_password' label='Password' type='password' variant='outlined' sx={{ width: '85%', marginLeft: '40px', marginTop: '30px' }} required
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                        onBlur={() => {
                            async function pwd1() {
                                if (pwd.length == 0)
                                    document.getElementById('userlogin_error_message').innerText = 'Please Enter Password!!!';
                                else
                                    document.getElementById('userlogin_error_message').innerText = '';
                            }
                            async function pwd2() {
                                setLoader(true);
                                await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user_login`, { userdata: mailormobno, password: pwd })
                                    .then((data) => {
                                        if (data.data.length === 1 && data.data[0].user_key != undefined) {
                                            props.userLogged();
                                            props.getData(data.data[0]);
                                            setCredentials(true);
                                            localStorage.setItem('user_key', data.data[0].user_key);
                                        }
                                        else if (data.data.length == 0 || data.data[0].user_key == undefined) {
                                            setCredentials(false);
                                        }
                                        setDisable(false);
                                        setLoader(false);
                                    })
                            }
                            pwd1();
                            if (mailormobno.length > 0 && pwd.length > 0)
                                pwd2();
                            else
                                toast.error('Please fill correct details!', { autoClose: 3000, position: "bottom-right" })
                        }}
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
                        }} />

                    <span id='userlogin_error_message' style={{ marginLeft: '40px', color: "red", marginTop: '30px', fontFamily: 'TimesNewRoman', display: 'inline-block' }}></span>
                    <br></br>
                    {loader == true ? <Loader /> : <>
                        <Button sx={{
                            postion: "relative",
                            marginLeft: '40px', fontWeight: 'bold', marginTop: '40px', width: '80%', padding: '10px', fontSize: '17px', backgroundColor: 'rgb(243, 66, 140)',
                            '&:hover': { backgroundColor: 'rgb(243, 66, 140)' }
                        }} variant='contained' component={Link} to={targetlink}
                            disabled={disab}
                            onClick={async () => {
                                if (logged === false) {
                                    toast.error('Wrong Credentials! Please retry', { autoClose: 3000 });
                                    setTimeout(() => {
                                        window.location.reload(true)
                                    }, 4000)
                                }
                            }
                            }>LOGIN</Button>
                    </>}
                    <Typography variant='body1' sx={{ color: 'grey', paddingLeft: '40px', paddingTop: '30px', fontWeight: 'bold', fontSize: '14px' }}>Forgot your password?
                        <NavLink style={{
                            fontFamily: 'Arial', textDecoration: 'none', color: 'rgb(243, 66, 140)', fontWeight: 'bold'
                        }} component={Link} to='/resetpassword'> Reset here </NavLink> </Typography>
                    <Typography variant='body1' sx={{ color: 'grey', paddingLeft: '40px', paddingTop: '30px', fontWeight: 'bold', fontSize: '14px' }}>Having Trouble logging in?
                        <NavLink style={{
                            fontFamily: 'Arial', textDecoration: 'none', color: 'rgb(243, 66, 140)', fontWeight: 'bold'
                        }} component={Link} to='/recovery'> Get help </NavLink> </Typography>
                </Box>
            </Box >
        </>
    )
}


const mapDispatchToProps = (dispatch) => {
    return {
        userLogged: () => dispatch(userLogged()),
        getData: (arr) => dispatch(getUserData(arr)),
        setNavBar: (data) => dispatch(setNavBar(data)),
        setFooter: (data) => dispatch(setFooter(data))
    }
}
export default connect(null, mapDispatchToProps)(LoginPassword);