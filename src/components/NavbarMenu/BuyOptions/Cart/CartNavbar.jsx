import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { connect } from 'react-redux';
import { setCartState } from "../../../Redux_Store/Action_Creators";
import { useEffect } from 'react';
const CartNavbar = (props) => {
    useEffect(() => {
        props.setCartState('Bag')
    }, [])
    return (
        <>
            <AppBar sx={{ backgroundColor: 'white' }}>
                <Toolbar className='CartNavbar'>
                    <img src='/Images/myntra_favicon.png' alt='Not loaded' width='100vw' height='70vh' style={{ flex: 2 }} />
                    <Box sx={{ flex: 6 }}></Box>
                    <Box sx={{ color: 'grey', flex: 6 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography href='#Bag' sx={{ marginLeft: '10px', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => {
                                if (props.cart_state == 'Address' || props.cart_state == 'Payment')
                                    props.setCartState('Bag')
                            }}>BAG</Typography>
                            <div style={{ marginLeft: '10px', width: '100px', height: '1pt', borderTop: '1px dashed grey' }}></div>
                            <Typography sx={{ marginLeft: '10px', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => {
                                if (props.cart_state == 'Payment')
                                    props.setCartState('Address')
                            }}>ADDRESS</Typography>
                            <div style={{ marginLeft: '10px', width: '100px', height: '1pt', borderTop: '1px dashed grey' }}></div>
                            <Typography sx={{ marginLeft: '10px', fontWeight: 'bold', cursor: 'pointer' }} >PAYMENT</Typography>
                        </Box>
                        {props.cart_state == 'Bag' && <>
                            <div style={{ marginTop: '10px', height: '4px', width: '60px', backgroundColor: 'rgb(72, 185, 157)' }}></div>
                        </>}
                        {props.cart_state == 'Address' && <>
                            <div style={{ marginTop: '10px', marginLeft: '180px', height: '4px', width: '60px', backgroundColor: 'rgb(72, 185, 157)' }}></div>
                        </>}
                        {props.cart_state == 'Payment' && <>
                            <div style={{ marginTop: '10px', marginLeft: '370px', height: '4px', width: '60px', backgroundColor: 'rgb(72, 185, 157)' }}></div>
                        </>}
                    </Box>
                    <Box sx={{ flex: 5 }}></Box>
                    <Box sx={{ flex: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <VerifiedUserIcon sx={{ fontSize: '50px', color: 'rgb(72, 185, 157)' }} />
                            <Typography sx={{ color: 'black' }}>100% SECURE</Typography>
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    )
}
const mapStateToProps = (cstate) => {
    return {
        cart_state: cstate.cart_state
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setCartState: (data) => dispatch(setCartState(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CartNavbar);