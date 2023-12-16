import { Button, Typography, Box } from "@mui/material";
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import { Link } from 'react-router-dom';
import WishlistItems from "./WishlistItems";
import { useState, useEffect } from 'react';
import axios from 'axios';
import SubscriptionNews from "../SubscriptionNews";
import { connect } from 'react-redux';
import Loader from "../../Loader/Loader";
import { setNavBar, setFooter } from "../../Redux_Store/Action_Creators";
const Wishlist = (props) => {
    const [wish_data, setWishData] = useState([])
    const [loader, setLoader] = useState(false);
    useEffect(() => {
        document.title = 'Wishlist';
        props.setNavBar('navbar');
        props.setFooter('footer');
        if (props.user.user_id != undefined && props.user.user_id != '') {
            setLoader(true);
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_wishlist?user_id=${props.user.user_id}`)
                .then(async (data) => {
                    (data.data.length > 0) ? setWishData(data.data.slice()) : setWishData([])
                    setLoader(false);
                })
        }

    }, [])
    useEffect(() => {
        if (props.user.user_id != undefined && props.user.user_id != '') {
            setLoader(true)
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_wishlist?user_id=${props.user.user_id}`)
                .then(async (data) => {
                    (data.data.length > 0) ? setWishData(data.data.slice()) : setWishData([])
                    setLoader(false);
                })
        }
    }, [props])
    return (<>
        {loader == true ? <Loader /> : <>
            {(props.user.user_id == '' || props.user.user_id == undefined) && <>
                <Box sx={{ marginTop: '300px', textAlign: 'center', height: '100vh' }}>
                    <Typography variant='h5' sx={{ fontWeight: 'bold' }}>PLEASE LOG IN </Typography>
                    <Typography variant='body1' sx={{ marginTop: '20px', fontSize: '20px', color: 'grey' }}>Login to view items in your wishlist.</Typography>
                    <StyleOutlinedIcon sx={{ display: 'block', fontSize: '190px', margin: 'auto', marginTop: '40px', color: 'slateblue' }} />
                    <Button variant='outlined' component={Link} to='/' sx={{ fontSize: '20px', marginTop: '40px', fontWeight: 'bolder' }}
                        disableTouchRipple>LOGIN </Button>
                </Box >
            </>}
            {wish_data.length > 0 && (props.user.user_id != '' && props.user.user_id != undefined) && <>
                <Box sx={{ marginTop: '160px', marginLeft: '90px', height: '100%' }}>
                    <Typography variant='h6' sx={{ fontWeight: 'bold', fontSize: '20px' }}>My Wishlist  <span style={{ fontWeight: 'normal', fontFamily: 'cursive', color: 'grey' }}> {wish_data.length} items</span></Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap', marginLeft: '-100px', marginTop: '-50px' }}>
                        {(wish_data.length > 0) &&
                            wish_data.map((li) => {
                                return (
                                    <WishlistItems brand={li.brand_name} descr={li.description} image={li.image1[0]}
                                        price={li.price} strike_price={li.strike_price} discount={li.discount}
                                        product_id={li.product_id} size={li.size} qty={li.qty} comp_name={li.comp_name} user_id={li.user_id}
                                        vendor_email={li.vendor_email} count={li.count} />
                                )
                            })}

                    </Box>
                </Box >
                <SubscriptionNews />
            </>}
            {
                wish_data.length == 0 && (props.user.user_id != '' && props.user.user_id != undefined) &&
                < Box sx={{ marginTop: '300px', textAlign: 'center', height: '100vh' }}>
                    <Typography variant='h5' sx={{ fontWeight: 'bold' }}>YOUR WISHLIST IS EMPTY </Typography>
                    <Typography variant='body1' sx={{ margin: 'auto', marginTop: '20px', fontSize: '20px', color: 'grey', width: '27%' }}>Add items that you like to your wishlist. Review them anytime and easily move them to the bag.</Typography>
                    <StyleOutlinedIcon sx={{ display: 'block', fontSize: '190px', margin: 'auto', marginTop: '40px', color: 'slateblue' }} />
                    <Button variant='outlined' component={Link} to='/home' sx={{ fontSize: '20px', marginTop: '40px', fontWeight: 'bolder' }}
                        disableTouchRipple>CONTINUE SHOPPING </Button>
                </Box >
            }
            <br />
            <br />
            <br />
            <br />
            <br />
        </>}
    </>)
}
const mapStateToProps = (cstate) => {
    return {
        wishlist_iterate: cstate.wishlist_iterate,
        user: cstate.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setNavBar: (data) => dispatch(setNavBar(data)),
        setFooter: (data) => dispatch(setFooter(data)),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
