import { TextField, Typography, Button, Box, Select, MenuItem } from "@mui/material"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { changeVendorStatus } from "../../../Redux_Store/Action_Creators";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../../../Loader/Loader";
const Basic_Details = (props) => {
    //storing values
    const [orgmail, setOrgMail] = useState('');
    const [primary_name, setPrimaryName] = useState('');
    const [primary_phone, setPrimaryPhone] = useState('');
    const [primary_mail, setPrimaryEmail] = useState('');
    const [bo_name, setBoName] = useState('');
    const [bo_mobile, setBoMobile] = useState('');
    const [bo_mail, setBoMail] = useState('');
    const [exist_mp, setMyntra_Partner] = useState('');
    const [filename, setFileName] = useState(null);
    const [displayimage, setDisplayImage] = useState();
    //status
    const [disab1, setDisable1] = useState(true)
    const [disab2, setDisable2] = useState(true);
    const [primarymail_flag, setPrimaryMailFlag] = useState(false);

    const [boname_flag, setBoNameFlag] = useState(false);
    const [bomobile_flag, setBoMobileFlag] = useState(false);
    const [bomail_flag, setBoMailFlag] = useState(false);
    const [existmp_flag, setMyntraPartnerFlag] = useState(false);
    const [image_flag, setImageFlag] = useState(false);
    //flag to indcicate file being changed or not changed.
    const [imagechanged, setImageChanged] = useState(false);
    //pattern
    const emailPattern = /(\w)+@(\w)+\.[a-zA-Z]{2,}/;
    const namepat = /[A-Za-z]{2,30}/;
    const mobilepattern = /^[6-9]+[0-9]{9,9}/;

    //flag values
    const [editflag, setEditFlag] = useState(false);
    const [createflag, setCreateFlag] = useState(true);
    const [loader, setLoader] = useState(true);
    const [inccnt, setIncCnt] = useState(0);
    useEffect(() => {
        function pwd2() {
            if (disab1 === true)
                setDisable2(true);//once saved , allow to go for next page}
        }
        async function pwd3() {
            if (primarymail_flag === true && boname_flag === true && bomobile_flag === true && bomail_flag === true && existmp_flag === true
                && image_flag === true) {
                await setDisable1(true);
                setDisable1(false);
            }
            else
                setDisable1(true)
        }
        pwd2();
        pwd3();
    }, [disab1, primarymail_flag, boname_flag, bomobile_flag, bomail_flag, existmp_flag, image_flag])
    useEffect(() => {
        async function pwd1() {
            setOrgMail(props.email);
            setPrimaryName(props.firstname + " " + props.lastname)
            setPrimaryPhone(props.mob);
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/basic_contact_email?email=${props.email}`)
                .then((data) => {
                    if (data.data.primary_contact_email != undefined) {
                        setPrimaryEmail(data.data.primary_contact_email)
                        setBoName(data.data.bo_name);
                        setBoMobile(data.data.bo_number);
                        setBoMail(data.data.bo_mail);
                        setMyntra_Partner(data.data.exist_partner);
                        setDisplayImage(`data:image/png;base64,${data.data.signature}`)
                        setCreateFlag(false);
                        setImageFlag(true);
                    }
                    setLoader(false);
                })
        }
        pwd1();
    }, [])
    useEffect(() => {
        if (inccnt > 0) {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/delete_signature_logo`)
                .then((data) => { })
        }
    }, [inccnt])
    return (<>
        {loader == true ? <Loader /> : <>
            <ToastContainer className='toastcontainer' />
            <Typography variant='h6' sx={{ marginTop: '20px', marginLeft: '20px', fontSize: '20px', fontWeight: 'bold' }}>Basic Information</Typography>
            <Typography sx={{ marginTop: '20px', marginLeft: '20px' }}>Contact Information</Typography>
            <Box sx={{ display: 'flex', width: '100%', marginTop: '20px', marginLeft: '50px' }}>
                <Typography sx={{ flex: 4, fontSize: '12px', color: 'grey' }}>ORGANIZATION EMAIL ID</Typography>
                <Typography sx={{ flex: 4, fontSize: '12px', color: 'grey' }}>PRIMARY CONTACT'S NAME</Typography>
                <Typography sx={{ flex: 4, fontSize: '12px', color: 'grey' }}>PRIMARY CONTACT'S  PHONE NUMBER</Typography>
                <Typography sx={{ flex: 4, fontSize: '12px', color: 'grey' }}>PRIMARY CONTACT'S  EMAIL ID</Typography>
            </Box>
            {
                editflag === false && createflag === false && <>
                    <Box sx={{ display: 'flex', width: '90%', marginTop: '20px', marginLeft: '50px' }}>
                        <TextField value={orgmail} variant='standard' sx={{ flex: 3 }} />
                        <TextField value={primary_name} variant='standard' sx={{ flex: 3, marginLeft: '140px' }} />
                        <TextField value={primary_phone} variant='standard' sx={{ flex: 3, marginLeft: '140px' }} />
                        <TextField value={primary_mail} variant='standard' sx={{ flex: 3, marginLeft: '140px' }} />
                    </Box>
                    <Box sx={{ display: 'flex', width: '75%', marginTop: '20px', marginLeft: '50px' }}>
                        <Typography sx={{ flex: 4, fontSize: '12px', color: 'grey' }}>BUSSINESS OWNER'S NAME</Typography>
                        <Typography sx={{ flex: 4, fontSize: '12px', color: 'grey' }}>OWNER'S CONTACT NUMBER</Typography>
                        <Typography sx={{ flex: 4, fontSize: '12px', color: 'grey' }}>OWNER'S EMAIL ID</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', width: '75%', marginTop: '20px', marginLeft: '50px', alignItems: 'center' }}>
                        <TextField value={bo_name} variant='standard' sx={{ flex: 3 }} />
                        <TextField value={bo_mobile} variant='standard' sx={{ flex: 3, marginLeft: '10px' }} />
                        <TextField value={bo_mail} variant='standard' sx={{ flex: 3, marginLeft: '19px' }} />
                    </Box>
                    <div style={{ margin: 'auto', marginTop: '30px', width: '95%', borderTop: '1px solid grey', height: '1pt' }} ></div >
                    <Typography sx={{ marginTop: '20px', marginLeft: '20px' }}>Company Information</Typography>
                    <Box sx={{ display: 'flex', width: '75%', marginTop: '20px', marginLeft: '50px' }}>
                        <Typography sx={{ flex: 4, fontSize: '12px', color: 'grey' }}>ARE YOU AN EXISTING MYNTRA PARTNER</Typography>
                        <Typography sx={{ flex: 4, fontSize: '12px', color: 'grey' }}>SIGNATURE</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', width: '75%', marginTop: '20px', marginLeft: '50px', alignItems: 'center' }}>
                        <Select sx={{ width: '27%' }} value={exist_mp} variant='standard'>
                            <MenuItem value='Yes'>Yes</MenuItem>
                            <MenuItem value='No'>No</MenuItem>
                        </Select>
                        <img src={displayimage} style={{ marginLeft: '200px' }} width='150px' height='100px' alt='no image' />
                    </Box >

                    <div style={{ margin: 'auto', marginTop: '30px', width: '95%', borderTop: '1px solid grey', height: '1pt' }} ></div >
                    <span id='basicdetails_error_message' style={{ marginLeft: '40px', color: "red", marginTop: '30px', fontFamily: 'TimesNewRoman', display: 'inline-block' }}></span>
                    <br></br>
                    <Button variant='outlined' sx={{ marginLeft: '940px', marginTop: '20px', color: 'blue', backgroundColor: 'white', border: '1px soldi blue', borderRadius: '10px' }}
                        onClick={() => {
                            setEditFlag(true);
                            setCreateFlag(false);
                        }}
                    >EDIT DETAILS</Button >
                    <Button variant='outlined' sx={{ marginLeft: '20px', marginTop: '20px', color: 'blue', backgroundColor: 'white', border: '1px soldi blue', borderRadius: '10px' }}
                        onClick={() => {
                            axios.put(`${process.env.REACT_APP_BACKEND_URL}/percentage_update`, {
                                vendor_id: props.vendorid,
                                email: orgmail,
                                stepno: '2'
                            })
                                .then((data) => {
                                    if (data.data) {
                                        props.changeStatus(Math.round(Math.random() * 300))
                                    }
                                })

                        }} >NEXT</Button >
                </>
            }
            {(editflag === true || createflag === true) && <>
                <Box sx={{ display: 'flex', width: '90%', marginTop: '20px', marginLeft: '50px' }}>
                    <TextField value={orgmail} variant='standard' sx={{ flex: 3 }} name='orgmail' />
                    <TextField value={primary_name} name='primary_name' variant='standard' sx={{ flex: 3, marginLeft: '140px' }} />
                    <TextField value={primary_phone} name='primary_phone' variant='standard' sx={{ flex: 3, marginLeft: '140px' }} />
                    <TextField value={primary_mail} name='primary_mail' variant='standard' sx={{ flex: 3, marginLeft: '140px' }}
                        onChange={async (e) => {
                            await setPrimaryEmail(e.target.value)
                        }}
                        onBlur={() => {
                            if (emailPattern.test(primary_mail)) {
                                setPrimaryMailFlag(true);
                                document.getElementById('basicdetails_error_message').innerText = ''
                            }
                            else if (emailPattern.test(primary_mail) === false) {
                                setPrimaryMailFlag(false);
                                document.getElementById('basicdetails_error_message').innerText = 'Please Enter Proper Email ID!!';
                            }
                        }} />
                </Box>
                <Box sx={{ display: 'flex', width: '75%', marginTop: '20px', marginLeft: '50px' }}>
                    <Typography sx={{ flex: 4, fontSize: '12px', color: 'grey' }}>BUSSINESS OWNER'S NAME</Typography>
                    <Typography sx={{ flex: 4, fontSize: '12px', color: 'grey' }}>OWNER'S CONTACT NUMBER</Typography>
                    <Typography sx={{ flex: 4, fontSize: '12px', color: 'grey' }}>OWNER'S EMAIL ID</Typography>
                </Box>
                <Box sx={{ display: 'flex', width: '75%', marginTop: '20px', marginLeft: '50px', alignItems: 'center' }}>
                    <TextField value={bo_name} name='bo_name' variant='standard' sx={{ flex: 3 }}
                        onChange={(e) => setBoName(e.target.value)}
                        onBlur={() => {
                            if (namepat.test(bo_name)) {
                                setBoNameFlag(true);
                                document.getElementById('basicdetails_error_message').innerText = ''
                            }
                            else if (namepat.test(primary_mail) === false) {
                                setBoNameFlag(false);
                                document.getElementById('basicdetails_error_message').innerText = 'Please Enter Proper Name!!';
                            }
                        }} />
                    <TextField value={bo_mobile} name='bo_mobile' variant='standard' sx={{ flex: 3, marginLeft: '10px' }}
                        onChange={(e) => setBoMobile(e.target.value)}
                        onBlur={() => {
                            if (mobilepattern.test(bo_mobile)) {
                                setBoMobileFlag(true);
                                document.getElementById('basicdetails_error_message').innerText = ''
                            }
                            else if (mobilepattern.test(bo_mobile) === false) {
                                setBoMobileFlag(false);
                                document.getElementById('basicdetails_error_message').innerText = 'Please Enter Valid Mobile Number!!';
                            }
                        }}
                    />
                    <TextField value={bo_mail} variant='standard' name='bo_mail' sx={{ flex: 3, marginLeft: '19px' }}
                        onChange={(e) => setBoMail(e.target.value)}
                        onBlur={() => {
                            if (emailPattern.test(bo_mail)) {
                                setBoMailFlag(true);
                                document.getElementById('basicdetails_error_message').innerText = ''
                            }
                            else if (emailPattern.test(bo_mail) === false) {
                                setBoMailFlag(false);
                                document.getElementById('basicdetails_error_message').innerText = 'Please Enter Valid Email ID!!';
                            }
                        }} />
                </Box>
                <div style={{ margin: 'auto', marginTop: '30px', width: '95%', borderTop: '1px solid grey', height: '1pt' }} ></div >
                <Typography sx={{ marginTop: '20px', marginLeft: '20px' }}>Company Information</Typography>
                <Box sx={{ display: 'flex', width: '75%', marginTop: '20px', marginLeft: '50px' }}>
                    <Typography sx={{ flex: 4, fontSize: '12px', color: 'grey' }}>ARE YOU AN EXISTING MYNTRA PARTNER</Typography>
                    <Typography sx={{ flex: 4, fontSize: '12px', color: 'grey' }}>SIGNATURE</Typography>
                </Box>
                <Box sx={{ display: 'flex', width: '75%', marginTop: '20px', marginLeft: '50px', alignItems: 'center' }}>
                    <Select sx={{ width: '27%' }} name='exist_mp' value={exist_mp} variant='standard' onChange={(e) => setMyntra_Partner(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'y')
                                setMyntra_Partner('Yes');
                            else if (e.key === 'n')
                                setMyntra_Partner('No');
                            else
                                setMyntra_Partner('');
                        }}
                        onBlur={() => {
                            if (exist_mp.length > 0) {
                                setMyntraPartnerFlag(true);
                                document.getElementById('basicdetails_error_message').innerText = ''
                            }
                            else if (exist_mp.length === 0) {
                                setMyntraPartnerFlag(false);
                                document.getElementById('basicdetails_error_message').innerText = 'Please Select a valid Option!!';
                            }
                        }}>
                        <MenuItem value='Yes'>Yes</MenuItem>
                        <MenuItem value='No'>No</MenuItem>
                    </Select>
                    <TextField type='file' variant='standard' sx={{ flex: 3, marginLeft: '230px' }} name='signature'
                        onChange={async (e) => {
                            if (editflag == true)
                                document.getElementById('displayimage').style.display = await 'none';
                            setFileName(e.target.files[0]);
                            setImageFlag(true);
                            setImageChanged(true);
                        }}
                        onBlur={async () => {
                            async function pwd1() {
                                if (filename == '' || filename == undefined) {
                                    document.getElementById('basicdetails_error_message').innerText = await 'Signature Can\'t be blank!';
                                    setImageFlag(false);
                                }
                                else if (filename != '' || filename != undefined) {
                                    document.getElementById('basicdetails_error_message').innerText = await '';
                                    setImageFlag(true)
                                }
                            }
                            pwd1();
                        }} />
                    {editflag == true && <img id='displayimage' src={displayimage} style={{ marginLeft: '100px' }} width='150px' height='100px' />}
                </Box >
                <div style={{ margin: 'auto', marginTop: '30px', width: '95%', borderTop: '1px solid grey', height: '1pt' }} ></div >
                <span id='basicdetails_error_message' style={{ marginLeft: '40px', color: "red", marginTop: '30px', fontFamily: 'TimesNewRoman', display: 'inline-block' }}></span>
                <br></br>
                {(editflag === true && createflag === false) && <>
                    <Button variant='outlined' sx={{ marginLeft: '940px', marginTop: '20px', color: 'blue', backgroundColor: 'white', border: '1px soldi blue', borderRadius: '10px' }}
                        disabled={disab1}
                        onClick={async () => {
                            function f0() {
                                //if image not changed.
                                if (imagechanged == false) {
                                    // generate file from base64 string
                                    const dataURLtoFile = (dataurl, filename) => {
                                        const arr = dataurl.split(',')
                                        const mime = arr[0].match(/:(.*?);/)[1]
                                        const bstr = atob(arr[1])
                                        let n = bstr.length
                                        const u8arr = new Uint8Array(n)
                                        while (n) {
                                            u8arr[n - 1] = bstr.charCodeAt(n - 1)
                                            n -= 1 // to make eslint happy
                                        }
                                        return new File([u8arr], filename, { type: mime })
                                    }
                                    const file = dataURLtoFile(displayimage, 'basicdet_product.png');
                                    if (file != undefined) {
                                        setFileName(file);
                                    }
                                }
                            }
                            f0();
                            setDisable2(false);
                            if (filename != undefined) {
                                const formData = await new FormData();
                                await formData.append('vendor_id', props.vendorid)
                                await formData.append('email', orgmail);
                                await formData.append('orgmail', orgmail);
                                await formData.append('primary_name', primary_name);
                                await formData.append('primary_phone', primary_phone);
                                await formData.append('primary_mail', primary_mail);
                                await formData.append('bo_name', bo_name);
                                await formData.append('bo_mobile', bo_mobile);
                                await formData.append('bo_mail', bo_mail);
                                await formData.append('exist_mp', exist_mp);
                                await formData.append('signature', filename);
                                const basic = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/basic_contact`, formData, {
                                    headers: {
                                        "Content-Type": 'multipart/form-data'
                                    }
                                })

                                const perce = axios.put(`${process.env.REACT_APP_BACKEND_URL}/percentage_update`, {
                                    vendor_id: props.vendorid,
                                    email: orgmail,
                                    stepno: '2'
                                })
                                await axios.all([basic, perce])
                                    .then(axios.spread(function (basicdet, percedet) {
                                        if (basicdet.data.modifiedCount == 1 && percedet.data.modifiedCount == 1) {
                                            setIncCnt(inccnt => inccnt + 1);
                                        }
                                        else {
                                            setDisable1(true);
                                            toast.error('Error ! Please retry', { autoClose: 3000 })
                                        }
                                    }))

                            }
                        }}>SAVE PROGRESS</Button >
                </>}
                {(createflag === true && editflag === false) && <>
                    <Button variant='outlined' sx={{ marginLeft: '940px', marginTop: '20px', color: 'blue', backgroundColor: 'white', border: '1px soldi blue', borderRadius: '10px' }}
                        disabled={disab1}
                        onClick={async () => {
                            await setDisable2(false);
                            //post data for multer Options
                            const formData = await new FormData();
                            await formData.append('vendor_id', props.vendorid)
                            await formData.append('email', orgmail);
                            await formData.append('orgmail', orgmail);
                            await formData.append('primary_name', primary_name);
                            await formData.append('primary_phone', primary_phone);
                            await formData.append('primary_mail', primary_mail);
                            await formData.append('bo_name', bo_name);
                            await formData.append('bo_mobile', bo_mobile);
                            await formData.append('bo_mail', bo_mail);
                            await formData.append('exist_mp', exist_mp);
                            await formData.append('signature', filename);
                            const basic = axios.post(`${process.env.REACT_APP_BACKEND_URL}/basic_contact`, formData, {
                                headers: {
                                    "Content-Type": 'multipart/form-data'
                                }
                            })
                            const perce = axios.put(`${process.env.REACT_APP_BACKEND_URL}/percentage_update`, {
                                vendor_id: props.vendorid,
                                email: orgmail,
                                stepno: '2'
                            })
                            await axios.all([basic, perce])
                                .then(axios.spread(function (basicdet, percedet) {
                                    if (basicdet.data.vendor_id != undefined && (percedet.data.modifiedCount == 1)) {
                                        setIncCnt(inccnt => inccnt + 1);
                                    }
                                    else {
                                        setDisable1(true);
                                        toast.error('Error Please retry!', { autoTimeout: 3000 })
                                    }
                                }))

                        }}>SAVE PROGRESS</Button >
                </>}
                <Button variant='outlined' sx={{
                    marginLeft: '20px', marginTop: '20px', color: 'white', backgroundColor: 'blue', border: '1px soldi blue', borderRadius: '10px',
                    '&:hover': { color: 'white', backgroundColor: 'blue', border: '1px soldi blue', borderRadius: '10px' }
                }} disabled={disab2}
                    onClick={() => props.changeStatus(Math.round(Math.random() * 400))}>NEXT</Button>
            </>}
            <br></br>
            <br></br>
            <br></br>
        </>}
    </>)
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeStatus: (data) => dispatch(changeVendorStatus(data))
    }
}
export default connect(null, mapDispatchToProps)(Basic_Details);
