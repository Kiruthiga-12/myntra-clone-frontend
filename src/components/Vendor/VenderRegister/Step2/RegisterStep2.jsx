import { useEffect, useState } from "react";
import { Box, Typography, TextField, Button } from '@mui/material';
import Register_Navbar from "../Register_Navbar";
import { Link } from 'react-router-dom';
import { getVendorEmail, setNavBar, setFooter } from "../../../Redux_Store/Action_Creators";
import { connect } from 'react-redux';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const RegisterStep2 = (props) => {

    //pattern
    const mailadrpattern = /[\w]+@[\w]+\.[\w]{2,}/;

    //company mailid.
    const [emailadr, setEmailAdr] = useState('');
    const [msg, setMsg] = useState();

    //status
    const [mailstatus, setMailStatus] = useState(false);
    const [disab, setDisable] = useState(true);

    useEffect(() => {
        if (mailstatus === true)
            setDisable(false);
        else if (mailstatus === false)
            setDisable(true)
    }, [mailstatus])
    useEffect(() => {
        props.setNavBar('');
        props.setFooter('');
        if (props.get_vendor_mobile == '' || props.get_vendor_mobile == undefined)
            setMsg('Invalid Resource');
    }, [])
    return (
        <>
            {msg == undefined && <>
                <ToastContainer className='toastcontainer' />
                <Register_Navbar display='none' />
                <Box sx={{ margin: 'auto', marginTop: '150px', width: '29%', backgroundColor: 'white', padding: '10px', textAlign: 'center' }}>
                    <Typography sx={{ marginTop: '30px', fontSize: '23px', fontWeight: 'bold' }}>Welcome to Myntra!</Typography>
                    <Typography sx={{ marginTop: '10px' }}>Create your Partner Account in 3 simple steps</Typography>
                    <Typography sx={{ marginTop: '50px', color: 'grey', marginLeft: '-100px' }}>STEP 2: Enter your Company's Email Id</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <TextField variant='standard' sx={{ marginTop: '10px', width: '50%', marginLeft: '50px' }} type='email'
                            onChange={(e) => setEmailAdr((e.target.value))}
                            onBlur={() => {
                                if (mailadrpattern.test(emailadr)) {
                                    setMailStatus(true);
                                    props.setVendorEmail(emailadr)
                                }
                                else {
                                    alert("Please Enter  a valid Email Address!!");
                                    setMailStatus(false)
                                }
                            }} />
                    </Box>

                    <br />
                    <Button sx={{
                        color: 'white', backgroundColor: 'rgb(243, 66, 140)', fontWeight: 'bold', marginTop: '30px',
                        marginLeft: '-290px', padding: '5px 15px', '&:hover': { backgroundColor: 'rgb(243, 66, 140)' }
                    }} component={Link} to='/partnerhome/register_step2_pwd' disabled={disab}
                        onClick={() => {
                            axios.post(`${process.env.REACT_APP_BACKEND_URL}/vendor_otp_register`, {
                                email: emailadr
                            })
                                .then((data) => { })

                        }}  >CONTINUE</Button>
                    <Box sx={{ height: '200px' }}></Box>
                </Box >
            </>}
            {msg != undefined && <>
                <Typography sx={{ marginTop: "100px", color: "rgb(250, 102, 102)", textAlign: "center", fontWeight: "bold", fontSize: '26px' }}>{msg} !!</Typography>
                <Typography sx={{ marginTop: "10px", color: "blue", textAlign: "center", fontWeight: "bold", fontSize: '16px' }}>Kindly Complete previous Step !</Typography>
            </>}
        </>
    )
}

const mapStateToProps = (cstate) => {
    return {
        get_vendor_mobile: cstate.get_vendor_mobile
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setVendorEmail: (data) => dispatch(getVendorEmail(data)),
        setNavBar: (data) => dispatch(setNavBar(data)),
        setFooter: (data) => dispatch(setFooter(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterStep2);