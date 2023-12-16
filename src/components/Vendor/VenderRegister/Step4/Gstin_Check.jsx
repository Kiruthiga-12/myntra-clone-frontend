import { Typography, Button, Box, MenuItem, Select, TextField } from "@mui/material"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { changeVendorStatus } from "../../../Redux_Store/Action_Creators";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Gstin_Check = (props) => {
    //flag values
    const [verifyFlag, setFlag] = useState(false);
    const [editflag, setEditFlag] = useState(false);
    const [createflag, setCreateFlag] = useState(true);
    const [disab, setDisable] = useState(true);

    //storing values:
    const [gstin, setGSTIN] = useState('');
    const [arr, setArray] = useState([]);
    const [email, setEmail] = useState(props.email);
    //async values
    const [dbdata, setDbData] = useState([]);
    //GST Array
    const gst = [{
        gstin: '22ABCDEFGHIJ1Z4',
        company_name: 'Aurelia',
        PAN_Number: 'ABCDEFGHIJ',
        city: 'Chennai',
        pincode: '600001',
        reg_adr: 'ABC Main Road',
        reg_state: 'Tamilnadu',
        reg_country: 'India',
        reg_gstin: '22ABCDEFGHIJ1Z4'
    },
    {
        gstin: '32KLMNOPQRST1Z5',
        company_name: 'Biba',
        PAN_Number: 'KLMNOPQRST',
        city: 'Bangalore',
        pincode: '300001',
        reg_adr: 'XYZ Main Road',
        reg_state: 'Karnataka',
        reg_country: 'India',
        reg_gstin: '32KLMNOPQRST1Z5'
    },
    {
        gstin: '42UVWXYZABCD1Z1',
        company_name: 'FabIndia',
        PAN_Number: 'UVWXYZABCD',
        city: 'Trivandram',
        pincode: '100001',
        reg_adr: 'MNO Main Road',
        reg_state: 'Kerala',
        reg_country: 'India',
        reg_gstin: '42UVWXYZABCD1Z1'
    },
    {
        gstin: '52EFGHIJKLMN1Z2',
        company_name: 'Jaipur Kurti',
        PAN_Number: 'EFGHIJKLMN',
        city: 'Tirunelveli',
        pincode: '900001',
        reg_adr: 'JKL Main Road',
        reg_state: 'Tamilnadu',
        reg_country: 'India',
        reg_gstin: '52EFGHIJKLMN1Z2'
    },
    {
        gstin: '61OPQRSTUVWX1Z3',
        company_name: 'Avasaa',
        PAN_Number: 'OPQRSTUVWX',
        city: 'Tirunelveli',
        pincode: '900001',
        reg_adr: 'STU Main Road',
        reg_state: 'Tamilnadu',
        reg_country: 'India',
        reg_gstin: '61OPQRSTUVWX1Z3'
    }]
    useEffect(() => {
        function pwd1() {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/gst_getdetails_email?email=${email}`)
                .then(async (data) => {
                    if (data.data.length > 0 && editflag === false) {
                        setDbData(data.data.slice());
                        setCreateFlag(false);
                    }
                })
        }
        if (email != undefined && email != '')
            pwd1();
    }, [])
    useEffect(() => {
        if (gstin.length > 0) {
            setArray(gst.filter((li) => li.gstin === gstin))
            setDisable(false);
            if (editflag === false)
                setCreateFlag(true);
        }
    }, [gstin])
    return (<>
        <ToastContainer className='toastcontainer' />
        <Typography variant='h6' sx={{ marginTop: '20px', marginLeft: '20px', fontSize: '20px', fontWeight: 'bold' }}>Gstin Check</Typography>
        <Typography sx={{ marginTop: '40px', marginLeft: '40px' }}>Please Enter your GST Identification Number.</Typography>
        <Typography sx={{ marginTop: '10px', marginLeft: '40px' }}>Based on this entry, some of the details in the form  will be automatically  filled</Typography>
        {dbdata.length > 0 && createflag === false && editflag === false && <>
            <TextField value={dbdata[0].gstin} sx={{ marginTop: '20px', marginLeft: '40px', width: '20%' }} inputProps={{ readOnly: true }} />
            <br></br>
            <Button sx={{ marginTop: '40px', marginLeft: '40px', color: 'blue', border: '1px solid blue', borderRadius: '10px', width: '10%' }} disableTouchRipple
                onClick={() => setFlag(!verifyFlag)}>VERIFY</Button>
            <div style={{ margin: 'auto', marginTop: '30px', width: '90%', borderTop: '1px solid grey', height: '1pt' }} ></div >
            {verifyFlag === true &&
                <Box sx={{ marginTop: '20px', marginLeft: '40px' }}>
                    <Typography sx={{ marginLeft: '10px' }}>Please Confirm your busines Details shown below.</Typography>
                    <Box sx={{ marginTop: '20px', marginLeft: '10px', width: '80%' }}>
                        <table >
                            <thead>
                                <tr >
                                    <th style={{ width: '40%', textAlign: 'left', fontFamily: 'TimesNewRoman', fontWeight: '100', fontSize: '20px' }}>Registered Company Name</th>
                                    <th style={{ width: '30%', textAlign: 'left', fontFamily: 'TimesNewRoman', fontWeight: '100', fontSize: '20px' }}>PAN Number</th>
                                    <th style={{ width: '30%', textAlign: 'left', fontFamily: 'TimesNewRoman', fontWeight: '100', fontSize: '20px' }} >City</th>
                                    <th style={{ width: '30%', textAlign: 'left', fontFamily: 'TimesNewRoman', fontWeight: '100', fontSize: '20px' }}>Pincode</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dbdata.length > 0 && <>
                                    {dbdata.map((li, index) => {
                                        return (<tr key={index}>
                                            <td style={{ width: '40%' }} id='reg_comp_name'>{li.reg_comp_name}</td>
                                            <td style={{ width: '30%' }} id='pan_number'>{li.pan_number}</td>
                                            <td style={{ width: '30%' }} id='reg_city'>{li.reg_city}</td>
                                            <td style={{ width: '30%' }} id='reg_pincode'>{li.reg_pincode}</td>
                                        </tr>)
                                    })} </>}

                                <tr >
                                    <th style={{ width: '40%', textAlign: 'left', fontFamily: 'TimesNewRoman', fontWeight: '100', fontSize: '20px' }}>Registered Address</th>
                                    <th style={{ width: '30%', textAlign: 'left', fontFamily: 'TimesNewRoman', fontWeight: '100', fontSize: '20px' }}>State</th>
                                    <th style={{ width: '30%', textAlign: 'left', fontFamily: 'TimesNewRoman', fontWeight: '100', fontSize: '20px' }} >Country</th>
                                    <th style={{ width: '30%', textAlign: 'left', fontFamily: 'TimesNewRoman', fontWeight: '100', fontSize: '20px' }}>GSTin</th>
                                </tr>
                                {dbdata.length > 0 && <>
                                    {dbdata.map((li, index) => {
                                        return (<tr key={index}>
                                            <td style={{ width: '40%' }} id='reg_adr'>{li.reg_adr}</td>
                                            <td style={{ width: '30%' }} id='reg_state'>{li.reg_state}</td>
                                            <td style={{ width: '30%' }} id='reg_country'>{li.reg_country}</td>
                                            <td style={{ width: '30%' }}>{li.gstin}</td>
                                        </tr>)
                                    })} </>}
                            </tbody>
                        </table>
                    </Box>
                    <Button sx={{
                        textTransform: 'none', fontSize: '16px',
                        marginTop: '40px', marginLeft: '700px', color: 'blue', border: '1px solid blue', borderRadius: '10px', width: '17%', '&:hover': {
                            border: '1px solid blue', color: 'blue'
                        }
                    }} onClick={() => {
                        setEditFlag(true);
                        setCreateFlag(false);
                        setFlag(false);
                    }}>Edit Details </Button>
                    <Button sx={{
                        marginTop: '40px', marginLeft: '40px', color: 'blue', border: '1px solid blue', borderRadius: '10px', width: '17%', '&:hover': {
                            border: '1px solid blue', color: 'blue'
                        }
                    }}
                        onClick={() => {
                            axios.put(`${process.env.REACT_APP_BACKEND_URL}/percentage_update`, {
                                vendor_id: props.vendorid,
                                email: email,
                                stepno: '1'
                            })
                                .then((data) => {
                                    if (data.data) {
                                        props.changeStatus(Math.round(Math.random() * 999))
                                    }
                                })
                        }}>NEXT</Button>
                </Box >
            }
        </>}

        {(editflag === true || createflag === true) &&
            <>
                <Select sx={{ marginTop: '20px', marginLeft: '40px', width: '20%' }}
                    onChange={(e) => {
                        setGSTIN(e.target.value);
                        setDisable(false)
                    }} value={gstin}>
                    {gst.map((li, index) =>
                        <MenuItem value={li.gstin} key={index}>{li.gstin}</MenuItem>
                    )}
                </Select>
                <br></br>
                <Button sx={{ marginTop: '40px', marginLeft: '40px', color: 'blue', border: '1px solid blue', borderRadius: '10px', width: '10%' }} disableTouchRipple
                    onClick={() => setFlag(!verifyFlag)} disabled={disab}
                >VERIFY</Button>
                <div style={{ margin: 'auto', marginTop: '30px', width: '90%', borderTop: '1px solid grey', height: '1pt' }} ></div >
                {verifyFlag === true &&
                    <Box sx={{ marginTop: '20px', marginLeft: '40px' }}>
                        <Typography sx={{ marginLeft: '10px' }}>Please Confirm your busines Details shown below.</Typography>
                        <Box sx={{ marginTop: '20px', marginLeft: '10px', width: '80%' }}>
                            <table >
                                <thead>
                                    <tr >
                                        <th style={{ width: '40%', textAlign: 'left', fontFamily: 'TimesNewRoman', fontWeight: '100', fontSize: '20px' }}>Registered Company Name</th>
                                        <th style={{ width: '30%', textAlign: 'left', fontFamily: 'TimesNewRoman', fontWeight: '100', fontSize: '20px' }}>PAN Number</th>
                                        <th style={{ width: '30%', textAlign: 'left', fontFamily: 'TimesNewRoman', fontWeight: '100', fontSize: '20px' }} >City</th>
                                        <th style={{ width: '30%', textAlign: 'left', fontFamily: 'TimesNewRoman', fontWeight: '100', fontSize: '20px' }}>Pincode</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {arr.length > 0 && <>
                                        {arr.map((li, index) => {
                                            return (<tr key={index}>
                                                <td style={{ width: '40%' }} id='reg_comp_name'>{li.company_name}</td>
                                                <td style={{ width: '30%' }} id='pan_number'>{li.PAN_Number}</td>
                                                <td style={{ width: '30%' }} id='reg_city'>{li.city}</td>
                                                <td style={{ width: '30%' }} id='reg_pincode'>{li.pincode}</td>
                                            </tr>)
                                        })} </>}
                                    <tr >
                                        <th style={{ width: '40%', textAlign: 'left', fontFamily: 'TimesNewRoman', fontWeight: '100', fontSize: '20px' }}>Registered Address</th>
                                        <th style={{ width: '30%', textAlign: 'left', fontFamily: 'TimesNewRoman', fontWeight: '100', fontSize: '20px' }}>State</th>
                                        <th style={{ width: '30%', textAlign: 'left', fontFamily: 'TimesNewRoman', fontWeight: '100', fontSize: '20px' }} >Country</th>
                                        <th style={{ width: '30%', textAlign: 'left', fontFamily: 'TimesNewRoman', fontWeight: '100', fontSize: '20px' }}>GSTin</th>
                                    </tr>
                                    {arr.length > 0 && <>
                                        {arr.map((li, index) => {
                                            return (<tr key={index}>
                                                <td style={{ width: '40%' }} id='reg_adr'>{li.reg_adr}</td>
                                                <td style={{ width: '30%' }} id='reg_state'>{li.reg_state}</td>
                                                <td style={{ width: '30%' }} id='reg_country'>{li.reg_country}</td>
                                                <td style={{ width: '30%' }}>{li.reg_gstin}</td>
                                            </tr>)
                                        })} </>}
                                </tbody>
                            </table>
                        </Box>
                        {(editflag === true || createflag === false) &&
                            <>
                                <Button sx={{
                                    marginTop: '40px', marginLeft: '940px', color: 'grey', border: '1px solid grey', borderRadius: '10px', width: '17%', '&:hover': {
                                        border: '1px solid grey', color: 'grey'
                                    }
                                }}
                                    disableTouchRipple
                                    onClick={async () => {
                                        const gst = axios.put(`${process.env.REACT_APP_BACKEND_URL}/gst_details`, {
                                            vendor_id: props.vendorid,
                                            email: email,
                                            reg_gstin: gstin,
                                            reg_comp_name: document.getElementById('reg_comp_name').innerText,
                                            pan_number: document.getElementById('pan_number').innerText,
                                            reg_city: document.getElementById('reg_city').innerText,
                                            reg_pincode: document.getElementById('reg_pincode').innerText,
                                            reg_adr: document.getElementById('reg_adr').innerText,
                                            reg_state: document.getElementById('reg_state').innerText,
                                            reg_country: document.getElementById('reg_country').innerText
                                        })
                                        const perce = axios.put(`${process.env.REACT_APP_BACKEND_URL}/percentage_update`, {
                                            vendor_id: props.vendorid,
                                            email: email,
                                            stepno: '1'
                                        })
                                        await axios.all([gst, perce])
                                            .then(axios.spread(function (gstdet, percedet) {
                                                if (gstdet.data.modifiedCount == 1) {
                                                    props.changeStatus(Math.round(Math.random() * 20));
                                                }
                                                else {
                                                    toast.error('Error!Please retry', { autoClose: 3000 })
                                                    setTimeout(() => {

                                                    }, 4000)
                                                }
                                            }))

                                    }}> SAVE PROGRESS</Button >

                            </>
                        }
                        {(createflag === true && editflag === false) &&
                            < Button sx={{
                                marginTop: '40px', marginLeft: '940px', color: 'grey', border: '1px solid grey', borderRadius: '10px', width: '17%', '&:hover': {
                                    border: '1px solid grey', color: 'grey'
                                }
                            }}
                                disableTouchRipple
                                onClick={async () => {
                                    let vendor_id = props.vendorid;
                                    const gst = axios.post(`${process.env.REACT_APP_BACKEND_URL}/gst_details`, {
                                        vendor_id: vendor_id,
                                        email: email,
                                        reg_gstin: gstin,
                                        reg_comp_name: document.getElementById('reg_comp_name').innerText,
                                        pan_number: document.getElementById('pan_number').innerText,
                                        reg_city: document.getElementById('reg_city').innerText,
                                        reg_pincode: document.getElementById('reg_pincode').innerText,
                                        reg_adr: document.getElementById('reg_adr').innerText,
                                        reg_state: document.getElementById('reg_state').innerText,
                                        reg_country: document.getElementById('reg_country').innerText
                                    })
                                    const perce = axios.put(`${process.env.REACT_APP_BACKEND_URL}/percentage_update`, {
                                        vendor_id: props.vendorid,
                                        email: email,
                                        stepno: '1'
                                    })
                                    await axios.all([gst, perce])
                                        .then(axios.spread(function (gstdet, percedet) {
                                            if (gstdet.data.vendor_id != undefined && (percedet.data.modifiedCount == 1)) {
                                                props.changeStatus(Math.round(Math.random() * 50));
                                            }
                                            else {
                                                toast.error('Error!Please retry', { autoClose: 3000 })
                                                setTimeout(() => {
                                                }, 4000)
                                            }
                                        }))

                                }}> CONFIRM & NEXT</Button >
                        }
                    </Box >
                }
            </>
        }
        <br />
        <br />
    </>)
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeStatus: (data) => dispatch(changeVendorStatus(data))
    }
}
export default connect(null, mapDispatchToProps)(Gstin_Check);