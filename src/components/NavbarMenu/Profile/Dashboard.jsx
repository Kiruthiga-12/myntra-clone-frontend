import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import LocalGroceryStoreRoundedIcon from '@mui/icons-material/LocalGroceryStoreRounded';
import CollectionsBookmarkRoundedIcon from '@mui/icons-material/CollectionsBookmarkRounded';
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import CreditScoreRoundedIcon from '@mui/icons-material/CreditScoreRounded';
import WalletOutlinedIcon from '@mui/icons-material/WalletOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import DiscountOutlinedIcon from '@mui/icons-material/DiscountOutlined';
import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined';
import PaymentsIcon from '@mui/icons-material/Payments';
import { connect } from 'react-redux';
import { getBagCount, setProfileMenu, userLogout } from '../../Redux_Store/Action_Creators';
import { useEffect } from 'react';
const Dashboard = (props) => {
    useEffect(() => {
        document.title = 'Myntra'
    }, [])
    return (
        <>
            <Box sx={{ backgroundColor: 'rgb(240,240,240)', height: '220px', width: '900px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <img src={`data:image/png;base64,${props.img}`} width='180px' height='170px' style={{ marginTop: "30px", marginLeft: "20px" }} alt='loading' />
                    <Typography sx={{ flex: 5, marginLeft: '50px', marginTop: '100px' }}>{props.mail} </Typography>
                    <Button variant='outlined' sx={{
                        flex: 2, fontWeight: "bold",
                        color: 'black', border: '1px solid black', height: '40px', width: '140px', marginTop: '30px',
                        '&:hover': { backgroundColor: 'transparent', border: '1px solid black' }
                    }} onClick={() => props.setProfileMenu('editdetails')}>EDIT PROFILE</Button>
                    <Box sx={{ flex: 1 }}></Box>
                </Box>
            </Box >
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginTop: '60px', flexWrap: 'wrap' }}>
                <Box sx={{ cursor: 'pointer', textDecoration: 'none', textAlign: 'center', width: '270px', height: '270px', border: '1px solid lightgrey' }}
                    component={Link} to='/my' onClick={() => props.setProfileMenu('orders')}>
                    <LocalGroceryStoreRoundedIcon sx={{ fontSize: '30px', marginTop: '80px', color: 'grey' }} />
                    <Typography sx={{ fontWeight: 'bold', marginTop: '20px', color: 'black' }}>Orders</Typography>
                    <Typography sx={{ color: 'grey' }}>Check your Order Status</Typography>
                </Box>
                <Box sx={{ cursor: 'pointer', textDecoration: 'none', textAlign: 'center', width: '270px', height: '270px', border: '1px solid lightgrey', marginLeft: '20px' }}
                    component={Link} to='/wishlist'>
                    < CollectionsBookmarkRoundedIcon sx={{ fontSize: '30px', marginTop: '80px', color: 'grey' }} />
                    <Typography sx={{ fontWeight: 'bold', marginTop: '20px', color: 'black' }}>Collections & Wishlist</Typography>
                    <Typography sx={{ color: 'grey' }}>All your curated product Collections</Typography>
                </Box>
                <Box sx={{ cursor: 'pointer', textDecoration: 'none', textAlign: 'center', width: '270px', height: '270px', border: '1px solid lightgrey', marginLeft: '20px' }}
                    component={Link} to='/my' onClick={() => props.setProfileMenu('credit')}>
                    < CurrencyRupeeRoundedIcon sx={{ fontSize: '30px', marginTop: '80px', color: 'grey' }} />
                    <Typography sx={{ fontWeight: 'bold', marginTop: '20px', color: 'black' }}>Myntra Credit</Typography>
                    <Typography sx={{ color: 'grey' }}>Manage all your refunds & credit cards</Typography>
                </Box>
                <Box sx={{ cursor: 'pointer', textDecoration: 'none', textAlign: 'center', width: '270px', height: '270px', border: '1px solid lightgrey', marginTop: '20px' }}
                    component={Link} to='/my' onClick={() => props.setProfileMenu('cash')}>
                    < CreditScoreRoundedIcon sx={{ fontSize: '30px', marginTop: '80px', color: 'grey' }} />
                    <Typography sx={{ fontWeight: 'bold', marginTop: '20px', color: 'black' }}>Myn Cash</Typography>
                    <Typography sx={{ color: 'grey' }}>Earn Myn cash as you shop and use them in checkout.</Typography>
                </Box>
                <Box sx={{ cursor: 'pointer', textDecoration: 'none', textAlign: 'center', width: '270px', height: '270px', border: '1px solid lightgrey', marginTop: '20px', marginLeft: '20px' }}
                    component={Link} to='/my' onClick={() => props.setProfileMenu('card')}>
                    < WalletOutlinedIcon sx={{ fontSize: '30px', marginTop: '80px', color: 'grey' }} />
                    <Typography sx={{ fontWeight: 'bold', marginTop: '20px', color: 'black' }}>Saved Cards</Typography>
                    <Typography sx={{ color: 'grey' }}>Save your cards for faster checkout.</Typography>
                </Box>
                <Box sx={{ cursor: 'pointer', textDecoration: 'none', textAlign: 'center', width: '270px', height: '270px', border: '1px solid lightgrey', marginTop: '20px', marginLeft: '20px' }}
                    component={Link} to='/my' onClick={() => props.setProfileMenu('upi')}>
                    < PaymentOutlinedIcon sx={{ fontSize: '30px', marginTop: '80px', color: 'grey' }} />
                    <Typography sx={{ fontWeight: 'bold', marginTop: '20px', color: 'black' }}>Saved UPI</Typography>
                    <Typography sx={{ color: 'grey' }}>View your saved UPI.</Typography>
                </Box>
                <Box sx={{ cursor: 'pointer', textDecoration: 'none', textAlign: 'center', width: '270px', height: '270px', border: '1px solid lightgrey', marginTop: '20px' }}
                    component={Link} to='/my' onClick={() => props.setProfileMenu('wallets')}>
                    < PaymentsIcon sx={{ fontSize: '30px', marginTop: '80px', color: 'grey' }} />
                    <Typography sx={{ fontWeight: 'bold', marginTop: '20px', color: 'black' }}>Wallets / BNPL</Typography>
                    <Typography sx={{ color: 'grey' }}>View your saved wallets and BNPL.</Typography>
                </Box>
                <Box sx={{ cursor: 'pointer', textDecoration: 'none', textAlign: 'center', width: '270px', height: '270px', border: '1px solid lightgrey', marginTop: '20px', marginLeft: "20px" }}
                    component={Link} to='/my' onClick={() => props.setProfileMenu('saveaddress')}>
                    <  AddLocationAltOutlinedIcon sx={{ fontSize: '30px', marginTop: '80px', color: 'grey' }} />
                    <Typography sx={{ fontWeight: 'bold', marginTop: '20px', color: 'black' }}>Addresses</Typography>
                    <Typography sx={{ color: 'grey' }}>Saved addresses for hassle-free checkout</Typography>
                </Box>
                <Box sx={{ cursor: 'pointer', textDecoration: 'none', textAlign: 'center', width: '270px', height: '270px', border: '1px solid lightgrey', marginTop: '20px', marginLeft: '20px' }}
                    component={Link} to='/my' onClick={() => props.setProfileMenu('coupon')}>
                    < DiscountOutlinedIcon sx={{ fontSize: '30px', marginTop: '80px', color: 'grey' }} />
                    <Typography sx={{ fontWeight: 'bold', marginTop: '20px', color: 'black' }}>Coupons</Typography>
                    <Typography sx={{ color: 'grey' }}>Manage coupons for additional discounts</Typography>
                </Box>
                <Box sx={{ cursor: 'pointer', textDecoration: 'none', textAlign: 'center', width: '270px', height: '270px', border: '1px solid lightgrey', marginTop: '20px' }}
                    component={Link} to='/my' onClick={() => props.setProfileMenu('editdetails')}>
                    < CreditScoreOutlinedIcon sx={{ fontSize: '30px', marginTop: '80px', color: 'grey' }} />
                    <Typography sx={{ fontWeight: 'bold', marginTop: '20px', color: 'black' }}>Profile Details</Typography>
                    <Typography sx={{ color: 'grey' }}>Change your profile details & password</Typography>
                </Box>
            </Box>
            <Button sx={{
                fontSize: '16px', textAlign: 'center', marginTop: '20px', width: '300px', color: 'white',
                '&:hover': { backgroundColor: 'rgb(250, 50, 84)' }, backgroundColor: 'rgb(250, 50, 84)'
            }}
                component={Link} to='/' onClick={() => {
                    props.userLogout();
                    localStorage.removeItem('user_key')
                    props.getBagCount();
                }}>LOGOUT</Button >

        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setProfileMenu: (data) => dispatch(setProfileMenu(data)),
        userLogout: () => dispatch(userLogout()),
        getBagCount: () => dispatch(getBagCount())
    }
}

export default connect(null, mapDispatchToProps)(Dashboard);
