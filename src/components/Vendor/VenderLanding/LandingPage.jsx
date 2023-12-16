import { useEffect, useState } from "react";
import { AppBar, Toolbar, Box, Button, Typography, ListItemButton, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from "../../Loader/Loader";
import { connect } from 'react-redux';
import { setNavBar, setFooter } from "../../Redux_Store/Action_Creators";
const LandingPage = (props) => {
    const [tabState, setTabValue] = useState('');
    const [arr, setArr] = useState([]);
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        document.title = 'Platform for Seller - Myntra';
        props.setNavBar('')
        props.setFooter('')
        async function fun1() {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_all_vendorland`)
                .then((data) => {
                    if (data.data.length > 0) {
                        setArr(data.data.slice());
                    }
                    else
                        setArr([])
                    setLoader(false);
                })
        }
        fun1()
        window.addEventListener('scroll', (e) => {
            if (window.scrollY <= 437 && window.location.href == 'https://kiruthiga-12-myntra-clone-frontend.onrender.com/partnerhome')
                document.getElementById('vendor_register_hide').style.visibility = 'hidden';
            else if (window.scrollY > 437 && window.location.href == 'https://kiruthiga-12-myntra-clone-frontend.onrender.com/partnerhome') {
                document.getElementById('vendor_register_hide').style.visibility = 'visible';
            }
        })
    }, [])


    useEffect(() => {
        if (arr.length > 0 && window.location.href == 'https://kiruthiga-12-myntra-clone-frontend.onrender.com/partnerhome') {
            let slideIndex = 0;
            function showSlides() {
                let i;
                let slides = document.getElementsByClassName("mySlides");
                for (i = 0; i < slides.length; i++) {
                    slides[i].style.display = "none";
                }
                slideIndex++;
                if (slideIndex > slides.length) {
                    slideIndex = 1;
                }
                function f1() {
                    if (window.location.href == 'https://kiruthiga-12-myntra-clone-frontend.onrender.com/partnerhome')
                        slides[slideIndex - 1].style.display = "block";
                }
                f1()
                setTimeout(showSlides, 20000);
            }
            showSlides();
        }
    })
    return (
        <>
            {loader == true ? <Loader /> : <>
                {/* Navbar */}
                <AppBar sx={{ backgroundColor: 'white' }}>
                    <Toolbar>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                            <Button disableTouchRipple sx={{ flex: 2 }}
                                component={Link} to='/partnerhome'><img src='../../Images/myntra_favicon.png' alt='loading' width='100px' height='70px' /></Button>
                            <Box sx={{ flex: 3 }}></Box>
                            <ListItemButton href='#sellOnMyntra' disableTouchRipple sx={{ flex: 6, '&:hover': { backgroundColor: 'transparent' } }}
                                onMouseOver={() => setTabValue('sell')}
                                onMouseLeave={() => setTabValue('')}>
                                <Typography sx={{ color: 'grey', fontWeight: 'bold' }}>Sell on Myntra</Typography>
                                {tabState === 'sell' && <div style={{
                                    borderTop: '6px solid rgb(250, 50, 84)', width: '50%', left: '-110px',
                                    top: '40px', position: 'relative'
                                }}></div>}
                            </ListItemButton>
                            <ListItemButton href='#successStories' disableTouchRipple sx={{ flex: 6, '&:hover': { backgroundColor: 'transparent' } }}
                                onMouseOver={() => setTabValue('success_stories')}
                                onMouseLeave={() => setTabValue('')}>
                                <Typography sx={{ color: 'grey', fontWeight: 'bold' }}>Success Stories</Typography>
                                {tabState === 'success_stories' && <div style={{
                                    borderTop: '6px solid rgb(250, 50, 84)', width: '50%', left: '-120px',
                                    top: '40px', position: 'relative'
                                }}></div>}
                            </ListItemButton>
                            <ListItemButton href='#services' disableTouchRipple sx={{ flex: 5, '&:hover': { backgroundColor: 'transparent' } }}
                                onMouseOver={() => setTabValue('services')}
                                onMouseLeave={() => setTabValue('')}>
                                <Typography sx={{ color: 'grey', fontWeight: 'bold' }}>Services</Typography>
                                {tabState === 'services' && <div style={{
                                    borderTop: '6px solid rgb(250, 50, 84)', width: '40%', left: '-70px',
                                    top: '40px', position: 'relative'
                                }}></div>}
                            </ListItemButton>
                            <ListItemButton href='#sellerfaqs' disableTouchRipple sx={{ flex: 5, '&:hover': { backgroundColor: 'transparent' } }}
                                onMouseOver={() => setTabValue('sellerfaqs')}
                                onMouseLeave={() => setTabValue('')}>
                                <Typography sx={{ color: 'grey', fontWeight: 'bold' }}>FAQs</Typography>
                                {tabState === 'sellerfaqs' && <div style={{
                                    borderTop: '6px solid rgb(250, 50, 84)', width: '20%', left: '-40px',
                                    top: '40px', position: 'relative'
                                }}></div>}
                            </ListItemButton>
                            <Box sx={{ flex: 3 }}></Box>
                            <Button sx={{
                                flex: 2,
                                color: 'rgb(250, 50, 84)', backgroundColor: 'transparent', border: '1px solid rgb(250, 50, 84)',
                                '&:hover': { backgroundColor: 'rgb(250, 50, 84)', color: 'white' }
                            }}
                                component={Link} to='/partnerhome/login'>LOGIN</Button>
                            <Button sx={{
                                marginLeft: '20px',
                                flex: 2,
                                backgroundColor: 'rgb(250, 50, 84)', color: 'white', border: '1px solid rgb(250, 50, 84)',
                                '&:hover': { backgroundColor: 'rgb(250, 50, 84)', color: 'white' }
                            }}
                                component={Link} to='/partnerhome/register_step1'
                                id='vendor_register_hide'
                                onClick={() => {
                                    window.removeEventListener('scroll', () => { });
                                }}>REGISTER</Button>
                            <Box sx={{ flex: 3 }}></Box>
                        </Box >
                    </Toolbar >
                </AppBar >

                {/* Content */}
                {/* Slider */}
                {arr.length > 0 && arr.map((li, index) => {
                    function toBase64(arr) {
                        const arr1 = new Uint8Array(arr)
                        return btoa(
                            arr1.reduce((data, byte) => data + String.fromCharCode(byte), '')
                        );
                    }
                    const url = toBase64(li.image1[0].data);
                    return (<>
                        <Box sx={{
                            margin: 'auto', marginTop: '120px', width: '1300px', height: '500px'
                        }}
                            className='mySlides fade'>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Box sx={{ flex: 10 }}>
                                    <Box sx={{ display: 'flex', flexDirection: "Column", alignItems: "center" }}>
                                        <Typography sx={{ fontSize: "25px", fontWeight: "bold", flex: 4 }} >{li.heading}</Typography>
                                        <Typography sx={{ flex: 4, marginTop: "20px", fontSize: "30px", fontWeight: "bold" }}>{li.subheading}</Typography>
                                        <Typography sx={{ flex: 4, marginTop: "20px", fontSize: "22px", fontWeight: "bold" }}>{li.title}</Typography>
                                        <Button sx={{
                                            marginTop: "20px",
                                            marginLeft: '20px',
                                            flex: 4,
                                            color: 'white', backgroundColor: 'rgb(250, 50, 84)', border: '1px solid rgb(250, 50, 84)',
                                            '&:hover': { backgroundColor: 'rgb(250, 50, 84)', color: 'white' }
                                        }}
                                            component={Link} to='/partnerhome/register_step1'
                                            id='vendor_register'>REGISTER</Button>
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 2 }}>
                                    <img src={`data:image/png;base64,${url}`} width='800px' height='400px' style={{ marginLeft: "20px", borderTopLeftRadius: "20%", borderBottomLeftRadius: "20%" }}
                                        alt='loading' />
                                </Box>
                            </Box>
                        </Box >
                    </>)
                })
                }
                {/* 1.Selling Content */}
                <Box id='sellOnMyntra' sx={{ margin: 'auto', marginTop: '80px', width: '80%' }}>
                    {/* <Typography variant='h5' sx={{ textAlign: 'center' }}  >Start Selling In 4 Simple Steps</Typography> */}
                    <Typography variant='h5' sx={{ textAlign: 'center' }} id='interval' >Start Selling In 4 Simple Steps</Typography>
                    <div style={{ borderTop: '3px solid rgb(250, 50, 84)', margin: 'auto', marginTop: '15px', width: '8%' }}></div>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                        <Box sx={{
                            width: '400px', height: '350px', backgroundColor: 'rgb(248, 207, 214)', textAlign: 'center', paddingRight: '20px', paddingLeft: '20px',
                            borderRadius: '10px'
                        }}>
                            <Typography sx={{ paddingTop: '70px', fontSize: '27px', fontWeight: 'bold' }}>Register</Typography>
                            <Typography sx={{ paddingTop: '50px', fontSize: '19px' }}>Find all the onboarding requirements to create your account here.</Typography>
                            <Button disableTouchRipple variant='outlined' sx={{
                                marginTop: '20px', fontWeight: 'bold'
                                , color: 'rgb(250, 50, 84)', border: '1px solid rgb(250, 50, 84)',
                                '&:hover': { color: 'white', backgroundColor: 'rgb(250, 50, 84)', border: '1px solid rgb(250, 50, 84)' }
                            }}>WATCH VIDEO</Button>
                        </Box>
                        <Box sx={{
                            width: '400px', height: '350px', backgroundColor: 'rgb(248, 207, 214)', textAlign: 'center', paddingRight: '20px', paddingLeft: '20px', marginLeft: '10px',
                            borderRadius: '10px'
                        }}>
                            <Typography sx={{ paddingTop: '70px', fontSize: '27px', fontWeight: 'bold' }}>Sell</Typography>
                            <Typography sx={{ paddingTop: '30px', fontSize: '19px' }}>Learn all about fulfilment models, platform integration & prerequisites for operational readiness here.</Typography>
                            <Button disableTouchRipple variant='outlined' sx={{
                                marginTop: '20px', fontWeight: 'bold'
                                , color: 'rgb(250, 50, 84)', border: '1px solid rgb(250, 50, 84)',
                                '&:hover': { color: 'white', backgroundColor: 'rgb(250, 50, 84)', border: '1px solid rgb(250, 50, 84)' }
                            }}>READ MORE</Button>
                        </Box>
                        <Box sx={{
                            width: '400px', height: '350px', backgroundColor: 'rgb(248, 207, 214)', textAlign: 'center', paddingRight: '20px', paddingLeft: '20px', marginLeft: '10px',
                            borderRadius: '10px'
                        }}>
                            <Typography sx={{ paddingTop: '70px', fontSize: '27px', fontWeight: 'bold' }}>Earn</Typography>
                            <Typography sx={{ paddingTop: '50px', fontSize: '19px' }}>Get secure & timely payments on predefined days. Find out about the payment cycle.</Typography>
                            <Button disableTouchRipple variant='outlined' sx={{
                                marginTop: '20px', fontWeight: 'bold'
                                , color: 'rgb(250, 50, 84)', border: '1px solid rgb(250, 50, 84)',
                                '&:hover': { color: 'white', backgroundColor: 'rgb(250, 50, 84)', border: '1px solid rgb(250, 50, 84)' }
                            }}>WATCH VIDEO</Button>
                        </Box>
                        <Box sx={{
                            width: '400px', height: '350px', backgroundColor: 'rgb(248, 207, 214)', textAlign: 'center', paddingRight: '20px', paddingLeft: '20px', marginLeft: '10px',
                            borderRadius: '10px'
                        }}>
                            <Typography sx={{ paddingTop: '70px', fontSize: '27px', fontWeight: 'bold' }}>Grow</Typography>
                            <Typography sx={{ paddingTop: '70px', fontSize: '19px' }}>Get tailored support at every step to steer your business.</Typography>
                            <Button disableTouchRipple variant='outlined' sx={{
                                marginTop: '20px', fontWeight: 'bold'
                                , color: 'rgb(250, 50, 84)', border: '1px solid rgb(250, 50, 84)',
                                '&:hover': { color: 'white', backgroundColor: 'rgb(250, 50, 84)', border: '1px solid rgb(250, 50, 84)' }
                            }}>READ MORE</Button>
                        </Box>
                    </Box >
                </Box >
                {/* 2.Success Stories */}
                <Box id='successStories' sx={{ margin: 'auto', marginTop: '100px', width: '80%' }}>
                    <Typography variant='h5' sx={{ textAlign: 'center' }}>Why Brands Love Myntra</Typography>
                    <div style={{ borderTop: '3px solid rgb(250, 50, 84)', margin: 'auto', marginTop: '15px', width: '8%' }}></div>
                    <Typography sx={{ margin: 'auto', marginTop: '20px', width: '70%' }}>
                        We collaborated with Myntra after the first pandemic wave & Myntra gave us the freedom, insight & guidance. We have seen tremendous growth in the last year.
                    </Typography>
                </Box>
                {/* 3.Services */}
                <Box id='services' sx={{ margin: 'auto', marginTop: '80px', width: '80%' }}>
                    <Typography variant='h5' sx={{ textAlign: 'center' }}>Myntra Services To Help You Grow</Typography>
                    <div style={{ borderTop: '3px solid rgb(250, 50, 84)', margin: 'auto', marginTop: '15px', width: '8%' }}></div>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                        <Box sx={{
                            width: '400px', height: '350px', backgroundColor: 'aliceblue', textAlign: 'center', paddingRight: '20px', paddingLeft: '20px',
                            borderRadius: '10px'
                        }}>
                            <Typography sx={{ paddingTop: '70px', fontSize: '27px', fontWeight: 'bold' }}>Partner Insights</Typography>
                            <Typography sx={{ paddingTop: '50px', fontSize: '19px' }}>Real-Time Data with reporting dashboard and highly-curated data-insight tools.</Typography>
                            <Button disableTouchRipple variant='outlined' sx={{
                                marginLeft: '190px',
                                marginTop: '20px', fontWeight: 'bold'
                                , color: 'rgb(250, 50, 84)', border: '1px solid rgb(250, 50, 84)',
                                '&:hover': { color: 'white', backgroundColor: 'rgb(250, 50, 84)', border: '1px solid rgb(250, 50, 84)' }
                            }}><PlayArrowIcon sx={{ fontSize: '45px' }} /></Button>
                        </Box>
                        <Box sx={{
                            width: '400px', height: '350px', backgroundColor: 'aliceblue', textAlign: 'center', paddingRight: '20px', paddingLeft: '20px', marginLeft: '10px',
                            borderRadius: '10px'
                        }}>
                            <Typography sx={{ paddingTop: '70px', fontSize: '27px', fontWeight: 'bold' }}>Partner University</Typography>
                            <Typography sx={{ paddingTop: '30px', fontSize: '19px' }}>Understand Myntra's processes & policies through videos, courses & more.</Typography>
                            <Button disableTouchRipple variant='outlined' sx={{
                                marginLeft: '190px',
                                marginTop: '40px', fontWeight: 'bold'
                                , color: 'rgb(250, 50, 84)', border: '1px solid rgb(250, 50, 84)',
                                '&:hover': { color: 'white', backgroundColor: 'rgb(250, 50, 84)', border: '1px solid rgb(250, 50, 84)' }
                            }}><PlayArrowIcon sx={{ fontSize: '45px' }} /></Button>
                        </Box>
                        <Box sx={{
                            width: '400px', height: '350px', backgroundColor: 'aliceblue', textAlign: 'center', paddingRight: '20px', paddingLeft: '20px', marginLeft: '10px',
                            borderRadius: '10px'
                        }}>
                            <Typography sx={{ paddingTop: '70px', fontSize: '27px', fontWeight: 'bold' }}>Myntra AdsPlatform</Typography>
                            <Typography sx={{ paddingTop: '50px', fontSize: '19px' }}>Promote your brand through Product List Ads, Display Ads, Search Banners, M-Live & more.</Typography>
                            <Button disableTouchRipple variant='outlined' sx={{
                                marginLeft: '190px',
                                marginTop: '20px', fontWeight: 'bold'
                                , color: 'rgb(250, 50, 84)', border: '1px solid rgb(250, 50, 84)',
                                '&:hover': { color: 'white', backgroundColor: 'rgb(250, 50, 84)', border: '1px solid rgb(250, 50, 84)' }
                            }}><PlayArrowIcon sx={{ fontSize: '45px' }} /></Button>
                        </Box>
                        <Box sx={{
                            width: '400px', height: '350px', backgroundColor: 'aliceblue', textAlign: 'center', paddingRight: '20px', paddingLeft: '20px', marginLeft: '10px',
                            borderRadius: '10px'
                        }}>
                            <Typography sx={{ paddingTop: '70px', fontSize: '27px', fontWeight: 'bold' }}>Myntra Studio</Typography>
                            <Typography sx={{ paddingTop: '70px', fontSize: '19px' }}>Showcase new trends by India’s top fashion influencers.</Typography>
                            <Button disableTouchRipple variant='outlined' sx={{
                                marginLeft: '190px',
                                marginTop: '20px', fontWeight: 'bold'
                                , color: 'rgb(250, 50, 84)', border: '1px solid rgb(250, 50, 84)',
                                '&:hover': { color: 'white', backgroundColor: 'rgb(250, 50, 84)', border: '1px solid rgb(250, 50, 84)' }
                            }}><PlayArrowIcon sx={{ fontSize: '45px' }} /></Button>
                        </Box>
                    </Box >
                </Box >
                {/* 4.FAQ */}
                < Box id='sellerfaqs' sx={{ margin: 'auto', marginTop: '100px', width: '60%' }}>
                    <Typography variant='h5' sx={{ textAlign: 'center' }}>Frequently Asked Questions</Typography>
                    <div style={{ borderTop: '3px solid rgb(250, 50, 84)', margin: 'auto', marginTop: '15px', width: '8%' }}></div>
                    <Accordion sx={{ marginTop: '30px' }}>
                        <AccordionSummary expandIcon={<RemoveIcon sx={{ color: 'rgb(250, 50, 84)' }} />}>
                            <Typography sx={{ fontWeight: 'bold' }}>What are the documents required to start selling on Myntra?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>You will need your PAN Card, GSTN Certificate, Cancelled Cheque, Authorised Signatory Signature Copy & Original Trademark Certificate or Authorisation Letter / NOC on brand owner's letterhead.</Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion sx={{ marginTop: '20px' }}>
                        <AccordionSummary expandIcon={<RemoveIcon sx={{ color: 'rgb(250, 50, 84)' }} />}>
                            <Typography sx={{ fontWeight: 'bold' }}>What are the pre requisites for listing & cataloging your products to get onboarded with Myntra?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>You will need to provide your brand tag details, accurate product sizing details and article images for cataloging meeting upto Myntra specifications & guidelines to upholad the shopping experience on Myntra</Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion sx={{ marginTop: '20px' }}>
                        <AccordionSummary expandIcon={<RemoveIcon sx={{ color: 'rgb(250, 50, 84)' }} />}>
                            <Typography sx={{ fontWeight: 'bold' }}>How much time does it take to get onboarded on Myntra?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>To get onboarded on Myntra, your brand should have a sizeable catalog width & quality product with a unique value proposition. If your brand qualifies Myntra's defined selection criteria, you can be onboarded within 15 business days. This might be longer during major sale events extending upto 45 days.</Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion sx={{ marginTop: '20px' }}>
                        <AccordionSummary expandIcon={<RemoveIcon sx={{ color: 'rgb(250, 50, 84)' }} />}>
                            <Typography sx={{ fontWeight: 'bold' }}>What is the payment cycle at Myntra?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>Myntra offers a 15 day payment settlement cycle from the date of delivery of products to customers</Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion sx={{ marginTop: '20px' }}>
                        <AccordionSummary expandIcon={<RemoveIcon sx={{ color: 'rgb(250, 50, 84)' }} />}>
                            <Typography sx={{ fontWeight: 'bold' }}>Does Myntra provide its own order management system?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>Myntra has its own Free of Cost OMS which will handle your inventory and process orders dedicatedly for Myntra</Typography>
                        </AccordionDetails>
                    </Accordion>
                    {/* Show More */}
                </Box >
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </>}
        </>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        setNavBar: (data) => dispatch(setNavBar(data)),
        setFooter: (data) => dispatch(setFooter(data))
    }
}
export default connect(null, mapDispatchToProps)(LandingPage);