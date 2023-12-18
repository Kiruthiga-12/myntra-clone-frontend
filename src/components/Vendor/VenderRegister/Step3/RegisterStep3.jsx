import { useEffect, useState } from "react";
import { Box, Typography, TextField, Button, FormControlLabel, Checkbox } from '@mui/material';
import Register_Navbar from "../Register_Navbar";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../../Loader/Loader';
import { setNavBar, setFooter } from "../../../Redux_Store/Action_Creators";
const RegisterStep3 = (props) => {

    //pattern Definition
    const pwdpat2 = /[A-Z]+/;
    const pwdpat3 = /[0-9]+/;
    const pwdpat4 = /[@#\$\&\^\(\)!]+/;
    const fnamePat = /[A-Za-z]{2,}/;
    const lnamePat = /[A-Za-z]{2,}/;

    //status
    const [disab, setDisable] = useState(true);
    const [targetlink, setTargetLink] = useState('');
    const [firstname, setFname] = useState(false);
    const [lastname, setLname] = useState(false);
    const [logged, setCredentials] = useState('');
    const [pwdflag, setPwdFlag] = useState('');
    const [imageflag, setImageFlag] = useState(false);
    //storing a value.
    const [fname, setFirstName] = useState('');
    const [lname, setLastName] = useState('');
    const [signuppwd, setSignupPwd] = useState('');
    const [checkValue, setCheckState] = useState(false);
    const [vendorid, setVendorId] = useState('');
    const [vendor_profile, setVendorProfile] = useState()

    const [activecnt, setActiveCnt] = useState();
    const [removedcnt, setRemovedCnt] = useState();
    const [loader, setLoader] = useState(false);
    const [buttonloader, setButtonLoader] = useState(false);
    const [msg, setMsg] = useState();

    useEffect(() => {
        if (document.getElementById('showpassword') != undefined) {
            if (checkValue === true)
                document.getElementById('showpassword').type = 'text';
            else if (checkValue === false)
                document.getElementById('showpassword').type = 'password';
        }
    }, [checkValue])
    useEffect(() => {
        function func2() {
            if (logged == true) {
                setTargetLink('/basicinformation')
                axios.get(`${process.env.REACT_APP_BACKEND_URL}/delete_vendor_profile`)
                    .then((data) => { })
            }
        }
        func2();
    }, [logged])
    useEffect(() => {
        document.title = 'Sell with Myntra';
        document.body.style.backgroundImage = 'url(../../Images/Galaxy.jpeg)';
        props.setNavBar('');
        props.setFooter('');
        if ((props.vendor_email != '' && props.vendor_email != undefined) || (props.vendor_mobile != '' && props.vendor_mobile != undefined)) {
            setLoader(true);
            const active_vendor = axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_vendor_cnt`);
            const removed_vendor = axios.get(`${process.env.REACT_APP_BACKEND_URL}/removed_vendor_cnt`);
            axios.all([active_vendor, removed_vendor])
                .then(axios.spread(function (active_cnt, removed_cnt) {
                    active_cnt.data.data == 0 ? setActiveCnt(0) : setActiveCnt(active_cnt.data.data);
                    removed_cnt.data.data != 0 ? setRemovedCnt(removed_cnt.data.data) : setRemovedCnt(0)
                    setLoader(false);
                }))
        }
        else {
            setMsg('Invalid Resource');
        }
    }, [])
    useEffect(() => {
        function pwd() {
            setLoader(true);
            if (activecnt > removedcnt) {
                setVendorId(activecnt + 1);
            }
            else if (removedcnt > activecnt) {
                setVendorId(removedcnt + 1)
            }
            else if (removedcnt == activecnt && activecnt == 0) {
                setVendorId(1)
            }
            setLoader(false);
        }
        if (activecnt != undefined && removedcnt != undefined)
            pwd();
    }, [removedcnt, activecnt])
    return (
        <>
            {loader == true ? <Loader /> : <>
                {msg == undefined && <>
                    <ToastContainer className='toastcontainer' />
                    <Register_Navbar display='none' />
                    <Box sx={{ margin: 'auto', marginTop: '120px', width: '29%', backgroundColor: 'white', padding: '10px', textAlign: 'center' }}>
                        <Typography sx={{ marginTop: '30px', fontSize: '23px', fontWeight: 'bold' }}>Welcome to Myntra!</Typography>
                        <Typography sx={{ marginTop: '10px' }}>Create your Partner Account in 3 simple steps</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px', marginLeft: '30px' }}>
                            < CheckCircleIcon />
                            <Typography sx={{ marginLeft: '20px' }}>Mobile Number</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginLeft: '30px' }}>
                            < CheckCircleIcon />
                            <Typography sx={{ marginLeft: '20px' }}>Email Id for Partner Portal Login</Typography>
                        </Box>
                        <Typography sx={{ marginLeft: '-350px', marginTop: '30px' }}>Vendor ID : <span>{vendorid}</span> </Typography>
                        <Typography sx={{ marginTop: '20px', fontWeight: 'bold', color: 'grey', marginLeft: '-330px' }}>Vendor Profile</Typography>
                        <TextField type='file' name='vendor_profile' variant='standard' sx={{ marginLeft: '-140px', marginTop: '20px' }}
                            onChange={async (e) => {
                                setVendorProfile(e.target.files[0])
                            }}
                            onBlur={async () => {
                                function pwd1() {
                                    if (vendor_profile == '' || vendor_profile == undefined) {
                                        document.getElementById('register_error_message').innerText = 'Profile Photo Can\'t be blank!';
                                        setImageFlag(false);
                                    }
                                    else if (vendor_profile != '' || vendor_profile != undefined) {
                                        document.getElementById('register_error_message').innerText = '';
                                        setImageFlag(true)
                                    }
                                }
                                pwd1();
                            }} />
                        <Typography sx={{ marginLeft: '-190px', marginTop: '30px' }}>We just need a few more details...</Typography>
                        <Typography sx={{ marginTop: '20px', fontWeight: 'bold', color: 'grey', marginLeft: '-270px' }}>STEP 3: FIRST NAME</Typography>
                        <TextField variant='standard' type='text' sx={{ marginTop: '10px', width: '70%', marginLeft: '-100px' }} placeholder='Enter your first name'
                            value={fname} onChange={(e) => setFirstName(e.target.value)}
                            onBlur={() => {
                                if (fnamePat.test(fname)) {
                                    document.getElementById('register_error_message').innerText = '';
                                    setFname(true);
                                }
                                else if (fnamePat.test(fname) === false) {
                                    document.getElementById('register_error_message').innerText = 'Please Enter proper First Name!!!';
                                    setFname(false);
                                }
                            }} /><br />
                        <Typography sx={{ marginTop: '20px', fontWeight: 'bold', color: 'grey', marginLeft: '-270px' }}>STEP 4: LAST NAME</Typography>
                        <TextField variant='standard' type='text' sx={{ marginTop: '10px', width: '70%', marginLeft: '-100px' }} placeholder='Enter your last name'
                            value={lname} onChange={(e) => setLastName(e.target.value)}
                            onBlur={() => {
                                if (lnamePat.test(lname)) {
                                    document.getElementById('register_error_message').innerText = '';
                                    setLname(true);
                                }
                                else if (lnamePat.test(lname) === false) {
                                    document.getElementById('register_error_message').innerText = 'Please Enter proper Last Name!!!';
                                    setLname(false);
                                }
                            }} /><br />
                        <Typography sx={{ marginTop: '20px', fontWeight: 'bold', color: 'grey', marginLeft: '-270px' }}>STEP 5: PASSWORD</Typography>
                        <Box sx={{ displa: 'flex', alignItems: 'center' }}>
                            <TextField id='showpassword' variant='standard' type='password' sx={{ marginTop: '10px', width: '70%', marginLeft: '-100px' }} placeholder='Create a new Password'
                                onChange={(e) => setSignupPwd(e.target.value)} value={signuppwd}
                                onBlur={(e) => {
                                    function pwd1() {
                                        if (signuppwd.length > 0 && signuppwd.length == 8) {
                                            document.getElementById('condition1').style.color = 'green';
                                            document.getElementById('condition1').style.backgroundColor = 'lightgreen';
                                            document.getElementById('register_error_message').innerText = '';
                                        }
                                        else if ((signuppwd.length > 0 && signuppwd.length < 8) || (signuppwd.length > 0 && signuppwd.length > 8)) {
                                            document.getElementById('condition1').style.color = 'red';
                                            document.getElementById('condition1').style.backgroundColor = 'rgb(248, 166, 166)';
                                            document.getElementById('register_error_message').innerText = 'Please Enter valid Password satisfies above criteria!!!';
                                            setPwdFlag(false);
                                        }
                                        else if (signuppwd.length == 0) {
                                            document.getElementById('condition1').style.color = 'red';
                                            document.getElementById('condition1').style.backgroundColor = 'rgb(248, 166, 166)';
                                            document.getElementById('register_error_message').innerText = 'Please Enter valid Password satisfies above criteria!!!';
                                            setPwdFlag(false);
                                        }
                                    }
                                    function pwd2() {
                                        if (pwdpat2.test(signuppwd)) {
                                            document.getElementById('condition2').style.color = 'green';
                                            document.getElementById('condition2').style.backgroundColor = 'lightgreen';
                                        }
                                        else if (pwdpat2.test(signuppwd) === false) {
                                            document.getElementById('condition2').style.color = 'red';
                                            document.getElementById('condition2').style.backgroundColor = 'rgb(248, 166, 166)';
                                            setPwdFlag(false);
                                        }
                                    }
                                    function pwd3() {
                                        if (pwdpat3.test(signuppwd)) {
                                            document.getElementById('condition3').style.color = 'green';
                                            document.getElementById('condition3').style.backgroundColor = 'lightgreen';
                                        }
                                        else if (pwdpat3.test(signuppwd) === false) {
                                            document.getElementById('condition3').style.color = 'red';
                                            document.getElementById('condition3').style.backgroundColor = 'rgb(248, 166, 166)';
                                            setPwdFlag(false);
                                        }
                                    }
                                    function pwd4() {
                                        if (pwdpat4.test(signuppwd)) {
                                            document.getElementById('condition4').style.color = 'green';
                                            document.getElementById('condition4').style.backgroundColor = 'lightgreen';
                                            setPwdFlag(true);
                                        }
                                        else if (pwdpat4.test(signuppwd) === false) {
                                            document.getElementById('condition4').style.color = 'red';
                                            document.getElementById('condition4').style.backgroundColor = 'rgb(248, 166, 166)';
                                            setPwdFlag(false);
                                        }
                                    }
                                    async function pwd5() {
                                        setButtonLoader(true)
                                        let formData = new FormData();
                                        formData.append('vendor_id', vendorid);
                                        formData.append('vendor_mobile', props.vendor_mobile);
                                        formData.append('company_mailid', props.vendor_email);
                                        formData.append('vendor_firstname', fname);
                                        formData.append('vendor_lastname', lname);
                                        formData.append('vendor_password', signuppwd);
                                        formData.append('vendor_profile', vendor_profile);
                                        const vendorsignup = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/vendor_signup`,
                                            formData, {
                                            headers: {
                                                "Content-Type": 'multipart-formdata'
                                            }
                                        })
                                        const perc = axios.post(`${process.env.REACT_APP_BACKEND_URL}/percentage`, {
                                            vendor_id: vendorid,
                                            email: props.vendor_email,
                                            stepno: '0',
                                            perc: 0
                                        })
                                        const vendorstatus = axios.post(`${process.env.REACT_APP_BACKEND_URL}/vendor_status`, {
                                            vendor_id: vendorid,
                                            email: props.vendor_email,
                                            status: 'pending submission'
                                        })
                                        const deleteotp = axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_vendor_otp?email=${props.vendor_email}`)
                                        await axios.all([vendorsignup, perc, vendorstatus, deleteotp])
                                            .then(axios.spread(function (signupdet, perce, status, otpdel) {
                                                if (signupdet.data.vendor_id != undefined && perce.data.vendor_id != undefined &&
                                                    status.data.vendor_id != undefined && otpdel.data.deletedCount == 1) {
                                                    setCredentials(true);
                                                }
                                                else {
                                                    setCredentials(false);
                                                }
                                                setDisable(false);
                                                setButtonLoader(false);
                                            }))
                                    }
                                    pwd1();
                                    pwd2();
                                    pwd3();
                                    pwd4();
                                    if (firstname === true && lastname === true && imageflag == true && pwdflag === true) {
                                        pwd5()
                                    }
                                    else
                                        toast.error('Please fill correct details!', { autoClose: 3000, position: "bottom-right" })
                                }} /><br />
                            <FormControlLabel sx={{ marginLeft: '-230px' }} label='Show Password' control={<Checkbox
                                onChange={(e, newValue) => setCheckState(newValue)}
                            />}></FormControlLabel><br />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: "center", justifyContent: 'space-between', marginLeft: '20px', marginRight: '20px', marginTop: '20px' }}>
                            <Typography id='condition1' sx={{ flex: 3, borderRadius: '5px', border: '1px solid transparent', backgroundColor: "lightgrey", textAlign: "center", padding: '5px 5px' }}>8 Characters</Typography>
                            <Typography id='condition2' sx={{ flex: 3, borderRadius: '5px', border: '1px solid transparent', backgroundColor: "lightgrey", textAlign: "center", padding: '5px 5px', marginLeft: '5px' }}>1 Uppercase </Typography>
                            <Typography id='condition3' sx={{ flex: 3, borderRadius: '5px', border: '1px solid transparent', backgroundColor: "lightgrey", textAlign: "center", padding: '5px 5px', marginLeft: '5px' }}>1 Numeric</Typography>
                            <Typography id='condition4' sx={{ flex: 3, borderRadius: '5px', border: '1px solid transparent', backgroundColor: "lightgrey", textAlign: "center", padding: '5px 5px', marginLeft: '5px' }}>1 Special</Typography>
                        </Box>
                        <span id='register_error_message' style={{ marginLeft: '40px', color: "red", marginTop: '30px', fontFamily: 'TimesNewRoman', display: 'inline-block' }}></span><br></br>
                        {buttonloader == true ? <Loader /> : <>
                            <Button disableTouchRipple sx={{
                                marginTop: '30px', color: 'white', backgroundColor: 'blue',
                                '&:hover': { color: 'white', backgroundColor: 'blue' }
                            }} component={Link} to={targetlink} disabled={disab}
                                onClick={async () => {
                                    if (logged === false) {
                                        toast.error("Error please retry", { autoClose: 3000 })
                                        setTimeout(() => {
                                            window.location.replace('/partnerhome/register_step1');
                                        }, 4000)
                                    }
                                }}
                            > SUBMIT</Button>
                        </>}
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                    </Box >
                </>}
                {msg != undefined && <>
                    <Typography sx={{ marginTop: "100px", color: "white", textAlign: "center", fontWeight: "bold", fontSize: '26px' }}>{msg} !!</Typography>
                    <Typography sx={{ marginTop: "10px", color: "white", textAlign: "center", fontWeight: "bold", fontSize: '19px', fontFamily: "verdana" }}>Kindly Complete previous Steps !</Typography>
                </>}
            </>}
        </>
    )
}

const mapStateToProps = (cstate) => {
    return {
        vendor_mobile: cstate.get_vendor_mobile,
        vendor_email: cstate.get_vendor_email
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setNavBar: (data) => dispatch(setNavBar(data)),
        setFooter: (data) => dispatch(setFooter(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterStep3);