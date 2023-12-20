import { Box, Typography, Select, MenuItem, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ReviewPage from './ReviewPage';
import Loader from '../../Loader/Loader';
import ViewOrder from './ViewOrder';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import CancelPage from './CancelPage';
import Refund_History from './Refund_History';

const Orders = (props) => {
    const [loader, setLoader] = useState(true);
    const [status, setStatus] = useState('all')
    const [duration, setDuration] = useState('anytime');
    const [detailsflag, setDetailsFlag] = useState(false);
    const [reviewflag, setReviewFlag] = useState(false);
    const [orderdetails, setOrderDetails] = useState([]);
    //product details
    const [image, setImage] = useState()
    const [description, setDescription] = useState()
    const [size, setSize] = useState()
    const [prod_status, setProductStatus] = useState()
    const [order_date, setOrderDate] = useState()
    const [username, setUserName] = useState()
    const [addr, setAddr] = useState()
    const [town, setTown] = useState()
    const [pincode, setPincode] = useState()
    const [usermobile, setUserMobile] = useState(props.usermobile)
    const [order_price, setOrderPrice] = useState()
    const [order_id, setOrderId] = useState()
    const [user_mailid, setUserMailId] = useState()
    const [product_id, setProductId] = useState()
    const [discount, setDiscount] = useState()
    const [strike_price, setStrikePrice] = useState()
    const [payment_mode, setPaymentMode] = useState()
    const [price, setPrice] = useState();
    const [packed_date, setPackedDate] = useState()
    const [shipped_date, setShippedDate] = useState()
    const [ofd_date, setOfdDate] = useState()
    const [delivered_date, setDeliveredDate] = useState()
    const [cancelled_date, setCancelledDate] = useState();
    const [cancel_orderid, setCancelOrderId] = useState(0);
    const [cancelflag, setCancelFlag] = useState(false);
    const [refund_flag, setRefundFlag] = useState(false);
    //search
    const [searchval, setSearchVal] = useState('');
    //product review details
    const [review_image, setReviewImage] = useState();
    const [pid, setPid] = useState();
    useEffect(() => {
        document.title = 'Orders';
    }, [])
    useEffect(() => {
        if (status != 'all')
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_order?user_id=${props.userid}&status=${status}`)
                .then((data) => {
                    (data.data.length > 0) ? setOrderDetails(data.data.slice()) : setOrderDetails([]);
                    setLoader(false)
                })
        else if (status == 'all' && duration == 'anytime')
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_order?user_id=${props.userid}`)
                .then((data) => {
                    (data.data.length > 0) ? setOrderDetails(data.data.slice()) : setOrderDetails([]);
                    setLoader(false)
                })
    }, [status, duration])
    useEffect(() => {
        if (duration != 'anytime')
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_order?user_id=${props.userid}&date=${duration}`)
                .then((data) => {
                    (data.data.length > 0) ? setOrderDetails(data.data.slice()) : setOrderDetails([]);
                    setLoader(false)
                })
    }, [duration])
    return (<>
        {loader == true ? <Loader /> : <>
            {(detailsflag === false && reviewflag === false && cancelflag == false && refund_flag == false) && <>
                <Box sx={{ display: "flex", alignItems: "center", marginTop: "30px", marginLeft: "20px" }}>
                    <Box sx={{ flex: 3 }}>
                        <Typography sx={{ fontWeight: "bold", fontSize: "20px", color: "darkslategrey" }}>{status} orders</Typography>
                        <Typography  >from {duration}</Typography>
                    </Box>
                    {/* searchicon */}
                    <Box sx={{ flex: 3, marginLeft: "20px" }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', border: '1px solid lightgrey', borderRadius: "5px", backgroundColor: 'rgb(240,240,240)' }}>
                            <SearchIcon sx={{ color: 'black', marginLeft: "10px", flex: 1, cursor: "pointer" }}
                                onClick={() => {
                                    setLoader(true);
                                    if (searchval != undefined && searchval != '') {
                                        if (status != 'all')
                                            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_order?user_id=${props.userid}&status=${status}&search=${searchval}`)
                                                .then((data) => {
                                                    (data.data.length > 0) ? setOrderDetails(data.data.slice()) : setOrderDetails([])
                                                    setLoader(false)
                                                })
                                        else if (status == 'all')
                                            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_order?user_id=${props.userid}&search=${searchval}`)
                                                .then((data) => {
                                                    (data.data.length > 0) ? setOrderDetails(data.data.slice()) : setOrderDetails([])
                                                    setLoader(false)
                                                })
                                    }
                                    else if (searchval == undefined || searchval == '') {
                                        if (status != 'all')
                                            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_order?user_id=${props.userid}&status=${status}`)
                                                .then((data) => {
                                                    (data.data.length > 0) ? setOrderDetails(data.data.slice()) : setOrderDetails([])
                                                    setLoader(false)
                                                })
                                        else if (status == 'all')
                                            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_order?user_id=${props.userid}`)
                                                .then((data) => {
                                                    (data.data.length > 0) ? setOrderDetails(data.data.slice()) : setOrderDetails([])
                                                    setLoader(false)
                                                })
                                    }
                                }} />
                            <TextField variant='outlined' type='text' placeholder='Search in orders ....' sx={{
                                flex: 11,
                                width: '250px', color: 'black', backgroundColor: 'rgb(240,240,240)', marginLeft: '10px',
                                '& fieldset': { border: 'none' }
                            }} value={searchval} onChange={(e) => setSearchVal(e.target.value)} />
                        </Box>
                    </Box>
                    <Select variant='outlined' sx={{ marginLeft: "30px", flex: 3 }} value={status}
                        onChange={(e) => {
                            setLoader(true);
                            setStatus(e.target.value)
                        }}>
                        <MenuItem value='all'>All</MenuItem>
                        <MenuItem value='confirmed'>Confirmed</MenuItem>
                        <MenuItem value='packed'>Packed</MenuItem>
                        <MenuItem value='shipped'>Shipped</MenuItem>
                        <MenuItem value='out for delivery'>Out For Delivery</MenuItem>
                        <MenuItem value='delivered'>Delivered</MenuItem>
                        <MenuItem value='cancelled'>Cancelled</MenuItem>
                    </Select>
                    <Select variant='outlined' sx={{ flex: 3, marginLeft: "30px" }} value={duration}
                        onChange={(e) => {
                            setLoader(true)
                            setDuration(e.target.value)
                        }}>
                        <MenuItem value='anytime'>Anytime</MenuItem>
                        <MenuItem value='30'>Last 30 days</MenuItem>
                        <MenuItem value='180'>Last 6 months </MenuItem>
                        <MenuItem value='365'>Last year</MenuItem>
                    </Select>
                    <Button sx={{
                        color: "white", backgroundColor: "rgb(243, 66, 140)", flex: 3, textTransform: "none", marginLeft: "20px"
                        , '&:hover': { color: "white", backgroundColor: "rgb(243, 66, 140)" }
                    }}
                        disableTouchRipple onClick={() => setRefundFlag(true)}>Refund History</Button>
                </Box>
                {/* order details */}
                {orderdetails.length > 0 && orderdetails.map((li) => {
                    return (<>
                        <Box sx={{ marginTop: "20px", marginLeft: "20px", backgroundColor: "rgb(240,240,240)", padding: "20px" }}>
                            <Box sx={{ backgroundColor: "white", padding: "15px", marginLeft: '20px' }}>
                                {/* heading1 */}
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <img src={`data:image/png;base64,${li.image1}`} width='50px' height='50px' alt='loading' />
                                    <Box sx={{ flex: 7, marginLeft: "20px" }}>
                                        <Typography sx={{ fontWeight: "bold", color: "rgb(40, 175, 157)" }}>{li.order_status}</Typography>
                                        <Typography sx={{ marginTop: "5px" }}>Order Date : {new Date(li.order_date).toLocaleString('hi-EN'.toLocaleUpperCase())}</Typography>
                                    </Box>
                                    {/* delivered status */}
                                    {
                                        li.order_status == 'delivered' &&
                                        <Button sx={{
                                            textTransform: "none", flex: 2, fontSize: "16px", color: "black", border: "1px solid black"
                                            , '&:hover': { backgroundColor: "black", color: "white" }
                                        }} variant='outlined'
                                            disableTouchRipple onClick={() => {
                                                setReviewImage(li.image1);
                                                setPid(li.product_id);
                                                setReviewFlag(true)
                                            }}> Write a Product review</Button>
                                    }
                                    {
                                        (li.order_status == 'confirmed' || li.order_status == 'packed') &&
                                        <Button sx={{
                                            textTransform: "none", flex: 2, fontSize: "16px", color: "black", border: "1px solid black"
                                            , '&:hover': { backgroundColor: "black", color: "white" }
                                        }} variant='outlined'
                                            disableTouchRipple onClick={() => {
                                                setCancelOrderId(li.order_id);
                                                setCancelFlag(true);
                                            }}> Cancel Items</Button>
                                    }
                                </Box>
                                {/* heading 2 */}
                                <Box sx={{
                                    cursor: "pointer", marginTop: "20px", display: "flex", alignItems: "center", backgroundColor: "rgb(240,240,240)", padding: "15px",
                                    '&:hover': { backgroundColor: "rgb(220,220,220)" }
                                }} onClick={() => {
                                    setDetailsFlag(true);
                                    setImage(li.image1);
                                    setDescription(li.description);
                                    setSize(li.size);
                                    setProductStatus(li.order_status);
                                    setOrderDate(li.order_date);
                                    setUserName(li.user_name);
                                    setAddr(li.addr);
                                    setTown(li.town);
                                    setPincode(li.pincode);
                                    setOrderPrice(li.total_amount);
                                    setOrderId(li.order_id);
                                    setUserMailId(li.user_email);
                                    setProductId(li.product_id);
                                    setPrice(li.price);
                                    setDiscount(li.discount);
                                    setPaymentMode(li.payment_mode);
                                    setPackedDate(li.packed_date)
                                    setShippedDate(li.shipped_date);
                                    setOfdDate(li.ofd_date);
                                    setDeliveredDate(li.delivered_date);
                                    setCancelledDate(li.cancelled_date);
                                    setStrikePrice(li.strike_price);
                                }}>
                                    <img src={`data:image/png;base64,${li.image1}`} width='80px' height='90px' style={{ border: "1px solid lightgrey" }} alt='loading' />
                                    <Box sx={{ flex: 10, marginLeft: "40px" }}>
                                        <Typography sx={{ marginTop: "5px" }}>{li.description}</Typography>
                                        <Typography sx={{ marginTop: "5px" }}>Size: {li.size}</Typography>
                                    </Box>
                                    <ChevronRightIcon sx={{ flex: 1, fontSize: "40px", cursor: "pointer", color: "grey" }} />
                                </Box>
                                {/* heading3 */}
                                <Box sx={{ marginTop: "3px", display: "flex", alignItems: "center", backgroundColor: "rgb(240,240,240)", padding: "5px" }}>
                                    <ul>
                                        {li.order_status == 'confirmed' &&
                                            <li style={{ fontWeight: "normal", fontFamily: "verdana" }}>{li.order_status} window closed on {new Date(li.order_date).toLocaleString('hi-EN').toLocaleUpperCase()}</li>
                                        }
                                        {li.order_status == 'packed' &&
                                            <li style={{ fontWeight: "normal", fontFamily: "verdana" }}>{li.order_status} window closed on {new Date(li.packed_date).toLocaleString('hi-EN').toLocaleUpperCase()}</li>
                                        }
                                        {li.order_status == 'shipped' &&
                                            <li style={{ fontWeight: "normal", fontFamily: "verdana" }}>{li.order_status} window closed on {new Date(li.shipped_date).toLocaleString('hi-EN').toLocaleUpperCase()}</li>
                                        }
                                        {li.order_status == 'out for delivery' &&
                                            <li style={{ fontWeight: "normal", fontFamily: "verdana" }}>{li.order_status} window closed on {new Date(li.ofd_date).toLocaleString('hi-EN').toLocaleUpperCase()}</li>
                                        }
                                        {li.order_status == 'delivered' &&
                                            <li style={{ fontWeight: "normal", fontFamily: "verdana" }}>{li.order_status} window closed on {new Date(li.delivered_date).toLocaleString('hi-EN').toLocaleUpperCase()}</li>
                                        }
                                        {li.order_status == 'cancelled' &&
                                            <li style={{ fontWeight: "normal", fontFamily: "verdana" }}>{li.order_status} window closed on {new Date(li.cancelled_date).toLocaleString('hi-EN').toLocaleUpperCase()}</li>
                                        }
                                    </ul>
                                </Box>
                            </Box>
                        </Box>
                    </>)
                })}
                {orderdetails.length == 0 &&
                    <Typography variant='h5' sx={{
                        marginLeft: "25%",
                        marginTop: '120px', textAlign: 'center', color: 'purple',
                        fontFamily: 'verdana'
                    }}>No Orders found!!</Typography >}
            </>}
            {/* see details */}
            {(detailsflag === true && reviewflag == false && cancelflag == false && refund_flag == false) && <>
                <ViewOrder image={image} description={description}
                    size={size} prod_status={prod_status} order_date={order_date} username={username}
                    addr={addr} town={town} pincode={pincode} usermobile={usermobile}
                    order_price={order_price} order_id={order_id} user_mailid={user_mailid}
                    product_id={product_id} price={price} discount={discount}
                    payment_mode={payment_mode} packed_date={packed_date}
                    shipped_date={shipped_date} ofd_date={ofd_date}
                    delivered_date={delivered_date} cancelled_date={cancelled_date}
                    strike_price={strike_price} />
            </>}
            {/*review page  details */}
            {(reviewflag === true && detailsflag == false && cancelflag == false && refund_flag == false) && <>
                <ReviewPage userid={props.userid} username={props.username} image={review_image}
                    product_id={pid} />
            </>}
            {/* cancel page details */}
            {(reviewflag === false && detailsflag == false && cancelflag == true && refund_flag == false) && <>
                <CancelPage cancel_orderid={cancel_orderid} userid={props.userid} />
            </>}
            {/* refund history */}
            {(reviewflag === false && detailsflag == false && cancelflag == false && refund_flag == true) && <>
                <Refund_History userid={props.userid} />
            </>}
        </>}
    </>)
}

export default Orders;
