import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Dialog, DialogContent, DialogContentText } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import GenPDF from '../GenPDF';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Loader from '../../Loader/Loader';
const ViewOrder = (props) => {

    const [viewitemflag, setViewItemFlag] = useState(false);//view item list
    const [vieworderflag, setViewOrderFlag] = useState(false);//view item list
    //product details
    const [image, setImage] = useState(props.image)
    const [description, setDescription] = useState(props.description)
    const [size, setSize] = useState(props.size)
    const [prod_status, setProductStatus] = useState(props.prod_status)
    const [order_date, setOrderDate] = useState(props.order_date)
    const [username, setUserName] = useState(props.username)
    const [addr, setAddr] = useState(props.addr)
    const [town, setTown] = useState(props.town)
    const [pincode, setPincode] = useState(props.pincode)
    const [usermobile, setUserMobile] = useState(props.usermobile)
    const [order_price, setOrderPrice] = useState(props.order_price)
    const [order_id, setOrderId] = useState(props.order_id)
    const [user_mailid, setUserMailId] = useState(props.user_mailid)
    const [product_id, setProductId] = useState(props.product_id)
    const [discount, setDiscount] = useState(props.discount)
    const [strike_price, setStrikePrice] = useState(props.strike_price)
    const [payment_mode, setPaymentMode] = useState(props.payment_mode)
    const [price, setPrice] = useState(props.price);
    const [packed_date, setPackedDate] = useState(props.packed_date)
    const [shipped_date, setShippedDate] = useState(props.shipped_date)
    const [ofd_date, setOfdDate] = useState(props.ofd_date)
    const [delivered_date, setDeliveredDate] = useState(props.delivered_date)
    const [cancelled_date, setCancelledDate] = useState(props.cancelled_date)
    //other product data
    const [otherprod, setOtherProd] = useState([])
    //all product details
    const [allprod, setAllProd] = useState([]);
    const [loader, setLoader] = useState(true);

    //get invoice
    const [invoiceflag, setInvoiceFlag] = useState(false);
    useEffect(() => {
        document.title = 'Items Details';
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_order?order_id=${order_id}`)
            .then((data) => {
                (data.data.length > 0) ? setAllProd(data.data.slice()) : setAllProd([]);
                setLoader(false);
            })
    }, []);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_order?order_id=${order_id}&product_id=${product_id}`)
            .then((data) => {
                (data.data.length > 0) ? setOtherProd(data.data.slice()) : setOtherProd([]);
            })
    }, [product_id])
    return (<>
        {loader == true ? <Loader /> : <>
            {viewitemflag == false && vieworderflag == false &&
                <Box sx={{ marginTop: "10px", marginLeft: "20px", backgroundColor: "rgb(240,240,240)", padding: "15px" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box sx={{ flex: 10 }}></Box>
                        <Typography sx={{ textAlign: "right", flex: 1 }}>Help </Typography>
                        <Button disableTouchRipple style={{ marginLeft: "10px", borderRadius: "70%", backgroundColor: 'white' }}
                            component={Link} to='/contactus'> < HeadsetMicOutlinedIcon sx={{ color: "black" }} /></Button>
                    </Box>
                    {/* block1 */}
                    <Box sx={{ textAlign: "center", marginTop: "90px" }}>
                        <img src={`data:image/png;base64,${image}`} width='150px' height='200px' alt='loading' />
                        <Typography sx={{ marginTop: "5px" }}>{description}</Typography>
                        <Typography sx={{ marginTop: "5px" }}>Size: {size}</Typography>
                    </Box>
                    {/* block2 */}
                    <Box sx={{ padding: "10px", marginTop: "20px", backgroundColor: "rgb(40, 175, 157)", color: "white", display: "flex", alignItems: "center" }}>
                        <img src={`data:image/png;base64,${image}`} width='50px' height='50px' alt='loading' />
                        <Box sx={{ flex: 8, marginLeft: "20px" }}>
                            <Typography sx={{ fontWeight: "bold" }}>{prod_status}</Typography>
                            <Typography sx={{ marginTop: "5px" }}>Ordered On : {new Date(order_date).toLocaleString('hi-EN').toLocaleUpperCase()}</Typography>
                        </Box>
                    </Box>
                    {/* block3 */}
                    <Box sx={{ marginTop: "15px", backgroundColor: "white", padding: "5px" }}>
                        <ul>
                            {prod_status == 'confirmed' &&
                                <li style={{ fontWeight: "normal", fontFamily: "verdana" }}>{prod_status} window closed on {new Date(order_date).toLocaleString('hi-EN').toLocaleUpperCase()}</li>
                            }
                            {prod_status == 'packed' &&
                                <li style={{ fontWeight: "normal", fontFamily: "verdana" }}>{prod_status} window closed on {new Date(packed_date).toLocaleString('hi-EN').toLocaleUpperCase()}</li>
                            }
                            {prod_status == 'shipped' &&
                                <li style={{ fontWeight: "normal", fontFamily: "verdana" }}>{prod_status} window closed on {new Date(shipped_date).toLocaleString('hi-EN').toLocaleUpperCase()}</li>
                            }
                            {prod_status == 'out for delivery' &&
                                <li style={{ fontWeight: "normal", fontFamily: "verdana" }}>{prod_status} window closed on {new Date(ofd_date).toLocaleString('hi-EN').toLocaleUpperCase()}</li>
                            }
                            {prod_status == 'delivered' &&
                                <li style={{ fontWeight: "normal", fontFamily: "verdana" }}>{prod_status} window closed on {new Date(delivered_date).toLocaleString('hi-EN').toLocaleUpperCase()}</li>
                            }
                            {prod_status == 'cancelled' &&
                                <li style={{ fontWeight: "normal", fontFamily: "verdana" }}>{prod_status} window closed on {new Date(cancelled_date).toLocaleString('hi-EN').toLocaleUpperCase()}</li>
                            }
                        </ul>
                    </Box>
                    {/* block 4 */}
                    <Box sx={{ marginTop: "15px", backgroundColor: "white", padding: "15px", paddingLeft: "30px" }}>
                        <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>Delivery Address</Typography>
                        <Typography sx={{ marginTop: "15px", fontWeight: "bold", fontSize: "16px" }}>{username}| 8903411203</Typography>
                        <Typography sx={{ marginTop: "12px", fontSize: "16px", fontFamily: "verdana" }}>{addr}, {town}, {pincode}</Typography>
                        <br></br>
                    </Box>
                    {/* block 5 */}
                    <Box sx={{ marginTop: "15px", backgroundColor: "white", padding: "15px", paddingLeft: "30px" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Typography sx={{ fontWeight: 'bold', fontSize: "19px", flex: 9 }}>Total Item Price</Typography>
                            <Box sx={{ flex: 3 }}>
                                <Typography sx={{ marginLeft: "120px", fontWeight: "bold", fontFamily: "verdana" }}>&#8377;{price}.00</Typography>
                                <Button sx={{ marginLeft: "100px", fontSize: "16px", textTransform: 'none', fontWeight: "bold", color: "rgb(250, 50, 84)" }}
                                    onClick={() => setViewItemFlag(true)} disableTouchRipple>View Breakup</Button>
                            </Box>
                        </Box>
                        <Box sx={{ padding: "20px", marginTop: "10px", backgroundColor: "rgb(240,240,240)", display: "flex", alignItems: "center" }}>
                            <AccountBalanceOutlinedIcon sx={{ color: "grey" }} />
                            <Typography sx={{ marginLeft: "30px" }}>Paid by {payment_mode}</Typography>
                        </Box>

                        <PDFDownloadLink document={<GenPDF orderno={props.order_id} orderdate={props.order_date} username={props.username} del={props.delivered_date}
                            addr={allprod[0].addr} town={allprod[0].town} pincode={allprod[0].pincode} total_amount={allprod[0].total_amount} />} fileName="Invoice.pdf" >
                            {({ blob, url, loading, error }) => (loading ? 'Loading document...' :
                                <Button disableTouchRipple variant='outlined' sx={{ '&:hover': { border: "1px solid lightgrey", color: "black", backgroundColor: "rgb(230,230,230)" }, padding: "10px", border: "1px solid lightgrey", color: "black", fontWeight: "bold", fontSize: "15px", marginTop: "20px", width: "100%" }}
                                > GET INVOICE</Button>)}
                        </PDFDownloadLink >
                    </Box>
                    {/* block6 */}
                    <Box sx={{ marginTop: "15px", backgroundColor: "white", padding: "15px", paddingLeft: "30px" }}>
                        <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>Other items in this order </Typography>
                        <Typography sx={{ color: "grey" }}>Order ID #{order_id} </Typography>
                        {/* subblock1 */}
                        {otherprod.length > 0 && otherprod.map((li) => {
                            return (<>
                                <Box sx={{
                                    cursor: "pointer", marginTop: "20px", display: "flex", alignItems: "center", backgroundColor: "rgb(240,240,240)", padding: "15px",
                                    '&:hover': { backgroundColor: "rgb(220,220,220)" }
                                }} onClick={() => {
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
                            </>)
                        })}
                        {/* subblock2 */}
                        <Box sx={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
                            <Typography sx={{ fontWeight: 'bold', fontSize: "19px", flex: 9 }}>Total Order Price</Typography>
                            <Box sx={{ flex: 3 }}>
                                <Typography sx={{ marginLeft: "120px", fontWeight: "bold", fontFamily: "verdana" }}>&#8377;{order_price}.00</Typography>
                                <Button sx={{ marginLeft: "100px", fontSize: "16px", textTransform: 'none', fontWeight: "bold", color: "rgb(250, 50, 84)" }}
                                    onClick={() => setViewOrderFlag(true)} disableTouchRipple>View Breakup</Button>
                            </Box>
                        </Box>
                        <br></br>
                    </Box>
                    {/* block7 */}
                    <Box sx={{ marginTop: "15px", backgroundColor: "white", padding: "15px", paddingLeft: "30px" }}>
                        <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>Updates sent to </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
                            <CallOutlinedIcon sx={{ color: "grey" }} />
                            <Typography sx={{ marginLeft: "10px", fontSize: "16px", color: "grey", flex: 11 }}>{usermobile}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", marginTop: "5px" }}>
                            <MailOutlineOutlinedIcon sx={{ color: "grey", fontFamily: "cursive" }} />
                            <Typography sx={{ marginLeft: "10px", fontSize: "16px", color: "grey", flex: 11 }}>{user_mailid}</Typography>
                        </Box>
                        <br></br>
                    </Box>
                    {/* block 8 */}
                    <Box sx={{ marginTop: "15px", backgroundColor: "white", padding: "15px", paddingLeft: "30px" }}>
                        <Typography sx={{ color: "grey", fontFamily: "verdana" }}>Order ID # {order_id}</Typography>
                    </Box>
                </Box >
            }
            {
                viewitemflag == true && vieworderflag == false &&
                < Dialog open={viewitemflag} hideBackdrop sx={{ margin: 'auto', width: '800px', height: '650px' }}>
                    <DialogContent>
                        <DialogContentText sx={{ width: '550px', height: "320px" }}>
                            <Box sx={{ borderRadius: "10px", display: "flex", alignItems: "center" }}>
                                <Typography sx={{ flex: 11, fontSize: "22px", fontWeight: "bold", color: "black" }}>Payment Information </Typography>
                                <img src={`data:image/png;base64,${image}`} width='50px' height='50px' alt='loading' />
                                <Typography sx={{ cursor: "pointer", marginLeft: "30px", flex: 1, fontSize: "35px", color: "black" }} onClick={() => setViewItemFlag(false)}>&times;</Typography>
                            </Box>
                            <table style={{ marginTop: "20px", width: '100%' }}>
                                <tbody>
                                    <tr>
                                        <td style={{ width: "50%" }}>MRP</td>
                                        <td style={{ width: "50%", color: "black", fontWeight: "bold", fontFamily: "TimesNewRoman", fontSize: "18px" }}>&#8377;{strike_price}</td>
                                    </tr>
                                    <tr >
                                        <td style={{ width: "50%" }}>Discount</td>
                                        <td style={{ width: "50%", color: "black", fontWeight: "bold", fontFamily: "TimesNewRoman", fontSize: "18px" }}>&#8377;{((strike_price * discount) / 100)}.00</td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: "50%", color: "black", fontWeight: "bold" }}>Total Amount</td>
                                        <td style={{ width: "50%", color: "black", fontWeight: "bold", fontFamily: "TimesNewRoman", fontSize: "18px" }}>&#8377;{price}.00</td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: "50%", color: "black", fontWeight: "bold" }}>Net Paid</td>
                                        <td style={{ width: "50%", color: "black", fontWeight: "bold", fontFamily: "TimesNewRoman", fontSize: "18px" }}>&#8377;{price}.00</td>
                                    </tr>
                                </tbody>
                            </table>
                            <Box sx={{ padding: "20px", marginTop: "30px", backgroundColor: "rgb(240,240,240)", display: "flex", alignItems: "center" }}>
                                <AccountBalanceOutlinedIcon sx={{ flex: 2 }} />
                                <Typography sx={{ flex: 2, color: "black", fontWeight: "bold" }}>&#8377;{price}.00</Typography>
                                <Typography sx={{ flex: 8 }}>Paid by {payment_mode}</Typography>
                            </Box>
                        </DialogContentText>
                    </DialogContent >
                </Dialog >
            }
            {
                vieworderflag == true && viewitemflag == false &&
                < Dialog open={vieworderflag} hideBackdrop sx={{ margin: 'auto', width: '800px', height: '850px' }}>
                    <DialogContent>
                        <DialogContentText sx={{ width: '550px', height: "520px" }}>
                            <Box sx={{ borderRadius: "10px", display: "flex", alignItems: "center" }}>
                                <Typography sx={{ flex: 11, fontSize: "22px", fontWeight: "bold", color: "black" }}>Payment Information </Typography>
                                <Typography sx={{ cursor: "pointer", marginLeft: "30px", flex: 1, fontSize: "35px", color: "black" }} onClick={() => setViewOrderFlag(false)}>&times;</Typography>
                            </Box>
                            <table style={{ marginTop: "20px", width: '100%' }}>
                                <tbody>
                                    {allprod.length > 0 && allprod.map((li) => {
                                        return (<>
                                            <tr>
                                                <td style={{ width: "80%" }}>1X {li.description}</td>
                                                <td style={{ width: "20%", color: "black", fontWeight: "bold", fontFamily: "TimesNewRoman", fontSize: "18px" }}>&#8377;{li.strike_price}.00</td>
                                            </tr>
                                        </>)
                                    })}
                                    <tr>
                                        <td style={{ width: "50%" }}>Discount</td>
                                        <td style={{ width: "50%", color: "black", fontWeight: "bold", fontFamily: "TimesNewRoman", fontSize: "18px" }}>&#8377;{allprod[0].discount_amount}.00</td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: "50%" }}>Conv Fee</td>
                                        <td style={{ width: "50%", color: "black", fontWeight: "bold", fontFamily: "TimesNewRoman", fontSize: "18px" }}>&#8377;{allprod[0].conv_fee}.00</td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: "50%" }}>Gift amount</td>
                                        <td style={{ width: "50%", color: "black", fontWeight: "bold", fontFamily: "TimesNewRoman", fontSize: "18px" }}>&#8377;{allprod[0].gift_amt}.00</td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: "50%" }}>First order</td>
                                        <td style={{ width: "50%", color: "black", fontWeight: "bold", fontFamily: "TimesNewRoman", fontSize: "18px" }}>&#8377;{allprod[0].first_order}.00</td>
                                    </tr>
                                    <hr />
                                    <tr>
                                        <td style={{ width: "50%", color: "black", fontWeight: "bold" }}>Total Amount</td>
                                        <td style={{ width: "50%", color: "black", fontWeight: "bold", fontFamily: "TimesNewRoman", fontSize: "18px" }}>&#8377;{allprod[0].total_amount}.00</td>
                                    </tr>
                                    <hr />
                                    <tr>
                                        <td style={{ width: "50%", color: "black", fontWeight: "bold" }}>Net Paid</td>
                                        <td style={{ width: "50%", color: "black", fontWeight: "bold", fontFamily: "TimesNewRoman", fontSize: "18px" }}>&#8377;{allprod[0].total_amount}.00</td>
                                    </tr>
                                </tbody>
                            </table>
                            <Box sx={{ padding: "20px", marginTop: "30px", backgroundColor: "rgb(240,240,240)", display: "flex", alignItems: "center" }}>
                                <AccountBalanceOutlinedIcon sx={{ flex: 2 }} />
                                <Typography sx={{ flex: 2, color: "black", fontWeight: "bold" }}>&#8377;{allprod[0].total_amount}.00</Typography>
                                <Typography sx={{ flex: 8 }}>Paid by {payment_mode}</Typography>
                            </Box>
                        </DialogContentText>
                    </DialogContent >
                </Dialog >
            }
        </>}
    </>)
}

export default ViewOrder;