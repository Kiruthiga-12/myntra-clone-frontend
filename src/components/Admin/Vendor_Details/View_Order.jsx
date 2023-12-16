import { Typography, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../../Loader/Loader';
const View_Order = (props) => {
    const [innerloop, setInnerLoop] = useState([]);
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_order?order_id=${props.orderid}`)
            .then((data) => {
                (data.data.length > 0) ? setInnerLoop(data.data.slice()) : setInnerLoop([]);
                setLoader(false);
            })
    }, [])
    return (<>
        {loader == true ? <Loader /> : <>
            <Box sx={{ padding: "20px" }}>
                <Typography sx={{ fontWeight: "bold", marginTop: "15px", fontSize: "19px", textDecoration: 'underline' }}>Order Details</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                    <Typography sx={{ flex: 1.5, fontFamily: 'cursive', fontSize: '18px' }}>Order ID : </Typography>
                    <Typography sx={{ flex: 7, fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }}>{innerloop[0].order_id}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                    <Typography sx={{ flex: 1.5, fontFamily: 'cursive', fontSize: '18px' }}>Payment Done : </Typography>
                    <Typography sx={{ flex: 7, fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }}>{innerloop[0].payment_done}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                    <Typography sx={{ flex: 1.5, fontFamily: 'cursive', fontSize: '18px' }}>Payment Mode : </Typography>
                    <Typography sx={{ flex: 7, fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }}>{innerloop[0].payment_mode}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                    <Typography sx={{ flex: 1.5, fontFamily: 'cursive', fontSize: '18px' }}>Order Date : </Typography>
                    <Typography sx={{ flex: 7, fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }}>{new Date(innerloop[0].order_date).toLocaleString('hi-EN').toLocaleUpperCase()}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                    <Typography sx={{ flex: 1.5, fontFamily: 'cursive', fontSize: '18px' }}>Order Status : </Typography>
                    <Typography sx={{ flex: 7, fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }}>{innerloop[0].order_status}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                    <Typography sx={{ flex: 1.5, fontFamily: 'cursive', fontSize: '18px' }}>Vendor Email : </Typography>
                    <Typography sx={{ flex: 7, fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }}>{innerloop[0].vendor_email}</Typography>
                </Box>
                {innerloop[0].order_status == 'packed' &&
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                        <Typography sx={{ flex: 1.5, fontFamily: 'cursive', fontSize: '18px' }}>Packed Date : </Typography>
                        <Typography sx={{ flex: 7, fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }}>{new Date(innerloop[0].packed_date).toLocaleString('hi-EN').toLocaleUpperCase()}</Typography>
                    </Box>
                }
                {innerloop[0].order_status == 'shipped' &&
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                        <Typography sx={{ flex: 1.5, fontFamily: 'cursive', fontSize: '18px' }}>Shipped Date : </Typography>
                        <Typography sx={{ flex: 7, fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }}>{new Date(innerloop[0].shipped_date).toLocaleString('hi-EN').toLocaleUpperCase()}</Typography>
                    </Box>
                }
                {innerloop[0].order_status == 'out for delivery' &&
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                        <Typography sx={{ flex: 1.5, fontFamily: 'cursive', fontSize: '18px' }}>Out For Delivery Date : </Typography>
                        <Typography sx={{ flex: 7, fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }}>{new Date(innerloop[0].ofd_date).toLocaleString('hi-EN').toLocaleUpperCase()}</Typography>
                    </Box>
                }
                {innerloop[0].order_status == 'delivered' &&
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                        <Typography sx={{ flex: 1.5, fontFamily: 'cursive', fontSize: '18px' }}>Delivered Date : </Typography>
                        <Typography sx={{ flex: 7, fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }}>{new Date(innerloop[0].delivered_date).toLocaleString('hi-EN').toLocaleUpperCase()}</Typography>
                    </Box>
                }
                {innerloop[0].order_status == 'cancelled' &&
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                        <Typography sx={{ flex: 1.5, fontFamily: 'cursive', fontSize: '18px' }}>Cancelled Date : </Typography>
                        <Typography sx={{ flex: 7, fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }}>{new Date(innerloop[0].cancelled_date).toLocaleString('hi-EN').toLocaleUpperCase()}</Typography>
                    </Box>
                }
                {/* line item */}
                <Box sx={{ marginTop: "25px", narginBottom: "20px", textDecoration: "underline" }}>Product Details</Box>
                {innerloop.length > 0 && innerloop.map((li1, index1) => {
                    return (<>
                        <Box sx={{ backgroundColor: "rgb(220,220,240)", marginTop: "5px", width: "800px" }}>
                            <Box sx={{ display: 'flex', alignItems: "center", padding: '10px' }}>
                                <img src={`data:image/png;base64,${li1.image1}`} alt='loading' style={{ width: '100px', height: '100px', border: '1px solid grey' }} />
                                <Box sx={{ flex: 5, marginLeft: "50px" }}>
                                    <Typography variant='body1' sx={{ flex: 3, fontFamily: "verdana", color: "black", fontWeight: "bold" }}>{li1.description}</Typography>
                                    <Typography variant='body1' sx={{ flex: 3, fontFamily: "verdana", color: "black" }}>Product ID: {li1.product_id} </Typography>
                                    <Typography variant='body1' sx={{ flex: 2, fontFamily: "verdana", color: "black" }}>Discount: {li1.discount}%</Typography>
                                    <Typography variant='body1' sx={{ flex: 3, fontFamily: "verdana", color: "black" }}>Brand: <span>{li1.brand} </span></Typography>
                                </Box>
                                <Box sx={{ flex: 5, marginLeft: "20px" }}>
                                    <Typography variant='body1' sx={{ flex: 2, fontFamily: "verdana", color: "black" }}>Strike Price: <span>Rs.{li1.strike_price} </span> </Typography>
                                    <Typography variant='body1' sx={{ flex: 2, fontFamily: "verdana", color: "black" }}>Qty:  {li1.qty}</Typography>
                                    <Typography variant='body1' sx={{ flex: 2, fontFamily: "verdana", color: "black" }}>Size:  {li1.size}</Typography>
                                    <Typography variant='body1' sx={{ flex: 2, fontFamily: "verdana", color: "black" }}>Price: <span>Rs.{li1.price}</span></Typography>
                                    <Typography variant='body1' sx={{ flex: 2, fontFamily: "verdana", color: "black" }}>Item in Stock:  {li1.count}</Typography>
                                </Box>
                            </Box>
                        </Box >
                    </>)
                })}
                <Typography sx={{ fontWeight: "bold", marginTop: "25px", fontSize: "19px", textDecoration: 'underline' }}>User Details</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                    <Typography sx={{ flex: 1.5, fontFamily: 'cursive', fontSize: '18px' }}>User ID: </Typography>
                    <Typography sx={{ flex: 7, fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }}>{innerloop[0].user_id}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                    <Typography sx={{ flex: 1.5, fontFamily: 'cursive', fontSize: '18px' }}>User Email: </Typography>
                    <Typography sx={{ flex: 7, fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }}>{innerloop[0].user_email}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                    <Typography sx={{ flex: 1.5, fontFamily: 'cursive', fontSize: '18px' }}>User Name: </Typography>
                    <Typography sx={{ flex: 7, fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }}>{innerloop[0].user_name}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                    <Typography sx={{ flex: 1.5, fontFamily: 'cursive', fontSize: '18px' }}>User Address: </Typography>
                    <Typography sx={{ flex: 7, fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }}>{innerloop[0].addr}, {innerloop[0].town}, {innerloop[0].pincode}</Typography>
                </Box>
                <Typography sx={{ fontWeight: "bold", marginTop: "25px", fontSize: "19px", textDecoration: 'underline' }}>Invoice Details</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                    <Typography sx={{ flex: 1.5, fontFamily: 'cursive', fontSize: '18px' }}>Total Items: </Typography>
                    <Typography sx={{ flex: 7, fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }}>{innerloop[0].total_items}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                    <Typography sx={{ flex: 1.5, fontFamily: 'cursive', fontSize: '18px' }}>Transaction Id : </Typography>
                    <Typography sx={{ flex: 7, fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }}>{innerloop[0].transaction_id}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                    <Typography sx={{ flex: 1.5, fontFamily: 'cursive', fontSize: '18px' }}>Total MRP: </Typography>
                    <Typography sx={{ flex: 7, fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }}>Rs.{innerloop[0].total_mrp}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                    <Typography sx={{ flex: 1.5, fontFamily: 'cursive', fontSize: '18px' }}>Discount: </Typography>
                    <Typography sx={{ flex: 7, fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }}>Rs.{innerloop[0].discount_amount}-</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                    <Typography sx={{ flex: 1.5, fontFamily: 'cursive', fontSize: '18px' }}>Convenience Fee: </Typography>
                    <Typography sx={{ flex: 7, fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }}>Rs.{innerloop[0].conv_fee}</Typography>
                </Box>

                {innerloop[0].gift_amt != undefined && innerloop[0].gift_amt != '' && Number(innerloop[0].gift_amt) != 0 &&
                    < Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                        <Typography sx={{ flex: 1.5, fontFamily: 'cursive', fontSize: '18px' }}>Gift Amount: </Typography>
                        <Typography sx={{ flex: 7, fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }}>Rs.{innerloop[0].gift_amt}</Typography>
                    </Box>
                }
                {innerloop[0].first_order != undefined && innerloop[0].first_order != '' && Number(innerloop[0].first_order) != 0 &&
                    < Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                        <Typography sx={{ flex: 1.5, fontFamily: 'cursive', fontSize: '18px' }}>First Order: </Typography>
                        <Typography sx={{ flex: 7, fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }}>Rs.{innerloop[0].first_order}-</Typography>
                    </Box>
                }
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                    <Typography sx={{ flex: 1.5, fontFamily: 'cursive', fontSize: '18px' }}>Total Amount: </Typography>
                    <Typography sx={{ flex: 7, fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }}>Rs.{innerloop[0].total_amount}</Typography>
                </Box>
            </Box >
            <br></br>
            <br></br>
        </>}
    </>)
}

export default View_Order;