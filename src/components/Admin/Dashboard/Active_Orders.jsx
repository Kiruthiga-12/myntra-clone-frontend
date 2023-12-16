import { Box, Typography, Select, MenuItem, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../../Loader/Loader';
import { connect } from 'react-redux';
import { refreshAdminDashboard } from '../../Redux_Store/Action_Creators';
const Active_Orders = (props) => {
    const [status, setStatus] = useState('');
    const [outerloop, setOuterLoop] = useState([]);
    const [innerloop, setInnerLoop] = useState([]);
    const [loader, setLoader] = useState(true);
    const [iterate, setIterate] = useState(0);
    const [disab, setDisab] = useState(false);

    useEffect(() => {
        const outerloop = axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_unique_order?status=confirmed`);
        const innerloop = axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_order?status=confirmed`);
        axios.all([outerloop, innerloop])
            .then(axios.spread(function (outer, inner) {
                (inner.data.length > 0) ? setInnerLoop(inner.data.slice()) : setInnerLoop([]);
                (outer.data.length > 0) ? setOuterLoop(outer.data.slice()) : setOuterLoop([]);
                setLoader(false);
            }))
    }, [])
    useEffect(() => {
        if (iterate != 0) {
            setLoader(true);
            const outerloop = axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_unique_order?status=confirmed`);
            const innerloop = axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_order?status=confirmed`);
            axios.all([outerloop, innerloop])
                .then(axios.spread(function (outer, inner) {
                    (inner.data.length > 0) ? setInnerLoop(inner.data.slice()) : setInnerLoop([]);
                    (outer.data.length > 0) ? setOuterLoop(outer.data.slice()) : setOuterLoop([]);
                    setLoader(false);
                }))
        }
    }, [iterate])
    useEffect(() => {
        setDisab(false);
        if (outerloop.length > 0) {
            outerloop.map((li) => {
                if (li.count <= 0) {
                    setDisab(true)
                }
            })
        }
    }, [outerloop])
    return (
        <>
            {loader == true ? <Loader /> : <>
                {outerloop.length > 0 && outerloop.map((li, index) => {
                    return (<>
                        <Box sx={{ width: "98%", backgroundColor: 'white', margin: '10px', border: '1px solid grey', borderRadius: '10px' }}>
                            {/* header info */}
                            {/* line1 in header */}
                            <Box sx={{ display: 'flex', alignItems: "center", padding: '15px' }}>
                                <Typography variant='body1' sx={{ flex: 1.5, fontFamily: "poppins", fontWeight: "bold", color: "rgb(70,70,70)" }}>ORDER ID - <span style={{ color: 'rgb(7, 128, 97)' }}>{li.order_id}</span></Typography>
                                <Typography variant='body1' sx={{ flex: 2, fontFamily: "poppins", fontWeight: "bold", color: "rgb(70,70,70)" }}>ORDER PLACED ON  - <span style={{ color: 'black' }}>{new Date(li.order_date).toLocaleString('hi-EN').toLocaleUpperCase()}</span></Typography>
                                <Typography sx={{ textAlign: "right", flex: 2, fontWeight: "bold", fontFamily: 'poppins' }}> Payment - {li.payment_mode}</Typography>
                                <Typography sx={{ textAlign: "right", flex: 2.5, fontWeight: "bold", fontFamily: 'poppins' }}> Order Status - {li.order_status}</Typography>
                                <Select id={`active_${index}_${li.order_id}`} sx={{ marginTop: "5px", flex: 2, marginLeft: "20px" }}
                                    variant='outlined' onChange={(e) => setStatus(e.target.value)}>
                                    <MenuItem value='packed' sx={{ color: 'black', backgroundColor: 'skyblue' }}>Packed</MenuItem>
                                </Select>
                            </Box>
                            {/* line2 in header */}
                            <Box sx={{ display: 'flex', alignItems: "center", padding: '10px' }}>
                                <Typography variant='body1' sx={{ flex: 2, fontFamily: "poppins", fontWeight: "bold", color: "rgb(70,70,70)" }}>Order price - <span style={{ color: 'black' }}> &#8377; {li.total_amount}</span></Typography>
                                <Typography variant='body1' sx={{ flex: 5, color: "black" }}>Use Mail ID- <span style={{ color: 'black', fontFamily: 'TimesNewRoman', fontSize: "18px", marginLeft: '10px' }}>{li.user_email}</span>  </Typography>
                                <Typography variant='body1' sx={{ flex: 5, color: "black" }}>User Address - <span style={{ color: 'black', fontFamily: 'TimesNewRoman', fontSize: "18px", marginLeft: '10px' }}>{li.addr} {li.town} {li.pincode}</span>  </Typography>
                            </Box>
                            {/* line item */}
                            {innerloop.length > 0 && innerloop.map((li1, index1) => {
                                if (li.order_id == li1.order_id)
                                    return (<>
                                        <Box sx={{ backgroundColor: "rgb(220,220,240)", marginTop: "5px" }}>
                                            <Box sx={{ display: 'flex', alignItems: "center", padding: '10px' }}>
                                                <img src={`data:image/png;base64,${li1.image1}`} alt='loading' style={{ width: '50px', height: '50px', borderRadius: "50%", border: '1px solid grey' }} />
                                                <Box sx={{ flex: 10, marginLeft: "20px", }}>
                                                    <Box sx={{ display: "flex", alignItems: "center", marginTop: "5px" }}>
                                                        <Typography variant='body1' sx={{ flex: 3, fontFamily: "verdana", color: "black" }}>{li1.description}</Typography>
                                                        <Typography variant='body1' sx={{ flex: 3, fontFamily: "verdana", color: "black" }}>Product ID: {li1.product_id} </Typography>
                                                        <Typography variant='body1' sx={{ flex: 2, fontFamily: "verdana", color: "black" }}>Discount: {li1.discount}%</Typography>
                                                        <Typography variant='body1' sx={{ flex: 3, fontFamily: "verdana", color: "black" }}>Brand: {li1.brand} </Typography>
                                                        <Typography variant='body1' sx={{ flex: 3, fontFamily: "verdana", color: "black" }}>Strike Price: Rs.{li1.strike_price}  </Typography>
                                                        <Typography variant='body1' sx={{ flex: 1, fontFamily: "verdana", color: "black" }}>Qty:  {li1.qty}</Typography>
                                                        {li.count <= 0 &&
                                                            <Button disableTouchRipple variant='filled' sx={{ fontSize: '15px', padding: '10px', fontWeight: 'bold', color: 'red', backgroundColor: 'transparent', '&:hover': { backgroundColor: 'transparent' } }}
                                                                onClick={async (e) => {
                                                                    alert('One of the Product in the Order is not in Stock, Kindly cancel the order and refund the amount to user for whole order');
                                                                    let confirm = window.confirm(`Kindly click ok to confirm cancellation for Order ID #${li.order_id}`)
                                                                    if (confirm == true) {
                                                                        setLoader(true);
                                                                        axios.patch(`${process.env.REACT_APP_BACKEND_URL}/update_order_status?user_id=${li.user_id}&order_id=${li.order_id}`, {
                                                                            order_status: 'cancelled',
                                                                            orderid: li.order_id,
                                                                            usermail: li.user_email,
                                                                            total_items: li.total_items,
                                                                            username: li.user_name,
                                                                            addr: li.addr,
                                                                            town: li.town,
                                                                            pincode: li.pincode,
                                                                            total_mrp: li.total_mrp,
                                                                            discount: li.discount_amount,
                                                                            conv_fee: li.conv_fee,
                                                                            gift_amt: li.gift_amt,
                                                                            first_order: li.first_order,
                                                                            total_amount: li.total_amount,
                                                                            cancelled_date: new Date()
                                                                        })
                                                                            .then((data) => {
                                                                                setLoader(false)
                                                                                if (data.data.modifiedCount != 0) {
                                                                                    setIterate(iterate => iterate + 1);
                                                                                    props.refreshAdminDashboard(Number(props.refresh_admin_dashboard) + 1);

                                                                                }
                                                                            })
                                                                    }
                                                                }}>ITEM NOT IN STOCK</Button>}
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </>)
                            })}
                            <Button disabled={disab} sx={{ marginBottom: "10px", marginTop: "10px", marginLeft: "80%", padding: '5px 10px', color: 'white', backgroundColor: "rgb(7, 128, 97)", '&:hover': { backgroundColor: "rgb(7, 128, 97)" } }}
                                onClick={() => {
                                    setLoader(true);
                                    axios.patch(`${process.env.REACT_APP_BACKEND_URL}/update_order_status?user_id=${li.user_id}&order_id=${li.order_id}`, {
                                        order_status: status,
                                        orderid: li.order_id,
                                        usermail: li.user_email,
                                        total_items: li.total_items,
                                        username: li.user_name,
                                        addr: li.addr,
                                        town: li.town,
                                        pincode: li.pincode,
                                        total_mrp: li.total_mrp,
                                        discount: li.discount_amount,
                                        conv_fee: li.conv_fee,
                                        gift_amt: li.gift_amt,
                                        first_order: li.first_order,
                                        total_amount: li.total_amount,
                                        packed_date: new Date()
                                    })
                                        .then((data) => {
                                            setLoader(false)
                                            if (data.data.modifiedCount != 0) {
                                                setIterate(iterate => iterate + 1);
                                                props.refreshAdminDashboard(Number(props.refresh_admin_dashboard) + 1);

                                            }
                                        })
                                }}>Submit Status</Button>
                        </Box>
                    </>)
                })}
                {outerloop.length == 0 &&
                    <Typography variant='h5' sx={{
                        marginTop: '150px', marginLeft: "50%", textAlign: 'center', color: 'purple',
                        fontFamily: 'verdana'
                    }}>No Order ID is in active state!!</Typography >}
            </>}
        </>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        refreshAdminDashboard: (data) => dispatch(refreshAdminDashboard(data))
    }
}
const mapStateToProps = (cstate) => {
    return {
        refresh_admin_dashboard: cstate.refresh_admin_dashboard
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Active_Orders);