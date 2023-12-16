import { TextField, Typography, Button, Box, Select, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import { connect } from 'react-redux';
import axios from 'axios';
import { changeVendorStatus } from "../../../../Redux_Store/Action_Creators";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Warehouse_Info = (props) => {

    //storing value
    const [org_mail, setOrgMail] = useState('');
    const [city, setCity] = useState('');
    const [state, setStates] = useState('');
    const [country, setCountry] = useState('');
    const [full_adr, setFullAdr] = useState('');
    const [start_time, setStartTime] = useState('');
    const [end_time, setEndTime] = useState('');
    const [wh_mailadr, setMailAdr] = useState('');
    const [wh_contact, setContact] = useState('');
    const [perday, setPerDay] = useState(0);

    //status
    const [disab1, setDisable1] = useState(true);
    const [disab2, setDisable2] = useState(true);

    //pattern
    const namepat = /[A-Za-z]{2,30}/;
    const mobilepattern = /^[6-9]+[0-9]{9,9}/;
    const emailPattern = /(\w)+@(\w)+\.[a-zA-Z]{2,}/;

    //flag values
    const [cityflag, setCityFlag] = useState(false);
    const [stateflag, setStateFlag] = useState(false);
    const [countryflag, setCountryFlag] = useState(false);
    const [fulladrflag, setFullAdrFlag] = useState(false);
    const [startflag, setStartFlag] = useState(false);
    const [endflag, setEndFlag] = useState(false);
    const [wfmailflag, setWfMailFlag] = useState(false);
    const [wfcontactflag, setWhContactFlag] = useState(false);
    const [perdayflag, setperDayFlag] = useState(false);

    //flag 
    const [editflag, setEditFlag] = useState(false);
    const [createflag, setCreateFlag] = useState(true);

    //data there not not there flag.
    const [nodataflag, setNoDataFlag] = useState(false);

    useEffect(() => {
        setOrgMail(props.email);
    }, [])
    useEffect(() => {
        async function pwd1() {
            if (cityflag === true && stateflag === true &&
                countryflag === true && fulladrflag === true && startflag === true &&
                endflag === true && wfmailflag === true && wfcontactflag === true && perdayflag === true) {
                setDisable1(false);
            }
            else {
                setDisable1(true);
            }
        }
        function pwd2() {
            if (disab1 === true)
                setDisable2(true);
        }
        if (editflag === true || createflag === true) {
            pwd1();
            pwd2();
        }
    }, [createflag, editflag, disab1, cityflag, stateflag, countryflag, fulladrflag, startflag, endflag, wfmailflag, wfcontactflag, perdayflag])
    useEffect(() => {
        function pwd0() {
            setCity('');
            setStates('');
            setCountry('');
            setFullAdr('');
            setStartTime('');
            setEndTime('');
            setMailAdr('');
            setContact('');
            setPerDay(0);
            setDisable1(true);
            setDisable2(true);
            setCityFlag(false);
            setStateFlag(false);
            setCountryFlag(false);
            setFullAdrFlag(false);
            setStartFlag(false);
            setEndFlag(false);
            setWfMailFlag(false);
            setWhContactFlag(false);
            setperDayFlag(false);
            setNoDataFlag(true)
        }
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/warehouse_det?email=${props.email}&warehouse_no=${props.count}`)
            .then((data) => {
                if (data.data.length > 0) {
                    setCreateFlag(false);
                    setCity(data.data[0].wh_city);
                    setStates(data.data[0].wh_state);
                    setCountry(data.data[0].wh_country);
                    setFullAdr(data.data[0].wh_address);
                    setStartTime(data.data[0].start_time);
                    setEndTime(data.data[0].end_time);
                    setMailAdr(data.data[0].wh_emailid);
                    setContact(data.data[0].wh_contactno);
                    setPerDay(data.data[0].perday);
                    setDisable1(true);
                    setDisable2(true);
                    setCityFlag(false);
                    setStateFlag(false);
                    setCountryFlag(false);
                    setFullAdrFlag(false);
                    setStartFlag(false);
                    setEndFlag(false);
                    setWfMailFlag(false);
                    setWhContactFlag(false);
                    setperDayFlag(false);
                }
                else if (data.data.length === 0) {
                    pwd0();
                }
            })
    }, [props])

    return (<>
        <ToastContainer className='toastcontainer' />
        <Typography variant='h6' sx={{ marginTop: '20px', marginLeft: '40px', fontSize: '20px', fontWeight: 'bold' }}>Warehouse {props.count}</Typography>
        <Typography sx={{ flex: 4, fontSize: '12px', color: 'grey', marginTop: '30px', marginLeft: '40px' }}>ORGANIZATION EMAIL ID</Typography>
        <TextField value={org_mail} variant='standard' sx={{ flex: 3, marginTop: '10px', marginLeft: '40px' }} />
        <Box sx={{ display: 'flex', width: '75%', marginLeft: '40px', marginTop: '20px' }}>
            <Typography sx={{ flex: 4, fontSize: '12px', color: 'grey' }}>CITY</Typography>
            <Typography sx={{ flex: 4, fontSize: '12px', color: 'grey' }}>STATE</Typography>
            <Typography sx={{ flex: 4, fontSize: '12px', color: 'grey' }}>COUNTRY</Typography>
        </Box>
        {(editflag === true || createflag === true) && <>
            <Box sx={{ display: 'flex', width: '75%', marginTop: '20px', marginLeft: '50px', alignItems: 'center' }}>
                <TextField value={city} variant='standard' sx={{ flex: 3 }}
                    onChange={(e) => setCity(e.target.value)}
                    onBlur={() => {
                        if (namepat.test(city)) {
                            document.getElementById('warehousedetails_error_message').innerText = '';
                            setCityFlag(true);
                        }
                        else if (namepat.test(city) === false) {
                            document.getElementById('warehousedetails_error_message').innerText = 'Please Enter a valid city';
                            setCityFlag(false);
                        }
                    }} />
                <TextField value={state} variant='standard' sx={{ flex: 3, marginLeft: '10px' }}
                    onChange={(e) => setStates(e.target.value)}
                    onBlur={() => {
                        if (namepat.test(state)) {
                            document.getElementById('warehousedetails_error_message').innerText = '';
                            setStateFlag(true);
                        }
                        else if (namepat.test(state) === false) {
                            document.getElementById('warehousedetails_error_message').innerText = 'Please Enter a valid state';
                            setStateFlag(false);
                        }
                    }} />
                <TextField value={country} variant='standard' sx={{ flex: 3, marginLeft: '19px' }}
                    onChange={(e) => setCountry(e.target.value)}
                    onBlur={() => {
                        if (namepat.test(country)) {
                            document.getElementById('warehousedetails_error_message').innerText = '';
                            setCountryFlag(true);
                        }
                        else if (namepat.test(country) === false) {
                            document.getElementById('warehousedetails_error_message').innerText = 'Please Enter a valid country';
                            setCountryFlag(false);
                        }
                    }} />
            </Box>
            <Typography sx={{ flex: 4, fontSize: '12px', color: 'grey', marginTop: '30px', marginLeft: '40px' }}>FULL ADDRESS</Typography>
            <TextField value={full_adr} variant='standard' sx={{ flex: 3, marginTop: '10px', marginLeft: '40px' }}
                onChange={(e) => setFullAdr(e.target.value)}
                onBlur={() => {
                    if ((full_adr).length > 0) {
                        document.getElementById('warehousedetails_error_message').innerText = '';
                        setFullAdrFlag(true);
                    }
                    else if ((full_adr).length == 0) {
                        document.getElementById('warehousedetails_error_message').innerText = 'Please Enter a valid address';
                        setFullAdrFlag(false);
                    }
                }} />
            <Box sx={{ display: 'flex', width: '75%', marginTop: '30px', marginLeft: '50px' }}>
                <Typography sx={{ flex: 4, fontSize: '12px', color: 'grey' }}>OPERATING START TIME</Typography>
                <Typography sx={{ flex: 4, fontSize: '12px', color: 'grey' }}>OPERATING END TIME</Typography>
            </Box>
            <Box sx={{ display: 'flex', width: '75%', marginTop: '20px', marginLeft: '50px', alignItems: 'center' }}>
                <Select sx={{ width: '27%' }} variant='standard' value={start_time} onChange={(e) => setStartTime(e.target.value)}
                    onBlur={() => {
                        if (start_time.length > 0) {
                            document.getElementById('warehousedetails_error_message').innerText = '';
                            setStartFlag(true);
                        }
                        else if (start_time.length == 0) {
                            document.getElementById('warehousedetails_error_message').innerText = 'Please Select Operating Start Time';
                            setStartFlag(false);
                        }
                    }}>
                    <MenuItem value='6.00'>6.00</MenuItem>
                    <MenuItem value='7.00'>7.00</MenuItem>
                    <MenuItem value='8.00'>8.00</MenuItem>
                    <MenuItem value='9.00'>9.00</MenuItem>
                    <MenuItem value='10.00'>10.00</MenuItem>
                    <MenuItem value='11.00'>11.00</MenuItem>
                    <MenuItem value='12.00'>12.00</MenuItem>
                    <MenuItem value='13.00'>13.00</MenuItem>
                    <MenuItem value='14.00'>14.00</MenuItem>
                    <MenuItem value='15.00'>15.00</MenuItem>
                    <MenuItem value='16.00'>16.00</MenuItem>
                    <MenuItem value='17.00'>17.00</MenuItem>
                    <MenuItem value='18.00'>18.00</MenuItem>
                </Select>
                <Select sx={{ width: '27%', marginLeft: '160px' }} variant='standard'
                    value={end_time} onChange={(e) => setEndTime(e.target.value)}
                    onBlur={() => {
                        if (end_time.length > 0) {
                            document.getElementById('warehousedetails_error_message').innerText = '';
                            setEndFlag(true);
                        }
                        else if (end_time.length == 0) {
                            document.getElementById('warehousedetails_error_message').innerText = 'Please Select Operating End Time';
                            setEndFlag(false);
                        }
                    }}>
                    <MenuItem value='6.00'>6.00</MenuItem>
                    <MenuItem value='7.00'>7.00</MenuItem>
                    <MenuItem value='8.00'>8.00</MenuItem>
                    <MenuItem value='9.00'>9.00</MenuItem>
                    <MenuItem value='10.00'>10.00</MenuItem>
                    <MenuItem value='11.00'>11.00</MenuItem>
                    <MenuItem value='12.00'>12.00</MenuItem>
                    <MenuItem value='13.00'>13.00</MenuItem>
                    <MenuItem value='14.00'>14.00</MenuItem>
                    <MenuItem value='15.00'>15.00</MenuItem>
                    <MenuItem value='16.00'>16.00</MenuItem>
                    <MenuItem value='17.00'>17.00</MenuItem>
                    <MenuItem value='18.00'>18.00</MenuItem>
                </Select>
            </Box>
            <Box sx={{ display: 'flex', width: '75%', marginTop: '30px', marginLeft: '50px' }}>
                <Typography sx={{ flex: 4, fontSize: '12px', color: 'grey' }}>WAREHOUSE EMAIL ADDRESS</Typography>
                <Typography sx={{ flex: 4, fontSize: '12px', color: 'grey' }}>WAREHOUSE CONTACT NUMBER</Typography>
                <Typography sx={{ flex: 4, fontSize: '12px', color: 'grey' }}>PER DAY ORDER PROCESSING CAPACITY</Typography>
            </Box>
            <Box sx={{ display: 'flex', width: '75%', marginTop: '20px', marginLeft: '50px', alignItems: 'center' }}>
                <TextField value={wh_mailadr} variant='standard' sx={{ flex: 3 }} onChange={(e) => setMailAdr(e.target.value)}
                    onBlur={() => {
                        if (emailPattern.test(wh_mailadr)) {
                            document.getElementById('warehousedetails_error_message').innerText = '';
                            setWfMailFlag(true);
                        }
                        else if (emailPattern.test(wh_mailadr) === false) {
                            document.getElementById('warehousedetails_error_message').innerText = 'Please Enter a valid Email address';
                            setWfMailFlag(false);
                        }
                    }} />
                <TextField value={wh_contact} variant='standard' sx={{ flex: 3, marginLeft: '10px' }}
                    onChange={(e) => setContact(e.target.value)}
                    onBlur={() => {
                        if (mobilepattern.test(wh_contact)) {
                            document.getElementById('warehousedetails_error_message').innerText = '';
                            setWhContactFlag(true);
                        }
                        else if (mobilepattern.test(wh_contact) === false) {
                            document.getElementById('warehousedetails_error_message').innerText = 'Please Enter a valid contact number';
                            setWhContactFlag(false);
                        }
                    }} />
                <TextField value={perday} variant='standard' sx={{ flex: 3, marginLeft: '19px' }} onChange={(e) => setPerDay(e.target.value)}
                    onBlur={() => {
                        if (perday > 0) {
                            document.getElementById('warehousedetails_error_message').innerText = '';
                            setperDayFlag(true);
                        }
                        else if (perday == 0) {
                            document.getElementById('warehousedetails_error_message').innerText = 'Please Enter Per Day Processing Capacity';
                            setperDayFlag(false);
                        }
                    }}
                />
            </Box>
            <span id='warehousedetails_error_message' style={{ marginLeft: '40px', color: "red", marginTop: '30px', fontFamily: 'TimesNewRoman', display: 'inline-block' }}></span>
            <br></br>
            {(createflag === true && editflag === false) && <>
                <Button variant='outlined' sx={{ marginLeft: '700px', marginTop: '40px', color: 'blue', backgroundColor: 'white', border: '1px soldi blue', borderRadius: '10px' }}
                    disabled={disab1}
                    onClick={async () => {
                        await setDisable2(false);
                        const warehouse = axios.post(`${process.env.REACT_APP_BACKEND_URL}/warehouse_details`, {
                            vendor_id: props.vendorid,
                            email: org_mail,
                            warehouse_no: props.count,
                            org_mailid: org_mail,
                            wh_city: city,
                            wh_state: state,
                            wh_country: country,
                            wh_address: full_adr,
                            start_time: start_time,
                            end_time: end_time,
                            wh_emailid: wh_mailadr,
                            wh_contactno: wh_contact,
                            perday: perday
                        })
                        const perce = axios.put(`${process.env.REACT_APP_BACKEND_URL}/percentage_update`, {
                            vendor_id: props.vendorid,
                            email: org_mail,
                            stepno: '3'
                        })
                        await axios.all([warehouse, perce])
                            .then(axios.spread(function (warehousedet, percedet) {
                                if (warehousedet.data.vendor_id != undefined) {

                                }
                                else {
                                    setDisable1(true);
                                    toast.error('Error please try again!', { autoClose: 3000 });
                                }
                            }))

                    }}>SAVE PROGRESS</Button>
            </>}
            {(editflag === true && createflag === false && nodataflag == false) && <>
                <Button variant='outlined' sx={{ marginLeft: '700px', marginTop: '40px', color: 'blue', backgroundColor: 'white', border: '1px soldi blue', borderRadius: '10px' }}
                    disabled={disab1}
                    onClick={async () => {
                        await setDisable2(false);
                        const warehouse = axios.put(`${process.env.REACT_APP_BACKEND_URL}/warehouse_details`, {
                            vendor_id: props.vendorid,
                            email: org_mail,
                            warehouse_no: props.count,
                            org_mailid: org_mail,
                            wh_city: city,
                            wh_state: state,
                            wh_country: country,
                            wh_address: full_adr,
                            start_time: start_time,
                            end_time: end_time,
                            wh_emailid: wh_mailadr,
                            wh_contactno: wh_contact,
                            perday: perday
                        })
                        const perce = axios.put(`${process.env.REACT_APP_BACKEND_URL}/percentage_update`, {
                            vendor_id: props.vendorid,
                            email: org_mail,
                            stepno: '3'
                        })
                        await axios.all([warehouse, perce])
                            .then(axios.spread(function (warehousedet, percedet) {
                                if (warehousedet.data.modifiedCount == 1) {

                                }
                                else {
                                    setDisable1(true);
                                    toast.error('Error please try again!', { autoClose: 3000 });
                                }
                            }))

                    }}>SAVE PROGRESS</Button>
            </>}
            {/* //when editing create data */}
            {(editflag === true && createflag === false && nodataflag == true) && <>
                <Button variant='outlined' sx={{ marginLeft: '700px', marginTop: '40px', color: 'blue', backgroundColor: 'white', border: '1px soldi blue', borderRadius: '10px' }}
                    disabled={disab1}
                    onClick={async () => {
                        await setDisable2(false);
                        const warehouse = axios.post(`${process.env.REACT_APP_BACKEND_URL}/warehouse_details`, {
                            vendor_id: props.vendorid,
                            email: org_mail,
                            warehouse_no: props.count,
                            org_mailid: org_mail,
                            wh_city: city,
                            wh_state: state,
                            wh_country: country,
                            wh_address: full_adr,
                            start_time: start_time,
                            end_time: end_time,
                            wh_emailid: wh_mailadr,
                            wh_contactno: wh_contact,
                            perday: perday
                        })
                        const perce = axios.put(`${process.env.REACT_APP_BACKEND_URL}/percentage_update`, {
                            vendor_id: props.vendorid,
                            email: org_mail,
                            stepno: '3'
                        })
                        await axios.all([warehouse, perce])
                            .then(axios.spread(function (warehousedet, percedet) {
                                if (warehousedet.data.vendor_id != undefined) {

                                }
                                else {
                                    setDisable1(true);
                                    toast.error('Error please try again!', { autoClose: 3000 });
                                }
                            }))

                    }}>SAVE PROGRESS</Button>
            </>}
            <Button variant='outlined' sx={{
                marginLeft: '20px', marginTop: '40px', color: 'white', backgroundColor: 'blue', border: '1px soldi blue', borderRadius: '10px',
                '&:hover': { color: 'white', backgroundColor: 'blue', border: '1px soldi blue', borderRadius: '10px' }
            }} disabled={disab2} onClick={() => props.changeStatus(Math.round(Math.random() * 2000))}>NEXT</Button>
        </>}
        {
            editflag === false && createflag === false && <>

                <Box sx={{ display: 'flex', width: '75%', marginTop: '20px', marginLeft: '50px', alignItems: 'center' }}>
                    <TextField value={city} variant='standard' sx={{ flex: 3 }} />
                    <TextField value={state} variant='standard' sx={{ flex: 3, marginLeft: '10px' }} />
                    <TextField value={country} variant='standard' sx={{ flex: 3, marginLeft: '19px' }} />
                </Box>
                <Typography sx={{ flex: 4, fontSize: '12px', color: 'grey', marginTop: '30px', marginLeft: '40px' }}>FULL ADDRESS</Typography>
                <TextField value={full_adr} variant='standard' sx={{ flex: 3, marginTop: '10px', marginLeft: '40px' }} />
                <Box sx={{ display: 'flex', width: '75%', marginTop: '30px', marginLeft: '50px' }}>
                    <Typography sx={{ flex: 4, fontSize: '12px', color: 'grey' }}>OPERATING START TIME</Typography>
                    <Typography sx={{ flex: 4, fontSize: '12px', color: 'grey' }}>OPERATING END TIME</Typography>
                </Box>
                <Box sx={{ display: 'flex', width: '75%', marginTop: '20px', marginLeft: '50px', alignItems: 'center' }}>
                    <Select sx={{ width: '27%' }} variant='standard' value={start_time} >
                        <MenuItem value='6.00'>6.00</MenuItem>
                        <MenuItem value='7.00'>7.00</MenuItem>
                        <MenuItem value='8.00'>8.00</MenuItem>
                        <MenuItem value='9.00'>9.00</MenuItem>
                        <MenuItem value='10.00'>10.00</MenuItem>
                        <MenuItem value='11.00'>11.00</MenuItem>
                        <MenuItem value='12.00'>12.00</MenuItem>
                        <MenuItem value='13.00'>13.00</MenuItem>
                        <MenuItem value='14.00'>14.00</MenuItem>
                        <MenuItem value='15.00'>15.00</MenuItem>
                        <MenuItem value='16.00'>16.00</MenuItem>
                        <MenuItem value='17.00'>17.00</MenuItem>
                        <MenuItem value='18.00'>18.00</MenuItem>
                    </Select>
                    <Select sx={{ width: '27%', marginLeft: '160px' }} variant='standard'
                        value={end_time}>
                        <MenuItem value='6.00'>6.00</MenuItem>
                        <MenuItem value='7.00'>7.00</MenuItem>
                        <MenuItem value='8.00'>8.00</MenuItem>
                        <MenuItem value='9.00'>9.00</MenuItem>
                        <MenuItem value='10.00'>10.00</MenuItem>
                        <MenuItem value='11.00'>11.00</MenuItem>
                        <MenuItem value='12.00'>12.00</MenuItem>
                        <MenuItem value='13.00'>13.00</MenuItem>
                        <MenuItem value='14.00'>14.00</MenuItem>
                        <MenuItem value='15.00'>15.00</MenuItem>
                        <MenuItem value='16.00'>16.00</MenuItem>
                        <MenuItem value='17.00'>17.00</MenuItem>
                        <MenuItem value='18.00'>18.00</MenuItem>
                    </Select>
                </Box>
                <Box sx={{ display: 'flex', width: '75%', marginTop: '30px', marginLeft: '50px' }}>
                    <Typography sx={{ flex: 4, fontSize: '12px', color: 'grey' }}>WAREHOUSE EMAIL ADDRESS</Typography>
                    <Typography sx={{ flex: 4, fontSize: '12px', color: 'grey' }}>WAREHOUSE CONTACT NUMBER</Typography>
                    <Typography sx={{ flex: 4, fontSize: '12px', color: 'grey' }}>PER DAY ORDER PROCESSING CAPACITY</Typography>
                </Box>
                <Box sx={{ display: 'flex', width: '75%', marginTop: '20px', marginLeft: '50px', alignItems: 'center' }}>
                    <TextField value={wh_mailadr} variant='standard' sx={{ flex: 3 }} />
                    <TextField value={wh_contact} variant='standard' sx={{ flex: 3, marginLeft: '10px' }} />
                    <TextField value={perday} variant='standard' sx={{ flex: 3, marginLeft: '19px' }} />
                </Box>
                <span id='warehousedetails_error_message' style={{ marginLeft: '40px', color: "red", marginTop: '30px', fontFamily: 'TimesNewRoman', display: 'inline-block' }}></span>
                <br></br>
                <Button variant='outlined' sx={{ marginLeft: '700px', marginTop: '40px', color: 'blue', backgroundColor: 'white', border: '1px soldi blue', borderRadius: '10px' }}
                    onClick={() => {
                        setEditFlag(true);
                        setCreateFlag(false);
                    }} >EDIT DETAILS</Button>

                <Button variant='outlined' sx={{
                    marginLeft: '20px', marginTop: '40px', color: 'white', backgroundColor: 'blue', border: '1px soldi blue', borderRadius: '10px',
                    '&:hover': { color: 'white', backgroundColor: 'blue', border: '1px soldi blue', borderRadius: '10px' }
                }} onClick={() => {
                    axios.put(`${process.env.REACT_APP_BACKEND_URL}/percentage_update`, {
                        vendor_id: props.vendorid,
                        email: org_mail,
                        stepno: '3'
                    })
                        .then((data) => {
                            if (data.data) {
                                props.changeStatus(Math.round(Math.random() * 3000))
                            }
                        })
                }}>NEXT</Button>
            </>
        }
        <br></br>
        <br></br>
        <br></br>
    </>)
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeStatus: (data) => dispatch(changeVendorStatus(data))
    }
}
export default connect(null, mapDispatchToProps)(Warehouse_Info);