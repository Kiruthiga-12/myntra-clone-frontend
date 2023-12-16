import { Box, Typography, ListItemButton, Button, ListItem, Dialog, DialogContent, DialogContentText } from '@mui/material';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import MoneyOutlinedIcon from '@mui/icons-material/MoneyOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import axios from 'axios';
import PercentOutlinedIcon from '@mui/icons-material/PercentOutlined';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CreditCard from './Payment/CreditCard';
import Cashondel from './Payment/Cashondel';
import Recommendedoption from './Payment/Recommendedoption';
import UPI from './Payment/UPI';
import Wallets from './Payment/Wallets';
import NetBanking from './Payment/NetBanking';
import EMI from './Payment/EMI';
import { getPaymentMode } from '../../../Redux_Store/Action_Creators';
import Loader from '../../../Loader/Loader';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js'
const Cartpayment = (props) => {
    //to store amount details.
    const [total_mrp, setTotalMrp] = useState();
    const [know_more, setKnow] = useState(false);
    const [discount_mrp, setDiscountMrp] = useState();
    const [conv_fee, setConvFee] = useState();
    const [total_amount, setTotalAmount] = useState();
    const [gift_wrap, setGiftwrap] = useState();
    const [total_count, setTotalCount] = useState();
    const [offer_amt, setOfferAmt] = useState();
    const [loader, setLoader] = useState(true);
    //show more button
    const [show_flag, setShowFlag] = useState(false);
    //user details
    const [username, setUserName] = useState();
    const [usermail, setUserMail] = useState();
    //item not in stock
    const [notinstock, setNotInStock] = useState(0);
    const [pdet, setPDet] = useState([]);
    //load Stripe;
    let stripeval = loadStripe("pk_test_51O2Z4hSIr3vWUuJE0XmSYTsbcFCIWUAvnPiasInu1YKZoyFra5QiuNbO8TEG1aMlEXAuvFxJbaLFMZYC0djqYrQw00is58Hv2F")
    useEffect(() => {
        document.title = 'PAYMENT';
        //to get total amount
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_amount?user_id=${props.user.user_id}`)
            .then((data) => {
                if (data.data.length > 0) {
                    setTotalMrp(data.data[0].total_mrp);
                    setDiscountMrp(data.data[0].discount_mrp);
                    setConvFee(data.data[0].convenience_fee);
                    setGiftwrap(data.data[0].gift_amt);
                    setTotalAmount(data.data[0].total_amount);
                    setTotalCount(data.data[0].total_count);
                    setOfferAmt(data.data[0].offer_amt);
                    setLoader(false);
                }
            })
        //place order count
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_place_order?user_id=${props.user.user_id}`)
            .then((data) => (data.data.length > 0) ? setPDet(data.data.slice()) : setPDet([]))

        setUserName(props.user.user_fullname);
        setUserMail(props.user.user_mailid)
    }, [])
    useEffect(() => {
        if (pdet.length > 0) {
            setNotInStock(0);
            pdet.map((li) => {
                if (li.count <= 0) {
                    setNotInStock(notinstock => notinstock + 1);
                }
            })
        }
    }, [pdet])
    useEffect(() => {
        if (document.getElementById('show_payment_flag') != undefined) {
            if (show_flag === true) {
                document.getElementById('show_payment_flag').innerText = 'Show Less';
            }
            else if (show_flag === false) {
                document.getElementById('show_payment_flag').innerText = 'Show More';
            }
        }
    }, [show_flag])
    return (
        <>
            {loader == true ? <Loader /> : <>
                {notinstock > 0 && <>
                    <Typography sx={{ marginLeft: "45%", color: "red", padding: "10px", fontWeight: "bold", fontFamily: "cursive", marginTop: "120px" }} >ITEM NOT IN STOCK !!</Typography>
                    <Typography sx={{ marginLeft: "40%", color: "blue", fontFamily: "cursive", marginTop: "5px" }} >Kindly remove the item from order in  cart in 1st Step!!</Typography>
                    <Box sx={{ height: "300px" }}></Box>
                </>
                }
                {notinstock == 0 && <>
                    <Box sx={{ display: 'flex', marginTop: '130px' }}>
                        <Box sx={{ flex: 7, borderRight: '1px solid lightgrey' }}>
                            <Box sx={{ display: 'flex', marginTop: '20px' }}>
                                <Box sx={{ flex: 2 }}></Box>
                                <Box sx={{ flex: 10, marginRight: '30px' }}>
                                    {/* block1 */}
                                    <Box sx={{ padding: "10px", marginTop: "2px", flex: 9, border: '1px solid lightgrey', marginRight: '25px' }}>
                                        <Box sx={{ display: 'flex', alignItems: "center", marginTop: "10px" }}>
                                            < PercentOutlinedIcon sx={{ fontWeight: "bold", flex: 1, fontSize: "20px" }} />
                                            <Typography sx={{ fontWeight: "bold", flex: 11 }}> Bank Offers</Typography>
                                        </Box>
                                        <ul style={{ marginTop: "20px", marginLeft: "20px" }}>
                                            <li style={{ fontFamily: "verdana" }}>12% Instant Discount on OneCard Credit Cards on a min spend of Rs. 3,500. TCA</li>
                                            {show_flag === true && <>
                                                <li style={{ marginTop: "10px", fontFamily: "verdana" }}>10% Instant Discount on IDFC FIRST Bank Credit and Debit Cards on a min speed of Rs 2,500. TCA </li>
                                                <li style={{ marginTop: "10px", fontFamily: "verdana" }}>7.5% Instant Discount upto &#8377;750 on every spends with Myntra Kotak Credit Card. TCA </li>
                                                <li style={{ marginTop: "10px", fontFamily: "verdana" }}>Up to  &#8377;500 Cashback on CRED pay UPI (Andriod Devices only) on a minimum spend of &#8377; 1,000. TCA </li>
                                                <li style={{ marginTop: "10px", fontFamily: "verdana" }}>Flat &#8377;30 Cashback on Freecharge UPI (Andriod Devices only) on a minimum spend of &#8377; 1,999. TCA </li>
                                                <li style={{ marginTop: "10px", fontFamily: "verdana" }}>Get upto 10% cashback on Mobiwik Wallet transaction on a min speed of  &#8377; 1500.Use Code MBK10 on Mobikwik. TCA </li>
                                                <li style={{ marginTop: "10px", fontFamily: "verdana" }}>10% Cashback upto &#8377; 200 on Airtel Payments Bank transactions on a min spend of &#8377; 1,000. TCA </li>
                                            </>}
                                        </ul>
                                        <Button sx={{ marginLeft: "30px", textTransform: 'none', fontWeight: "bold", fontSize: '17px', color: "rgb(243, 66, 140)", backgroundColor: 'white', '&:hover': { backgroudColor: "white" } }}
                                            disableTouchRipple id='show_payment_flag'
                                            onClick={() => setShowFlag(!show_flag)}>Show More</Button>
                                    </Box>
                                    {/* block2 */}
                                    <Typography sx={{ fontWeight: 'bold', marginTop: "30px" }}>Choose Payment Mode</Typography>
                                    <Box sx={{ marginTop: '20px', border: '1px solid rgb(220,220,220)', display: 'flex', borderRadius: '3px' }}>
                                        <Box sx={{ flex: 5 }}>
                                            <ListItemButton disableTouchRipple sx={{
                                                borderBottom: '1px solid rgb(220,220,220)', borderRight: '1px solid rgb(220,220,220)', paddingTop: '40px', paddingBottom: '40px', backgroundColor: 'rgb(240,240,240)', height: '30px',
                                                '&:focus': { backgroundColor: "blueviolet", color: "white" }
                                            }}
                                                onClick={() => props.getPaymentMode('Recommend')}>
                                                <StarBorderOutlinedIcon />
                                                <Typography sx={{ marginLeft: '20px', fontWeight: 'bold' }} >Recommended</Typography>
                                            </ListItemButton>
                                            <ListItemButton disableTouchRipple sx={{
                                                borderBottom: '1px solid rgb(220,220,220)', borderRight: '1px solid rgb(220,220,220)', paddingTop: '40px', paddingBottom: '40px', backgroundColor: 'rgb(240,240,240)', height: '30px',
                                                '&:focus': { backgroundColor: "blueviolet", color: "white" }
                                            }}
                                                onClick={() => props.getPaymentMode('COD')}>
                                                <CurrencyRupeeOutlinedIcon />
                                                <Typography sx={{ marginLeft: '20px', fontWeight: 'bold' }}>Cash on Delivery</Typography>
                                            </ListItemButton>
                                            <ListItemButton disableTouchRipple sx={{
                                                borderBottom: '1px solid rgb(220,220,220)', borderRight: '1px solid rgb(220,220,220)', paddingTop: '40px', paddingBottom: '40px', backgroundColor: 'rgb(240,240,240)', height: '30px',
                                                '&:focus': { backgroundColor: "blueviolet", color: "white" }
                                            }}
                                                onClick={() => props.getPaymentMode('Credit')}>
                                                < CreditCardOutlinedIcon />
                                                <Typography sx={{ marginLeft: '20px', fontWeight: 'bold' }}>Credit / Debit Card</Typography>
                                            </ListItemButton>
                                            <ListItemButton disableTouchRipple sx={{
                                                borderBottom: '1px solid rgb(220,220,220)', borderRight: '1px solid rgb(220,220,220)', paddingTop: '40px', paddingBottom: '40px', backgroundColor: 'rgb(240,240,240)', height: '30px',
                                                '&:focus': { backgroundColor: "blueviolet", color: "white" }
                                            }}
                                                onClick={() => props.getPaymentMode('UPI')}>
                                                <MoneyOutlinedIcon />
                                                <Typography sx={{ marginLeft: '20px', fontWeight: 'bold' }}>Phonepe/Google Pay/BHIM UPI</Typography>
                                            </ListItemButton>
                                            <ListItemButton disableTouchRipple sx={{
                                                borderBottom: '1px solid rgb(220,220,220)', borderRight: '1px solid rgb(220,220,220)', paddingTop: '40px', paddingBottom: '40px', backgroundColor: 'rgb(240,240,240)', height: '30px',
                                                '&:focus': { backgroundColor: "blueviolet", color: "white" }
                                            }}
                                                onClick={() => props.getPaymentMode('Wallets')}>
                                                <AccountBalanceWalletOutlinedIcon />
                                                <Typography sx={{ marginLeft: '20px', fontWeight: 'bold' }}>Payment/Wallets</Typography>
                                            </ListItemButton>
                                            <ListItemButton disableTouchRipple sx={{
                                                borderBottom: '1px solid rgb(220,220,220)', borderRight: '1px solid rgb(220,220,220)', paddingTop: '40px', paddingBottom: '40px', backgroundColor: 'rgb(240,240,240)', height: '30px',
                                                '&:focus': { backgroundColor: "blueviolet", color: "white" }
                                            }}
                                                onClick={() => props.getPaymentMode('NetBanking')}>
                                                <AccountBalanceOutlinedIcon />
                                                <Typography sx={{ marginLeft: '20px', fontWeight: 'bold' }}>Net Banking</Typography>
                                            </ListItemButton>
                                            <ListItemButton disableTouchRipple sx={{
                                                borderBottom: '1px solid rgb(220,220,220)', borderRight: '1px solid rgb(220,220,220)', paddingTop: '40px', paddingBottom: '40px', backgroundColor: 'rgb(240,240,240)', height: '30px',
                                                '&:focus': { backgroundColor: "blueviolet", color: "white" }
                                            }}
                                                onClick={() => props.getPaymentMode('EMI')}>
                                                <RequestQuoteOutlinedIcon />
                                                <Typography sx={{ marginLeft: '20px', fontWeight: 'bold' }}>EMI / Pay Later</Typography>
                                            </ListItemButton>

                                        </Box>
                                        <Box sx={{ flex: 9, padding: "20px" }}>
                                            {props.payment_mode == 'Recommend' && <>
                                                <Recommendedoption />
                                            </>}
                                            {props.payment_mode == 'COD' && <>
                                                <Cashondel />
                                            </>}
                                            {props.payment_mode == 'Credit' && <>
                                                <Elements stripe={stripeval}><CreditCard total_amount={total_amount}
                                                    name={username} email={usermail} /></Elements>
                                            </>}
                                            {props.payment_mode == 'UPI' && <>
                                                <UPI />
                                            </>}
                                            {props.payment_mode == 'Wallets' && <>
                                                <Wallets />
                                            </>}
                                            {props.payment_mode == 'NetBanking' && <>
                                                <NetBanking />
                                            </>}
                                            {props.payment_mode == 'EMI' && <>
                                                <EMI />
                                            </>}
                                        </Box>
                                    </Box>
                                    <Box sx={{ marginTop: '30px', border: '1px solid rgb(220,220,220)', display: 'flex', alignItems: 'center', paddingTop: '15px', paddingBottom: '15px' }}>
                                        < CardGiftcardIcon sx={{ flex: 1 }} />
                                        <Typography variant='body1' sx={{ flex: 9, fontWeight: 'bold' }}>Have a Gift Card?</Typography>
                                        <Button disableTouchRipple sx={{
                                            marginRight: '20px',
                                            flex: 3, color: 'rgb(250, 50, 84)', fontWeight: 'bold',
                                            backgroundColor: 'transparent',
                                            '&:hover': { backgroundColor: 'transparent', color: 'rgb(250, 50, 84)' }
                                        }}>Apply Gift Card</Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ flex: 5, marginLeft: '30px' }}>
                            <Typography variant='body1' sx={{ color: 'grey', fontWeight: 'bold', marginTop: '40px' }}>PRICE DETAILS <span>({total_count} item)</span></Typography>
                            <table style={{
                                marginTop: '20px', width: '70% ', paddingRight: '10px'
                            }}>
                                <tbody>
                                    <tr style={{ height: '40px' }
                                    } >
                                        <td style={{ width: '70%', fontFamily: "verdana" }}>Total MRP</td>
                                        <td style={{ width: '50%', textAlign: 'right', fontFamily: "verdana" }}>&#8377; {total_mrp}</td>
                                    </tr>
                                    <tr style={{ height: '40px' }} >
                                        <td style={{ width: '70%', fontFamily: "verdana" }}>Discount on MRP</td>
                                        <td style={{ width: '50%', textAlign: 'right', fontFamily: "verdana", color: 'rgb(72, 185, 157)' }}>&#8377; {discount_mrp}-</td>
                                    </tr>
                                    <tr style={{ height: '40px' }} >
                                        <td style={{ width: '70%', fontFamily: "verdana" }}>Convenience Fee <Button sx={{ color: 'rgb(250, 50, 84)', textTransform: 'none', marginLeft: '20px', cursor: 'pointer', fontWeight: "bold" }}
                                            onClick={() => setKnow(true)} > Know More</Button></td>
                                        <td style={{ width: '50%', fontFamily: "verdana", textAlign: 'right' }}>&#8377; {conv_fee}</td>
                                    </tr>
                                    {gift_wrap > 0 && <>
                                        <tr style={{ height: '40px' }} >
                                            <td style={{ width: '70%', fontFamily: "verdana" }}>Gift Wrap </td>
                                            <td style={{ width: '50%', fontFamily: "verdana", textAlign: 'right' }}>&#8377; {gift_wrap}</td>
                                        </tr>
                                    </>
                                    }
                                    {offer_amt > 0 && <>
                                        <tr style={{ height: '40px' }} >
                                            <td style={{ width: '70%', fontFamily: "verdana" }}>First Order</td>
                                            <td style={{ width: '50%', textAlign: 'right', fontFamily: "verdana", color: 'rgb(72, 185, 157)' }}>&#8377; {offer_amt}-</td>
                                        </tr>
                                    </>}
                                </tbody>
                            </table>
                            <div style={{ marginTop: '20px', width: '75%', borderBottom: '1px solid lightgrey', backgroundColor: 'grey' }}></div>
                            <table style={{
                                marginTop: '20px', width: '70% ', paddingRight: '10px'
                            }}>
                                <tbody>
                                    <tr style={{ height: '40px' }
                                    } >
                                        <td style={{ width: '70%' }}>Total Amount</td>
                                        <td style={{ width: '50%', textAlign: 'right', fontFamily: "verdana", fontWeight: "bold" }}>&#8377; {total_amount}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </Box>
                    </Box >
                    {know_more == true && <>
                        < Dialog open={know_more} sx={{ margin: 'auto', width: '600px', height: '590px' }}   >
                            <DialogContent >
                                <DialogContentText sx={{ width: '450px', height: "460px" }} >
                                    <Box sx={{ display: 'flex', alignItems: "center" }}>
                                        <Typography sx={{ flex: 11, color: 'black', fontWeight: 'bold', fontSize: '20px' }}>Convenience Fee</Typography>
                                        <span style={{ fontSize: '40px', cursor: 'pointer', fontWeight: 'normal', flex: 1, fontFamily: "TimesNewRoman" }} onClick={() => setKnow(false)}>&times;</span>
                                    </Box>
                                    <Box sx={{ marginTop: '10px', borderRadius: '10px', backgroundColor: 'rgb(240,240,240)' }}>
                                        <Typography sx={{ padding: '20px' }}>'Convenience Fee' comprises:</Typography>
                                        <ul style={{ marginRight: '20px' }}>
                                            <li style={{ fontWeight: 'normal', fontFamily: 'verdana', fontSize: '16px' }}>A flat platform charge, applicable to all customers including Myntra Insiders</li>
                                            <li style={{ fontWeight: 'normal', fontFamily: 'verdana', fontSize: '16px' }}>Shipping Charges for low value orders(Insiders are exempted from this) or higher than average returns </li>
                                        </ul>
                                        <Typography sx={{ paddingLeft: '20px', paddingTop: '10px' }}>Have a question? Refer<ListItem style={{ display: 'inline', color: 'rgb(243, 66, 140)', cursor: 'pointer' }} component={Link} to='/faqs'>FAQ'S </ListItem></Typography>
                                        <div style={{ marginLeft: '20px', marginTop: '20px', marginRight: '20px', height: '1px', backgroundColor: 'darkgrey' }}></div>
                                        <Typography sx={{ paddingLeft: '20px', paddingTop: '10px' }}>For further information ,refer to our <ListItem style={{ color: 'rgb(243, 66, 140)', cursor: 'pointer', display: 'inline' }} component={Link} to='/termsofuse'>Terms of use </ListItem></Typography>
                                        <br></br>
                                    </Box>
                                    <br></br>
                                </DialogContentText>
                            </DialogContent >
                        </Dialog >
                    </>
                    }
                </>}
            </>}
        </>
    )
}

const mapStateToProps = (cstate) => {
    return {
        user: cstate.user,
        payment_mode: cstate.payment_mode
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getPaymentMode: (data) => dispatch(getPaymentMode(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cartpayment);