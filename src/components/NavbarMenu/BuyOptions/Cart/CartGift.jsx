import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import { Box, Typography, Button, TextField, Dialog, DialogContent, DialogContentText, ListItem } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import { getGiftInc } from '../../../Redux_Store/Action_Creators';
import Loader from '../../../Loader/Loader';
const CartGift = (props) => {
    const [gift_wrap, setGiftWrap] = useState(false);
    const [dis, setDis] = useState(true);
    const [receipient, setReceipient] = useState('');
    const [msg, setMsg] = useState('');
    const [sender, setSender] = useState('')
    const [apply_gift, setApplyGift] = useState(false);
    const [edit_flag, setEditFlag] = useState(false);
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_gift_wrap?user_id=${document.getElementById('userlogin_userid').innerText}`)
            .then((data) => {
                if (data.data.length != 0) {
                    setMsg(data.data[0].message);
                    setReceipient(data.data[0].receipient);
                    setSender(data.data[0].sender);
                    setApplyGift(true);
                }
                else if (data.data.length == 0) {
                    if (document.getElementById('cart_gift_wrap') != undefined && document.getElementById('cart_gift_rup') != undefined && document.getElementById('cart_gift_price') != undefined) {
                        document.getElementById('cart_gift_wrap').style.visibility = 'hidden';
                        document.getElementById('cart_gift_rup').style.visibility = 'hidden';
                        document.getElementById('cart_gift_price').style.visibility = 'hidden';
                    }
                }
                setLoader(false);
            })
    }, [])
    useEffect(() => {
        if (apply_gift == true) {
            setLoader(true);
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_gift_wrap?user_id=${document.getElementById('userlogin_userid').innerText}`)
                .then((data) => {
                    if (data.data.length > 0)
                        if (data.data[0].user_id != 0) {
                            setMsg(data.data[0].message);
                            setReceipient(data.data[0].receipient);
                            setSender(data.data[0].sender);
                            document.getElementById('cart_gift_wrap').style.visibility = 'visible';
                            document.getElementById('cart_gift_rup').style.visibility = 'visible';
                            document.getElementById('cart_gift_price').style.visibility = 'visible';
                        }
                    setLoader(false);
                })
        }
    }, [apply_gift])
    useEffect(() => {
        if (receipient.length > 0 && msg.length > 0 && sender.length > 0) {
            setDis(false);
        }
    }, [receipient, msg, sender])

    return (<>
        {loader == true ? <Loader /> : <>
            <ToastContainer />
            {
                apply_gift === false && <>
                    <Box sx={{ marginTop: '20px', marginLeft: '20px', width: '480px', height: '130px', backgroundColor: 'rgb(247, 200, 208)' }}>
                        <Box sx={{ display: 'flex' }}>
                            {/* Left Side */}
                            <Box sx={{ flex: 2 }}>
                                <CardGiftcardIcon sx={{ color: 'rgb(250, 50, 84)', marginLeft: '10px', marginTop: '20px', fontSize: '50px' }} />
                            </Box>
                            {/* RightSide */}
                            <Box sx={{ flex: 10, marginTop: '10px' }}>
                                <Typography variant='body1' sx={{ fontWeight: 'bold' }}>Buying for Loved One?</Typography>
                                <Typography variant='body1' sx={{ fontSize: '15px' }}>Gift wrap and personalized message on card,</Typography>
                                <Typography variant='body1' sx={{ fontSize: '15px' }}>Only for &#8377;25</Typography>
                                <Button disableTouchRipple sx={{
                                    marginLeft: '-5px', marginTop: '10px',
                                    fontWeight: 'bold',
                                    color: 'rgb(250, 50, 84)', backgroundColor: 'transparent'
                                    , '&:hover': { backgroundColor: 'transparent', color: 'rgb(250, 50, 84)' }
                                }} onClick={() => {
                                    setGiftWrap(true)
                                }}>ADD GIFT WRAP</Button>
                            </Box>
                        </Box>
                    </Box>
                </>
            }
            {
                apply_gift === true && <>
                    <Box sx={{ marginTop: '20px', marginLeft: '20px', width: '480px', height: '130px', backgroundColor: 'rgb(247, 200, 208)' }}>
                        <Box sx={{ display: 'flex' }}>
                            {/* Left Side */}
                            <Box sx={{ flex: 2 }}>
                                <CardGiftcardIcon sx={{ color: 'rgb(250, 50, 84)', marginLeft: '10px', marginTop: '20px', fontSize: '50px' }} />
                            </Box>
                            {/* RightSide */}
                            <Box sx={{ flex: 10, marginTop: '10px' }}>
                                <Typography variant='body1' sx={{ fontWeight: 'bold' }}>Yah! Gift Wrapping applied</Typography>
                                <Typography variant='body1' sx={{ fontSize: '15px' }}>Your order will be gift wrapped with your</Typography>
                                <Typography variant='body1' sx={{ fontSize: '15px' }}>personalised message</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '-70px' }}>
                                    <Button disableTouchRipple sx={{
                                        flex: 5,
                                        marginTop: '10px',
                                        fontWeight: 'bold',
                                        color: 'rgb(250, 50, 84)', backgroundColor: 'transparent'
                                        , '&:hover': { backgroundColor: 'transparent', color: 'rgb(250, 50, 84)' }
                                    }} onClick={() => {
                                        setLoader(true);
                                        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_gift_wrap?user_id=${document.getElementById('userlogin_userid').innerText}`)
                                            .then((data) => {
                                                if (data.data.deletedCount == 1) {
                                                    props.getGiftInc(false);
                                                    setApplyGift(false);
                                                    document.getElementById('cart_gift_wrap').style.visibility = 'hidden';
                                                    document.getElementById('cart_gift_rup').style.visibility = 'hidden';
                                                    document.getElementById('cart_gift_price').style.visibility = 'hidden';
                                                    setMsg('');
                                                    setReceipient('');
                                                    setSender('');
                                                    toast.success('Gift Wrap deleted successfully!!', {
                                                        autoClose: 3000
                                                    });
                                                }
                                                else {
                                                    setApplyGift(true);
                                                    toast.error('Gift wrap is not deleted ,Please Retry!!', {
                                                        autoClose: 3000
                                                    });
                                                }
                                                setLoader(false);
                                            })
                                    }}>REMOVE</Button>
                                    <Typography sx={{ flex: 2, marginTop: '10px' }}>|</Typography>
                                    <Button disableTouchRipple sx={{
                                        flex: 5,
                                        marginTop: '10px',
                                        fontWeight: 'bold',
                                        color: 'rgb(250, 50, 84)', backgroundColor: 'transparent'
                                        , '&:hover': { backgroundColor: 'transparent', color: 'rgb(250, 50, 84)' }
                                    }} onClick={() => {
                                        setEditFlag(true);
                                        setGiftWrap(true)
                                    }}>EDIT MESSAGE</Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </>
            }
            {
                gift_wrap == true && <>
                    < Dialog open={gift_wrap} sx={{ margin: 'auto', width: '1200px', height: '640px' }}   >
                        <DialogContent >
                            <DialogContentText sx={{ width: '550px', height: "500px" }} >
                                <Box sx={{ display: 'flex', alignItems: "center" }}>
                                    <Box sx={{ flex: 11 }}>
                                        <Typography sx={{ color: 'black', fontSize: '25px', fontWeight: "normal", fontFamily: 'TimesNewRoman' }}>Gift Wrapping</Typography>
                                        <Typography sx={{ color: 'black', fontWeight: 'bold', fontSize: '30px', fontFamily: 'TimesNewRoman', marginTop: "5px" }}>Make It Special</Typography>
                                    </Box>
                                    <span style={{ fontSize: '40px', cursor: 'pointer', fontWeight: 'normal', flex: 1, fontFamily: "TimesNewRoman" }} onClick={() => setGiftWrap(false)}>&times;</span>

                                </Box>
                                <Box sx={{ display: 'flex', alignItems: "center", marginTop: "20px" }}>
                                    <Box sx={{ flex: 6 }}>
                                        <TextField variant='outlined' placeholder='Receipient Name' sx={{ width: '100%' }}
                                            value={receipient} onChange={(e) => setReceipient(e.target.value)} />
                                        <TextField variant='outlined' placeholder='Message' style={{ marginTop: '15px', width: "100%" }}
                                            value={msg} onChange={(e) => setMsg(e.target.value)} />
                                        <span style={{ display: 'inline-block', marginLeft: "200px", fontWeight: "normal", color: 'grey', fontFamily: "TimesNewRoman" }}>200/200</span>
                                        <TextField variant='outlined' placeholder='Sender Name' style={{ marginTop: '15px', width: "100%" }}
                                            value={sender} onChange={(e) => setSender(e.target.value)} />
                                        <Typography sx={{ marginTop: "20px" }}><span style={{ color: "red" }}>Please Note: </span>Gift Wraping is not available for Pay on Delivery Orders.</Typography>
                                        <Button disabled={dis} sx={{
                                            fontSize: "18px", fontWeight: "bold",
                                            marginTop: "30px", width: "100%", color: "white", backgroundColor: 'rgb(243, 66, 140)'
                                            , '&:hover': { backgroundColor: 'rgb(243, 66, 140)' }
                                        }} onClick={() => {
                                            setLoader(true);
                                            if (edit_flag == false) {
                                                axios.post(`${process.env.REACT_APP_BACKEND_URL}/add_gift_wrap`, {
                                                    'user_id': document.getElementById('userlogin_userid').innerText,
                                                    'receipient': receipient,
                                                    'message': msg,
                                                    'sender': sender
                                                })
                                                    .then((data) => {
                                                        if (data.data.user_id != 0) {
                                                            props.getGiftInc(true);
                                                            setApplyGift(true);
                                                            toast.success('Gift wrap added succesfully', {
                                                                autoClose: 3000
                                                            })
                                                        }
                                                        else {
                                                            setApplyGift(false);
                                                            toast.error('Gift wrap not added. Error! Please retry!!', {
                                                                autoClose: 3000
                                                            });
                                                        }
                                                        setLoader(false);
                                                    })
                                            }
                                            else if (edit_flag == true) {
                                                axios.put(`${process.env.REACT_APP_BACKEND_URL}/edit_gift_wrap?user_id=${document.getElementById('userlogin_userid').innerText}`, {
                                                    'user_id': document.getElementById('userlogin_userid').innerText,
                                                    'receipient': receipient,
                                                    'message': msg,
                                                    'sender': sender
                                                })
                                                    .then((data) => {
                                                        if (data.data.data.modifiedCount == 1) {
                                                            setApplyGift(true);
                                                            toast.success('Gift wrap details edited successfully !!', {
                                                                autoClose: 3000
                                                            });
                                                        }
                                                        else {
                                                            setApplyGift(false);
                                                            toast.error('Gift wrap details can\'t be edited, Please retry !!', {
                                                                autoClose: 3000
                                                            });

                                                        }
                                                        setLoader(false);
                                                    })
                                            }
                                        }}>APPLY GIFT WRAP</Button>
                                    </Box>
                                    <Box sx={{ flex: 6, marginLeft: '30px' }}>
                                        <Typography sx={{ fontWeight: "bold" }}>HOW DOES IT WORK ?</Typography>
                                        <Typography sx={{ fontWeight: "bold", marginTop: "20px", color: "black" }}>Personalized Card</Typography>
                                        <Typography sx={{ marginTop: "10px", fontSize: "15px" }}>Your message will be printed on a card placed inside the package.</Typography>
                                        <Typography sx={{ fontWeight: "bold", marginTop: "20px", color: "black" }}>Invoice will be included</Typography>
                                        <Typography sx={{ marginTop: "10px", fontSize: "15px" }}>The receiver will get an invoice showing the amount you pay or the discount applied.</Typography>
                                        <Typography sx={{ fontWeight: "bold", marginTop: "20px", color: "black" }}>Original product tags will be retained</Typography>
                                        <Typography sx={{ marginTop: "10px", fontSize: "15px" }}>Original product tags with MRP will be left intact in-case you'd like to exchange for a different size.</Typography>
                                    </Box>
                                    <br></br>
                                    <br></br>
                                </Box>
                            </DialogContentText>
                        </DialogContent >
                    </Dialog >
                </>
            }
        </>}
    </>)
}

const mapDispatchToProps = (dispatch) => {
    return {
        getGiftInc: (data) => dispatch(getGiftInc(data))
    }
}
export default connect(null, mapDispatchToProps)(CartGift);