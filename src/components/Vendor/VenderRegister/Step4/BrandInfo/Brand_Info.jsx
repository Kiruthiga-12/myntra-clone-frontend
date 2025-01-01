import { TextField, Typography, Box, Select, MenuItem, Button } from "@mui/material";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { changeVendorStatus } from "../../../../Redux_Store/Action_Creators";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Brand_Info = (props) => {
    //status
    const [disab1, setDisable1] = useState(true);
    const [disab2, setDisable2] = useState(true);
    const [brandname_flag, setBrandNameFlag] = useState(false);
    const [nob_flag, setNOBFlag] = useState(false);
    const [yoe_flag, setYOEFlag] = useState(false);
    const [otherplt_flag, setOtherPlatformFlag] = useState(false);
    const [logoflag, setLogoFlag] = useState(false);

    //storing value
    const [brand_name, setBrandName] = useState('');
    const [filename, setFileName] = useState('');
    const [displayimage, setDisplayImage] = useState();
    const [nob, setNOB] = useState('');
    const [yoe, setYOE] = useState(0);
    const [other_platform, setOtherPlatform] = useState('');
    //pattern
    const namepat = /[A-Za-z]{2,30}/;

    //flags
    const [editflag, setEditFlag] = useState(false);
    const [createflag, setCreateFlag] = useState(true);

    //data there not not there flag.
    const [nodataflag, setNoDataFlag] = useState(false);

    //flag to indcicate file being changed or not changed.
    const [imagechanged, setImageChanged] = useState(false);
    const [inccnt, setIncCnt] = useState(0);

    //useffect
    useEffect(() => {
        async function pwd1() {
            if (brandname_flag === true && nob_flag === true && yoe_flag === true && otherplt_flag === true) {
                await setDisable1(true);
                setDisable1(false);
            }
            else if (brandname_flag === false || nob_flag === false || yoe_flag === false || otherplt_flag === false) {
                setDisable1(true);
            }

        }
        function pwd2() {
            if (disab1 === true)
                setDisable2(true)
        }
        if (editflag === true || createflag === true) {
            pwd1();
            pwd2();
        }
    }, [brandname_flag, nob_flag, yoe_flag, otherplt_flag, logoflag])
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/brand_details?email=${props.email}&brand_no=${props.count}`)
            .then((data) => {
                if (data.data.vendor_id != undefined) {
                    setCreateFlag(false);
                    setBrandName(data.data.brand_name);
                    setNOB(data.data.nob);
                    setYOE(data.data.yoe);
                    setOtherPlatform(data.data.other_platforms);
                    setDisplayImage(`data:image/png;base64,${data.data.brand_logo}`);
                    setBrandNameFlag(false);
                    setNOBFlag(false);
                    setYOEFlag(false);
                    setOtherPlatformFlag(false);
                }
                else {
                    setBrandName('');
                    setNOB('');
                    setYOE('');
                    setOtherPlatform('');
                    setFileName('');
                    setDisable1(true);
                    setDisable2(true);
                    setBrandNameFlag(false);
                    setNOBFlag(false);
                    setYOEFlag(false);
                    setOtherPlatformFlag(false);
                    setNoDataFlag(true);
                }
            })

    }, [props])
    useEffect(() => {
        if (inccnt > 0) {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/delete_brand_logo`)
                .then((data) => { })
        }
    }, [inccnt])
    return (
        <>
            <ToastContainer className='toastcontainer' />
            <Box sx={{ marginTop: '30px', marginLeft: '15px' }} id={props.count}>
                {editflag === false && createflag === false && <>
                    <Typography >Brand Detail {props.count}</Typography>
                    <TextField type='text' value={brand_name} variant='standard' label='Brand Name' sx={{ marginTop: '30px' }}
                    />
                    <br></br>
                    <Typography sx={{ marginTop: '40px', color: 'grey', fontSize: '12px' }}>BRAND LOGO</Typography>
                    {nodataflag == true && <>
                        <TextField type='file' variant='standard' />
                    </>}
                    {nodataflag == false && <>
                        <img src={displayimage} width='130px' height='100px' style={{ marginTop: '20px' }} alt='loading' />
                    </>}
                    <br></br>
                    <Typography sx={{ marginTop: '40px', color: 'grey', fontSize: '12px' }}>NATURE OF BUSINESS</Typography>
                    <Select color='secondary' label='Nature of Business' variant='standard' sx={{ marginTop: '15px', width: '20%' }}
                        value={nob}>
                        <MenuItem value={'Distributor/Reseller'}>Distributor/Reseller</MenuItem>
                        <MenuItem value={'BrandOwner + Manufacturer'}>BrandOwner + Manufacturer</MenuItem>
                        <MenuItem value={'Brand Owner'}>Brand Owner</MenuItem>
                        <MenuItem value={'Exporter / Importer'}>Exporter / Importer</MenuItem>
                        <MenuItem value={'Manufacturer'}>Manufacturer</MenuItem>
                    </Select>
                    <br></br>
                    <TextField type='text' variant='standard' label='Years of Experience' sx={{ marginTop: '30px' }}
                        value={yoe} />
                    <br></br>
                    <Typography sx={{ marginTop: '40px', color: 'grey', fontSize: '12px' }}>DO YOU SELL ON OTHER PLATFORMS?</Typography>
                    <Select color='secondary' variant='standard' sx={{ marginTop: '15px', width: '20%' }}
                        value={other_platform} >
                        <MenuItem value={'Yes'}>Yes</MenuItem>
                        <MenuItem value={'No'}>No</MenuItem>
                    </Select>
                    <br></br>
                    <br></br>
                    <Button variant='outlined' sx={{ marginLeft: '600px', marginTop: '20px', color: 'blue', backgroundColor: 'white', border: '1px soldi blue', borderRadius: '10px' }}
                        onClick={() => {
                            setEditFlag(true);
                            setCreateFlag(false);
                        }}
                    >EDIT DETAILS</Button>
                    <Button variant='outlined' sx={{
                        marginLeft: '20px', marginTop: '20px', color: 'white', backgroundColor: 'blue', border: '1px soldi blue', borderRadius: '10px',
                        '&:hover': { color: 'white', backgroundColor: 'blue', border: '1px soldi blue', borderRadius: '10px' }
                    }} onClick={() => {
                        axios.put(`${process.env.REACT_APP_BACKEND_URL}/percentage_update`, {
                            vendor_id: props.vendorid,
                            email: props.email,
                            stepno: '5'
                        })
                            .then((data) => {
                                if (data.data) {
                                    props.changeStatus(Math.round(Math.random() * 9000))
                                }
                            })
                    }}>NEXT</Button>
                </>}
                {(editflag === true || createflag === true) && <>
                    <Typography >Brand Detail {props.count}</Typography>
                    <TextField type='text' value={brand_name} variant='standard' label='Brand Name' sx={{ marginTop: '30px' }}
                        onChange={(e) => setBrandName(e.target.value)}
                        onBlur={() => {
                            if (namepat.test(brand_name)) {
                                document.getElementById('branddetails_error_message').innerText = '';
                                setBrandNameFlag(true)
                            }
                            else if (namepat.test(brand_name) === false) {
                                document.getElementById('branddetails_error_message').innerText = 'Please Enter a proper name';
                                setBrandNameFlag(false);
                            }
                        }} />
                    <br></br>
                    {(editflag === true && createflag === false && nodataflag == false) && <>
                        <Typography sx={{ marginTop: '30px' }}>Brand Logo</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '3px' }}>
                            <img id='brandlogoimage' src={displayimage} width='120px' height='100px' style={{ marginRight: '30px' }} alt='loading' />
                            <TextField type='file' name='brand_logo' variant='standard'
                                onChange={(e) => {
                                    document.getElementById('brandlogoimage').style.display = 'none';
                                    setFileName(e.target.files[0]);
                                    setImageChanged(true);
                                    if (filename != ' ' && filename != undefined)
                                        setLogoFlag(true)
                                }} />
                        </Box>
                        <br></br>
                    </>}
                    {(editflag === true && createflag === false && nodataflag == true) && <>
                        <TextField type='file' name='brand_logo' variant='standard' label='Brand Logo'
                            sx={{ marginTop: '30px' }}
                            onChange={(e) => {
                                setFileName(e.target.files[0]);
                                if (filename != ' ' && filename != undefined)
                                    setLogoFlag(true)
                            }} />
                        <br></br>
                    </>}
                    {(createflag === true && editflag === false) && <>
                        <TextField type='file' name='brand_logo' variant='standard' label='Brand Logo'
                            sx={{ marginTop: '30px' }}
                            onChange={(e) => {
                                setFileName(e.target.files[0]);
                                if (filename != ' ' && filename != undefined)
                                    setLogoFlag(true)
                            }} />
                        <br></br>
                    </>}
                    <Typography sx={{ marginTop: '40px', color: 'grey', fontSize: '12px' }}>NATURE OF BUSINESS</Typography>
                    <Select color='secondary' label='Nature of Business' variant='standard' sx={{ marginTop: '15px', width: '20%' }}
                        value={nob}
                        onChange={(e) => setNOB(e.target.value)}
                        onBlur={() => {
                            if (nob.length > 0) {
                                document.getElementById('branddetails_error_message').innerText = '';
                                setNOBFlag(true);
                            }
                            else if (nob.length == 0) {
                                document.getElementById('branddetails_error_message').innerText = 'Please Select the Nature of Business';
                                setNOBFlag(false);
                            }
                        }}>
                        <MenuItem value={'Distributor/Reseller'}>Distributor/Reseller</MenuItem>
                        <MenuItem value={'BrandOwner + Manufacturer'}>BrandOwner + Manufacturer</MenuItem>
                        <MenuItem value={'Brand Owner'}>Brand Owner</MenuItem>
                        <MenuItem value={'Exporter / Importer'}>Exporter / Importer</MenuItem>
                        <MenuItem value={'Manufacturer'}>Manufacturer</MenuItem>
                    </Select>
                    <br></br>
                    <TextField type='text' variant='standard' label='Years of Experience' sx={{ marginTop: '30px' }}
                        value={yoe}
                        onChange={(e) => setYOE(e.target.value)}
                        onBlur={() => {
                            if (yoe > 0) {
                                document.getElementById('branddetails_error_message').innerText = '';
                                setYOEFlag(true)
                            }
                            else if (yoe == '0') {
                                document.getElementById('branddetails_error_message').innerText = 'Please Enter years of experence';
                                setYOEFlag(false)
                            }
                        }} />
                    <br></br>
                    <Typography sx={{ marginTop: '40px', color: 'grey', fontSize: '12px' }}>DO YOU SELL ON OTHER PLATFORMS?</Typography>
                    <Select color='secondary' variant='standard' sx={{ marginTop: '15px', width: '20%' }}
                        value={other_platform} onChange={(e) => setOtherPlatform(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'y')
                                setOtherPlatform('Yes');
                            else if (e.key === 'n')
                                setOtherPlatform('No')
                            else
                                setOtherPlatform('')
                        }}
                        onBlur={() => {
                            if (other_platform.length > 0) {
                                document.getElementById('branddetails_error_message').innerText = '';
                                setOtherPlatformFlag(true);
                            }
                            else if (other_platform.length == 0) {
                                document.getElementById('branddetails_error_message').innerText = 'Please Select a valid option';
                                setOtherPlatformFlag(false);
                            }
                        }}>
                        <MenuItem value={'Yes'}>Yes</MenuItem>
                        <MenuItem value={'No'}>No</MenuItem>
                    </Select>
                    <br></br>
                    <span id='branddetails_error_message' style={{ marginLeft: '40px', color: "red", marginTop: '30px', fontFamily: 'TimesNewRoman', display: 'inline-block' }}></span>
                    <br></br>
                    {(createflag === true && editflag === false) && <>
                        <Button variant='outlined' sx={{ marginLeft: '600px', marginTop: '20px', color: 'blue', backgroundColor: 'white', border: '1px soldi blue', borderRadius: '10px' }}
                            disabled={disab1} onClick={(e) => {
                                setDisable2(false);
                                const formData = new FormData();
                                formData.append('vendor_id', props.vendorid);
                                formData.append('email', props.email);
                                formData.append('brand_no', props.count);
                                formData.append('brand_name', brand_name);
                                formData.append('nob', nob);
                                formData.append('yoe', yoe);
                                formData.append('other_platforms', other_platform);
                                formData.append('brand_logo', filename);
                                const brand = axios.post(`${process.env.REACT_APP_BACKEND_URL}/brand_details`, formData, {
                                    headers: {
                                        "Content-Type": 'multipart/form-data'
                                    }
                                })
                                const perce = axios.put(`${process.env.REACT_APP_BACKEND_URL}/percentage_update`, {
                                    vendor_id: props.vendorid,
                                    email: props.email,
                                    stepno: '5'
                                })
                                axios.all([brand, perce])
                                    .then(axios.spread(function (branddet, percedet) {
                                        if (branddet.data.vendor_id != undefined && (percedet.data.modifiedCount == 1)) {
                                            setIncCnt(inccnt => inccnt + 1);
                                        }
                                        else {
                                            setDisable1(true);
                                            toast.error('Error Please retry!', { autoClose: 3000 })
                                        }
                                    }))

                            }}
                        >SAVE PROGRESS</Button>
                    </>}
                    {(editflag === true && createflag === false && nodataflag == false) && <>
                        <Button variant='outlined' sx={{ marginLeft: '600px', marginTop: '20px', color: 'blue', backgroundColor: 'white', border: '1px soldi blue', borderRadius: '10px' }}
                            disabled={disab1} onClick={(e) => {
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
                                        const file = dataURLtoFile(displayimage, 'brandinfo.png');
                                        if (file != undefined) {
                                            setFileName(file);
                                        }
                                    }
                                }
                                f0();
                                setDisable2(false);
                                const formData = new FormData();
                                formData.append('vendor_id', props.vendorid);
                                formData.append('email', props.email);
                                formData.append('brand_no', props.count);
                                formData.append('brand_name', brand_name);
                                formData.append('nob', nob);
                                formData.append('yoe', yoe);
                                formData.append('other_platforms', other_platform);
                                formData.append('brand_logo', filename);
                                const brand = axios.put(`${process.env.REACT_APP_BACKEND_URL}/brand_details`, formData, {
                                    headers: {
                                        "Content-Type": 'multipart/form-data'
                                    }
                                })
                                const perce = axios.put(`${process.env.REACT_APP_BACKEND_URL}/percentage_update`, {
                                    vendor_id: props.vendorid,
                                    email: props.email,
                                    stepno: '5'
                                })
                                axios.all([brand, perce])
                                    .then(axios.spread(function (branddet, percedet) {
                                        if (branddet.data.modifiedCount == 1) {
                                            setIncCnt(inccnt => inccnt + 1);
                                        }
                                        else {
                                            setDisable1(true);
                                            toast.error('Error Please retry!', { autoClose: 3000 })
                                        }
                                    }))
                            }}
                        >SAVE PROGRESS</Button>
                    </>}
                    {/* if no data edit flag and send post request  */}
                    {(editflag === true && createflag === false && nodataflag == true) && <>
                        <Button variant='outlined' sx={{ marginLeft: '600px', marginTop: '20px', color: 'blue', backgroundColor: 'white', border: '1px soldi blue', borderRadius: '10px' }}
                            disabled={disab1} onClick={(e) => {
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
                                        const file = dataURLtoFile(displayimage, 'brandinfo.png');
                                        if (file != undefined) {
                                            setFileName(file);
                                        }
                                    }
                                }
                                f0();
                                setDisable2(false);
                                const formData = new FormData();
                                formData.append('vendor_id', props.vendorid);
                                formData.append('email', props.email);
                                formData.append('brand_no', props.count);
                                formData.append('brand_name', brand_name);
                                formData.append('nob', nob);
                                formData.append('yoe', yoe);
                                formData.append('other_platforms', other_platform);
                                formData.append('brand_logo', filename);
                                const brand = axios.post(`${process.env.REACT_APP_BACKEND_URL}/brand_details`, formData, {
                                    headers: {
                                        "Content-Type": 'multipart/form-data'
                                    }
                                })
                                const perce = axios.put(`${process.env.REACT_APP_BACKEND_URL}/percentage_update`, {
                                    vendor_id: props.vendorid,
                                    email: props.email,
                                    stepno: '5'
                                })
                                axios.all([brand, perce])
                                    .then(axios.spread(function (branddet, percedet) {
                                        if (branddet.data.vendor_id != undefined && (percedet.data.modifiedCount == 1)) {
                                            setIncCnt(inccnt => inccnt + 1);
                                        }
                                        else {
                                            setDisable1(true);
                                            toast.error('Error Please retry!', { autoClose: 3000 })
                                        }
                                    }))
                            }}
                        >SAVE PROGRESS</Button>
                    </>}
                    <Button variant='outlined' sx={{
                        marginLeft: '20px', marginTop: '20px', color: 'white', backgroundColor: 'blue', border: '1px soldi blue', borderRadius: '10px',
                        '&:hover': { color: 'white', backgroundColor: 'blue', border: '1px soldi blue', borderRadius: '10px' }
                    }} disabled={disab2}
                        onClick={() => {
                            props.changeStatus(Math.round(Math.random() * 4000))
                        }}>NEXT</Button>
                </>}
                <br></br>
                <br></br>
            </Box >
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeStatus: (data) => dispatch(changeVendorStatus(data))
    }
}
export default connect(null, mapDispatchToProps)(Brand_Info);
