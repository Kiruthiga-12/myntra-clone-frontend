import { Box, Typography, TextField, Button, InputAdornment } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUserMobile, setNavBar, setFooter } from '../../Redux_Store/Action_Creators';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../Loader/Loader';
const Login = (props) => {
    //pattern
    const mobilepattern = /^[6-9]+[0-9]{9,9}/;

    //mobile no.
    const [mobileno, setMobileNo] = useState('');
    const [targetlink, setTargetLink] = useState('');


    //status
    const [mobstatus, setMobStatus] = useState(false);
    const [disab, setDisable] = useState(true);
    const [logged, setCredentials] = useState('');
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        if (logged == true)
            setTargetLink('/loginpassword')
        else if (logged == false)
            setTargetLink('/signup')
        else if (logged == '')
            setTargetLink('');
    }, [logged])
    useEffect(() => {
        document.title = 'Myntra';
        props.setNavBar('navbar');
        props.setFooter('');
    }, [])
    return (
        <>
            <ToastContainer />
            <Box sx={{ backgroundColor: 'rgb(250, 223, 239)', width: '100vw', marginLeft: '-12px', height: '87vh', overflow: 'hidden', marginTop: '94px' }}>
                <Box sx={{ backgroundColor: 'white', width: '500px', height: '400px', margin: 'auto', marginTop: '100px' }}>
                    <Typography variant='h6' sx={{ paddingLeft: '40px', paddingTop: '30px', fontWeight: 'bold' }}>Login <span style={{ fontFamily: 'TimesNewRoman', fontWeight: 'normal' }}> or </span>Signup</Typography>
                    <TextField id='login_id' type='mobile' sx={{ width: '85%', paddingLeft: '40px', marginTop: '20px', color: 'black' }}
                        placeholder='Mobile Number'
                        InputProps={{
                            startAdornment:
                                <InputAdornment disableTypography position="start">
                                    +91 | </InputAdornment>
                        }} max={10} required onChange={(e) => setMobileNo((e.target.value))}
                        onBlur={() => {
                            function pwd1() {
                                if (mobilepattern.test(mobileno))
                                    setMobStatus(true)
                                else {
                                    setMobStatus(false)
                                }
                            }
                            async function pwd2() {
                                setLoader(true);
                                axios.post(`${process.env.REACT_APP_BACKEND_URL}/user_login_signup`, { userdata: mobileno }).
                                    then((data) => {
                                        setDisable(false);
                                        if (data.data.length > 0) {
                                            setCredentials(true)
                                        }
                                        else {
                                            setCredentials(false);
                                            props.getUserMobile(mobileno);
                                        }
                                        setLoader(false);
                                    })
                            }
                            pwd1()
                            if (mobstatus == true)
                                pwd2()

                        }} />
                    <Typography variant='body1' sx={{ color: 'grey', paddingLeft: '40px', paddingTop: '50px', fontWeight: 'bold', fontSize: '14px' }}>By continuing, I agree to the
                        <NavLink style={{
                            fontFamily: 'Arial', textDecoration: 'none', color: 'rgb(243, 66, 140)', fontWeight: 'bold'
                        }} component={Link} to='/termsofuse'> Terms of Use </NavLink>
                        & <NavLink style={{
                            fontFamily: 'Arial', textDecoration: 'none', color: 'rgb(243, 66, 140)', fontWeight: 'bold'
                        }} component={Link} to='/privacypolicy'> Privacy Policy </NavLink> </Typography>
                    {loader == true ? <Loader /> : <>
                        <Button sx={{
                            marginLeft: '40px', fontWeight: 'bold', marginTop: '30px', width: '80%', padding: '10px', fontSize: '17px', backgroundColor: 'rgb(243, 66, 140)',
                            '&:hover': { backgroundColor: 'rgb(243, 66, 140)' }
                        }} variant='contained' component={Link} to={targetlink} disabled={disab}
                        >CONTINUE</Button>
                    </>}
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
        getUserMobile: (data) => dispatch(getUserMobile(data)),
        setNavBar: (data) => dispatch(setNavBar(data)),
        setFooter: (data) => dispatch(setFooter(data))
    }
}

export default connect(null, mapDispatchToProps)(Login);