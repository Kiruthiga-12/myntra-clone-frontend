import { Box, Typography, TextField, Button } from '@mui/material';
import { NavLink, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setNavBar, setFooter } from '../../Redux_Store/Action_Creators';
const NotReset = (props) => {
    const [disab, setDisable] = useState(true);
    const [mobile, setMobile] = useState('');

    useEffect(() => {
        document.title = 'Myntra';
        props.setNavBar('navbar')
        props.setFooter('')
    }, [])
    return (
        <>
            <Box sx={{ backgroundColor: 'rgb(250, 223, 239)', width: '100vw', marginLeft: '-12px', height: '87vh', overflow: 'hidden', marginTop: '94px' }}>
                <Box sx={{ backgroundColor: 'white', width: '500px', height: '600px', margin: 'auto', marginTop: '50px' }}>
                    <Typography variant='h6' sx={{ paddingLeft: '40px', paddingTop: '100px', fontWeight: 'bold' }}>I cannot reset my password </Typography>
                    <Typography variant='body1' sx={{ paddingLeft: '40px', marginTop: '20px', color: 'grey', paddingRight: '50px', fontSize: '14px' }}>Enter the mobile number associated with your Myntra account.</Typography>
                    <TextField variant='outlined' type='text' sx={{ marginLeft: '40px', marginTop: '30px', width: '80%', color: 'black' }} label='Mobile Number' required
                        value={mobile} onChange={(e) => setMobile(e.target.value)}
                        onBlur={() => {
                            setDisable(false);
                        }} />
                    <Button sx={{ color: 'white', fontFamily: 'Arial', fontWeight: 'bold', backgroundColor: 'rgb(243, 66, 140)', '&:hover': { backgroundColor: 'rgb(243, 66, 140)' }, padding: '10px', fontSize: '15px', marginLeft: '40px', marginTop: '40px', width: '80%' }}
                        disabled={disab} component={Link} to='/loginpassword'
                        onClick={() => {
                            alert('Please Check your email for password');
                            axios.post(`${process.env.REACT_APP_BACKEND_URL}/mail_userpwd`, {
                                mobile: mobile
                            })
                                .then((data) => { })

                            setDisable(true);
                        }}>CONTINUE</Button>
                    <Typography variant='body2' sx={{ marginLeft: '40px', marginTop: '30px' }}>I am getting different issue. <NavLink style={{ color: 'rgb(243, 66, 140)', textDecoration: 'none' }}
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
export default connect(null, mapDispatchToProps)(NotReset);