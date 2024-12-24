import { Typography, Button } from "@mui/material";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getBagCount, setOrderId } from '../../../../Redux_Store/Action_Creators';
import Loader from '../../../../Loader/Loader';
const CreditCard = (props) => {
    //client secret.
    const [client_secret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    //setDisabled
    const [disab, setDisab] = useState(true);
    const [orderid, setOrderId] = useState(0);
    //get place_order details.
    const [userid, setUserId] = useState('');
    const [usermail, setUserMail] = useState('');
    const [username, setUserName] = useState(props.name);
    const [proddetails, setProdDetails] = useState([]);
    const [loader, setLoader] = useState(true);
    //get amount details.
    const [total_amount, setTotalAmount] = useState();
    const [discount, setDiscount] = useState();
    const [conv_fee, setConvFee] = useState();
    const [gift_amt, setGiftAmt] = useState();
    const [total_items, setTotalItems] = useState();
    const [total_mrp, setTotalMrp] = useState();
    const [first_order, setFirstOrder] = useState();
    const [status, setStatus] = useState('');
    const [transaction_id, setTransactionId] = useState('');
    //get delivery address
    const [addr, setAddr] = useState('');
    const [town, setTown] = useState('');
    const [pincode, setPincode] = useState();
    const [itemqty, setItemQty] = useState(0);
    const [iterate, setIterate] = useState(0);
    const [prodcnt, setProdCnt] = useState(0);
    const [inccnt, setIncCnt] = useState(0);
    useEffect(() => {
        //get order number.
        const ord_cnt = axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_order_count`);
        //get place_order
        const order = axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_place_order?user_id=${props.user.user_id}`);
        //get amount details
        const amount_details = axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_amount?user_id=${props.user.user_id}`);
        //get delivery address
        const delivery_adr = axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_del_adr?user_id=${props.user.user_id}`);
        //get payment Intent
        const payment_intent = axios.post(`${process.env.REACT_APP_BACKEND_URL}/payment_redirect`, {
            email: props.email,
            total_amount: props.total_amount,
            name: username
        })

        axios.all([ord_cnt, order, amount_details, delivery_adr, payment_intent])
            .then(axios.spread(function (cnt, ord, amt, del, payment) {
                (cnt.data.data[0] != undefined) ? setOrderId(Number(cnt.data.data[0]._id) + 1) : setOrderId(1);
                function f1() {
                    if (ord.data.length > 0) {
                        setItemQty(ord.data.length);
                        setUserId(ord.data[0].user_id);
                        setUserMail(ord.data[0].user_email);
                        setProdDetails(ord.data.slice());
                    }
                }
                function f2() {
                    if (amt.data.length > 0) {
                        setTotalAmount(amt.data[0].total_amount);
                        setDiscount(amt.data[0].discount_mrp);
                        setConvFee(amt.data[0].convenience_fee);
                        setGiftAmt(amt.data[0].gift_amt);
                        setTotalItems(amt.data[0].total_count);
                        setTotalMrp(amt.data[0].total_mrp);
                        setFirstOrder(amt.data[0].offer_amt);
                    }
                }
                function f3() {
                    if (del.data.length > 0) {
                        setAddr(del.data[0].addr);
                        setTown(del.data[0].town);
                        setPincode(del.data[0].pincode);
                    }
                }
                function f4() {
                    if (payment.data.clientSecret != undefined)
                        setClientSecret(payment.data.clientSecret);
                }
                function f5() {
                    setDisab(false)
                    setLoader(false);
                }
                f1();
                f2();
                f3();
                f4();
                f5();
            }))
    }, [])
    useEffect(() => {
        if (status == 'succeeded') {
            proddetails.map(async (li) => {
                let formData = new FormData();
                formData.append('order_id', orderid);
                formData.append('user_id', userid);
                formData.append('user_name', username);
                formData.append('user_email', usermail);
                formData.append('vendor_email', li.vendor_email);
                formData.append('order_status', 'created');
                formData.append('payment_done', 'true');
                formData.append('payment_mode', 'card');
                formData.append('order_date', new Date());
                formData.append('transaction_id', transaction_id);
                formData.append('total_amount', total_amount);
                formData.append('discount_amount', discount);
                formData.append('conv_fee', conv_fee);
                formData.append('gift_amt', gift_amt);
                formData.append('total_items', total_items);
                formData.append('total_mrp', total_mrp);
                formData.append('first_order', first_order);
                formData.append('addr', addr);
                formData.append('town', town);
                formData.append('pincode', pincode);
                formData.append('product_id', li.product_id);
                formData.append('description', li.description);
                formData.append('size', li.size);
                formData.append('brand', li.brand);
                formData.append('qty', li.qty);
                formData.append('count', li.count);
                formData.append('price', li.price);
                formData.append('strike_price', li.strike_price);
                formData.append('discount', li.discount);
                formData.append('del', li.delivery);
                formData.append('packed_date', 0);
                formData.append('shipped_date', 0);
                formData.append('ofd_date', 0);
                formData.append('delivered_date', 0);
                formData.append('cancelled_date', 0);
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
                // generate file from base64 string
                const file = dataURLtoFile(`data:image/png;base64,${li.image}`, 'paymentimage.png')
                if (file != undefined) {
                    formData.append('paymentimage', file)
                }
                axios.post(`${process.env.REACT_APP_BACKEND_URL}/create_order`, formData,
                    {
                        headers: {
                            "Content-Type": 'multipart-formdata'
                        }
                    }
                )
                    .then(async (data) => {
                        if (data.data.user_id != undefined) {
                            props.setOrderId(data.data.order_id);
                            setProdCnt(prodcnt => prodcnt + 1);
                        }
                        else
                            toast.error('Error ,  Please retry!!!')
                    })
            })
        }
    }, [status])
    useEffect(() => {
        if (prodcnt == itemqty && itemqty != 0 && prodcnt != 0) {
            proddetails.map((li) => {
                const deletepid = axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_cart_pid?user_id=${userid}&pid=${li.product_id}`);
                const updateprod = axios.patch(`${process.env.REACT_APP_BACKEND_URL}/update_item_stock_product?product_id=${li.product_id}&decrease=${1}`, {
                    'count': Number(li.count) - 1
                });
                const updatecart = axios.patch(`${process.env.REACT_APP_BACKEND_URL}/update_item_stock_cart?product_id=${li.product_id}&decrease=${1}`, {
                    'count': Number(li.count) - 1
                });
                const updatewishlist = axios.patch(`${process.env.REACT_APP_BACKEND_URL}/update_item_stock_wishlist?product_id=${li.product_id}&decrease=${1}`, {
                    'count': Number(li.count) - 1
                });
                const updateorder = axios.patch(`${process.env.REACT_APP_BACKEND_URL}/update_item_stock_order?product_id=${li.product_id}&decrease=${1}`, {
                    'count': Number(li.count) - 1
                });
                const updateplaceorder = axios.patch(`${process.env.REACT_APP_BACKEND_URL}/update_item_stock_placeorder?product_id=${li.product_id}&decrease=${1}`, {
                    'count': Number(li.count) - 1
                });
                axios.all([deletepid, updateprod, updatecart, updateorder, updateplaceorder, updatewishlist])
                    .then(axios.spread(function (deldet, upddet, updcart, updorder, updplaceord, updwish) {
                        if (deldet.data.deletedCount == 1 && upddet.data.modifiedCount == 1)
                            setIterate(iterate => iterate + 1);
                    }))
            })
        }
    }, [prodcnt])
    useEffect(() => {
        if (iterate == itemqty && itemqty != 0 && iterate != 0) {
            setIncCnt(inccnt => inccnt + 1);
            if (props.user.user_id != undefined && props.user.user_id != '') {
                axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_cart_count?user_id=${props.user.user_id}`)
                    .then((data) => {
                        (data.data.data != 0) ? props.getBagCount(data.data.data) : props.getBagCount(0)
                    })
            }
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/send_order_confirm`, {
                'usermail': usermail,
                'orderid': orderid,
                'total_items': total_items,
                'username': username,
                'addr': addr,
                'town': town,
                'pincode': pincode,
                'total_mrp': total_mrp,
                'discount': discount,
                'conv_fee': conv_fee,
                'gift_amt': gift_amt,
                'first_order': first_order,
                'total_amount': total_amount
            })
                .then((data) => {
                    if (data.data.msg == 'success')
                        navigate('/success');
                })
        }
    }, [iterate])
    useEffect(() => {
        if (inccnt > 0) {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/delete_payment_orderprofile`)
                .then((data) => { })
        }
    }, [inccnt])
    return (<>
        {loader == true ? <Loader /> : <>
            <ToastContainer />
            <Typography sx={{ fontWeight: "bold", fontFamily: "verdana" }}>CREDIT / DEBIT CARD</Typography>
            <br></br>
            <br></br>
            <br></br>
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
                    .then((result) => {
                        console.log(result);
                        console.log(result.paymentIntent);
                        
                        // if (result.paymentIntent.status == 'succeeded') {
                        //     setTransactionId(result.paymentIntent.id)
                        //     setStatus(result.paymentIntent.status);
                        // }
                        // else if (result.paymentIntent.status != 'succeeded')
                        //     navigate('/error')

                    })
            }} >PAY NOW</Button >
        </>}
    </>)
}
const mapStateToProps = (cstate) => {
    return {
        user: cstate.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getBagCount: (data) => dispatch(getBagCount(data)),
        setOrderId: (data) => dispatch(setOrderId(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreditCard);
