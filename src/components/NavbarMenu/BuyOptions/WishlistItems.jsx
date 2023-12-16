import { ImageListItem, Box, Typography, Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setUserProductId, getWishlistInc, getBagCount } from '../../Redux_Store/Action_Creators';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WishlistToast from "./Wishlist_Toast";
import Loader from "../../Loader/Loader";
const WishlistItems = (props) => {
    const [image, setImage] = useState();
    const [iterate, setIterate] = useState(0);
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        function toBase64(arr) {
            const arr1 = new Uint8Array(arr)
            return btoa(
                arr1.reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
        }
        const url = toBase64(props.image.data);
        if (url != undefined)
            setImage(url)
        setLoader(false);
    }, [])
    useEffect(() => {
        if (props.user.user_id != undefined && props.user.user_id != '') {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_cart_count?user_id=${props.user.user_id}`)
                .then((data) => props.getBagCount(data.data.data))
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/delete_cart_profile`)
                .then((data) => { })
        }
    }, [iterate])
    return (
        <>
            <ToastContainer />
            {loader == true ? <Loader /> : <>
                <Box sx={{
                    width: '270px', height: '420px', backgroundColor: 'white', border: '1px solid lightgrey', cursor: 'pointer',
                    marginLeft: '100px', marginTop: '100px', textDecoration: 'none', color: 'black', display: ''
                }} >
                    <Box sx={{ backgroundColor: 'rgb(250,250,250)', textAlign: 'center', position: 'relative', zIndex: 3, marginLeft: '10px', marginTop: '20px', border: '1px solid grey', borderRadius: '50%', width: '35px' }}><CloseIcon sx={{ color: 'grey', paddingTop: '3px', paddingBottom: '2px' }}
                        onClick={async (e) => {
                            setLoader(true);
                            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_wishlist?product_id=${props.product_id}`)
                                .then(async (data) => {
                                    if (data.data.deletedCount == 1) {
                                        await toast(<WishlistToast image={image} text='Item removed from wishlist' />, {
                                            position: toast.POSITION.TOP_RIGHT,
                                            className: 'toastcontainer',
                                            bodyClassName: 'toastbody',
                                            hideProgressBar: true,
                                            closeButton: false,
                                            autoClose: 3000
                                        })

                                        let cnt = Number(props.wishlist_iterate) + 1;
                                        props.getWishlistInc(cnt);
                                    }
                                    else {
                                        toast(<WishlistToast text='Error Please retry!' />, {
                                            position: toast.POSITION.TOP_RIGHT,
                                            className: 'toastcontainer',
                                            bodyClassName: 'toastbody',
                                            hideProgressBar: true,
                                            closeButton: false,
                                            autoClose: 3000
                                        })
                                    }
                                    setLoader(false);
                                })
                        }} /></Box>
                    <ImageListItem component={Link} to='/buy'
                        onClick={() => {
                            props.setUserProductId(props.product_id)
                        }}><img src={`data:image/png;base64,${image}`} style={{ width: '270px', height: '320px', marginTop: '-58px' }}
                            alt='loading' /></ImageListItem>
                    <Box>
                        <Typography variant='body1' sx={{ paddingLeft: '10px', paddingTop: '10px', fontSize: '19px', fontWeight: 'bold' }}>{props.brand}</Typography>
                        <Typography variant='body1' sx={{ paddingLeft: '10px', paddingTop: '2px', fontSize: '15px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{props.descr}</Typography>
                        <Typography variant='body1' sx={{ paddingLeft: '10px', paddingTop: '5px', fontSize: '16px', fontWeight: 'bolder', fontFamily: 'Arial' }}>Rs.{props.price} <span style={{ fontSize: '14px', color: 'grey' }}><del>Rs.{props.strike_price} </del></span> <span
                            style={{ fontSize: '14px', color: 'red' }}>({props.discount}% OFF)</span></Typography>
                    </Box>
                    <Box sx={{
                        width: '270px', height: '50px', backgroundColor: 'white', borderBottom: '1px solid lightgrey', borderLeft: '1px solid lightgrey', borderRight: '1px solid lightgrey', cursor: 'pointer',
                        marginLeft: '-2px', marginTop: '10px', textDecoration: 'none', color: 'black', textAlign: 'center'
                    }} >
                        {props.count <= 0 &&
                            <Button disableTouchRipple variant='filled' sx={{ fontSize: '15px', padding: '10px', fontWeight: 'bold', color: 'rgb(243, 66, 140)', backgroundColor: 'transparent', '&:hover': { backgroundColor: 'transparent' } }}
                                onClick={async (e) => {
                                    alert('Item which you are trying to Bag is not in Stock, Kindly remove the Item from your wishlist by clicking Close Icon')
                                }}>ITEM NOT IN STOCK</Button>
                        }
                        {props.count > 0 &&
                            <Button disableTouchRipple variant='filled' sx={{ fontSize: '15px', padding: '10px', fontWeight: 'bold', color: 'rgb(243, 66, 140)', backgroundColor: 'transparent', '&:hover': { backgroundColor: 'transparent' } }}
                                onClick={async (e) => {
                                    setLoader(true);
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
                                    const file = dataURLtoFile(`data:image/png;base64,${image}`, 'cart.png')
                                    if (file != undefined) {
                                        let formData = new FormData();
                                        formData.append('user_id', props.user.user_id);
                                        formData.append('product_id', props.product_id);
                                        formData.append('vendor_email', props.vendor_email);
                                        formData.append('brand_name', props.brand);
                                        formData.append('description', props.descr);
                                        formData.append('price', props.price);
                                        formData.append('strike_price', props.strike_price);
                                        formData.append('discount', props.discount);
                                        formData.append('count', props.count);
                                        formData.append('comp_name', props.comp_name);
                                        formData.append('size', props.size);
                                        formData.append('qty', props.qty);
                                        formData.append('cart', file);
                                        const delete_wishlist = axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_wishlist?product_id=${props.product_id}`);
                                        const add_cart = axios.post(`${process.env.REACT_APP_BACKEND_URL}/add_cart`, formData, {
                                            headers: {
                                                "Content-Type": 'multipart-formdata'
                                            }
                                        })
                                        await axios.all([delete_wishlist, add_cart])
                                            .then(axios.spread(function (wishdet, cartdet) {
                                                async function fun1() {
                                                    if (wishdet.data.deletedCount == 1 && cartdet.data.msg == 'success') {
                                                        await toast(<WishlistToast image={image} text='Item moved to Bag' />, {
                                                            position: toast.POSITION.TOP_RIGHT,
                                                            className: 'toastcontainer',
                                                            bodyClassName: 'toastbody',
                                                            hideProgressBar: true,
                                                            closeButton: false,
                                                            autoClose: 3000
                                                        })

                                                        let cnt = Number(props.wishlist_iterate) + 1;
                                                        props.getWishlistInc(cnt);
                                                        setIterate(iterate => iterate + 1);
                                                    }
                                                    else {
                                                        toast(<WishlistToast text='Error, please retry!!' />, {
                                                            position: toast.POSITION.TOP_RIGHT,
                                                            className: 'toastcontainer',
                                                            bodyClassName: 'toastbody',
                                                            hideProgressBar: true,
                                                            closeButton: false,
                                                            autoClose: 3000
                                                        })
                                                    }
                                                }
                                                fun1();
                                                setLoader(false);
                                            }))
                                    }
                                }}>MOVE TO BAG</Button>
                        }
                    </Box>
                </Box >
            </>}
        </>
    )
}
const mapStateToProps = (cstate) => {
    return {
        user: cstate.user,
        wishlist_iterate: cstate.wishlist_iterate
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setUserProductId: (data) => dispatch(setUserProductId(data)),
        getWishlistInc: (data) => dispatch(getWishlistInc(data)),
        getBagCount: (data) => dispatch(getBagCount(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(WishlistItems);