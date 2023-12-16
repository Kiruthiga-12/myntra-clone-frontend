import axios from 'axios';
import { Button, Box, Typography, TextField, Dialog, DialogContent, DialogContentText } from '@mui/material';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchIcon from '@mui/icons-material/Search';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Loader from '../../Loader/Loader';
const Pay_To_Vendor = (props) => {
    const [loader, setLoader] = useState(true);
    const [disab, setDisab] = useState(false);
    const [val, setVal] = useState('');
    const [client_secret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const [disab1, setDisab1] = useState(false)
    const [disab2, setDisab2] = useState(false);
    const [searchval, setSearchVal] = useState('');
    const [order_cnt, setOrderCount] = useState(0);//order with prod cnt
    const [paidcnt, setPaidCnt] = useState(0); //paid cnt;
    const [innerloop, setInnerLoop] = useState([]);
    const [perc, setPerc] = useState(0);
    const [comission_amt, setComissionAmount] = useState(0);
    const [product_id, setProductId] = useState(0);
    const [price, setPrice] = useState(0);
    const [pay_amt, setPayAmt] = useState(0);
    const [iterate, setIterate] = useState(0);
    const [mailid, setMailId] = useState('');
    const [status, setStatus] = useState('');
    const [transaction_id, setTransactionId] = useState('');
    const [viewflag, setViewFlag] = useState(false);
    const [cnt, setCnt] = useState(0);
    const [paydet, setPayDet] = useState([]); // all payment details
    useEffect(() => {
        const order = axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_order?order_id=${props.orderid}`);
        const payment = axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_vendor_payment?order_id=${props.orderid}`);
        axios.all([order, payment])
            .then(axios.spread(function (orderdet, paydet) {
                (orderdet.data.length > 0) ? setInnerLoop(orderdet.data.slice()) : setInnerLoop([]);
                (paydet.data.length > 0) ? setPayDet(paydet.data.slice()) : setPayDet([])
                setLoader(false);
                setOrderCount(orderdet.data.length);
                setPaidCnt(paydet.data.length);
            }))
    }, [])
    useEffect(() => {
        if (val == 'vendor list') {
            setLoader(true);
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_vendor_payment`)
                .then((data) => {
                    (data.data.length > 0) ? setPayDet(data.data.slice()) : setPayDet([]);
                    setLoader(false);
                })
        }
    }, [val])
    useEffect(() => {
        if (perc != 0) {
            setComissionAmount((perc * Number(price)) / 100);
        }
    }, [perc])
    useEffect(() => {
        if (comission_amt != 0) {
            setPayAmt(Number(price) - comission_amt)
        }
    }, [comission_amt])
    useEffect(() => {
        if (iterate != 0) {
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/payment_redirect`, {
                email: props.email,
                total_amount: 10,
                name: `admin_${props.adminid}`
            })
                .then((data) => setClientSecret(data.data.clientSecret))
        }
    }, [iterate])
    useEffect(() => {
        if (status == 'succeeded') {
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/add_vendor_payment`, {
                'order_id': innerloop[0].order_id,
                'order_status': innerloop[0].order_status,
                'vendor_email': mailid,
                'order_date': innerloop[0].order_date,
                'delivered_date': innerloop[0].delivered_date,
                'product_id': product_id,
                'product_price': price,
                'comission': perc,
                'comission_amount': comission_amt,
                'pay_amount': pay_amt,
                'transaction_id': transaction_id,
                'admin_id': props.adminid,
                'admin_email': props.email,
                'paid_date': new Date()
            })
                .then((data) => {
                    if (data.data.data != undefined) {
                        if (data.data.data.vendor_email != undefined) {
                            toast.success('Payment successful!!', { autoClose: 3000 })
                            setCnt(cnt => cnt + 1);
                            setDisab(false);
                        }
                        else {
                            setDisab(false);
                            toast.error('Payment was not successful , please retry!', { autoClose: 3000 })
                        }
                    }
                })
        }
    }, [status])
    useEffect(() => {
        if (cnt != 0) {
            setLoader(true);
            const order = axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_order?order_id=${props.orderid}`);
            const payment = axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_vendor_payment?order_id=${props.orderid}`);
            axios.all([order, payment])
                .then(axios.spread(function (orderdet, paydet) {
                    (orderdet.data.length > 0) ? setInnerLoop(orderdet.data.slice()) : setInnerLoop([]);
                    (paydet.data.length > 0) ? setPayDet(paydet.data.slice()) : setPayDet([])
                    setLoader(false);
                    setOrderCount(orderdet.data.length);
                    setPaidCnt(paydet.data.length);
                }))
        }
    }, [cnt])
    return (<>
        {loader == true ? <Loader /> : <>
            <ToastContainer />
            <Box sx={{ padding: "20px" }}>
                <Button disabled={disab1} sx={{ textTransform: "none", color: "white", backgroundColor: "rgb(243, 66, 140)", '&:hover': { color: "white", backgroundColor: "rgb(243, 66, 140)" } }}
                    onClick={() => {
                        setVal('order details');
                        setDisab1(true);
                        setDisab2(false);
                    }}>Order Details </Button>
                <Button disabled={disab2} sx={{
                    marginLeft: "40px", textTransform: "none", color: "white"
                    , backgroundColor: "rgb(243, 66, 140)", '&:hover': { color: "white", backgroundColor: "rgb(243, 66, 140)" }
                }} onClick={() => {
                    setVal('vendor list');
                    setDisab2(true);
                    setDisab1(false);
                    setLoader(true);
                }}>Show Paid Vendor List </Button>
            </Box>
            {val == 'order details' && <>
                {innerloop[0].order_status != 'delivered' &&
                    <Box sx={{ marginTop: "30px", textAlign: "center" }}>Since Order ID is not delivered, payment can't be done.</Box>
                }
                {order_cnt == paidcnt && order_cnt != 0 &&
                    <Box sx={{ marginTop: "30px", textAlign: "center" }}>Payment already paid for this Order ID.</Box>
                }
                {innerloop[0].order_status == 'delivered' && order_cnt != paidcnt && <>
                    <Box sx={{ padding: '20px', width: '700px' }}>
                        <Typography sx={{ textDecoration: "underline", fontWeight: "bold" }}>Current Order Details</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                            <Typography sx={{ flex: 1.5, fontFamily: 'cursive', fontSize: '18px' }}>Order ID : </Typography>
                            <Typography sx={{ flex: 7, fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }}>{innerloop[0].order_id}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                            <Typography sx={{ flex: 2, fontFamily: 'cursive', fontSize: '18px' }}>Order Status : </Typography>
                            <Typography sx={{ flex: 7, fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }}>{innerloop[0].order_status}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                            <Typography sx={{ flex: 1.5, fontFamily: 'cursive', fontSize: '18px' }}>Order Date : </Typography>
                            <Typography sx={{ flex: 7, fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }}>{new Date(innerloop[0].order_date).toLocaleString('hi-EN')}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                            <Typography sx={{ flex: 2.5, fontFamily: 'cursive', fontSize: '18px' }}>Delivered Date : </Typography>
                            <Typography sx={{ flex: 7, fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }}>{new Date(innerloop[0].delivered_date).toLocaleString('hi-EN')}</Typography>
                        </Box>
                        {/* product details */}
                        <Typography sx={{ textDecoration: "underline", fontWeight: "bold", marginTop: "20px" }}>Product Details</Typography>
                        <Box sx={{ padding: '10px 0px', marginTop: '40px', marginLeft: '6px', backgroundColor: 'rgb(245, 63, 108)' }}>
                            <table>
                                <thead>
                                    <tr>
                                        <th style={{ padding: "10px", width: '25%', textAlign: 'center' }}>Order ID</th>
                                        <th style={{ padding: "10px", width: '25%', textAlign: 'center' }}>Product ID</th>
                                        <th style={{ padding: "10px", width: '25%', textAlign: 'center' }}>Product Price</th>
                                        <th style={{ padding: "10px", width: '25%', textAlign: 'center' }}>Vendor Email</th>
                                        <th style={{ padding: "10px", width: '25%', textAlign: 'center' }}>Pay</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paydet.length > 0 && paidcnt != order_cnt && paydet.map((li1) => {
                                        return (<>
                                            {innerloop.length > 0 && innerloop.map((li) => {
                                                if (li1.order_id == li.order_id && li1.product_id != li.product_id)
                                                    return (<>
                                                        < tr style={{ backgroundColor: 'rgb(190,190,100)', color: 'black' }}>
                                                            <td style={{ padding: "10px", width: '10%', textAlign: 'center' }}>{li.order_id}</td>
                                                            <td style={{ padding: "10px", width: '10%', textAlign: 'center' }}>{li.product_id}</td>
                                                            <td style={{ padding: "10px", width: '10%', textAlign: 'center' }}>{li.price}</td>
                                                            <td style={{ padding: "10px", width: '25%', textAlign: 'center' }}>{li.vendor_email}</td>
                                                            <td style={{ padding: "10px", width: '20%', textAlign: 'center' }}>
                                                                <Button sx={{
                                                                    backgroundColor: 'transparent',
                                                                    '&:hover': { backgroundColor: 'transparent' }
                                                                }} onClick={async () => {
                                                                    setProductId(li.product_id);
                                                                    setMailId(li.vendor_email);
                                                                    setPrice(li.price);
                                                                    setPerc(0);
                                                                    setComissionAmount(0);
                                                                    setPayAmt(0);
                                                                    setViewFlag(true);
                                                                    setIterate(iterate => iterate + 1);
                                                                    setStatus('reset');
                                                                }}><ModeEditIcon sx={{ color: 'black' }} /></Button>
                                                            </td>
                                                        </tr >
                                                    </>)
                                            })}
                                        </>)
                                    })}
                                    {paidcnt == 0 && innerloop.length > 0 && innerloop.map((li) => {
                                        return (<>
                                            <tr style={{ backgroundColor: 'rgb(190,190,100)', color: 'black' }}>
                                                <td style={{ padding: "10px", width: '10%', textAlign: 'center' }}>{li.order_id}</td>
                                                <td style={{ padding: "10px", width: '10%', textAlign: 'center' }}>{li.product_id}</td>
                                                <td style={{ padding: "10px", width: '10%', textAlign: 'center' }}>{li.price}</td>
                                                <td style={{ padding: "10px", width: '25%', textAlign: 'center' }}>{li.vendor_email}</td>
                                                <td style={{ padding: "10px", width: '20%', textAlign: 'center' }}>
                                                    <Button sx={{
                                                        backgroundColor: 'transparent',
                                                        '&:hover': { backgroundColor: 'transparent' }
                                                    }} onClick={() => {
                                                        setProductId(li.product_id);
                                                        setMailId(li.vendor_email);
                                                        setPrice(li.price);
                                                        setPerc(0);
                                                        setComissionAmount(0);
                                                        setPayAmt(0);
                                                        setIterate(iterate => iterate + 1);
                                                        setViewFlag(true);
                                                        setStatus('reset');
                                                    }}><ModeEditIcon sx={{ color: 'black' }} /></Button>
                                                </td>
                                            </tr>
                                        </>)
                                    })}
                                </tbody>
                            </table>
                        </Box>
                    </Box>
                </>}
            </>}
            {viewflag === true && <>
                <Dialog open={viewflag} hideBackdrop sx={{ marginTop: "130px", marginLeft: '40%', width: '470px', height: '620px' }}>
                    <DialogContent sx={{ padding: '1px' }}>
                        <DialogContentText sx={{ width: '400px', height: "510px" }}>
                            <Box sx={{ display: "flex", alignItems: "center", padding: "20px" }}>
                                <Typography sx={{ flex: 11, fontWeight: "bold", color: "black" }}>Pay amount</Typography>
                                <Typography sx={{ flex: 1, fontSize: "30px", fontWeight: "bold", cursor: "pointer" }}
                                    onClick={() => setViewFlag(false)}>&times;</Typography>
                            </Box>
                            <Box sx={{ paddingTop: "10px", paddingLeft: "20px" }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography sx={{ flex: 3, fontFamily: 'cursive', fontSize: '18px' }}>Product ID : </Typography>
                                    <Typography sx={{ flex: 7, fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }}>{product_id}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                                    <Typography sx={{ flex: 1.5, fontFamily: 'cursive', fontSize: '18px' }}>Price : </Typography>
                                    <Typography sx={{ flex: 7, fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }}>Rs.{price}</Typography>
                                </Box>
                                {/* comission perc */}
                                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                                    <Typography sx={{ flex: 3, fontFamily: 'cursive', fontSize: '18px' }}>Commission : </Typography>
                                    <TextField sx={{ flex: 3, fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }} value={perc} onChange={(e) => {
                                        setPerc(e.target.value);
                                    }} variant='filled' />
                                    <Box sx={{ flex: 3 }}></Box>
                                </Box>
                                {/* comission amount */}
                                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                                    <Typography sx={{ flex: 7, fontFamily: 'cursive', fontSize: '18px' }}>Commission Amount : </Typography>
                                    <TextField sx={{ flex: 3, fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }} value={comission_amt}
                                        variant='filled' />
                                    <Box sx={{ flex: 3 }}></Box>
                                </Box>
                                {/* pay amount */}
                                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                                    <Typography sx={{ flex: 3, fontFamily: 'cursive', fontSize: '18px' }}>Pay Amount : </Typography>
                                    <TextField sx={{ flex: 3, fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }} value={pay_amt}
                                        variant='filled' />
                                    <Box sx={{ flex: 3 }}></Box>
                                </Box>
                                {/* card payment */}
                                <Box sx={{ marginTop: "40px", width: "250px" }}>
                                    <CardElement />
                                    <br></br>
                                    <Button disabled={disab} sx={{ marginLeft: "10px", marginTop: "10px", textTransform: "none" }}
                                        onClick={() => {
                                            stripe.confirmCardPayment(client_secret, {
                                                payment_method: {
                                                    card: elements.getElement(CardElement)
                                                }
                                            })
                                                .then(async (result) => {
                                                    if (result.paymentIntent.status == 'succeeded') {
                                                        setTransactionId(result.paymentIntent.id)
                                                        setStatus(result.paymentIntent.status);
                                                    }
                                                    else if (result.paymentIntent.status != 'succeeded') {
                                                        setDisab(false);
                                                        toast.error('Payment was not successful , please retry!', { autoClose: 3000 })
                                                    }

                                                })
                                        }}>Pay Now</Button>
                                </Box>
                            </Box>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </>}
            {val == 'vendor list' && <>
                <Box sx={{ padding: '5px' }}>
                    <Box sx={{ display: "flex", alignItems: 'center' }}>
                        <Typography sx={{ marginLeft: "20px", fontWeight: "bold", marginTop: '20px', flex: 6 }}>Paid List</Typography>
                        <Box sx={{ flex: 6, marginRight: "50px" }}>
                            <Box sx={{ width: "400px", display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', border: '1px solid lightgrey', borderRadius: "5px", backgroundColor: 'rgb(240,240,240)' }}>
                                <SearchIcon sx={{ color: 'black', marginLeft: "10px", flex: 1, cursor: "pointer" }}
                                    onClick={() => {
                                        setLoader(true);
                                        if (searchval != '')
                                            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_vendor_payment?search=${searchval}`)
                                                .then((data) => {
                                                    (data.data.length > 0) ? setPayDet(data.data.slice()) : setPayDet([])
                                                    setLoader(false)
                                                })
                                        else
                                            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_vendor_payment`)
                                                .then((data) => {
                                                    (data.data.length > 0) ? setPayDet(data.data.slice()) : setPayDet([])
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
                                    <th style={{ padding: "10px", width: '15%', textAlign: 'center' }}>Product <br></br>ID</th>
                                    <th style={{ padding: "10px", width: '10%', textAlign: 'center' }}>Vendor Email</th>
                                    <th style={{ padding: "10px", width: '10%', textAlign: 'center' }}>Paid Amount </th>
                                    <th style={{ padding: "10px", width: '10%', textAlign: 'center' }}>Paid <br></br>Date </th>
                                    <th style={{ padding: "10px", width: '10%', textAlign: 'center' }}>Trans ID</th>
                                    <th style={{ padding: "10px", width: '10%', textAlign: 'center' }}>Admin Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paydet.length > 0 && paydet.map((li) => {
                                    return (<>
                                        <tr style={{ backgroundColor: 'rgb(190,190,100)', color: 'black' }} >
                                            <td style={{ padding: "10px", width: '5%', textAlign: 'center' }}>{li.order_id}</td>
                                            <td style={{ padding: "10px", width: '20%', textAlign: 'center' }}>{new Date(li.order_date).toLocaleString()}</td>
                                            <td style={{ padding: "10px", width: '15%', textAlign: 'center' }}>{li.product_id}</td>
                                            <td style={{ padding: "10px", width: '25%', textAlign: 'center' }}>{li.vendor_email}</td>
                                            <td style={{ padding: "10px", width: '10%', textAlign: 'center' }}>Rs.{li.pay_amount}</td>
                                            <td style={{ padding: "10px", width: '25%', textAlign: 'center' }}>{new Date(li.paid_date).toLocaleString()}</td>
                                            <td style={{ padding: "10px", width: '25%', textAlign: 'center' }}>{li.transaction_id}</td>
                                            <td style={{ padding: "10px", width: '10%', textAlign: 'center' }}>{li.admin_email}</td>
                                        </tr>
                                    </>)
                                })}
                            </tbody>
                        </table>
                    </Box>
                    {paydet.length == 0 &&
                        <Typography variant='h5' sx={{
                            marginTop: '70px', textAlign: 'center', color: 'rgb(245, 63, 108)',
                            fontFamily: 'verdana'
                        }}>No History found!!</Typography >}
                </Box>
            </>}
        </>}
    </>)
}

export default Pay_To_Vendor;