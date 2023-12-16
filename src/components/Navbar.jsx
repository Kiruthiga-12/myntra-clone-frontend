import { AppBar, Toolbar, Badge, Box, Typography, ListItemButton, Button } from '@mui/material';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { Outlet } from 'react-router-dom';
import ProfilePopup from './NavbarMenu/PopupOptions/ProfilePopup';
import { Link } from 'react-router-dom';
import MenPopup from './NavbarMenu/PopupOptions/MenPopup';
import WomenPopup from './NavbarMenu/PopupOptions/WomenPopup';
import KidsPopup from './NavbarMenu/PopupOptions/KidsPopup';
import LivingPopup from './NavbarMenu/PopupOptions/LivingPopup';
import BeautyPopup from './NavbarMenu/PopupOptions/BeautyPopup';
import StudioPopup from './NavbarMenu/PopupOptions/StudioPopup';
import { connect } from 'react-redux';
import SearchBar from './SearchBar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { setUserPageCat, setUserPageSubCat, setUserPageProdCat, getBagCount } from './Redux_Store/Action_Creators';
const Navbar = (props) => {
    const [show_profile, setShowProfile] = useState(false);
    const [tab_value, setTabValue] = useState('');
    const [status, setStatus] = useState(false);
    const [catgroup, setCatGroup] = useState([]);
    useEffect(() => {
        (props.catgroup.length > 0) ? setCatGroup(props.catgroup.slice()) : setCatGroup([])
        if (props.user.user_id != 0 && props.user.user_id != undefined)
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_cart_count?user_id=${props.user.user_id}`)
                .then((data) => props.getBagCount(data.data.data))
    }, [])

    useEffect(() => {
        if (props.user.user_id != 0 && props.user.user_id != undefined && props.bag_count >= 0) {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_cart_count?user_id=${props.user.user_id}`)
                .then((data) => props.getBagCount(data.data.data))
        }
    }, [props])
    return (
        <>
            <div id='myntra_navbar'>
                <AppBar className='Navbar' sx={{ backgroundColor: 'white' }} >
                    <Toolbar>
                        <Button disableTouchRipple sx={{
                            backgroundColor: 'transparent', border: 'none',
                            '&:hover': { backgroundColor: 'transparent', border: 'none' }
                        }}
                            component={Link} to='/home'><img src='/Images/myntra_favicon.png' alt='Not loaded' width='100vw' height='70vh' style={{ flex: 1 }} /></Button>
                        {catgroup.length > 0 && catgroup.map((li, index) => {
                            return (
                                <ListItemButton sx={{
                                    color: 'black', flex: 3, marginLeft: '20px',
                                    '&:hover': { backgroundColor: 'transparent' }
                                }} disableTouchRipple
                                    onMouseMove={async (e) => {
                                        if (e.clientY > 716 || e.clientY <= 40 || e.clientX <= 155)
                                            setStatus(false);

                                        else if (e.clientY <= 716 && e.clientY > 40)
                                            setStatus(true);

                                        setTabValue(li.category.toUpperCase());
                                    }}
                                    onMouseLeave={async (e) => {
                                        if (e.clientY > 716 || e.clientY <= 40 || e.clientX <= 155)
                                            setStatus(false);

                                        else if (e.clientY <= 716 && e.clientY > 40)
                                            setStatus(true);

                                        setTabValue(li.category.toUpperCase());
                                    }}
                                    component={Link} to={'/shop/' + li.category.toLowerCase()}
                                    onClick={(e) => {
                                        setStatus(false);
                                        props.setUserPageCat(li.category)
                                        props.setUserPageSubCat('')
                                        props.setUserPageProdCat('')
                                    }}
                                    key={index}>{li.category.toUpperCase()}
                                    {tab_value === (li.category.toUpperCase()) && tab_value === 'MEN' && <MenPopup status={status} />}
                                    {tab_value === (li.category.toUpperCase()) && tab_value === 'WOMEN' && <WomenPopup status={status} />}
                                    {tab_value === (li.category.toUpperCase()) && tab_value === 'KIDS' && <KidsPopup status={status} />}
                                    {tab_value === (li.category.toUpperCase()) && tab_value === 'LIVING' && <LivingPopup status={status} />}
                                    {tab_value === (li.category.toUpperCase()) && tab_value === 'BEAUTY' && <BeautyPopup status={status} />}
                                </ListItemButton>
                            )
                        })}
                        <ListItemButton sx={{ color: 'black', flex: 2, marginLeft: '20px', '&:hover': { backgroundColor: 'transparent' } }} disableTouchRipple
                            onMouseMove={async (e) => {
                                setStatus(true);
                                setTabValue('STUDIO');
                            }}
                            onMouseLeave={async (e) => {
                                setStatus(false);
                                setTabValue('STUDIO');
                            }} component={Link} to='/shop/studio' onClick={() => setStatus(false)}>STUDIO
                            <span style={{ color: 'rgb(243, 66, 140)', fontSize: '13px', marginLeft: '7px', marginTop: '-30px' }}>NEW</span>
                            {tab_value === 'STUDIO' && <StudioPopup status={status} />}
                        </ListItemButton>
                        <span style={{ color: 'black', fontWeight: "bold", marginLeft: '20px', display: 'none' }}>user:id </span>        <span style={{ display: 'none' }} id='userlogin_userid'>{props.user.user_id}</span>
                        {tab_value === 'MEN' && status === true && <div style={{ position: 'fixed', borderTop: '5px solid rgb(199, 12, 74)', margin: 'auto', width: '80px', height: '10pt', top: '85px', left: '190px', display: 'inline-block' }}></div>}
                        {tab_value === 'WOMEN' && status === true && <div style={{ position: 'fixed', borderTop: '5px solid rgb(243, 66, 140)', margin: 'auto', width: '80px', height: '10pt', top: '85px', left: '320px', display: 'inline-block' }}></div>}
                        {tab_value === 'KIDS' && status === true && <div style={{ position: 'fixed', borderTop: '5px solid rgb(243, 139, 21)', margin: 'auto', width: '80px', height: '10pt', top: '85px', left: '420px', display: 'inline-block' }}></div>}
                        {tab_value === 'LIVING' && status === true && <div style={{ position: 'fixed', borderTop: '5px solid rgb(116, 133, 23)', margin: 'auto', width: '80px', height: '10pt', top: '85px', left: '530px', display: 'inline-block' }}></div>}
                        {tab_value === 'BEAUTY' && status === true && <div style={{ position: 'fixed', borderTop: '5px solid rgb(11, 160, 110)', margin: 'auto', width: '80px', height: '10pt', top: '85px', left: '650px', display: 'inline-block' }}></div>}
                        {tab_value === 'STUDIO' && status === true && <div style={{ position: 'fixed', borderTop: '5px solid rgb(199, 12, 74)', margin: 'auto', width: '80px', height: '10pt', top: '85px', left: '749px', display: 'inline-block' }}></div>}
                        {/* search box  */}
                        <Box sx={{ flex: 4, marginLeft: '150px' }}>
                            <SearchBar placeholder='Search for Products ...' />
                        </Box>
                        <Box sx={{ flex: 3, marginTop: '10px', marginLeft: '40px', textAlign: 'center' }}
                            onMouseMove={async (e) => {
                                setShowProfile(true)

                            }}
                            onMouseLeave={async (e) => {
                                setShowProfile(false)
                            }}
                        >
                            <Person2OutlinedIcon sx={{ color: 'grey', fontSize: '25px' }} />
                            <Typography variant='body1' sx={{ color: 'black', fontSize: '14px', fontWeight: 'bolder' }}>Profile</Typography>
                            {show_profile && <ProfilePopup show_profile={show_profile} />}
                        </Box>
                        {show_profile === true && <div style={{ position: 'fixed', borderTop: '5px solid rgb(243, 66, 140)', margin: 'auto', width: '80px', height: '10pt', top: '85px', left: '1400px', display: 'inline-block' }}></div>}
                        <Box sx={{ flex: 2, marginTop: '10px', marginLeft: '35px', cursor: 'pointer', textAlign: 'center', textDecoration: 'none' }}
                            component={Link} to='/wishlist'>
                            <FavoriteBorderOutlinedIcon sx={{ color: 'grey', fontSize: '25px' }} />
                            <Typography variant='body1' sx={{ color: 'black', fontSize: '14px', fontWeight: 'bolder' }}>Wishlist</Typography>
                        </Box>
                        <Box sx={{ flex: 2, marginTop: '10px', marginLeft: '35px', cursor: 'pointer', textAlign: 'center', textDecoration: 'none' }}
                            component={Link} to='/checkout/cart'>
                            <Badge badgeContent={props.bag_count} color='error'><ShoppingBagOutlinedIcon sx={{ color: 'grey', fontSize: '25 px' }} /></Badge>
                            <Typography variant='body1' sx={{ color: 'black', fontSize: '14px', fontWeight: 'bolder' }}>Bag</Typography>
                        </Box>
                    </Toolbar>
                </AppBar >
                <Outlet />
            </div >
        </>
    )
}
const mapStateToProps = (cstate) => {
    return {
        user: cstate.user,
        bag_count: cstate.bag_count
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUserPageCat: (data) => dispatch(setUserPageCat(data)),
        setUserPageSubCat: (data) => dispatch(setUserPageSubCat(data)),
        setUserPageProdCat: (data) => dispatch(setUserPageProdCat(data)),
        getBagCount: (data) => dispatch(getBagCount(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);