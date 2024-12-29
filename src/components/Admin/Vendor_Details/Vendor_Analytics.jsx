import { Box, Typography, TextField, MenuItem, Select, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../Loader/Loader';
const Vendor_Analytics = (props) => {
    //storing value 
    const [status, setStatus] = useState('');
    const [reason, setReason] = useState('');
    const [loader, setLoader] = useState(true)
    const [disab, setDisable] = useState(true);
    const [disab2, setDisable2] = useState(true);
    const [disabText, setDisableText] = useState(true);
    //async values
    const [gst, setGst] = useState([]);
    const [basic, setBasicInfo] = useState([]);
    const [warehouse, setWarehouse] = useState([]);
    const [bank, setBank] = useState([]);
    const [brand, setBrand] = useState([]);
    const [declaration, setDeclaration] = useState([]);
    const [email, setEmail] = useState();
    const [aprflag, setAprFlag] = useState(false)
    const vendor_approval = 'You can appprove/ reject or delete vendor details if already approved'
    useEffect(() => {
        const gst = axios.get(`${process.env.REACT_APP_BACKEND_URL}/gst_getdetails_email?vendor_id=${props.vendor_id}`)
        const basiccontact = axios.get(`${process.env.REACT_APP_BACKEND_URL}/basic_contact_email?vendor_id=${props.vendor_id}`)
        const warehouse = axios.get(`${process.env.REACT_APP_BACKEND_URL}/warehouse_email?vendor_id=${props.vendor_id}`)
        const bankdetails = axios.get(`${process.env.REACT_APP_BACKEND_URL}/bankdetails_email?vendor_id=${props.vendor_id}`)
        const brand = axios.get(`${process.env.REACT_APP_BACKEND_URL}/branddetails_email?vendor_id=${props.vendor_id}`)
        const declaration = axios.get(`${process.env.REACT_APP_BACKEND_URL}/declaration_email?vendor_id=${props.vendor_id}`)
        const vendorstatus = axios.get(`${process.env.REACT_APP_BACKEND_URL}/vendor_status_email?vendor_id=${props.vendor_id}`)
        async function pwd1() {
            await axios.all([gst, basiccontact, warehouse, bankdetails, brand, declaration, vendorstatus])
                .then(axios.spread(function (gstdet, contactdet, warehousedet, bankdet, branddet, decldet, statusdet) {
                    setLoader(false);
                    function func1() {
                        if (gstdet.data.length > 0)
                            if (gstdet.data[0].vendor_id != undefined) {
                                setGst(gstdet.data[0])
                                setEmail(gstdet.data[0].email)
                            }
                    }
                    (warehousedet.data.length > 0) ? setWarehouse(warehousedet.data.slice()) : setWarehouse([])

                    function func3() {
                        if (bankdet.data.length > 0)
                            if (bankdet.data[0].vendor_id != undefined) {
                                setBank(bankdet.data[0])
                            }
                    }
                    function func4() {
                        if (decldet.data.length > 0)
                            if (decldet.data[0].vendor_id != undefined) {
                                setDeclaration(decldet.data[0])
                            }
                    }
                    (contactdet.data.vendor_id != undefined) ? setBasicInfo(contactdet.data) : setBasicInfo([]);
                    (branddet.data.length > 0) ? setBrand(branddet.data.slice()) : setBrand([])

                    function func7() {
                        if (statusdet.data)
                            if (statusdet.data.vendor_id != undefined) {
                                setStatus(statusdet.data.data)
                            }
                    }
                    func1()
                    func3()
                    func4()
                    func7()

                }))
        }
        async function pwd2() {
            if (status == 'approved') {
                setDisable2(false);
                document.getElementById('comments_box').style.display = 'none';

            }
            else if (status == 'submitted' || status == 'resubmitted') {
                setDisable2(true)
            }
        }
        pwd1()
        pwd2()
        toast.info('You can appprove/ reject or delete vendor details if already approved', { toastId: 'vendor_approval' })
    }, [])
    useEffect(() => {
        if (status == 'approved') {
            setDisable(true);
            setDisable2(false);
            setDisableText(true);
        }
        else if (status == 'rejected') {
            setDisable(true);
            setDisable2(true);
            setDisableText(true);
        }
    }, [status])
    useEffect(() => {
        if (aprflag == true) {
            setDisableText(false);
        }
    }, [aprflag])
    useEffect(() => {
        if (reason.length > 0 && reason != 'undefined') {
            setDisable1(false)
        }
    }, [reason])
    return (
        <>
            {loader == true ? <Loader /> : <>
                <ToastContainer className='toastcontainer' />
                {/* Contact Details */}
                <Box sx={{
                    marginTop: '20px', marginLeft: '30px', marginRight: '30px', backgroundColor: 'white',
                    padding: '15px 25px', boxShadow: '2px 2px 2px black'
                }}>
                    <Typography sx={{ padding: '1px 20px', fontSize: '20px', fontFamily: 'cursive', color: 'white', backgroundColor: 'purple', width: '150px' }}>Contact Details
                    </Typography>
                    <Typography sx={{ marginTop: '30px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }} >Name : <TextField value={basic.primary_contact_name} variant='standard' sx={{ marginLeft: '40px' }} color='success' /></Typography>
                    <Typography sx={{ marginTop: '20px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }}>Mobile No :  <TextField value={basic.primary_contact_mobile} variant='standard' sx={{ marginLeft: '40px' }} color='success' /></Typography>
                    <Typography sx={{ marginTop: '20px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }}>Email Id :
                        <TextField value={basic.org_mail} variant='standard' sx={{ marginLeft: '40px' }} color='success' /></Typography>
                    <br></br>
                </Box >
                {/* GSt Details */}
                <Box sx={{
                    marginTop: '20px', marginLeft: '30px', marginRight: '30px', backgroundColor: 'white',
                    padding: '15px 25px', boxShadow: '2px 2px 2px black'
                }}>
                    <Typography sx={{ padding: '1px 20px', fontSize: '20px', fontFamily: 'cursive', color: 'white', backgroundColor: 'purple', width: '150px' }}>GST Details
                    </Typography>
                    <Typography sx={{ marginTop: '30px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }} >GSTIn : <TextField value={gst.gstin} variant='standard' sx={{ marginLeft: '40px' }} color='success' /></Typography>
                    <Typography sx={{ marginTop: '20px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }}>Registered Company Name :  <TextField value={gst.reg_comp_name} variant='standard' sx={{ marginLeft: '40px' }} color='success' /></Typography>
                    <Typography sx={{ marginTop: '20px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }}>Registered Address :
                        <TextField value={`${gst.reg_adr} , ${gst.reg_city} , ${gst.reg_state} , ${gst.reg_country} , ${gst.reg_pincode}`} variant='standard' sx={{ marginLeft: '40px', width: '80%' }} color='success' /></Typography>
                    <br></br>
                </Box >
                {/* Basic Information  */}
                <Box sx={{
                    marginTop: '20px', marginLeft: '30px', marginRight: '30px', backgroundColor: 'white',
                    padding: '15px 25px', boxShadow: '2px 2px 2px black'
                }}>
                    <Typography sx={{ padding: '1px 20px', fontSize: '20px', fontFamily: 'cursive', color: 'white', backgroundColor: 'purple', width: '190px' }}>Basic Information
                    </Typography>
                    <Typography sx={{ marginTop: '30px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }} >Primary Contact Email Id : <TextField value={basic.primary_contact_email} variant='standard' sx={{ marginLeft: '40px' }} color='success' /></Typography>
                    <Typography sx={{ marginTop: '20px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }}>Business Owner Name :  <TextField value={basic.bo_name} variant='standard' sx={{ marginLeft: '40px' }} color='success' /></Typography>
                    <Typography sx={{ marginTop: '20px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }}> Owner Contact :
                        <TextField value={basic.bo_number} variant='standard' sx={{ marginLeft: '40px' }} color='success' /></Typography>
                    <Typography sx={{ marginTop: '30px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }} >Owner Email Id : <TextField value={basic.bo_mail} variant='standard' sx={{ marginLeft: '40px' }} color='success' /></Typography>
                    <Typography sx={{ marginTop: '20px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }}>Existing Myntra partner :  <TextField value={basic.exist_partner} variant='standard' sx={{ marginLeft: '40px' }} color='success' /></Typography>
                    <Typography sx={{ marginTop: '20px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }}>Signature : <br></br>
                        <img src={`data:image/png;base64,${basic.signature}`} width='150px' height='100px' /></Typography>
                    <br></br>
                </Box >
                {/* Warehouse Details */}
                <Box sx={{
                    marginTop: '20px', marginLeft: '30px', marginRight: '30px', backgroundColor: 'white',
                    padding: '15px 25px', boxShadow: '2px 2px 2px black'
                }}>
                    <Typography sx={{ padding: '1px 20px', fontSize: '20px', fontFamily: 'cursive', color: 'white', backgroundColor: 'purple', width: '190px' }}>Warehouse Details
                    </Typography>
                    {
                        warehouse.length > 0 && <>
                            {
                                warehouse.map((li) => {
                                    return (
                                        <>
                                            <Typography sx={{ fontSize: '20px', fontFamily: 'cursive', textDecoration: 'underline', marginTop: '20px' }}>Warehouse {li.warehouse_no}
                                            </Typography>
                                            <Typography sx={{ marginTop: '30px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }} >Organization Email Id : <TextField value={li.org_mailid} variant='standard' sx={{ marginLeft: '40px' }} color='success' /></Typography>
                                            <Typography sx={{ marginTop: '20px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }}>Full Address :  <TextField value={`${li.wh_address} ${li.wh_city} ${li.wh_state} ${li.wh_country}`} variant='standard' sx={{ marginLeft: '40px' }} color='success' /></Typography>
                                            <Typography sx={{ marginTop: '20px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }}> Operating Start Time :
                                                <TextField value={li.start_time} variant='standard' sx={{ marginLeft: '40px' }} color='success' /></Typography>
                                            <Typography sx={{ marginTop: '30px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }} >Operating End Time : <TextField value={li.end_time} variant='standard' sx={{ marginLeft: '40px' }} color='success' /></Typography>
                                            <Typography sx={{ marginTop: '20px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }}>Warehouse Email Address :  <TextField value={li.wh_emailid} variant='standard' sx={{ marginLeft: '40px' }} color='success' /></Typography>
                                            <Typography sx={{ marginTop: '20px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }}>Warehouse Contact Number :  <TextField value={li.wh_contactno} variant='standard' sx={{ marginLeft: '40px' }} color='success' /></Typography>
                                            <Typography sx={{ marginTop: '20px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }}>Per Day Order Processing Capacity :  <TextField value={li.perday} variant='standard' sx={{ marginLeft: '40px' }} color='success' /></Typography>
                                            <br></br>
                                        </>
                                    )
                                })
                            }</>
                    }

                </Box >
                {/* Bank Details */}
                < Box sx={{
                    marginTop: '20px', marginLeft: '30px', marginRight: '30px', backgroundColor: 'white',
                    padding: '15px 25px', boxShadow: '2px 2px 2px black'
                }
                }>
                    <Typography sx={{ padding: '1px 20px', fontSize: '20px', fontFamily: 'cursive', color: 'white', backgroundColor: 'purple', width: '190px' }}>Bank Details
                    </Typography>
                    <Typography sx={{ marginTop: '30px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }} >Account Holder's Name : <TextField value={bank.account_name} variant='standard' sx={{ marginLeft: '40px' }} color='success' /></Typography>
                    <Typography sx={{ marginTop: '20px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }}>Account Number :  <TextField value={bank.account_no} variant='standard' sx={{ marginLeft: '40px' }} color='success' /></Typography>
                    <Typography sx={{ marginTop: '30px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }} >IFS Code  : <TextField value={bank.ifsc_code} variant='standard' sx={{ marginLeft: '40px' }} color='success' /></Typography>
                    <Typography sx={{ marginTop: '20px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }}>Bank Name :  <TextField value={bank.bank_name} variant='standard' sx={{ marginLeft: '40px' }} color='success' /></Typography>
                    <Typography sx={{ marginTop: '20px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }}>Account Type :  <TextField value={bank.account_type} variant='standard' sx={{ marginLeft: '40px' }} color='success' /></Typography>
                    <br></br>
                </Box >
                {/* Brand Details */}
                < Box sx={{
                    marginTop: '20px', marginLeft: '30px', marginRight: '30px', backgroundColor: 'white',
                    padding: '15px 25px', boxShadow: '2px 2px 2px black'
                }}>
                    <Typography sx={{ padding: '1px 20px', fontSize: '20px', fontFamily: 'cursive', color: 'white', backgroundColor: 'purple', width: '190px' }}>Brand Details
                    </Typography>
                    {brand.length > 0 &&
                        <>
                            {brand.map((li) => {

                                return (
                                    <>
                                        <Typography sx={{ fontSize: '20px', fontFamily: 'cursive', textDecoration: 'underline', marginTop: '20px' }}>Brand {li.brand_no}
                                        </Typography>
                                        <Typography sx={{ marginTop: '30px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }} >Brand Name : <TextField value={li.brand_name} variant='standard' sx={{ marginLeft: '40px' }} color='success' /></Typography>
                                        <Typography sx={{ marginTop: '20px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }}>Brand Logo : <br>
                                        </br>
                                            <img src={`data:image/png;base64,${li.brand_logo}`} width='150px' height='100px' /></Typography>
                                        <Typography sx={{ marginTop: '20px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }}> nature of Business :
                                            <TextField value={li.nob} variant='standard' sx={{ marginLeft: '40px' }} color='success' /></Typography>
                                        <Typography sx={{ marginTop: '30px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }} >Years of Experience : <TextField value={li.yoe} variant='standard' sx={{ marginLeft: '40px' }} color='success' /></Typography>
                                        <Typography sx={{ marginTop: '20px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }}>Selling on Other Platforms :  <TextField value={li.other_platforms} variant='standard' sx={{ marginLeft: '40px' }} color='success' /></Typography>
                                        <br></br>
                                    </>
                                )
                            })}
                        </>}

                </Box >
                {/* Declaration */}
                < Box sx={{
                    marginTop: '20px', marginLeft: '30px', marginRight: '30px', backgroundColor: 'white',
                    padding: '15px 25px', boxShadow: '2px 2px 2px black'
                }}>
                    <Typography sx={{ padding: '1px 20px', fontSize: '20px', fontFamily: 'cursive', color: 'white', backgroundColor: 'purple', width: '150px' }}>Declaration
                    </Typography>
                    <Typography sx={{ marginTop: '30px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }} >Accepted that Information furnished are true : <TextField value={declaration.accept_tc} variant='standard' sx={{ marginLeft: '40px' }} color='success' /></Typography>
                    <br></br>
                </Box >
                {/* Vendr Status */}
                < Box sx={{
                    marginTop: '20px', marginLeft: '30px', marginRight: '30px', backgroundColor: 'white',
                    padding: '15px 25px', boxShadow: '2px 2px 2px black'
                }}>
                    <Typography sx={{ padding: '1px 20px', fontSize: '20px', fontFamily: 'cursive', color: 'white', backgroundColor: 'purple', width: '150px' }}>Vendor Status
                    </Typography>
                    <Typography sx={{ marginTop: '30px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }} >Status : </Typography>
                    {status == 'approved' &&
                        <Select value={status} variant='standard' sx={{ marginTop: "20px", width: '150px' }}
                            onChange={(e) => setStatus(e.target.value)}>
                            <MenuItem value='approved'>approved</MenuItem>
                        </Select>
                    }
                    {status == 'rejected' &&
                        <Select value={status} variant='standard' sx={{ marginTop: "20px", width: '150px' }}
                            onChange={(e) => setStatus(e.target.value)}>
                            <MenuItem value='rejected'>rejected</MenuItem>
                        </Select>
                    }
                    {(status == 'submitted' || status == 'resubmitted') &&
                        <Select value={status} variant='standard' sx={{ marginTop: "20px", width: '150px' }}
                            onChange={(e) => {
                                setStatus(e.target.value)
                                setAprFlag(true)
                            }
                            }>
                            <MenuItem value='approved'>approved</MenuItem>
                            <MenuItem value='rejected'>rejected</MenuItem>
                        </Select>
                    }
                    <br></br>
                    <textarea style={{ padding: '5px 10px', marginTop: '20px', width: '500px', height: "100px", resize: 'vertical', maxHeight: "150px", outline: "none" }}
                        onChange={(e) => setReason(e.target.value)} placeholder='Please Enter your comments...'
                        value={reason} id='comments_box' disabled={disabText}></textarea>
                    <br></br>
                </Box >
                <br></br>
                <Button sx={{ marginLeft: '30px', padding: '5px 20px', color: "white", backgroundColor: 'blue', '&:hover': { color: 'white', backgroundColor: 'blue' } }}
                    disabled={disab} onClick={async () => {
                        setLoader(true);
                        const adminvendor = axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin_vendor_approval`, {
                            vendor_id: props.vendor_id,
                            admin_id: props.adminid,
                            email: email,
                            status: status,
                            reason: reason
                        })
                        const vendorstatus = axios.put(`${process.env.REACT_APP_BACKEND_URL}/vendor_status`, {
                            vendor_id: props.vendor_id,
                            email: email,
                            status: status
                        })
                        await axios.all([adminvendor, vendorstatus])
                            .then(axios.spread(function (ad_ven_approval, ven_stat) {
                                if ((ven_stat.data.modifiedCount == 1) && (ad_ven_approval.data.vendor_id != undefined)) {
                                    toast.success(`Vendor onboarding  form has been ${status} successfully!`, { autoClose: 3000 })
                                }
                                else {
                                    setDisable(true)
                                    toast.error('Error ! Please retry', { autoClose: 3000 })
                                }
                                setLoader(false);
                            }))


                    }}>Submit</Button >
                <Button sx={{ marginLeft: '30px', padding: '5px 20px', color: "white", backgroundColor: 'blue', '&:hover': { color: 'white', backgroundColor: 'blue' } }}
                    disabled={disab2}
                    onClick={() => {
                        let confirm = window.confirm("Are you sure you want to delete vendor?");
                        if (confirm === true) {
                            let ans_reason = window.prompt("Kindly mention reason for deletion", " ");
                            if (ans_reason.length > 3) {
                                setLoader(true);
                                const vendor_add_det = axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_vendor_add_det?email=${email}`);
                                const gst = axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_vendor_gst?email=${email}`);
                                const cont = axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_vendor_basiccontact?email=${email}`)
                                const warehouse = axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_vendor_warehouse?email=${email}`)
                                const bank = axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_vendor_bank?email=${email}`)
                                const brand = axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_vendor_brand?email=${email}`)
                                const decl = axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_vendor_declaration?email=${email}`)
                                const perc = axios.delete(`${process.env.REACT_APP_BACKEND_URL}/percentage_delete?email=${email}`)
                                const vendor = axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_vendor?email=${email}`)
                                const vendorstatus = axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_vendor_status?email=${email}`)
                                const deladmin = axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_admin_vendor?email=${email}`)
                                const addremoveddb = axios.post(`${process.env.REACT_APP_BACKEND_URL}/removed_vendor`, {
                                    vendor_id: props.vendor_id,
                                    email: email,
                                    status: 'deleted',
                                    reason: ans_reason
                                })

                                axios.all([vendor_add_det, gst, cont, warehouse, bank, brand, decl, perc, vendor, vendorstatus, deladmin, addremoveddb])
                                    .then(axios.spread(function (add_det, gstdet, contdet, warehdet, bankdet, branddet, decldet, percdet, vendordet, vendorstatusdet, deladmindet, adddeldb) {
                                        toast.success('Details deleted successfully!!!');
                                        setLoader(false);
                                    }))
                            }
                        }
                    }}>DELETE</Button >
                <br></br>
                <br></br>
            </>}
        </>
    )
}

export default Vendor_Analytics;
