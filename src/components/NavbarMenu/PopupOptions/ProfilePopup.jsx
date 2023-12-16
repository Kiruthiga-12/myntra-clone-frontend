import { Dialog, DialogContent, DialogContentText, Typography, Button, ListItemButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setProfileMenu, userLogout } from '../../Redux_Store/Action_Creators';
const ProfilePopup = (props) => {
    return (<>
        <Dialog open={props.show_profile} hideBackdrop sx={{
            marginTop: '60px', backgroundColor: 'transparent', width: '470px', height: '680px', color: 'black',
            marginLeft: '1250px'
        }} aria-describedby='profile_text' id='profile_dialog'>
            <DialogContent >
                <DialogContentText sx={{ width: '300px', height: '570px', paddingLeft: '20px', paddingTop: '5px' }} id='profile_text'>
                    {props.is_user_logged === false && <>
                        <Typography variant='subtitle1' sx={{ fontWeight: 'bolder', fontSize: '18px' }}>Welcome</Typography>
                        <Typography>To access accounts and manage orders</Typography>
                        <Button variant='outlined' disableTouchRipple sx={{
                            marginTop: '10px', color: 'rgb(243, 66, 140)', border: '1px solid grey', '&:hover': {
                                backgroundColor: 'transparent',
                                border: '1px solid rgb(243, 66, 140)'
                            }
                        }}
                            component={Link} to='/'>Login/Signup</Button>
                        <div style={{ marginTop: '15px', width: '90%', height: '1pt', backgroundColor: 'lightgrey' }}></div>
                        <ListItemButton disableTouchRipple sx={{ color: 'grey', '&:hover': { backgroundColor: 'transparent', color: 'black', fontFamily: 'Arial', fontWeight: 'bold' } }}
                            component={Link} to='/'>Orders</ListItemButton>
                        <ListItemButton disableTouchRipple sx={{ color: 'grey', '&:hover': { backgroundColor: 'transparent', color: 'black', fontFamily: 'Arial', fontWeight: 'bold' } }}
                            component={Link} to='/wishlist'>Wishlist</ListItemButton>
                        <ListItemButton disableTouchRipple sx={{ color: 'grey', '&:hover': { backgroundColor: 'transparent', color: 'black', fontFamily: 'Arial', fontWeight: 'bold' } }}
                            component={Link} to='/my'>Gift Cards</ListItemButton>
                        <ListItemButton disableTouchRipple sx={{ color: 'grey', '&:hover': { backgroundColor: 'transparent', color: 'black', fontFamily: 'Arial', fontWeight: 'bold' } }}
                            component={Link} to='/contactus'>Contact Us</ListItemButton>
                        <ListItemButton disableTouchRipple sx={{ color: 'grey', '&:hover': { backgroundColor: 'transparent', color: 'black', fontFamily: 'Arial', fontWeight: 'bold' } }}
                            component={Link} to='/my'>Myntra Insider</ListItemButton>
                        <div style={{ marginTop: '15px', width: '90%', height: '1pt', backgroundColor: 'lightgrey' }}></div>
                        <ListItemButton disableTouchRipple sx={{ color: 'grey', '&:hover': { backgroundColor: 'transparent', color: 'black', fontFamily: 'Arial', fontWeight: 'bold' } }}
                            component={Link} to='/'>Myntra Credit</ListItemButton>
                        <ListItemButton disableTouchRipple sx={{ color: 'grey', '&:hover': { backgroundColor: 'transparent', color: 'black', fontFamily: 'Arial', fontWeight: 'bold' } }}
                            component={Link} to='/'>Coupons</ListItemButton>
                        <ListItemButton disableTouchRipple sx={{ color: 'grey', '&:hover': { backgroundColor: 'transparent', color: 'black', fontFamily: 'Arial', fontWeight: 'bold' } }}
                            component={Link} to='/'>Saved Cards</ListItemButton>
                        <ListItemButton disableTouchRipple sx={{ color: 'grey', '&:hover': { backgroundColor: 'transparent', color: 'black', fontFamily: 'Arial', fontWeight: 'bold' } }}
                            component={Link} to='/'>Saved UPI</ListItemButton>
                        <ListItemButton disableTouchRipple sx={{ color: 'grey', '&:hover': { backgroundColor: 'transparent', color: 'black', fontFamily: 'Arial', fontWeight: 'bold' } }}
                            component={Link} to='/'>Wallets / BNPL</ListItemButton>
                        <ListItemButton disableTouchRipple sx={{ color: 'grey', '&:hover': { backgroundColor: 'transparent', color: 'black', fontFamily: 'Arial', fontWeight: 'bold' } }}
                            component={Link} to='/'> Saved Addresses</ListItemButton>
                    </>}
                    {props.is_user_logged === true && <>
                        <ListItemButton disableTouchRipple sx={{ color: 'black', fontWeight: 'bolder', fontSize: '18px', '&:hover': { backgroundColor: 'transparent', color: 'black', fontFamily: 'Arial', fontWeight: 'bold' } }}
                            component={Link} to='/my' onClick={() => props.setProfileMenu('personaldetails')}>Hello {props.user.user_fullname}</ListItemButton>
                        <ListItemButton disableTouchRipple sx={{ color: 'grey', '&:hover': { backgroundColor: 'transparent', color: 'black', fontFamily: 'Arial', fontWeight: 'bold' } }}
                            component={Link} to='/my' onClick={() => props.setProfileMenu('personaldetails')}>{props.user.user_mobile}</ListItemButton>
                        <div style={{ marginTop: '10px', width: '90%', height: '1pt', backgroundColor: 'lightgrey' }}></div>
                        <ListItemButton disableTouchRipple sx={{ color: 'grey', '&:hover': { backgroundColor: 'transparent', color: 'black' } }}
                            component={Link} to='/my' onClick={() => props.setProfileMenu('orders')}>Orders</ListItemButton>
                        <ListItemButton disableTouchRipple sx={{ color: 'grey', '&:hover': { backgroundColor: 'transparent', color: 'black' } }}
                            component={Link} to='/wishlist'>Wishlist</ListItemButton>
                        <ListItemButton disableTouchRipple sx={{ color: 'grey', '&:hover': { backgroundColor: 'transparent', color: 'black' } }}
                            component={Link} to='/my' onClick={() => props.setProfileMenu('gift_cards')}>Gift Cards</ListItemButton>
                        <ListItemButton disableTouchRipple sx={{ color: 'grey', '&:hover': { backgroundColor: 'transparent', color: 'black' } }}
                            component={Link} to='/contactus'>Contact Us</ListItemButton>
                        <ListItemButton disableTouchRipple sx={{ color: 'grey', '&:hover': { backgroundColor: 'transparent', color: 'black' } }}
                            component={Link} to='/my' onClick={() => props.setProfileMenu('insider')}>Myntra Insider</ListItemButton>
                        <div style={{ marginTop: '10px', width: '90%', height: '1pt', backgroundColor: 'lightgrey' }}></div>
                        <ListItemButton disableTouchRipple sx={{ color: 'grey', '&:hover': { backgroundColor: 'transparent', color: 'black' } }}
                            component={Link} to='/my' onClick={() => props.setProfileMenu('credit')}>Myntra Credit</ListItemButton>
                        <ListItemButton disableTouchRipple sx={{ color: 'grey', '&:hover': { backgroundColor: 'transparent', color: 'black' } }}
                            component={Link} to='/my' onClick={() => props.setProfileMenu('coupon')}>Coupons</ListItemButton>
                        <ListItemButton disableTouchRipple sx={{ color: 'grey', '&:hover': { backgroundColor: 'transparent', color: 'black' } }}
                            component={Link} to='/my' onClick={() => props.setProfileMenu('card')}>Saved Cards</ListItemButton>
                        <ListItemButton disableTouchRipple sx={{ color: 'grey', '&:hover': { backgroundColor: 'transparent', color: 'black' } }}
                            component={Link} to='/my' onClick={() => props.setProfileMenu('upi')}>Saved UPI</ListItemButton>
                        <ListItemButton disableTouchRipple sx={{ color: 'grey', '&:hover': { backgroundColor: 'transparent', color: 'black' } }}
                            component={Link} to='/my' onClick={() => props.setProfileMenu('wallets')}>Wallets / BNPL</ListItemButton>
                        <ListItemButton disableTouchRipple sx={{ color: 'grey', '&:hover': { backgroundColor: 'transparent', color: 'black' } }}
                            component={Link} to='/my'
                            onClick={() => props.setProfileMenu('saveaddress')}>Saved Addresses</ListItemButton>
                        <div style={{ marginTop: '10px', width: '90%', height: '1pt', backgroundColor: 'lightgrey' }}></div>
                        <ListItemButton disableTouchRipple sx={{ color: 'grey', '&:hover': { backgroundColor: 'transparent' } }}
                            component={Link} to='/my'
                            onClick={() => props.setProfileMenu('editdetails')}>Edit Profile</ListItemButton>
                        <ListItemButton disableTouchRipple sx={{ color: 'grey', '&:hover': { backgroundColor: 'transparent' } }}
                            component={Link} to='/'
                            onClick={() => {
                                props.userLogout();
                                localStorage.removeItem('user_key');
                            }}>Logout</ListItemButton>
                    </>}
                </DialogContentText>
            </DialogContent>
        </Dialog>
    </>)
}
const mapStateToProps = (cstate) => {
    return {
        is_user_logged: cstate.is_user_logged,
        user: cstate.user,
        is_user_logout: cstate.is_user_logout
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userLogout: () => dispatch(userLogout()),
        setProfileMenu: (data) => dispatch(setProfileMenu(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePopup);