import { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Avatar } from '@mui/material';
import { Link } from "react-router-dom";
const Admin_Navbar = (props) => {
    const [adminid, setAdminId] = useState();
    const [image, setImage] = useState();
    const [email, setEmail] = useState('');
    useEffect(() => {
        document.title = 'Admin Panel';
        setAdminId(props.adminid);
        setImage(props.image)
        setEmail(props.email);
    }, [])
    return (
        <>
            <AppBar>
                <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', backgroundColor: 'white' }}>
                    <Button disableTouchRipple sx={{
                        flex: 1,
                        backgroundColor: 'transparent', border: 'none',
                        '&:hover': { backgroundColor: 'transparent', border: 'none' }
                    }}
                        component={Link} to='/admin/home'><img src='/Images/myntra_favicon.png' alt='Not loaded' width='100vw' height='70vh' style={{ flex: 1 }} /></Button>
                    <Typography sx={{ color: "grey", flex: 2, fontSize: '25px' }}>Admin Panel</Typography>
                    {/* //for search box */}
                    <Box sx={{ flex: 3 }}>

                    </Box>
                    <Typography sx={{ color: 'orangered', flex: 2, fontWeight: "bold" }}>Admin ID: <span style={{ color: 'blueviolet' }}
                        id='admin_id'>{adminid}</span></Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar src={image} sx={{ width: '50px', height: '50px' }}></Avatar>
                        <Typography sx={{ color: 'blueviolet', flex: 4, marginLeft: '10px', fontWeight: 'bold' }}>{email}</Typography>
                    </Box>
                    <Box sx={{ flex: 2 }}>
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Admin_Navbar;