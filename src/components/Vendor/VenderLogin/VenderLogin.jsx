import { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import GoogleIcon from '@mui/icons-material/Google';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setNavBar ,setFooter} from "../../Redux_Store/Action_Creators";
const VenderLogin = (props) => {
    useEffect(() => {
        document.title = 'Myntra';
        document.body.style.backgroundImage = 'url(../../Images/Galaxy.jpeg)';
        props.setNavBar('');
        props.setFooter('')
    }, [])
    return (
        <>
            <img src='../../Images/myntra_favicon.png' style={{
                top: '90px', left: '760px', position: 'fixed',
                boxShadow: '2px 2px 2px grey,-2px -2px -2px grey'
            }}
                alt='loading' width='190px' height='90px' />
            <Box sx={{
                padding: '30px', textAlign: 'center', margin: 'auto', marginTop: '140px', width: '25%', backgroundColor: 'white',
                boxShadow: '2px 2px 2px grey,-2px -2px -2px grey', height: '500px'
            }}>
                <Typography variant='h5' sx={{ marginTop: '30px' }}> partners_mdirect</Typography>
                <Typography sx={{ marginTop: '20px' }}>Powered by Myntra</Typography>
                <Button disableTouchRipple
                    sx={{
                        marginLeft: '70px', width: '70%',
                        marginTop: '30px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', textTransform: 'none', color: 'grey', fontWeight: 'bold',
                        fontSize: '16px', backgroundColor: 'transparent', border: '1px solid grey',
                        '&:hover': { backgroundColor: 'transparent', border: '1px solid grey', color: 'grey' }
                    }} component={Link} to='/partnerhome/loginandpwd'>
                    <MailOutlineIcon sx={{ fontSize: '30px' }} />
                    <Typography sx={{ marginLeft: '30px' }}> Use Email and Password</Typography>
                </Button>
                <Button disableTouchRipple
                    sx={{
                        marginLeft: '70px', width: '70%',
                        marginTop: '30px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', textTransform: 'none', color: 'grey', fontWeight: 'bold',
                        fontSize: '16px', backgroundColor: 'transparent', border: '1px solid grey',
                        '&:hover': { backgroundColor: 'transparent', border: '1px solid grey', color: 'grey' }
                    }}  >
                    <GoogleIcon sx={{ fontSize: '30px' }} />
                    <Typography sx={{ marginLeft: '30px' }}> Login with Google</Typography>
                </Button>

            </Box>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setNavBar: (data) => dispatch(setNavBar(data)),
        setFooter: (data) => dispatch(setFooter(data))
    }
}
export default connect(null, mapDispatchToProps)(VenderLogin);