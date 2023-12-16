import { Box, Typography, Button, TextField, Dialog, DialogContent, DialogContentText, ListItem } from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCartState } from '../../../Redux_Store/Action_Creators';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import CartGift from './CartGift';
import CartDeliveryAdr from './CartDeliveryAdr';
import PercentOutlinedIcon from '@mui/icons-material/PercentOutlined';
import WishlistToast from '../Wishlist_Toast';
import { getBagCount } from '../../../Redux_Store/Action_Creators';
import Loader from '../../../Loader/Loader';

const CartBag = (props) => {
    const [know_more, setKnow] = useState(false);
    const [apply_flag, setApplyFlag] = useState(false);
    const [setflag1, getFlag1] = useState(false);
    const [setflag2, getFlag2] = useState(false);
    const [cart_det, setCartDet] = useState([]);
    const [close_flag, setClose] = useState(false);
    const [total_cnt, setTotalCount] = useState(0);
    const [current_cnt, setCurrentCount] = useState(0);
    const [cart_item, setCartItem] = useState(true);

    const [total_mrp, setTotalMrp] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [total_amount, setTotalAmount] = useState(0);

    //save data which needs to be deleted or moved to wishlist
    const [pid, setPid] = useState()
    const [img, setImg] = useState()
    const [brand, setBrand] = useState();
    const [desc, setDesc] = useState();
    const [price, setPrice] = useState();
    const [strike_price, setStrikePrice] = useState();
    const [discnt, setDiscnt] = useState()
    const [comp, setComp] = useState();
    const [count, setCount] = useState();
    const [size, setSize] = useState();
    const [qty, setQty] = useState();
    const [vendoremail, setVendorEmail] = useState();

    //show more button
    const [show_flag, setShowFlag] = useState(false);

    //item not in stockcnt 
    const [notinstock, setNotInStock] = useState(0);
    //gift wrapped or not
    const [gift_flag, setGiftFlag] = useState(false);

    const [descnt, setDesCnt] = useState(0);

    //place order button disabled or not.
    const [disable, setDisable] = useState(true);

    //remove list 7 wishlist flag 
    const [remflag, setRemFlag] = useState(false);
    const [wishflag, setWishFlag] = useState(false);

    //Offer amount
    const [offer_amt, setOfferAmt] = useState(0);
    //iterate
    const [iterate, setIterate] = useState(0);
    let cnt = 0;

    const [loader, setLoader] = useState(false);
    const [inccnt, setIncCnt] = useState(0);

    useEffect(() => {
        if (props.user.user_id != undefined && props.user.user_id != '') {
            setLoader(true);
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_cart?user_id=${props.user.user_id}`)
                .then((data) => {
                    (data.data.length > 0) ? setCartDet(data.data.slice()) : setCartDet([]);
                })
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_cart_count?user_id=${props.user.user_id}`)
                .then((data) => {
                    if (data.data.data != 0) {
                        setTotalCount(data.data.data)
                        setCurrentCount(data.data.data)
                        props.getBagCount(data.data.data)
                    }
                    else {
                        setTotalCount()
                        setCurrentCount()
                        props.getBagCount()
                    }
                })
            document.title = 'SHOPPING BAG';
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_gift_wrap?user_id=${props.user.user_id}`)
                .then((data) => {
                    (data.data.length > 0) ? setGiftFlag(true) : setGiftFlag(false)
                })
            //delete details.
            axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_place_order?user_id=${props.user.user_id}`)
                .then((data) => { })

            axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_amount?user_id=${props.user.user_id}`)
                .then((data) => { })
            //get order details
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/order_count?user_id=${props.user.user_id}`)
                .then((data) => {
                    (data.data.data > 0) ? setOfferAmt(0) : setOfferAmt(200)
                    setLoader(false);
                })
        }
    }, [])
    useEffect(() => {
        if (cart_det.length > 0) {
            let total = 0;
            let dis = 0;
            setNotInStock(0);
            cart_det.map((li, index) => {
                let disc_value = 0;
                if (document.getElementById(`cart_list_item_${index}`) != undefined)
                    if (document.getElementById(`cart_list_item_${index}`).checked == true) {
                        total = total + li.strike_price;
                        disc_value = Math.ceil((li.discount * li.strike_price) / 100);
                        dis = dis + disc_value;
                    }
                function f0() {
                    if (li.count == 0)
                        setNotInStock(notinstock => notinstock + 1);
                }
                f0();
            })
            setTotalMrp(total);
            setDiscount(dis);
        }
    }, [cart_det])
    useEffect(() => {
        if (cart_item === true && cart_det.length > 0) {
            setNotInStock(0);
            cart_det.map((li, index) => {
                if (document.getElementById(`cart_list_item_${index}`) != undefined)
                    document.getElementById(`cart_list_item_${index}`).checked = true;
                setCurrentCount(total_cnt);
                function f0() {
                    if (li.count == 0)
                        setNotInStock(notinstock => notinstock + 1);
                }
                f0();
            })
            document.getElementById('cart_coupon').style.visibility = 'visible';
            document.getElementById('cart_convenience').style.visibility = 'visible';
            document.getElementById('cart_discount').style.visibility = 'visible';
            document.getElementById('cart_discount_rup').style.visibility = 'visible';
            document.getElementById('cart_discount_minus').style.visibility = 'visible';
            document.getElementById('cart_discount_price').style.visibility = 'visible';
            //condition.
            if (gift_flag === true) {
                document.getElementById('cart_gift_wrap').style.visibility = 'visible';
                document.getElementById('cart_gift_rup').style.visibility = 'visible';
                document.getElementById('cart_gift_price').style.visibility = 'visible';
            }
            function f1() {
                if (offer_amt > 0) {
                    document.getElementById('cart_first_order').style.visibility = 'visible';
                    document.getElementById('cart_first_order_rup').style.visibility = 'visible';
                    document.getElementById('cart_first_order_price').style.visibility = 'visible';
                    document.getElementById('cart_first_order_minus').style.visibility = 'visible';
                }
            }
            f1()
        }
        else if (cart_item === false && cart_det.length > 0) {
            setNotInStock(0);
            cart_det.map((li, index) => {
                if (document.getElementById(`cart_list_item_${index}`) != undefined)
                    document.getElementById(`cart_list_item_${index}`).checked = false;
                setCurrentCount(0);
                function f0() {
                    if (li.count == 0)
                        setNotInStock(notinstock => notinstock + 1);
                }
                f0();
            })
            document.getElementById('cart_coupon').style.visibility = 'hidden';
            document.getElementById('cart_convenience').style.visibility = 'hidden';
            document.getElementById('cart_discount').style.visibility = 'hidden';
            document.getElementById('cart_discount_rup').style.visibility = 'hidden';
            document.getElementById('cart_discount_minus').style.visibility = 'hidden';
            document.getElementById('cart_discount_price').style.visibility = 'hidden';
            if (gift_flag === true) {
                document.getElementById('cart_gift_wrap').style.visibility = 'hidden';
                document.getElementById('cart_gift_rup').style.visibility = 'hidden';
                document.getElementById('cart_gift_price').style.visibility = 'hidden';
            }
            function f1() {
                if (offer_amt > 0) {
                    document.getElementById('cart_first_order').style.visibility = 'hidden';
                    document.getElementById('cart_first_order_rup').style.visibility = 'hidden';
                    document.getElementById('cart_first_order_price').style.visibility = 'hidden';
                    document.getElementById('cart_first_order_minus').style.visibility = 'hidden';
                }
            }
            f1()
        }
    }, [cart_item])
    useEffect(() => {
        function fun3() {
            if (cart_det.length > 0) {
                if (current_cnt == 0 && document.getElementById('cart_item_disp') != undefined &&
                    document.getElementById('cart_coupon') != undefined && document.getElementById('cart_convenience') != undefined &&
                    document.getElementById('cart_discount') != undefined && document.getElementById('cart_discount_rup') != undefined
                    && document.getElementById('cart_discount_rup') != undefined &&
                    document.getElementById('cart_discount_minus') != undefined && document.getElementById('cart_discount_price') != undefined) {
                    document.getElementById('cart_item_disp').checked = false;
                    document.getElementById('cart_coupon').style.visibility = 'hidden';
                    document.getElementById('cart_convenience').style.visibility = 'hidden';
                    document.getElementById('cart_discount').style.visibility = 'hidden';
                    document.getElementById('cart_discount_rup').style.visibility = 'hidden';
                    document.getElementById('cart_discount_minus').style.visibility = 'hidden';
                    document.getElementById('cart_discount_price').style.visibility = 'hidden';
                    if (gift_flag === true) {
                        document.getElementById('cart_gift_wrap').style.visibility = 'hidden';
                        document.getElementById('cart_gift_rup').style.visibility = 'hidden';
                        document.getElementById('cart_gift_price').style.visibility = 'hidden';
                    }
                    function f1() {
                        if (offer_amt > 0) {
                            document.getElementById('cart_first_order').style.visibility = 'hidden';
                            document.getElementById('cart_first_order_rup').style.visibility = 'hidden';
                            document.getElementById('cart_first_order_price').style.visibility = 'hidden';
                            document.getElementById('cart_first_order_minus').style.visibility = 'hidden';
                        }
                    }
                    f1()
                    setTotalMrp(0);
                    setDiscount(0);
                    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_gift_wrap?user_id=${props.user.user_id}`)
                        .then((data) => {
                            if (data.data.deletedCount == 1) {
                                toast(<WishlistToast text='Gift wrap removed!' />, {
                                    position: toast.POSITION.TOP_RIGHT,
                                    autoClose: 3000
                                })
                            }
                        })
                }
                else if (current_cnt > 0) {
                    if (cart_det.length > 0 && document.getElementById('cart_item_disp') != undefined &&
                        document.getElementById('cart_coupon') != undefined && document.getElementById('cart_convenience') != undefined &&
                        document.getElementById('cart_discount') != undefined && document.getElementById('cart_discount_rup') != undefined
                        && document.getElementById('cart_discount_rup') != undefined &&
                        document.getElementById('cart_discount_minus') != undefined && document.getElementById('cart_discount_price') != undefined) {
                        document.getElementById('cart_item_disp').checked = true;
                        document.getElementById('cart_coupon').style.visibility = 'visible';
                        document.getElementById('cart_convenience').style.visibility = 'visible';
                        document.getElementById('cart_discount').style.visibility = 'visible';
                        document.getElementById('cart_discount_rup').style.visibility = 'visible';
                        document.getElementById('cart_discount_minus').style.visibility = 'visible';
                        document.getElementById('cart_discount_price').style.visibility = 'visible';
                        if (gift_flag === true) {
                            document.getElementById('cart_gift_wrap').style.visibility = 'visible';
                            document.getElementById('cart_gift_rup').style.visibility = 'visible';
                            document.getElementById('cart_gift_price').style.visibility = 'visible';
                        }
                    }
                    function f1() {
                        if (offer_amt > 0) {
                            document.getElementById('cart_first_order').style.visibility = 'visible';
                            document.getElementById('cart_first_order_rup').style.visibility = 'visible';
                            document.getElementById('cart_first_order_price').style.visibility = 'visible';
                            document.getElementById('cart_first_order_minus').style.visibility = 'visible';
                        }
                    }
                    f1()
                    axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_gift_wrap?user_id=${props.user.user_id}`)
                        .then((data) => {
                            if (data.data.length > 0)
                                setGiftFlag(true)
                            else
                                setGiftFlag(false);
                        })
                    if (cart_det.length > 0) {
                        let total = 0;
                        let dis = 0;
                        setNotInStock(0);
                        cart_det.map((li, index) => {
                            let disc_value = 0;
                            if (document.getElementById(`cart_list_item_${index}`) != undefined)
                                if (document.getElementById(`cart_list_item_${index}`).checked == true) {
                                    total = total + li.strike_price;
                                    disc_value = Math.ceil((li.discount * li.strike_price) / 100);
                                    dis = dis + disc_value;
                                }
                            function f0() {
                                if (li.count == 0)
                                    setNotInStock(notinstock => notinstock + 1);
                            }
                            f0();
                        })
                        setTotalMrp(total);
                        setDiscount(dis);
                    }
                }
            }
        }
        fun3()
    }, [current_cnt])
    useEffect(() => {
        setLoader(true);
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_gift_wrap?user_id=${props.user.user_id}`)
            .then((data) => {
                (data.data.length > 0) ? setGiftFlag(true) : setGiftFlag(false);
                setLoader(false);
            })
    }, [props])
    useEffect(() => {
        if (total_mrp != 0) {
            let final = 0;
            function f01() {
                if (gift_flag == false) {
                    final = total_mrp + Number(document.getElementById('cart_conv_fee').innerText);
                    if (discount != 0) {
                        final = final - discount;
                    }
                }
                else if (gift_flag == true) {
                    final = total_mrp + Number(document.getElementById('cart_conv_fee').innerText) + 25;
                    if (discount != 0) {
                        final = final - discount;
                    }
                }
            }
            function f1() {
                if (offer_amt > 0 && total_mrp > 0 && total_amount >= 0) {
                    final = final - offer_amt;
                }
            }
            f01();
            f1()
            setTotalAmount(final);
        }
        else {
            setTotalAmount(0)
        }
    }, [total_mrp, gift_flag])
    useEffect(() => {
        if (document.getElementById('show_flag') != undefined) {
            if (show_flag === true) {
                document.getElementById('show_flag').innerText = 'Show Less';
            }
            else if (show_flag === false) {
                document.getElementById('show_flag').innerText = 'Show More';
            }
        }
    }, [show_flag])
    useEffect(() => {
        if (total_amount > 0)
            setDisable(false)
        else if (total_amount == 0)
            setDisable(true)
    }, [total_amount])
    useEffect(() => {
        if ((setflag1 == true) && (setflag2 == true)) {
            props.setCartState('Address');
        }
    }, [setflag2])
    useEffect(() => {
        if (props.user.user_id != undefined && props.user.user_id != '') {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_cart?user_id=${props.user.user_id}`)
                .then(async (data) => {
                    (data.data.length > 0) ? setCartDet(data.data.slice()) : setCartDet([]);
                    setLoader(false);
                })
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_cart_count?user_id=${props.user.user_id}`)
                .then((data) => {
                    if (data.data.data != 0) {
                        setTotalCount(data.data.data)
                        setCurrentCount(data.data.data)
                        props.getBagCount(data.data.data)
                    }
                    else {
                        setTotalCount(0)
                        setCurrentCount(0)
                        props.getBagCount(0)
                    }
                })
        }
    }, [iterate])
    useEffect(() => {
        if (inccnt > 0) {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/delete_user_wishlistprofile`)
                .then((data) => { })
        }
    }, [inccnt])
    useEffect(() => {
        if (descnt > 0) {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/delete_placeorder_img`)
                .then((data) => { })
        }
    }, [descnt])
    return (
        <>
            {loader == true ? <Loader /> : <>
                <ToastContainer hideProgressBar={true} className='toastcontainer' bodyClassName='toastbody' closeButton={false} />
                <Box sx={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '99px' }}>
                    {/* Left Pane */}
                    <Box sx={{ borderRight: '1px solid lightgrey', flex: '7' }}>
                        <Box sx={{ display: 'flex', marginTop: '40px' }}>
                            {/* Left Gap */}
                            <Box sx={{ flex: 3 }}></Box>
                            {/* Right Text */}
                            <Box sx={{ flex: 9, marginRight: '25px' }}>
                                {/* Div1 */}
                                <Box sx={{ flex: 9, border: '1px solid lightgrey', marginRight: '25px' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                        <CartDeliveryAdr />
                                    </Box>
                                </Box>
                                {/* Div 1.1 */}
                                <Box sx={{ padding: "10px", marginTop: "20px", flex: 9, border: '1px solid lightgrey', marginRight: '25px' }}>
                                    <Box sx={{ display: 'flex', alignItems: "center", marginTop: "10px" }}>
                                        < PercentOutlinedIcon sx={{ fontWeight: "bold", flex: 1, fontSize: "20px" }} />
                                        <Typography sx={{ fontWeight: "bold", flex: 11 }}> Available Offers</Typography>
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
                                        disableTouchRipple id='show_flag'
                                        onClick={() => setShowFlag(!show_flag)}>Show More</Button>
                                </Box>
                                {/* Div2 */}
                                <Box sx={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
                                    <input type='checkbox' style={{ accentColor: "rgb(243, 66, 140)", width: '19px', height: "19px", cursor: "pointer" }} id='cart_item_disp' defaultChecked
                                        onChange={(e) => setCartItem(e.currentTarget.checked)} /><label htmlFor='cart_item_disp' style={{ marginLeft: '10px', fontWeight: "bold", fontFamily: 'verdana' }}>{`${current_cnt}/${total_cnt} ITEMS SELECTED`}</label>
                                    <Box sx={{ flex: 2 }}></Box>
                                    <Button disableTouchRipple sx={{
                                        fontWeight: 'bold',
                                        flex: 4, backgroundColor: 'transparent', color: 'black',
                                        '&:hover': { backgroundColor: 'transparent', color: 'black' }
                                    }} onClick={(e) => {
                                        if (current_cnt == 0) {
                                            alert('Select any item to remove from bag')
                                        }
                                        else if (current_cnt > 0)
                                            setRemFlag(true);
                                    }}>REMOVE</Button>
                                    <Typography sx={{ flex: 1 }}>|</Typography>
                                    <Button disableTouchRipple sx={{
                                        fontWeight: 'bold',
                                        flex: 6, backgroundColor: 'transparent', color: 'black',
                                        '&:hover': { backgroundColor: 'transparent', color: 'black' }
                                    }}
                                        onClick={(e) => {
                                            if (current_cnt == 0) {
                                                alert('Select any item to remove from bag')
                                            }
                                            else if (current_cnt > 0)
                                                setWishFlag(true);
                                        }}>MOVE TO WISHLIST</Button>
                                </Box>
                                {/* Div3 */}
                                {cart_det.length > 0 && cart_det.map((li, index) => {
                                    let date = new Date(new Date().setDate(new Date().getDate() + 1 + index));
                                    return (
                                        <>
                                            <Box sx={{ marginTop: "30px", width: '100%', border: '1px solid lightgrey', borderRadius: "5px" }}>
                                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                                    <input type='checkbox' className='checkboxing'
                                                        defaultChecked
                                                        onChange={(e) => {
                                                            if (e.currentTarget.checked === true) {
                                                                setCurrentCount(current_cnt + 1)
                                                            }
                                                            else if (e.currentTarget.checked === false) {
                                                                setCurrentCount(current_cnt - 1)
                                                            }
                                                        }} id={`cart_list_item_${index}`} />
                                                    <img style={{
                                                        padding: '20px',
                                                        flex: 1
                                                    }} src={`data:image/png;base64,${li.image}`} width='150px' height='200px' alt='loading' />
                                                    <Box sx={{ flex: 11, marginLeft: '10px' }}>

                                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                            <Typography sx={{ flex: 11, fontWeight: "bold" }}>{li.brand_name}</Typography>
                                                            <span style={{ fontSize: '40px', fontFamily: "TimesNewRoman", cursor: 'pointer', fontWeight: 'normal', flex: 1 }}
                                                                onClick={() => {
                                                                    setClose(true);
                                                                    setPid(li.product_id);
                                                                    setImg(li.image);
                                                                    setBrand(li.brand_name);
                                                                    setDesc(li.description);
                                                                    setVendorEmail(li.vendor_email);
                                                                    setPrice(li.price);
                                                                    setStrikePrice(li.strike_price);
                                                                    setDiscnt(li.discount);
                                                                    setComp(li.comp_name);
                                                                    setCount(li.count);
                                                                    setSize(li.size);
                                                                    setQty(li.qty);
                                                                }} >&times;</span>
                                                        </Box>
                                                        <Typography >{li.description}</Typography>
                                                        <Typography sx={{ marginTop: "5px", color: "grey" }}>Sold by : {li.comp_name}</Typography>
                                                        <Typography sx={{ marginTop: "5px", fontWeight: "bold" }}>Size: {li.size} Qty:{li.qty}</Typography>
                                                        <Typography sx={{ marginTop: "5px", fontWeight: 'bold' }}>&#8377;{li.price} <del style={{ color: "grey" }}>&#8377;{li.strike_price}</del> <span style={{ color: "red", fontWeight: 'normal', fontFamily: "verdana" }}>{li.discount}% OFF</span></Typography>
                                                        <Typography sx={{ marginTop: "5px" }}><span>14 days</span> return available</Typography>
                                                        {li.count <= 0 &&
                                                            <Typography sx={{ color: "red", padding: "10px", fontWeight: "bold", fontFamily: "cursive" }} >ITEM NOT IN STOCK !!</Typography>}
                                                        {li.count > 0 &&
                                                            <Typography sx={{ marginTop: "5px" }} >Delivery by <span style={{ fontFamily: 'verdana', fontWeight: "bold" }}>{date.toLocaleString('hi-EN').toUpperCase()}</span> </Typography>
                                                        }
                                                    </Box>
                                                </Box>
                                            </Box >
                                        </>
                                    )
                                })}
                                {/* Div 4 */}
                                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '40px', border: '1px solid lightgrey', borderRadius: '4px', height: '60px' }}>
                                    <BookmarkBorderOutlinedIcon sx={{ marginLeft: '20px' }} />
                                    <Typography sx={{ flex: 6, marginLeft: '20px', textDecoration: 'none', color: 'black', fontWeight: 'bold', textDecoration: "underline" }} component={Link} to='/wishlist'>Add More From Wishlist</Typography>
                                    <ArrowForwardIosOutlinedIcon sx={{ flex: 1 }} />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    {/* Right Pane */}
                    <Box sx={{ flex: 5 }}>
                        <Box sx={{ width: '500px' }}>
                            <Typography variant='body1' sx={{ fontSize: '15px', marginLeft: '20px', marginTop: '20px', fontWeight: 'bold', color: 'grey' }}>COUPONS</Typography>
                            <Box sx={{ marginTop: '20px', display: 'flex', justifyContent: 'space-evenly' }}>
                                <LocalOfferIcon sx={{ flex: 1 }} />
                                <Typography variant='body1' sx={{ flex: 5, fontWeight: 'bold' }}
                                >Apply Coupons</Typography>
                                <Button disableTouchRipple variant='outlined' sx={{
                                    flex: 1, fontWeight: 'bold',
                                    color: 'rgb(250, 50, 84)', backgroundColor: 'transparent', border: '1px solid  rgb(250, 50, 84)',
                                    '&:hover': { backgroundColor: 'transparent', color: 'rgb(250, 50, 84)', border: '1px solid  rgb(250, 50, 84)' }
                                }} onClick={() => setApplyFlag(true)}>APPLY</Button>
                            </Box>
                            <div style={{ marginTop: '20px', marginLeft: '20px', borderBottom: '1px solid lightgrey', backgroundColor: 'grey' }}></div>
                            <Typography variant='body1' sx={{ fontSize: '15px', marginLeft: '20px', marginTop: '20px', fontWeight: 'bold', color: 'grey' }}>GIFTING & PERSONALIZATION</Typography>
                            <CartGift />
                            <div style={{ marginTop: '20px', marginLeft: '20px', borderBottom: '1px solid lightgrey', backgroundColor: 'grey' }}></div>
                            <Typography variant='body1' sx={{ fontSize: '15px', marginLeft: '20px', marginTop: '20px', fontWeight: 'bold', color: 'grey' }}>PRICE DETAILS <span style={{ color: 'black' }}>({current_cnt} items)</span></Typography>
                            <table style={{
                                marginTop: '20px', marginLeft: '25px', width: '95% ', paddingRight: '10px'
                            }}>
                                <tbody>
                                    <tr style={{ height: '40px' }}>
                                        <td style={{ width: '95%' }} className='cartrow'>Total MRP</td>
                                        <td style={{ width: '2%', textAlign: 'right' }} className='cartrow'>&#8377;</td>
                                        <td style={{ width: '3%', textAlign: 'right' }} id='cart_mrp_price' className='cartrow'>{total_mrp} </td>
                                    </tr>
                                    <tr style={{ height: '40px' }}>
                                        <td style={{ width: '94%' }} className='cartrow' id='cart_discount'>Discount on  MRP</td>
                                        <td style={{ width: "1%", textAlign: 'right', color: 'rgb(72, 185, 157)' }} className='cartrow' id='cart_discount_rup' > &#8377;  </td>
                                        <td style={{ width: '3%', textAlign: 'right', color: 'rgb(72, 185, 157)' }} className='cartrow' id='cart_discount_price'>{discount}</td>
                                        <td style={{ width: "2%", textAlign: 'right', color: 'rgb(72, 185, 157)' }} className='cartrow' id='cart_discount_minus'>&#8722;</td>
                                    </tr>
                                    <tr style={{ height: '40px' }} id='cart_coupon'>
                                        <td style={{ width: '32%' }} className='cartrow'>Coupon Discount</td>
                                        <td style={{
                                            cursor: 'pointer', fontFamily: "verdana", fontSize: '16px',
                                            width: '40%', fontWeight: 'normal', marginLeft: '14px', textAlign: "right",
                                            color: 'rgb(250, 50, 84)'
                                        }} onClick={() => { setApplyFlag(true) }} className='cartrow'>Apply Coupon</td>
                                    </tr>
                                    <tr style={{ height: '40px' }} id='cart_convenience'>
                                        <td style={{ width: '95%' }} className='cartrow'>Convenience Fee <Button
                                            disableTouchRipple sx={{
                                                fontWeight: 'bold', color: 'rgb(250, 50, 84)', textTransform: 'none',
                                                '&:hover': { backgroundColor: 'transparent' }
                                            }} onClick={() => setKnow(true)}>Know More</Button></td>
                                        <td style={{ width: '2%', textAlign: 'right' }} className='cartrow'>&#8377;</td>
                                        <td style={{ width: '2%', textAlign: 'right' }} className='cartrow' id='cart_conv_fee'>15</td>
                                    </tr>
                                    <tr style={{ height: '40px' }}>
                                        <td style={{ width: '95%' }} className='cartrow' id='cart_gift_wrap'>Gift WrapCharges</td>
                                        <td style={{ width: '2%', textAlign: 'right' }} className='cartrow' id='cart_gift_rup' >&#8377;</td>
                                        <td style={{ width: '3%', textAlign: 'right' }} className='cartrow' id='cart_gift_price'>25</td>
                                    </tr>
                                    <tr style={{ height: '40px' }}>
                                        <td style={{ width: '94%' }} className='cartrow' id='cart_first_order'>First Offer</td>
                                        <td style={{ width: "1%", textAlign: 'right', color: 'rgb(72, 185, 157)' }} className='cartrow' id='cart_first_order_rup' > &#8377;  </td>
                                        <td style={{ width: '3%', textAlign: 'right', color: 'rgb(72, 185, 157)' }} className='cartrow' id='cart_first_order_price'>{offer_amt}</td>
                                        <td style={{ width: "2%", textAlign: 'right', color: 'rgb(72, 185, 157)' }} className='cartrow' id='cart_first_order_minus'>&#8722;</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div style={{ marginTop: '20px', marginLeft: '20px', borderBottom: '1px solid lightgrey', backgroundColor: 'grey' }}></div>
                            <table style={{ marginTop: '20px', marginLeft: '25px', width: '95%', paddingRight: '10px' }}>
                                <tbody>
                                    <tr style={{ height: '40px' }}>
                                        <td style={{ width: '95%' }}>Total Amount</td>
                                        <td style={{ width: '2%', textAlign: 'right' }} className='cartrow'>&#8377;</td>
                                        <td style={{ width: '3%', textAlign: 'right' }} id='cart_total_amount' >{total_amount}</td>
                                    </tr>
                                </tbody>
                            </table>
                            {notinstock > 0 && <Button sx={{
                                cursor: 'pointer',
                                marginTop: '20px', marginLeft: '20px',
                                width: '93%',
                                color: 'white', backgroundColor: 'rgb(250, 50, 84)'
                                , '&:hover': { backgroundColor: 'rgb(250, 50, 84)', color: 'white' }
                            }}
                                onClick={() => alert('Kindly remove the Not in Stock Item from order !!')}>PLACE ORDER</Button>}
                            {notinstock == 0 && <Button sx={{
                                cursor: 'pointer',
                                marginTop: '20px', marginLeft: '20px',
                                width: '93%',
                                color: 'white', backgroundColor: 'rgb(250, 50, 84)'
                                , '&:hover': { backgroundColor: 'rgb(250, 50, 84)', color: 'white' }
                            }} onClick={async () => {
                                async function fun1() {
                                    let gift = 0;
                                    if (gift_flag === true)
                                        gift = 25;
                                    else if (gift_flag === false)
                                        gift = 0;
                                    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/add_amount`, {
                                        'user_id': props.user.user_id,
                                        'total_mrp': total_mrp,
                                        'discount_mrp': discount,
                                        'total_count': current_cnt,
                                        'conv_fee': 15,
                                        'gift_amt': gift,
                                        'total_amount': total_amount,
                                        'offer_amt': offer_amt,
                                    })
                                        .then((data) => {
                                            if (data.data.user_id != 0)
                                                getFlag1(true);
                                        })
                                    cart_det.map(async (li, index) => {
                                        getFlag2(false);
                                        if (document.getElementById(`cart_list_item_${index}`) != undefined) {
                                            if (document.getElementById(`cart_list_item_${index}`).checked === true) {
                                                // generate file from base64 string
                                                const dataURLtoFile = (dataurl, filename) => {
                                                    const arr = dataurl.split(',')
                                                    const mime = arr[0].match(/:(.*?);/)[1]
                                                    const bstr = atob(arr[1])
                                                    let n = bstr.length
                                                    const u8arr = new Uint8Array(n)
                                                    while (n) {
                                                        u8arr[n - 1] = bstr.charCodeAt(n - 1)
                                                        n -= 1 // to make eslint happy
                                                    }
                                                    return new File([u8arr], filename, { type: mime })
                                                }
                                                const file = dataURLtoFile(`data:image/png;base64,${li.image}`, 'place_order_img.png');
                                                if (file != undefined) {
                                                    let formData = new FormData();
                                                    formData.append('user_id', props.user.user_id);
                                                    formData.append('user_email', props.user.user_mailid);
                                                    formData.append('vendor_email', li.vendor_email);
                                                    formData.append('brand', li.brand_name);
                                                    formData.append('price', li.price);
                                                    formData.append('strike_price', li.strike_price);
                                                    formData.append('discount', li.discount);
                                                    formData.append('size', li.size);
                                                    formData.append('qty', li.qty);
                                                    formData.append('description', li.description);
                                                    formData.append('pid', li.product_id);
                                                    formData.append('orderimg', file);
                                                    formData.append('count', li.count);
                                                    formData.append('del', new Date(new Date().setDate(new Date().getDate() + 1 + index)));
                                                    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/place_order`, formData, {
                                                        headers: {
                                                            "Content-Type": 'multipart-formdata'
                                                        }
                                                    })
                                                        .then(async (data) => {
                                                            if (data.data.user_id != 0) {
                                                                cnt = await cnt + 1;
                                                                if (cnt == current_cnt) {
                                                                    getFlag2(true);
                                                                }
                                                                setDesCnt(descnt => descnt + 1);
                                                            }
                                                            else
                                                                getFlag2(false)
                                                        })

                                                }
                                            }
                                        }
                                    })
                                }
                                fun1();
                            }}
                                disabled={disable}>PLACE ORDER</Button>}
                            <br></br>
                            <br></br>
                        </Box>
                    </Box >
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

                {
                    apply_flag == true && <>
                        < Dialog open={apply_flag} sx={{ margin: 'auto', width: '600px', height: '640px' }}   >
                            <DialogContent >
                                <DialogContentText sx={{ width: '450px', height: "500px" }} >
                                    <Box sx={{ display: 'flex', alignItems: "center" }}>
                                        <Typography sx={{ flex: 11, color: 'black', fontWeight: 'bold', fontSize: '15px' }}>APPLY COUPON</Typography>
                                        <span style={{ fontSize: '40px', cursor: 'pointer', fontWeight: 'normal', flex: 1, fontFamily: "TimesNewRoman" }} onClick={() => setApplyFlag(false)}>&times;</span>
                                    </Box>
                                    <div style={{ marginTop: '10px', marginLeft: '-20px', marginRight: '-14px', height: '1px', backgroundColor: 'lightgrey' }}></div>
                                    <TextField variant='outlined' placeholder='Enter coupon code' sx={{ marginTop: '25px', width: '100%' }}
                                    />
                                    <Box sx={{ marginTop: '10px', backgroundColor: 'rgb(240,240,240)', height: '240px' }}>
                                        <Typography sx={{ padding: '20px', marginTop: '20px' }}>No other coupons availble</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: "20px" }}>
                                        <Box sx={{ flex: 6 }}>
                                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                <Typography>Maximum savings:</Typography>
                                                <Typography>&#8377;0</Typography>
                                            </Box>
                                        </Box>
                                        <Button sx={{ color: 'white', flex: 6, backgroundColor: "rgb(243, 66, 140)", '&:hover': { color: 'white', backgroundColor: "rgb(243, 66, 140)" } }}>APPLY</Button>
                                    </Box>
                                    <br></br>
                                </DialogContentText>
                            </DialogContent >
                        </Dialog >
                    </>
                }
                {
                    close_flag === true && <>
                        < Dialog open={close_flag} sx={{ margin: 'auto', width: '600px', height: '360px' }}   >
                            <DialogContent >
                                <DialogContentText sx={{ width: '450px', height: "160px" }} >
                                    <Box sx={{ display: 'flex', marginTop: '5px' }}>
                                        <img src={`data:image/png;base64,${img}`} width='70px' height='80px' alt='loading' />
                                        <Box sx={{ flex: 10, marginLeft: "20px" }}>
                                            <Box sx={{ display: "flex", flexDirection: 'column' }}>
                                                <Typography sx={{ fontWeight: "bold", fontFamily: "Arial", color: "black" }}>Move From bag</Typography>
                                                <Typography sx={{ marginTop: "10px", fontFamily: "Arial", color: 'grey' }}>Are you sure you want to move this item from bag ?</Typography>
                                            </Box>
                                        </Box>
                                        <span style={{ fontSize: '40px', cursor: 'pointer', fontWeight: 'normal', flex: 1, fontFamily: "TimesNewRoman", marginTop: '-10px' }} onClick={() => setClose(false)}>&times;</span>
                                    </Box>
                                    <div style={{ backgroundColor: 'lightgrey', height: '1px', marginTop: '15px' }}></div>
                                    <Box sx={{ display: 'flex', alignItems: "center", marginTop: '25px' }}>
                                        <Button sx={{ backgroundColor: "white", color: "grey", fontWeight: "bold", flex: 5, '&:hover': { color: "grey", backgroundColor: "white" } }}
                                            onClick={() => {
                                                setLoader(true);
                                                axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_cart_pid?user_id=${props.user.user_id}&pid=${pid}`)
                                                    .then(async (data) => {
                                                        if (data.data.deletedCount == 1) {
                                                            toast(<WishlistToast image={img} text='Item removed from Bag' />, {
                                                                position: toast.POSITION.TOP_RIGHT,
                                                                autoClose: 3000
                                                            })
                                                            setIterate(iterate => iterate + 1);
                                                        }
                                                        else
                                                            toast(<WishlistToast text='Error , Please retry!' />, {
                                                                position: toast.POSITION.TOP_RIGHT,
                                                                autoClose: 3000
                                                            })
                                                        setLoader(false);
                                                    })
                                            }}>REMOVE</Button>
                                        <Typography sx={{ flex: 2 }}>|</Typography>
                                        <Button sx={{ backgroundColor: "white", color: 'rgb(243, 66, 140)', fontWeight: 'bold', flex: 5, '&:hover': { color: "rgb(243, 66, 140)", backgroundColor: "white" } }}
                                            onClick={async () => {
                                                setLoader(true);
                                                // generate file from base64 string
                                                const dataURLtoFile = (dataurl, filename) => {
                                                    const arr = dataurl.split(',')
                                                    const mime = arr[0].match(/:(.*?);/)[1]
                                                    const bstr = atob(arr[1])
                                                    let n = bstr.length
                                                    const u8arr = new Uint8Array(n)
                                                    while (n) {
                                                        u8arr[n - 1] = bstr.charCodeAt(n - 1)
                                                        n -= 1
                                                    }
                                                    return new File([u8arr], filename, { type: mime })
                                                }
                                                const file = dataURLtoFile(`data:image/png;base64,${img}`, 'cart_remove.png');
                                                if (file != undefined) {
                                                    let formData = new FormData();
                                                    formData.append('user_id', props.user.user_id);
                                                    formData.append('vendor_email', vendoremail);
                                                    formData.append('product_id', pid);
                                                    formData.append('description', desc);
                                                    formData.append('brand_name', brand);
                                                    formData.append('price', price);
                                                    formData.append('strike_price', strike_price);
                                                    formData.append('discount', discnt);
                                                    formData.append('user_wish', file);
                                                    formData.append('comp_name', comp);
                                                    formData.append('count', count);
                                                    formData.append('size', size);
                                                    formData.append('qty', qty);

                                                    const add_wishlist = axios.post(`${process.env.REACT_APP_BACKEND_URL}/add_user_wishlist`, formData, {
                                                        headers: {
                                                            "Content-Type": 'multipart-formdata'
                                                        }
                                                    })
                                                    const delete_cart = axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_cart_pid?user_id=${props.user.user_id}&pid=${pid}`)
                                                    await axios.all([delete_cart, add_wishlist])
                                                        .then(axios.spread(async function (cart, wish) {
                                                            if (cart.data.deletedCount == 1 && wish.data.msg === 'success') {
                                                                toast(<WishlistToast image={img} text='Item moved to Wishlist' />, {
                                                                    position: toast.POSITION.TOP_RIGHT,
                                                                    autoClose: 3000
                                                                })
                                                                let i = iterate + 1;
                                                                setIterate(i);
                                                                setIncCnt(inccnt => inccnt + 1);
                                                            }
                                                            else
                                                                toast(<WishlistToast text='Error , Please retry!!' />, {
                                                                    position: toast.POSITION.TOP_RIGHT,
                                                                    autoClose: 3000
                                                                })
                                                            setLoader(false);
                                                        }))
                                                }

                                            }}>MOVE TO WISHLIST</Button>
                                    </Box>
                                </DialogContentText>
                            </DialogContent >
                        </Dialog >
                    </>
                }
                {
                    remflag === true && <>
                        < Dialog open={remflag} sx={{ margin: 'auto', width: '600px', height: '360px' }}   >
                            <DialogContent >
                                <DialogContentText sx={{ width: '450px', height: "160px" }} >
                                    <Box sx={{ display: 'flex', marginTop: '5px' }}>
                                        <Typography sx={{ flex: 11, marginTop: "10px", fontFamily: "Arial", color: 'black', fontWeight: 'bold' }}>Remove {current_cnt} item</Typography>
                                        <span style={{ color: "black", fontSize: '40px', cursor: 'pointer', fontWeight: 'normal', flex: 1, fontFamily: "TimesNewRoman", marginTop: '-10px' }} onClick={() => setRemFlag(false)}>&times;</span>
                                    </Box>
                                    <Typography sx={{ color: 'black' }}>Are you sure you want to remove {current_cnt} item from bag.</Typography>
                                    <div style={{ backgroundColor: 'lightgrey', height: '1px', marginTop: '35px' }}></div>
                                    <Box sx={{ display: 'flex', alignItems: "center", marginTop: '15px' }}>
                                        <Button sx={{ backgroundColor: "white", color: "grey", fontFamily: "verdana", fontWeight: "bold", flex: 5, '&:hover': { color: "grey", backgroundColor: "white" } }}
                                            onClick={async () => {
                                                setLoader(true);
                                                await cart_det.map(async (li, index) => {
                                                    if (document.getElementById(`cart_list_item_${index}`) != undefined)
                                                        if (document.getElementById(`cart_list_item_${index}`).checked === true) {
                                                            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_cart_pid?user_id=${props.user.user_id}&pid=${li.product_id}`)
                                                                .then(async (data) => {
                                                                    if (data.data.deletedCount == 1) {
                                                                        toast(<WishlistToast image={li.image} text='Item removed from Bag' />, {
                                                                            position: toast.POSITION.TOP_RIGHT,
                                                                            autoClose: 3000
                                                                        })
                                                                    }
                                                                    else
                                                                        toast(<WishlistToast text='Error ! Please retry' />, {
                                                                            position: toast.POSITION.TOP_RIGHT,
                                                                            autoClose: 3000
                                                                        })
                                                                })
                                                        }
                                                })
                                                setIterate(iterate => iterate + 1)
                                            }}>REMOVE</Button>
                                        <Typography sx={{ flex: 2 }}>|</Typography>
                                        <Button sx={{ fontFamily: "verdana", backgroundColor: "white", color: 'rgb(243, 66, 140)', fontWeight: 'bold', flex: 5, '&:hover': { color: "rgb(243, 66, 140)", backgroundColor: "white" } }}
                                            onClick={async () => {
                                                setLoader(true);
                                                await cart_det.map(async (li, index) => {
                                                    if (document.getElementById(`cart_list_item_${index}`) != undefined)
                                                        if (document.getElementById(`cart_list_item_${index}`).checked === true) {
                                                            // generate file from base64 string
                                                            const dataURLtoFile = (dataurl, filename) => {
                                                                const arr = dataurl.split(',')
                                                                const mime = arr[0].match(/:(.*?);/)[1]
                                                                const bstr = atob(arr[1])
                                                                let n = bstr.length
                                                                const u8arr = new Uint8Array(n)
                                                                while (n) {
                                                                    u8arr[n - 1] = bstr.charCodeAt(n - 1)
                                                                    n -= 1 // to make eslint happy
                                                                }
                                                                return new File([u8arr], filename, { type: mime })
                                                            }
                                                            const file = dataURLtoFile(`data:image/png;base64,${li.image}`, 'cart_remove.png');
                                                            if (file != undefined) {
                                                                let formData = new FormData();
                                                                formData.append('user_id', props.user.user_id);
                                                                formData.append('product_id', li.product_id);
                                                                formData.append('vendor_email', li.vendor_email);
                                                                formData.append('description', li.description);
                                                                formData.append('brand_name', li.brand_name);
                                                                formData.append('price', li.price);
                                                                formData.append('strike_price', li.strike_price);
                                                                formData.append('discount', li.discount);
                                                                formData.append('user_wish', file);
                                                                formData.append('comp_name', li.comp_name);
                                                                formData.append('count', li.count);
                                                                formData.append('size', li.size);
                                                                formData.append('qty', li.qty);
                                                                let delete_cart = axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_cart_pid?user_id=${props.user.user_id}&pid=${li.product_id}`);
                                                                let add_wish = axios.post(`${process.env.REACT_APP_BACKEND_URL}/add_user_wishlist`, formData, {
                                                                    headers: {
                                                                        "Content-Type": 'multipart-formdata'
                                                                    }
                                                                })
                                                                await axios.all([delete_cart, add_wish])
                                                                    .then(axios.spread(async function (cart, wish) {
                                                                        if (cart.data.deletedCount == 1 && wish.data.msg === 'success') {
                                                                            toast(<WishlistToast image={li.image} text='Item moved to Wishlist' />, {
                                                                                position: toast.POSITION.TOP_RIGHT,
                                                                                autoClose: 3000
                                                                            })
                                                                            setIncCnt(inccnt => inccnt + 1);
                                                                        }
                                                                        else
                                                                            toast(<WishlistToast text='Error Please retry!!' />, {
                                                                                position: toast.POSITION.TOP_RIGHT,
                                                                                autoClose: 3000
                                                                            })
                                                                    }))

                                                            }
                                                        }
                                                })
                                                setIterate(iterate => iterate + 1);
                                            }}>MOVE TO WISHLIST</Button>
                                    </Box>
                                </DialogContentText>
                            </DialogContent >
                        </Dialog >
                    </>
                }
                {
                    wishflag === true && <>
                        < Dialog open={wishflag} sx={{ margin: 'auto', width: '600px', height: '360px' }}   >
                            <DialogContent >
                                <DialogContentText sx={{ width: '450px', height: "160px" }} >
                                    <Box sx={{ display: 'flex', marginTop: '5px' }}>
                                        <Typography sx={{ flex: 11, marginTop: "10px", fontFamily: "Arial", color: 'black', fontWeight: 'bold' }}>Move {current_cnt} item to wishlist</Typography>
                                        <span style={{ color: "black", fontSize: '40px', cursor: 'pointer', fontWeight: 'normal', flex: 1, fontFamily: "TimesNewRoman", marginTop: '-10px' }} onClick={() => setWishFlag(false)}>&times;</span>
                                    </Box>
                                    <Typography sx={{ color: 'black' }}>Are you sure you want to move {current_cnt} item from bag.</Typography>
                                    <div style={{ backgroundColor: 'lightgrey', height: '1px', marginTop: '35px' }}></div>
                                    <Box sx={{ display: 'flex', alignItems: "center", marginTop: '15px' }}>
                                        <Button sx={{ backgroundColor: "white", color: "grey", fontFamily: "verdana", fontWeight: "bold", flex: 5, '&:hover': { color: "grey", backgroundColor: "white" } }}
                                            onClick={() => setWishFlag(false)}> CANCEL</Button>
                                        <Typography sx={{ flex: 2 }}>|</Typography>
                                        <Button sx={{ fontFamily: "verdana", backgroundColor: "white", color: 'rgb(243, 66, 140)', fontWeight: 'bold', flex: 5, '&:hover': { color: "rgb(243, 66, 140)", backgroundColor: "white" } }}
                                            onClick={async () => {
                                                setLoader(true);
                                                await cart_det.map(async (li, index) => {
                                                    if (document.getElementById(`cart_list_item_${index}`) != undefined)
                                                        if (document.getElementById(`cart_list_item_${index}`).checked === true) {
                                                            // generate file from base64 string
                                                            const dataURLtoFile = (dataurl, filename) => {
                                                                const arr = dataurl.split(',')
                                                                const mime = arr[0].match(/:(.*?);/)[1]
                                                                const bstr = atob(arr[1])
                                                                let n = bstr.length
                                                                const u8arr = new Uint8Array(n)
                                                                while (n) {
                                                                    u8arr[n - 1] = bstr.charCodeAt(n - 1)
                                                                    n -= 1 // to make eslint happy
                                                                }
                                                                return new File([u8arr], filename, { type: mime })
                                                            }
                                                            const file = dataURLtoFile(`data:image/png;base64,${li.image}`, 'cart_remove.png');
                                                            if (file != undefined) {
                                                                let formData = new FormData();
                                                                formData.append('user_id', props.user.user_id);
                                                                formData.append('product_id', li.product_id);
                                                                formData.append('vendor_email', li.vendor_email);
                                                                formData.append('description', li.description);
                                                                formData.append('brand_name', li.brand_name);
                                                                formData.append('price', li.price);
                                                                formData.append('strike_price', li.strike_price);
                                                                formData.append('discount', li.discount);
                                                                formData.append('user_wish', file);
                                                                formData.append('comp_name', li.comp_name);
                                                                formData.append('size', li.size);
                                                                formData.append('count', li.count);
                                                                formData.append('qty', li.qty);
                                                                let delete_cart = axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_cart_pid?user_id=${props.user.user_id}&pid=${li.product_id}`);
                                                                let add_wish = axios.post(`${process.env.REACT_APP_BACKEND_URL}/add_user_wishlist`, formData, {
                                                                    headers: {
                                                                        "Content-Type": 'multipart-formdata'
                                                                    }
                                                                })
                                                                await axios.all([delete_cart, add_wish])
                                                                    .then(axios.spread(async function (cart, wish) {
                                                                        if (cart.data.deletedCount == 1 && wish.data.msg === 'success') {
                                                                            toast(<WishlistToast image={li.image} text='Item moved to Wishlist' />, {
                                                                                position: toast.POSITION.TOP_RIGHT,
                                                                                autoClose: 3000
                                                                            })
                                                                            setIncCnt(inccnt => inccnt + 1);
                                                                        }
                                                                        else
                                                                            toast(<WishlistToast text='Error Please retry!!' />, {
                                                                                position: toast.POSITION.TOP_RIGHT,
                                                                                autoClose: 3000
                                                                            })
                                                                    }))
                                                            }
                                                        }
                                                })
                                                setIterate(iterate => iterate + 1);
                                            }}>MOVE TO WISHLIST</Button>
                                    </Box>
                                </DialogContentText>
                            </DialogContent >
                        </Dialog >
                    </>
                }
            </>}
        </>
    )
}
const mapStateToProps = (cstate) => {
    return {
        user: cstate.user,
        gift_iterate: cstate.gift_iterate,
        bag_count: cstate.bag_count
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setCartState: (data) => dispatch(setCartState(data)),
        getBagCount: (data) => dispatch(getBagCount(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CartBag);