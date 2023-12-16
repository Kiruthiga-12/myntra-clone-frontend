import { Box, Typography, TextField, Button } from '@mui/material';
import { NavLink, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import { setNavBar, setFooter } from '../../Redux_Store/Action_Creators';
const ResetPassword = (props) => {

    //storing value
    const [mail, setMail] = useState('');
    const [disab, setDisable] = useState(true);
    const [targetlink, setTargetLink] = useState('');
    const [logged, setCredentials] = useState('');

    useEffect(() => {
        document.title = 'Myntra';
        props.setNavBar('navbar');
        props.setFooter('');
    }, [])
    useEffect(() => {
        if (logged === true)
            setTargetLink('/partnerhome/login')
    }, [logged])
    return (
        <>
            <ToastContainer />
            <Box sx={{ backgroundColor: 'rgb(250, 223, 239)', width: '100vw', marginLeft: '-12px', height: '87vh', overflow: 'hidden', marginTop: '94px' }}>
                <Box sx={{ backgroundColor: 'white', width: '500px', height: '600px', margin: 'auto', marginTop: '50px' }}>
                    <Typography variant='h6' sx={{ paddingLeft: '40px', paddingTop: '100px', fontWeight: 'bold' }}>Reset Password </Typography>
                    <Typography variant='body1' sx={{ paddingLeft: '40px', marginTop: '20px', color: 'grey', paddingRight: '50px', fontSize: '14px' }}>Enter your email address and we'll send a link on your email to reset your password.</Typography>
                    <TextField variant='outlined' type='text' sx={{ marginLeft: '40px', marginTop: '30px', width: '80%', color: 'black' }} label='Email Id' required
                        value={mail} onChange={(e) => setMail(e.target.value)}
                        onBlur={() =>
                            setDisable(false)
                        } />
                    <Button sx={{ color: 'white', fontFamily: 'Arial', fontWeight: 'bold', backgroundColor: 'rgb(243, 66, 140)', '&:hover': { backgroundColor: 'rgb(243, 66, 140)' }, padding: '10px', fontSize: '15px', marginLeft: '40px', marginTop: '40px', width: '80%' }}
                        onClick={async () => {
                            setDisable(true);
                            axios.post(`${process.env.REACT_APP_BACKEND_URL}/senduser_resetpwd`, {
                                email: mail
                            })
                                .then((data) => {
                                    if (data.data.user_id != undefined) {
                                        toast.success('Check Your mail box to reset password!', { autoClose: 3000 });
                                    }
                                    else if (data.data.user_id == undefined) {
                                        toast.error('Error, Please retry!')
                                    }
                                })
                        }} disabled={disab}>SEND LINK</Button>
                    <Typography variant='body2' sx={{ marginLeft: '40px', marginTop: '30px' }}>Unable to reset password? <NavLink style={{ color: 'rgb(243, 66, 140)', textDecoration: 'none' }}
                        component={Link} to='/recovery'>Get help</NavLink></Typography>
                </Box >
            </Box >
        </>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        setNavBar: (data) => dispatch(setNavBar(data)),
        setFooter: (data) => dispatch(setFooter(data))
    }
}
export default connect(null, mapDispatchToProps)(ResetPassword);