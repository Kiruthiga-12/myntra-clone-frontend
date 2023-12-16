import { Box, FormControl, Typography, Tab } from "@mui/material"
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Pending_Orders from "./Pending_Orders";
import Active_Orders from './Active_Orders';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../Loader/Loader';
import { connect } from 'react-redux';
const Dashboard = (props) => {

    //data to get total count.
    const [total_users, setUsers] = useState('');
    const [total_vendors, setVendors] = useState('');
    const [total_products, setProducts] = useState('');
    const [no_men, setMenCnt] = useState('');
    const [no_women, setWomenCnt] = useState('');
    const [no_kids, setKidsCnt] = useState('');
    const [no_living, setLivingCnt] = useState('');
    const [no_beauty, setBeautyCnt] = useState('');
    const welcome_msg = 'Logged in succesfully!!';
    const [loader, setLoader] = useState(true);
    const [active_order, setActiveOrder] = useState();
    const [pending_order, setPendingOrder] = useState();
    const [delivered_order, setDeliveredOrder] = useState();
    const [cancelled_order, setCancelledOrder] = useState();
    const [total_amount, setTotalAmount] = useState(0);
    const [tabvalue, setTabValue] = useState('');
    const [admin_id, setAdminId] = useState();
    const [msg, setMsg] = useState();
    useEffect(() => {
        setLoader(true);
        const user_url = axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_user_cnt`);
        const vendor_url = axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_vendor_approvedcnt`);
        const prod_url = axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_prod_cnt`);
        const menprod_url = axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_product_filters_cnt?category=Men`);
        const womenprod_url = axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_product_filters_cnt?category=Women`)
        const kidsprod_url = axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_product_filters_cnt?category=Kids`)
        const livingprod_url = axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_product_filters_cnt?category=Living`)
        const beautyprod_url = axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_product_filters_cnt?category=Beauty`)
        const active_ord = axios.get(`${process.env.REACT_APP_BACKEND_URL}/order_status_cnt?order_status=confirmed`)
        const deliver_ord = axios.get(`${process.env.REACT_APP_BACKEND_URL}/order_status_cnt?order_status=delivered`)
        const cancelled_ord = axios.get(`${process.env.REACT_APP_BACKEND_URL}/order_status_cnt?order_status=cancelled`)
        const pending_ord = axios.get(`${process.env.REACT_APP_BACKEND_URL}/order_status_cnt?pending=pending`)
        const amount_det = axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_total_amount`)
        axios.all([user_url, vendor_url, prod_url, menprod_url, womenprod_url, kidsprod_url, livingprod_url, beautyprod_url, active_ord, deliver_ord, cancelled_ord, pending_ord, amount_det])
            .then(axios.spread(function (users, vendors, products, men, women, kids, living, beauty, active, deliver, cancel, pending, amount) {
                users.data.data > 0 ? setUsers(users.data.data) : setUsers(0)
                vendors.data.data > 0 ? setVendors(vendors.data.data) : setVendors(0)
                products.data.data > 0 ? setProducts(products.data.data) : setProducts(0)
                men.data.data > 0 ? setMenCnt(men.data.data) : setMenCnt(0)
                women.data.data > 0 ? setWomenCnt(women.data.data) : setWomenCnt(0)
                kids.data.data > 0 ? setKidsCnt(kids.data.data) : setKidsCnt(0)
                living.data.data > 0 ? setLivingCnt(living.data.data) : setLivingCnt(0)
                beauty.data.data > 0 ? setBeautyCnt(beauty.data.data) : setBeautyCnt(0)
                active.data.data.length > 0 ? setActiveOrder(active.data.data.length) : setActiveOrder(0);
                deliver.data.data.length > 0 ? setDeliveredOrder(deliver.data.data.length) : setDeliveredOrder(0);
                cancel.data.data.length > 0 ? setCancelledOrder(cancel.data.data.length) : setCancelledOrder(0);
                pending.data.data.length > 0 ? setPendingOrder(pending.data.data.length) : setPendingOrder(0);
                amount.data.data.length > 0 ? setTotalAmount(amount.data.data[0].grandtotal) : setTotalAmount(0);
                setLoader(false);
            }))
        toast.success("Logged in Successfully!!", {
            toastId: 'welcome_msg'
        })
        setTabValue('Active')
    }, [])
    useEffect(() => {
        setLoader(true);
        const active_ord = axios.get(`${process.env.REACT_APP_BACKEND_URL}/order_status_cnt?order_status=confirmed`)
        const deliver_ord = axios.get(`${process.env.REACT_APP_BACKEND_URL}/order_status_cnt?order_status=delivered`)
        const cancelled_ord = axios.get(`${process.env.REACT_APP_BACKEND_URL}/order_status_cnt?order_status=cancelled`)
        const pending_ord = axios.get(`${process.env.REACT_APP_BACKEND_URL}/order_status_cnt?pending=pending`);
        axios.all([active_ord, deliver_ord, cancelled_ord, pending_ord])
            .then(axios.spread(function (active, deliver, cancel, pending) {
                active.data.data.length > 0 ? setActiveOrder(active.data.data.length) : setActiveOrder(0);
                deliver.data.data.length > 0 ? setDeliveredOrder(deliver.data.data.length) : setDeliveredOrder(0);
                cancel.data.data.length > 0 ? setCancelledOrder(cancel.data.data.length) : setCancelledOrder(0);
                pending.data.data.length > 0 ? setPendingOrder(pending.data.data.length) : setPendingOrder(0);
                setLoader(false)
            }))
    }, [props])
    return (
        <>
            {loader == true ? <Loader /> : <>
                {msg == undefined && <>
                    <ToastContainer className='toastcontainer' />
                    <Box sx={{ marginTop: '30px', marginLeft: '20px', maxWidth: '97%', backgroundColor: 'rgb(123,234,190)', display: 'flex', flexWrap: 'wrap', height: '400px' }}>
                        <Box sx={{
                            width: '250px', border: '1px solid grey', borderRadius: '10px', backgroundColor: "rgb(248, 248, 125)", height: '100px', textAlign: "center", margin: '10px', boxShadow: '2px 2px 10px black',
                            animationName: 'ani1', animationDuration: "2s", animationTimingFunction: 'linear', animationIterationCount: 'infinite',
                            '@keyframes ani1': {
                                '0%': {
                                    transform: 'rotate(-10deg)'
                                },
                                '50%': {
                                    transform: 'rotate(10deg)'
                                },
                                '100%': {
                                    transform: 'rotate(0deg)'
                                }
                            }
                        }}>
                            <Typography sx={{ fontSize: '25px', fontFamily: 'TimesNewRoman' }}>Total Sales Amount</Typography>
                            <Typography sx={{ fontSize: '20px', marginTop: '10px', fontFamily: 'cursive' }}>&#8377; {total_amount}</Typography>
                        </Box>
                        <Box sx={{
                            width: '250px', border: '1px solid grey', borderRadius: '10px', backgroundColor: "rgb(169, 247, 169)", height: '100px', textAlign: "center", margin: '10px', boxShadow: '2px 2px 10px black',
                        }}>
                            <Typography sx={{ fontSize: '25px', fontFamily: 'TimesNewRoman' }}>Total Users</Typography>
                            <Typography sx={{ fontSize: '20px', marginTop: '10px', fontFamily: 'cursive' }}> {total_users}</Typography>
                        </Box>
                        <Box sx={{
                            width: '250px', border: '1px solid grey', borderRadius: '10px', backgroundColor: "rgb(179, 179, 243)", height: '100px', textAlign: "center", margin: '10px', boxShadow: '2px 2px 10px black',
                            animationName: 'ani1', animationDuration: "2s", animationTimingFunction: 'linear', animationIterationCount: 'infinite',
                            '@keyframes ani1': {
                                '0%': {
                                    transform: 'rotate(-10deg)'
                                },
                                '50%': {
                                    transform: 'rotate(10deg)'
                                },
                                '100%': {
                                    transform: 'rotate(0deg)'
                                }
                            }
                        }}>
                            <Typography sx={{ fontSize: '25px', fontFamily: 'TimesNewRoman' }}>Total Products</Typography>
                            <Typography sx={{ fontSize: '20px', marginTop: '10px', fontFamily: 'cursive' }}>{total_products}</Typography>
                        </Box>
                        <Box sx={{ width: '250px', border: '1px solid grey', borderRadius: '10px', backgroundColor: "springgreen", height: '100px', textAlign: "center", margin: '10px', boxShadow: '2px 2px 10px black' }}>
                            <Typography sx={{ fontSize: '25px', fontFamily: 'TimesNewRoman' }}>Total Vendors</Typography>
                            <Typography sx={{ fontSize: '20px', marginTop: '10px', fontFamily: 'cursive' }}>{total_vendors}</Typography>
                        </Box>
                        <Box sx={{ width: '250px', border: '1px solid grey', borderRadius: '10px', backgroundColor: "rgb(192, 243, 247)", height: '100px', textAlign: "center", margin: '10px', boxShadow: '2px 2px 10px black' }}>
                            <Typography sx={{ fontSize: '25px', fontFamily: 'TimesNewRoman' }}>Total - Men</Typography>
                            <Typography sx={{ fontSize: '20px', marginTop: '10px', fontFamily: 'cursive' }}>{no_men}</Typography>
                        </Box>
                        <Box sx={{ width: '250px', border: '1px solid grey', borderRadius: '10px', backgroundColor: "rgb(250, 154, 99)", height: '100px', textAlign: "center", margin: '10px', boxShadow: '2px 2px 10px black' }}>
                            <Typography sx={{ fontSize: '25px', fontFamily: 'TimesNewRoman' }}>Total - Women</Typography>
                            <Typography sx={{ fontSize: '20px', marginTop: '10px', fontFamily: 'cursive' }}>{no_women}</Typography>
                        </Box>
                        <Box sx={{ width: '250px', border: '1px solid grey', borderRadius: '10px', backgroundColor: "rgb(206, 173, 206)", height: '100px', textAlign: "center", margin: '10px', boxShadow: '2px 2px 10px black' }}>
                            <Typography sx={{ fontSize: '25px', fontFamily: 'TimesNewRoman' }}>Total - Kids</Typography>
                            <Typography sx={{ fontSize: '20px', marginTop: '10px', fontFamily: 'cursive' }}>{no_kids}</Typography>
                        </Box>
                        <Box sx={{ width: '250px', border: '1px solid grey', borderRadius: '10px', backgroundColor: " lightslategray", height: '100px', textAlign: "center", margin: '10px', boxShadow: '2px 2px 10px black' }}>
                            <Typography sx={{ fontSize: '25px', fontFamily: 'TimesNewRoman' }}>Total - Living Items</Typography>
                            <Typography sx={{ fontSize: '20px', marginTop: '10px', fontFamily: 'cursive' }}>{no_living}</Typography>
                        </Box>
                        <Box sx={{ width: '250px', border: '1px solid grey', borderRadius: '10px', backgroundColor: "lightcoral", height: '100px', textAlign: "center", margin: '10px', boxShadow: '2px 2px 10px black' }}>
                            <Typography sx={{ fontSize: '25px', fontFamily: 'TimesNewRoman' }}>Total - Beauty Items</Typography>
                            <Typography sx={{ fontSize: '20px', marginTop: '10px', fontFamily: 'cursive' }}>{no_beauty}</Typography>
                        </Box>
                        <Box sx={{
                            width: '250px', border: '1px solid grey', borderRadius: '10px', backgroundColor: "rgb(247, 89, 247)", height: '100px', textAlign: "center", margin: '10px', boxShadow: '2px 2px 10px black',
                            animationName: 'ani1', animationDuration: "2s", animationTimingFunction: 'linear', animationIterationCount: 'infinite',
                            '@keyframes ani1': {
                                '0%': {
                                    transform: 'rotate(-10deg)'
                                },
                                '50%': {
                                    transform: 'rotate(10deg)'
                                },
                                '100%': {
                                    transform: 'rotate(0deg)'
                                }
                            }
                        }}>
                            <Typography sx={{ fontSize: '25px', fontFamily: 'TimesNewRoman' }}>Total  Active Orders</Typography>
                            <Typography sx={{ fontSize: '20px', marginTop: '10px', fontFamily: 'cursive' }}>{active_order}</Typography>
                        </Box>
                        <Box sx={{ width: '250px', border: '1px solid grey', borderRadius: '10px', backgroundColor: "rgb(151, 188, 24)", height: '100px', textAlign: "center", margin: '10px', boxShadow: '2px 2px 10px black' }}>
                            <Typography sx={{ fontSize: '25px', fontFamily: 'TimesNewRoman' }}>Total  Pending Orders</Typography>
                            <Typography sx={{ fontSize: '20px', marginTop: '10px', fontFamily: 'cursive' }}>{pending_order}</Typography>
                        </Box>
                        <Box sx={{
                            width: '250px', border: '1px solid grey', borderRadius: '10px', backgroundColor: "rgb(247, 247, 153)", height: '100px', textAlign: "center", margin: '10px', boxShadow: '2px 2px 10px black',
                            animationName: 'ani1', animationDuration: "2s", animationTimingFunction: 'linear', animationIterationCount: 'infinite',
                            '@keyframes ani1': {
                                '0%': {
                                    transform: 'rotate(-10deg)'
                                },
                                '50%': {
                                    transform: 'rotate(10deg)'
                                },
                                '100%': {
                                    transform: 'rotate(0deg)'
                                }
                            }
                        }}>
                            <Typography sx={{ fontSize: '25px', fontFamily: 'TimesNewRoman' }}>Total  Delivered  Orders</Typography>
                            <Typography sx={{ fontSize: '20px', marginTop: '10px', fontFamily: 'cursive' }}>{delivered_order}</Typography>
                        </Box>
                        <Box sx={{ width: '250px', border: '1px solid grey', borderRadius: '10px', backgroundColor: "royalblue", height: '100px', textAlign: "center", margin: '10px', boxShadow: '2px 2px 10px black' }}>
                            <Typography sx={{ fontSize: '25px', fontFamily: 'TimesNewRoman' }}>Total Cancelled Orders</Typography>
                            <Typography sx={{ fontSize: '20px', marginTop: '10px', fontFamily: 'cursive' }}>{cancelled_order}</Typography>
                        </Box>
                    </Box>
                    <Typography sx={{ marginTop: '20px', marginLeft: "40px", fontSize: '20px', fontWeight: "bolder" }} >Order Status</Typography>
                    <TabContext sx={{ marginTop: '20px', marginLeft: "40px" }} value={tabvalue} >
                        <TabList sx={{ color: 'black', marginTop: '10px', marginLeft: "40px" }}
                            onChange={(e, newValue) => setTabValue(newValue)} >
                            <Tab value='Pending' label='Pending' sx={{ color: "black" }}></Tab>
                            <Tab value='Active' label='Active' sx={{ color: "black" }}></Tab>
                        </TabList>
                        <TabPanel value='Pending' sx={{ color: 'black', marginLeft: '20px' }}>
                            <Box sx={{ display: 'flex', width: '95%', marginTop: '5px', flexWrap: 'wrap' }}>
                                <Pending_Orders />
                            </Box>
                        </TabPanel>
                        <TabPanel value='Active' sx={{ color: 'black', marginLeft: '20px' }}>
                            <Box sx={{ display: 'flex', width: '95%', marginTop: '5px', flexWrap: 'wrap' }}>
                                <Active_Orders />
                            </Box></TabPanel>
                    </TabContext >
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
        refresh_admin_dashboard: cstate.refresh_admin_dashboard
    }
}
export default connect(mapStateToProps, null)(Dashboard)