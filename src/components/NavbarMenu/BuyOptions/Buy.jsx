import { LinearProgress, Typography, Box, ImageList, ImageListItem, Button, TextField, Dialog, DialogContent, DialogContentText } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LockIcon from '@mui/icons-material/Lock';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FireTruckOutlinedIcon from '@mui/icons-material/FireTruckOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import StarHalfOutlinedIcon from '@mui/icons-material/StarHalfOutlined';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import WishlistToast from "./Wishlist_Toast";
import { getBagCount, setFooter, setNavBar } from '../../Redux_Store/Action_Creators';
import axios from 'axios';
import ReviewProduct from "./ReviewProduct";
import Loader from "../../Loader/Loader";

const Buy = (props) => {
    const [prod_details, setProductDetails] = useState([])
    const sizechart = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    const [wishlist, setWishlist] = useState(false);
    const [fav_added, addfav] = useState(false);
    const [path, setPath] = useState()
    const [supplyFlag, setSupplyFlag] = useState(false);
    const [reviewflag, setReviewFlag] = useState(false);
    const [bagflag, setBagFlag] = useState(false);
    const [loader, setLoader] = useState(false);
    const [avg_rating, setAvgRating] = useState(0);
    const [review_count, setReviewCount] = useState(0);
    const [details, setDetails] = useState([]);
    const [rating5, setRating5] = useState(0);
    const [rating4, setRating4] = useState(0);
    const [rating3, setRating3] = useState(0);
    const [rating2, setRating2] = useState(0);
    const [rating1, setRating1] = useState(0);
    const [msg, setMsg] = useState();
    useEffect(() => {
        props.setNavBar('navbar');
        props.setFooter('footer');
        if ((props.user.user_id != '' && props.user.user_id != undefined) && (props.product_id != undefined && props.product_id != '')) {
            setLoader(true)
            const prod = axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_product_product_id?product_id=${props.product_id}`);
            const wish = axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_wishlist_pid?user_id=${props.user.user_id}&pid=${props.product_id}`);
            const bag = axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_cart_pid?user_id=${props.user.user_id}&product_id=${props.product_id}`);
            axios.all([prod, wish, bag])
                .then(axios.spread(function (prodlist, wishli, baglist) {
                    function fun1() {
                        if (prodlist.data.length > 0)
                            if (prodlist.data[0].email != undefined) {
                                setPath(`Home / ${prodlist.data[0].category} / ${prodlist.data[0].subcategory} / ${prodlist.data[0].product} / ${prodlist.data[0].brand_name}`)
                                setProductDetails(prodlist.data.slice())
                            }
                    }
                    (wishli.data.msg == 'success') ? setWishlist(true) : setWishlist(false);
                    (baglist.data.length > 0) ? setBagFlag(true) : setBagFlag(false);
                    setLoader(false)
                    fun1()
                }))
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_review?product_id=${props.product_id}`)
                .then((data) => {
                    (data.data.length > 0) ? setDetails(data.data.slice()) : setDetails([]);
                })
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_rating_progress?product_id=${props.product_id}&rating=${5}`)
                .then((data) => (data.data.data > 0) ? setRating5(data.data.data) : setRating5(0))
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_rating_progress?product_id=${props.product_id}&rating=${4}`)
                .then((data) => (data.data.data > 0) ? setRating4(data.data.data) : setRating4(0))
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_rating_progress?product_id=${props.product_id}&rating=${3}`)
                .then((data) => (data.data.data > 0) ? setRating3(data.data.data) : setRating3(0))
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_rating_progress?product_id=${props.product_id}&rating=${2}`)
                .then((data) => (data.data.data > 0) ? setRating2(data.data.data) : setRating2(0))
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_rating_progress?product_id=${props.product_id}&rating=${1}`)
                .then((data) => (data.data.data > 0) ? setRating1(data.data.data) : setRating1(0))
        }
        else if ((props.user.user_id == undefined || props.user.user_id == '') && (props.product_id != undefined && props.product_id != '')) {
            setLoader(true);
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_product_product_id?product_id=${props.product_id}`)
                .then((data) => {
                    if (data.data.length > 0)
                        if (data.data[0].email != undefined) {
                            setPath(`Home / ${data.data[0].category} / ${data.data[0].subcategory} / ${data.data[0].product} / ${data.data[0].brand_name}`)
                            setProductDetails(data.data.slice())
                        }
                    setLoader(false);
                })
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_review?product_id=${props.product_id}`)
                .then((data) => {
                    (data.data.length > 0) ? setDetails(data.data.slice()) : setDetails([]);
                })
        }
        else if ((props.user.user_id == undefined || props.user.user_id == '') && (props.product_id == undefined || props.product_id == '')) {
            setMsg('Invalid Resource');
        }
    }, [])
    useEffect(() => {
        if (props.user.user_id != undefined && props.user.user_id != '') {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_cart_count?user_id=${props.user.user_id}`)
                .then((data) => props.getBagCount(data.data.data))
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/delete_cart_profile`)
                .then((data) => { })
        }
    }, [bagflag])
    useEffect(() => {
        if (prod_details.length > 0) {
            setAvgRating(prod_details[0].rating);
            setReviewCount(prod_details[0].rating_count_user);
        }
    }, [prod_details])
    useEffect(() => {
        if (fav_added == true) {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/delete_user_wishlistprofile`)
                .then((data) => { })
        }
    }, [fav_added])
    return (
        <>
            {loader == true ? <Loader /> : <>
                {msg == undefined && <>
                    <ToastContainer hideProgressBar={true} className='toastcontainer' bodyClassName='toastbody' closeButton={false} />
                    {prod_details.length > 0 && prod_details[0].count <= 0 && <>
                        <Box sx={{ marginTop: "180px", textAlign: "center", color: "red" }}>Item is out of Stock , Hence unable to Display Details !!!</Box>
                        <br></br>
                        <br></br>
                        <br></br>
                    </>}
                    {prod_details.length > 0 && prod_details[0].count > 0 && <>
                        {(reviewflag === false) && (prod_details.length > 0) && prod_details.map((li, index) => {
                            return (
                                <>
                                    <Typography variant='body1' sx={{ marginTop: '120px', marginLeft: '15px', fontWeight: 'bold' }}>{path}</Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                        {/* Left Pane */}
                                        <Box sx={{ flex: 7 }}>
                                            <ImageList key={index}>
                                                <ImageListItem sx={{ paddingLeft: '10px', paddingTop: '10px', width: '480px', height: '400px', cursor: 'pointer' }}
                                                ><img src={`data:image/png;base64,${li.image1[0]}`} alt='loading' /></ImageListItem>
                                                <ImageListItem sx={{ paddingLeft: '10px', paddingTop: '10px', width: '480px', height: '400px', cursor: 'pointer' }}
                                                ><img src={`data:image/png;base64,${li.image1[1]}`} alt='loading' /></ImageListItem>
                                                <ImageListItem sx={{ paddingLeft: '10px', paddingTop: '10px', width: '480px', height: '400px', cursor: 'pointer' }}
                                                ><img src={`data:image/png;base64,${li.image1[2]}`} alt='loading' /></ImageListItem>
                                                <ImageListItem sx={{ paddingLeft: '10px', paddingTop: '10px', width: '480px', height: '400px', cursor: 'pointer' }}
                                                ><img src={`data:image/png;base64,${li.image1[3]}`} alt='loading' /></ImageListItem>
                                                <ImageListItem sx={{ paddingLeft: '10px', paddingTop: '10px', width: '480px', height: '400px', cursor: 'pointer' }}
                                                ><img src={`data:image/png;base64,${li.image1[4]}`} alt='loading' /></ImageListItem>
                                                <ImageListItem sx={{ paddingLeft: '10px', paddingTop: '10px', width: '480px', height: '400px', cursor: 'pointer' }}
                                                ><img src={`data:image/png;base64,${li.image1[5]}`} alt='loading' /></ImageListItem>
                                            </ImageList >
                                        </Box >
                                        {/* Right Pane */}
                                        < Box sx={{ flex: 5, paddingLeft: '40px', paddingTop: '30px' }}>
                                            <Typography variant='h6' sx={{ fontSize: '30px', fontWeight: 'bold' }}>{li.brand_name}</Typography>
                                            <Typography variant='h6'>{li.description}</Typography>
                                            {review_count > 0 &&
                                                <Button variant='outlined' disableTouchRipple sx={{ paddingLeft: '10px', color: 'black', border: '1px solid grey !important', display: 'flex', width: '210px', height: '50px', backgroundColor: 'rgb(230,230,230)', marginTop: '10px', textTransform: 'none' }}>
                                                    <span style={{ fontSize: '17px' }}>{avg_rating}</span>
                                                    <span>< StarIcon sx={{ color: 'darkcyan', fontSize: '20px', paddingLeft: '2px', paddingTop: '5px' }} /></span>
                                                    <span style={{ paddingLeft: '5px', fontFamily: 'cursive', fontWeight: 'normal', fontSize: '20px' }}>|</span>
                                                    <span style={{ paddingLeft: '5px', fontFamily: 'cursive', fontWeight: 'normal', fontSize: '18px' }}>{review_count} Ratings</span>
                                                </Button>
                                            }
                                            <div style={{ marginTop: '20px', backgroundColor: 'lightgrey', height: '1pt' }} />
                                            <Box sx={{
                                                display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', width: '350px', marginTop: '20px'
                                            }}>
                                                < Typography variant='body1' sx={{ paddingLeft: '10px', fontSize: '25px', fontWeight: 'bolder', fontFamily: 'Arial' }}>&#8377; {li.price}</Typography>
                                                <span style={{ fontSize: '22px', color: 'grey' }}><del style={{ fontWeight: '100', fontFamily: 'cursive' }}> MRP &#8377;{li.strike_price} </del></span>
                                                <span style={{ fontSize: '14px', color: 'orange', fontSize: '20px' }}>({li.discount}% OFF)</span>
                                            </Box>
                                            <Typography variant='body1' sx={{ color: 'darkcyan', marginLeft: '10px', marginTop: '10px', fontSize: '18px', fontWeight: 'bolder', fontFamily: 'Arial' }}>Inclusive of all taxes</Typography>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-evenly', width: '300px', marginTop: '20px' }}>
                                                <Typography variant='subtitle1' sx={{ flex: 3, fontFamily: 'cursive', fontWeight: 'bolder' }}>SELECT SIZE</Typography>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', color: 'rgb(250, 50, 84)', cursor: 'pointer' }}>
                                                    <Typography variant='subtitle1' sx={{ flex: 9, fontFamily: 'cursive', fontWeight: 'bolder' }}>SIZE CHART </Typography>
                                                    < ArrowForwardIosIcon sx={{ marginLeft: '10px', fontSize: '16px', fontWeight: 'bolder', fontFamily: 'Arial' }} />
                                                </Box>
                                            </Box>
                                            {/* size chart */}
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', marginTop: '30px', marginLeft: '-10px', width: '500px' }}>
                                                {sizechart.map((li1, index1) => {
                                                    const checkval = (li1 == li.size) ? false : true
                                                    if (checkval === true) {
                                                        return (<>
                                                            <div style={{ width: '60px', height: '60px', border: '1px solid grey', backgroundColor: "rgb(240,240,240)", borderRadius: '50%', textAlign: 'center', cursor: 'not-allowed' }}>
                                                                <Typography variant='body2' sx={{ fontSize: '18px', paddingTop: '15px', fontWeight: 'bolder', fontFamily: 'cursive' }}>{li1}</Typography>
                                                            </div>
                                                        </>)
                                                    }
                                                    else if (checkval === false) {
                                                        return (
                                                            <>
                                                                <div style={{ width: '60px', height: '60px', border: '1px solid black', borderRadius: '50%', textAlign: 'center', cursor: 'pointer', '&:hover': { backgroundColor: 'rgb(243, 66, 140)' } }}>
                                                                    <Typography variant='body2' sx={{ fontSize: '18px', paddingTop: '15px', fontWeight: 'bolder', fontFamily: 'cursive' }}>{li1}</Typography>
                                                                </div>
                                                            </>
                                                        )
                                                    }
                                                })}
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', marginTop: '30px' }}>
                                                {props.user.user_id != undefined && (bagflag == false) &&
                                                    <Button disableTouchRipple startIcon={<LockIcon />} variant='contained' sx={{ color: 'white', fontFamily: 'TimesNewRoman', fontWeight: 'bold', backgroundColor: 'rgb(250, 50, 84)', '&:hover': { backgroundColor: 'rgb(250, 50, 84)' }, fontSize: '20px', padding: '10px 80px' }}
                                                        onClick={(e) => {
                                                            setLoader(true);
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
                                                            // generate file from base64 string
                                                            const file = dataURLtoFile(`data:image/png;base64,${li.image1[0]}`, 'cart.png')
                                                            if (file != undefined) {
                                                                let formData = new FormData();
                                                                formData.append('user_id', props.user.user_id);
                                                                formData.append('product_id', li.product_id);
                                                                formData.append('vendor_email', li.email);
                                                                formData.append('cart', file)
                                                                formData.append('brand_name', li.brand_name);
                                                                formData.append('description', li.description);
                                                                formData.append('comp_name', li.comp_name);
                                                                formData.append('size', li.size)
                                                                formData.append('qty', li.quantity);
                                                                formData.append('price', li.price);
                                                                formData.append('count', li.count);
                                                                formData.append('strike_price', li.strike_price);
                                                                formData.append('discount', li.discount);
                                                                axios.post(`${process.env.REACT_APP_BACKEND_URL}/add_cart`, formData, {
                                                                    headers: {
                                                                        "Content-Type": 'multipart-formdata'
                                                                    }
                                                                })
                                                                    .then((data) => {
                                                                        if (data.data.msg != undefined) {
                                                                            toast(<WishlistToast image={li.image1[0]} text='Added To Bag' />, {
                                                                                position: toast.POSITION.TOP_RIGHT,
                                                                                autoClose: 3000
                                                                            })
                                                                            setBagFlag(true)
                                                                        }
                                                                        else {
                                                                            toast(<WishlistToast text='Error please retry!!' />, {
                                                                                position: toast.POSITION.TOP_RIGHT,
                                                                                autoClose: 3000
                                                                            })
                                                                        }
                                                                        setLoader(false);
                                                                    })
                                                            }
                                                        }}> ADD TO BAG </Button>
                                                }
                                                {props.user.user_id != undefined && (bagflag == true) &&
                                                    <Button disableTouchRipple startIcon={<LockIcon />} variant='contained' sx={{ color: 'black', fontFamily: 'TimesNewRoman', fontWeight: 'bold', backgroundColor: 'white', border: "1px solid rgb(250, 50, 84)", '&:hover': { backgroundColor: 'white', color: "black", border: "1px solid rgb(250, 50, 84)" }, fontSize: '20px', padding: '10px 80px' }}> ADDED TO BAG </Button>
                                                }
                                                {props.user.user_id == undefined &&
                                                    <Button disableTouchRipple startIcon={<LockIcon />} variant='contained' sx={{ color: 'white', fontFamily: 'TimesNewRoman', fontWeight: 'bold', backgroundColor: 'rgb(250, 50, 84)', '&:hover': { backgroundColor: 'rgb(250, 50, 84)' }, fontSize: '20px', padding: '10px 80px' }}
                                                        component={Link} to='/'    > ADD TO BAG </Button>
                                                }
                                                {
                                                    (wishlist == true) &&
                                                    <Button disableTouchRipple startIcon={<FavoriteIcon sx={{ color: 'rgb(250, 50, 84)' }} />} variant='contained' sx={{ color: 'black', fontFamily: 'TimesNewRoman', fontWeight: 'bold', backgroundColor: 'rgb(90,90,90)', '&:hover': { backgroundColor: 'rgb(90,90,90)' }, fontSize: '20px', padding: '10px 50px', border: '1px solid grey' }}>WISHLISTED </Button>
                                                }
                                                {(wishlist == false) && <>
                                                    {fav_added == true &&
                                                        <Button disableTouchRipple startIcon={<FavoriteIcon sx={{ color: 'rgb(250, 50, 84)' }} />} variant='contained' sx={{ color: 'black', fontFamily: 'TimesNewRoman', fontWeight: 'bold', backgroundColor: 'rgb(90,90,90)', '&:hover': { backgroundColor: 'rgb(90,90,90)' }, fontSize: '20px', padding: '10px 50px', border: '1px solid grey' }}>WISHLISTED </Button>
                                                    }
                                                    {(fav_added == false) && (props.user.user_id != undefined) &&
                                                        <Button disableTouchRipple startIcon={<FavoriteBorderIcon />} variant='contained' sx={{ color: 'black', fontFamily: 'TimesNewRoman', fontWeight: 'bold', backgroundColor: 'white', '&:hover': { backgroundColor: 'white' }, fontSize: '20px', padding: '10px 50px', border: '1px solid grey' }}
                                                            onClick={async () => {
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
                                                                const file = dataURLtoFile(`data:image/png;base64,${li.image1[0]}`, 'test.png')
                                                                if (file != undefined) {
                                                                    let formData = new FormData();
                                                                    formData.append('user_id', props.user.user_id);
                                                                    formData.append('product_id', li.product_id);
                                                                    formData.append('vendor_email', li.email);
                                                                    formData.append('user_wish', file);
                                                                    formData.append('brand_name', li.brand_name);
                                                                    formData.append('description', li.description);
                                                                    formData.append('price', li.price)
                                                                    formData.append('strike_price', li.strike_price)
                                                                    formData.append('discount', li.discount)
                                                                    formData.append('size', li.size);
                                                                    formData.append('count', li.count);
                                                                    formData.append('qty', li.quantity);
                                                                    formData.append('comp_name', li.comp_name);
                                                                    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/add_user_wishlist`, formData, {
                                                                        headers: {
                                                                            "Content-Type": 'multipart-formdata'
                                                                        }
                                                                    }).then((data) => {
                                                                        if (data.data.msg == 'success')
                                                                            addfav(true)
                                                                        else
                                                                            addfav(false)
                                                                        setLoader(false);
                                                                    })
                                                                }
                                                            }
                                                            }>WISHLIST </Button>
                                                    }
                                                    {(fav_added == false) && (props.user.user_id == undefined) &&
                                                        <Button disableTouchRipple startIcon={<FavoriteBorderIcon />} variant='contained' sx={{ color: 'black', fontFamily: 'TimesNewRoman', fontWeight: 'bold', backgroundColor: 'white', '&:hover': { backgroundColor: 'white' }, fontSize: '20px', padding: '10px 50px', border: '1px solid grey' }}
                                                            component={Link} to='/'
                                                        >WISHLIST </Button>
                                                    }
                                                </>}
                                            </Box>
                                            <div style={{ marginTop: '30px', backgroundColor: 'lightgrey', height: '1pt' }} />
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', marginTop: '20px', width: '250px' }}>
                                                <Typography variant='body1' sx={{ fontWeight: 'bold' }}>DELIVERY OPTIONS</Typography>
                                                <FireTruckOutlinedIcon />
                                            </Box>
                                            <TextField type='text' placeholder="Enter pincode" sx={{ fontSize: '30px', marginTop: '20px', marginLeft: '20px', width: '300px' }} />
                                            <span style={{ display: 'inline-block', cursor: 'pointer', marginTop: '35px', marginLeft: '-60px', position: 'relative', zIndex: 3, color: 'rgb(250, 50, 84)' }}>check</span>
                                            <Typography variant='body1' sx={{ marginLeft: '30px', marginTop: '10px', fontFamily: 'verdana' }}>Please enter PIN code to check delivery time & Pay on Delivery Availability</Typography>
                                            <Typography variant='body1' sx={{ marginTop: '25px', marginLeft: '30px', fontFamily: 'verdana' }}>100% Original Products</Typography>
                                            <Typography variant='body1' sx={{ marginTop: '10px', marginLeft: '30px', fontFamily: 'verdana' }}>Pay on delivery might be available</Typography>
                                            <Typography variant='body1' sx={{ marginTop: '10px', marginLeft: '30px', fontFamily: 'verdana' }}>Easy 14 days returns and exchanges</Typography>
                                            <Typography variant='body1' sx={{ marginTop: '10px', marginLeft: '30px', fontFamily: 'verdana' }}>Try & Buy might be available</Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', marginTop: '40px', width: '150px', marginLeft: '30px' }}>
                                                <Typography variant='body1' sx={{ fontWeight: 'bold' }}> BEST OFFERS</Typography>
                                                <LocalOfferOutlinedIcon />
                                            </Box>
                                            <Typography variant='body1' sx={{ marginTop: '20px', marginLeft: '30px', fontFamily: 'verdana' }}>This product is already at its best price</Typography>
                                            <div style={{ marginTop: '20px', backgroundColor: 'lightgrey', height: '1pt' }} />
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', marginTop: '40px', width: '200px', marginLeft: '30px' }}>
                                                <Typography variant='body1' sx={{ fontWeight: 'bold' }}> PRODUCT DETAILS</Typography>
                                                <StickyNote2OutlinedIcon />
                                            </Box>
                                            <Typography variant='body1' sx={{ marginLeft: '40px', marginTop: '10px', fontFamily: 'verdana' }}>{li.description}</Typography>
                                            <Typography variant='body1' sx={{ marginLeft: '40px', marginTop: '10px', fontFamily: 'verdana' }}>{li.pattern}</Typography>
                                            <Typography variant='body1' sx={{ marginLeft: '40px', marginTop: '10px', fontFamily: 'verdana' }}> {li.neck}, {li.sleeve_length}</Typography>
                                            <Typography variant='body1' sx={{ marginLeft: '40px', marginTop: '10px', fontFamily: 'verdana' }}> {li.occasion}, {li.closure}</Typography>
                                            <Typography variant='body1' sx={{ marginLeft: '40px', marginTop: '10px', fontFamily: 'verdana' }}>{li.fabric}</Typography>
                                            <Typography variant='body1' sx={{ fontWeight: 'bold', marginTop: '20px', marginLeft: '40px', fontSize: '19px' }}> Size & Fit</Typography>
                                            <Typography variant='body1' sx={{ marginLeft: '40px', marginTop: '10px', fontFamily: 'verdana' }}>{li.size_fit}(height 5'8)</Typography>
                                            <Typography variant='body1' sx={{ fontWeight: 'bold', marginTop: '20px', marginLeft: '40px', fontSize: '19px' }}> Material & Care</Typography>
                                            <Typography variant='body1' sx={{ marginLeft: '40px', marginTop: '10px', fontFamily: 'verdana' }}>Fabric : 100% {li.fabric}</Typography>
                                            <Typography variant='body1' sx={{ marginLeft: '40px', marginTop: '10px', fontFamily: 'verdana' }}>{li.wash_care}</Typography>
                                            <Typography variant='body1' sx={{ fontWeight: 'bold', marginTop: '20px', marginLeft: '40px', fontSize: '19px' }}> Specifications</Typography>
                                            <Box sx={{ display: 'flex', marginTop: '15px', marginLeft: '-130px' }}>
                                                <Box sx={{ flex: 6 }}>
                                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                        <Typography sx={{ color: 'grey', fontSize: "15px", marginTop: "10px" }}>Fabric</Typography>
                                                        <Typography sx={{ width: '200px', color: 'black', fontSize: "19px", marginTop: "5px", marginLeft: '155px', borderBottom: '1px solid lightgrey' }}>{li.fabric}</Typography>
                                                        <Typography sx={{ color: 'grey', fontSize: "15px", marginTop: "15px" }}>Neck</Typography>
                                                        <Typography sx={{ width: '200px', color: 'black', fontSize: "19px", marginTop: "5px", marginLeft: '158px', borderBottom: '1px solid lightgrey' }}>{li.neck}</Typography>
                                                        <Typography sx={{ color: 'grey', fontSize: "15px", marginTop: "15px", marginLeft: "20px" }}>Occasion</Typography>
                                                        <Typography sx={{ width: '200px', color: 'black', fontSize: "19px", marginTop: "5px", marginLeft: '158px', borderBottom: '1px solid lightgrey' }}>{li.occasion}</Typography>
                                                        <Typography sx={{ color: 'grey', fontSize: "15px", marginTop: "15px", marginLeft: "25px" }}>Wash Care</Typography>
                                                        <Typography sx={{ width: '200px', color: 'black', fontSize: "19px", marginTop: "5px", marginLeft: '158px', borderBottom: '1px solid lightgrey' }}>{li.wash_care}</Typography>
                                                    </Box>
                                                </Box>
                                                <Box sx={{ flex: 6, marginLeft: '-120px' }}>
                                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                        <Typography sx={{ color: 'grey', fontSize: "15px", marginTop: "10px" }}>Pattern</Typography>
                                                        <Typography sx={{ width: '200px', color: 'black', fontSize: "19px", marginTop: "5px", marginLeft: '155px', borderBottom: '1px solid lightgrey' }}>{li.pattern}</Typography>
                                                        <Typography sx={{ color: 'grey', fontSize: "15px", marginTop: "15px", marginLeft: "49px" }}>Sleeve Length</Typography>
                                                        <Typography sx={{ width: '200px', color: 'black', fontSize: "19px", marginTop: "5px", marginLeft: '155px', borderBottom: '1px solid lightgrey' }}>{li.sleeve_length}</Typography>
                                                        <Typography sx={{ color: 'grey', fontSize: "15px", marginTop: "15px", marginLeft: "35px" }}>Main Trend</Typography>
                                                        <Typography sx={{ width: '200px', color: 'black', fontSize: "19px", marginTop: "5px", marginLeft: '158px', borderBottom: '1px solid lightgrey' }}>{li.main_trend}</Typography>
                                                        <Typography sx={{ color: 'grey', fontSize: "15px", marginTop: "15px", marginLeft: "15px" }}>Closure</Typography>
                                                        <Typography sx={{ width: '200px', color: 'black', fontSize: "19px", marginTop: "5px", marginLeft: '160px', borderBottom: '1px solid lightgrey' }}>{li.closure}</Typography>
                                                    </Box>
                                                </Box>
                                            </Box>
                                            <Typography variant='body1' sx={{ fontWeight: 'bold', marginTop: '30px', marginLeft: '40px', fontSize: '19px' }}> Complete Look</Typography>
                                            <Typography variant='body1' sx={{ marginTop: '10px', marginLeft: '40px', fontSize: '19px' }}>{li.complete_look}</Typography>
                                            <div style={{ marginTop: '20px', backgroundColor: 'lightgrey', height: '1pt' }} />
                                            {review_count > 0 && <>
                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', marginTop: '30px', width: '200px', marginLeft: '10px' }}>
                                                    <Typography variant='body1' sx={{ fontWeight: 'bold' }}> RATINGS</Typography>
                                                    <StarHalfOutlinedIcon />
                                                </Box>
                                                {/* 2 divisions */}
                                                <Box sx={{ display: "flex", alignItems: 'center' }}>
                                                    {/* left side */}
                                                    <Box sx={{ flex: 6 }}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px', marginLeft: '40px' }}>
                                                            <Typography variant='h2'>{avg_rating}</Typography>
                                                            <StarIcon sx={{ color: 'darkcyan', fontSize: '30px', marginLeft: '20px' }} />
                                                        </Box>
                                                        <Typography sx={{ marginLeft: '40px', marginTop: '10px' }}>{review_count} Verified Buyers</Typography>
                                                    </Box>
                                                    <Box sx={{ width: "2pt", height: "140px", backgroundColor: "rgb(200,200,200)" }}></Box>
                                                    {/* right side */}
                                                    <Box sx={{ flex: 6, marginLeft: "40px", marginRight: "50px" }}>
                                                        {/* rating5 */}
                                                        <Box sx={{ display: "flex", alignItems: 'center' }}>
                                                            <Typography sx={{ color: "grey", flex: 1 }}>5</Typography>
                                                            <StarIcon sx={{ color: "rgb(200,200,200)", fontSize: "18px" }} />
                                                            <LinearProgress variant='determinate' value={75} color='success' sx={{
                                                                marginLeft: "20px",
                                                                flex: 8, "--LinearProgress-radius": "0px",
                                                                "--LinearProgress-thickness": "8px",
                                                                backgroundColor: 'rgb(220,220,220)'
                                                            }} />
                                                            < Typography sx={{ marginLeft: "20px", color: "grey", flex: 2 }}>{rating5}</Typography>
                                                        </Box>
                                                        {/* rating4 */}
                                                        <Box sx={{ display: "flex", alignItems: 'center' }}>
                                                            <Typography sx={{ color: "grey", flex: 1 }}>4</Typography>
                                                            <StarIcon sx={{ color: "rgb(200,200,200)", fontSize: "18px" }} />
                                                            <LinearProgress variant='determinate' value={65} color='success' sx={{
                                                                marginLeft: "20px",
                                                                flex: 8, "--LinearProgress-radius": "0px",
                                                                "--LinearProgress-thickness": "8px",
                                                                backgroundColor: 'rgb(220,220,220)'
                                                            }} />
                                                            < Typography sx={{ marginLeft: "20px", color: "grey", flex: 2 }}>{rating4}</Typography>
                                                        </Box>
                                                        {/* rating3 */}
                                                        <Box sx={{ display: "flex", alignItems: 'center' }}>
                                                            <Typography sx={{ color: "grey", flex: 1 }}>3</Typography>
                                                            <StarIcon sx={{ color: "rgb(200,200,200)", fontSize: "18px" }} />
                                                            <LinearProgress variant='determinate' value={50} color='info' sx={{
                                                                marginLeft: "20px",
                                                                flex: 8, "--LinearProgress-radius": "0px",
                                                                "--LinearProgress-thickness": "8px",
                                                                backgroundColor: "rgb(220,220,220)"
                                                            }} />
                                                            < Typography sx={{ marginLeft: "20px", color: "grey", flex: 2 }}>{rating3}</Typography>
                                                        </Box>
                                                        {/* rating2 */}
                                                        <Box sx={{ display: "flex", alignItems: 'center' }}>
                                                            <Typography sx={{ color: "grey", flex: 1 }}>2</Typography>
                                                            <StarIcon sx={{ color: "rgb(200,200,200)", fontSize: "18px" }} />
                                                            <LinearProgress variant='determinate' value={30} color="warning" sx={{
                                                                marginLeft: "20px",
                                                                flex: 8, "--LinearProgress-radius": "0px",
                                                                "--LinearProgress-thickness": "8px",
                                                                backgroundColor: 'rgb(220,220,220)'
                                                            }} />
                                                            < Typography sx={{ marginLeft: "20px", color: "grey", flex: 2 }}>{rating2}</Typography>
                                                        </Box>
                                                        {/* rating1*/}
                                                        <Box sx={{ display: "flex", alignItems: 'center' }}>
                                                            <Typography sx={{ color: "grey", flex: 1 }}>1</Typography>
                                                            <StarIcon sx={{ color: "rgb(200,200,200)", fontSize: "18px" }} />
                                                            <LinearProgress variant='determinate' value={25} color='error' sx={{
                                                                marginLeft: "20px",
                                                                flex: 8, "--LinearProgress-radius": "0px",
                                                                "--LinearProgress-thickness": "8px",
                                                                backgroundColor: "rgb(220,220,220)"
                                                            }} />
                                                            < Typography sx={{ marginLeft: "20px", color: "grey", flex: 2 }}>{rating1}</Typography>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                                {/* //////// */}
                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', marginTop: '30px', width: '250px', marginLeft: '30px' }}>
                                                    <Typography variant='body1' sx={{ fontWeight: 'bold' }}> WHAT CUSTOMERS SAID</Typography>
                                                    <StarHalfOutlinedIcon />
                                                </Box>
                                                <Typography variant='body1' sx={{ fontWeight: 'bold', marginTop: '25px', marginLeft: '40px', fontSize: '19px' }}> Customer Reviews ({review_count})</Typography>
                                                {details.length > 0 &&
                                                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: "20px", marginLeft: '40px' }}>
                                                        <Box sx={{ flex: 1, backgroundColor: 'rgb(1, 90, 90)' }}>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "center" }}>
                                                                <Typography sx={{ color: "white", fontSize: '20px' }}>{details[0].rating}</Typography>
                                                                <StarIcon sx={{ color: 'white', fontSize: '20px', marginLeft: "3px" }} />
                                                            </Box>
                                                        </Box>
                                                        <Typography sx={{ flex: 11, marginTop: "20px", marginLeft: "20px", marginRight: '20px' }}>{details[0].comments}</Typography>
                                                    </Box>
                                                }
                                                {review_count > 0 &&
                                                    <Button variant='filled' sx={{ display: 'block', textTransform: 'none', fontSize: '20px', color: 'rgb(250, 50, 84)', fontFamily: 'cursive', fontWeight: 'bolder', marginTop: '5px', marginLeft: '30px' }}
                                                        disableTouchRipple onClick={() => setReviewFlag(true)}>View all {review_count} Reviews</Button>
                                                }
                                                <Typography sx={{ marginLeft: '40px', marginTop: '10px' }}>Product Code: <span style={{ fontWeight: 'bold' }}>{li.product_id}</span></Typography>
                                                <Typography sx={{ marginLeft: '40px', marginTop: '10px' }}>Seller: <span style={{ color: 'rgb(250, 50, 84)', fontWeight: 'bold' }}>{li.comp_name}</span></Typography>
                                                <Button variant='filled' sx={{ display: 'block', textTransform: 'none', fontSize: '20px', color: 'rgb(250, 50, 84)', fontFamily: 'cursive', fontWeight: 'bolder', marginTop: '10px', marginLeft: '30px' }}
                                                    disableTouchRipple onClick={(e) => setSupplyFlag(true)}>View Supplier Information</Button>
                                            </>}
                                        </Box >
                                    </Box >
                                </>
                            )
                        })}
                        {
                            supplyFlag === true && <>
                                < Dialog open={supplyFlag} sx={{ margin: 'auto', width: '800px', height: '650px' }}   >
                                    <DialogContent >
                                        <DialogContentText sx={{ width: '550px', height: "410px", overflow: "scroll" }} >
                                            <Box sx={{ display: 'flex', alignItems: "center" }}>
                                                <Typography sx={{ flex: 11, color: 'black', fontWeight: 'bold', fontSize: '20px' }}>More Information</Typography>
                                                <span style={{ fontSize: '40px', cursor: 'pointer', fontWeight: 'normal', flex: 1 }} onClick={() => setSupplyFlag(false)}>&times;</span>
                                            </Box>
                                            <Typography sx={{ flex: 10, fontSize: '18px', marginTop: '-10px' }}>Product Code:  {prod_details[0].product_id}</Typography>
                                            <Typography sx={{ marginTop: '15px', color: 'black', fontWeight: 'bold', fontSize: '20px' }}>Manufacture Details</Typography>
                                            <Typography sx={{ fontSize: '18px', marginTop: '8px' }}>MK Tailoring House. G-1/91, Sitapura Industrial Area, Jaipur-302022.</Typography>
                                            <Typography sx={{ marginTop: '15px', color: 'black', fontWeight: 'bold', fontSize: '20px' }}>Packer Details</Typography>
                                            <Typography sx={{ fontSize: '18px', marginTop: '8px' }}>MK Tailoring House. G-1/91, Sitapura Industrial Area, Jaipur-302022.</Typography>
                                            <Typography sx={{ marginTop: '15px', color: 'black', fontWeight: 'bold', fontSize: '20px' }}>Country of Origin</Typography>
                                            <Typography sx={{ fontSize: '18px', marginTop: '8px' }}>India</Typography>
                                        </DialogContentText>
                                    </DialogContent >
                                </Dialog >
                            </>
                        }
                        {reviewflag === true && review_count > 0 && <>
                            <ReviewProduct product_id={props.product_id} image={prod_details[0].image1[0]} count={review_count}
                                brand_name={prod_details[0].brand_name} price={prod_details[0].price} strike_price={prod_details[0].strike_price}
                                discount={prod_details[0].discount} description={prod_details[0].description} avg={avg_rating}
                                rating5={rating5} rating4={rating4} rating3={rating3} rating2={rating2} rating1={rating1} />
                        </>}
                    </>}
                </>}
                {msg != undefined && <>
                    <Typography sx={{ marginTop: "150px", color: "rgb(250, 102, 102)", textAlign: "center", fontWeight: "bold", fontSize: '26px' }}>{msg} !!</Typography>
                    <Typography sx={{ marginTop: "10px", color: "blue", textAlign: "center", fontWeight: "bold", fontSize: '16px' }}>Kindly Login  or Select the Product and View Details!</Typography>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                </>}
            </>}
        </>
    )
}

const mapStateToProps = (cstate) => {
    return {
        product_id: cstate.userpg_product_id,
        user: cstate.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getBagCount: (data) => dispatch(getBagCount(data)),
        setNavBar: (data) => dispatch(setNavBar(data)),
        setFooter: (data) => dispatch(setFooter(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Buy);