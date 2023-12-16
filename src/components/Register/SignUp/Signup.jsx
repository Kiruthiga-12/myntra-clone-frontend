import { Box, Typography, TextField, Button, InputAdornment, Radio, FormControlLabel, RadioGroup, FormControl, FormLabel, stepButtonClasses } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VerifiedIcon from '@mui/icons-material/Verified';
import axios from 'axios';
import { connect } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../Loader/Loader';
import { setNavBar, setFooter } from '../../Redux_Store/Action_Creators';
const Signup = (props) => {

    const [hiddenPwd, getInput] = useState(false);
    const [visiblePwd, checkInput] = useState(false);

    //pattern Definition
    const emailPattern = /(\w)+@(\w)+\.[a-zA-Z]{2,}/;
    const namepat = /[A-Za-z]{2,30}/;
    const pwdpat2 = /[A-Z]+/;
    const pwdpat3 = /[0-9]+/;
    const pwdpat4 = /[@#\$\&\^\(\)!]+/;
    const mobilepattern = /^[6-9]+[0-9]{9,9}/;

    //storing value
    const [mobno, setMobNo] = useState('');
    const [signuppwd, setSignupPwd] = useState('');
    const [signupfullname, setSignupName] = useState('');
    const [signupmail, setSignupMail] = useState('');
    const [signupgender, setSignupGender] = useState('');
    const [signup_altmobile, setSignup_AlterMobile] = useState('');
    const [disab, setDisable] = useState(true);
    const [targetlink, setTargetLink] = useState('');

    //status:
    const [namestatus, setNameStatus] = useState(false);
    const [mailstatus, setMailStatus] = useState(false);
    const [altmobstatus, setAltMobileStatus] = useState(false);
    const [logged, setCredentials] = useState('');
    const user_signup = 'Welcome To Signup Page';

    //userid
    const [userid, setUserId] = useState(0)
    const [activecnt, setActiveCnt] = useState();
    const [removedcnt, setRemovedCnt] = useState();

    const [user_profile, setUserProfile] = useState()
    const [imageflag, setImageFlag] = useState(false);
    const [loader, setLoader] = useState(true);
    const [buttonloader, setButtonLoader] = useState(true)
    useEffect(() => {
        document.title = 'Myntra';
        function func2() {
            if (logged) {
                setTargetLink('/loginpassword');
                axios.get(`${process.env.REACT_APP_BACKEND_URL}/delete_user_profile`)
                    .then((data) => { })
            }
        }
        func2();
    }, [logged])
    useEffect(() => {
        toast.success('Welcome To Signup Page', {
            autoClose: 3000,
            toastId: 'user_signup',
            position: toast.POSITION.BOTTOM_RIGHT
        })
        const active_user = axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_user_cnt`);
        const removed_user = axios.get(`${process.env.REACT_APP_BACKEND_URL}/removed_user_cnt`);
        axios.all([active_user, removed_user])
            .then(axios.spread(function (active_cnt, removed_cnt) {
                active_cnt.data.data == 0 ? setUserId(1) : setActiveCnt(active_cnt.data.data)
                removed_cnt.data.data != 0 ? setRemovedCnt(removed_cnt.data.data) : setRemovedCnt(0)
                setMobNo(document.getElementById('mobno').value);
            }))
        props.setNavBar('navbar');
        props.setFooter('');
    }, [])
    useEffect(() => {
        function pwd() {
            if (activecnt > removedcnt) {
                setUserId(activecnt + 1);
            }
            else if (removedcnt > activecnt) {
                setUserId(removedcnt + 1)
            }
            setLoader(false);
        }
        if (activecnt != undefined && removedcnt != undefined)
            pwd();
    }, [removedcnt])
    return (
        <>
            {loader == true ? <Loader /> : <>
                <ToastContainer />
                <Box sx={{ backgroundColor: 'rgb(250, 223, 239)', width: '100vw', marginLeft: '-35px', height: '130vh', overflow: 'hidden', marginTop: '94px' }}>
                    <Box sx={{ backgroundColor: 'white', width: '500px', height: '950px', margin: 'auto', marginTop: '50px' }}>
                        <Typography variant='h6' sx={{ paddingLeft: '40px', paddingTop: '30px', fontWeight: 'bold' }}>complete your signup </Typography>
                        <Typography sx={{
                            color: 'grey', marginTop: "20px", marginLeft: '40px'
                        }} >User Id : <span>{userid}</span></Typography>
                        <Typography sx={{
                            color: 'grey', marginTop: "20px", marginLeft: '40px'
                        }} >Mobile Number</Typography>
                        < Box sx={{ marginTop: "5px", marginLeft: '30px', display: 'flex', alignItems: 'center' }}>
                            <input id='mobno' type='text' style={{ flex: 7, fontSize: '16px', width: '85%', border: 'none', outline: 'none', padding: '10px' }} value={props.user_mobile} readOnly />
                            <VerifiedIcon sx={{ color: 'green', flex: 5 }} />
                        </Box>
                        <Typography sx={{ marginTop: '5px', color: 'grey', marginLeft: '40px' }}>User Profile</Typography>
                        <TextField type='file' name='user_profile' variant='standard' sx={{ marginLeft: '40px', marginTop: '20px' }}
                            onChange={async (e) => {
                                setUserProfile(e.target.files[0])
                            }}
                            onBlur={async () => {
                                async function pwd1() {
                                    if (user_profile == '' || user_profile == undefined) {
                                        document.getElementById('sign_error_message').innerText = await 'Profile Photo Can\'t be blank!';
                                        await setImageFlag(false);
                                    }
                                    else if (user_profile != '' || user_profile != undefined) {
                                        document.getElementById('sign_error_message').innerText = await '';
                                        await setImageFlag(true)
                                    }
                                }
                                pwd1();
                            }} />
                        <TextField id='signup_password' label='Create password' type='password' variant='outlined' sx={{ width: '85%', marginLeft: '40px', marginTop: '30px' }} required value={signuppwd}
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
                                        document.getElementById('signup_password').type = 'text'
                                    }} /> : ''}
                                    {visiblePwd ? <VisibilityIcon sx={{ cursor: 'pointer' }} onClick={() => {
                                        checkInput(false);
                                        getInput(true);
                                        document.getElementById('signup_password').type = 'password'
                                    }} /> : ''}
                                </InputAdornment>
                            }}
                            onChange={(e) => setSignupPwd(e.target.value)}
                            onBlur={(e) => {
                                function pwd1() {
                                    if (signuppwd.length > 0 && signuppwd.length == 8) {
                                        document.getElementById('check1').style.color = 'green';
                                        document.getElementById('check1').style.backgroundColor = 'lightgreen';
                                        document.getElementById('sign_error_message').innerText = '';
                                    }
                                    else if ((signuppwd.length > 0 && signuppwd.length < 8) || (signuppwd.length > 0 && signuppwd.length > 8)) {
                                        document.getElementById('check1').style.color = 'red';
                                        document.getElementById('check1').style.backgroundColor = 'rgb(248, 166, 166)';
                                        document.getElementById('sign_error_message').innerText = 'Please Enter valid Password satisfies above criteria!!!';
                                    }
                                    else if (signuppwd.length == 0) {
                                        document.getElementById('check1').style.color = 'red';
                                        document.getElementById('check1').style.backgroundColor = 'rgb(248, 166, 166)';
                                        document.getElementById('sign_error_message').innerText = 'Please Enter valid Password satisfies above criteria!!!';
                                    }
                                }
                                function pwd2() {
                                    if (pwdpat2.test(signuppwd)) {
                                        document.getElementById('check2').style.color = 'green';
                                        document.getElementById('check2').style.backgroundColor = 'lightgreen';
                                    }
                                    else if (pwdpat2.test(signuppwd) === false) {
                                        document.getElementById('check2').style.color = 'red';
                                        document.getElementById('check2').style.backgroundColor = 'rgb(248, 166, 166)';
                                    }
                                }
                                function pwd3() {
                                    if (pwdpat3.test(signuppwd)) {
                                        document.getElementById('check3').style.color = 'green';
                                        document.getElementById('check3').style.backgroundColor = 'lightgreen';
                                    }
                                    else if (pwdpat3.test(signuppwd) === false) {
                                        document.getElementById('check3').style.color = 'red';
                                        document.getElementById('check3').style.backgroundColor = 'rgb(248, 166, 166)';
                                    }
                                }
                                function pwd4() {
                                    if (pwdpat4.test(signuppwd)) {
                                        document.getElementById('check4').style.color = 'green';
                                        document.getElementById('check4').style.backgroundColor = 'lightgreen';
                                    }
                                    else if (pwdpat4.test(signuppwd) === false) {
                                        document.getElementById('check4').style.color = 'red';
                                        document.getElementById('check4').style.backgroundColor = 'rgb(248, 166, 166)';
                                    }
                                }

                                pwd1();
                                pwd2();
                                pwd3();
                                pwd4();
                            }}
                        />
                        <Box sx={{ display: 'flex', alignItems: "center", justifyContent: 'space-between', marginLeft: '30px', marginRight: '30px', marginTop: '20px' }}>
                            <Typography id='check1' sx={{ flex: 3, borderRadius: '5px', border: '1px solid transparent', backgroundColor: "lightgrey", textAlign: "center", padding: '5px 5px' }}>8 Characters</Typography>
                            <Typography id='check2' sx={{ flex: 3, borderRadius: '5px', border: '1px solid transparent', backgroundColor: "lightgrey", textAlign: "center", padding: '5px 5px', marginLeft: '5px' }}>1 Uppercase </Typography>
                            <Typography id='check3' sx={{ flex: 3, borderRadius: '5px', border: '1px solid transparent', backgroundColor: "lightgrey", textAlign: "center", padding: '5px 5px', marginLeft: '5px' }}>1 Numeric</Typography>
                            <Typography id='check4' sx={{ flex: 3, borderRadius: '5px', border: '1px solid transparent', backgroundColor: "lightgrey", textAlign: "center", padding: '5px 5px', marginLeft: '5px' }}>1 Special</Typography>
                        </Box>

                        <TextField label='Full Name' variant='outlined' sx={{ marginLeft: '40px', marginTop: '30px', width: '85%' }} value={signupfullname}
                            onChange={(e) => setSignupName(e.target.value)}
                            onBlur={(e) => {
                                if (namepat.test(signupfullname)) {
                                    document.getElementById('sign_error_message').innerText = '';
                                    setNameStatus(true);
                                }
                                else {
                                    document.getElementById('sign_error_message').innerText = 'Please Enter a valid Name!!';
                                    setNameStatus(false);
                                }
                            }} />
                        <TextField label='Email(Required)' variant='outlined' sx={{ marginLeft: '40px', marginTop: '30px', width: '85%' }} value={signupmail}
                            onChange={(e) => setSignupMail(e.target.value)}
                            onBlur={(e) => {
                                if (emailPattern.test(signupmail)) {
                                    document.getElementById('sign_error_message').innerText = '';
                                    setMailStatus(true);
                                }
                                else if (emailPattern.test(signupmail) === false) {
                                    document.getElementById('sign_error_message').innerText = 'Please Enter a valid Email Address!!!';
                                    setMailStatus(false);
                                }
                            }} />
                        <FormControl sx={{ marginTop: '30px', marginLeft: '40px' }}>
                            <FormLabel id='select_gender' >Select Gender:</FormLabel>
                            <RadioGroup row aria-labelledby='select_gender' value={signupgender} onChange={(e) => setSignupGender(e.target.value
                            )}>
                                <FormControlLabel label='Female' value='Female' control={<Radio color='secondary' />} ></FormControlLabel>
                                <FormControlLabel label='Male' value='Male' control={<Radio color='secondary' />} ></FormControlLabel>
                                <FormControlLabel label='Other' value='Other' control={<Radio color='secondary' />} ></FormControlLabel>
                            </RadioGroup>
                        </FormControl>
                        <TextField id='login_id' type='mobile' sx={{ width: '85%', paddingLeft: '40px', marginTop: '20px', color: 'black' }}
                            placeholder='Alternate Mobile Number' value={signup_altmobile}
                            InputProps={{
                                startAdornment:
                                    <InputAdornment disableTypography position="start">
                                        +91 | </InputAdornment>
                            }} max={10} required helperText='This will help to recover your account if needed'
                            onChange={(e) => setSignup_AlterMobile(e.target.value)}
                            onBlur={(e) => {
                                function pwd1() {
                                    if ((mobilepattern.test(signup_altmobile)) && (signup_altmobile !== mobno)) {
                                        document.getElementById('sign_error_message').innerText = '';
                                        setAltMobileStatus(true);
                                    }
                                    else if (mobilepattern.test(signup_altmobile) === false) {
                                        document.getElementById('sign_error_message').innerText = 'Please Enter a valid Mobile Number!!';
                                        setAltMobileStatus(false);
                                    }
                                    else if (signup_altmobile === mobno) {
                                        document.getElementById('sign_error_message').innerText = 'Mobile Numbar and alternate Mobile Number can\'t have sa same value!!';
                                        setAltMobileStatus(false);
                                    }
                                }
                                async function pwd2() {
                                    setButtonLoader(true);
                                    let formData = new FormData();
                                    formData.append('user_id', userid);
                                    formData.append('mobileno', mobno);
                                    formData.append('password', signuppwd);
                                    formData.append('fullname', signupfullname);
                                    formData.append('mail_id', signupmail);
                                    formData.append('gender', signupgender);
                                    formData.append('alternate_mobile', signup_altmobile);
                                    formData.append('user_profile', user_profile);
                                    axios.post(`${process.env.REACT_APP_BACKEND_URL}/user_signup`,
                                        formData, {
                                        headers: {
                                            "Content-Type": 'multipart-formdata'
                                        }
                                    }).then((data) => {
                                        if (data.data.user_id !== undefined) {
                                            setCredentials(true)
                                        }
                                        else if (data.data.user_id === undefined) {
                                            setCredentials(false)
                                        }
                                        setDisable(false);
                                        setButtonLoader(false);
                                    })
                                }
                                pwd1();
                                if (namestatus === true && mailstatus === true && altmobstatus === true)
                                    pwd2();
                                else
                                    toast.error('Please fill correct details!', { autoClose: 3000, position: "bottom-right" })
                            }} />
                        <span id='sign_error_message' style={{ marginLeft: '40px', color: "red", marginTop: '30px', fontFamily: 'TimesNewRoman', display: 'inline-block' }}></span>
                        {buttonloader == true ? <Loader /> : <>
                            <Button sx={{
                                marginLeft: '20px', fontWeight: 'bold', marginTop: '30px', width: '80%', padding: '10px', fontSize: '17px', backgroundColor: 'rgb(243, 66, 140)',
                                '&:hover': { backgroundColor: 'rgb(243, 66, 140)' }
                            }} variant='contained' component={Link} to={targetlink} disabled={disab}
                                onClick={() => {
                                    if (logged == false) {
                                        toast.error('Error! Please retry', { autoClose: 3000 });
                                        setTimeout(() => {
                                            window.location.reload(true);
                                        }, 4000)
                                    }
                                }}>CREATE ACCOUNT</Button>
                        </>}
                    </Box>
                </Box >
            </>}
        </>
    )
}

const mapStateToProps = (cstate) => {
    return {
        user_mobile: cstate.user_mobile
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setNavBar: (data) => dispatch(setNavBar(data)),
        setFooter: (data) => dispatch(setFooter(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Signup);