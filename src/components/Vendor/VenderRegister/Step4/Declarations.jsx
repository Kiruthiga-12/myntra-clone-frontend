import { Typography, Box, Checkbox, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { changeVendorStatus, vendorLogout } from "../../../Redux_Store/Action_Creators";
import { connect } from 'react-redux';
const Declarations = (props) => {
    //status
    const [disab, setDisable] = useState(true);

    //storing value
    const [accept, setAccept] = useState(false);

    //flag
    const [submitflag, setSubmitFlag] = useState(false);
    const [createflag, setCreateFlag] = useState(true);
    const [editflag, setEditFlag] = useState(false);
    useEffect(() => {
        if (accept === true)
            setDisable(false)
        else if (accept === false)
            setDisable(true)
    }, [accept])
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/declaration_email?email=${props.email}`)
            .then((data) => {
                if (data.data.length > 0)
                    if (data.data[0].vendor_id != undefined) {
                        setAccept(data.data[0].accept_tc);
                        setEditFlag(true);
                        setCreateFlag(false);
                    }
            })

    }, [])
    return (
        <>
            <ToastContainer className='toastcontainer' />
            {submitflag === false && <>
                <Typography variant='h6' sx={{ marginTop: '20px', marginLeft: '20px', fontSize: '20px', fontWeight: 'bold' }}>Declaration</Typography>
                {(createflag === true && editflag === false) && <>
                    <Box sx={{
                        display: 'flex', alignItems: 'center', marginTop: '20px', marginLeft: '40px', width: '90%', border: '1px solid lightgrey',
                        paddingTop: '10px', paddingBottom: '10px'
                    }}>
                        <Checkbox checked={accept} onChange={(e, newValue) => setAccept(newValue)} />
                        <Typography>I hereby declare that the details furnished are true and correct.I undertake to inform you
                            of any changes of therein immediately.
                        </Typography>
                    </Box>
                    <Button variant='outlined'
                        sx={{
                            marginTop: '40px', marginLeft: '1090px', color: 'white', border: '1px solid blue',
                            borderRadius: '20px', padding: '5px 20px',
                            backgroundColor: 'blue', '&:hover': { color: 'white', backgroundColor: 'blue' }
                        }} disabled={disab}
                        onClick={async () => {
                            const decl = axios.post(`${process.env.REACT_APP_BACKEND_URL}/declaration`, {
                                vendor_id: props.vendorid,
                                email: props.email,
                                accept_tc: accept
                            })
                            const perce = axios.put(`${process.env.REACT_APP_BACKEND_URL}/percentage_update`, {
                                vendor_id: props.vendorid,
                                email: props.email,
                                stepno: '6'
                            })
                            const status = axios.put(`${process.env.REACT_APP_BACKEND_URL}/vendor_status`, {
                                vendor_id: props.vendorid,
                                email: props.email,
                                status: 'submitted'
                            })
                            await axios.all([decl, perce, status])
                                .then(axios.spread(function (decldet, percedet, statusdet) {
                                    if (decldet.data.vendor_id != undefined) {
                                        setSubmitFlag(true)
                                        props.changeStatus(Math.round(Math.random() * 5600))
                                    }
                                    else {
                                        setDisable(true);
                                        setSubmitFlag(false)
                                        toast.error('Error Please retry ', { autoClose: 3000 })
                                    }
                                }))

                        }} >SUBMIT</Button>
                </>}
                {(editflag === true && createflag === false) && <>
                    <Box sx={{
                        display: 'flex', alignItems: 'center', marginTop: '20px', marginLeft: '40px', width: '90%', border: '1px solid lightgrey',
                        paddingTop: '10px', paddingBottom: '10px'
                    }}>
                        <Checkbox checked={accept} onChange={(e, newValue) => setAccept(newValue)} />
                        <Typography>I hereby declare that the details furnished are true and correct.I undertake to inform you
                            of any changes of therein immediately.
                        </Typography>
                    </Box>
                    <Button variant='outlined'
                        sx={{
                            marginTop: '40px', marginLeft: '1090px', color: 'white', border: '1px solid blue',
                            borderRadius: '20px', padding: '5px 20px',
                            backgroundColor: 'blue', '&:hover': { color: 'white', backgroundColor: 'blue' }
                        }} disabled={disab}
                        onClick={async () => {
                            const decl = axios.put(`${process.env.REACT_APP_BACKEND_URL}/declaration`, {
                                vendor_id: props.vendorid,
                                email: props.email,
                                accept_tc: accept
                            })
                            const perce = axios.put(`${process.env.REACT_APP_BACKEND_URL}/percentage_update`, {
                                vendor_id: props.vendorid,
                                email: props.email,
                                stepno: '6'
                            })
                            const status = axios.put(`${process.env.REACT_APP_BACKEND_URL}/vendor_status`, {
                                vendor_id: props.vendorid,
                                email: props.email,
                                status: 'resubmitted'
                            })
                            await axios.all([decl, perce, status])
                                .then(axios.spread(function (decldet, percedet, statusdet) {
                                    if (decldet.data) {
                                        setSubmitFlag(true);
                                        props.changeStatus(Math.round(Math.random() * 1600))
                                    }
                                    else {
                                        setDisable(true);
                                        setSubmitFlag(false)
                                        toast.error('Error Please retry ', { autoClose: 3000 })
                                    }
                                }))

                        }} >SUBMIT</Button>
                </>}
            </>}
            {
                submitflag === true && <>
                    <Typography sx={{ marginLeft: "40px", marginTop: '40px', fontWeight: "bold", fontSize: "20px" }}>Submision Completed!</Typography>
                    <Typography sx={{ marginLeft: "40px", marginTop: '30px' }}>You have successfully completed the vendor Onboarding Form!</Typography>
                    <Typography sx={{ marginLeft: "40px", marginTop: '30px' }}>We shall review your form and get back to you regarding the further steps to proceed with your onboarding!</Typography>
                    <img src='../../Images/Submission.jpg' style={{ marginTop: '40px', marginLeft: '40px', width: '600px', height: '300px' }} alt='loading' />
                    <Typography sx={{ marginLeft: "40px", marginTop: '30px', fontWeight: 'bold', fontSize: '17px' }}>Wait for the Myntra team to evaluate the details filled by you and reach out in case they have any questions / clarifications</Typography>
                    <br></br>
                    <Button component={Link} to='/partnerhome/login' variant='outlined' sx={{
                        marginLeft: '1100px', color: "white", backgroundColor: "blue", '&:focus': { color: 'white', backgroundColor: "blue" },
                        '&:hover': { color: 'white', backgroundColor: 'blue' }
                    }} onClick={() => {
                        props.vendorLogout();
                        localStorage.removeItem('vendor_key');
                    }}>Finish</Button>
                    <br></br>
                    <br></br>
                </>
            }
        </>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeStatus: (data) => dispatch(changeVendorStatus(data)),
        vendorLogout: () => dispatch(vendorLogout())
    }
}
export default connect(null, mapDispatchToProps)(Declarations);