import { useState, useEffect } from "react";
import Admin_Navbar from "./Admin_Navbar";
import { Box, ListItemButton, Typography, MenuItem, FormControl, InputLabel, dialogClasses } from "@mui/material";
import BarChartIcon from '@mui/icons-material/BarChart';
import AddHomeIcon from '@mui/icons-material/AddHome';
import WomanIcon from '@mui/icons-material/Woman';
import ManIcon from '@mui/icons-material/Man';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import LivingIcon from '@mui/icons-material/Living';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import InventoryIcon from '@mui/icons-material/Inventory';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import Men_Category from './Category/Men_Category';
import Women_Category from './Category/Women_Category';
import Kids_Category from './Category/Kids_Category';
import Living_Category from './Category/Living_Category';
import Beauty_Category from './Category/Beauty_Category';
import Vendor_List from './Vendor_Details/Vendor_List';
import UserList from "./User_Details/UserList";
import Catalogue from "./Catalogue/Catalogue";
import NotesIcon from '@mui/icons-material/Notes';
import Products from "./Products/Products";
import Dashboard from "./Dashboard/Dashboard";
import Add_Product from "./Add_Product/Add_Product";
import ManageProfile from './Add_Product/ManageProfile';
import PaymentIcon from '@mui/icons-material/Payment';
import { connect } from 'react-redux';
import axios from 'axios';
import { getCategory, getSubCategory, getProductCategory, setNavBar, setFooter, adminLogout } from '../Redux_Store/Action_Creators';
import Loader from "../Loader/Loader";
import Orders_Payments from './Vendor_Details/Orders_Payments';
const Admin_Home = (props) => {
    const [currentPanel, setPanelValue] = useState('Dashboard');
    const [adminid, setAdminId] = useState();
    const [image, setImage] = useState();
    const [email, setEmail] = useState('');
    const [loader, setLoader] = useState(true);
    const [msg, setMsg] = useState();
    useEffect(() => {
        props.setNavBar('');
        props.setFooter('')
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_admin_email?email=${props.admin_login}`, {
            headers: {
                'admin_key': localStorage.getItem('admin_key')
            }
        })
            .then((data) => {
                if (data.data.admin_id != undefined) {
                    setAdminId(data.data.admin_id);
                    setImage(`data:image/png;base64,${data.data.admin_profile}`)
                    setEmail(data.data.admin_email);
                }
                else
                    setMsg(data.data.error)
                setLoader(false);
            })
    }, [])
    useEffect(() => {
        setLoader(true)
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_admin_email?email=${props.admin_login}`, {
            headers: {
                'admin_key': localStorage.getItem('admin_key')
            }
        })
            .then((data) => {
                if (data.data.admin_id != undefined) {
                    setAdminId(data.data.admin_id);
                    setImage(`data:image/png;base64,${data.data.admin_profile}`)
                    setEmail(data.data.admin_email);
                }
                else
                    setMsg(data.data.error)
                setLoader(false);
            })
    }, [currentPanel])
    return (
        <>
            {loader == true ? <Loader /> : <>
                {adminid != 0 && msg == undefined && <>
                    <Admin_Navbar adminid={adminid} image={image} email={email} />
                    <Box sx={{ margin: 'auto', display: 'flex', width: '99%', marginTop: '105px', marginLeft: "10px" }}>
                        <Box sx={{ flex: 1.5, backgroundColor: 'rgb(240,240,240)', boxShadow: '2px 2px 2px grey' }}>
                            <ListItemButton href="#Dashboard" disableTouchRipple sx={{
                                '&:focus': { backgroundColor: 'purple', color: 'white' },
                                display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: '20px'
                            }} onClick={(e) => {
                                setPanelValue('Dashboard');
                            }} >
                                <BarChartIcon />
                                <Typography sx={{ marginLeft: '20px', fontWeight: 'bold' }} >Dashboard</Typography>
                            </ListItemButton>
                            <ListItemButton href="#Add_Product" disableTouchRipple sx={{
                                '&:focus': { backgroundColor: 'purple', color: 'white' },
                                display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: '20px'
                            }} onClick={() => {
                                setPanelValue('Add Product');
                            }}>
                                <AddHomeIcon />
                                <Typography sx={{ marginLeft: '20px', fontWeight: 'bold' }}>Add Product</Typography>
                            </ListItemButton>
                            <ListItemButton href="#Men" disableTouchRipple sx={{
                                '&:focus': { backgroundColor: 'purple', color: 'white' },
                                display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: '20px'
                            }} onClick={() => {
                                setPanelValue('Men');
                                props.getCategory('');
                                props.getSubCategory('');
                                props.getProductCategory('');
                            }}>
                                <ManIcon />
                                <Typography sx={{ marginLeft: '20px', fontWeight: 'bold' }}>Men</Typography>
                            </ListItemButton>
                            <ListItemButton href="#Women" disableTouchRipple sx={{
                                '&:focus': { backgroundColor: 'purple', color: 'white' },
                                display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: '20px'
                            }} onClick={() => {
                                setPanelValue('Women');
                                props.getCategory('');
                                props.getSubCategory('');
                                props.getProductCategory('');

                            }}>
                                <WomanIcon />
                                <Typography sx={{ marginLeft: '20px', fontWeight: 'bold' }}>Women</Typography>
                            </ListItemButton>
                            <ListItemButton href="#Kids" disableTouchRipple sx={{
                                '&:focus': { backgroundColor: 'purple', color: 'white' },
                                display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: '20px'
                            }} onClick={() => {
                                setPanelValue('Kids');
                                props.getCategory('');
                                props.getSubCategory('');
                                props.getProductCategory('');

                            }}>
                                <AccessibilityIcon />
                                <Typography sx={{ marginLeft: '20px', fontWeight: 'bold' }}>Kids</Typography>
                            </ListItemButton>
                            <ListItemButton href="#Home_&_Living" disableTouchRipple sx={{
                                '&:focus': { backgroundColor: 'purple', color: 'white' },
                                display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: '20px'
                            }} onClick={() => {
                                setPanelValue('Home & Living');
                                props.getCategory('');
                                props.getSubCategory('');
                                props.getProductCategory('');

                            }}>
                                <LivingIcon />
                                <Typography sx={{ marginLeft: '20px', fontWeight: 'bold' }}>Home & Living</Typography>
                            </ListItemButton>
                            <ListItemButton href="#Beauty" disableTouchRipple sx={{
                                '&:focus': { backgroundColor: 'purple', color: 'white' },
                                display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: '20px'
                            }} onClick={() => {
                                setPanelValue('Beauty');
                                props.getCategory('');
                                props.getSubCategory('');
                                props.getProductCategory('');

                            }}>
                                <TagFacesIcon />
                                <Typography sx={{ marginLeft: '20px', fontWeight: 'bold' }}>Beauty</Typography>
                            </ListItemButton>
                            <ListItemButton href="#Users" disableTouchRipple sx={{
                                '&:focus': { backgroundColor: 'purple', color: 'white' },
                                display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: '20px'
                            }} onClick={() => {
                                setPanelValue('Users');

                            }}>
                                <GroupAddIcon />
                                <Typography sx={{ marginLeft: '20px', fontWeight: 'bold' }}>Users</Typography>
                            </ListItemButton>
                            <ListItemButton href="#Vendors" disableTouchRipple sx={{
                                '&:focus': { backgroundColor: 'purple', color: 'white' },
                                display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: '20px'
                            }} onClick={() => {
                                setPanelValue('Vendors');

                            }}>
                                <SupervisedUserCircleIcon />
                                <Typography sx={{ marginLeft: '20px', fontWeight: 'bold' }}>Vendors</Typography>
                            </ListItemButton>
                            <ListItemButton href="#Products" disableTouchRipple sx={{
                                '&:focus': { backgroundColor: 'purple', color: 'white' },
                                display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: '20px'
                            }} onClick={() => {
                                setPanelValue('Products');
                                props.getCategory('');
                                props.getSubCategory('');
                                props.getProductCategory('');

                            }}>
                                <InventoryIcon />
                                <Typography sx={{ marginLeft: '20px', fontWeight: 'bold' }}>Products</Typography>
                            </ListItemButton>
                            <ListItemButton href="#Orders/Payments" disableTouchRipple sx={{
                                '&:focus': { backgroundColor: 'purple', color: 'white' },
                                display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: '20px'
                            }} onClick={() => {
                                setPanelValue('Orders/Payments');
                            }}>
                                <PaymentIcon />
                                <Typography sx={{ marginLeft: '20px', fontWeight: 'bold' }}>Orders / Payments</Typography>
                            </ListItemButton>
                            <ListItemButton href="#Account" disableTouchRipple sx={{
                                '&:focus': { backgroundColor: 'purple', color: 'white' },
                                display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: '20px'
                            }} onClick={() => {
                                setPanelValue('Account');
                            }}>
                                <AccountCircleIcon />
                                <Typography sx={{ marginLeft: '20px', fontWeight: 'bold' }}>Account</Typography>
                            </ListItemButton>
                            <ListItemButton href="#Catalogue" disableTouchRipple sx={{
                                '&:focus': { backgroundColor: 'purple', color: 'white' },
                                display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: '20px'
                            }} onClick={() => {
                                setPanelValue('Catalogue');

                            }}>
                                <NotesIcon />
                                <Typography sx={{ marginLeft: '20px', fontWeight: 'bold' }}>Catalogue</Typography>
                            </ListItemButton>
                            <ListItemButton disableTouchRipple sx={{
                                '&:focus': { backgroundColor: 'purple', color: 'white' },
                                display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: '20px'
                            }} component={Link} to='/admin/login'
                                onClick={() => {
                                    props.adminLogout();
                                    localStorage.removeItem('admin_key')
                                }}>
                                <LogoutIcon />
                                <Typography sx={{ marginLeft: '20px', fontWeight: 'bold' }}>Logout</Typography>
                            </ListItemButton>
                        </Box>
                        <Box sx={{ backgroundColor: 'rgb(240,240,240)', flex: 10.5, marginLeft: '5px', boxShadow: '2px 2px 2px grey' }}>
                            {currentPanel === 'Dashboard' && <> <Dashboard admin_login={email} /></>}
                            {currentPanel === 'Add Product' && <> <Add_Product admin_login={email} /> </>}
                            {currentPanel === 'Men' && <> <Men_Category adminid={adminid} admin_login={email} /></>}
                            {currentPanel === 'Women' && <><Women_Category adminid={adminid} admin_login={email} /></>}
                            {currentPanel === 'Kids' && <> <Kids_Category adminid={adminid} admin_login={email} /></>}
                            {currentPanel === 'Home & Living' && <> <Living_Category adminid={adminid} admin_login={email} /></>}
                            {currentPanel === 'Beauty' && <> <Beauty_Category adminid={adminid} admin_login={email} /></>}
                            {currentPanel === 'Users' && <> <UserList admin_login={email} /></>}
                            {currentPanel === 'Vendors' && <><Vendor_List adminid={adminid} admin_login={email} /></>}
                            {currentPanel === 'Products' && <><Products adminid={adminid} admin_login={email} /> </>}
                            {currentPanel === 'Orders/Payments' && <><Orders_Payments adminid={adminid} admin_login={email} /> </>}
                            {currentPanel === 'Account' && <> <ManageProfile image={image} admin_login={email} /></>}
                            {currentPanel === 'Catalogue' && <> <Catalogue admin_login={email} /></>}
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
        </>
    )
}
const mapStateToProps = (cstate) => {
    return {
        admin_login: cstate.admin_login
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getCategory: (data) => dispatch(getCategory(data)),
        getSubCategory: (data) => dispatch(getSubCategory(data)),
        getProductCategory: (data) => dispatch(getProductCategory(data)),
        setNavBar: (data) => dispatch(setNavBar(data)),
        setFooter: (data) => dispatch(setFooter(data)),
        adminLogout: () => dispatch(adminLogout())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Admin_Home);