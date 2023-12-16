import { Box, ListItemButton, Typography } from "@mui/material"
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { setUserPageCat, setUserPageSubCat, setUserPageProdCat, setProfileMenu } from "./Redux_Store/Action_Creators";
const Footer = (props) => {
    //storing values
    const [catgroup, setCatGroup] = useState([]);
    const [prodgroup, setProductGroup] = useState([]);
    useEffect(() => {
        (props.catgroup.length > 0) ? setCatGroup(props.catgroup.slice()) : setCatGroup([]);
        (props.prodgroup.length > 0) ? setProductGroup(props.prodgroup.slice()) : setProductGroup([])
    }, [])
    return (
        <>
            <Box className='footer'>
                <Box className='div1'>
                    <Typography variant='subtitle2' sx={{ fontWeight: 'bolder', fontFamily: 'Arial' }}>ONLINE SHOPPING</Typography>
                    {catgroup.map((li, index) => {
                        return (
                            <ListItemButton sx={{ fontFamily: 'sans-serif', width: '30%', marginLeft: '-15px', marginTop: '5px', color: 'gray' }} disableTouchRipple
                                component={Link} to={'/shop/' + li.category.toLowerCase()}
                                onClick={() => {
                                    props.setUserPageCat(li.category)
                                }}> {li.category}</ListItemButton>
                        )
                    })}
                    <ListItemButton sx={{ fontFamily: 'sans-serif', width: '50%', marginLeft: '-15px', color: 'gray' }} disableTouchRipple component={Link} to='/my'
                        onClick={() => props.setProfileMenu('gift_cards')}>Gift Cards</ListItemButton>
                    <ListItemButton sx={{ fontFamily: 'sans-serif', width: '50%', marginLeft: '-15px', color: 'gray' }} disableTouchRipple component={Link} to='/my'
                        onClick={() => props.setProfileMenu('insider')}>Myntra Insiders</ListItemButton>
                    <Typography variant='subtitle2' sx={{ fontWeight: 'bolder', fontFamily: 'Arial', marginTop: '30px' }}>USEFUL LINKS</Typography>
                    <ListItemButton sx={{ fontFamily: 'sans-serif', width: '20%', marginLeft: '-15px', marginTop: '20px', color: 'gray' }} disableTouchRipple>Blog</ListItemButton>
                    <ListItemButton sx={{ fontFamily: 'sans-serif', width: '20%', marginLeft: '-15px', color: 'gray' }} disableTouchRipple>Careers</ListItemButton>
                    <ListItemButton sx={{ fontFamily: 'sans-serif', width: '50%', marginLeft: '-15px', color: 'gray' }} disableTouchRipple>Site Map</ListItemButton>
                    <ListItemButton sx={{ fontFamily: 'sans-serif', width: '80%', marginLeft: '-15px', color: 'gray' }} disableTouchRipple>Corporate Information</ListItemButton>
                    <ListItemButton sx={{ fontFamily: 'sans-serif', width: '50%', marginLeft: '-15px', color: 'gray' }} disableTouchRipple>Whitehat</ListItemButton>
                </Box>
                <Box className='div2'>
                    <Typography variant='subtitle2' sx={{ fontWeight: 'bolder', fontFamily: 'Arial' }}>CUSTOMER POICIES</Typography>
                    <ListItemButton sx={{ fontFamily: 'sans-serif', width: '50%', marginLeft: '-15px', marginTop: '20px', color: 'gray' }} disableTouchRipple
                        component={Link} to='/contactus'>Contact us</ListItemButton>
                    <ListItemButton sx={{ fontFamily: 'sans-serif', width: '30%', marginLeft: '-15px', color: 'gray' }} disableTouchRipple
                        component={Link} to='/faqs'>FAQ</ListItemButton>
                    <ListItemButton sx={{ fontFamily: 'sans-serif', width: '30%', marginLeft: '-15px', color: 'gray' }} disableTouchRipple>T&C</ListItemButton>
                    <ListItemButton sx={{ fontFamily: 'sans-serif', width: '60%', marginLeft: '-15px', color: 'gray' }} disableTouchRipple
                        component={Link} to='/termsofuse' >Terms of Use</ListItemButton>
                    <ListItemButton sx={{ fontFamily: 'sans-serif', width: '70%', marginLeft: '-15px', color: 'gray' }} disableTouchRipple>Track Orders</ListItemButton>
                    <ListItemButton sx={{ fontFamily: 'sans-serif', width: '30%', marginLeft: '-15px', color: 'gray' }} disableTouchRipple>Shipping</ListItemButton>
                    <ListItemButton sx={{ fontFamily: 'sans-serif', width: '30%', marginLeft: '-15px', color: 'gray' }} disableTouchRipple>Cancellation</ListItemButton>
                    <ListItemButton sx={{ fontFamily: 'sans-serif', width: '30%', marginLeft: '-15px', color: 'gray' }} disableTouchRipple>Returns</ListItemButton>
                    <ListItemButton sx={{ fontFamily: 'sans-serif', width: '50%', marginLeft: '-15px', color: 'gray' }} disableTouchRipple
                        component={Link} to='/privacypolicy'>Privacy Policy</ListItemButton>
                    <ListItemButton sx={{ fontFamily: 'sans-serif', width: '90%', marginLeft: '-15px', color: 'gray' }} disableTouchRipple>Grievance Officer</ListItemButton>
                </Box>
                <Box className='div3'>
                    <Typography variant='subtitle2' sx={{ fontWeight: 'bolder', fontFamily: 'Arial' }}>EXPERIENCE MYNTRA APP ON MOBILE</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', marginTop: '20px' }}>
                        <Link href='https://play.google.com/store/apps/details?id=com.myntra.android&pli=1'><img src='../Images/PlayStore.png' width='200px' height='80px' style={{ marginLeft: '-120px', cursor: 'pointer' }} alt="no image" /></Link>
                        <Link href='https://apps.apple.com/in/app/myntra-indias-fashion-store/id907394059'> <img src='../Images/AppStore.png' width='150px' height='55px' style={{ marginLeft: '-90px', cursor: 'pointer' }} alt="no image" /></Link>
                    </Box>
                    <Typography variant='subtitle2' sx={{ fontWeight: 'bolder', fontFamily: 'Arial', marginTop: '30px' }}>KEEP IN TOUCH</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '15px' }}>
                        <Link href='https://www.facebook.com/myntra' sx={{ color: 'grey' }}><FacebookIcon sx={{ fontSize: '30px', cursor: 'pointer' }} /></Link>
                        <Link href='https://twitter.com/myntra' sx={{ color: 'grey' }}> < TwitterIcon sx={{ fontSize: '30px', marginLeft: '20px', cursor: 'pointer' }} /></Link>
                        <Link href='https://www.youtube.com/user/myntradotcom' sx={{ color: 'grey' }}> < YouTubeIcon sx={{ fontSize: '30px', marginLeft: '20px', cursor: 'pointer' }} /></Link>
                        <Link href='https://www.instagram.com/myntra/' sx={{ color: 'grey' }}><InstagramIcon sx={{ fontSize: '30px', marginLeft: '20px', cursor: 'pointer' }} /></Link>
                    </Box>
                </Box>
                <Box className='div4'>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <img src='../Images/Original.png' width='70px' height='50px' alt="no image" />
                        <Typography variant='subtitle2' sx={{ fontWeight: 'bolder', fontFamily: 'Arial', marginTop: '30px', fontSize: '20px', marginLeft: '20px' }}>100% ORIGINAL
                            <span style={{ fontSize: '20px', fontWeight: 'normal', fontFamily: 'TimesNewRoman' }}> guarantee for <br />all products at myntra.com</span>
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <img src='../Images/30 days.jpg' width='70px' height='50px' alt="no image" />
                        <Typography variant='subtitle2' sx={{ fontWeight: 'bolder', fontFamily: 'Arial', marginTop: '30px', fontSize: '20px', marginLeft: '20px' }}>Return within 30days
                            <span style={{ fontSize: '20px', fontWeight: 'normal', fontFamily: 'TimesNewRoman' }}> of <br />receiving your order</span>
                        </Typography>
                    </Box>
                </Box>
            </Box >
            <Box className='footer1' sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant='subtitle2' sx={{ fontWeight: 'bolder', fontFamily: 'Arial', marginTop: '30px', fontSize: '14px', marginLeft: '140px' }}>POPULAR SEARCHES</Typography>
                <Box sx={{ backgroundColor: 'lightgrey', height: '1px', width: '75%', marginTop: '30px', marginLeft: '20px' }}></Box>
            </Box>
            <Box className='footer1'>
                <Box sx={{ marginLeft: '140px', marginTop: '20px', width: '1400px' }}>
                    {prodgroup.map((li, index) => {
                        return (
                            <>
                                <ListItemButton sx={{ textDecoration: 'none', color: 'grey', fontFamily: 'monospace', fontSize: '15px', display: 'inline-block' }}
                                    component={Link} to={'/shop/' + li.category.toLowerCase()}
                                    onClick={() => {
                                        props.setUserPageCat(li.category)
                                        props.setUserPageSubCat(li.subcategory)
                                        props.setUserPageProdCat(li.productcategory)
                                    }} >{li.productcategory}</ListItemButton>
                                <span style={{ fontWeight: 'normal', fontFamily: 'TimesNewRoman' }}>{'|'}</span>
                            </>
                        )
                    })}
                </Box>
            </Box>
            <Box className='footer1' sx={{ alignItems: 'center', justifyContent: 'space-evenly', fontFamily: 'verdana' }}>
                <Typography variant='body1' sx={{ marginTop: '80px', color: 'grey' }}>In case of any concern, <Link href="/contactus" to='/contactus' sx={{ textDecoration: 'none', fontWeight: 'bolder', color: 'slateblue' }}>Contact Us</Link></Typography>
                <Typography variant='body1' sx={{ marginTop: '80px', color: 'grey' }}>© 2023 www.myntra.com. All rights reserved.</Typography>
                <Typography variant='body1' sx={{ marginTop: '80px', color: 'grey' }}>A Flipkart Company.</Typography>
                <Typography variant='body1' sx={{ marginTop: '80px' }}><Link href='/partnerhome' to='/partnerhome'
                    sx={{ textDecoration: 'none', color: 'slateblue', fontWeight: 'bold' }}>Sell on Myntra</Link></Typography>
            </Box >
            <Box className='footer1'>
                <Box sx={{ backgroundColor: 'lightgrey', height: '1px', width: '90%', marginTop: '50px', marginLeft: '130px' }}></Box>
                <br></br>
                <br></br>
                <br></br>
            </Box>
        </>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        setUserPageCat: (data) => dispatch(setUserPageCat(data)),
        setUserPageSubCat: (data) => dispatch(setUserPageSubCat(data)),
        setUserPageProdCat: (data) => dispatch(setUserPageProdCat(data)),
        setProfileMenu: (data) => dispatch(setProfileMenu(data))
    }
}
export default connect(null, mapDispatchToProps)(Footer);