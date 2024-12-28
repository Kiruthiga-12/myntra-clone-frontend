import axios from 'axios';
import { Button, Box, Typography, TextField } from '@mui/material';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchIcon from '@mui/icons-material/Search';
import Loader from '../../Loader/Loader';
const Pay_To_User = (props) => {
    const [val, setVal] = useState('');
    const [client_secret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const [total_amount, setTotalAmount] = useState(0);
    const [innerloop, setInnerLoop] = useState([]);
    const [disab, setDisab] = useState(false);
    const [status, setStatus] = useState('');
    const [transaction_id, setTransactionId] = useState('');
    const [loader, setLoader] = useState(true);
    const [disab1, setDisab1] = useState(false)
    const [disab2, setDisab2] = useState(false);
    const [refunddet, setRefundDet] = useState([]);//for single order id
    const [iterate, setIterate] = useState(0);
    const [allrefund, setAllRefund] = useState([]);
    const [searchval, setSearchVal] = useState('');

    useEffect(() => {
        const order = axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_order?order_id=${props.orderid}`);
        const refund = axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_user_refund?order_id=${props.orderid}`);
        axios.all([order, refund])
            .then(axios.spread(function (orderdet, refunddet) {
                (orderdet.data.length > 0) ? setInnerLoop(orderdet.data.slice()) : setInnerLoop([]);
                (refunddet.data.length > 0) ? setRefundDet(refunddet.data.slice()) : setRefundDet([]);
                setLoader(false);
            }))
    }, [])
      useEffect(() => {
        if (innerloop.length > 0) {
            if (innerloop[0].order_status == 'cancelled') {
                setTotalAmount(innerloop[0].total_amount);
            }
        }
    }, [innerloop])
    useEffect(() => {
        if (val == 'pay to user' && total_amount > 0 && refunddet.length == 0) {
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/payment_redirect`, {
                email: props.email,
                total_amount: total_amount,
                name: `admin_${props.adminid}`
            })
                .then((data) => setClientSecret(data.data.clientSecret))
        }
        else if (val == 'user list') {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_user_refund`)
                .then((data) => {
                    (data.data.length > 0) ? setAllRefund(data.data.slice()) : setAllRefund([]);
                    setLoader(false);
                })
        }
    }, [val])
    useEffect(() => {
        if (iterate != 0) {
            setLoader(true);
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_user_refund?order_id=${props.orderid}`)
                .then((data) => {
                    (data.data.length > 0) ? setRefundDet(data.data.slice()) : setRefundDet([]);
                    setLoader(false);
                })
        }
    }, [iterate])
    useEffect(() => {
        if (status == 'succeeded') {
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/add_user_refund`, {
                order_id: innerloop[0].order_id,
                order_status: innerloop[0].order_status,
                user_id: innerloop[0].user_id,
                user_email: innerloop[0].user_email,
                order_date: innerloop[0].order_date,
                cancelled_date: innerloop[0].cancelled_date,
                refund_amount: total_amount,
                transaction_id: transaction_id,
                admin_id: props.adminid,
                admin_email: props.email,
                refund_date: new Date()
            }).then((data) => {
                if (data.data.data.user_id != undefined) {
                    toast.success('Payment successful!!', { autoClose: 3000 })
                    setIterate(iterate => iterate + 1)
                }
                else {
                    setDisab(false);
                    toast.error('Payment was not successful , please retry!', { autoClose: 3000 })
                }
            })
        }
    }, [status])
    return (<>
        <ToastContainer />
        {loader == true ? <Loader /> : <>
            <Box sx={{ padding: "20px" }}>
                <Button disabled={disab1} sx={{ textTransform: "none", color: "white", backgroundColor: "rgb(243, 66, 140)", '&:hover': { color: "white", backgroundColor: "rgb(243, 66, 140)" } }}
                    onClick={() => {
                        setVal('pay to user');
                        setDisab1(true);
                        setDisab2(false);
                    }}>Pay To User </Button>
                <Button disabled={disab2} sx={{
                    marginLeft: "40px", textTransform: "none", color: "white"
                    , backgroundColor: "rgb(243, 66, 140)", '&:hover': { color: "white", backgroundColor: "rgb(243, 66, 140)" }
                }} onClick={() => {
                    setVal('user list');
                    setDisab2(true);
                    setDisab1(false);
                    setLoader(true);
                }}>Show Paid  User List </Button>
            </Box>
            {val == 'pay to user' && <>
                {innerloop[0].order_status != 'cancelled' && refunddet.length == 0 &&
                    <Box sx={{ marginTop: "30px", textAlign: "center" }}>Since Order ID  is not cancelled ,order can't be refund.</Box>
                }
                {refunddet.length > 0 &&
                    <Box sx={{ marginTop: "30px", textAlign: "center" }}>Refund already paid for this Order ID.</Box>
                }
                {innerloop[0].order_status == 'cancelled' && refunddet.length == 0 && <>
                    <Box sx={{ padding: '20px', width: '700px' }}>
                        <Typography sx={{ textDecoration: "underline", fontWeight: "bold" }}>Current Order Details</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                            <Typography sx={{ flex: 1.5, fontFamily: 'cursive', fontSize: '18px' }}>Order ID : </Typography>
                            <Typography sx={{ flex: 7, fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }}>{innerloop[0].order_id}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                            <Typography sx={{ flex: 1.5, fontFamily: 'cursive', fontSize: '18px' }}>User ID: </Typography>
                            <Typography sx={{ flex: 7, fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }}>{innerloop[0].user_id}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                            <Typography sx={{ flex: 1.5, fontFamily: 'cursive', fontSize: '18px' }}>User Email: </Typography>
                            <Typography sx={{ flex: 7, fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }}>{innerloop[0].user_email}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                            <Typography sx={{ flex: 1.5, fontFamily: 'cursive', fontSize: '18px' }}>Order Date : </Typography>
                            <Typography sx={{ flex: 7, fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }}>{new Date(innerloop[0].order_date).toLocaleString('hi-EN').toLocaleUpperCase()}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                            <Typography sx={{ flex: 2, fontFamily: 'cursive', fontSize: '18px' }}>Order Status : </Typography>
                            <Typography sx={{ flex: 7, fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }}>{innerloop[0].order_status}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                            <Typography sx={{ flex: 2.5, fontFamily: 'cursive', fontSize: '18px' }}>Cancelled Date : </Typography>
                            <Typography sx={{ flex: 7, fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }}>{new Date(innerloop[0].cancelled_date).toLocaleString('hi-EN').toLocaleUpperCase()}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                            <Typography sx={{ flex: 2.5, fontFamily: 'cursive', fontSize: '18px' }}>Refund Amount : </Typography>
                            <Typography sx={{ flex: 7, fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }}>{total_amount}</Typography>
                        </Box>
                        <Box sx={{ marginTop: "40px", width: "250px" }}>
                            <CardElement />
                            <br></br>
                            <Button disabled={disab} disableTouchRipple sx={{
                                padding: "10px", marginTop: "40px", fontSize: '18px', marginLeft: "30px",
                                width: "80%", color: "white", backgroundColor: "rgb(243, 66, 140)", fontWeight: "bold",
                                '&:hover': { color: "white", backgroundColor: "rgb(243, 66, 140)" }
                            }} onClick={(e) => {
                                stripe.confirmCardPayment(client_secret, {
                                    payment_method: {
                                        card: elements.getElement(CardElement)
                                    }
                                })
                                    .then(async (result) => {
                                        if (result.paymentIntent.status == 'succeeded') {
                                            setTransactionId(result.paymentIntent.id)
                                            setStatus(result.paymentIntent.status);
                                            setDisab(true);
                                        }
                                        else if (result.paymentIntent.status != 'succeeded') {
                                            setDisab(false);
                                            toast.error('Payment was not successful , please retry!', { autoClose: 3000 })
                                        }

                                    })
                            }} >PAY NOW</Button >
                        </Box>
                    </Box>
                </>}
            </>}
            {val == 'user list' && <>
                <Box sx={{ padding: '5px' }}>
                    <Box sx={{ display: "flex", alignItems: 'center' }}>
                        <Typography sx={{ marginLeft: "20px", fontWeight: "bold", marginTop: '20px', flex: 6 }}>Paid List</Typography>
                        <Box sx={{ flex: 6, marginRight: "50px" }}>
                            <Box sx={{ width: "400px", display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', border: '1px solid lightgrey', borderRadius: "5px", backgroundColor: 'rgb(240,240,240)' }}>
                                <SearchIcon sx={{ color: 'black', marginLeft: "10px", flex: 1, cursor: "pointer" }}
                                    onClick={() => {
                                        setLoader(true);
                                        if (searchval != '')
                                            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_user_refund?search=${searchval}`)
                                                .then((data) => {
                                                    (data.data.length > 0) ? setAllRefund(data.data.slice()) : setAllRefund([])
                                                    setLoader(false)
                                                })
                                        else
                                            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_user_refund`)
                                                .then((data) => {
                                                    (data.data.length > 0) ? setAllRefund(data.data.slice()) : setAllRefund([])
                                                    setLoader(false);
                                                })

                                    }}
                                />
                                <TextField variant='outlined' type='text' placeholder='Search for Order ....' sx={{
                                    flex: 11,
                                    width: '450px', color: 'black', backgroundColor: 'rgb(240,240,240)', marginLeft: '10px',
                                    '& fieldset': { border: 'none' }
                                }} value={searchval} onChange={(e) => setSearchVal(e.target.value)} />
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{ padding: '10px 0px', marginTop: '20px', marginLeft: '6px', backgroundColor: 'rgb(245, 63, 108)', width: '99%' }}>
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ padding: "10px", width: '5%', textAlign: 'center' }}>Order <br></br>ID</th>
                                    <th style={{ padding: "10px", width: '20%', textAlign: 'center' }}>Order <br></br>Date</th>
                                    <th style={{ padding: "10px", width: '25%', textAlign: 'center' }}>Cancelled <br></br>Date</th>
                                    <th style={{ padding: "10px", width: '10%', textAlign: 'center' }}>User Email</th>
                                    <th style={{ padding: "10px", width: '10%', textAlign: 'center' }}>Refund Amount </th>
                                    <th style={{ padding: "10px", width: '10%', textAlign: 'center' }}>Refund <br></br>Date </th>
                                    <th style={{ padding: "10px", width: '10%', textAlign: 'center' }}>Trans ID</th>
                                    <th style={{ padding: "10px", width: '10%', textAlign: 'center' }}>Admin Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allrefund.length > 0 && allrefund.map((li) => {
                                    return (<>
                                        <tr style={{ backgroundColor: 'rgb(190,190,100)', color: 'black' }} >
                                            <td style={{ padding: "10px", width: '5%', textAlign: 'center' }}>{li.order_id}</td>
                                            <td style={{ padding: "10px", width: '20%', textAlign: 'center' }}>{new Date(li.order_date).toLocaleString()}</td>
                                            <td style={{ padding: "10px", width: '25%', textAlign: 'center' }}>{new Date(li.cancelled_date).toLocaleString()}</td>
                                            <td style={{ padding: "10px", width: '25%', textAlign: 'center' }}>{li.user_email}</td>
                                            <td style={{ padding: "10px", width: '10%', textAlign: 'center' }}>Rs.{li.refund_amount}</td>
                                            <td style={{ padding: "10px", width: '25%', textAlign: 'center' }}>{new Date(li.refund_date).toLocaleString()}</td>
                                            <td style={{ padding: "10px", width: '25%', textAlign: 'center' }}>{li.transaction_id}</td>
                                            <td style={{ padding: "10px", width: '10%', textAlign: 'center' }}>{li.admin_email}</td>
                                        </tr>
                                    </>)
                                })}
                            </tbody>
                        </table>
                    </Box>
                    {allrefund.length == 0 &&
                        <Typography variant='h5' sx={{
                            marginTop: '70px', textAlign: 'center', color: 'rgb(245, 63, 108)',
                            fontFamily: 'verdana'
                        }}>No History found!!</Typography >}
                </Box>
            </>}
        </>}
    </>)
}

export default Pay_To_User;
