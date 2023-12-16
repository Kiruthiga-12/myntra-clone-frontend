import { useEffect, useState } from "react";
import { Box, Typography, Button, TextField, InputAdornment } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { connect } from 'react-redux';
import { setNavBar, setFooter } from '../../Redux_Store/Action_Creators';
import axios from 'axios';
const NewPassword = (props) => {
    //status
    const [disab, setDisable] = useState(true);
    const [targetlink, setTargetLink] = useState('');
    const [logged, setCredentials] = useState('');
    //pwd
    const [hiddenPwd, getInput] = useState(false);
    const [visiblePwd, checkInput] = useState(false);
    //cpwd:
    const [hiddenConfirmPwd, getConfirmInput] = useState(false);
    const [visibleConfirmPwd, checkConfirmInput] = useState(false);

    //pattern
    const pwdpat2 = /[A-Z]+/;
    const pwdpat3 = /[0-9]+/;
    const pwdpat4 = /[@#\$\&\^\(\)!]+/;

    //storing values.
    const [vemail, setEmail] = useState('');
    const [newpwd, setPwd] = useState('');
    const [confirmpwd, setConfirmPwd] = useState('');

    useEffect(() => {
        document.title = 'Myntra';
        document.body.style.backgroundImage = 'url(../../Images/Galaxy.jpeg)';
        props.setNavBar('navbar');
        props.setFooter('');
        function pwd2() {
            if (logged)
                setTargetLink('/loginpassword')
            else if (logged === false)
                setTargetLink('/user_reset_pwd')
        }
        pwd2();
    }, [])

    return (
        <>
            <ToastContainer className='toastcontainer' />
            <Box sx={{
                padding: '30px', textAlign: 'center', margin: 'auto', marginTop: '140px', width: '27%', backgroundColor: 'white',
                boxShadow: '2px 2px 2px grey,-2px -2px -2px grey', height: '550px'
            }}>
                <Typography sx={{ marginTop: '20px' }}><span>User Password Reset Page </span></Typography>
                <TextField label='Email' variant='standard' type='text' sx={{ marginTop: '30px', width: '90%', fontSize: '30px' }} value={vemail}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => {
                        if (vemail.length == 0)
                            document.getElementById('user_resetpwd_errormsg').innerText = 'Please Enter Proper Mail ID!!!';
                        else
                            document.getElementById('user_resetpwd_errormsg').innerText = '';

                    }} />
                <TextField id='newpwd' label='New Password' variant='standard' type='password' sx={{ marginTop: '30px', width: '90%', fontSize: '30px' }}
                    value={newpwd} onChange={(e) => setPwd(e.target.value)}
                    onBlur={() => {
                        function pwd1() {
                            if (newpwd.length > 0 && newpwd.length == 8) {
                                document.getElementById('it1').style.color = 'green';
                                document.getElementById('it1').style.backgroundColor = 'lightgreen';
                                document.getElementById('user_resetpwd_errormsg').innerText = '';
                            }
                            else if ((newpwd.length > 0 && newpwd.length < 8) || (newpwd.length > 0 && newpwd.length > 8)) {
                                document.getElementById('it1').style.color = 'red';
                                document.getElementById('it1').style.backgroundColor = 'rgb(248, 166, 166)';
                                document.getElementById('user_resetpwd_errormsg').innerText = 'Please Enter valid Password satisfies above criteria!!!';
                            }
                            else if (newpwd.length == 0) {
                                document.getElementById('it1').style.color = 'red';
                                document.getElementById('it1').style.backgroundColor = 'rgb(248, 166, 166)';
                                document.getElementById('user_resetpwd_errormsg').innerText = 'Please Enter valid Password satisfies above criteria!!!';
                            }
                        }
                        function pwd2() {
                            if (pwdpat2.test(newpwd)) {
                                document.getElementById('it2').style.color = 'green';
                                document.getElementById('it2').style.backgroundColor = 'lightgreen';
                            }
                            else if (pwdpat2.test(newpwd) === false) {
                                document.getElementById('it2').style.color = 'red';
                                document.getElementById('it2').style.backgroundColor = 'rgb(248, 166, 166)';
                            }
                        }
                        function pwd3() {
                            if (pwdpat3.test(newpwd)) {
                                document.getElementById('it3').style.color = 'green';
                                document.getElementById('it3').style.backgroundColor = 'lightgreen';
                            }
                            else if (pwdpat3.test(newpwd) === false) {
                                document.getElementById('it3').style.color = 'red';
                                document.getElementById('it3').style.backgroundColor = 'rgb(248, 166, 166)';
                            }
                        }
                        function pwd4() {
                            if (pwdpat4.test(newpwd)) {
                                document.getElementById('it4').style.color = 'green';
                                document.getElementById('it4').style.backgroundColor = 'lightgreen';
                            }
                            else if (pwdpat4.test(newpwd) === false) {
                                document.getElementById('it4').style.color = 'red';
                                document.getElementById('it4').style.backgroundColor = 'rgb(248, 166, 166)';
                            }
                        }

                        pwd1();
                        pwd2();
                        pwd3();
                        pwd4();

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
                                document.getElementById('newpwd').type = 'text'
                            }} /> : ''}
                            {visiblePwd ? <VisibilityIcon sx={{ cursor: 'pointer' }} onClick={() => {
                                checkInput(false);
                                getInput(true);
                                document.getElementById('newpwd').type = 'password'
                            }} /> : ''}
                        </InputAdornment>
                    }} />
                <Box sx={{ display: 'flex', alignItems: "center", justifyContent: 'space-between', marginLeft: '5px', marginRight: '5px', marginTop: '20px' }}>
                    <Typography id='it1' sx={{ flex: 3, borderRadius: '5px', border: '1px solid transparent', backgroundColor: "lightgrey", textAlign: "center", padding: '5px 5px' }}>8 Characters</Typography>
                    <Typography id='it2' sx={{ flex: 3, borderRadius: '5px', border: '1px solid transparent', backgroundColor: "lightgrey", textAlign: "center", padding: '5px 5px', marginLeft: '5px' }}>1 Uppercase </Typography>
                    <Typography id='it3' sx={{ flex: 3, borderRadius: '5px', border: '1px solid transparent', backgroundColor: "lightgrey", textAlign: "center", padding: '5px 5px', marginLeft: '5px' }}>1 Numeric</Typography>
                    <Typography id='it4' sx={{ flex: 3, borderRadius: '5px', border: '1px solid transparent', backgroundColor: "lightgrey", textAlign: "center", padding: '5px 5px', marginLeft: '5px' }}>1 Special</Typography>
                </Box>
                <TextField id='confirmpwd' label='Confirm Password' variant='standard' type='password' sx={{ marginTop: '30px', marginLeft: '10px', width: '90%', fontSize: '30px' }}
                    value={confirmpwd} onChange={(e) => setConfirmPwd(e.target.value)}
                    onBlur={() => {
                        async function pwd1() {
                            if (confirmpwd.length == 0)
                                document.getElementById('user_resetpwd_errormsg').innerText = 'Please Enter password satisfies above criteria!!!';
                            else {
                                if (confirmpwd === newpwd)
                                    document.getElementById('user_resetpwd_errormsg').innerText = '';
                                else if (confirmpwd !== newpwd)
                                    document.getElementById('user_resetpwd_errormsg').innerText = 'New Password and confirm password doesn\' match';
                            }
                        }
                        async function pwd2() {
                            await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/user_signup`, {
                                user_email: vemail,
                                user_password: newpwd
                            })
                                .then((data) => {
                                    if (data.data.modifiedCount == 1) {
                                        setCredentials(true);
                                    }
                                    else if (data.data.modifiedCount != 1) {
                                        setCredentials(false);

                                    }
                                    setDisable(false);
                                })
                        }
                        pwd1();
                        if (vemail.length > 0 && newpwd.length > 0 && confirmpwd.length > 0 && (confirmpwd === newpwd))
                            pwd2();
                        else
                            toast.error('Please fill correct details!', { autoClose: 3000, position: "bottom-right" })
                    }}
                    onInput={(e) => {
                        if (e.target.value.length > 0 && visibleConfirmPwd === false) {
                            getConfirmInput(true);
                        }
                        else if (e.target.value.length == 0) {
                            getConfirmInput(false);
                        }
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment position='end'>
                            {hiddenConfirmPwd ? <VisibilityOffIcon sx={{ cursor: 'pointer' }} onClick={() => {
                                checkConfirmInput(true);
                                getConfirmInput(false);
                                document.getElementById('confirmpwd').type = 'text'
                            }} /> : ''}
                            {visibleConfirmPwd ? <VisibilityIcon sx={{ cursor: 'pointer' }} onClick={() => {
                                checkConfirmInput(false);
                                getConfirmInput(true);
                                document.getElementById('confirmpwd').type = 'password'
                            }} /> : ''}
                        </InputAdornment>
                    }} />
                <span id='user_resetpwd_errormsg' style={{ marginLeft: '40px', color: "red", marginTop: '30px', fontFamily: 'TimesNewRoman', display: 'inline-block' }}></span>
                <br></br>
                <Button color='primary' sx={{
                    textTransform: "none",
                    fontSize: '20px', marginTop: '30px', color: 'white', backgroundColor: 'blue', width: '90%',
                    '&:hover': { color: 'white', backgroundColor: 'blue' }
                }} component={Link} to={targetlink}
                    disabled={disab}
                    onClick={async () => {
                        if (logged === false) {
                            toast.error('Wrong Credentials ! Please retry', { autoClose: 3000 });
                            setTimeout(() => {
                                window.location.reload(true)
                            }, 4000)
                        }
                    }
                    }
                >Reset Password </Button>
            </Box>
        </>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        setNavBar: (data) => dispatch(setNavBar(data)),
        setFooter: (data) => dispatch(setFooter(data))
    }
}
export default connect(null, mapDispatchToProps)(NewPassword);