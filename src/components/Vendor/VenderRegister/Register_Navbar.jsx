import { useEffect, useState } from "react";
import { AppBar, Toolbar, Button, Typography, Box, Avatar } from '@mui/material';
const Register_Navbar = (props) => {
    const [vendorid, setVendorId] = useState('');
    const [image, setImage] = useState();
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const error = 'Error Please retry!';
    useEffect(() => {
        document.title = 'Sell with Myntra';
        document.body.style.backgroundColor = 'rgb(248, 196, 245)';
        setVendorId(props.vendorid);
        setImage(props.image);
        setFirstName(props.firstname)
        setLastName(props.lastname)
        setEmail(props.email);
    }, [])
    return (
        <>
            <AppBar sx={{ backgroundColor: 'white', height: '80px' }}>
                <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button disableTouchRipple sx={{ flex: 1, '&:hover': { border: 'none', backgroundColor: 'none' } }}> <img src='../../Images/myntra_favicon.png' width='100px' height='80px'
                        alt='loading' /></Button>
                    <Typography variant='body1' sx={{ flex: 4, color: 'black', fontSize: '20px', fontWeight: 'bold' }}>Sell With Myntra!</Typography>
                    <Box sx={{ flex: 7, display: props.display }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ flex: 2 }}></Box>
                            <Typography variant='body1' sx={{ flex: 2, color: 'purple', fontSize: '18px', fontWeight: 'bold' }}>Vendor Id: <span id='navbar_vendorid'>{vendorid}</span></Typography>
                            <Avatar id='navbar_vendorprofile' src={image}></Avatar>
                            <Typography variant='body1' sx={{ flex: 2, marginLeft: '10px', color: 'blueviolet', fontSize: '18px', fontWeight: 'bold' }}>{firstname} {lastname}</Typography>
                            <Typography variant='body1' sx={{ flex: 2, marginLeft: '10px', fontSize: '18px', fontWeight: 'bold' }} id='navbar_email'>{email}</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <img src='../../Images/myntra_favicon.png' alt='no image' width='100px' height='40px' />
                        <Typography variant='body1' sx={{ marginLeft: '20px', color: 'black', fontSize: '20px', fontWeight: 'bold' }}>Myntra</Typography>
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Register_Navbar;