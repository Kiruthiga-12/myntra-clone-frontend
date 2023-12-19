import { Typography, Box } from "@mui/material";
import PaidIcon from '@mui/icons-material/Paid';
import { useEffect, useState } from 'react';
import Loader from '../../../../Loader/Loader';
import axios from 'axios';
import { setNavBar, setFooter } from '../../../../Redux_Store/Action_Creators';
import { connect } from 'react-redux';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
const SuccessPage = (props) => {
    const [orderdetails, setOrderDetails] = useState([]);
    const [loader, setLoader] = useState(true);
    const [msg, setMsg] = useState();
    useEffect(() => {
        props.setNavBar('navbar');
        props.setFooter('');
        if (props.user.user_id != undefined && props.user.user_id != '')
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_order?user_id=${props.user.user_id}&order_id=${props.order_id}`)
                .then((data) => {
                    (data.data.length > 0) ? setOrderDetails(data.data.slice()) : setOrderDetails([]);
                    setLoader(false)
                })
        else {
            setMsg('Invalid Resource');
            setLoader(false)
        }
    }, [])
    useEffect(() => {
        function f0() {
            axios.patch(`${process.env.REACT_APP_BACKEND_URL}/update_order_status?user_id=${props.user.user_id}&order_id=${props.order_id}`, {
                order_status: 'confirmed'
            })
                .then((data) => { })
        }
        if (orderdetails.length > 0 && orderdetails[0].order_status == 'created')
            f0();
    }, [orderdetails])

    return (<>
        {loader == true ? <Loader /> : <>
            {msg == undefined && <>
                {orderdetails.length > 0 && <>
                    <Box sx={{ marginTop: '6%', textAlign: "center" }}>
                        <Typography sx={{ fontWeight: "bold", fontFamily: 'TimesNewRoman', fontSize: "25px", color: "rgb(243, 66, 140)" }}>Payment Successful<PaidIcon sx={{ marginLeft: "10px", marginTop: "20px", color: "black", fontSize: "30px" }} /></Typography >
                        <Typography sx={{ marginTop: "5px", fontFamily: "TimesNewRoman", fontSize: "20px" }}>Amount paid <span style={{ fontFamily: "TimesNewRoman", fontWeight: "bold", fontSize: "25px" }}>&#8377; {orderdetails[0].total_amount}</span> </Typography>
                    </Box>
                    <hr />
                    <Box sx={{ marginLeft: "50px", marginTop: "15px", padding: "15px" }}>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            {/* left pane */}
                            <Box sx={{ flex: 6 }}>
                                <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>Order Details</Typography>
                                <Typography sx={{ marginTop: "10px" }}>Placed on : {new Date(orderdetails[0].order_date).toLocaleString('hi-EN').toLocaleUpperCase()}</Typography>
                                <Typography sx={{ marginTop: "5px" }}>Order No. {orderdetails[0].order_id}</Typography>
                                <Typography sx={{ marginTop: "5px" }}>Payment Mode : {orderdetails[0].payment_mode}</Typography>
                                <Typography sx={{ marginTop: "5px" }}>Total no.of items : {orderdetails[0].total_items}</Typography>
                                <Typography sx={{ fontWeight: "bold", fontSize: "18px", marginTop: "30px" }}>Items in this order</Typography>
                                <Box sx={{ backgroundColor: 'rgb(230,230,230)', padding: "15px 20px", width: "600px", marginTop: "20px", border: "1px solid grey", borderRadius: "5px" }}>
                                    {orderdetails.length > 0 && orderdetails.map((li) => {
                                        return (<>
                                            <Box sx={{ cursor: 'pointer', marginTop: "10px", backgroundColor: "white", display: "flex", alignItems: 'center' }}>
                                                <img src={`data:image/png;base64,${li.image1}`} width='100px' height='150px' style={{ marginLeft: "10px" }} alt='loading' />
                                                <Box sx={{ flex: 8, marginLeft: "30px" }}>
                                                    <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>{li.brand}</Typography>
                                                    <Typography sx={{ marginTop: "2px" }}>{li.description}</Typography>
                                                    <Box sx={{ display: 'flex', marginTop: "3px" }}>
                                                        <Typography >Size : {li.size}</Typography>
                                                        <Typography sx={{ marginLeft: "10px" }}>|</Typography>
                                                        <Typography sx={{ marginLeft: "10px" }}>Qty : {li.qty}</Typography>
                                                    </Box>
                                                    <Box sx={{ display: 'flex', marginTop: "3px" }}>
                                                        <Typography >&#8377; {li.price}</Typography>
                                                        <Typography sx={{ marginLeft: "10px" }}><del>&#8377; {li.strike_price}</del></Typography>
                                                        <Typography sx={{ marginLeft: "10px" }}>Discount: {li.discount_amount}% off </Typography>
                                                    </Box>
                                                    <Typography sx={{ marginTop: "3px", fontWeight: "bold" }}>Ordered</Typography>
                                                </Box>
                                            </Box>
                                        </>)
                                    })}
                                </Box>
                            </Box>
                            {/* middle pane */}
                            <Box sx={{ flex: 5 }}>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Typography sx={{ fontWeight: "bold" }}>Updates sent to : </Typography>
                                    < MarkEmailReadIcon sx={{ marginLeft: "20px" }} />
                                    <Typography sx={{ marginLeft: "5px" }} >{orderdetails[0].user_email}</Typography>
                                </Box>
                                <Typography sx={{ marginTop: "25px", fontWeight: "bold", fontSize: "18px" }}>Price Details</Typography>
                                <Typography sx={{ marginTop: "5px" }}>Total MRP : {orderdetails[0].total_mrp} </Typography>
                                <Typography sx={{ marginTop: "5px" }}>Discount : {orderdetails[0].discount}-</Typography>
                                <Typography sx={{ marginTop: "5px" }}>Convenience Fee: {orderdetails[0].conv_fee}</Typography>
                                <Typography sx={{ marginTop: "5px" }}>Gift Amount : {orderdetails[0].gift_amt}</Typography>
                                <Typography sx={{ marginTop: "5px" }}>First order : {orderdetails[0].first_order}-</Typography>
                                <Typography sx={{ marginTop: "5px" }}>------------------------------------ </Typography>
                                <Typography sx={{ marginTop: "5px", fontWeight: "bold" }}>Total Amount : {orderdetails[0].total_amount}</Typography>
                                <Typography sx={{ marginTop: "5px" }}>------------------------------------ </Typography>
                            </Box>
                            {/* right pane */}
                            <Box sx={{ flex: 2, fontSize: "18px" }}>
                                <Typography>Deliver To: </Typography>
                                <Typography sx={{ fontWeight: "bold" }}>{orderdetails[0].user_name}</Typography>
                                <Typography sx={{ fontWeight: "bold" }}>{orderdetails[0].addr}</Typography>
                                <Typography sx={{ fontWeight: "bold" }}>{orderdetails[0].town} - {orderdetails[0].pincode}.</Typography>
                            </Box>
                        </Box>
                    </Box >
                </>}
                {orderdetails.length == 0 &&
                    <Typography variant='h5' sx={{
                        marginTop: '50px', textAlign: 'center', color: 'purple',
                        fontFamily: 'verdana'
                    }}>No Orders found!!</Typography >}
            </>}
            {msg != undefined && <>
                <Typography sx={{ marginTop: "150px", color: "rgb(250, 102, 102)", textAlign: "center", fontWeight: "bold", fontSize: '26px' }}>{msg} !!</Typography>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </>}
        </>}
    </>)
}
const mapStateToProps = (cstate) => {
    return {
        user: cstate.user,
        order_id: cstate.order_id
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setNavBar: (data) => dispatch(setNavBar(data)),
        setFooter: (data) => dispatch(setFooter(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SuccessPage);