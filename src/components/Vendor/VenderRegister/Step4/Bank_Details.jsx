import { Typography, Box, TextField, Select, MenuItem, Button } from "@mui/material";
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { changeVendorStatus } from "../../../Redux_Store/Action_Creators";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Bank_Details = (props) => {
    //status
    const [disab1, setDisable1] = useState(true);
    const [disab2, setDisable2] = useState(true);
    const [disab3, setDisable3] = useState(true);
    const [acname_flag, setActNameFlag] = useState(false);
    const [acno_flag, setActNumFlag] = useState(false);
    const [ifsc_flag, setIfscFlag] = useState(false);
    const [bname_flag, setBankNameFlag] = useState(false);
    const [actype_flag, setAccountTypeFlag] = useState(false);
    //storing values
    const [account_name, setAccountName] = useState('');
    const [account_number, setAccountNumber] = useState('');
    const [ifsc, setIFSC] = useState('');
    const [bank_name, setBankName] = useState('');
    const [account_type, setAccountType] = useState('');
    //pattern
    const namepat = /[A-Za-z]{2,30}/;
    const actnoPat = /[0-9]{9,15}/;
    const ifscPat = /[A-Z0-9]{10}/;

    //flags
    const [editflag, setEditFlag] = useState(false);
    const [createflag, setCreateFlag] = useState(true);
    useEffect(() => {
        if (acname_flag === true && acno_flag === true && ifsc_flag === true && bname_flag === true && actype_flag === true) {
            setDisable1(true);
            setDisable1(false);
        }
        else {
            setDisable1(true);
        }
    }, [acname_flag, acno_flag, ifsc_flag, bname_flag, actype_flag])
    useEffect(() => {
        if (disab1 === true)
            setDisable2(true)
    }, [disab1])
    useEffect(() => {
        if (disab2 === true)
            setDisable3(true)
    }, [disab2])
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/bankdetails_email?email=${props.email}`)
            .then((data) => {
                if (data.data.length > 0)
                    if (data.data[0].vendor_id != undefined) {
                        setAccountName(data.data[0].account_name);
                        setAccountNumber(data.data[0].account_no);
                        setIFSC(data.data[0].ifsc_code);
                        setBankName(data.data[0].bank_name);
                        setAccountType(data.data[0].account_type);
                        setCreateFlag(false);
                    }
            })

    }, [])
    return (
        <>
            <ToastContainer className='toastcontainer' />
            <Typography variant='h6' sx={{ marginTop: '20px', marginLeft: '20px', fontSize: '20px', fontWeight: 'bold' }}>Bank Details</Typography>
            <Box sx={{ display: 'flex', width: '75%', marginLeft: '20px', marginTop: '30px' }}>
                <Typography sx={{ flex: 4, fontSize: '12px', color: 'grey' }}>ACCOUNT HOLDERS NAME</Typography>
                <Typography sx={{ flex: 4, fontSize: '12px', color: 'grey' }}>ACCOUNT NUMBER</Typography>
                <Typography sx={{ flex: 4, fontSize: '12px', color: 'grey' }}>IFSC CODE</Typography>
            </Box>
            {editflag === false && createflag === false && <>
                <Box sx={{ display: 'flex', width: '75%', marginLeft: '20px', marginTop: '20px', alignItems: 'center' }}>
                    <TextField value={account_name} variant='standard' sx={{ flex: 3 }}
                    />
                    <TextField value={account_number} variant='standard' sx={{ flex: 3, marginLeft: '10px' }} />
                    <TextField value={ifsc} variant='standard' sx={{ flex: 3, marginLeft: '19px' }} />
                </Box>
                <Box sx={{ display: 'flex', width: '75%', marginLeft: '20px', marginTop: '30px' }}>
                    <Typography sx={{ flex: 4, fontSize: '12px', color: 'grey' }}>BANK NAME</Typography>
                    <Typography sx={{ flex: 4, fontSize: '12px', color: 'grey' }}>ACCOUNT TYPE</Typography>
                </Box>
                <Box sx={{ display: 'flex', width: '75%', marginLeft: '20px', marginTop: '20px', alignItems: 'center' }}>
                    <TextField value={bank_name} variant='standard' sx={{ flex: 4 }} />
                    <Select sx={{ flex: 5, marginLeft: '100px' }} value={account_type} variant='standard' >
                        <MenuItem value='Current' >Current</MenuItem>
                        <MenuItem value='Savings'>Savings</MenuItem>
                    </Select>
                </Box>
                <br></br>
                <span id='bankdetails_error_message' style={{ marginLeft: '40px', color: "red", marginTop: '30px', fontFamily: 'TimesNewRoman', display: 'inline-block' }}></span>
                <br></br>
                <Button variant='outlined' sx={{
                    marginLeft: '920px', marginTop: '20px', color: 'white', backgroundColor: 'blue', border: '1px soldi blue', borderRadius: '10px',
                    '&:hover': { color: 'white', backgroundColor: 'blue', border: '1px solid blue', borderRadius: '10px' }
                }}
                    onClick={() => {
                        setEditFlag(true);
                        setCreateFlag(false);
                    }}>EDIT DETAILS</Button>
                <Button variant='outlined' sx={{
                    marginLeft: '20px', marginTop: '20px', color: 'white', backgroundColor: 'blue', border: '1px soldi blue', borderRadius: '10px',
                    '&:hover': { color: 'white', backgroundColor: 'blue', border: '1px solid blue', borderRadius: '10px' }
                }}
                    onClick={() => {
                        axios.put(`${process.env.REACT_APP_BACKEND_URL}/percentage_update`, {
                            vendor_id: props.vendorid,
                            email: props.email,
                            stepno: '4'
                        })
                            .then((data) => {
                                if (data.data) {
                                    props.changeStatus(Math.round(Math.random() * 5000))
                                }
                            })
                    }}>NEXT</Button>
            </>}
            {(editflag === true || createflag === true) && <>
                <Box sx={{ display: 'flex', width: '75%', marginLeft: '20px', marginTop: '20px', alignItems: 'center' }}>
                    <TextField value={account_name} variant='standard' sx={{ flex: 3 }}
                        onChange={(e) => setAccountName(e.target.value)}
                        onBlur={() => {
                            if (namepat.test(account_name)) {
                                document.getElementById('bankdetails_error_message').innerText = '';
                                setActNameFlag(true);
                            }
                            else if (namepat.test(account_name) === false) {
                                document.getElementById('bankdetails_error_message').innerText = 'Please Enter the name in proper format';
                                setActNameFlag(false);
                            }
                        }}
                    />
                    <TextField value={account_number} variant='standard' sx={{ flex: 3, marginLeft: '10px' }}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        onBlur={() => {
                            if (actnoPat.test(account_number)) {
                                document.getElementById('bankdetails_error_message').innerText = '';
                                setActNumFlag(true);
                            }
                            else if (actnoPat.test(account_number) === false) {
                                document.getElementById('bankdetails_error_message').innerText = 'Please Enter the account Number in proper format';
                                setActNumFlag(false);
                            }
                        }} />
                    <TextField value={ifsc} variant='standard' sx={{ flex: 3, marginLeft: '19px' }}
                        onChange={(e) => setIFSC(e.target.value)}
                        onBlur={() => {
                            if (ifscPat.test(ifsc)) {
                                document.getElementById('bankdetails_error_message').innerText = '';
                                setIfscFlag(true);
                            }
                            else if (ifscPat.test(ifsc) === false) {
                                document.getElementById('bankdetails_error_message').innerText = 'Please Enter the valid IFSC Code';
                                setIfscFlag(true);
                            }
                        }} />
                </Box>
                <Box sx={{ display: 'flex', width: '75%', marginLeft: '20px', marginTop: '30px' }}>
                    <Typography sx={{ flex: 4, fontSize: '12px', color: 'grey' }}>BANK NAME</Typography>
                    <Typography sx={{ flex: 4, fontSize: '12px', color: 'grey' }}>ACCOUNT TYPE</Typography>
                </Box>
                <Box sx={{ display: 'flex', width: '75%', marginLeft: '20px', marginTop: '20px', alignItems: 'center' }}>
                    <TextField value={bank_name} variant='standard' sx={{ flex: 4 }}
                        onChange={(e) => setBankName(e.target.value)}
                        onBlur={() => {
                            if (namepat.test(bank_name)) {
                                document.getElementById('bankdetails_error_message').innerText = '';
                                setBankNameFlag(true);
                            }
                            else if (namepat.test(bank_name) === false) {
                                document.getElementById('bankdetails_error_message').innerText = 'Please Enter the valid Bank Name';
                                setBankNameFlag(false);
                            }
                        }} />
                    <Select sx={{ flex: 5, marginLeft: '100px' }} value={account_type} variant='standard'
                        onChange={(e) => setAccountType(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 's')
                                setAccountType('Savings');
                            else if (e.key === 'c')
                                setAccountType('Current');
                            else
                                setAccountType('');
                        }}
                        onBlur={() => {
                            if (account_type.length > 0) {
                                document.getElementById('bankdetails_error_message').innerText = '';
                                setAccountTypeFlag(true);
                            }
                            else if (account_type.length === 0) {
                                document.getElementById('bankdetails_error_message').innerText = 'Please Select the valid account type';
                                setAccountTypeFlag(false);
                            }
                        }} >
                        <MenuItem value='Current' >Current</MenuItem>
                        <MenuItem value='Savings'>Savings</MenuItem>
                    </Select>
                </Box>
                <Button sx={{
                    marginTop: '40px', marginLeft: '40px', padding: '5px 20px',
                    color: 'white', backgroundColor: 'blue', border: '1px solid transparent', borderRadius: '5px', '&:hover': {
                        color: "white", backgroundColor: 'blue'
                    }
                }} disabled={disab1}
                    onClick={() => setDisable2(false)}>VERIFY</Button >
                <br></br>
                <span id='bankdetails_error_message' style={{ marginLeft: '40px', color: "red", marginTop: '30px', fontFamily: 'TimesNewRoman', display: 'inline-block' }}></span>
                <br></br>
                {(editflag === true || createflag === false) && <> <Button variant='outlined' sx={{ marginLeft: '840px', marginTop: '20px', color: 'blue', backgroundColor: 'white', border: '1px soldi blue', borderRadius: '10px' }}
                    disabled={disab2}
                    onClick={async () => {
                        await setDisable3(false);
                        const bank = axios.put(`${process.env.REACT_APP_BACKEND_URL}/bank_details`, {
                            vendor_id: props.vendorid,
                            email: props.email,
                            account_name: account_name,
                            account_no: account_number,
                            ifsc_code: ifsc,
                            bank_name: bank_name,
                            account_type: account_type
                        })
                        const perce = axios.put(`${process.env.REACT_APP_BACKEND_URL}/percentage_update`, {
                            vendor_id: props.vendorid,
                            email: props.email,
                            stepno: '4'
                        })
                        await axios.all([bank, perce])
                            .then(axios.spread(function (bankdet, percedet) {
                                if (bankdet.data.modifiedCount == 1 && percedet.data.modifiedCount == 1) {

                                }
                                else {
                                    setDisable2(true);
                                    toast.error('Error please retry!', { autoClose: 3000 })
                                }
                            }))

                    }}
                >SAVE PROGRESS</Button>
                </>}
                {(createflag === true || editflag === false) && <> <Button variant='outlined' sx={{ marginLeft: '840px', marginTop: '20px', color: 'blue', backgroundColor: 'white', border: '1px soldi blue', borderRadius: '10px' }}
                    disabled={disab2}
                    onClick={async () => {
                        await setDisable3(false);
                        const bank = axios.post(`${process.env.REACT_APP_BACKEND_URL}/bank_details`, {
                            vendor_id: props.vendorid,
                            email: props.email,
                            account_name: account_name,
                            account_no: account_number,
                            ifsc_code: ifsc,
                            bank_name: bank_name,
                            account_type: account_type
                        })
                        const perce = axios.put(`${process.env.REACT_APP_BACKEND_URL}/percentage_update`, {
                            vendor_id: props.vendorid,
                            email: props.email,
                            stepno: '4'
                        })
                        await axios.all([bank, perce])
                            .then(axios.spread(function (bankdet, percedet) {
                                if (bankdet.data.vendor_id != undefined && (percedet.data.modifiedCount == 1)) {

                                }
                                else {
                                    setDisable2(true);
                                    toast.error('Eror Please retry!', { autoClose: 3000 })
                                }
                            }))
                    }}
                >SAVE PROGRESS</Button>
                </>}
                <Button variant='outlined' sx={{
                    marginLeft: '20px', marginTop: '20px', color: 'white', backgroundColor: 'blue', border: '1px soldi blue', borderRadius: '10px',
                    '&:hover': { color: 'white', backgroundColor: 'blue', border: '1px soldi blue', borderRadius: '10px' }
                }} disabled={disab3}
                    onClick={() => props.changeStatus(Math.round(Math.random() * 3000))}>NEXT</Button>
            </>}
            <br></br>
            <br></br>
            <br></br>
        </>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeStatus: (data) => dispatch(changeVendorStatus(data))
    }
}
export default connect(null, mapDispatchToProps)(Bank_Details);