import LockResetIcon from '@mui/icons-material/LockReset';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, ListItemButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { setNavBar, setFooter } from '../../Redux_Store/Action_Creators';
const Recovery = (props) => {
    useEffect(() => {
        document.title = 'Myntra';
        props.setNavBar('navbar')
        props.setFooter('')
    }, [])
    return (
        <>
            <Box sx={{ backgroundColor: 'rgb(250, 223, 239)', width: '100vw', marginLeft: '-12px', height: '87vh', overflow: 'hidden', marginTop: '94px' }}>
                <Box sx={{ backgroundColor: 'white', width: '500px', height: '600px', margin: 'auto', marginTop: '50px' }}>
                    < LockResetIcon sx={{ fontSize: '80px', marginTop: '20px', marginLeft: '40px', color: 'rgb(243, 66, 140)', backgroundColor: 'rgb(250, 223, 239)', border: '1px solid rgb(245, 232, 245)', padding: '8px', borderRadius: '50%' }} />
                    <Typography variant='h6' sx={{ paddingLeft: '40px', paddingTop: '30px', fontWeight: 'bold' }}>Account Assistance </Typography>
                    <Typography variant='body1' sx={{ color: 'grey', fontSize: '14px', marginTop: '15px', marginLeft: '40px' }}>Let us know what issue you're facing?</Typography>
                    <ListItemButton sx={{ marginTop: '30px', '&:hover': { backgroundColor: 'white' }, display: 'flex', alignItems: 'center' }} disableTouchRipple
                        component={Link} to='/resetpassword'>
                        <Typography variant='body1' sx={{ marginLeft: '20px', padding: '10px', flex: 10 }} >I forgot my password</Typography>
                        <ArrowForwardIosIcon sx={{ color: 'grey', fontSize: '15px', flex: 2 }} />
                    </ListItemButton>
                    <div style={{ width: '80%', margin: 'auto', backgroundColor: 'rgb(240,240,240)', height: '1pt' }}></div>
                    <ListItemButton sx={{ marginTop: '10px', '&:hover': { backgroundColor: 'white' }, display: 'flex', alignItems: 'center' }} disableTouchRipple
                        component={Link} to='/notreset'>
                        <Typography variant='body1' sx={{ marginLeft: '20px', padding: '10px', flex: 10 }} >I cannot reset my password</Typography>
                        <ArrowForwardIosIcon sx={{ color: 'grey', fontSize: '15px', flex: 2 }} />
                    </ListItemButton>
                    <div style={{ width: '80%', margin: 'auto', backgroundColor: 'rgb(240,240,240)', height: '1pt' }}></div>
                    <ListItemButton sx={{ marginTop: '10px', '&:hover': { backgroundColor: 'white' }, display: 'flex', alignItems: 'center' }} disableTouchRipple
                        component={Link} to='/customercare'>
                        <Typography variant='body1' sx={{ marginLeft: '20px', padding: '10px', flex: 10 }} >I don't remember my email or mobile</Typography>
                        <ArrowForwardIosIcon sx={{ color: 'grey', fontSize: '15px', flex: 2 }} />
                    </ListItemButton>
                </Box>
            </Box >
        </>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        setNavBar: (data) => dispatch(setNavBar(data)),
        setFooter: (data) => dispatch(setFooter(data))
    }
}
export default connect(null, mapDispatchToProps)(Recovery);