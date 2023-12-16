import { Button, Typography, FormControl, Box, InputLabel, Select, MenuItem, Switch, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Vendor_Analytics from './Vendor_Analytics';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../Loader/Loader';
const Vendor_List = (props) => {
    const [arr, setArr] = useState([]);//gets all vendor data
    const [vendorarr, setVendorArr] = useState([]);//displays vendor details based on 
    const [vendor_id, setVendorId] = useState(0);
    const [vendorcat, setCategory] = useState('');
    const vendor_data = 'Displays Vendor List!';
    const [searchval, setSearchVal] = useState('');
    //flag 
    const [viewflag, setViewFlag] = useState(false);
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/vendor_details`)
            .then((data) => {
                (data.data.length > 0) ? setArr(data.data.slice()) : setArr([])
                setLoader(false);
            })
        toast.success('Displays Vendor List!', { autoClose: 3000, toastId: 'vendor_data' })
    }, [])
    useEffect(() => {
        setLoader(true)
        if (vendorcat != undefined && vendorcat != '') {
            const allvendor = axios.get(`${process.env.REACT_APP_BACKEND_URL}/vendor_details`);
            const catvendor = axios.get(`${process.env.REACT_APP_BACKEND_URL}/vendordetails_status?status=${vendorcat}`)
            axios.all([allvendor, catvendor])
                .then(axios.spread(function (all, cat) {
                    (all.data.length > 0) ? setArr(all.data.slice()) : setArr([]);
                    (cat.data.length > 0) ? setVendorArr(cat.data.slice()) : setVendorArr([]);
                    setLoader(false);
                }))
        }
    }, [vendorcat])
    return (
        <>
            {loader == true ? <Loader /> : <>
                <ToastContainer className='toastcontainer' />
                {viewflag === false && <><Box sx={{
                    display: 'flex', alignItems: "center", marginTop: '40px', marginLeft: '20px', marginRight:
                        '40px'
                }}>
                    <FormControl sx={{ flex: 5 }}>
                        <InputLabel id='Approval'>Approval Category</InputLabel>
                        <Select labelId='Approval' variant='standard' value={vendorcat}
                            onChange={(e) => {
                                setCategory(e.target.value);
                                setLoader(true);
                            }}>
                            <MenuItem value='approved'> Approved Vendor</MenuItem>
                            <MenuItem value='unapproved'>UnApproved Vendor</MenuItem>
                        </Select>
                    </FormControl>
                    <Box sx={{ flex: 5 }}></Box>
                    <Box sx={{ flex: 4, marginLeft: '150px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', width: '400px', border: '1px solid lightgrey', borderRadius: "5px", backgroundColor: 'rgb(240,240,240)' }}>
                            <SearchIcon sx={{ color: 'black', marginLeft: "10px", flex: 1, cursor: "pointer" }}
                                onClick={() => {
                                    setLoader(true);
                                    axios.get(`${process.env.REACT_APP_BACKEND_URL}/vendor_details?search=${searchval}`)
                                        .then((data) => {
                                            (data.data.length > 0) ? setArr(data.data.slice()) : setArr([])
                                            setLoader(false);
                                        })
                                }} />
                            <TextField variant='outlined' type='text' placeholder='Search for Vendors...' sx={{
                                flex: 11,
                                width: '450px', color: 'black', backgroundColor: 'rgb(240,240,240)', marginLeft: '10px',
                                '& fieldset': { border: 'none' }
                            }} onChange={(e) => setSearchVal(e.target.value)}
                                value={searchval} />
                        </Box>
                    </Box>
                </Box>
                    <Box sx={{ padding: '10px 0px', marginTop: '20px', marginLeft: '6px', backgroundColor: 'purple', width: '99%' }}>
                        <table style={{ width: '100%' }}>
                            <thead>
                                <tr style={{ color: 'white' }}>
                                    <th style={{ width: '3%', textAlign: 'center' }}>ID</th>
                                    <th style={{ width: '15%', textAlign: 'center' }}>VENDER NAME</th>
                                    <th style={{ width: '20%', textAlign: 'center' }}>ADDRESS</th>
                                    <th style={{ width: '15%', textAlign: 'center' }}>PHONE</th>
                                    <th style={{ width: '20%', textAlign: 'center' }}>EMAIL</th>
                                    <th style={{ width: '3%', textAlign: 'center' }}>COMMISSION</th>
                                    <th style={{ width: '10%', textAlign: 'center' }}>REVENUE</th>
                                    <th style={{ width: '10%', textAlign: 'center' }}>STATUS</th>
                                    <th style={{ width: '20%', textAlign: 'center' }}>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* if vendor status not selected  */}
                                {(arr.length > 0) && (vendorarr.length == 0) && (vendorcat == undefined || vendorcat == '') && <>
                                    {arr.map((li, index) => {
                                        return (
                                            <tr style={{ backgroundColor: 'rgb(180,180,180)' }} >
                                                <td style={{ width: '3%', textAlign: 'center', padding: '15px 0px' }} >{li.vendor_id}</td>
                                                <td style={{ width: '15%', textAlign: 'center', padding: '15px 0px' }}>{li.vendor_firstname} {li.vendor_lastname}</td>
                                                <td style={{ width: '20%', textAlign: 'center', padding: '15px 0px' }}>Adddress</td>
                                                <td style={{ width: '15%', textAlign: 'center', padding: '15px 0px' }}>{li.vendor_mobile}</td>
                                                <td style={{ width: '20%', textAlign: 'center', padding: '15px 0px' }}>{li.company_mailid}</td>
                                                <td style={{ width: '2%', textAlign: 'center', padding: '15px 0px' }}>23</td>
                                                <td style={{ width: '15%', textAlign: 'center', padding: '15px 0px' }}>&#8377; 10000</td>
                                                <td style={{ width: '20%', textAlign: 'center', padding: '15px 0px' }}><Switch color='secondary' checked /></td>
                                                <td style={{ width: '20%', textAlign: 'center', padding: '15px 0px' }}>
                                                    <Button sx={{
                                                        textTransform: 'none',
                                                        fontWeight: 'bold', fontFamily: 'cursive',
                                                        fontSize: '18px'
                                                    }} color='secondary'
                                                        onClick={() => {
                                                            setVendorId(li.vendor_id);
                                                            setViewFlag(true)
                                                        }}
                                                    >View</Button></td>
                                            </tr>)
                                    })}
                                </>}
                                {/* displays vendr list based on category */}
                                {(vendorarr.length > 0) && (vendorcat != undefined && vendorcat != '') && (arr.length > 0) && <>
                                    {
                                        vendorarr.map((li1) => {
                                            return (<>{
                                                arr.map((li, index) => {
                                                    if (li1.vendor_id == li.vendor_id)
                                                        return (<>
                                                            <tr style={{ backgroundColor: 'rgb(180,180,180)' }} key={index} >
                                                                <td style={{ width: '3%', textAlign: 'center', padding: '15px 0px' }} >{li.vendor_id}</td>
                                                                <td style={{ width: '15%', textAlign: 'center', padding: '15px 0px' }}>{li.vendor_firstname} {li.vendor_lastname}</td>
                                                                <td style={{ width: '20%', textAlign: 'center', padding: '15px 0px' }}>Adddress</td>
                                                                <td style={{ width: '15%', textAlign: 'center', padding: '15px 0px' }}>{li.vendor_mobile}</td>
                                                                <td style={{ width: '20%', textAlign: 'center', padding: '15px 0px' }}>{li.company_mailid}</td>
                                                                <td style={{ width: '2%', textAlign: 'center', padding: '15px 0px' }}>23</td>
                                                                <td style={{ width: '15%', textAlign: 'center', padding: '15px 0px' }}>&#8377; 10000</td>
                                                                <td style={{ width: '20%', textAlign: 'center', padding: '15px 0px' }}><Switch color='secondary' checked /></td>
                                                                <td style={{ width: '20%', textAlign: 'center', padding: '15px 0px' }}>
                                                                    <Button sx={{
                                                                        textTransform: 'none',
                                                                        fontWeight: 'bold', fontFamily: 'cursive',
                                                                        fontSize: '18px'
                                                                    }} color='secondary'
                                                                        onClick={() => {
                                                                            setVendorId(li.vendor_id);
                                                                            setViewFlag(true)
                                                                        }}
                                                                    >View</Button></td>
                                                            </tr>
                                                        </>)

                                                })
                                            }
                                            </>)
                                        })
                                    }
                                </>}
                            </tbody>
                        </table>
                    </Box >
                </>}
                {
                    (arr.length == 0) || ((vendorcat != undefined && vendorcat != '') && (vendorarr.length == 0)) &&
                    <>
                        < Typography variant='h5' sx={{
                            marginTop: '50px', textAlign: 'center', color: 'purple',
                            fontFamily: 'verdana'
                        }}>No Vendors found!!</Typography >
                    </>
                }
                {viewflag === true && <Vendor_Analytics vendor_id={vendor_id} adminid={props.adminid} />}
            </>}
        </>
    )
}
export default Vendor_List;