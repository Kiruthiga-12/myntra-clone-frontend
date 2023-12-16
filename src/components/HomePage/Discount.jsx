import { Box, Button, Typography } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import DryCleaningOutlinedIcon from '@mui/icons-material/DryCleaningOutlined';
import RepeatOnOutlinedIcon from '@mui/icons-material/RepeatOnOutlined';
import { Component } from "react";
import { Link } from 'react-router-dom';
import SubscriptionNews from "../NavbarMenu/SubscriptionNews";

class Discount extends Component {
    constructor() {
        super();
        this.state = {
            status: false
        }
    }
    componentDidUpdate() {
        if (this.state.status === true)
            document.getElementById('discount').style.marginLeft = '790px'
        else if (this.state.status === false)
            document.getElementById('discount').style.marginLeft = '1472px'

    }
    render() {
        return (
            <>
                <Box className='discount' id='discount'
                    onClick={() => this.setState({ status: !this.state.status })}>
                    <Typography variant='body1' sx={{ fontWeight: 'bold', fontSize: '27px', paddingLeft: '50px', marginBottom: '-15px', color: 'white' }}>FLAT   &#8377;200 OFF
                    </Typography>
                    <PlayArrowIcon sx={{ transform: 'rotate(270deg)', fontSize: '40px', marginLeft: '280px', marginTop: '-100px', color: 'white' }} />
                    {this.state.status === true &&
                        <Box sx={{
                            transform: 'rotate(90deg)',
                            width: '40vw', height: '46vh', backgroundColor: 'rgb(240, 184, 207)',
                            marginTop: '168px', display: 'flex', flexDirection: 'column',
                            marginLeft: '-161px'
                        }}>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Box sx={{ flex: 7, padding: '20px' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography variant='subtitle1' sx={{ color: 'black', fontSize: '18px', fontFamily: 'Arial' }}>Avail Flat</Typography>
                                        <Typography variant='subtitle1' sx={{ color: 'black', fontSize: '40px', marginTop: '-10px' }}>&#8377;200 OFF</Typography>
                                        <Typography variant='subtitle1' sx={{ color: 'black', fontSize: '40px', marginTop: '-10px' }}>+ FREE SHIPPING </Typography>
                                        <Typography variant='body1' sx={{ color: 'black', fontSize: '20px', marginTop: '30px', fontFamily: 'Arial', fontWeight: 'bold' }}>Coupon Code: MYNTRA200 </Typography>
                                        <Typography variant='body2' sx={{ color: 'black' }}>Applicable on your first order</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 5, padding: '20px' }}>
                                    <Typography sx={{ fontFamily: 'monospace', position: 'fixed', top: '115px', left: '480px', fontSize: '25px', color: 'black' }}>&#8377;200
                                        <br></br>  off</Typography>
                                    <ShoppingBagOutlinedIcon sx={{
                                        color: 'rgb(243, 66, 140)',
                                        fontSize: '200px'
                                    }} />
                                    <br></br>
                                    <Button sx={{
                                        backgroundColor: 'rgb(243, 66, 140)',
                                        '&:hover': { backgroundColor: 'rgb(243, 66, 140)' }, color: 'white', marginLeft: '30px', fontSize: '16px'
                                    }} component={Link} to='/signup'>SIGNUP NOW  <ArrowForwardIosIcon /></Button>
                                </Box>
                            </Box>
                            <Box>
                                <div style={{ marginTop: '10px', width: '90%', height: '1pt', backgroundColor: 'grey', marginLeft: '20px' }}></div>
                                <Box sx={{ display: 'flex', alignItems: 'center', padding: '20px', justifyContent: 'space-evenly' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <SettingsOutlinedIcon sx={{ fontSize: '30px', color: 'rgb(7, 145, 80)' }} />
                                        <Typography sx={{ flex: 3, color: 'black', marginLeft: '10px' }}>Genuine Products</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <DryCleaningOutlinedIcon sx={{ fontSize: '30px', color: 'rgb(7, 145, 80)' }} />
                                        <Typography sx={{ flex: 3, color: 'black', marginLeft: '10px' }}> Try & Buy</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <RepeatOnOutlinedIcon sx={{ fontSize: '30px', color: 'rgb(7, 145, 80)' }} />
                                        <Typography sx={{ flex: 5, color: 'black', marginLeft: '10px' }}> Easy Exchange 7 Returns</Typography>
                                    </Box>
                                </Box>
                            </Box>

                        </Box>}
                </Box >
                <SubscriptionNews />
            </>
        )
    }

}

export default Discount;