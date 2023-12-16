import { Box, ListItemButton } from "@mui/material";
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import { Link } from 'react-router-dom';
const CartFooter = () => {
    return (
        <>
            <Box sx={{ display: 'flex', marginTop: '20px', borderTop: '1px solid lightgrey', paddingTop: '20px' }}>
                <Box sx={{ flex: 9 }}>
                    <ListItemButton disableTouchRipple sx={{
                        border: '1px solid lightgrey', width: '100px',
                        height: '50px', marginLeft: '100px',
                        '&:hover': { backgroundColor: 'transparent', cursor: 'auto' },
                        fontSize: '12px', display: 'inline-block'
                    }} >
                        <HttpsOutlinedIcon sx={{ marginBottom: '-20px' }} />
                        <span style={{ marginTop: '-40px', marginLeft: '30px', position: 'relative', width: '50px', height: '50px', display: 'inline-block' }} >256 bit SSL</span>
                    </ListItemButton>
                    <ListItemButton disableTouchRipple sx={{
                        border: '1px solid lightgrey', width: '100px',
                        height: '50px', marginLeft: '10px',
                        '&:hover': { backgroundColor: 'transparent', cursor: 'auto' },
                        fontSize: '12px', display: 'inline-block'
                    }} >
                        <img src='../../Images/Visa.png' width='60px' height='30px' alt='loading' />
                    </ListItemButton>
                    <ListItemButton disableTouchRipple sx={{
                        border: '1px solid lightgrey', width: '100px',
                        height: '50px', marginLeft: '10px',
                        '&:hover': { backgroundColor: 'transparent', cursor: 'auto' },
                        fontSize: '12px', display: 'inline-block'
                    }} >
                        <img src='../../Images/mastercard.png' width='50px' height='30px' alt='loading' />
                    </ListItemButton>
                    <ListItemButton disableTouchRipple sx={{
                        border: '1px solid lightgrey', width: '100px',
                        height: '50px', marginLeft: '10px',
                        '&:hover': { backgroundColor: 'transparent', cursor: 'auto' },
                        fontSize: '12px', display: 'inline-block'
                    }} >
                        <img style={{ marginTop: '-25px' }} src='../../Images/american_express.png' width='80px' height='80px' alt='loading' />
                    </ListItemButton>
                    <ListItemButton disableTouchRipple sx={{
                        border: '1px solid lightgrey', width: '100px',
                        height: '50px', marginLeft: '10px',
                        '&:hover': { backgroundColor: 'transparent', cursor: 'auto' },
                        fontSize: '12px', display: 'inline-block'
                    }} >
                        <img style={{ marginLeft: '-10px' }} src='../../Images/diners_club.png' width='90px' height='30px' alt='loading' />
                    </ListItemButton>
                    <ListItemButton disableTouchRipple sx={{
                        border: '1px solid lightgrey', width: '100px',
                        height: '50px', marginLeft: '10px',
                        '&:hover': { backgroundColor: 'transparent', cursor: 'auto' },
                        fontSize: '12px', display: 'inline-block'
                    }} >
                        <img style={{ marginLeft: '-10px' }} src='../../Images/rupay.png' width='90px' height='30px' alt='loading' />
                    </ListItemButton>
                    <ListItemButton disableTouchRipple sx={{
                        border: '1px solid lightgrey', width: '100px',
                        height: '50px', marginLeft: '10px',
                        '&:hover': { backgroundColor: 'transparent', cursor: 'auto' },
                        fontSize: '12px', display: 'inline-block'
                    }} >
                        <img style={{ marginLeft: '-10px' }} src='../../Images/paypal.png' width='90px' height='30px' alt='loading' />
                    </ListItemButton>
                    <ListItemButton disableTouchRipple sx={{
                        border: '1px solid lightgrey', width: '100px',
                        height: '50px', marginLeft: '10px',
                        '&:hover': { backgroundColor: 'transparent', cursor: 'auto' },
                        fontSize: '12px', display: 'inline-block'
                    }} >
                        <img style={{ marginLeft: '-10px' }} src='../../Images/bhim.png' width='90px' height='30px' alt='loading' />
                    </ListItemButton>
                </Box>
                <Box sx={{ flex: 4 }}>
                    <ListItemButton disableTouchRipple sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'transparent' } }}
                        component={Link} to='/contactus' >Need Help? Contact Us</ListItemButton>
                </Box>
            </Box >
        </>
    )
}
export default CartFooter;