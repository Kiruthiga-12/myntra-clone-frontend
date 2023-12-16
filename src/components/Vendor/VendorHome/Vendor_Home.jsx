import Register_Navbar from "../VenderRegister/Register_Navbar";
import { Box, Typography, ListItemButton } from '@mui/material';
import { useEffect, useState } from "react";
import BarChartIcon from '@mui/icons-material/BarChart';
import AddHomeIcon from '@mui/icons-material/AddHome';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShopIcon from '@mui/icons-material/Shop';
import { Link } from 'react-router-dom';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Vendor_Dashboard from "./Vendor_Dashboard";
import Vendor_Products from "./Products/Vendor_Products";
import Vendor_Orders from "./Vendor_Orders";
import Vendor_Payments from "./Vendor_Payments";
import Vendor_AddProducts from "./Vendor_AddProducts";
import Vendor_Wishlist from "./Vendor_Wishlist";
import Vendor_ManageProfile from "./Vendor_ManageProfile";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import { getCategory, getSubCategory, getProductCategory, setNavBar, setFooter, vendorLogout } from '../../Redux_Store/Action_Creators';
import axios from 'axios';
import Loader from '../../Loader/Loader';
const Vendor_Home = (props) => {
    const [currentPanel, setPanelValue] = useState('Dashboard');
    const [status, setStatus] = useState('');
    const [step2, setEnable2] = useState(false);
    const [step3, setEnable3] = useState(false);
    const [step4, setEnable4] = useState(false);
    const [step5, setEnable5] = useState(false);
    const [step6, setEnable6] = useState(false);

    const [vendor_id, setVendorId] = useState(0);
    const [image, setImage] = useState();
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [vendormob, setVendorMob] = useState('');

    const vendor_login = 'Logged In Successfully';
    const error = 'Error Please retry!'
    const [loader, setLoader] = useState(true);
    const [msg, setMsg] = useState();
    useEffect(() => {
        document.title = 'Vendor Dashboard Page';
        document.body.style.backgroundColor = 'white';
        props.setNavBar('');
        props.setFooter('');
        if (props.vendor_login != undefined && props.vendor_login != '') {
            const vendor_status = axios.get(`${process.env.REACT_APP_BACKEND_URL}/vendor_status_email?email=${props.vendor_login}`);
            const vendor_email = axios.get(`${process.env.REACT_APP_BACKEND_URL}/vendor_details?email=${props.vendor_login}`);
            axios.all([vendor_status, vendor_email])
                .then(axios.spread(function (stat, mail) {
                    setStatus(stat.data.data);
                    function f1() {
                        if (stat.data.data !== 'approved') {
                            setEnable2(true);
                            setEnable3(true);
                            setEnable4(true);
                            setEnable5(true);
                            setEnable6(true);
                        }
                        else if (stat.data.data === 'approved') {
                            setEnable2(false);
                            setEnable3(false);
                            setEnable4(false);
                            setEnable5(false);
                            setEnable6(false);
                        }
                    }
                    function f2() {
                        if (mail.data[0].vendor_id != 0) {
                            setVendorId(mail.data[0].vendor_id);
                            setImage(`data:image/png;base64,${mail.data[0].vendor_profile}`);
                            setFirstName(mail.data[0].vendor_firstname)
                            setLastName(mail.data[0].vendor_lastname)
                            setEmail(mail.data[0].company_mailid);
                            setVendorMob(mail.data[0].vendor_mobile)
                        }


                    }
                    f1();
                    f2();
                    setLoader(false);
                }))
        }
        else {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/vendor_detail_email?email=${props.vendor_login}`, {
                headers: {
                    'vendor_key': localStorage.getItem('vendor_key')
                }
            })
                .then((data) => {
                    if (data.data.vendor_id == undefined)
                        setMsg(data.data.error)
                    setLoader(false);
                })
        }
        toast.success('Logged in Successfully', {
            autoClose: 3000,
            toastId: 'vendor_login',
            position: toast.POSITION.TOP_CENTER
        });
    }, [])
    useEffect(() => {
        setLoader(true);
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/vendor_detail_email?email=${props.vendor_login}`, {
            headers: {
                'vendor_key': localStorage.getItem('vendor_key')
            }
        })
            .then((data) => {
                if (data.data.vendor_id == undefined)
                    setMsg(data.data.error)
                setLoader(false);
            })
    }, [currentPanel])
    return (<>
        {loader == true ? <Loader /> : <>
            {vendor_id != 0 && msg == undefined && <>
                <Register_Navbar display='inline-block' vendorid={vendor_id} image={image} firstname={firstname} lastname={lastname}
                    email={email} />
                <ToastContainer />
                <Box sx={{ margin: 'auto', display: 'flex', width: '99%', marginTop: '105px', marginLeft: "10px" }}>
                    <Box sx={{ flex: 1.5, backgroundColor: 'rgb(240,240,240)', boxShadow: '2px 2px 2px grey' }}>
                        <ListItemButton href='#Dashboard' disableTouchRipple sx={{
                            display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: '20px',
                            '&:focus': { backgroundColor: 'rgb(245, 63, 108)', color: 'white' }
                        }} onClick={(e) => {
                            setPanelValue('Dashboard');
                        }} >
                            <BarChartIcon />
                            <Typography sx={{ marginLeft: '20px', fontWeight: 'bold' }} >Dashboard</Typography>
                        </ListItemButton>
                        <ListItemButton href="#Add_Product" disableTouchRipple sx={{
                            '&:focus': { backgroundColor: 'rgb(245, 63, 108)', color: 'white' },
                            display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: '20px'
                        }} onClick={() => {
                            setPanelValue('Add Product');
                        }} disabled={step2}>
                            <AddHomeIcon />
                            <Typography sx={{ marginLeft: '20px', fontWeight: 'bold' }}>Add Product</Typography>
                        </ListItemButton>
                        <ListItemButton href="#Products" disableTouchRipple sx={{
                            '&:focus': { backgroundColor: 'rgb(245, 63, 108)', color: 'white' },
                            display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: '20px'
                        }} onClick={() => {
                            setPanelValue('Products');
                            props.getCategory('');
                            props.getSubCategory('');
                            props.getProductCategory('');
                        }} disabled={step3}>
                            <InventoryIcon />
                            <Typography sx={{ marginLeft: '20px', fontWeight: 'bold' }}>Products</Typography>
                        </ListItemButton>
                        <ListItemButton href="#Orders" disableTouchRipple sx={{
                            '&:focus': { backgroundColor: 'rgb(245, 63, 108)', color: 'white' },
                            display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: '20px'
                        }} onClick={() => {
                            setPanelValue('Orders');
                        }} disabled={step4}>
                            <ShopIcon />
                            <Typography sx={{ marginLeft: '20px', fontWeight: 'bold' }}>Orders</Typography>
                        </ListItemButton>
                        <ListItemButton href='#Payments' disableTouchRipple sx={{
                            '&:focus': { backgroundColor: 'rgb(245, 63, 108)', color: 'white' },
                            display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: '20px'
                        }} onClick={() => {
                            setPanelValue('Payments');
                        }} disabled={step5}>
                            <CreditCardIcon />
                            <Typography sx={{ marginLeft: '20px', fontWeight: 'bold' }}>Payments</Typography>
                        </ListItemButton>
                        <ListItemButton href="#Wishlist" disableTouchRipple sx={{
                            '&:focus': { backgroundColor: 'rgb(245, 63, 108)', color: 'white' },
                            display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: '20px'
                        }} onClick={() => {
                            setPanelValue('Wishlist');
                        }} disabled={step6}>
                            <FavoriteIcon />
                            <Typography sx={{ marginLeft: '20px', fontWeight: 'bold' }}>Wishlist</Typography>
                        </ListItemButton>
                        <ListItemButton href="#Manage_Profile" disableTouchRipple sx={{
                            '&:focus': { backgroundColor: 'rgb(245, 63, 108)', color: 'white' },
                            display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: '20px'
                        }} onClick={() => {
                            setPanelValue('Manage Profile');
                        }}>
                            <AccountCircleIcon />
                            <Typography sx={{ marginLeft: '20px', fontWeight: 'bold' }}>Manage Profile</Typography>
                        </ListItemButton>
                        <ListItemButton disableTouchRipple sx={{
                            '&:focus': { backgroundColor: 'rgb(245, 63, 108)', color: 'white' },
                            display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: '20px'
                        }} component={Link} to='/partnerhome/login' onClick={() => {
                            props.vendorLogout();
                            localStorage.removeItem('vendor_key');
                        }}>
                            <LogoutIcon />
                            <Typography sx={{ marginLeft: '20px', fontWeight: 'bold' }}>Logout</Typography>
                        </ListItemButton>
                    </Box>
                    <Box sx={{ backgroundColor: 'rgb(240,240,240)', flex: 10.5, marginLeft: '5px', boxShadow: '2px 2px 2px grey' }}>
                        {currentPanel === 'Dashboard' && <> <Vendor_Dashboard email={email} status={status} image={image}
                            firstname={firstname} lastname={lastname} /></>}
                        {currentPanel === 'Add Product' && <> <Vendor_AddProducts email={email} /></>}
                        {currentPanel === 'Products' && <> <Vendor_Products email={email} /></>}
                        {currentPanel === 'Orders' && <> <Vendor_Orders email={email} /></>}
                        {currentPanel === 'Payments' && <> <Vendor_Payments email={email} /></>}
                        {currentPanel === 'Wishlist' && <> <Vendor_Wishlist email={email} /></>}
                        {currentPanel === 'Manage Profile' && <> <Vendor_ManageProfile email={email} image={image} mob={vendormob} /></>}
                    </Box>
                </Box >
                <br></br>
                <br></br>
            </>}
            {msg != undefined && <>
                <Typography sx={{ marginTop: "100px", color: "rgb(250, 102, 102)", textAlign: "center", fontWeight: "bold", fontSize: '26px' }}>{msg} !!</Typography>
                <Typography sx={{ marginTop: "10px", color: "blue", textAlign: "center", fontWeight: "bold", fontSize: '16px' }}>Kindly Login !</Typography>
            </>}
        </>}
    </>)
}
const mapStateToProps = (cstate) => {
    return {
        vendor_login: cstate.vendor_login
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getCategory: (data) => dispatch(getCategory(data)),
        getSubCategory: (data) => dispatch(getSubCategory(data)),
        getProductCategory: (data) => dispatch(getProductCategory(data)),
        setNavBar: (data) => dispatch(setNavBar(data)),
        setFooter: (data) => dispatch(setFooter(data)),
        vendorLogout: () => dispatch(vendorLogout())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Vendor_Home);