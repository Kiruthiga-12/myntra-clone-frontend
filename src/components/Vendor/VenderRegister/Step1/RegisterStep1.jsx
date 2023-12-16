import { useEffect, useState } from "react";
import { Box, Typography, TextField, Button } from '@mui/material';
import Register_Navbar from "../Register_Navbar";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getVendorMobile, setNavBar, setFooter } from "../../../Redux_Store/Action_Creators";
const RegisterStep1 = (props) => {
    //pattern
    const mobilepattern = /^[6-9]+[0-9]{9,9}/;

    //mobile no.
    const [mobileno, setMobileNo] = useState('');

    //status
    const [mobstatus, setMobStatus] = useState(false);
    const [disab, setDisable] = useState(true);

    useEffect(() => {
        if (mobstatus === true)
            setDisable(false);
        else if (mobstatus === false)
            setDisable(true)
    }, [mobstatus])
    useEffect(() => {
        props.setNavBar('');
        props.setFooter('');
    }, [])
    return (
        <>
            <Register_Navbar display='none' />
            <Box sx={{ margin: 'auto', marginTop: '150px', width: '29%', backgroundColor: 'white', padding: '10px', textAlign: 'center' }}>
                <Typography sx={{ marginTop: '30px', fontSize: '23px', fontWeight: 'bold' }}>Welcome to Myntra!</Typography>
                <Typography sx={{ marginTop: '10px' }}>Create your Partner Account in 3 simple steps</Typography>
                <Typography sx={{ marginTop: '50px', color: 'grey', marginLeft: '-190px' }}>STEP 1: MOBILE NUMBER</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField variant='standard' sx={{ marginTop: '10px', width: '50%', marginLeft: '50px' }} type='mobile'
                        onChange={(e) => setMobileNo(Number(e.target.value))}
                        onBlur={() => {
                            if (mobilepattern.test(mobileno)) {
                                setMobStatus(true);
                                props.setVendorMobile(mobileno);
                            }
                            else {
                                alert("Please Enter valid 10 digit mobile number!!");
                                setMobStatus(false)
                            }
                        }} />
                </Box>

                <br />
                <Button sx={{
                    color: 'white', backgroundColor: 'rgb(243, 66, 140)', fontWeight: 'bold', marginTop: '30px',
                    marginLeft: '-290px', padding: '5px 15px', '&:hover': { backgroundColor: 'rgb(243, 66, 140)' }
                }} component={Link} to='/partnerhome/register_step2' disabled={disab}>CONTINUE</Button>
                <Box sx={{ height: '200px' }}></Box>
            </Box >
        </>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        setVendorMobile: (data) => dispatch(getVendorMobile(data)),
        setNavBar: (data) => dispatch(setNavBar(data)),
        setFooter: (data) => dispatch(setFooter(data))
    }
}

export default connect(null, mapDispatchToProps)(RegisterStep1);