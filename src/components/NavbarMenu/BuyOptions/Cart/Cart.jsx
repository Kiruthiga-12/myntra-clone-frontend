import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import CartBag from './CartBag';
import CartFooter from './CartFooter';
import CartAddress from './CartAddress';
import Cartpayment from './Cartpayment';
import CartNavbar from './CartNavbar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getBagCount, setNavBar, setFooter } from '../../../Redux_Store/Action_Creators';
const Cart = (props) => {
    useEffect(() => {
        props.setNavBar('navbar');
        props.setFooter('');
        if (props.user.user_id != undefined && props.user.user_id != '') {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_cart_count?user_id=${props.user.user_id}`)
                .then((data) => {
                    props.getBagCount(data.data.data)
                })
        }
    }, [])
    return (
        <>
            <CartNavbar />
            {/* Empty Cart */}
            {props.bag_count == 0 && <>
                <Box sx={{ marginTop: '280px', textAlign: 'center', height: '100vh' }}>
                    <ShoppingBagOutlinedIcon sx={{ fontSize: '100px' }} />
                    <Typography variant='h5' sx={{ fontWeight: 'bold', fontSize: '20px', marginTop: '40px' }}>Hey , it feels so light! </Typography>
                    <Typography variant='body1' sx={{ fontSize: '17px', fontFamily: '', marginTop: '20px', color: 'grey' }}>There is nothing in your bag.Let's add some items</Typography>
                    <Button variant='outlined' component={Link} to='/wishlist' sx={{
                        fontSize: '20px', marginTop: '40px', fontWeight: 'bolder',
                        color: 'rgb(243, 66, 140)', border: '1px solid rgb(243, 66, 140)'
                        , '&:hover': { backgroundColor: 'transparent' }
                    }}
                        disableTouchRipple>ADD ITEMS FROM WISHLIST </Button>
                </Box >
            </>}
            {/* Cart with Items */}
            {props.bag_count > 0 && <>
                {props.cart_state == 'Bag' && <>
                    <CartBag />
                </>}
                {props.cart_state == 'Address' && <>
                    <CartAddress />
                </>}
                {props.cart_state == 'Payment' && <>
                    <Cartpayment />
                </>}
            </>}
            {/* Footer */}
            <CartFooter />
        </>
    )
}
const mapStateToProps = (cstate) => {
    return {
        cart_state: cstate.cart_state,
        user: cstate.user,
        bag_count: cstate.bag_count
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getBagCount: (data) => dispatch(getBagCount(data)),
        setNavBar: (data) => dispatch(setNavBar(data)),
        setFooter: (data) => dispatch(setFooter(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);