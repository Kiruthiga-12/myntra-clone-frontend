import { Box, Button, ImageListItem, Typography, Image } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { setUserProductId } from '../../Redux_Store/Action_Creators';
import { toast, ToastContainer, style } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ViewSimilar from './ViewSimilar';
import Loader from '../../Loader/Loader';
const ProductItems = (props) => {
    const [show_wishlist_mark, showBox] = useState(false);
    const [fav_added, addfav] = useState(false);
    const [view_similar, showSimilar] = useState(false);
    const [wish, setWish] = useState(false);
    const [similarflag, setSimilarFlag] = useState(false);
    const [loader, setLoader] = useState(false);
    useEffect(() => {
        if (props.user.user_id != undefined && props.user.user_id != '') {
            setLoader(true);
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_wishlist_pid?user_id=${props.user.user_id}&pid=${props.product_id}`)
                .then((data) => {
                    if (data.data.msg == 'success')
                        setWish(true)
                    else if (data.data.msg != 'success')
                        setWish(false);
                    setLoader(false);
                })
        }
    }, [])
    useEffect(() => {
        if (fav_added == true) {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/delete_user_wishlistprofile`)
                .then((data) => { })
        }
    }, [fav_added])
    return (
        <>
            {loader == true ? <Loader /> : <>
                <ToastContainer />
                <Box sx={{
                    width: '270px', height: '420px', backgroundColor: 'white', border: '1px solid grey', cursor: 'pointer',
                    marginLeft: '30px', marginTop: '30px', textDecoration: 'none', color: 'black'
                }}
                    onMouseEnter={() =>
                        showBox(true)}

                    onMouseLeave={() =>
                        showBox(false)}
                >
                    {view_similar === true && <>
                        <span style={{
                            display: 'flex', marginLeft: '5px', marginTop: '20px',
                            justifyContent: 'flex-start',
                            position: 'relative', zIndex: 2, color: 'rgb(250, 50, 84)',
                            width: '150px', height: '30px',
                            backgroundColor: 'white', paddingTop: '4px', paddingLeft: '10px',
                            borderRadius: '15px'
                        }}
                            onMouseLeave={() => {
                                showSimilar(false)
                            }}><StyleOutlinedIcon sx={{ fontSize: '22px', color: 'rgb(250, 50, 84)', paddingRight: '2px' }}
                                onClick={async () => {
                                    await setSimilarFlag(false)
                                    await setSimilarFlag(true)
                                }} />VIEW SIMILAR</span>
                    </>}
                    {view_similar === false && <>
                        <span style={{
                            display: 'inline-block',
                            marginLeft: '5px', marginTop: '20px',
                            position: 'relative', zIndex: 2, color: 'rgb(250, 50, 84)', width: '30px', height: '30px',
                            backgroundColor: 'white', paddingTop: '4px', paddingLeft: '10px', borderRadius: '15px'
                        }}
                            onMouseOver={() => {
                                showSimilar(true)
                            }}
                        ><StyleOutlinedIcon sx={{ fontSize: '22px', color: 'rgb(250, 50, 84)', paddingRight: '2px' }} /></span>
                    </>}
                    <ImageListItem component={Link} to='/buy'
                        onClick={() => {
                            props.setUserProductId(props.product_id)
                        }}><img src={`data:image/png;base64,${props.image}`} style={{ width: '270px', height: '320px', marginTop: '-54px' }}
                            alt='loading' /></ImageListItem>
                    {props.rating > 0 && props.users_cnt > 0 &&
                        <Box sx={{
                            display: 'flex', width: '100px', height: '25px', backgroundColor: 'rgb(230,230,230)', marginTop: '-50px', position: 'relative', zIndex: 1, marginLeft: '20px',
                            paddingLeft: '10px', paddingTop: '5px'
                        }}>
                            <span >{props.rating}</span>
                            <span>< StarIcon sx={{ color: 'rgb(72, 185, 157)', fontSize: '20px', paddingLeft: '2px' }} /></span>
                            <span style={{ paddingLeft: '5px' }}>|</span>
                            <span style={{ paddingLeft: '5px' }}>{props.users_cnt}</span>
                        </Box>
                    }
                    {props.rating == 0 && props.users_cnt == 0 &&
                        <Box sx={{
                            visibility: "hidden",
                            display: 'flex', width: '100px', height: '25px', backgroundColor: 'rgb(230,230,230)', marginTop: '-50px', position: 'relative', zIndex: 1, marginLeft: '20px',
                            paddingLeft: '10px', paddingTop: '5px'
                        }}>
                            <span ></span>
                            <span>< StarIcon sx={{ color: 'rgb(72, 185, 157)', fontSize: '20px', paddingLeft: '2px' }} /></span>
                            <span style={{ paddingLeft: '5px' }}>|</span>
                            <span style={{ paddingLeft: '5px' }}></span>
                        </Box>
                    }
                    {show_wishlist_mark === false && <>
                        <Box>
                            <Typography variant='body1' sx={{ paddingLeft: '10px', paddingTop: '23px', fontSize: '19px', fontWeight: 'bold' }}>{props.brand}</Typography>
                            <Typography variant='body1' sx={{ paddingLeft: '10px', paddingTop: '2px', fontSize: '15px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{props.descr}</Typography>
                            <Typography variant='body1' sx={{ paddingLeft: '10px', paddingTop: '5px', fontSize: '16px', fontWeight: 'bolder', fontFamily: 'Arial' }}>Rs.{props.price} <span style={{ fontSize: '14px', color: 'grey' }}>Rs.<del>{props.strike_price}</del></span> <span
                                style={{ fontSize: '14px', color: 'red' }}>({props.discount}% OFF)</span></Typography>
                        </Box>
                    </>}
                    {show_wishlist_mark === true && fav_added === false && <>
                        <Box>
                            {(wish == false) && (props.user.user_id != undefined) &&
                                <Button disableTouchRipple variant='outlined' sx={{
                                    border: '1px solid black', marginLeft: '30px', width: '80%',
                                    textAlign: 'center', color: 'black', fontFamily: 'Arial', fontWeight: 'bolder',
                                    marginTop: '22px',
                                    '&:hover': { backgroundColor: 'transparent', border: '1px solid black' }
                                }} startIcon={<FavoriteBorderIcon sx={{ fontSize: '50px' }} />}
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

                                        // generate file from base64 string
                                        const file = dataURLtoFile(`data:image/png;base64,${props.image}`, 'test.png')
                                        if (file != undefined) {
                                            let formData = new FormData();
                                            formData.append('user_id', props.user.user_id)
                                            formData.append('product_id', props.product_id);
                                            formData.append('vendor_email', props.vendor_email);
                                            formData.append('user_wish', file);
                                            formData.append('brand_name', props.brand);
                                            formData.append('description', props.descr);
                                            formData.append('price', props.price)
                                            formData.append('strike_price', props.strike_price)
                                            formData.append('discount', props.discount)
                                            formData.append('size', props.size)
                                            formData.append('qty', props.qty);
                                            formData.append('count', props.count);
                                            formData.append('comp_name', props.comp_name)
                                            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/add_user_wishlist`, formData, {
                                                headers: {
                                                    "Content-Type": 'multipart-formdata'
                                                }
                                            }).then((data) => {
                                                if (data.data.msg == 'success')
                                                    addfav(true)
                                                else {
                                                    toast.error('Error ! Please try again')
                                                    addfav(false)
                                                }
                                                setLoader(false)
                                            })
                                        }
                                    }}>WISHLIST</Button>
                            }
                            {(wish == false) && (props.user.user_id == undefined) &&
                                <Button disableTouchRipple variant='outlined' sx={{
                                    border: '1px solid black', marginLeft: '30px', width: '80%',
                                    textAlign: 'center', color: 'black', fontFamily: 'Arial', fontWeight: 'bolder',
                                    marginTop: '22px',
                                    '&:hover': { backgroundColor: 'transparent', border: '1px solid black' }
                                }} startIcon={<FavoriteBorderIcon sx={{ fontSize: '50px' }} />}
                                    component={Link} to='/'>WISHLIST</Button>
                            }
                            {wish == true &&
                                <Button disableTouchRipple variant='outlined' sx={{
                                    border: '1px solid transparent', marginLeft: '30px', width: '80%', textAlign: 'center', color: 'white', fontFamily: 'Arial', fontWeight: 'bolder',
                                    marginTop: '22px', backgroundColor: 'rgb(90,90,90)', '&:hover': { backgroundColor: 'rgb(90,90,90)', border: '1px solid transparent' }
                                }} startIcon={<FavoriteIcon sx={{ color: 'rgb(250, 50, 84)', fontSize: '50px' }} />}>WISHLISTED</Button>
                            }
                            <Typography variant='body1' sx={{ paddingLeft: '10px', paddingTop: '6px', fontSize: '15px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Size: {props.size} </Typography>
                            <Typography variant='body1' sx={{ paddingLeft: '10px', paddingTop: '3px', fontSize: '16px', fontWeight: 'bolder', fontFamily: 'Arial' }}>Rs.{props.price} <span style={{ fontSize: '14px', color: 'grey' }}><del>Rs.{props.strike_price} </del></span> <span
                                style={{ fontSize: '14px', color: 'red' }}>({props.discount}% OFF)</span></Typography>
                        </Box>
                    </>}
                    {show_wishlist_mark === true && fav_added === true && <>
                        <Box>
                            <Button disableTouchRipple variant='outlined' sx={{
                                border: '1px solid transparent', marginLeft: '30px', width: '80%', textAlign: 'center', color: 'white', fontFamily: 'Arial', fontWeight: 'bolder',
                                marginTop: '22px', backgroundColor: 'rgb(90,90,90)', '&:hover': { backgroundColor: 'rgb(90,90,90)', border: '1px solid transparent' }
                            }} startIcon={<FavoriteIcon sx={{ color: 'rgb(250, 50, 84)', fontSize: '50px' }} />}>WISHLISTED</Button>
                            <Typography variant='body1' sx={{ paddingLeft: '10px', paddingTop: '6px', fontSize: '15px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Size: {props.size} </Typography>
                            <Typography variant='body1' sx={{ paddingLeft: '10px', paddingTop: '3px', fontSize: '16px', fontWeight: 'bolder', fontFamily: 'Arial' }}>Rs.{props.price} <span style={{ fontSize: '14px', color: 'grey' }}><del>Rs.{props.strike_price} </del></span> <span
                                style={{ fontSize: '14px', color: 'red' }}>({props.discount}% OFF)</span></Typography>
                        </Box>
                    </>}
                </Box>
                {similarflag === true && <>
                    <ViewSimilar pid={props.product_id} />
                </>}
            </>}
        </>
    )
}

const mapStateToProps = (cstate) => {
    return {
        user: cstate.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setUserProductId: (data) => dispatch(setUserProductId(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductItems);